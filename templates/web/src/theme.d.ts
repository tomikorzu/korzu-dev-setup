/**
 * MUI Theme Type Extensions
 *
 * Extends the MUI theme types to add custom variants.
 */

import "@mui/material/Button";

// Button custom variants
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    nav: true;
  }
}
