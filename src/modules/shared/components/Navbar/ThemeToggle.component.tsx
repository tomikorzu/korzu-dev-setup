"use client";

import { useState, type MouseEvent } from "react";
import { IconButton, Popover, ToggleButtonGroup, ToggleButton, Stack, Typography } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, SettingsBrightnessOutlined } from "@mui/icons-material";
import { useColorMode } from "../../hooks/useColorMode";

enum Mode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

const ThemeToggle: React.FC = () => {
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
        {isDark ? <DarkModeOutlined /> : <LightModeOutlined />}
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
        <Stack gap={1}>
          <Typography variant="caption" color="text.secondary">
            Theme
          </Typography>
          <ToggleButtonGroup
            value={mode ?? Mode.SYSTEM}
            exclusive
            onChange={handleChange}
            size="small"
          >
            <ToggleButton value={Mode.LIGHT}>
              <LightModeOutlined fontSize="small" sx={{ mr: 0.5 }} />
              Light
            </ToggleButton>
            <ToggleButton value={Mode.SYSTEM}>
              <SettingsBrightnessOutlined
                fontSize="small"
                sx={{ mr: 0.5 }}
              />
              Auto
            </ToggleButton>
            <ToggleButton value={Mode.DARK}>
              <DarkModeOutlined fontSize="small" sx={{ mr: 0.5 }} />
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Popover>
    </>
  );
};

export default ThemeToggle;
