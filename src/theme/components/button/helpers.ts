import type { CSSObject, Theme } from "@mui/material/styles";
import { sharedTokens } from "../../tokens/tokens.shared";

interface ButtonStyleOptions {
  withShadow?: boolean;
  withTransform?: boolean;
  borderWidth?: number;
}

export function createContainedButtonStyles(
  theme: Theme,
  options?: ButtonStyleOptions,
): CSSObject {
  const { withShadow = true, withTransform = true } = options || {};
  const b = theme.vars.palette.buttons;

  return {
    backgroundColor: b.surface.contained.enabled,
    color: theme.vars.palette.text.primaryInverse,
    ...(withShadow && { boxShadow: sharedTokens.shadow.button }),
    "&:hover": {
      backgroundColor: b.surface.contained.hovered,
      color: theme.vars.palette.text.primaryInverse,
      ...(withShadow && { boxShadow: sharedTokens.shadow.dropdown }),
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: theme.vars.palette.surface.disabled,
      color: theme.vars.palette.text.disabled,
    },
    ...(withTransform && {
      "&:active": {
        transform: "scale(0.98)",
      },
    }),
  };
}

export function createOutlinedButtonStyles(
  theme: Theme,
  options?: ButtonStyleOptions,
): CSSObject {
  const { borderWidth = 2 } = options || {};
  const b = theme.vars.palette.buttons;

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
      color: theme.vars.palette.text.disabled,
      borderColor: theme.vars.palette.border.disabled,
    },
  };
}

export function createTextButtonStyles(theme: Theme): CSSObject {
  const b = theme.vars.palette.buttons;

  return {
    backgroundColor: "transparent",
    color: theme.vars.palette.text.primary,
    "&:hover": {
      backgroundColor: b.surface.text.hovered,
      color: theme.vars.palette.text.primary,
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: "transparent",
      color: theme.vars.palette.text.disabled,
    },
  };
}

export function createDestructiveButtonStyles(
  theme: Theme,
  options?: ButtonStyleOptions,
): CSSObject {
  const { withShadow = true, withTransform = true } = options || {};
  const b = theme.vars.palette.buttons;

  return {
    backgroundColor: b.surface.destructive.enabled,
    color: theme.vars.palette.text.primaryInverse,
    borderColor: b.border.destructive,
    ...(withShadow && { boxShadow: sharedTokens.shadow.button }),
    "&:hover": {
      backgroundColor: b.surface.destructive.hovered,
      color: theme.vars.palette.text.primaryInverse,
      ...(withShadow && { boxShadow: sharedTokens.shadow.dropdown }),
    },
    "&:disabled, &.Mui-disabled": {
      backgroundColor: theme.vars.palette.surface.disabled,
      color: theme.vars.palette.text.disabled,
    },
    ...(withTransform && {
      "&:active": {
        transform: "scale(0.98)",
      },
    }),
  };
}

export function createNavButtonStyles(theme: Theme): CSSObject {
  const nav = theme.vars.palette.navigation;

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
      color: theme.vars.palette.text.disabled,
      opacity: 0.6,
    },
  };
}

export function buildButtonStyleOverrides(options?: ButtonStyleOptions) {
  return {
    contained: ({ theme }: { theme: Theme }) =>
      createContainedButtonStyles(theme, options),
    outlined: ({ theme }: { theme: Theme }) =>
      createOutlinedButtonStyles(theme, options),
    text: ({ theme }: { theme: Theme }) => createTextButtonStyles(theme),
  };
}
