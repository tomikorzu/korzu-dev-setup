import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../../primitives";
import { tokens } from "../../tokens";
import { createAllButtonStyles, createNavButtonStyles } from "./helpers";

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
      style: createNavButtonStyles(),
    },
  ],
  styleOverrides: {
    root: {
      borderRadius: tokens.radius.button,
      padding: `${primitives.spacing[2]}px ${primitives.spacing[6]}px`,
      fontSize: primitives.fontSize.sm,
      fontWeight: primitives.fontWeight.semibold,
      transition: tokens.transition.base,
      textTransform: "none",
    },

    // Genera automáticamente todos los estilos de variantes y colores
    ...createAllButtonStyles({
      withShadow: true,
      withTransform: true,
      borderWidth: primitives.borderWidth[2],
    }),

    // Sizes
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
