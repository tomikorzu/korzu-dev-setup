import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiListItemButtonOverrides: Components<Theme>["MuiListItemButton"] =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.navigation.text.default,
        transition: sharedTokens.transition.fast,
        "&:hover": {
          backgroundColor: theme.palette.navigation.surface.hovered,
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.navigation.surface.current,
          color: theme.palette.navigation.text.current,
          "&:hover": {
            backgroundColor: theme.palette.navigation.surface.current,
          },
        },
      }),
    },
  };
