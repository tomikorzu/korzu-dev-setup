"use client";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export interface CodeBlockProps {
  /** Code string to display */
  code: string;
  /** Language label shown in the header */
  language?: string;
  /** Display variant */
  variant?: "default" | "compact" | "terminal";
  /** Optional title/filename */
  title?: string;
  /** Whether to show the copy button */
  copyable?: boolean;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language,
  variant = "default",
  title,
  copyable = true,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");
  const isTerminal = variant === "terminal";
  const isCompact = variant === "compact";

  return (
    <Box
      sx={{
        borderRadius: isCompact ? 2 : 3,
        overflow: "hidden",
        border: 1,
        borderColor: "border.neutral.secondary",
        bgcolor: isTerminal
          ? "surface.container.lowestInverse"
          : "surface.container.high",
      }}
    >
      {/* Header */}
      {!isCompact && (title || language || copyable) && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 1.5,
            borderBottom: 1,
            borderColor: "border.neutral.tertiary",
            bgcolor: isTerminal
              ? "surface.container.lowestInverse"
              : "surface.container.highest",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {isTerminal && (
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "states.negative.primary",
                  }}
                />
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "states.caution.primary",
                  }}
                />
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "states.positive.primary",
                  }}
                />
              </Stack>
            )}
            <Typography
              variant="caption"
              fontWeight={500}
              color={isTerminal ? "text.primaryInverse" : "text.tertiary"}
            >
              {title ?? language ?? ""}
            </Typography>
          </Stack>
          {copyable && (
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{
                color: isTerminal ? "text.primaryInverse" : "text.tertiary",
              }}
            >
              {copied ? (
                <CheckIcon sx={{ fontSize: 16 }} />
              ) : (
                <ContentCopyIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          )}
        </Stack>
      )}

      {/* Code body */}
      <Box
        component="pre"
        sx={{
          m: 0,
          px: isCompact ? 2 : 3,
          py: isCompact ? 1.5 : 2.5,
          overflow: "auto",
          fontFamily: "'Fira Code', monospace",
          fontSize: isCompact ? "0.75rem" : "0.8rem",
          lineHeight: 1.7,
          color: isTerminal ? "text.primaryInverse" : "text.primary",
        }}
      >
        {showLineNumbers ? (
          <Stack component="code" spacing={0}>
            {lines.map((line, i) => (
              <Stack key={i} direction="row">
                <Box
                  component="span"
                  sx={{
                    width: 32,
                    flexShrink: 0,
                    color: "text.tertiary",
                    textAlign: "right",
                    pr: 3,
                    userSelect: "none",
                  }}
                >
                  {i + 1}
                </Box>
                <span>{line}</span>
              </Stack>
            ))}
          </Stack>
        ) : (
          <code>{code}</code>
        )}
      </Box>

      {/* Inline copy for compact */}
      {isCompact && copyable && (
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            color: "text.tertiary",
          }}
        />
      )}
    </Box>
  );
}
