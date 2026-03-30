import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";

export const MuiTooltipOverrides: Components<Theme>["MuiTooltip"] = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      backgroundColor: theme.palette.surface.container.highest,
      color: theme.palette.text.primary,
      fontSize: primitives.fontSize.xs,
      fontWeight: primitives.fontWeight.medium,
      borderRadius: primitives.borderRadius.base,
    }),
    arrow: ({ theme }) => ({
      color: theme.palette.surface.container.highest,
    }),
  },
};
