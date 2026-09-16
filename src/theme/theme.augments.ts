import type { SemanticTokens } from "./tokens/tokens.types";

type CustomPaletteTokens = {
  surface: SemanticTokens["surface"];
  buttons: SemanticTokens["buttons"];
  navigation: SemanticTokens["navigation"];
  brand: SemanticTokens["brand"];
  icons: SemanticTokens["icons"];
  border: SemanticTokens["border"];
  states: SemanticTokens["states"];
};

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }

  interface Palette extends CustomPaletteTokens {}
  interface PaletteOptions extends Partial<CustomPaletteTokens> {}
  interface CssVarsPalette extends CustomPaletteTokens {}

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
