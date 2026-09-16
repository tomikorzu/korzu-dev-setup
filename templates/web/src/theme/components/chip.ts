import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiChipOverrides: Components<Theme>["MuiChip"] = {
  styleOverrides: {
    root: {
      fontWeight: primitives.fontWeight.semibold,
      borderRadius: sharedTokens.radius.chip,
      fontSize: primitives.fontSize.xs,
    },
    filled: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.neutral.primary,
      color: theme.vars.palette.text.secondary,
    }),
    outlined: ({ theme }) => ({
      borderColor: theme.vars.palette.border.neutral.primary,
      color: theme.vars.palette.text.secondary,
    }),
    colorPrimary: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.vars.palette.brand.primary.enabled,
        color: theme.vars.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.vars.palette.brand.primary.enabled,
        color: theme.vars.palette.brand.primary.enabled,
      },
    }),
    colorSecondary: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.vars.palette.brand.accent.enabled,
        color: theme.vars.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.vars.palette.brand.accent.enabled,
        color: theme.vars.palette.brand.accent.enabled,
      },
    }),
    colorSuccess: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.vars.palette.success.main,
        color: theme.vars.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.vars.palette.success.main,
        color: theme.vars.palette.success.main,
      },
    }),
    colorError: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.vars.palette.error.main,
        color: theme.vars.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.vars.palette.error.main,
        color: theme.vars.palette.error.main,
      },
    }),
    colorWarning: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.vars.palette.warning.main,
        color: theme.vars.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.vars.palette.warning.main,
        color: theme.vars.palette.warning.main,
      },
    }),
    colorInfo: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.vars.palette.info.main,
        color: theme.vars.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.vars.palette.info.main,
        color: theme.vars.palette.info.main,
      },
    }),
  },
};
