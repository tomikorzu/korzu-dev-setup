# Backend template (NestJS + Prisma + PostgreSQL)

Scaffolded standalone by `create-korzu-app --backend=rest|graphql`, or as `apps/api` when
combined with other layers. REST and GraphQL are alternatives, not both — the base template
here *is* the REST variant (a complete, runnable API); choosing GraphQL at scaffold time swaps
the controller layer for a resolver layer over the same `ItemsService`.

## Core rules

- **Business logic lives in services, never in controllers/resolvers.** `ItemsService` only
  talks to `PrismaService`; `ItemsController`/`ItemsResolver` are thin — they just map
  HTTP/GraphQL args to service calls. See the `nestjs-module-pattern` skill.
- **Prisma is the only way to touch the database.** No raw SQL, no second ORM. Schema changes go
  through `prisma migrate dev` (commits a new migration) — never hand-edit a committed migration
  file. See the `prisma-schema-conventions` skill.
- **Env vars are validated with zod in `src/env.ts`**, same pattern as the Frontend template —
  parse-or-throw at import time. NestJS doesn't auto-load `.env` the way Next.js does, so
  `src/env.ts` explicitly does `import "dotenv/config"` first. See the `env-validation-zod`
  skill.
- **Validation:** `class-validator` DTOs (REST) or `class-validator`-decorated `@InputType()`
  classes (GraphQL) + the global `ValidationPipe` (already wired in `main.ts`). Same decorators,
  same pipe, just a different transport — don't introduce a second validation library.
- **Testing:** Jest, not Vitest — a deliberate, documented exception to this project's usual
  Vitest-everywhere rule, since NestJS's DI/decorator metadata tooling assumes Jest. Mock
  `PrismaService` in unit tests (see `items.service.spec.ts`), don't hit a real database in unit
  tests.
- **Biome** for lint/format (same as every other template) — no ESLint/Prettier. Parameter
  decorators (`constructor(private readonly x: Y)`) need
  `javascript.parser.unsafeParameterDecoratorsEnabled: true` in `biome.json` — already set.

## Local development

```bash
docker compose up -d        # local Postgres
cp .env.example .env
pnpm install
pnpm prisma:generate
pnpm prisma:migrate         # applies the committed baseline migration
pnpm dev
```

## Adding a new resource

Mirror `items/`: a Prisma model, a service that only talks to `PrismaService`, then either a
REST controller + DTOs or a GraphQL resolver + model/inputs (whichever this project uses) — plus
a `*.spec.ts` with a mocked `PrismaService`.
