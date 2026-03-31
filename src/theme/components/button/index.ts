import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../../primitives";
import {
  buildButtonStyleOverrides,
  createDestructiveButtonStyles,
  createNavButtonStyles,
} from "./helpers";

export const MuiButtonOverrides: Components<Theme>["MuiButton"] = {
  defaultProps: {
    variant: "contained",
    color: "primary",
    size: "medium",
    disableElevation: true,
    disableRipple: true,
    loadingPosition: "start",
  },
  variants: [
    {
      props: { variant: "nav" },
      style: ({ theme }) => createNavButtonStyles(theme),
    },
    {
      props: { variant: "destructive" },
      style: ({ theme }) =>
        createDestructiveButtonStyles(theme, {
          withShadow: true,
          withTransform: true,
        }),
    },
  ],
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.vars.palette.buttons.radius.md,
      padding: `${primitives.spacing[2]}px ${primitives.spacing[6]}px`,
      fontSize: primitives.fontSize.sm,
      fontWeight: primitives.fontWeight.semibold,
      transition: "all 300ms ease-in-out",
      textTransform: "none",
    }),

    ...buildButtonStyleOverrides({
      withShadow: true,
      withTransform: true,
      borderWidth: primitives.borderWidth[2],
    }),

    sizeLarge: {
      padding: `${primitives.spacing[3]}px ${primitives.spacing[8]}px`,
      fontSize: primitives.fontSize.base,
    },

    sizeMedium: {
      padding: `${primitives.spacing[2]}px ${primitives.spacing[6]}px`,
      fontSize: primitives.fontSize.sm,
    },

    sizeSmall: {
      padding: `${primitives.spacing[1]}px ${primitives.spacing[4]}px`,
      fontSize: primitives.fontSize.xs,
    },
  },
};
