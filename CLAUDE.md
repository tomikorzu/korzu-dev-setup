# create-korzu-app

This repo is a scaffolding CLI (`npx create-korzu-app`), not an app. `src/` is the CLI's own
code; `templates/*` are the projects it scaffolds — each one is a real, independently runnable
project with its own conventions, `CLAUDE.md`, and `.claude/skills/`.

## Working on the CLI itself (`src/`)

- **Minimal code.** No templating engine, no dependency-injection framework — plain `fs`
  recursive copy + a small `{{TOKEN}}` string-substitution pass for `.tmpl`-suffixed files.
  `resolveDependencies.ts` is the one place conditional inclusion logic lives (MobX-on-GraphQL,
  which `packages/*` to generate) — keep it a pure function, easy to unit test.
- **A layer only appears in prompts once its template exists** — see `AVAILABLE_LAYERS` in
  `src/types.ts`. Don't offer a layer the generators can't actually produce yet.
- **Exactly one layer selected → standalone** (`scaffoldStandalone.ts`, no `apps/`/turbo files at
  all). **Two or more → monorepo** (`scaffoldMonorepo.ts`, Turborepo + pnpm-workspaces). Don't
  blur this — a single-layer scaffold should never carry monorepo scaffolding cruft.
- **Non-interactive flags (`--yes --name= --frontend ...`) are not an afterthought** — the CI
  `e2e-scaffold` job depends on them working, and so does anyone scripting this tool.
- Tests: Vitest, colocated `*.test.ts`. `copyTemplate.test.ts` is the pattern for testing file
  operations — use `mkdtemp`/`os.tmpdir()`, clean up in `afterEach`.

## Working on a template (`templates/<name>/`)

- Each template is self-contained: its own `package.json`, its own `CLAUDE.md` +
  `.claude/skills/`, its own lint/test/build tooling. Treat it as a real project you can `cd`
  into and run — because a scaffolded copy of it *is* exactly that.
- `templates/web/package.json`'s `"name"` field is a placeholder (`korzu-web-template`) —
  the CLI's `setPackageName()` rewrites it at scaffold time. Don't hand-template that field with
  `{{PROJECT_NAME}}`; the JSON string-replace approach is fragile for the one field every
  scaffold needs, so it gets a real post-copy rewrite instead.
- A template's own `biome.json`/test config/CI job lints, typechecks, tests, and builds *that
  template*, independent of the CLI's own `biome.json` (which only covers `src/`). `templates/api`
  and `templates/mobile` use Jest, not Vitest — a deliberate, documented exception in each one's
  own `CLAUDE.md` (NestJS's DI tooling and React Native's `jest-expo` preset both assume Jest).
  `templates/cms` has no automated test suite at all — see its own `CLAUDE.md` for why.
- Every template gets its own `pnpm-workspace.yaml` (`packages: ["."]`) so it can `pnpm install`
  standalone without being absorbed into this repo's own workspace. `copyTemplateDir` strips
  that file by default (`LAYER_TEMPLATE_SKIP_ENTRIES`) — it must never reach a scaffolded output.
- In monorepo mode, `removeAppStandaloneConfig()` strips each app's own `.husky/`+`"prepare"`
  script and any root-only `pnpm.*` config (e.g. `onlyBuiltDependencies`) after copying it into
  `apps/<name>/` — only the monorepo root owns those there. This is
  handled once, generically, in `scaffoldMonorepo.ts` — a new template doesn't need to do
  anything special for this to work.
- See `.claude/skills/template-authoring` for the full pattern (variants, `_variants/` overlays,
  the mobx-on-graphql conditional file in `templates/web/_variants/mobx/`, the
  REST-base/GraphQL-overlay pattern in `templates/api` and `packages/api-client`).

## CI

`.github/workflows/ci.yml` has one job per surface: `cli` (lints/tests/builds `src/`),
`e2e-scaffold` (runs the built CLI non-interactively and verifies the output actually
installs/builds), and one `template-<name>` job per template. Adding a template means adding its
own CI job, not extending an existing one.
