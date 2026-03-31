import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as icons from "@mui/icons-material";

export interface EmptyStateProps {
  icon?: keyof typeof icons;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  bgcolor?: string;
}

export default function EmptyState({
  icon = 'Inbox',
  title,
  description,
  action,
  bgcolor = "surface.container.low",
}: EmptyStateProps) {
  const Icon = icons[icon as keyof typeof icons];
  return (
    <Stack alignItems="center" gap={2} sx={{ py: 10, textAlign: "center", bgcolor }}>
      <Icon fontSize="inherit" sx={{ fontSize: 48 }} />
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button size="small" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Stack>
  );
}
