import type { Components, Theme } from "@mui/material/styles";

export const MuiAppBarOverrides: Components<Theme>["MuiAppBar"] = {
  defaultProps: {
    color: "transparent",
    elevation: 0,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.container.enabled,
      borderBottom: `1px solid ${theme.vars.palette.border.neutral.tertiary}`,
      backgroundImage: "none",
    }),
  },
};
