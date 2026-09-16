---
name: themed-components
description: Use when building a new reusable component in this Expo app, or deciding whether it needs to be "themed".
---

# Themed components

`ThemedText`/`ThemedView` (in `components/`) are the pattern for any component whose
background/text color must respect light/dark mode — a thin wrapper around the RN primitive that
bakes in the `dark:`-aware className.

## Rules

1. **Any new component that renders text or a background follows the same pattern**: wrap
   `Text`/`View` (or whatever RN primitive), accept the normal props plus `className`, and merge
   the themed base classes with whatever `className` the caller passes in.
2. **Don't reintroduce `useColorScheme()` branching inside a new themed component** — that's
   exactly what `dark:` classes replace. Only reach for the hook when something genuinely can't
   be expressed as a className (see the `nativewind-styling` skill's rule on raw color values).
3. **One component, one concern.** `ThemedText`/`ThemedView` only handle color — they don't also
   own layout/spacing; compose them with regular `className` utilities at the call site instead
   of growing them into a layout system.
