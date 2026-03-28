/**
 * Component Overrides Index
 * 
 * Centraliza todas las personalizaciones de componentes MUI.
 */

import type { Components, Theme } from "@mui/material/styles";
import { MuiButtonOverrides } from "./button";
import { MuiCardOverrides } from "./card";
import { MuiChipOverrides } from "./chip";
import { MuiTextFieldOverrides } from "./textfield";
import { MuiLinkOverrides } from "./link";

export const components: Components<Theme> = {
  MuiButton: MuiButtonOverrides,
  MuiCard: MuiCardOverrides,
  MuiChip: MuiChipOverrides,
  MuiTextField: MuiTextFieldOverrides,
  MuiLink: MuiLinkOverrides,
};
