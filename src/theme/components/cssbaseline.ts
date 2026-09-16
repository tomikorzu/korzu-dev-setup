import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";

export const MuiCssBaselineOverrides: Components<Theme>["MuiCssBaseline"] = {
  styleOverrides: (theme) => ({
    // don't set backgroundColor/color here — CssBaseline already handles them via CSS vars
    body: {
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    "::selection": {
      backgroundColor: theme.vars.palette.brand.primary.enabled,
      color: theme.vars.palette.text.primaryInverse,
    },
    "::-webkit-scrollbar": {
      width: 8,
      height: 8,
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: theme.vars.palette.surface.container.enabled,
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: theme.vars.palette.surface.neutral.primary,
      borderRadius: primitives.borderRadius.sm,
      "&:hover": {
        backgroundColor: theme.vars.palette.surface.container.highest,
      },
    },
  }),
};
