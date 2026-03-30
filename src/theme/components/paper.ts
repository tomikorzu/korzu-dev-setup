import type { Components, Theme } from "@mui/material/styles";

export const MuiPaperOverrides: Components<Theme>["MuiPaper"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.surface.container.low,
      backgroundImage: "none",
    }),
    outlined: ({ theme }) => ({
      borderColor: theme.palette.border.neutral.secondary,
    }),
  },
};
