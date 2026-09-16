import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";
import { sharedTokens } from "../tokens/tokens.shared";

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
      fontWeight: primitives.fontWeight.medium,
      transition: sharedTokens.transition.fast,
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
