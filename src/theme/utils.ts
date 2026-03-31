/**
 * Theme Utilities
 *
 * Reusable helpers for working with the theme system.
 */

import type { Theme } from "@mui/material/styles";

/**
 * Apply alpha transparency to a MUI CSS variable channel.
 *
 * MUI v7 with cssVariables generates `*Channel` values for palette colors
 * (e.g. `theme.palette.primary.mainChannel` = "34 197 94").
 * This helper wraps them into a valid rgba() string.
 *
 * @example
 * // Inside sx or styleOverrides:
 * backgroundColor: alpha(theme.palette.primary.mainChannel, 0.12)
 * // → "rgba(34 197 94 / 0.12)"
 *
 * @example
 * // With custom palette channels:
 * borderColor: alpha(theme.palette.error.mainChannel, 0.3)
 */
export function alpha(channel: string, opacity: number): string {
  return `rgba(${channel} / ${opacity})`;
}

/**
 * Generate a consistent focus-visible ring style.
 * Uses the theme's primary color for the outline.
 *
 * @example
 * // Inside styleOverrides or styled():
 * const MyButton = styled('button')(({ theme }) => ({
 *   ...focusRing(theme),
 * }));
 *
 * @example
 * // Inside sx:
 * <Box sx={(theme) => ({ ...focusRing(theme) })} />
 */
export function focusRing(theme: Theme) {
  return {
    "&:focus-visible": {
      outline: `2px solid ${theme.vars.palette.primary.main}`,
      outlineOffset: 2,
    },
  } as const;
}

/**
 * Generate a fluid font-size using CSS clamp().
 * Scales smoothly between minPx and maxPx based on the viewport width.
 *
 * Useful for hero headings, display text, or any typography
 * that needs to scale beyond MUI's breakpoint system.
 *
 * @param minPx  - Minimum font size in pixels (at minVw)
 * @param maxPx  - Maximum font size in pixels (at maxVw)
 * @param minVw  - Viewport width where scaling starts (default: 320px)
 * @param maxVw  - Viewport width where scaling stops (default: 1200px)
 *
 * @example
 * // Hero heading that scales from 32px to 64px:
 * <Typography sx={{ fontSize: fluidType(32, 64) }}>
 *   Welcome
 * </Typography>
 *
 * @example
 * // Custom viewport range:
 * fontSize: fluidType(18, 28, 375, 1440)
 */
export function fluidType(
  minPx: number,
  maxPx: number,
  minVw: number = 320,
  maxVw: number = 1200,
): string {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const yIntercept = minPx - slope * minVw;
  return `clamp(${minPx / 16}rem, ${yIntercept / 16}rem + ${slope * 100}vw, ${maxPx / 16}rem)`;
}
