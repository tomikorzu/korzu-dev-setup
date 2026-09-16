import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiIconButtonOverrides: Components<Theme>["MuiIconButton"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.icons.primary,
      transition: sharedTokens.transition.fast,
      "&:hover": {
        backgroundColor: theme.palette.surface.neutral.primary,
      },
      "&:disabled": {
        color: theme.palette.icons.disabled,
      },
    }),
    colorPrimary: ({ theme }) => ({
      color: theme.palette.icons.brand.primary,
    }),
    colorSecondary: ({ theme }) => ({
      color: theme.palette.icons.brand.accent,
    }),
    colorError: ({ theme }) => ({
      color: theme.palette.icons.negative,
    }),
    colorInfo: ({ theme }) => ({
      color: theme.palette.icons.info,
    }),
    colorSuccess: ({ theme }) => ({
      color: theme.palette.icons.positive,
    }),
  },
};
