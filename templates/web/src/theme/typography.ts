import { primitives } from "./primitives";
import { projectConfig } from "./project.config";
import { fluidType } from "./utils";

// Headings scale fluidly between mobile and desktop; body/UI text stays fixed
// so it doesn't get harder to read or tap on small screens.
export const typography = {
  fontFamily: projectConfig.font.sans,

  h1: {
    fontSize: fluidType(32, 48),
    fontWeight: primitives.fontWeight.bold,
    lineHeight: primitives.lineHeight.tight,
    letterSpacing: primitives.letterSpacing.tight,
  },
  h2: {
    fontSize: fluidType(28, 36),
    fontWeight: primitives.fontWeight.bold,
    lineHeight: primitives.lineHeight.tight,
    letterSpacing: primitives.letterSpacing.tight,
  },
  h3: {
    fontSize: fluidType(24, 30),
    fontWeight: primitives.fontWeight.semibold,
    lineHeight: primitives.lineHeight.snug,
    letterSpacing: primitives.letterSpacing.normal,
  },
  h4: {
    fontSize: fluidType(20, 24),
    fontWeight: primitives.fontWeight.semibold,
    lineHeight: primitives.lineHeight.snug,
    letterSpacing: primitives.letterSpacing.normal,
  },
  h5: {
    fontSize: fluidType(18, 20),
    fontWeight: primitives.fontWeight.medium,
    lineHeight: primitives.lineHeight.normal,
    letterSpacing: primitives.letterSpacing.normal,
  },
  h6: {
    fontSize: fluidType(16, 18),
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
