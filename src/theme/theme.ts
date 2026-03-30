import { createTheme } from "@mui/material/styles";
import { primitives } from "./primitives";
import { darkTokens, lightTokens } from "./tokens";
import { typography } from "./typography";
import { components } from "./components";
import type { SemanticTokens } from "./tokens/tokens.types";

import "./theme.augments";

/**
 * Build a MUI PaletteOptions from SemanticTokens.
 * Custom tokens (surface, buttons, navigation, etc.) are added
 * as palette extensions — MUI v7 converts them to CSS vars automatically.
 */
function buildPalette(tokens: SemanticTokens) {
  return {
    primary: {
      main: tokens.brand.primary.enabled,
      dark: tokens.brand.primary.hovered,
      contrastText: tokens.text.primaryInverse,
    },
    secondary: {
      main: tokens.brand.accent.enabled,
      dark: tokens.brand.accent.hovered,
      contrastText: tokens.text.primaryInverse,
    },
    background: {
      default: tokens.surface.container.enabled,
      paper: tokens.surface.container.low,
    },
    text: {
      primary: tokens.text.primary,
      secondary: tokens.text.secondary,
      disabled: tokens.text.disabled,
    },
    success: {
      main: tokens.states.positive.primary,
      light: tokens.surface.positive.primary,
      dark: tokens.states.positive.tertiary,
    },
    error: {
      main: tokens.states.negative.primary,
      light: tokens.surface.negative.primary,
      dark: tokens.states.negative.tertiary,
    },
    warning: {
      main: tokens.states.caution.primary,
      light: tokens.surface.caution.primary,
      dark: tokens.states.caution.tertiary,
    },
    info: {
      main: tokens.states.info.primary,
      light: tokens.surface.info.primary,
      dark: tokens.states.info.tertiary,
    },
    divider: tokens.border.neutral.tertiary,

    // Custom palette extensions — become CSS vars automatically
    surface: tokens.surface,
    buttons: tokens.buttons,
    navigation: tokens.navigation,
    brand: tokens.brand,
    icons: tokens.icons,
    border: tokens.border,
  };
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  colorSchemes: {
    dark: { palette: buildPalette(darkTokens) },
    light: { palette: buildPalette(lightTokens) },
  },
  defaultColorScheme: "light",

  typography,

  shape: {
    borderRadius: primitives.borderRadius.lg,
  },

  spacing: primitives.spacing[1],

  components,
});

export default theme;
