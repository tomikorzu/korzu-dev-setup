import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";

export const MuiDrawerOverrides: Components<Theme>["MuiDrawer"] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.container.low,
      borderRight: `${primitives.borderWidth[1]}px solid ${theme.vars.palette.border.neutral.tertiary}`,
    }),
  },
};
