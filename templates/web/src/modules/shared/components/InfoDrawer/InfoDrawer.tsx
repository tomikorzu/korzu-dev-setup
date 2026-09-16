"use client";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface InfoDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  anchor?: "left" | "right";
  width?: number | string;
  children: React.ReactNode;
}

export default function InfoDrawer({
  open,
  onClose,
  title,
  anchor = "right",
  width = 400,
  children,
}: InfoDrawerProps) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width, maxWidth: "100vw" } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 5,
          py: 4,
          borderBottom: 1,
          borderColor: "border.neutral.tertiary",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Box sx={{ p: 5, flex: 1, overflow: "auto" }}>{children}</Box>
    </Drawer>
  );
}
