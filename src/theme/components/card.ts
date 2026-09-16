import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiCardOverrides: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: sharedTokens.radius.card,
      boxShadow: sharedTokens.shadow.card,
      transition: sharedTokens.transition.base,
      backgroundColor: theme.palette.surface.container.low,
      borderColor: theme.palette.border.neutral.tertiary,
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: sharedTokens.shadow.cardHover,
      },
    }),
  },
};
