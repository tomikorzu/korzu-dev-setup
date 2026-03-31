import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";

export const MuiTooltipOverrides: Components<Theme>["MuiTooltip"] = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.container.highest,
      color: theme.vars.palette.text.primary,
      fontSize: primitives.fontSize.xs,
      fontWeight: primitives.fontWeight.medium,
      borderRadius: primitives.borderRadius.base,
    }),
    arrow: ({ theme }) => ({
      color: theme.vars.palette.surface.container.highest,
    }),
  },
};
