# korzu-dev-setup

Reusable Next.js + MUI + GSAP starter kit. The goal is to publish this to npm so new
projects boot up with the theme, shared components, and conventions already in place —
treat everything here as library code, not a one-off app.

## Core rules

- **Props over `sx`.** Always prefer a component's own props (`color`, `size`, `variant`, ...)
  over `sx`. A repeated or meaningful style becomes a MUI theme `variant` in
  `src/theme/components/`, not inline styles. See the `mui-variants-no-sx` skill.
- **Reuse before building.** Check `src/modules/shared/{components,hooks,utils}` before writing
  anything new. Anything usable outside one feature belongs in `shared`. See the
  `reuse-shared-components` skill.
- **Minimal code.** Write only as much as the task needs — readable, no speculative
  abstractions, no unused config for cases that don't exist yet.
- **Comments:** English only, and only when something is genuinely non-obvious. Keep them
  short and clear.
- **Theme:** never hardcode a color (or spacing/radius/shadow). Everything comes from
  `src/theme` tokens, derived from the single `project.config.ts` entry point (brand colors are
  exact client hex via `generateColorScale()`), with full light/dark support. Use
  `theme.vars.palette.*`, never `theme.palette.*`, for colors inside `styleOverrides`/variant
  callbacks — `.palette` is static and won't switch with dark/light mode. Never override `body`
  background/color in `CssBaseline`; MUI's CSS variables handle that. See the
  `theme-tokens-no-hardcoded-colors` skill.
- **Typography:** `src/theme/typography.ts` is fixed across every project (headings scale
  fluidly mobile→desktop via `fluidType()`, body/UI text stays fixed). Always use `Typography`
  variants, never a hardcoded font size. See the `typography-variants` skill.
- **Next.js:** Server Components by default, `"use client"` only when needed (state, effects,
  GSAP). Pages stay thin and compose shared components. See the `nextjs-patterns` skill.
- **Animations:** GSAP only, scoped with `useGSAP` in client components. See the
  `gsap-animations` skill.
- **Forms:** `react-hook-form` + `zod`, wired through existing shared inputs via `Controller`.
  See the `forms-rhf-zod` skill.
- **Data fetching:** `@tanstack/react-query` for anything client-side (`QueryProvider` already
  mounted in `App.provider.tsx`). See the `tanstack-query-data` skill.
- **CMS:** `createWordPressClient`/`createStrapiClient`
  (`src/modules/shared/utils/{wordpress,strapi}.util.ts`) return normalized, typed data — never
  fetch a CMS REST endpoint by hand.
- **Client state:** Zustand, only for state shared across components with no common parent
  (`src/modules/shared/stores/`). Server data stays in TanStack Query. See the
  `client-state-zustand` skill.
- **SEO:** every page exports `metadata` via `createMetadata()`
  (`src/modules/shared/utils/seo.util.ts`); site identity lives in `src/site.config.ts`. See the
  `seo-metadata` skill.
- **Env vars:** validated and typed in `src/env.ts` (zod) — add new vars there, import `env` from
  it, never read `process.env` directly in app code.
- **Testing:** Vitest + Testing Library, colocated `*.test.ts(x)` files, `renderWithTheme` from
  `@/test/render` for components. See the `testing-vitest` skill.
- **CI/hooks:** GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, test, and build
  on every PR. Husky + lint-staged run Biome on staged files before each commit.

## Skills

- `mui-variants-no-sx` — styling components via props/theme variants instead of `sx`
- `reuse-shared-components` — where new code should live
- `nextjs-patterns` — App Router conventions for this starter
- `gsap-animations` — animating with GSAP in this stack
- `forms-rhf-zod` — building forms with react-hook-form + zod
- `tanstack-query-data` — fetching/caching/mutating server data
- `theme-tokens-no-hardcoded-colors` — colors/spacing/radius always via tokens, never hardcoded
- `typography-variants` — fixed, responsive type scale; always use `Typography` variants
- `client-state-zustand` — when (and when not) to reach for a global store
- `seo-metadata` — metadata/sitemap/robots/OG image helpers
- `testing-vitest` — writing tests with Vitest + Testing Library
