import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiListItemButtonOverrides: Components<Theme>["MuiListItemButton"] =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.vars.palette.navigation.text.default,
        transition: sharedTokens.transition.fast,
        "&:hover": {
          backgroundColor: theme.vars.palette.navigation.surface.hovered,
        },
        "&.Mui-selected": {
          backgroundColor: theme.vars.palette.navigation.surface.current,
          color: theme.vars.palette.navigation.text.current,
          "&:hover": {
            backgroundColor: theme.vars.palette.navigation.surface.current,
          },
        },
      }),
    },
  };
