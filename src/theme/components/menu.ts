import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiMenuOverrides: Components<Theme>["MuiMenu"] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      backgroundColor: theme.palette.surface.container.low,
      boxShadow: sharedTokens.shadow.dropdown,
      borderRadius: sharedTokens.radius.card,
      border: `1px solid ${theme.palette.border.neutral.tertiary}`,
      backgroundImage: "none",
    }),
  },
};

export const MuiMenuItemOverrides: Components<Theme>["MuiMenuItem"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
      transition: "all 150ms ease-out",
      "&:hover": {
        backgroundColor: theme.palette.surface.neutral.secondary,
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.surface.active,
        color: theme.palette.text.brand.primary,
        "&:hover": {
          backgroundColor: theme.palette.surface.active,
        },
      },
    }),
  },
};
