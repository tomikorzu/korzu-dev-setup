import type { Components, Theme } from "@mui/material/styles";

export const MuiTabsOverrides: Components<Theme>["MuiTabs"] = {
  styleOverrides: {
    indicator: ({ theme }) => ({
      backgroundColor: theme.vars.palette.brand.primary.enabled,
    }),
  },
};

export const MuiTabOverrides: Components<Theme>["MuiTab"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.text.tertiary,
      textTransform: "none",
      fontWeight: 500,
      transition: "all 150ms ease-out",
      "&.Mui-selected": {
        color: theme.vars.palette.brand.primary.enabled,
      },
      "&:hover": {
        color: theme.vars.palette.text.primary,
        backgroundColor: theme.vars.palette.surface.neutral.secondary,
      },
    }),
  },
};
