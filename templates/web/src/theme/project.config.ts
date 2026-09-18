import { type ColorScale, generateColorScale } from "./color-scale";
import { primitives } from "./primitives";

const { colors, borderRadius } = primitives;

// Edit this file to rebrand a new project.
export const projectConfig = {
  brand: {
    // Client hex; other shades are generated from it.
    primary: generateColorScale("#16A34A"),
    accent: generateColorScale("#C9A84C"),
    tertiary: undefined as ColorScale | undefined,

    positive: colors.green,
    negative: colors.red,
    info: colors.blue,
    caution: colors.yellow,
    neutral: colors.neutral,
  },

  font: {
    sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },

  radius: {
    base: borderRadius.lg,
    button: borderRadius.md,
    card: borderRadius.xl,
    input: borderRadius.base,
    dialog: borderRadius.lg,
    chip: borderRadius.base,
  },

  defaultColorScheme: "light",
} as const;

export type ProjectConfig = typeof projectConfig;
export type BrandConfig = typeof projectConfig.brand;
