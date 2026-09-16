"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ProgressBarProps {
  /** Current value (0–100) */
  value: number;
  /** Display variant */
  variant?: "linear" | "circular" | "gradient";
  /** Size for circular variant or height for linear */
  size?: "small" | "medium" | "large";
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Color scheme */
  color?: "primary" | "success" | "error" | "warning" | "info";
  /** Optional label text (overrides percentage) */
  label?: string;
}

const COLOR_MAP: Record<string, string> = {
  primary: "brand.primary.enabled",
  success: "states.positive.primary",
  error: "states.negative.primary",
  warning: "states.caution.primary",
  info: "states.info.primary",
};

const LINEAR_HEIGHT = { small: 4, medium: 8, large: 12 };
const CIRCULAR_SIZE = { small: 40, medium: 56, large: 80 };
const CIRCULAR_FONT = { small: "0.6rem", medium: "0.75rem", large: "1rem" };

export default function ProgressBar({
  value,
  variant = "linear",
  size = "medium",
  showLabel = false,
  color = "primary",
  label,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const bg = COLOR_MAP[color];
  const displayLabel = label ?? `${Math.round(clamped)}%`;

  if (variant === "circular") {
    const px = CIRCULAR_SIZE[size];
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        {/* Background track */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={px}
          thickness={4}
          sx={{ color: "surface.neutral.secondary", position: "absolute" }}
        />
        {/* Foreground */}
        <CircularProgress
          variant="determinate"
          value={clamped}
          size={px}
          thickness={4}
          sx={{ color: bg }}
        />
        {showLabel && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              sx={{ fontSize: CIRCULAR_FONT[size] }}
            >
              {displayLabel}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  // Linear + Gradient variants
  const height = LINEAR_HEIGHT[size];

  return (
    <Stack spacing={1}>
      {showLabel && (
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            {label ?? "Progress"}
          </Typography>
          <Typography variant="caption" fontWeight={600}>
            {Math.round(clamped)}%
          </Typography>
        </Stack>
      )}
      <Box
        sx={{
          width: "100%",
          height,
          borderRadius: 9999,
          bgcolor: "surface.neutral.secondary",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${clamped}%`,
            borderRadius: 9999,
            transition: "width 400ms ease-in-out",
            ...(variant === "gradient"
              ? {
                  background: `linear-gradient(90deg, ${bg === "brand.primary.enabled" ? "var(--mui-palette-brand-primary-enabled)" : bg}, var(--mui-palette-brand-accent-enabled))`,
                  bgcolor: undefined,
                }
              : { bgcolor: bg }),
          }}
        />
      </Box>
    </Stack>
  );
}
