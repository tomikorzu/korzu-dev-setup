import { createTheme } from "@mui/material/styles";
import { components } from "./components";
import { primitives } from "./primitives";
import { projectConfig } from "./project.config";
import { darkTokens, lightTokens } from "./tokens";
import type { SemanticTokens } from "./tokens/tokens.types";
import { typography } from "./typography";

import "./theme.augments";

// Maps SemanticTokens onto MUI's palette shape. Custom keys (surface, buttons, etc.)
// get turned into CSS vars automatically, same as the standard ones.
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
    text: tokens.text,
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

    surface: tokens.surface,
    buttons: tokens.buttons,
    navigation: tokens.navigation,
    brand: tokens.brand,
    icons: tokens.icons,
    border: tokens.border,
    states: tokens.states,
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
  defaultColorScheme: projectConfig.defaultColorScheme,

  typography,

  shape: {
    borderRadius: projectConfig.radius.base,
  },

  spacing: primitives.spacing[1],

  components,
});

export default theme;
