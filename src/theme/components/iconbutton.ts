import type { Components, Theme } from "@mui/material/styles";

export const MuiIconButtonOverrides: Components<Theme>["MuiIconButton"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.icons.primary,
      transition: "all 150ms ease-out",
      "&:hover": {
        backgroundColor: theme.vars.palette.surface.neutral.primary,
      },
      "&:disabled": {
        color: theme.vars.palette.icons.disabled,
      },
    }),
    colorPrimary: ({ theme }) => ({
      color: theme.vars.palette.icons.brand.primary,
    }),
    colorSecondary: ({ theme }) => ({
      color: theme.vars.palette.icons.brand.accent,
    }),
    colorError: ({ theme }) => ({
      color: theme.vars.palette.icons.negative,
    }),
    colorInfo: ({ theme }) => ({
      color: theme.vars.palette.icons.info,
    }),
    colorSuccess: ({ theme }) => ({
      color: theme.vars.palette.icons.positive,
    }),
  },
};
