import type { Components, Theme } from "@mui/material/styles";
import { primitives } from "../primitives";
import { tokens } from "../tokens";

export const MuiChipOverrides: Components<Theme>["MuiChip"] = {
  styleOverrides: {
    root: {
      fontWeight: primitives.fontWeight.semibold,
      borderRadius: tokens.radius.chip,
      fontSize: primitives.fontSize.xs,
    },
  },
};
