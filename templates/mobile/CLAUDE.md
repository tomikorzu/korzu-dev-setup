# Mobile template (Expo + NativeWind)

Scaffolded standalone by `create-korzu-app --mobile`, or as `apps/mobile` when combined with
other layers. Expo Router (file-based, mirrors the Frontend template's App Router mental model),
NativeWind for styling.

## Core rules

- **Style with NativeWind `className`, never `StyleSheet.create` or inline `style` objects**,
  the same "props/utility-first over inline styles" spirit as the Frontend template's
  "no `sx`" rule. See the `nativewind-styling` skill.
- **Routes are files under `app/`** — a new screen is a new file, not a route registered by
  hand. See the `expo-router-patterns` skill.
- **This app's colors live in `constants/Colors.ts`** — deliberately NOT shared with the
  Frontend template's MUI theme (different rendering models, not worth forcing). Edit that file
  to rebrand the mobile app; keep `tailwind.config.js`'s `theme.extend.colors.tint` in sync
  manually (Tailwind's config can't import a `.ts` file at build time). See the
  `themed-components` skill.
- **Env vars:** `env.ts`, zod, parse-or-throw — Expo loads `.env` itself and inlines
  `EXPO_PUBLIC_*` vars into the bundle (no `dotenv` needed, unlike the Backend template).
- **Testing:** Jest (`jest-expo` preset) + `@testing-library/react-native`, not Vitest — a
  deliberate, documented exception, same reasoning as the Backend template (React Native's
  tooling assumes Jest).
- **Biome** for lint/format — no ESLint/Prettier.

## Local development

```bash
pnpm install
pnpm dev        # expo start — scan the QR with Expo Go, or press i/a for a simulator
pnpm test
pnpm typecheck
```

## Adding a new screen

Add a file under `app/` (Expo Router picks it up automatically). Compose `ThemedText`/
`ThemedView` from `components/` for anything that needs to respect light/dark mode, same as
every other screen.
