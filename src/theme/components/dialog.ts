import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiDialogOverrides: Components<Theme>["MuiDialog"] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: sharedTokens.radius.dialog,
      boxShadow: sharedTokens.shadow.dialog,
      backgroundColor: theme.vars.palette.surface.container.low,
      backgroundImage: "none",
    }),
  },
};

export const MuiDialogTitleOverrides: Components<Theme>["MuiDialogTitle"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: primitives.fontSize.xl,
      fontWeight: primitives.fontWeight.semibold,
      color: theme.vars.palette.text.primary,
      padding: `${primitives.spacing[5]}px ${primitives.spacing[6]}px`,
    }),
  },
};

export const MuiDialogContentOverrides: Components<Theme>["MuiDialogContent"] =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.vars.palette.text.secondary,
        padding: `${primitives.spacing[2]}px ${primitives.spacing[6]}px`,
      }),
    },
  };

export const MuiDialogActionsOverrides: Components<Theme>["MuiDialogActions"] =
  {
    styleOverrides: {
      root: {
        padding: `${primitives.spacing[4]}px ${primitives.spacing[6]}px`,
        gap: primitives.spacing[2],
      },
    },
  };
