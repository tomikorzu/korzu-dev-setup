import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    direction: "up" | "down" | "neutral";
    label: string;
  };
  icon?: React.ReactNode;
  variant?: "default" | "outlined";
}

const TREND_CONFIG = {
  up: { Icon: TrendingUpIcon, color: "text.positive.primary" },
  down: { Icon: TrendingDownIcon, color: "text.negative.primary" },
  neutral: { Icon: TrendingFlatIcon, color: "text.tertiary" },
} as const;

export default function StatCard({
  title,
  value,
  trend,
  icon,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      variant={variant === "outlined" ? "outlined" : "elevation"}
      sx={{ p: 5, height: "100%" }}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: "text.tertiary", display: "flex" }}>{icon}</Box>
          )}
        </Stack>

        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>

        {trend && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box
              sx={{
                color: TREND_CONFIG[trend.direction].color,
                display: "flex",
                alignItems: "center",
              }}
            >
              {(() => {
                const { Icon } = TREND_CONFIG[trend.direction];
                return <Icon fontSize="small" />;
              })()}
            </Box>
            <Typography
              variant="caption"
              sx={{ color: TREND_CONFIG[trend.direction].color }}
            >
              {trend.label}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
