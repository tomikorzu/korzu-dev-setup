"use client";

import Box from "@mui/material/Box";

export interface BadgeProps {
  /** Content to wrap with the badge */
  children: React.ReactNode;
  /** Badge display variant */
  variant?: "dot" | "count" | "status";
  /** Numeric count (only for variant="count") */
  count?: number;
  /** Max number to display before showing "99+" */
  max?: number;
  /** Color scheme */
  color?: "primary" | "error" | "success" | "warning" | "info" | "neutral";
  /** Status label (only for variant="status") */
  status?: "online" | "offline" | "away" | "busy";
  /** Anchor position */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Whether to hide the badge */
  invisible?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  primary: "brand.primary.enabled",
  error: "states.negative.primary",
  success: "states.positive.primary",
  warning: "states.caution.primary",
  info: "states.info.primary",
  neutral: "surface.neutral.primary",
};

const STATUS_COLOR: Record<string, string> = {
  online: "states.positive.primary",
  offline: "surface.neutral.primary",
  away: "states.caution.primary",
  busy: "states.negative.primary",
};

const POSITION_MAP: Record<string, object> = {
  "top-right": { top: 0, right: 0, transform: "translate(50%, -50%)" },
  "top-left": { top: 0, left: 0, transform: "translate(-50%, -50%)" },
  "bottom-right": { bottom: 0, right: 0, transform: "translate(50%, 50%)" },
  "bottom-left": { bottom: 0, left: 0, transform: "translate(-50%, 50%)" },
};

export default function Badge({
  children,
  variant = "dot",
  count = 0,
  max = 99,
  color = "error",
  status = "online",
  position = "top-right",
  invisible = false,
}: BadgeProps) {
  if (invisible) return <>{children}</>;

  const posStyles = POSITION_MAP[position];
  const bgColor = variant === "status" ? STATUS_COLOR[status] : COLOR_MAP[color];

  const renderBadge = () => {
    switch (variant) {
      case "dot":
        return (
          <Box
            sx={{
              position: "absolute",
              ...posStyles,
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: bgColor,
              border: 2,
              borderColor: "surface.container.enabled",
            }}
          />
        );

      case "count":
        if (count <= 0) return null;
        return (
          <Box
            sx={{
              position: "absolute",
              ...posStyles,
              minWidth: 20,
              height: 20,
              px: 1,
              borderRadius: 9999,
              bgcolor: bgColor,
              color: "text.primaryInverse",
              fontSize: "0.65rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: 2,
              borderColor: "surface.container.enabled",
            }}
          >
            {count > max ? `${max}+` : count}
          </Box>
        );

      case "status":
        return (
          <Box
            sx={{
              position: "absolute",
              ...posStyles,
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: bgColor,
              border: 2,
              borderColor: "surface.container.enabled",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {children}
      {renderBadge()}
    </Box>
  );
}
