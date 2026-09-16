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
      backgroundColor: theme.palette.brand.primary.enabled,
      color: theme.palette.text.primaryInverse,
    },
    "::-webkit-scrollbar": {
      width: 8,
      height: 8,
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.surface.container.enabled,
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.surface.neutral.primary,
      borderRadius: primitives.borderRadius.sm,
      "&:hover": {
        backgroundColor: theme.palette.surface.container.highest,
      },
    },
  }),
};
