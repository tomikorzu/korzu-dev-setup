---
name: reuse-shared-components
description: Use before writing any new component, hook, or util in this project — check whether it already exists or belongs in the shared folder instead of a feature module.
---

# Reuse before you build

This repo is a component library first, a Next.js app second. Anything usable outside the one screen it was built for belongs in `src/modules/shared`, not in a feature module.

## Before writing new code

1. Search `src/modules/shared/components`, `src/modules/shared/hooks`, and `src/modules/shared/utils` for something that already does this or is close enough to extend.
2. If nothing exists but what you're building is generic (not tied to one feature's business logic), create it directly under the matching `shared` subfolder:
   - `components/<ComponentName>/<ComponentName>.component.tsx`
   - `hooks/use<Name>.ts`
   - `utils/<name>.util.ts`
3. Only build inside a feature module when the logic is truly specific to that feature.

## Keep it minimal

- Write the smallest amount of code that solves the problem — no speculative props, no config for cases that don't exist yet.
- No comments unless something is genuinely non-obvious; when needed, keep them short and in English.
- Prefer composition of existing shared components/hooks over duplicating logic.
