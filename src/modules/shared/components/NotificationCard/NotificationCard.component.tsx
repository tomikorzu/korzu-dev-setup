"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

// ─── Types ───────────────────────────────────────────────────────────────────

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "mention"
  | "system";

export type NotificationVariant = "default" | "compact" | "banner";

export interface NotificationCardProps {
  /** Notification title */
  title: string;
  /** Notification body text */
  message: string;
  /** When the notification occurred */
  timestamp: string | Date;
  /** Layout variant */
  variant?: NotificationVariant;
  /** Semantic type controls icon and color */
  type?: NotificationType;
  /** Whether the notification has been read */
  read?: boolean;
  /** Avatar image URL (used for "mention" type) */
  avatar?: string;
  /** Callback when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Callback when the card itself is clicked */
  onClick?: () => void;
  /** Optional action button */
  action?: { label: string; onClick: () => void };
}

// ─── Type configuration map ──────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  Exclude<NotificationType, "mention" | "system">,
  { icon: React.ReactNode; bgcolor: string; color: string; border: string }
> = {
  info: {
    icon: <InfoOutlinedIcon fontSize="small" />,
    bgcolor: "surface.info.secondary",
    color: "text.info.primary",
    border: "border.info",
  },
  success: {
    icon: <CheckCircleOutlineIcon fontSize="small" />,
    bgcolor: "surface.positive.secondary",
    color: "text.positive.primary",
    border: "border.positive",
  },
  warning: {
    icon: <WarningAmberIcon fontSize="small" />,
    bgcolor: "surface.caution.secondary",
    color: "text.caution.primary",
    border: "border.caution",
  },
  error: {
    icon: <ErrorOutlineIcon fontSize="small" />,
    bgcolor: "surface.negative.secondary",
    color: "text.negative.primary",
    border: "border.negative",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Formats a timestamp into a short relative string (e.g. "just now", "5m ago"). */
function formatRelativeTime(timestamp: string | Date): string {
  const now = Date.now();
  const then =
    timestamp instanceof Date ? timestamp.getTime() : new Date(timestamp).getTime();
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 60) return "just now";
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(then).toLocaleDateString();
}

/** Returns the icon and color tokens for a given notification type. */
function getTypeVisuals(
  type: NotificationType,
  avatar?: string,
): { icon: React.ReactNode; bgcolor: string; color: string; border: string } {
  if (type === "mention") {
    return {
      icon: avatar ? (
        <Avatar src={avatar} sx={{ width: 28, height: 28 }} />
      ) : (
        <PersonIcon fontSize="small" />
      ),
      bgcolor: "surface.info.secondary",
      color: "text.info.primary",
      border: "border.info",
    };
  }

  if (type === "system") {
    return {
      icon: <SettingsIcon fontSize="small" />,
      bgcolor: "surface.secondary",
      color: "text.secondary",
      border: "border.primary",
    };
  }

  return TYPE_CONFIG[type];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function NotificationCard({
  title,
  message,
  timestamp,
  variant = "default",
  type = "info",
  read = false,
  avatar,
  onDismiss,
  onClick,
  action,
}: NotificationCardProps) {
  const visuals = getTypeVisuals(type, avatar);
  const relativeTime = useMemo(() => formatRelativeTime(timestamp), [timestamp]);

  // ── Unread indicator (left border for default/banner, dot for compact) ───
  const unreadBorderSx = !read
    ? { borderLeft: 3, borderLeftColor: visuals.color }
    : {};

  // ── Clickable card base styles ───────────────────────────────────────────
  const interactiveSx = onClick
    ? { cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }
    : {};

  // ── Variant: compact ────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        onClick={onClick}
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          transition: "background-color 0.15s",
          ...interactiveSx,
        }}
      >
        {/* Unread dot */}
        {!read && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: visuals.color,
              flexShrink: 0,
            }}
          />
        )}

        {/* Icon */}
        <Box sx={{ display: "flex", color: visuals.color, flexShrink: 0 }}>
          {visuals.icon}
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          fontWeight={read ? 400 : 600}
          noWrap
          sx={{ flex: 1, minWidth: 0 }}
        >
          {title}
        </Typography>

        {/* Timestamp */}
        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
          {relativeTime}
        </Typography>

        {/* Dismiss */}
        {onDismiss && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        )}
      </Stack>
    );
  }

  // ── Variant: banner ─────────────────────────────────────────────────────
  if (variant === "banner") {
    return (
      <Box
        onClick={onClick}
        sx={{
          width: "100%",
          bgcolor: visuals.bgcolor,
          px: 3,
          py: 1.5,
          ...unreadBorderSx,
          transition: "background-color 0.15s",
          ...interactiveSx,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Icon */}
          <Box sx={{ display: "flex", color: visuals.color, flexShrink: 0 }}>
            {visuals.icon}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {relativeTime}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" noWrap>
              {message}
            </Typography>
          </Box>

          {/* Action */}
          {action && (
            <Button
              size="small"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              sx={{ flexShrink: 0, fontWeight: 600 }}
            >
              {action.label}
            </Button>
          )}

          {/* Dismiss */}
          {onDismiss && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Stack>
      </Box>
    );
  }

  // ── Variant: default ────────────────────────────────────────────────────
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: "surface.primary",
        border: 1,
        borderColor: "border.secondary",
        borderRadius: 3,
        px: 2.5,
        py: 2,
        ...unreadBorderSx,
        transition: "background-color 0.15s",
        ...interactiveSx,
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* Icon / Avatar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            pt: 0.25,
            color: visuals.color,
            flexShrink: 0,
          }}
        >
          {visuals.icon}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography variant="body2" fontWeight={read ? 500 : 700}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {relativeTime}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, lineHeight: 1.5 }}
          >
            {message}
          </Typography>

          {/* Action button */}
          {action && (
            <Button
              size="small"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              sx={{ mt: 1, px: 0, fontWeight: 600, minWidth: "auto" }}
            >
              {action.label}
            </Button>
          )}
        </Box>

        {/* Dismiss */}
        {onDismiss && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            sx={{ alignSelf: "flex-start", ml: "auto" }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
