"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Display variant */
  variant?: "default" | "outlined" | "separated" | "ghost";
  /** Whether multiple items can be open simultaneously */
  multiple?: boolean;
}

export default function Accordion({
  items,
  variant = "default",
  multiple = false,
}: AccordionProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.defaultExpanded) initial.add(item.id);
    });
    return initial;
  });

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isGhost = variant === "ghost";
  const isSeparated = variant === "separated";
  const isOutlined = variant === "outlined";

  return (
    <Stack spacing={isSeparated ? 2 : 0}>
      {items.map((item, i) => {
        const isOpen = expanded.has(item.id);
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <Box
            key={item.id}
            sx={{
              ...(isOutlined || isSeparated
                ? {
                    border: 1,
                    borderColor: "border.neutral.secondary",
                    borderRadius: isSeparated
                      ? 3
                      : isFirst
                        ? "12px 12px 0 0"
                        : isLast
                          ? "0 0 12px 12px"
                          : 0,
                    ...(isOutlined && !isFirst && { borderTop: 0 }),
                  }
                : {}),
              ...(isGhost ? {} : { bgcolor: "surface.container.low" }),
            }}
          >
            {/* Header */}
            <Box
              onClick={() => toggle(item.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: isGhost ? 0 : 4,
                py: 3,
                cursor: "pointer",
                userSelect: "none",
                transition: "background-color 150ms ease-out",
                borderRadius: isSeparated ? 3 : 0,
                "&:hover": {
                  bgcolor: isGhost
                    ? "surface.neutral.secondary"
                    : "surface.container.high",
                },
              }}
            >
              {item.icon && (
                <Box sx={{ color: "text.tertiary", display: "flex" }}>
                  {item.icon}
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {item.title}
                </Typography>
                {item.subtitle && (
                  <Typography variant="caption" color="text.tertiary">
                    {item.subtitle}
                  </Typography>
                )}
              </Box>
              <IconButton
                size="small"
                sx={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease-out",
                }}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Content */}
            <Box
              sx={{
                maxHeight: isOpen ? 500 : 0,
                overflow: "hidden",
                transition: "max-height 300ms ease-in-out",
              }}
            >
              <Box sx={{ px: isGhost ? 0 : 4, pb: 4 }}>{item.content}</Box>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
