import type { Components, Theme } from "@mui/material/styles";

export const MuiCssBaselineOverrides: Components<Theme>["MuiCssBaseline"] = {
  styleOverrides: (theme) => ({
    // body bg/color handled by MUI's CssBaseline via CSS variables automatically.
    // Do NOT set backgroundColor or color here — it overrides MUI's CSS var-based values.
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
      borderRadius: 4,
      "&:hover": {
        backgroundColor: theme.vars.palette.surface.container.highest,
      },
    },
  }),
};
