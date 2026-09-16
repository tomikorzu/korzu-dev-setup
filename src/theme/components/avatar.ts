import type { Components, Theme } from "@mui/material/styles";

export const MuiAvatarOverrides: Components<Theme>["MuiAvatar"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.neutral.primary,
      color: theme.vars.palette.text.secondary,
    }),
  },
};
