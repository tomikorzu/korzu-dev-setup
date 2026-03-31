import type { Components, Theme } from "@mui/material/styles";

export const MuiSwitchOverrides: Components<Theme>["MuiSwitch"] = {
  styleOverrides: {
    switchBase: ({ theme }) => ({
      "&.Mui-checked": {
        color: theme.vars.palette.brand.primary.enabled,
        "& + .MuiSwitch-track": {
          backgroundColor: theme.vars.palette.brand.primary.enabled,
          opacity: 0.5,
        },
      },
      "&.Mui-disabled": {
        color: theme.vars.palette.surface.disabled,
        "& + .MuiSwitch-track": {
          opacity: 0.3,
        },
      },
    }),
    track: ({ theme }) => ({
      backgroundColor: theme.vars.palette.surface.neutral.primary,
    }),
  },
};
