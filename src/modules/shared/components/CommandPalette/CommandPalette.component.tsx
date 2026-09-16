"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import SearchIcon from "@mui/icons-material/Search";

/** Represents a single command entry */
export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description shown in the default variant */
  description?: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Keyboard shortcut keys (e.g., ["⌘", "K"]) */
  shortcut?: string[];
  /** Grouping label for categorized results */
  group?: string;
  /** Whether the item is non-interactive */
  disabled?: boolean;
}

export interface CommandPaletteProps {
  /** Whether the palette is visible */
  open: boolean;
  /** Callback fired when the palette should close */
  onClose: () => void;
  /** List of available commands */
  commands: CommandItem[];
  /** Visual variant */
  variant?: "default" | "compact" | "spotlight";
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Message shown when no commands match the query */
  emptyMessage?: string;
  /** Callback fired when a command is selected */
  onSelect: (command: CommandItem) => void;
}

/** Variant-specific layout configuration */
const VARIANT_CONFIG = {
  default: {
    width: 560,
    maxHeight: 420,
    /** Position the dialog roughly in the upper third of the viewport */
    mt: "15vh",
    showDescription: true,
    itemPy: 1.25,
    fontSize: "0.875rem",
  },
  compact: {
    width: 480,
    maxHeight: 360,
    mt: "18vh",
    showDescription: false,
    itemPy: 0.75,
    fontSize: "0.8125rem",
  },
  spotlight: {
    width: 680,
    maxHeight: 440,
    /** Spotlight sits higher on screen like macOS */
    mt: "12vh",
    showDescription: true,
    itemPy: 1.25,
    fontSize: "0.9rem",
  },
} as const;

export default function CommandPalette({
  open,
  onClose,
  commands,
  variant = "default",
  placeholder = "Type a command...",
  emptyMessage = "No results found",
  onSelect,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const config = VARIANT_CONFIG[variant];

  // Reset state whenever the palette opens or closes
  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlightedIndex(0);
    }
  }, [open]);

  // Filter commands by label matching the search query
  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim();
    if (!lower) return commands.filter((c) => !c.disabled);
    return commands.filter(
      (c) => !c.disabled && c.label.toLowerCase().includes(lower),
    );
  }, [commands, query]);

  // Group filtered results while preserving order
  const grouped = useMemo(() => {
    const groups: { label: string; items: CommandItem[] }[] = [];
    const seen = new Map<string, number>();

    for (const item of filtered) {
      const groupLabel = item.group ?? "";
      const idx = seen.get(groupLabel);
      if (idx !== undefined) {
        groups[idx].items.push(item);
      } else {
        seen.set(groupLabel, groups.length);
        groups.push({ label: groupLabel, items: [item] });
      }
    }

    return groups;
  }, [filtered]);

  // Flat list of selectable items for keyboard navigation
  const flatItems = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // Scroll the highlighted item into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector(
      `[data-index="${highlightedIndex}"]`,
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  const handleSelect = useCallback(
    (item: CommandItem) => {
      onSelect(item);
      onClose();
    },
    [onSelect, onClose],
  );

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < flatItems.length - 1 ? prev + 1 : 0,
          );
          break;

        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : flatItems.length - 1,
          );
          break;

        case "Enter":
          event.preventDefault();
          if (flatItems[highlightedIndex]) {
            handleSelect(flatItems[highlightedIndex]);
          }
          break;

        case "Escape":
          event.preventDefault();
          onClose();
          break;

        default:
          break;
      }
    },
    [flatItems, highlightedIndex, handleSelect, onClose],
  );

  // Keep highlighted index within bounds when the filtered list changes
  useEffect(() => {
    setHighlightedIndex((prev) =>
      prev >= flatItems.length ? 0 : prev,
    );
  }, [flatItems.length]);

  /** Render a single keyboard shortcut key */
  const renderShortcutKey = (key: string, idx: number) => (
    <Box
      key={`${key}-${idx}`}
      component="kbd"
      sx={{
        bgcolor: "surface.container.high",
        border: 1,
        borderColor: "border.neutral.secondary",
        borderBottom: 2,
        px: 1,
        py: 0.25,
        borderRadius: 1.5,
        fontSize: "0.65rem",
        fontWeight: 600,
        fontFamily: "inherit",
        lineHeight: 1,
        color: "text.secondary",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
      }}
    >
      {key}
    </Box>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          onKeyDown={handleKeyDown}
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            mt: config.mt,
            width: config.width,
            maxWidth: "calc(100vw - 32px)",
            bgcolor: "surface.primary",
            borderRadius: 3,
            border: 1,
            borderColor: "border.secondary",
            boxShadow: 24,
            outline: "none",
            overflow: "hidden",
          }}
        >
          {/* Search input */}
          <Box
            sx={{
              px: 2,
              pt: 2,
              pb: 1.5,
              borderBottom: 1,
              borderColor: "border.secondary",
            }}
          >
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              size={variant === "compact" ? "small" : "medium"}
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "text.secondary",
                          fontSize: variant === "compact" ? 20 : 22,
                        }}
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "surface.container.lowest",
                    borderRadius: 2,
                    fontSize: config.fontSize,
                  },
                },
              }}
            />
          </Box>

          {/* Results list */}
          <Box
            ref={listRef}
            sx={{
              maxHeight: config.maxHeight,
              overflowY: "auto",
              py: 1,
            }}
          >
            {flatItems.length === 0 ? (
              /* Empty state */
              <Box sx={{ px: 3, py: 4, textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.disabled", fontStyle: "italic" }}
                >
                  {emptyMessage}
                </Typography>
              </Box>
            ) : (
              grouped.map((group) => (
                <Box key={group.label || "__ungrouped"}>
                  {/* Group header */}
                  {group.label && (
                    <Typography
                      variant="overline"
                      sx={{
                        display: "block",
                        px: 2.5,
                        pt: 1.5,
                        pb: 0.5,
                        color: "text.disabled",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        lineHeight: 1,
                      }}
                    >
                      {group.label}
                    </Typography>
                  )}

                  {/* Command items */}
                  {group.items.map((item) => {
                    const globalIndex = flatItems.indexOf(item);
                    const isActive = globalIndex === highlightedIndex;

                    return (
                      <Stack
                        key={item.id}
                        data-index={globalIndex}
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setHighlightedIndex(globalIndex)}
                        sx={{
                          px: 2.5,
                          py: config.itemPy,
                          cursor: "pointer",
                          borderRadius: 1.5,
                          mx: 1,
                          transition: "background-color 0.1s ease",
                          bgcolor: isActive
                            ? "surface.neutral.secondary"
                            : "transparent",
                          "&:hover": {
                            bgcolor: "surface.neutral.secondary",
                          },
                        }}
                      >
                        {/* Leading icon */}
                        {item.icon && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: isActive
                                ? "text.primary"
                                : "text.secondary",
                              "& .MuiSvgIcon-root": {
                                fontSize:
                                  variant === "compact" ? 18 : 20,
                              },
                            }}
                          >
                            {item.icon}
                          </Box>
                        )}

                        {/* Label and description */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: config.fontSize,
                              fontWeight: isActive ? 600 : 400,
                              color: "text.primary",
                              lineHeight: 1.4,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.label}
                          </Typography>

                          {config.showDescription && item.description && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.disabled",
                                fontSize: "0.75rem",
                                lineHeight: 1.3,
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.description}
                            </Typography>
                          )}
                        </Box>

                        {/* Keyboard shortcut */}
                        {item.shortcut && item.shortcut.length > 0 && (
                          <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{
                              flexShrink: 0,
                              alignItems: "center",
                            }}
                          >
                            {item.shortcut.map(renderShortcutKey)}
                          </Stack>
                        )}
                      </Stack>
                    );
                  })}
                </Box>
              ))
            )}
          </Box>

          {/* Footer hint */}
          <Box
            sx={{
              px: 2.5,
              py: 1.25,
              borderTop: 1,
              borderColor: "border.secondary",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Stack direction="row" spacing={0.5}>
                {renderShortcutKey("↑", 0)}
                {renderShortcutKey("↓", 1)}
              </Stack>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", fontSize: "0.7rem" }}
              >
                navigate
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.75} alignItems="center">
              {renderShortcutKey("↵", 0)}
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", fontSize: "0.7rem" }}
              >
                select
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.75} alignItems="center">
              {renderShortcutKey("esc", 0)}
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", fontSize: "0.7rem" }}
              >
                close
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
