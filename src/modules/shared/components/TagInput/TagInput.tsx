"use client";

import { useState, type KeyboardEvent } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  max?: number;
  fullWidth?: boolean;
}

export default function TagInput({
  tags,
  onChange,
  placeholder = "Type and press Enter...",
  max,
  fullWidth = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const trimmed = inputValue.trim();

    if (e.key === "Enter" && trimmed) {
      e.preventDefault();
      if (tags.includes(trimmed)) return;
      if (max && tags.length >= max) return;
      onChange([...tags, trimmed]);
      setInputValue("");
    }

    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleDelete = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
        p: 2,
        border: 1,
        borderColor: "border.neutral.secondary",
        borderRadius: 2,
        bgcolor: "surface.container.low",
        transition: "border-color 150ms ease-out",
        "&:focus-within": { borderColor: "border.focused" },
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size="small"
          onDelete={() => handleDelete(tag)}
        />
      ))}
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        variant="standard"
        size="small"
        sx={{ flex: 1, minWidth: 100 }}
        slotProps={{
          input: { disableUnderline: true, sx: { fontSize: "0.875rem" } },
        }}
      />
    </Box>
  );
}
