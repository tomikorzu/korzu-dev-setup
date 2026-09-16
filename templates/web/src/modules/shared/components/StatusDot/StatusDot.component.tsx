"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Status type options
type Status = "online" | "offline" | "away" | "busy" | "neutral";

// Visual variant of the status indicator
type Variant = "dot" | "badge" | "pulse";

// Dot diameter mapped by size
type Size = "small" | "medium" | "large";

export interface StatusDotProps {
  /** Current status to display */
  status: Status;
  /** Visual variant */
  variant?: Variant;
  /** Dot size */
  size?: Size;
  /** Optional label text shown next to the dot */
  label?: string;
  /** Whether to render the label */
  showLabel?: boolean;
}

// Semantic color token for each status
const STATUS_COLOR_MAP: Record<Status, string> = {
  online: "states.positive.primary",
  offline: "text.tertiary",
  away: "states.caution.primary",
  busy: "states.negative.primary",
  neutral: "border.neutral.secondary",
};

// Pixel diameter for each size
const SIZE_MAP: Record<Size, number> = {
  small: 6,
  medium: 8,
  large: 10,
};

// Font size for the label based on dot size
const LABEL_SIZE_MAP: Record<Size, string> = {
  small: "0.7rem",
  medium: "0.75rem",
  large: "0.8125rem",
};

// Pulse animation keyframes defined for sx prop
const pulseKeyframes = {
  "@keyframes statusPulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 0.8,
    },
    "70%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
};

export default function StatusDot({
  status,
  variant = "dot",
  size = "medium",
  label,
  showLabel = false,
}: StatusDotProps) {
  const dotSize = SIZE_MAP[size];
  const color = STATUS_COLOR_MAP[status];
  const shouldPulse =
    variant === "pulse" && (status === "online" || status === "busy");

  // Core dot element shared across all variants
  const dot = (
    <Box
      sx={{
        position: "relative",
        width: dotSize,
        height: dotSize,
        flexShrink: 0,
        ...(shouldPulse && pulseKeyframes),
      }}
    >
      {/* Pulse ring (only rendered when active) */}
      {shouldPulse && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            bgcolor: color,
            animation: "statusPulse 1.8s ease-out infinite",
          }}
        />
      )}

      {/* Visible dot */}
      <Box
        sx={{
          position: "relative",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          bgcolor: color,
        }}
      />
    </Box>
  );

  // Optional label element
  const labelElement =
    showLabel && label ? (
      <Typography
        component="span"
        sx={{
          fontSize: LABEL_SIZE_MAP[size],
          lineHeight: 1,
          color: "text.secondary",
          userSelect: "none",
        }}
      >
        {label}
      </Typography>
    ) : null;

  // Badge variant wraps the dot + label in a subtle container
  if (variant === "badge") {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.75}
        sx={{
          display: "inline-flex",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: "surface.neutral.primary",
        }}
      >
        {dot}
        {labelElement}
      </Stack>
    );
  }

  // Dot and pulse variants render inline without a background container
  if (showLabel && label) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.75}
        sx={{ display: "inline-flex" }}
      >
        {dot}
        {labelElement}
      </Stack>
    );
  }

  return dot;
}
