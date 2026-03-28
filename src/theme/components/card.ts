import type { Components, Theme } from "@mui/material/styles";
import { tokens } from "../tokens";

export const MuiCardOverrides: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: tokens.radius.card,
      boxShadow: tokens.shadow.card,
      transition: tokens.transition.base,
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: tokens.shadow.cardHover,
      },
    },
  },
};
