"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// -- Types ------------------------------------------------------------------

export interface DividerProps {
  /** Visual style of the divider line */
  variant: "solid" | "dashed" | "dotted" | "gradient";
  /** Axis along which the divider renders */
  orientation?: "horizontal" | "vertical";
  /** Optional text label displayed in the middle of the divider */
  label?: string;
  /** Horizontal alignment of the label */
  labelPosition?: "left" | "center" | "right";
  /** Vertical (or horizontal when vertical) margin in theme spacing units */
  spacing?: number;
  /** Semantic color preset */
  color?: "default" | "primary" | "subtle";
  /** Line thickness in px */
  thickness?: number;
}

// -- Token maps -------------------------------------------------------------

const COLOR_TOKEN: Record<NonNullable<DividerProps["color"]>, string> = {
  default: "border.neutral.tertiary",
  primary: "brand.primary.enabled",
  subtle: "border.neutral.quaternary",
};

// -- Helpers ----------------------------------------------------------------

/** Resolves the flex alignment for the label gap layout */
const LABEL_JUSTIFY: Record<NonNullable<DividerProps["labelPosition"]>, string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

/**
 * Returns flex-grow values for the left and right lines so the label
 * visually sits at the requested position.
 */
function getLineFlex(position: NonNullable<DividerProps["labelPosition"]>): [number, number] {
  switch (position) {
    case "left":
      return [0.15, 1];
    case "right":
      return [1, 0.15];
    case "center":
    default:
      return [1, 1];
  }
}

// -- Shared line styles -----------------------------------------------------

/** Resolve a semantic color token to a CSS custom property reference */
function tokenToCssVar(token: string): string {
  return `var(--mui-palette-${token.replace(/\./g, "-")})`;
}

function lineStyles(
  variant: DividerProps["variant"],
  thickness: number,
  colorToken: string,
  orientation: "horizontal" | "vertical",
) {
  const isHorizontal = orientation === "horizontal";

  // Gradient variant uses a background instead of a border
  if (variant === "gradient") {
    const direction = isHorizontal ? "to right" : "to bottom";
    const resolved = tokenToCssVar(colorToken);
    return {
      border: "none",
      [isHorizontal ? "height" : "width"]: thickness,
      background: `linear-gradient(${direction}, transparent, ${resolved}, transparent)`,
    };
  }

  // Standard border-based variants
  return {
    [isHorizontal ? "borderBottomStyle" : "borderLeftStyle"]: variant,
    [isHorizontal ? "borderBottomWidth" : "borderLeftWidth"]: thickness,
    [isHorizontal ? "borderBottomColor" : "borderLeftColor"]: colorToken,
  };
}

// -- Component --------------------------------------------------------------

export default function Divider({
  variant,
  orientation = "horizontal",
  label,
  labelPosition = "center",
  spacing = 2,
  color = "default",
  thickness = 1,
}: DividerProps) {
  const colorToken = COLOR_TOKEN[color];
  const isHorizontal = orientation === "horizontal";

  // ---- Vertical divider (no label support) --------------------------------

  if (!isHorizontal) {
    return (
      <Box
        role="separator"
        aria-orientation="vertical"
        sx={{
          display: "inline-block",
          alignSelf: "stretch",
          mx: spacing,
          minHeight: "100%",
          ...(variant === "gradient"
            ? {
                width: thickness,
                background: `linear-gradient(to bottom, transparent, ${tokenToCssVar(colorToken)}, transparent)`,
              }
            : {
                borderLeftStyle: variant,
                borderLeftWidth: thickness,
                borderLeftColor: colorToken,
              }),
        }}
      />
    );
  }

  // ---- Horizontal divider without label -----------------------------------

  if (!label) {
    return (
      <Box
        role="separator"
        aria-orientation="horizontal"
        sx={{
          width: "100%",
          my: spacing,
          ...lineStyles(variant, thickness, colorToken, "horizontal"),
        }}
      />
    );
  }

  // ---- Horizontal divider with label --------------------------------------

  const [leftFlex, rightFlex] = getLineFlex(labelPosition);

  return (
    <Box
      role="separator"
      aria-orientation="horizontal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: LABEL_JUSTIFY[labelPosition],
        width: "100%",
        my: spacing,
        gap: 1.5,
      }}
    >
      {/* Left line */}
      <Box
        sx={{
          flexGrow: leftFlex,
          flexShrink: 1,
          ...lineStyles(variant, thickness, colorToken, "horizontal"),
        }}
      />

      {/* Label */}
      <Typography
        variant="caption"
        sx={{
          flexShrink: 0,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600,
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>

      {/* Right line */}
      <Box
        sx={{
          flexGrow: rightFlex,
          flexShrink: 1,
          ...lineStyles(variant, thickness, colorToken, "horizontal"),
        }}
      />
    </Box>
  );
}
