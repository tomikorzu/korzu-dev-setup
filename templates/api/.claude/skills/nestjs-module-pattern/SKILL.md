---
name: nestjs-module-pattern
description: Use when adding or editing a NestJS feature module (service, controller, resolver) in this backend — where logic goes and how modules are wired together.
---

# NestJS: service-first modules

Every feature is a folder under `src/` with a module, a service, and a thin transport layer
(controller for REST, resolver for GraphQL) — see `items/` for the reference shape.

## Rules

1. **The service is the only place that talks to `PrismaService`.** Controllers/resolvers never
   import `PrismaService` directly — they call the service, which calls Prisma.
2. **Controllers/resolvers stay thin**: map incoming args/DTOs to a service call, return the
   result. No business logic, no validation beyond what the DTO/pipe already does.
3. **One module per resource**, exporting its service so other modules can reuse it
   (`PrismaModule` is `@Global()` — every other module isn't, only export what's actually
   needed elsewhere).
4. **New modules get imported into `app.module.ts`** — nothing is auto-discovered.
5. **Every service method gets a unit test** with a mocked `PrismaService` (a plain object with
   `jest.fn()` per method you call) — see `items.service.spec.ts`. Don't spin up a real Nest
   app or hit a real database for unit tests.
