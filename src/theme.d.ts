/**
 * MUI Theme Type Extensions
 * 
 * Extiende los tipos de MUI para agregar variantes custom.
 */

import "@mui/material/Button";


// Button custom variants
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    nav: true;
  }
}