---
name: theme-tokens-no-hardcoded-colors
description: Use when writing or reviewing any styling in this project — colors, spacing, radius, shadows. Enforces theming through tokens instead of hardcoded values, so rebranding a new project only means editing brand.ts.
---

# Theming: tokens only, never hardcoded values

This starter is rebranded per project by changing **one file**: `src/theme/brand.ts`. That only
works if nothing in the app ever hardcodes a color, and both light and dark mode stay correct.

## The token chain

```
src/theme/primitives.ts   → raw color scales (50–900), spacing, radius, shadow, etc. Never used directly in components.
src/theme/brand.ts        → maps semantic roles (primary, accent, positive, negative, info, caution, neutral)
                             to a primitives color scale. THE ONLY FILE to edit to rebrand a project.
src/theme/tokens/tokens.light.ts / tokens.dark.ts
                           → derive every semantic token (surface, text, icons, border, buttons, navigation, states)
                             from brand.ts, per color scheme. Structural parity enforced by tokens.types.ts.
src/theme/theme.ts        → buildPalette() turns SemanticTokens into MUI's palette + colorSchemes (light/dark).
src/theme/components/*.ts → component overrides/variants read from theme.palette.*, never a raw hex.
```

To start a new project from this starter: change `brand.primary`/`brand.accent` (and the
semantic colors, if needed) in `brand.ts`. Everything else — buttons, chips, alerts, nav, dark
mode — updates automatically because it all derives from that one file.

## Rules

1. **Never write a hex/rgb/hsl value, or a MUI default color name, in a component.** Not in
   `sx`, not in `styleOverrides`, not as a prop default. If a color is needed, it already exists
   as a token — find it in `tokens.types.ts` (surface, text, icons, border, buttons, navigation,
   states, brand) or add it there first, deriving from `primitives.colors`.
2. **New primitive scales, not new raw colors.** If a genuinely new color family is needed, add
   it to `primitives.colors`, then reference it from `brand.ts` or the relevant token file — never
   inline a new hex anywhere else.
3. **Access tokens through `theme.palette.*` in styleOverrides/variant callbacks**, per
   `mui-variants-no-sx`. Only plain, standard MUI palette props (`primary.main`, etc.) may use
   `theme.vars.palette.*`; custom token groups (surface, buttons, navigation, brand, icons,
   border, states, custom text keys) must go through `theme.palette.*`.
4. **Every new token must be added to both `tokens.light.ts` and `tokens.dark.ts`** with the same
   shape — `SemanticTokens` (`tokens.types.ts`) enforces this at compile time. Never add a token
   to only one mode.
5. **Non-color primitives (spacing, radius, shadow, transition, z-index) come from
   `primitives.ts` / `sharedTokens`**, not magic numbers — same rule as colors, just not
   color-specific.
6. **Use `alpha()`, `focusRing()`, `fluidType()` from `src/theme/utils.ts`** instead of writing
   `rgba(...)` or `clamp(...)` by hand for transparency, focus rings, or fluid type.

## When reviewing styling code

If you see a hex code, `rgb(...)`, or a bare MUI color name (`"grey.500"`, `"#fff"`) anywhere
outside `primitives.ts`/`tokens.*.ts`, it's wrong — replace it with the matching semantic token
and verify it renders correctly in both `light` and `dark` color scheme.
