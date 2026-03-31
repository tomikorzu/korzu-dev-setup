import type { Components, Theme } from "@mui/material/styles";
import { sharedTokens } from "../tokens/tokens.shared";

export const MuiTextFieldOverrides: Components<Theme>["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: sharedTokens.radius.input,
        transition: sharedTokens.transition.fast,
        backgroundColor: theme.vars.palette.surface.container.low,
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.border.neutral.primary,
          },
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.border.focused,
          },
        },
        "&.Mui-error": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.border.negative,
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.vars.palette.border.neutral.secondary,
        },
      },
      "& .MuiInputBase-input::placeholder": {
        color: theme.vars.palette.text.tertiary,
      },
    }),
  },
};
