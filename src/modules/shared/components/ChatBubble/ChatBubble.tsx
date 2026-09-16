import MuiAvatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getInitials } from "../../utils/getInitials";

export interface ChatBubbleProps {
  message: string;
  variant: "sent" | "received";
  timestamp?: string;
  avatar?: { src?: string; alt: string };
  status?: "sending" | "sent" | "delivered" | "read";
}

const STATUS_LABELS: Record<string, string> = {
  sending: "Sending...",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
};

export default function ChatBubble({
  message,
  variant,
  timestamp,
  avatar,
  status,
}: ChatBubbleProps) {
  const isSent = variant === "sent";

  return (
    <Stack
      direction="row"
      justifyContent={isSent ? "flex-end" : "flex-start"}
      spacing={1.5}
      sx={{ mb: 2 }}
    >
      {!isSent && avatar && (
        <MuiAvatar
          src={avatar.src}
          alt={avatar.alt}
          sx={{ width: 32, height: 32, fontSize: "0.75rem" }}
        >
          {getInitials(avatar.alt)}
        </MuiAvatar>
      )}

      <Box sx={{ maxWidth: "70%" }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            borderRadius: 3,
            bgcolor: isSent ? "brand.primary.enabled" : "surface.container.high",
            color: isSent ? "text.primaryInverse" : "text.primary",
            borderBottomRightRadius: isSent ? 0 : undefined,
            borderBottomLeftRadius: !isSent ? 0 : undefined,
          }}
        >
          <Typography variant="body2">{message}</Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          justifyContent={isSent ? "flex-end" : "flex-start"}
          sx={{ mt: 0.5 }}
        >
          {timestamp && (
            <Typography variant="caption" color="text.tertiary">
              {timestamp}
            </Typography>
          )}
          {isSent && status && (
            <Typography variant="caption" color="text.tertiary">
              {STATUS_LABELS[status] ?? status}
            </Typography>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
