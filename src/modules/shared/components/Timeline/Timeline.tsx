import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  color?: "primary" | "success" | "error" | "warning" | "info";
}

export interface TimelineProps {
  items: TimelineItem[];
}

const COLOR_MAP: Record<string, string> = {
  primary: "brand.primary.enabled",
  success: "states.positive.primary",
  error: "states.negative.primary",
  warning: "states.caution.primary",
  info: "states.info.primary",
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <Box>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const dotColor = COLOR_MAP[item.color ?? "primary"];

        return (
          <Stack key={item.id} direction="row" spacing={3}>
            {/* Dot + line */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 0.5,
              }}
            >
              <Box sx={{ color: dotColor, display: "flex" }}>
                {item.icon ?? <CircleIcon sx={{ fontSize: 12 }} />}
              </Box>
              {!isLast && (
                <Box
                  sx={{
                    width: 2,
                    flex: 1,
                    bgcolor: "border.neutral.tertiary",
                    mt: 1,
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ pb: isLast ? 0 : 5, flex: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {item.title}
              </Typography>
              {item.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {item.description}
                </Typography>
              )}
              <Typography variant="caption" color="text.tertiary" sx={{ mt: 0.5 }}>
                {item.timestamp}
              </Typography>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
