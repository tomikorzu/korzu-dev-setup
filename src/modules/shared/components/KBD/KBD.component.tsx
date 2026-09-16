import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface KBDProps {
  /** Keyboard keys to display (e.g., ["⌘", "K"] or ["Ctrl", "Shift", "P"]) */
  keys: string[];
  /** Display variant */
  variant?: "default" | "outlined" | "ghost";
  /** Size */
  size?: "small" | "medium";
}

export default function KBD({
  keys,
  variant = "default",
  size = "medium",
}: KBDProps) {
  const isSmall = size === "small";

  const keyStyles = {
    default: {
      bgcolor: "surface.container.high",
      border: 1,
      borderColor: "border.neutral.secondary",
      borderBottom: 2,
    },
    outlined: {
      bgcolor: "transparent",
      border: 1,
      borderColor: "border.neutral.secondary",
    },
    ghost: {
      bgcolor: "surface.neutral.secondary",
      border: 0,
    },
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ display: "inline-flex", alignItems: "center" }}
    >
      {keys.map((key, i) => (
        <Box
          key={`${key}-${i}`}
          component="kbd"
          sx={{
            ...keyStyles[variant],
            px: isSmall ? 1 : 1.5,
            py: isSmall ? 0.25 : 0.5,
            borderRadius: 1.5,
            fontSize: isSmall ? "0.65rem" : "0.75rem",
            fontWeight: 600,
            fontFamily: "inherit",
            lineHeight: 1,
            color: "text.secondary",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: isSmall ? 20 : 24,
          }}
        >
          {key}
        </Box>
      ))}
    </Stack>
  );
}
