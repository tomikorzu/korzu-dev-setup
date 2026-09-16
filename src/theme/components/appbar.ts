import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";

export const MuiAppBarOverrides: Components<Theme>["MuiAppBar"] = {
  defaultProps: {
    color: "transparent",
    elevation: 0,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.surface.container.enabled,
      borderBottom: `${primitives.borderWidth[1]}px solid ${theme.palette.border.neutral.tertiary}`,
      backgroundImage: "none",
    }),
  },
};
