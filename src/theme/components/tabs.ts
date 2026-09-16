import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";
import { sharedTokens } from "../tokens/tokens.shared";

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
      fontWeight: primitives.fontWeight.medium,
      transition: sharedTokens.transition.fast,
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
