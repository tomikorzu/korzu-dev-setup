import type { Components, Theme } from "@mui/material/styles";
import NextLink from "next/link";
import { primitives } from "../primitives";

export const MuiLinkOverrides: Components<Theme>["MuiLink"] = {
  defaultProps: {
    underline: "hover",
    component: NextLink,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.brand.primary.enabled,
      transition: `color ${primitives.transition.duration.fast} ${primitives.transition.timing.easeOut}`,
      "&:hover": {
        color: theme.vars.palette.brand.primary.hovered,
      },
    }),
  },
};
