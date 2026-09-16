"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ToggleOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** Available toggle options */
  options: ToggleOption[];
  /** Currently selected value(s) */
  value: string | string[];
  /** Callback when selection changes */
  onChange: (value: string | string[]) => void;
  /** Visual variant */
  variant?: "default" | "pills" | "outlined" | "separated";
  /** Allow selecting multiple options */
  multiple?: boolean;
  /** Size preset */
  size?: "small" | "medium" | "large";
  /** Stretch to fill container width */
  fullWidth?: boolean;
  /** Color scheme for active state */
  color?: "primary" | "neutral";
}

const SIZE_MAP = {
  small: { py: 0.5, px: 2, fontSize: "0.75rem" },
  medium: { py: 1, px: 3, fontSize: "0.875rem" },
  large: { py: 1.5, px: 4, fontSize: "1rem" },
} as const;

/** Whether the variant renders items connected (shared borders) */
const isConnected = (variant: string) =>
  variant === "default" || variant === "outlined";

export default function ToggleGroup({
  options,
  value,
  onChange,
  variant = "default",
  multiple = false,
  size = "medium",
  fullWidth = false,
  color = "primary",
}: ToggleGroupProps) {
  const selectedSet = new Set(Array.isArray(value) ? value : [value]);

  const handleSelect = (id: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [value];
      const next = selectedSet.has(id)
        ? current.filter((v) => v !== id)
        : [...current, id];
      onChange(next);
    } else {
      onChange(id);
    }
  };

  // Border-radius helpers for connected variants
  const getBorderRadius = (index: number, total: number) => {
    if (!isConnected(variant)) return undefined;
    if (total === 1) return 2;
    if (index === 0) return "8px 0 0 8px";
    if (index === total - 1) return "0 8px 8px 0";
    return 0;
  };

  // Active background color based on color prop
  const activeBg =
    color === "primary" ? "brand.primary.enabled" : "surface.neutral.secondary";
  const activeText =
    color === "primary" ? "text.primaryInverse" : "text.primary";
  const activeHoverBg =
    color === "primary" ? "brand.primary.hovered" : "surface.neutral.primary";

  const sizeStyles = SIZE_MAP[size];
  const connected = isConnected(variant);

  return (
    <Stack
      direction="row"
      sx={{
        gap: connected ? 0 : 1,
        ...(connected
          ? {
              border: 1,
              borderColor: "border.neutral.secondary",
              borderRadius: 2,
              overflow: "hidden",
            }
          : {}),
        ...(fullWidth ? { width: "100%" } : { display: "inline-flex" }),
      }}
    >
      {options.map((option, index) => {
        const isActive = selectedSet.has(option.id);
        const isDisabled = option.disabled ?? false;
        const iconOnly = !option.label && !!option.icon;

        // Base styles shared across all variants
        const baseStyles = {
          ...sizeStyles,
          ...(iconOnly ? { px: sizeStyles.py + 0.5 } : {}),
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.4 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: option.icon && option.label ? 1 : 0,
          transition: "all 150ms ease-out",
          userSelect: "none" as const,
          ...(fullWidth ? { flex: 1 } : {}),
        };

        // Variant-specific styles
        const variantStyles = (() => {
          switch (variant) {
            case "default":
              return {
                bgcolor: isActive ? activeBg : "transparent",
                color: isActive ? activeText : "text.secondary",
                // Divider between connected items
                ...(index > 0
                  ? {
                      borderLeft: 1,
                      borderColor: "border.neutral.secondary",
                    }
                  : {}),
                "&:hover": !isDisabled
                  ? {
                      bgcolor: isActive
                        ? activeHoverBg
                        : "surface.neutral.secondary",
                    }
                  : {},
              };

            case "outlined":
              return {
                bgcolor: "transparent",
                color: isActive ? activeBg : "text.secondary",
                borderLeft:
                  index > 0 ? 1 : undefined,
                borderColor: isActive
                  ? "brand.primary.enabled"
                  : "border.neutral.secondary",
                // Highlight active border by layering a colored bottom indicator
                boxShadow: isActive
                  ? "inset 0 -2px 0 0"
                  : undefined,
                // Use currentColor for the inset shadow so it picks up the color token
                ...(isActive ? { color: "brand.primary.enabled" } : {}),
                "&:hover": !isDisabled
                  ? {
                      bgcolor: "surface.neutral.secondary",
                      color: "brand.primary.enabled",
                    }
                  : {},
              };

            case "pills":
              return {
                borderRadius: 9999,
                bgcolor: isActive ? activeBg : "transparent",
                color: isActive ? activeText : "text.secondary",
                "&:hover": !isDisabled
                  ? {
                      bgcolor: isActive
                        ? activeHoverBg
                        : "surface.neutral.secondary",
                    }
                  : {},
              };

            case "separated":
              return {
                borderRadius: 2,
                bgcolor: isActive
                  ? activeBg
                  : "surface.neutral.secondary",
                color: isActive ? activeText : "text.secondary",
                "&:hover": !isDisabled
                  ? {
                      bgcolor: isActive
                        ? activeHoverBg
                        : "surface.neutral.primary",
                    }
                  : {},
              };

            default:
              return {};
          }
        })();

        const borderRadius = getBorderRadius(index, options.length);

        return (
          <Box
            key={option.id}
            onClick={() => !isDisabled && handleSelect(option.id)}
            sx={{
              ...baseStyles,
              ...variantStyles,
              ...(borderRadius !== undefined ? { borderRadius } : {}),
            }}
          >
            {option.icon}
            {option.label && (
              <Typography
                component="span"
                sx={{
                  fontSize: sizeStyles.fontSize,
                  fontWeight: isActive ? 600 : 400,
                  lineHeight: 1,
                  color: "inherit",
                }}
              >
                {option.label}
              </Typography>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
