import type { Components, Theme } from "@mui/material/styles";

export const MuiCssBaselineOverrides: Components<Theme>["MuiCssBaseline"] = {
  styleOverrides: (theme) => ({
    body: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
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
      borderRadius: 4,
      "&:hover": {
        backgroundColor: theme.palette.surface.container.highest,
      },
    },
  }),
};
