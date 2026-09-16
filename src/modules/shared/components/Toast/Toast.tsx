"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { AlertColor } from "@mui/material/Alert";

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  duration?: number;
  action?: React.ReactNode;
}

export default function Toast({
  open,
  onClose,
  message,
  severity = "info",
  duration = 4000,
  action,
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        action={action}
        sx={{ width: "100%", minWidth: 300 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
