import type { Components, Theme } from "@mui/material/styles";
import NextLink from "next/link";

export const MuiLinkOverrides: Components<Theme>["MuiLink"] = {
  defaultProps: {
    underline: "hover",
    component: NextLink
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.brand.primary.enabled,
      transition: "color 150ms ease-out",
      "&:hover": {
        color: theme.vars.palette.brand.primary.hovered,
      },
    }),
  },
};
