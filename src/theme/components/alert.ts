import { Cancel, CheckCircle, Info, Warning } from "@mui/icons-material";
import type { Components, Theme } from "@mui/material/styles";
import { createElement } from "react";
import { primitives } from "../primitives";
import { sharedTokens } from "../tokens/tokens.shared";

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
    root: () => ({
      borderWidth: primitives.borderWidth[1],
      borderStyle: "solid",
      borderRadius: sharedTokens.radius.button,
    }),
    standardSuccess: ({ theme }) => ({
      backgroundColor: theme.palette.states.positive.tertiary,
      borderColor: theme.palette.border.positive,
      color: theme.palette.text.positive.secondary,
      "& .MuiAlert-icon": {
        color: theme.palette.icons.positive,
      },
    }),
    standardError: ({ theme }) => ({
      backgroundColor: theme.palette.states.negative.tertiary,
      borderColor: theme.palette.border.negative,
      color: theme.palette.text.negative.secondary,
      "& .MuiAlert-icon": {
        color: theme.palette.icons.negative,
      },
    }),
    standardWarning: ({ theme }) => ({
      backgroundColor: theme.palette.states.caution.tertiary,
      borderColor: theme.palette.border.caution,
      color: theme.palette.text.caution.secondary,
      "& .MuiAlert-icon": {
        color: theme.palette.icons.caution,
      },
    }),
    standardInfo: ({ theme }) => ({
      backgroundColor: theme.palette.states.info.tertiary,
      borderColor: theme.palette.border.info,
      color: theme.palette.text.info.secondary,
      "& .MuiAlert-icon": {
        color: theme.palette.icons.info,
      },
    }),
  },
};
