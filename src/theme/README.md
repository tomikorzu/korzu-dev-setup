# Theme

Token-driven MUI theme. Colors, radius, fonts, and color scheme all flow from one file —
nothing else here should change per project.

## Rebranding a project

Edit **`project.config.ts`** only: `brand` colors, `font`, `radius`, `defaultColorScheme`.
Everything else derives from it.

## How it flows

```
primitives.ts        → raw scales (colors, spacing, font sizes, shadows...). Never used directly in components.
project.config.ts     → picks brand colors, fonts, and radius from primitives. Edit this to rebrand.
tokens/tokens.light.ts, tokens.dark.ts
                      → semantic tokens (surface, text, buttons, etc.) derived from project.config.ts, per color scheme.
tokens/tokens.shared.ts → tokens that don't change between light/dark (spacing, shadow, transition, radius).
theme.ts              → builds the MUI theme (palette, typography, components) from all of the above.
components/*.ts       → per-component overrides/variants, styled from theme.palette.*.
```

## Rules

- No hardcoded colors, spacing, radius, or font sizes anywhere in `components/*` — always a token.
- Use `theme.palette.*`, not `theme.vars.palette.*`, for custom token groups (surface, buttons,
  states, border, icons, navigation) — they don't exist on `.vars` at runtime.
- Typography (`typography.ts`) is fixed across projects: headings scale fluidly via `fluidType()`,
  body/UI text stays fixed. Always use `Typography` variants, never a raw font size.
- Prefer a component prop or a theme `variant` over `sx`.

See the `theme-tokens-no-hardcoded-colors`, `mui-variants-no-sx`, and `typography-variants`
skills (`.claude/skills/`) for the full rules.
