import type { Components, Theme } from "@mui/material/styles";

export const MuiSkeletonOverrides: Components<Theme>["MuiSkeleton"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.neutral.primary,
    }),
  },
};
