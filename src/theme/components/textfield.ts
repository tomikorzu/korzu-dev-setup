import type { Components, Theme } from "@mui/material/styles";
import { tokens } from "../tokens";

export const MuiTextFieldOverrides: Components<Theme>["MuiTextField"] = {
  styleOverrides: {
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: tokens.radius.input,
        transition: tokens.transition.fast,
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.textFields.borderHover,
          },
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.textFields.borderFocus,
          },
        },
        "&.Mui-error": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.textFields.borderError,
          },
        },
      },
    },
  },
};
