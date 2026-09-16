---
name: typography-variants
description: Use when writing or reviewing any text in this project — which Typography variant to use, and whether typography.ts itself may be touched. Applies to every project started from this starter.
---

# Typography: fixed scale, variants only

`src/theme/typography.ts` defines the type scale (`h1`–`h6`, `body1`/`body2`, `subtitle1`/`subtitle2`,
`button`, `caption`, `overline`). **This file does not change per project** — it's part of the
base starter, same as the token chain in `theme-tokens-no-hardcoded-colors`. Only `brand.ts`
changes to rebrand a project; typography stays constant across all of them.

## Why it already works on mobile and desktop

Headings (`h1`–`h6`) use `fluidType()` (`src/theme/utils.ts`) — a `clamp()`-based fluid size
that scales smoothly between a mobile and a desktop value instead of jumping at breakpoints.
Body text, `subtitle`, `button`, `caption`, and `overline` stay at a fixed size on purpose:
shrinking body/UI text on mobile hurts readability and tap targets, so only display-level text
scales.

## Rules

1. **Use `<Typography variant="...">` (or a component's built-in text variant), never a raw
   `<p>`/`<span>` with a hardcoded `fontSize`.** If a screen needs a heading, it's `variant="h1"`
   … `"h6"`; body copy is `body1`/`body2`; a form label/secondary line is `subtitle1`/`subtitle2`;
   small print is `caption`; all-caps labels are `overline`.
2. **Don't add a one-off font size via `sx`.** If none of the existing variants fit, that's a
   sign the design needs a new semantic variant — add it properly to `typography.ts` (and its
   type augmentation) rather than special-casing one screen. This should be rare; it changes the
   shared scale, not a single project.
3. **Never hardcode `fontSize`/`fontWeight`/`lineHeight` in a component.** Same reasoning as
   colors in `theme-tokens-no-hardcoded-colors` — these come from the variant, which comes from
   `primitives.ts`.
4. **Headings should stay fluid, body/UI text should stay fixed.** If asked to make more text
   "responsive," prefer adjusting the `fluidType()` min/max on the relevant heading variant over
   adding manual `theme.breakpoints` overrides in a component.
