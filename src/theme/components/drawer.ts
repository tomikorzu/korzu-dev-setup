import type { Components, Theme } from "@mui/material/styles";

export const MuiDrawerOverrides: Components<Theme>["MuiDrawer"] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      backgroundColor: theme.palette.surface.container.low,
      borderRight: `1px solid ${theme.palette.border.neutral.tertiary}`,
    }),
  },
};
