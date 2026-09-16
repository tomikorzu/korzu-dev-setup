"use client";

import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/** Shape of each step in the stepper */
export interface StepItem {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  /** Array of step definitions */
  steps: StepItem[];
  /** Zero-based index of the currently active step */
  activeStep: number;
  /** Layout variant */
  variant?: "horizontal" | "vertical" | "minimal";
  /** Accent color for active/completed steps */
  color?: "primary" | "success" | "error" | "warning";
  /** Size preset */
  size?: "small" | "medium";
  /** Callback when a step circle is clicked */
  onStepClick?: (index: number) => void;
}

const COLOR_MAP: Record<string, string> = {
  primary: "brand.primary.enabled",
  success: "states.positive.primary",
  error: "states.negative.primary",
  warning: "states.caution.primary",
};

/** Diameter of the step circle by size */
const CIRCLE_SIZE: Record<string, number> = {
  small: 28,
  medium: 36,
};

/** Font size of the icon / number inside the circle */
const ICON_SIZE: Record<string, number> = {
  small: 14,
  medium: 18,
};

/**
 * A professional, multi-variant Stepper component.
 * Supports horizontal, vertical, and minimal (dot-only) layouts.
 */
export default function Stepper({
  steps,
  activeStep,
  variant = "horizontal",
  color = "primary",
  size = "medium",
  onStepClick,
}: StepperProps) {
  const accentColor = COLOR_MAP[color];
  const circle = CIRCLE_SIZE[size];
  const iconSz = ICON_SIZE[size];
  const clickable = Boolean(onStepClick);

  // Derive step state
  const getState = (index: number) => {
    if (index < activeStep) return "completed";
    if (index === activeStep) return "active";
    return "upcoming";
  };

  // Render the circle indicator for a step
  const renderCircle = (index: number) => {
    const state = getState(index);

    const baseSx = {
      width: circle,
      height: circle,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 0.2s ease",
      cursor: clickable ? "pointer" : "default",
      fontSize: iconSz,
      fontWeight: 700,
    };

    if (state === "completed") {
      return (
        <Box
          onClick={() => onStepClick?.(index)}
          sx={{
            ...baseSx,
            bgcolor: accentColor,
            color: "text.primaryInverse",
          }}
        >
          {steps[index].icon ?? <CheckIcon sx={{ fontSize: iconSz }} />}
        </Box>
      );
    }

    if (state === "active") {
      return (
        <Box
          onClick={() => onStepClick?.(index)}
          sx={{
            ...baseSx,
            bgcolor: "transparent",
            border: 2,
            borderColor: accentColor,
            color: accentColor,
          }}
        >
          {steps[index].icon ?? index + 1}
        </Box>
      );
    }

    // Upcoming
    return (
      <Box
        onClick={() => onStepClick?.(index)}
        sx={{
          ...baseSx,
          bgcolor: "transparent",
          border: 2,
          borderColor: "border.neutral.tertiary",
          color: "text.tertiary",
        }}
      >
        {steps[index].icon ?? index + 1}
      </Box>
    );
  };

  // Connector line between steps
  const renderConnector = (index: number, direction: "row" | "column") => {
    const filled = index < activeStep;
    const isRow = direction === "row";

    return (
      <Box
        sx={{
          flex: 1,
          ...(isRow
            ? { height: 2, minWidth: 24 }
            : { width: 2, minHeight: 24 }),
          bgcolor: filled ? accentColor : "border.neutral.tertiary",
          transition: "background-color 0.2s ease",
          ...(isRow ? { alignSelf: "center" } : { alignSelf: "center" }),
        }}
      />
    );
  };

  // ─── Minimal variant ────────────────────────────────────
  if (variant === "minimal") {
    const dotSize = size === "small" ? 10 : 14;

    return (
      <Stack direction="row" spacing={1.5} alignItems="center">
        {steps.map((_, index) => {
          const state = getState(index);
          return (
            <Box
              key={index}
              onClick={() => onStepClick?.(index)}
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                cursor: clickable ? "pointer" : "default",
                transition: "all 0.2s ease",
                bgcolor:
                  state === "completed" || state === "active"
                    ? accentColor
                    : "border.neutral.tertiary",
                opacity: state === "upcoming" ? 0.5 : 1,
                transform: state === "active" ? "scale(1.35)" : "scale(1)",
              }}
            />
          );
        })}
      </Stack>
    );
  }

  // ─── Vertical variant ───────────────────────────────────
  if (variant === "vertical") {
    return (
      <Box>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const state = getState(index);

          return (
            <Stack key={index} direction="row" spacing={2}>
              {/* Circle + connector column */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {renderCircle(index)}
                {!isLast && renderConnector(index, "column")}
              </Box>

              {/* Label + description */}
              <Box sx={{ pb: isLast ? 0 : 3, pt: 0.5 }}>
                <Typography
                  variant={size === "small" ? "body2" : "body1"}
                  fontWeight={state === "active" ? 700 : 500}
                  sx={{
                    color:
                      state === "upcoming" ? "text.tertiary" : "text.primary",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.label}
                </Typography>
                {step.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mt: 0.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                )}
              </Box>
            </Stack>
          );
        })}
      </Box>
    );
  }

  // ─── Horizontal variant (default) ──────────────────────
  return (
    <Stack direction="row" alignItems="flex-start">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const state = getState(index);

        return (
          <Stack
            key={index}
            direction="row"
            alignItems="flex-start"
            sx={{ flex: isLast ? "none" : 1 }}
          >
            {/* Step circle + label */}
            <Stack alignItems="center" spacing={1} sx={{ minWidth: circle }}>
              {renderCircle(index)}
              <Typography
                variant={size === "small" ? "caption" : "body2"}
                fontWeight={state === "active" ? 700 : 500}
                sx={{
                  color:
                    state === "upcoming" ? "text.tertiary" : "text.primary",
                  textAlign: "center",
                  maxWidth: 100,
                  transition: "color 0.2s ease",
                }}
              >
                {step.label}
              </Typography>
              {step.description && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    textAlign: "center",
                    maxWidth: 120,
                  }}
                >
                  {step.description}
                </Typography>
              )}
            </Stack>

            {/* Connector line */}
            {!isLast && (
              <Box sx={{ flex: 1, pt: `${circle / 2}px`, px: 1 }}>
                {renderConnector(index, "row")}
              </Box>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}
