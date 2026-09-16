# create-korzu-app

Scaffold a new project from a menu:

- **Frontend** — Next.js + MUI + GSAP, with token-driven theming, Zustand + TanStack Query,
  forms, SEO, testing and CI already wired up.
- **Backend** — NestJS + Prisma + PostgreSQL, REST or GraphQL (your choice at scaffold time).
- **Mobile** — Expo + NativeWind.
- **CMS** — Strapi, version-pinned.

Picking **Frontend + Backend with GraphQL** adds MobX to the frontend, for modeling client-side
domain state on top of GraphQL query results — Zustand still owns plain UI state either way.

Pick exactly one and it's scaffolded standalone. Pick two or more and you get a
Turborepo + pnpm-workspaces monorepo (`apps/*`, `packages/*`) instead — that's when code
actually needs sharing (typed API client, shared types). UI components are never shared between
web and mobile; MUI and React Native are different enough that it isn't worth forcing.

## Usage

```bash
npx create-korzu-app
```

Or non-interactively (useful for CI/scripts):

```bash
npx create-korzu-app --yes --name=my-app --frontend
```

Flags: `--name`, `--dir`, `--frontend`, `--backend=rest|graphql`, `--mobile`, `--cms`,
`--no-install`, `--no-git`.

## Repo layout

This repo is the CLI's own source, not an app:

```
src/            the CLI itself — prompts, file-copy/substitution, standalone vs monorepo generators
templates/      what actually gets scaffolded, one folder per layer (each fully runnable on its own)
  web/          the Frontend template — cd in, pnpm install, pnpm dev, just like any Next.js app
  api/          the Backend template — cd in, docker compose up -d, pnpm install, pnpm dev
  mobile/       the Mobile template — cd in, pnpm install, pnpm dev, just like any Expo app
  cms/          the CMS template — cd in, docker compose up -d, pnpm install, pnpm dev
  _monorepo-root/  turbo.json/pnpm-workspace.yaml + packages/{types,api-client}, used when 2+ layers are picked
```

See `.claude/skills/template-authoring` for how to add or edit a template.

## Developing the CLI

```bash
pnpm install
pnpm dev -- --yes --name=demo --frontend --no-install   # runs the CLI from source via tsx
pnpm test
pnpm build                                                # bundles to dist/cli.js
```

To work on the Frontend template itself, treat `templates/web` as its own project:
`cd templates/web && pnpm install && pnpm dev`.

## Publishing a new version

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build   # verify everything first

npm version patch   # 0.1.0 -> 0.1.1 — fixes, small tweaks
npm version minor   # 0.1.0 -> 0.2.0 — new functionality (e.g. a new template, a new flag)
npm version major   # 0.1.0 -> 1.0.0 — breaking changes

npm publish --otp=123456   # your real 2FA code from your authenticator app

git push && git push --tags
```

`npm version` bumps `package.json`, commits, and tags in one step. `prepublishOnly` already runs
`pnpm build`, so `dist/cli.js` is always rebuilt before publishing. Verify with:
`npm view create-korzu-app version`.
