"use client";

import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

/** Represents a single item in the dropdown menu */
export interface DropdownMenuItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Render a divider after this item */
  divider?: boolean;
  /** Style the item as a destructive action */
  danger?: boolean;
  /** Keyboard shortcut hint displayed on the right */
  shortcut?: string;
}

export interface DropdownMenuProps {
  /** The element that triggers the menu open */
  trigger: React.ReactNode;
  /** Menu items to render */
  items: DropdownMenuItem[];
  /** Visual variant of the menu */
  variant?: "default" | "compact" | "contextMenu";
  /** Size of the menu items */
  size?: "small" | "medium";
  /** Anchor placement relative to the trigger */
  placement?: "bottom-left" | "bottom-right";
}

/** Padding and density settings per variant */
const VARIANT_CONFIG = {
  default: { itemPy: 1.25, itemPx: 2.5, minWidth: 220 },
  compact: { itemPy: 0.75, itemPx: 2, minWidth: 180 },
  contextMenu: { itemPy: 1, itemPx: 2, minWidth: 200 },
} as const;

/** Font size map for the size prop */
const SIZE_FONT = {
  small: "0.8125rem",
  medium: "0.875rem",
} as const;

export default function DropdownMenu({
  trigger,
  items,
  variant = "default",
  size = "medium",
  placement = "bottom-left",
}: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const config = VARIANT_CONFIG[variant];
  const fontSize = SIZE_FONT[size];

  // Determine anchor origin based on placement
  const isRight = placement === "bottom-right";
  const anchorOrigin = {
    vertical: "bottom" as const,
    horizontal: isRight ? ("right" as const) : ("left" as const),
  };
  const transformOrigin = {
    vertical: "top" as const,
    horizontal: isRight ? ("right" as const) : ("left" as const),
  };

  return (
    <>
      {/* Trigger wrapper -- attaches click handler */}
      <Box
        onClick={handleOpen}
        sx={{ display: "inline-flex", cursor: "pointer" }}
      >
        {trigger}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: {
            elevation: variant === "contextMenu" ? 8 : 4,
            sx: {
              minWidth: config.minWidth,
              borderRadius: 2,
              bgcolor: "surface.primary",
              border: 1,
              borderColor: "border.secondary",
              py: 0.75,
              mt: 0.5,
            },
          },
        }}
      >
        {items.map((item, index) => [
          <MenuItem
            key={item.id}
            disabled={item.disabled}
            onClick={() => {
              item.onClick?.();
              handleClose();
            }}
            sx={{
              py: config.itemPy,
              px: config.itemPx,
              fontSize,
              color: item.danger ? "text.negative.primary" : "text.primary",
              "&:hover": {
                bgcolor: item.danger
                  ? "surface.negative.secondary"
                  : "surface.hover",
              },
              "&.Mui-disabled": {
                opacity: 0.45,
              },
            }}
          >
            {/* Leading icon */}
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  color: item.danger ? "text.negative.primary" : "text.secondary",
                  "& .MuiSvgIcon-root": {
                    fontSize: size === "small" ? 18 : 20,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}

            {/* Label */}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize,
                fontWeight: variant === "contextMenu" ? 500 : 400,
              }}
            />

            {/* Right-aligned keyboard shortcut */}
            {item.shortcut && (
              <Typography
                variant="caption"
                sx={{
                  ml: 4,
                  color: "text.disabled",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {item.shortcut}
              </Typography>
            )}
          </MenuItem>,

          // Render divider after item when flagged (skip after last item)
          item.divider && index < items.length - 1 && (
            <Divider
              key={`divider-${item.id}`}
              sx={{ my: 0.5, borderColor: "border.secondary" }}
            />
          ),
        ])}
      </Menu>
    </>
  );
}
