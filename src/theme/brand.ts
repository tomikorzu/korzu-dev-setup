/**
 * Brand Configuration
 *
 * This is the ONLY file you need to change to rebrand a project.
 * Maps semantic roles to color scales from primitives.
 */

import { primitives } from "./primitives";

const { colors } = primitives;

export const brand = {
  /** Primary action color (buttons, links, focus rings) */
  primary: colors.green,
  /** Accent/secondary color (highlights, active nav, secondary buttons) */
  accent: colors.yellow,

  // Semantic colors — rarely change between brands
  positive: colors.green,
  negative: colors.red,
  info: colors.blue,
  caution: colors.yellow,
  neutral: colors.neutral,
} as const;

export type BrandConfig = typeof brand;
