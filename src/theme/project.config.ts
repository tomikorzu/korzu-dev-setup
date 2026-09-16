import { primitives } from "./primitives";
import { generateColorScale, type ColorScale } from "./color-scale";

const { colors, borderRadius } = primitives;

// The only file to edit when starting a new project — brand, fonts, radius, color scheme.
export const projectConfig = {
  brand: {
    // Exact client hex (e.g. a restaurant's brand green) — rendered pixel-exact in
    // light mode; every other shade (hover, dark mode, surfaces) is generated from it.
    primary: generateColorScale("#16A34A"), // buttons, links, focus rings
    accent: generateColorScale("#C9A84C"), // highlights, active nav, secondary buttons
    // set to generateColorScale("#hex") if the client has a third brand color
    tertiary: undefined as ColorScale | undefined,

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
