import type { Components, Theme } from "@mui/material/styles";

export const MuiDividerOverrides: Components<Theme>["MuiDivider"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderColor: theme.palette.border.neutral.tertiary,
    }),
  },
};
