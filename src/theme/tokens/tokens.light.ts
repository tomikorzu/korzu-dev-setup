/**
 * Light Mode Semantic Tokens
 *
 * All semantic colors for light mode.
 * Same structure as dark, inverted shades.
 */

import { brand } from "../brand";
import { primitives } from "../primitives";
import type { SemanticTokens } from "./tokens.types";

const { neutral } = brand;
const { borderRadius } = primitives;

const states = {
  positive: {
    primary: brand.positive[700],
    secondary: brand.positive[100],
    tertiary: brand.positive[50],
  },
  negative: {
    primary: brand.negative[600],
    secondary: brand.negative[100],
    tertiary: brand.negative[50],
  },
  info: {
    primary: brand.info[700],
    secondary: brand.info[100],
    tertiary: brand.info[50],
  },
  caution: {
    primary: brand.caution[700],
    secondary: brand.caution[100],
    tertiary: brand.caution[50],
  },
  neutral: {
    primary: neutral[600],
    secondary: neutral[200],
  },
};

const brandTokens = {
  primary: {
    enabled: brand.primary[600],
    hovered: brand.primary[400],
  },
  accent: {
    enabled: brand.accent[600],
    hovered: brand.accent[400],
  },
};

const surface = {
  container: {
    enabled: neutral[50],
    light: neutral[900],
    lowest: neutral[50],
    lowestInverse: neutral[900],
    low: neutral[100],
    high: neutral[200],
    highestInverse: neutral[700],
    highest: neutral[300],
    dim: neutral[400],
  },
  info: {
    primary: brand.info[50],
    secondary: brand.info[100],
  },
  negative: {
    primary: brand.negative[50],
    secondary: brand.negative[100],
  },
  positive: {
    primary: brand.positive[50],
    secondary: brand.positive[100],
  },
  active: brand.primary[50],
  caution: {
    primary: brand.caution[50],
    secondary: brand.caution[100],
  },
  neutral: {
    primary: neutral[200],
    secondary: neutral[100],
  },
  disabled: neutral[200],
};

const buttons = {
  surface: {
    contained: {
      enabled: brandTokens.primary.enabled,
      hovered: brandTokens.primary.hovered,
    },
    outlined: {
      enabled: neutral[50],
      hovered: brand.primary[50],
    },
    text: {
      hovered: brand.primary[50],
    },
    destructive: {
      enabled: brand.negative[600],
      hovered: brand.negative[400],
    },
  },
  text: {
    outlined: {
      enabled: neutral[900],
      secondary: neutral[900],
      hovered: brand.primary[800],
    },
  },
  icon: {
    secondary: {
      enabled: neutral[900],
      hovered: brand.primary[800],
    },
    negative: {
      secondary: brand.negative[600],
    },
  },
  border: {
    outlined: {
      enabled: neutral[900],
      hovered: brand.primary[700],
    },
    destructive: brand.negative[600],
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
    current: brand.primary[50],
    hovered: neutral[100],
  },
  text: {
    current: brand.primary[700],
    default: neutral[700],
  },
  icon: {
    current: brand.primary[700],
    default: neutral[700],
  },
};

const text = {
  primary: neutral[900],
  primaryInverse: neutral[50],
  secondary: neutral[700],
  tertiary: neutral[500],
  disabled: neutral[400],
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
  primary: neutral[900],
  staticWhite: neutral[50],
  primaryInverse: neutral[50],
  secondary: neutral[600],
  disabled: neutral[400],
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
  focused: neutral[900],
  neutral: {
    primary: states.neutral.primary,
    secondary: states.neutral.secondary,
    tertiary: neutral[300],
  },
  disabled: neutral[400],
};

export const lightTokens: SemanticTokens = {
  states,
  brand: brandTokens,
  surface,
  buttons,
  navigation,
  text,
  icons,
  border,
};
