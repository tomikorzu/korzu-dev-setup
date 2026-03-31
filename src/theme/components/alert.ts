import type { Components, Theme } from "@mui/material/styles";

export const MuiAlertOverrides: Components<Theme>["MuiAlert"] = {
  styleOverrides: {
    filledSuccess: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.positive.primary,
      color: theme.vars.palette.text.positive.primary,
    }),
    filledError: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.negative.primary,
      color: theme.vars.palette.text.negative.primary,
    }),
    filledWarning: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.caution.primary,
      color: theme.vars.palette.text.caution.primary,
    }),
    filledInfo: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.info.primary,
      color: theme.vars.palette.text.info.primary,
    }),
    outlinedSuccess: ({ theme }) => ({
      borderColor: theme.vars.palette.border.positive,
      color: theme.vars.palette.text.positive.primary,
    }),
    outlinedError: ({ theme }) => ({
      borderColor: theme.vars.palette.border.negative,
      color: theme.vars.palette.text.negative.primary,
    }),
    outlinedWarning: ({ theme }) => ({
      borderColor: theme.vars.palette.border.caution,
      color: theme.vars.palette.text.caution.primary,
    }),
    outlinedInfo: ({ theme }) => ({
      borderColor: theme.vars.palette.border.info,
      color: theme.vars.palette.text.info.primary,
    }),
    standardSuccess: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.positive.secondary,
      color: theme.vars.palette.text.positive.primary,
    }),
    standardError: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.negative.secondary,
      color: theme.vars.palette.text.negative.primary,
    }),
    standardWarning: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.caution.secondary,
      color: theme.vars.palette.text.caution.primary,
    }),
    standardInfo: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.info.secondary,
      color: theme.vars.palette.text.info.primary,
    }),
  },
};
