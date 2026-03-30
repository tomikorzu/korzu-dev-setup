import type { Components, Theme } from "@mui/material/styles";

export const MuiAlertOverrides: Components<Theme>["MuiAlert"] = {
  styleOverrides: {
    filledSuccess: ({ theme }) => ({
      backgroundColor: theme.palette.surface.positive.primary,
      color: theme.palette.text.positive.primary,
    }),
    filledError: ({ theme }) => ({
      backgroundColor: theme.palette.surface.negative.primary,
      color: theme.palette.text.negative.primary,
    }),
    filledWarning: ({ theme }) => ({
      backgroundColor: theme.palette.surface.caution.primary,
      color: theme.palette.text.caution.primary,
    }),
    filledInfo: ({ theme }) => ({
      backgroundColor: theme.palette.surface.info.primary,
      color: theme.palette.text.info.primary,
    }),
    outlinedSuccess: ({ theme }) => ({
      borderColor: theme.palette.border.positive,
      color: theme.palette.text.positive.primary,
    }),
    outlinedError: ({ theme }) => ({
      borderColor: theme.palette.border.negative,
      color: theme.palette.text.negative.primary,
    }),
    outlinedWarning: ({ theme }) => ({
      borderColor: theme.palette.border.caution,
      color: theme.palette.text.caution.primary,
    }),
    outlinedInfo: ({ theme }) => ({
      borderColor: theme.palette.border.info,
      color: theme.palette.text.info.primary,
    }),
    standardSuccess: ({ theme }) => ({
      backgroundColor: theme.palette.surface.positive.secondary,
      color: theme.palette.text.positive.primary,
    }),
    standardError: ({ theme }) => ({
      backgroundColor: theme.palette.surface.negative.secondary,
      color: theme.palette.text.negative.primary,
    }),
    standardWarning: ({ theme }) => ({
      backgroundColor: theme.palette.surface.caution.secondary,
      color: theme.palette.text.caution.primary,
    }),
    standardInfo: ({ theme }) => ({
      backgroundColor: theme.palette.surface.info.secondary,
      color: theme.palette.text.info.primary,
    }),
  },
};
