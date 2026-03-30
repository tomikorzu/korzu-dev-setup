/**
 * Button Style Helpers
 *
 * Helper functions to generate button styles automatically
 * from theme.vars.palette.buttons, avoiding code repetition.
 */

import type { Theme, CSSObject } from "@mui/material/styles";
import { sharedTokens } from "../../tokens/tokens.shared";

interface ButtonStyleOptions {
  withShadow?: boolean;
  withTransform?: boolean;
  borderWidth?: number;
}

/**
 * Generate styles for a contained button.
 */
export function createContainedButtonStyles(
  theme: Theme,
  options?: ButtonStyleOptions,
): CSSObject {
  const { withShadow = true, withTransform = true } = options || {};
  const b = theme.palette.buttons;

  return {
    backgroundColor: b.surface.contained.enabled,
    color: theme.palette.text.primaryInverse,
    ...(withShadow && { boxShadow: sharedTokens.shadow.button }),
    "&:hover": {
      backgroundColor: b.surface.contained.hovered,
      color: theme.palette.text.primaryInverse,
      ...(withShadow && { boxShadow: sharedTokens.shadow.dropdown }),
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: theme.palette.surface.disabled,
      color: theme.palette.text.disabled,
    },
    ...(withTransform && {
      "&:active": {
        transform: "scale(0.98)",
      },
    }),
  };
}

/**
 * Generate styles for an outlined button.
 */
export function createOutlinedButtonStyles(
  theme: Theme,
  options?: ButtonStyleOptions,
): CSSObject {
  const { borderWidth = 2 } = options || {};
  const b = theme.palette.buttons;

  return {
    backgroundColor: b.surface.outlined.enabled,
    color: b.text.outlined.enabled,
    borderColor: b.border.outlined.enabled,
    borderWidth,
    "&:hover": {
      backgroundColor: b.surface.outlined.hovered,
      color: b.text.outlined.hovered,
      borderColor: b.border.outlined.hovered,
      borderWidth,
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: "transparent",
      color: theme.palette.text.disabled,
      borderColor: theme.palette.border.disabled,
    },
  };
}

/**
 * Generate styles for a text button.
 */
export function createTextButtonStyles(theme: Theme): CSSObject {
  const b = theme.palette.buttons;

  return {
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: b.surface.text.hovered,
      color: theme.palette.text.primary,
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: "transparent",
      color: theme.palette.text.disabled,
    },
  };
}

/**
 * Generate styles for a destructive button.
 */
export function createDestructiveButtonStyles(
  theme: Theme,
  options?: ButtonStyleOptions,
): CSSObject {
  const { withShadow = true, withTransform = true } = options || {};
  const b = theme.palette.buttons;

  return {
    backgroundColor: b.surface.destructive.enabled,
    color: theme.palette.text.primaryInverse,
    borderColor: b.border.destructive,
    ...(withShadow && { boxShadow: sharedTokens.shadow.button }),
    "&:hover": {
      backgroundColor: b.surface.destructive.hovered,
      color: theme.palette.text.primaryInverse,
      ...(withShadow && { boxShadow: sharedTokens.shadow.dropdown }),
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: theme.palette.surface.disabled,
      color: theme.palette.text.disabled,
    },
    ...(withTransform && {
      "&:active": {
        transform: "scale(0.98)",
      },
    }),
  };
}

/**
 * Generate styles for a navigation button.
 */
export function createNavButtonStyles(theme: Theme): CSSObject {
  const nav = theme.palette.navigation;

  return {
    backgroundColor: "transparent",
    color: nav.text.default,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: nav.surface.hovered,
    },
    "&.active": {
      backgroundColor: nav.surface.current,
      color: nav.text.current,
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: "transparent",
      color: theme.palette.text.disabled,
      opacity: 0.6,
    },
  };
}

/**
 * Factory that generates all button styleOverrides
 * for spreading into the MuiButton override.
 */
export function buildButtonStyleOverrides(options?: ButtonStyleOptions) {
  return {
    contained: ({ theme }: { theme: Theme }) =>
      createContainedButtonStyles(theme, options),
    outlined: ({ theme }: { theme: Theme }) =>
      createOutlinedButtonStyles(theme, options),
    text: ({ theme }: { theme: Theme }) => createTextButtonStyles(theme),
  };
}
