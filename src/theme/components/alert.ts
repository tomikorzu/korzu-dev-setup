import { Cancel, CheckCircle, Info, Warning } from "@mui/icons-material";
import type { Components, Theme } from "@mui/material/styles";
import { createElement } from "react";

export const MuiAlertOverrides: Components<Theme>["MuiAlert"] = {
  defaultProps: {
    severity: "info",
    iconMapping: {
      success: createElement(CheckCircle),
      info: createElement(Info),
      warning: createElement(Warning),
      error: createElement(Cancel),
    },
    variant: "standard",
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: theme.vars.palette.buttons.radius.md,
    }),
    standardSuccess: ({ theme }) => ({
      backgroundColor: theme.vars.palette.states.positive.tertiary,
      borderColor: theme.vars.palette.border.positive,
      color: theme.vars.palette.text.positive.secondary,
      '& .MuiAlert-icon': {
        color: theme.vars.palette.icons.positive,
      },
    }),
    standardError: ({ theme }) => ({
      backgroundColor: theme.vars.palette.states.negative.tertiary,
      borderColor: theme.vars.palette.border.negative,
      color: theme.vars.palette.text.negative.secondary,
      '& .MuiAlert-icon': {
        color: theme.vars.palette.icons.negative,
      },
    }),
    standardWarning: ({ theme }) => ({
      backgroundColor: theme.vars.palette.states.caution.tertiary,
      borderColor: theme.vars.palette.border.caution,
      color: theme.vars.palette.text.caution.secondary,
      '& .MuiAlert-icon': {
        color: theme.vars.palette.icons.caution,
      },
    }),
    standardInfo: ({ theme }) => ({
      backgroundColor: theme.vars.palette.states.info.tertiary,
      borderColor: theme.vars.palette.border.info,
      color: theme.vars.palette.text.info.secondary,
      '& .MuiAlert-icon': {
        color: theme.vars.palette.icons.info,
      },
    }),
  },
};
