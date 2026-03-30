/**
 * Shared Tokens (Mode-Agnostic)
 *
 * Tokens that do NOT change between dark and light mode.
 * Includes: semantic spacing, radius, shadows, transitions.
 */

import { primitives } from "../primitives";

export const sharedTokens = {
  spacing: {
    xs: primitives.spacing[1],
    sm: primitives.spacing[2],
    md: primitives.spacing[3],
    lg: primitives.spacing[4],
    xl: primitives.spacing[5],
    "2xl": primitives.spacing[6],
    "3xl": primitives.spacing[8],
    "4xl": primitives.spacing[10],
    "5xl": primitives.spacing[12],
    "6xl": primitives.spacing[16],
  },

  radius: {
    button: primitives.borderRadius.md,
    card: primitives.borderRadius.xl,
    input: primitives.borderRadius.base,
    dialog: primitives.borderRadius.lg,
    chip: primitives.borderRadius.base,
  },

  shadow: {
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    cardHover:
      "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    dialog:
      "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    dropdown:
      "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    button: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
  },

  transition: {
    fast: `all ${primitives.transition.duration.fast} ${primitives.transition.timing.easeOut}`,
    base: `all ${primitives.transition.duration.base} ${primitives.transition.timing.easeInOut}`,
    slow: `all ${primitives.transition.duration.slow} ${primitives.transition.timing.easeInOut}`,
  },
} as const;

export type SharedTokens = typeof sharedTokens;
