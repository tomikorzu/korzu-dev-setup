"use client";

import { useState, type MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useColorMode } from "../../hooks/useColorMode";

type Mode = "light" | "dark" | "system";

export default function ThemeToggle() {
  const { mode, setMode, isDark } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (_: unknown, value: Mode | null) => {
    if (value) {
      setMode(value);
      handleClose();
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        {isDark ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { p: 2, mt: 1 },
          },
        }}
      >
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Theme
          </Typography>
          <ToggleButtonGroup
            value={mode ?? "system"}
            exclusive
            onChange={handleChange}
            size="small"
          >
            <ToggleButton value="light">
              <LightModeOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
              Light
            </ToggleButton>
            <ToggleButton value="system">
              <SettingsBrightnessOutlinedIcon
                fontSize="small"
                sx={{ mr: 0.5 }}
              />
              Auto
            </ToggleButton>
            <ToggleButton value="dark">
              <DarkModeOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Popover>
    </>
  );
}
