---
name: mui-variants-no-sx
description: Use when creating or editing any MUI component in this project — building a component, styling one, or reviewing whether a style belongs inline or in the theme. Enforces props-first styling, theme variants over sx, and correct palette access.
---

# MUI: props first, variants over `sx`

This project ships as a reusable starter (theme + components published to npm). Consistency across every component matters more than convenience in a single file.

## Rules

1. **Never reach for `sx` to style a component's own look.** If MUI exposes a prop for it (`color`, `size`, `variant`, `disableElevation`, etc.), use the prop. `sx` is only acceptable for one-off layout glue in a page/screen (e.g. `mt: 2` on a page section), never inside a shared component's root styling.
2. **Repeated or meaningful style combos become a theme `variant`, not inline styles.** Add it under `src/theme/components/<component>.ts` (or `<component>/index.ts` + `helpers.ts` for larger ones, see [button/index.ts](../../../src/theme/components/button/index.ts)):
   ```ts
   variants: [
     { props: { variant: "nav" }, style: ({ theme }) => createNavButtonStyles(theme) },
   ]
   ```
   Then consumers just do `<Button variant="nav" />` — no `sx`, no duplicated styles.
3. **Extend the MUI type augmentation** (`theme.augments.ts`) whenever you add a custom variant/color so TypeScript accepts the new prop value.
4. **In `styleOverrides`/variant `style` callbacks, use `theme.palette`, never `theme.vars.palette`.** Custom palette extensions (surface, buttons, navigation, brand, icons, border, custom text tokens) only exist on `theme.palette` at runtime under `cssVariables` + `colorSchemes` — `theme.vars.palette` is missing them and throws during SSR.
5. **Don't override `body` background/color in `CssBaseline`** — MUI's CSS variables handle light/dark switching automatically.
6. Wrap third-party MUI components with our own only when we need to fix defaults or add variants — otherwise just re-export/use MUI directly.

## When reviewing a component

If you see `sx={{ ... }}` doing anything beyond page-level spacing, stop and ask: is this a prop that already exists? Is this a variant that should live in the theme? Fix it there instead of leaving it inline.
