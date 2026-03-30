import type { Components, Theme } from "@mui/material/styles";

export const MuiTabsOverrides: Components<Theme>["MuiTabs"] = {
  styleOverrides: {
    indicator: ({ theme }) => ({
      backgroundColor: theme.palette.brand.primary.enabled,
    }),
  },
};

export const MuiTabOverrides: Components<Theme>["MuiTab"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.tertiary,
      textTransform: "none",
      fontWeight: 500,
      transition: "all 150ms ease-out",
      "&.Mui-selected": {
        color: theme.palette.brand.primary.enabled,
      },
      "&:hover": {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.surface.neutral.secondary,
      },
    }),
  },
};
