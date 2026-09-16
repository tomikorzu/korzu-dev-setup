import { primitives } from "./primitives";

const { colors, borderRadius } = primitives;

// The only file to edit when starting a new project — brand, fonts, radius, color scheme.
export const projectConfig = {
  brand: {
    primary: colors.green, // buttons, links, focus rings
    accent: colors.yellow, // highlights, active nav, secondary buttons

    // rarely change between brands
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
    base: borderRadius.lg, // MUI's global default (theme.shape.borderRadius)
    button: borderRadius.md,
    card: borderRadius.xl,
    input: borderRadius.base,
    dialog: borderRadius.lg,
    chip: borderRadius.base,
  },

  defaultColorScheme: "light", // shown before we know the user's/OS preference
} as const;

export type ProjectConfig = typeof projectConfig;
export type BrandConfig = typeof projectConfig.brand;
