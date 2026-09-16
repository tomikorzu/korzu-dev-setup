"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export interface RatingProps {
  /** Current value (0 to max) */
  value: number;
  /** Maximum rating */
  max?: number;
  /** Display variant */
  variant?: "stars" | "hearts";
  /** Size */
  size?: "small" | "medium" | "large";
  /** Whether the rating is interactive */
  readOnly?: boolean;
  /** Show numeric label next to the rating */
  showLabel?: boolean;
  /** Callback when value changes (only in interactive mode) */
  onChange?: (value: number) => void;
  /** Color for filled icons */
  color?: "primary" | "warning" | "error";
}

const SIZE_MAP = { small: 18, medium: 24, large: 32 };

const COLOR_MAP: Record<string, string> = {
  primary: "brand.primary.enabled",
  warning: "states.caution.primary",
  error: "states.negative.primary",
};

export default function Rating({
  value,
  max = 5,
  variant = "stars",
  size = "medium",
  readOnly = false,
  showLabel = false,
  onChange,
  color = "warning",
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;
  const iconSize = SIZE_MAP[size];
  const activeColor = COLOR_MAP[color];

  const renderIcon = (index: number) => {
    const filled = displayValue >= index + 1;
    const half = !filled && displayValue >= index + 0.5;
    const fontSize = iconSize;

    if (variant === "hearts") {
      return filled ? (
        <FavoriteIcon sx={{ fontSize, color: activeColor }} />
      ) : (
        <FavoriteBorderIcon sx={{ fontSize, color: "text.tertiary" }} />
      );
    }

    if (half) {
      return <StarHalfIcon sx={{ fontSize, color: activeColor }} />;
    }
    return filled ? (
      <StarIcon sx={{ fontSize, color: activeColor }} />
    ) : (
      <StarBorderIcon sx={{ fontSize, color: "text.tertiary" }} />
    );
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Stack direction="row" spacing={0.25}>
        {Array.from({ length: max }).map((_, i) => (
          <Box
            key={i}
            onMouseEnter={() => !readOnly && setHoverValue(i + 1)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            onClick={() => !readOnly && onChange?.(i + 1)}
            sx={{
              cursor: readOnly ? "default" : "pointer",
              display: "flex",
              transition: "transform 100ms ease-out",
              "&:hover": readOnly ? {} : { transform: "scale(1.15)" },
            }}
          >
            {renderIcon(i)}
          </Box>
        ))}
      </Stack>
      {showLabel && (
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.secondary"
          sx={{ fontSize: size === "small" ? "0.75rem" : "0.875rem" }}
        >
          {value.toFixed(1)}
        </Typography>
      )}
    </Stack>
  );
}
