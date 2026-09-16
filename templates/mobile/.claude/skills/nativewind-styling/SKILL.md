---
name: nativewind-styling
description: Use when styling any component or screen in this Expo app — className/utility conventions, dark mode, and when a raw color value (not a className) is actually needed.
---

# Styling: NativeWind, not StyleSheet

## Rules

1. **Every style is a `className` string of Tailwind utilities.** No
   `StyleSheet.create({...})`, no inline `style={{ ... }}` objects for anything expressible as a
   utility class.
2. **Dark mode is `dark:` prefixed classes** (`bg-white dark:bg-neutral-900`), bound
   automatically to the system color scheme by NativeWind — don't read `useColorScheme()` and
   branch in JS just to pick a className; let the `dark:` variant do it.
3. **A raw color value (not a className) is only needed for props that don't accept
   `className`** — e.g. an icon library's `color` prop. In that rare case, read from
   `constants/Colors.ts`, never a hardcoded hex.
4. **New brand colors go in `tailwind.config.js`'s `theme.extend.colors`**, mirrored in
   `constants/Colors.ts` for the JS-value case above — keep both in sync by hand, Tailwind's
   config can't import a `.ts` module at build time.
5. **`ThemedText`/`ThemedView`** (in `components/`) already carry the light/dark background and
   text color — compose them instead of re-adding `bg-white dark:bg-neutral-900` /
   `text-black dark:text-white` on a raw `View`/`Text` every time.
