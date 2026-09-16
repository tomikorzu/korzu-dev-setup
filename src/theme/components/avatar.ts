import type { Components, Theme } from "@mui/material/styles";

export const MuiAvatarOverrides: Components<Theme>["MuiAvatar"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.surface.neutral.primary,
      color: theme.palette.text.secondary,
    }),
  },
};
