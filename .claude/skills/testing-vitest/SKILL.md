---
name: testing-vitest
description: Use when writing or reviewing tests in this project — utils, hooks, or components. Vitest + Testing Library, configured and ready.
---

# Testing: Vitest + Testing Library

`vitest.config.ts` is already wired up (`jsdom`, path aliases, `@testing-library/jest-dom`
matchers). Run with `pnpm test` (single run) or `pnpm test:watch`.

## Rules

1. **Colocate tests next to the file they cover**: `Foo.component.tsx` →
   `Foo.component.test.tsx`; `bar.util.ts` → `bar.util.test.ts`.
2. **Plain utils get a plain test** — `import { describe, expect, it } from "vitest"`, no
   rendering needed.
3. **Components that read theme tokens need `renderWithTheme`** from `@/test/render`, not
   Testing Library's raw `render` — it wraps the tree in the real MUI `ThemeProvider` so
   `sx={{ color: "text.secondary" }}`-style tokens resolve instead of erroring.
4. **Test behavior, not implementation** — assert on what the user sees/does
   (`screen.getByText`, `userEvent.click`), not internal state or class names.
5. **New shared components should ship with at least one test** covering their main prop-driven
   behavior (a variant, a controlled value, a callback firing) — see
   `StatusDot.component.test.tsx` for the pattern.
