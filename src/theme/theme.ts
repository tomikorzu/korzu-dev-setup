import { createTheme } from "@mui/material/styles";
import { primitives } from "./primitives";
import { tokens } from "./tokens";
import { typography } from "./typography";
import { components } from "./components";

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.brand.primary.enabled,
      dark: tokens.brand.primary.hovered,
    },
    secondary: {
      main: tokens.brand.accent.enabled,
      dark: tokens.brand.accent.hovered,
    },
    background: {
      default: tokens.surface.container.enabled,
      paper: tokens.surface.container.enabled,
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
    divider: tokens.border.divider,
  },

  typography,

  shape: {
    borderRadius: primitives.borderRadius.lg,
  },

  spacing: primitives.spacing[1],

  components,
});

export default theme;

export { primitives } from "./primitives";
export { tokens } from "./tokens";
export { typography } from "./typography";
