"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export interface BannerProps {
  /** Banner message */
  message: string;
  /** Severity determines color and icon */
  severity?: "info" | "success" | "warning" | "error";
  /** Display variant */
  variant?: "filled" | "outlined" | "subtle";
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Optional action */
  action?: { label: string; onClick: () => void };
  /** Custom icon (overrides severity icon) */
  icon?: React.ReactNode;
}

const SEVERITY_CONFIG = {
  info: {
    icon: <InfoOutlinedIcon fontSize="small" />,
    filled: { bgcolor: "surface.info.primary", color: "text.info.primary" },
    outlined: { borderColor: "border.info", color: "text.info.primary" },
    subtle: { bgcolor: "surface.info.secondary", color: "text.info.primary" },
  },
  success: {
    icon: <CheckCircleOutlineIcon fontSize="small" />,
    filled: { bgcolor: "surface.positive.primary", color: "text.positive.primary" },
    outlined: { borderColor: "border.positive", color: "text.positive.primary" },
    subtle: { bgcolor: "surface.positive.secondary", color: "text.positive.primary" },
  },
  warning: {
    icon: <WarningAmberIcon fontSize="small" />,
    filled: { bgcolor: "surface.caution.primary", color: "text.caution.primary" },
    outlined: { borderColor: "border.caution", color: "text.caution.primary" },
    subtle: { bgcolor: "surface.caution.secondary", color: "text.caution.primary" },
  },
  error: {
    icon: <ErrorOutlineIcon fontSize="small" />,
    filled: { bgcolor: "surface.negative.primary", color: "text.negative.primary" },
    outlined: { borderColor: "border.negative", color: "text.negative.primary" },
    subtle: { bgcolor: "surface.negative.secondary", color: "text.negative.primary" },
  },
} as const;

export default function Banner({
  message,
  severity = "info",
  variant = "subtle",
  dismissible = false,
  action,
  icon,
}: BannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const config = SEVERITY_CONFIG[severity];
  const styles = config[variant];

  return (
    <Box
      sx={{
        ...styles,
        ...(variant === "outlined" ? { border: 1 } : {}),
        borderRadius: 3,
        px: 4,
        py: 2.5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box sx={{ display: "flex", flexShrink: 0 }}>
          {icon ?? config.icon}
        </Box>
        <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }}>
          {message}
        </Typography>
        {action && (
          <Button
            size="small"
            variant="text"
            onClick={action.onClick}
            sx={{ flexShrink: 0, fontWeight: 600 }}
          >
            {action.label}
          </Button>
        )}
        {dismissible && (
          <IconButton size="small" onClick={() => setVisible(false)}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
