import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiMenuOverrides: Components<Theme>["MuiMenu"] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.container.low,
      boxShadow: sharedTokens.shadow.dropdown,
      borderRadius: sharedTokens.radius.card,
      border: `1px solid ${theme.vars.palette.border.neutral.tertiary}`,
      backgroundImage: "none",
    }),
  },
};

export const MuiMenuItemOverrides: Components<Theme>["MuiMenuItem"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.text.primary,
      transition: "all 150ms ease-out",
      "&:hover": {
        backgroundColor: theme.vars.palette.surface.neutral.secondary,
      },
      "&.Mui-selected": {
        backgroundColor: theme.vars.palette.surface.active,
        color: theme.vars.palette.text.brand.primary,
        "&:hover": {
          backgroundColor: theme.vars.palette.surface.active,
        },
      },
    }),
  },
};
