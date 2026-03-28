import { primitives } from "./primitives";

export const typography = {
  fontFamily: primitives.fontFamily.sans,

  h1: {
    fontSize: primitives.fontSize["5xl"],
    fontWeight: primitives.fontWeight.bold,
    lineHeight: primitives.lineHeight.tight,
    letterSpacing: primitives.letterSpacing.tight,
  },
  h2: {
    fontSize: primitives.fontSize["4xl"],
    fontWeight: primitives.fontWeight.bold,
    lineHeight: primitives.lineHeight.tight,
    letterSpacing: primitives.letterSpacing.tight,
  },
  h3: {
    fontSize: primitives.fontSize["3xl"],
    fontWeight: primitives.fontWeight.semibold,
    lineHeight: primitives.lineHeight.snug,
    letterSpacing: primitives.letterSpacing.normal,
  },
  h4: {
    fontSize: primitives.fontSize["2xl"],
    fontWeight: primitives.fontWeight.semibold,
    lineHeight: primitives.lineHeight.snug,
    letterSpacing: primitives.letterSpacing.normal,
  },
  h5: {
    fontSize: primitives.fontSize.xl,
    fontWeight: primitives.fontWeight.medium,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },
  h6: {
    fontSize: primitives.fontSize.lg,
    fontWeight: primitives.fontWeight.medium,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },

  body1: {
    fontSize: primitives.fontSize.base,
    fontWeight: primitives.fontWeight.normal,
    lineHeight: primitives.lineHeight.relaxed,
    letterSpacing: primitives.letterSpacing.normal,
  },
  body2: {
    fontSize: primitives.fontSize.sm,
    fontWeight: primitives.fontWeight.normal,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },

  subtitle1: {
    fontSize: primitives.fontSize.lg,
    fontWeight: primitives.fontWeight.medium,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },
  subtitle2: {
    fontSize: primitives.fontSize.base,
    fontWeight: primitives.fontWeight.medium,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },

  button: {
    fontSize: primitives.fontSize.sm,
    fontWeight: primitives.fontWeight.semibold,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.wide,
    textTransform: "none" as const,
  },

  caption: {
    fontSize: primitives.fontSize.xs,
    fontWeight: primitives.fontWeight.normal,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },

  overline: {
    fontSize: primitives.fontSize.xs,
    fontWeight: primitives.fontWeight.semibold,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.wider,
    textTransform: "uppercase" as const,
  },
};
