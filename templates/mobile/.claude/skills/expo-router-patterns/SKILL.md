---
name: expo-router-patterns
description: Use when adding a screen, navigation flow, or layout in this Expo Router app.
---

# Expo Router: file-based navigation

Mirrors the Frontend template's Next.js App Router mental model — a route is a file, a shared
shell is a `_layout.tsx`.

## Rules

1. **A new screen is a new file under `app/`** — `app/settings.tsx` → `/settings`,
   `app/users/[id].tsx` → `/users/:id`. Nothing is registered by hand.
2. **`app/_layout.tsx` is the root shell** (providers, global CSS import, the root `Stack`) —
   add a nested `_layout.tsx` inside a subfolder only when that subfolder's routes need their
   own shared chrome (e.g. a tab bar), not for every folder.
3. **`app/+not-found.tsx` handles unmatched routes** — keep it themed consistently with real
   screens (`ThemedView`/`ThemedText`), it's not a throwaway error page.
4. **Navigate with `Link` (from `expo-router`) or the `useRouter()` hook** — never
   `react-navigation` APIs directly; Expo Router wraps it.
5. **`experiments.typedRoutes` is on** (`app.json`) — prefer typed `href`s Expo Router infers
   from the file tree over hand-written string paths where the tooling gives you the option.
