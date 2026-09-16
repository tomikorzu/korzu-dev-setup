# Korzu

A reusable Next.js starter: MUI theming (light/dark, one-file rebranding), GSAP, forms
(react-hook-form + zod), data fetching (TanStack Query), CMS clients (WordPress/Strapi), SEO,
testing, and CI wired up from day one.

## Getting started

```bash
pnpm install
cp .env.example .env    # fill in the CMS vars you actually use
pnpm dev
```

## Scripts


| Command           | What it does                |
| ----------------- | --------------------------- |
| `pnpm dev`        | Start the dev server        |
| `pnpm build`      | Production build            |
| `pnpm test`       | Run the test suite (Vitest) |
| `pnpm test:watch` | Tests in watch mode         |
| `pnpm lint`       | Biome lint + format check   |
| `pnpm typecheck`  | `tsc --noEmit`              |


A pre-commit hook (Husky + lint-staged) runs Biome on staged files automatically.

## Starting a new project from this starter

Almost everything lives in one of two config files:

- [src/theme/project.config.ts](src/theme/project.config.ts) — brand colors (exact client hex),
fonts, radius, default color scheme. See [src/theme/README.md](src/theme/README.md).
- [src/site.config.ts](src/site.config.ts) — site name, URL, description used across metadata,
the sitemap, and the OG image.

Everything else — components, tokens, dark mode, SEO tags — derives from those two files. See
[src/modules/README.md](src/modules/README.md) for the component/shared-code conventions, and
`.claude/skills/` for the full set of project rules.