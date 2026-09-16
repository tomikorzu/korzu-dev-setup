"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChatBubble from "../ChatBubble/ChatBubble";
import { useAutoScroll } from "../../hooks/useAutoScroll";

export interface ChatMessage {
  id: string;
  message: string;
  variant: "sent" | "received";
  timestamp?: string;
  avatar?: { src?: string; alt: string };
  status?: "sending" | "sent" | "delivered" | "read";
}

export interface ChatThreadProps {
  messages: ChatMessage[];
  loading?: boolean;
  maxHeight?: number | string;
}

export default function ChatThread({
  messages,
  loading = false,
  maxHeight = 400,
}: ChatThreadProps) {
  const scrollRef = useAutoScroll(messages.length);

  return (
    <Box
      ref={scrollRef}
      sx={{
        maxHeight,
        overflow: "auto",
        px: 3,
        py: 2,
      }}
    >
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg.message}
          variant={msg.variant}
          timestamp={msg.timestamp}
          avatar={msg.avatar}
          status={msg.status}
        />
      ))}
      {loading && (
        <Typography variant="caption" color="text.tertiary" sx={{ pl: 6 }}>
          Typing...
        </Typography>
      )}
    </Box>
  );
}
