"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabGroupProps {
  tabs: TabItem[];
  /** Display variant */
  variant?: "underline" | "pills" | "contained" | "outlined";
  /** Default active tab id */
  defaultTab?: string;
  /** Controlled value */
  value?: string;
  /** Controlled onChange */
  onChange?: (tabId: string) => void;
  /** Full width tabs */
  fullWidth?: boolean;
}

export default function TabGroup({
  tabs,
  variant = "underline",
  defaultTab,
  value,
  onChange,
  fullWidth = false,
}: TabGroupProps) {
  const [internalValue, setInternalValue] = useState(
    defaultTab ?? tabs[0]?.id ?? "",
  );
  const activeTab = value ?? internalValue;

  const handleChange = (id: string) => {
    if (!value) setInternalValue(id);
    onChange?.(id);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <Box>
      {/* Tab bar */}
      <Stack
        direction="row"
        sx={{
          gap: variant === "pills" ? 1 : 0,
          ...(variant === "underline"
            ? { borderBottom: 1, borderColor: "border.neutral.tertiary" }
            : {}),
          ...(variant === "contained"
            ? {
                bgcolor: "surface.neutral.secondary",
                borderRadius: 3,
                p: 0.75,
              }
            : {}),
          ...(variant === "outlined"
            ? {
                border: 1,
                borderColor: "border.neutral.secondary",
                borderRadius: 3,
                p: 0.75,
              }
            : {}),
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          const baseStyles = {
            px: 4,
            py: 2,
            cursor: tab.disabled ? "not-allowed" : "pointer",
            opacity: tab.disabled ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "all 150ms ease-out",
            userSelect: "none" as const,
            ...(fullWidth ? { flex: 1, justifyContent: "center" } : {}),
          };

          const variantStyles = {
            underline: {
              borderBottom: 2,
              borderColor: isActive ? "brand.primary.enabled" : "transparent",
              color: isActive ? "brand.primary.enabled" : "text.secondary",
              "&:hover": { color: "text.primary" },
              mb: "-1px",
            },
            pills: {
              borderRadius: 9999,
              bgcolor: isActive ? "brand.primary.enabled" : "transparent",
              color: isActive ? "text.primaryInverse" : "text.secondary",
              "&:hover": {
                bgcolor: isActive
                  ? "brand.primary.hovered"
                  : "surface.neutral.secondary",
              },
            },
            contained: {
              borderRadius: 2,
              bgcolor: isActive ? "surface.container.enabled" : "transparent",
              color: isActive ? "text.primary" : "text.secondary",
              boxShadow: isActive ? 1 : 0,
              "&:hover": {
                bgcolor: isActive
                  ? "surface.container.enabled"
                  : "surface.container.high",
              },
            },
            outlined: {
              borderRadius: 2,
              bgcolor: isActive ? "brand.primary.enabled" : "transparent",
              color: isActive ? "text.primaryInverse" : "text.secondary",
              "&:hover": {
                bgcolor: isActive
                  ? "brand.primary.hovered"
                  : "surface.neutral.secondary",
              },
            },
          };

          return (
            <Box
              key={tab.id}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              sx={{ ...baseStyles, ...variantStyles[variant] }}
            >
              {tab.icon}
              <Typography variant="body2" fontWeight={isActive ? 600 : 400}>
                {tab.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* Content */}
      <Box sx={{ pt: 4 }}>{activeContent}</Box>
    </Box>
  );
}
