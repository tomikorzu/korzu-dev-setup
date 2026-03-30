/**
 * Dark Mode Semantic Tokens
 *
 * All semantic colors for dark mode.
 * Imports from brand.ts — changing brand updates everything.
 */

import { brand } from "../brand";
import { primitives } from "../primitives";
import type { SemanticTokens } from "./tokens.types";

const { neutral } = brand;
const { borderRadius } = primitives;

const states = {
  positive: {
    primary: brand.positive[600],
    secondary: brand.positive[200],
    tertiary: brand.positive[900],
  },
  negative: {
    primary: brand.negative[400],
    secondary: brand.negative[100],
    tertiary: brand.negative[900],
  },
  info: {
    primary: brand.info[500],
    secondary: brand.info[100],
    tertiary: brand.info[900],
  },
  caution: {
    primary: brand.caution[500],
    secondary: brand.caution[100],
    tertiary: brand.caution[900],
  },
  neutral: {
    primary: neutral[300],
    secondary: neutral[100],
  },
};

const brandTokens = {
  primary: {
    enabled: brand.primary[500],
    hovered: brand.primary[700],
  },
  accent: {
    enabled: brand.accent[500],
    hovered: brand.accent[700],
  },
};

const surface = {
  container: {
    enabled: neutral[900],
    light: neutral[50],
    lowest: neutral[900],
    lowestInverse: neutral[50],
    low: neutral[800],
    high: neutral[700],
    highestInverse: neutral[200],
    highest: neutral[600],
    dim: neutral[500],
  },
  info: {
    primary: brand.info[900],
    secondary: brand.info[800],
  },
  negative: {
    primary: brand.negative[900],
    secondary: brand.negative[800],
  },
  positive: {
    primary: brand.positive[900],
    secondary: brand.positive[800],
  },
  active: brand.primary[900],
  caution: {
    primary: brand.caution[900],
    secondary: brand.caution[800],
  },
  neutral: {
    primary: neutral[600],
    secondary: neutral[800],
  },
  disabled: neutral[700],
};

const buttons = {
  surface: {
    contained: {
      enabled: brandTokens.primary.enabled,
      hovered: brandTokens.primary.hovered,
    },
    outlined: {
      enabled: neutral[800],
      hovered: brand.primary[900],
    },
    text: {
      hovered: brand.primary[900],
    },
    destructive: {
      enabled: brand.negative[400],
      hovered: brand.negative[700],
    },
  },
  text: {
    outlined: {
      enabled: neutral[50],
      secondary: neutral[50],
      hovered: brand.primary[200],
    },
  },
  icon: {
    secondary: {
      enabled: neutral[50],
      hovered: brand.primary[200],
    },
    negative: {
      secondary: brand.negative[300],
    },
  },
  border: {
    outlined: {
      enabled: neutral[50],
      hovered: brand.primary[300],
    },
    destructive: brand.negative[400],
  },
  radius: {
    xs: borderRadius.none,
    sm: borderRadius.sm,
    md: borderRadius.base,
    lg: borderRadius.md,
  },
};

const navigation = {
  surface: {
    current: brand.primary[900],
    hovered: neutral[800],
  },
  text: {
    current: brand.primary[200],
    default: neutral[50],
  },
  icon: {
    current: brand.primary[200],
    default: neutral[50],
  },
};

const text = {
  primary: neutral[50],
  primaryInverse: neutral[900],
  secondary: neutral[200],
  tertiary: neutral[400],
  disabled: neutral[500],
  positive: {
    primary: states.positive.primary,
    secondary: states.positive.secondary,
  },
  negative: {
    primary: states.negative.primary,
    secondary: states.negative.secondary,
  },
  info: {
    primary: states.info.primary,
    secondary: states.info.secondary,
  },
  caution: {
    primary: states.caution.primary,
    secondary: states.caution.secondary,
  },
  brand: {
    primary: brandTokens.primary.enabled,
    accent: brandTokens.accent.enabled,
  },
  neutral: {
    primary: states.neutral.primary,
  },
  staticWhite: neutral[50],
};

const icons = {
  primary: neutral[50],
  staticWhite: neutral[50],
  primaryInverse: neutral[900],
  secondary: neutral[100],
  disabled: neutral[500],
  negative: states.negative.primary,
  info: states.info.primary,
  caution: {
    primary: states.caution.primary,
    secondary: states.caution.secondary,
  },
  positive: states.positive.primary,
  brand: {
    primary: brandTokens.primary.enabled,
    accent: brandTokens.accent.enabled,
  },
  neutral: states.neutral.primary,
};

const border = {
  info: states.info.primary,
  negative: states.negative.primary,
  caution: states.caution.primary,
  positive: states.positive.primary,
  active: brandTokens.primary.enabled,
  focused: neutral[50],
  neutral: {
    primary: states.neutral.primary,
    secondary: states.neutral.secondary,
    tertiary: neutral[600],
  },
  disabled: neutral[500],
};

export const darkTokens: SemanticTokens = {
  states,
  brand: brandTokens,
  surface,
  buttons,
  navigation,
  text,
  icons,
  border,
};
