/**
 * Semantic Tokens Type Definition
 *
 * Interface that enforces structural parity between light and dark
 * at compile time. Structure defined by semantic purpose.
 */

export interface SemanticTokens {
  states: {
    positive: { primary: string; secondary: string; tertiary: string };
    negative: { primary: string; secondary: string; tertiary: string };
    info: { primary: string; secondary: string; tertiary: string };
    caution: { primary: string; secondary: string; tertiary: string };
    neutral: { primary: string; secondary: string };
  };

  brand: {
    primary: { enabled: string; hovered: string };
    accent: { enabled: string; hovered: string };
  };

  surface: {
    container: {
      enabled: string;
      light: string;
      lowest: string;
      lowestInverse: string;
      low: string;
      high: string;
      highestInverse: string;
      highest: string;
      dim: string;
    };
    info: { primary: string; secondary: string };
    negative: { primary: string; secondary: string };
    positive: { primary: string; secondary: string };
    active: string;
    caution: { primary: string; secondary: string };
    neutral: { primary: string; secondary: string };
    disabled: string;
  };

  buttons: {
    surface: {
      contained: { enabled: string; hovered: string };
      outlined: { enabled: string; hovered: string };
      text: { hovered: string };
      destructive: { enabled: string; hovered: string };
    };
    text: {
      outlined: { enabled: string; secondary: string; hovered: string };
    };
    icon: {
      secondary: { enabled: string; hovered: string };
      negative: { secondary: string };
    };
    border: {
      outlined: { enabled: string; hovered: string };
      destructive: string;
    };
    radius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
  };

  navigation: {
    surface: { current: string; hovered: string };
    text: { current: string; default: string };
    icon: { current: string; default: string };
  };

  text: {
    primary: string;
    primaryInverse: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    positive: { primary: string; secondary: string };
    negative: { primary: string; secondary: string };
    info: { primary: string; secondary: string };
    caution: { primary: string; secondary: string };
    brand: { primary: string; accent: string };
    neutral: { primary: string };
    staticWhite: string;
  };

  icons: {
    primary: string;
    staticWhite: string;
    primaryInverse: string;
    secondary: string;
    disabled: string;
    negative: string;
    info: string;
    caution: { primary: string; secondary: string };
    positive: string;
    brand: { primary: string; accent: string };
    neutral: string;
  };

  border: {
    info: string;
    negative: string;
    caution: string;
    positive: string;
    active: string;
    focused: string;
    neutral: { primary: string; secondary: string; tertiary: string };
    disabled: string;
  };
}
