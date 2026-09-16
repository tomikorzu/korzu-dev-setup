---
name: nextjs-patterns
description: Use when adding pages, layouts, or routes in this Next.js App Router project, or when deciding server vs client components.
---

# Next.js conventions for this starter

This project targets Next.js App Router (`src/app`). It's the shell around the shared component/theme library, so keep it thin.

## Rules

1. **Server Components by default.** Only add `"use client"` when a file needs state, effects, browser APIs, or GSAP.
2. **Pages stay thin.** A page composes shared components; it doesn't hold styling logic or business logic — that belongs in `src/modules/shared` or a feature module.
3. **Use `next/link` for navigation**, not raw `<a>` (see [Breadcrumbs.component.tsx](../../../src/modules/shared/components/Breadcrumbs/Breadcrumbs.component.tsx) for the pattern of wrapping MUI's `Link` with Next's).
4. **No inline styling in pages beyond layout spacing** — component look-and-feel is the component's job (see `mui-variants-no-sx` skill).
5. Metadata, layouts, and route groups follow standard App Router file conventions (`layout.tsx`, `page.tsx`, `loading.tsx`) — don't invent alternatives.
