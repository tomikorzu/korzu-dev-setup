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
      backgroundColor: theme.palette.surface.neutral.primary,
      color: theme.palette.text.secondary,
    }),
    outlined: ({ theme }) => ({
      borderColor: theme.palette.border.neutral.primary,
      color: theme.palette.text.secondary,
    }),
    colorPrimary: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.brand.primary.enabled,
        color: theme.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.brand.primary.enabled,
        color: theme.palette.brand.primary.enabled,
      },
    }),
    colorSecondary: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.brand.accent.enabled,
        color: theme.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.brand.accent.enabled,
        color: theme.palette.brand.accent.enabled,
      },
    }),
    colorSuccess: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.success.main,
        color: theme.palette.success.main,
      },
    }),
    colorError: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
      },
    }),
    colorWarning: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.warning.main,
        color: theme.palette.warning.main,
      },
    }),
    colorInfo: ({ theme }) => ({
      "&.MuiChip-filled": {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.text.primaryInverse,
      },
      "&.MuiChip-outlined": {
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
      },
    }),
  },
};
