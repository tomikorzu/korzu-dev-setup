import type { SemanticTokens } from "./tokens/tokens.types";

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }

  interface Palette {
    surface: SemanticTokens["surface"];
    buttons: SemanticTokens["buttons"];
    navigation: SemanticTokens["navigation"];
    brand: SemanticTokens["brand"];
    icons: SemanticTokens["icons"];
    border: SemanticTokens["border"];
    states: SemanticTokens["states"];
  }

  interface PaletteOptions {
    surface?: SemanticTokens["surface"];
    buttons?: SemanticTokens["buttons"];
    navigation?: SemanticTokens["navigation"];
    brand?: SemanticTokens["brand"];
    icons?: SemanticTokens["icons"];
    border?: SemanticTokens["border"];
    states?: SemanticTokens["states"];
  }

  // Augment CssVarsPalette (for theme.vars.palette access)
  interface CssVarsPalette {
    surface: SemanticTokens["surface"];
    buttons: SemanticTokens["buttons"];
    navigation: SemanticTokens["navigation"];
    brand: SemanticTokens["brand"];
    icons: SemanticTokens["icons"];
    border: SemanticTokens["border"];
    states: SemanticTokens["states"];
  }

  // Extend TypeText for custom text token properties
  interface TypeText {
    primaryInverse: string;
    tertiary: string;
    positive: { primary: string; secondary: string };
    negative: { primary: string; secondary: string };
    info: { primary: string; secondary: string };
    caution: { primary: string; secondary: string };
    brand: { primary: string; accent: string };
    neutral: { primary: string };
    staticWhite: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    nav: true;
    destructive: true;
  }
}
