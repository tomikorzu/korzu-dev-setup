/**
 * Button Style Helpers
 * 
 * Funciones helper para generar estilos de botones automáticamente
 * desde los tokens, evitando repetición de código.
 */

import type { CSSObject } from "@mui/material/styles";
import { primitives } from "../../primitives";
import { tokens } from "../../tokens";

type ButtonVariant = "contained" | "outlined" | "text" | "nav";
type ButtonColor = "primary" | "secondary" | "success" | "error";

interface ButtonTokens {
  surface: {
    enabled: string;
    hovered: string;
    disabled: string;
  };
  text: {
    enabled: string;
    hovered: string;
    disabled: string;
  };
  border: {
    enabled: string;
    hovered: string;
    disabled: string;
  };
}

/**
 * Genera estilos para un botón contained
 */
export function createContainedButtonStyles(
  colorTokens: ButtonTokens,
  options?: {
    withShadow?: boolean;
    withTransform?: boolean;
  }
): CSSObject {
  const { withShadow = true, withTransform = true } = options || {};

  return {
    backgroundColor: colorTokens.surface.enabled,
    color: colorTokens.text.enabled,
    borderColor: colorTokens.border.enabled,
    ...(withShadow && { boxShadow: tokens.shadow.button }),
    "&:hover": {
      backgroundColor: colorTokens.surface.hovered,
      color: colorTokens.text.hovered,
      borderColor: colorTokens.border.hovered,
      ...(withShadow && { boxShadow: tokens.shadow.dropdown }),
    },
    "&:disabled": {
      backgroundColor: colorTokens.surface.disabled,
      color: colorTokens.text.disabled,
      borderColor: colorTokens.border.disabled,
    },
    ...(withTransform && {
      "&:active": {
        transform: "scale(0.98)",
      },
    }),
  };
}

/**
 * Genera estilos para un botón outlined
 */
export function createOutlinedButtonStyles(
  colorTokens: ButtonTokens,
  options?: {
    borderWidth?: number;
  }
): CSSObject {
  const { borderWidth = primitives.borderWidth[2] } = options || {};

  return {
    backgroundColor: colorTokens.surface.enabled,
    color: colorTokens.text.enabled,
    borderColor: colorTokens.border.enabled,
    borderWidth,
    "&:hover": {
      backgroundColor: colorTokens.surface.hovered,
      color: colorTokens.text.hovered,
      borderColor: colorTokens.border.hovered,
      borderWidth,
    },
    "&:disabled": {
      backgroundColor: colorTokens.surface.disabled,
      color: colorTokens.text.disabled,
      borderColor: colorTokens.border.disabled,
    },
  };
}

/**
 * Genera estilos para un botón text
 */
export function createTextButtonStyles(colorTokens: ButtonTokens): CSSObject {
  return {
    backgroundColor: colorTokens.surface.enabled,
    color: colorTokens.text.enabled,
    "&:hover": {
      backgroundColor: colorTokens.surface.hovered,
      color: colorTokens.text.hovered,
    },
    "&:disabled": {
      backgroundColor: colorTokens.surface.disabled,
      color: colorTokens.text.disabled,
    },
  };
}

/**
 * Genera estilos para un botón de navegación
 * Usa los tokens de navigation en lugar de buttons
 */
export function createNavButtonStyles(isActive: boolean = false): CSSObject {
  return {
    backgroundColor: isActive
      ? tokens.navigation.surface.current
      : "transparent",
    color: isActive
      ? tokens.navigation.text.current
      : tokens.navigation.text.default,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: tokens.navigation.surface.hovered,
    },
    "&:disabled": {
      backgroundColor: "transparent",
      color: tokens.text.disabled,
      opacity: 0.6,
    },
  };
}

/**
 * Obtiene los tokens de color para una variante y color específicos
 */
export function getButtonTokens(
  variant: Exclude<ButtonVariant, "nav">,
  color: ButtonColor
): ButtonTokens {
  return tokens.buttons[variant][color];
}

/**
 * Genera estilos para cualquier combinación de variante y color
 */
export function createButtonStyles(
  variant: Exclude<ButtonVariant, "nav">,
  color: ButtonColor,
  options?: {
    withShadow?: boolean;
    withTransform?: boolean;
    borderWidth?: number;
  }
): CSSObject {
  const colorTokens = getButtonTokens(variant, color);

  switch (variant) {
    case "contained":
      return createContainedButtonStyles(colorTokens, {
        withShadow: options?.withShadow,
        withTransform: options?.withTransform,
      });
    case "outlined":
      return createOutlinedButtonStyles(colorTokens, {
        borderWidth: options?.borderWidth,
      });
    case "text":
      return createTextButtonStyles(colorTokens);
    default:
      return {};
  }
}

/**
 * Genera todos los estilos para una variante específica
 * (todas las combinaciones de colores)
 */
export function createVariantStyles(
  variant: Exclude<ButtonVariant, "nav">,
  colors: ButtonColor[] = ["primary", "secondary", "success", "error"],
  options?: {
    withShadow?: boolean;
    withTransform?: boolean;
    borderWidth?: number;
  }
): Record<string, CSSObject> {
  const styles: Record<string, CSSObject> = {};

  colors.forEach((color) => {
    const key = `${variant}${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    styles[key] = createButtonStyles(variant, color, options);
  });

  return styles;
}

/**
 * Genera todos los estilos de botones (todas las variantes y colores)
 */
export function createAllButtonStyles(
  options?: {
    withShadow?: boolean;
    withTransform?: boolean;
    borderWidth?: number;
  }
): Record<string, CSSObject> {
  const variants: Exclude<ButtonVariant, "nav">[] = ["contained", "outlined", "text"];
  const colors: ButtonColor[] = ["primary", "secondary", "success", "error"];

  return variants.reduce((acc, variant) => {
    return {
      ...acc,
      ...createVariantStyles(variant, colors, options),
    };
  }, {});
}
