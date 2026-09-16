# Theme

Token-driven MUI theme. Colors, radius, fonts, and color scheme all flow from one file —
nothing else here should change per project.

## Rebranding a project

Edit **`project.config.ts`** only: `brand` colors, `font`, `radius`, `defaultColorScheme`.
Everything else derives from it.

`brand.primary`/`brand.accent`/`brand.tertiary` take an **exact client hex**
(`generateColorScale("#16A34A")`, see `color-scale.ts`) — not a preset from `primitives.colors`.
That hex renders pixel-exact (light mode uses it at shade 600); every other shade (hover, dark
mode, surfaces) is generated from it, so a client's exact brand color is never approximated.

## How it flows

```
primitives.ts        → raw scales (colors, spacing, font sizes, shadows...). Never used directly in components.
color-scale.ts        → generateColorScale(hex) — builds a 50–900 scale from one exact brand hex.
project.config.ts     → picks brand colors (via color-scale.ts), fonts, and radius. Edit this to rebrand.
tokens/tokens.light.ts, tokens.dark.ts
                      → semantic tokens (surface, text, buttons, etc.) derived from project.config.ts, per color scheme.
tokens/tokens.shared.ts → tokens that don't change between light/dark (spacing, shadow, transition, radius).
theme.ts              → builds the MUI theme (palette, typography, components) from all of the above.
components/*.ts       → per-component overrides/variants, styled from theme.vars.palette.*.
```

## Rules

- No hardcoded colors, spacing, radius, or font sizes anywhere in `components/*` — always a token.
- Use `theme.vars.palette.*`, not `theme.palette.*`, for every color read in
  `styleOverrides`/variants — `theme.palette.*` is static and won't switch with dark/light mode.
- Typography (`typography.ts`) is fixed across projects: headings scale fluidly via `fluidType()`,
  body/UI text stays fixed. Always use `Typography` variants, never a raw font size.
- Prefer a component prop or a theme `variant` over `sx`.

See the `theme-tokens-no-hardcoded-colors`, `mui-variants-no-sx`, and `typography-variants`
skills (`.claude/skills/`) for the full rules.
