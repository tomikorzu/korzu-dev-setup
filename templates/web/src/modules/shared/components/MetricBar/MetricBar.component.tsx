"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/** Segment definition for the stacked variant */
interface MetricBarSegment {
  value: number;
  color: string;
  label?: string;
}

export interface MetricBarProps {
  /** Metric label displayed above the bar */
  label: string;
  /** Current value (0 to maxValue) */
  value: number;
  /** Upper bound for the value scale */
  maxValue?: number;
  /** Visual style of the bar */
  variant?: "default" | "striped" | "segmented" | "stacked";
  /** Semantic color applied to the bar fill */
  color?: "primary" | "success" | "error" | "warning" | "info";
  /** Controls the bar height */
  size?: "small" | "medium" | "large";
  /** Whether the numeric value is displayed */
  showValue?: boolean;
  /** Custom formatter for the displayed value */
  formatValue?: (value: number) => string;
  /** Colored segments for the stacked variant */
  segments?: MetricBarSegment[];
}

const COLOR_MAP: Record<string, string> = {
  primary: "brand.primary.enabled",
  success: "states.positive.primary",
  error: "states.negative.primary",
  warning: "states.caution.primary",
  info: "brand.accent.enabled",
};

const BAR_HEIGHT: Record<string, number> = {
  small: 4,
  medium: 8,
  large: 12,
};

/** Number of visual segments in the segmented variant */
const SEGMENT_COUNT = 10;

export default function MetricBar({
  label,
  value,
  maxValue = 100,
  variant = "default",
  color = "primary",
  size = "medium",
  showValue = true,
  formatValue,
  segments,
}: MetricBarProps) {
  const clamped = Math.min(maxValue, Math.max(0, value));
  const percentage = maxValue > 0 ? (clamped / maxValue) * 100 : 0;
  const height = BAR_HEIGHT[size];
  const bg = COLOR_MAP[color];

  const displayValue = formatValue
    ? formatValue(clamped)
    : `${Math.round(clamped)}`;

  // Shared track styles for the bar background
  const trackSx = {
    width: "100%",
    height,
    borderRadius: 9999,
    bgcolor: "surface.neutral.secondary",
    overflow: "hidden",
  };

  /** Renders the default single-fill bar */
  const renderDefault = () => (
    <Box sx={trackSx}>
      <Box
        sx={{
          height: "100%",
          width: `${percentage}%`,
          borderRadius: 9999,
          bgcolor: bg,
          transition: "width 400ms ease-in-out",
        }}
      />
    </Box>
  );

  /** Renders a bar with diagonal CSS stripes */
  const renderStriped = () => (
    <Box sx={trackSx}>
      <Box
        sx={{
          height: "100%",
          width: `${percentage}%`,
          borderRadius: 9999,
          bgcolor: bg,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 12px)",
          backgroundSize: "auto",
          transition: "width 400ms ease-in-out",
        }}
      />
    </Box>
  );

  /** Renders discrete segments like a battery indicator */
  const renderSegmented = () => {
    const filledCount = Math.round((percentage / 100) * SEGMENT_COUNT);

    return (
      <Stack direction="row" spacing={0.5} sx={{ width: "100%" }}>
        {Array.from({ length: SEGMENT_COUNT }).map((_, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              height,
              borderRadius: 1,
              bgcolor: index < filledCount ? bg : "surface.neutral.secondary",
              transition: "background-color 300ms ease-in-out",
            }}
          />
        ))}
      </Stack>
    );
  };

  /** Renders multiple colored segments stacked horizontally */
  const renderStacked = () => {
    const items = segments ?? [];
    const total = items.reduce((sum, seg) => sum + seg.value, 0);

    return (
      <Box sx={{ ...trackSx, display: "flex" }}>
        {items.map((seg, index) => {
          const widthPct = total > 0 ? (seg.value / total) * 100 : 0;
          return (
            <Box
              key={index}
              sx={{
                height: "100%",
                width: `${widthPct}%`,
                bgcolor: seg.color,
                transition: "width 400ms ease-in-out",
                // First segment gets left radius, last gets right radius
                borderTopLeftRadius: index === 0 ? 9999 : 0,
                borderBottomLeftRadius: index === 0 ? 9999 : 0,
                borderTopRightRadius: index === items.length - 1 ? 9999 : 0,
                borderBottomRightRadius: index === items.length - 1 ? 9999 : 0,
              }}
            />
          );
        })}
      </Box>
    );
  };

  const barRenderers: Record<string, () => React.JSX.Element> = {
    default: renderDefault,
    striped: renderStriped,
    segmented: renderSegmented,
    stacked: renderStacked,
  };

  return (
    <Stack spacing={0.5} sx={{ width: "100%" }}>
      {/* Header row: label left, value right */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        {showValue && variant !== "stacked" && (
          <Typography variant="caption" fontWeight={600}>
            {displayValue}
          </Typography>
        )}
      </Stack>

      {/* Bar */}
      {barRenderers[variant]()}

      {/* Stacked variant legend */}
      {variant === "stacked" && segments && segments.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", mt: 0.5 }}>
          {segments.map((seg, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={0.5}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: seg.color,
                  flexShrink: 0,
                }}
              />
              {seg.label && (
                <Typography variant="caption" color="text.secondary">
                  {seg.label}
                </Typography>
              )}
              {showValue && (
                <Typography variant="caption" fontWeight={600}>
                  {formatValue ? formatValue(seg.value) : seg.value}
                </Typography>
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
