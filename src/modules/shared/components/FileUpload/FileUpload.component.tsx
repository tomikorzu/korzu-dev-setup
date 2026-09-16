"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { useCallback, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export interface UploadedFile {
  name: string;
  size: number;
  /** Upload progress 0–100. Omit when upload is complete. */
  progress?: number;
  /** Error message for invalid or failed files */
  error?: string;
}

export interface FileUploadProps {
  /** Visual variant */
  variant?: "dropzone" | "button" | "compact";
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Allow selecting multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when files are selected or dropped */
  onFilesSelected: (files: File[]) => void;
  /** Callback to remove a file by index */
  onFileRemove?: (index: number) => void;
  /** List of files to display with status */
  files?: UploadedFile[];
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Format bytes into a human-readable string */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/** Validate a single file against constraints */
function validateFile(
  file: File,
  accept?: string,
  maxSize?: number,
): string | null {
  if (maxSize && file.size > maxSize) {
    return `File exceeds maximum size of ${formatFileSize(maxSize)}`;
  }

  if (accept) {
    const acceptedTypes = accept.split(",").map((t) => t.trim());
    const matches = acceptedTypes.some((type) => {
      if (type.startsWith(".")) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.replace("/*", "/"));
      }
      return file.type === type;
    });
    if (!matches) return `File type not accepted`;
  }

  return null;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function FileUpload({
  variant = "dropzone",
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  onFilesSelected,
  onFileRemove,
  files = [],
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Open the native file picker
  const openPicker = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  // Process selected / dropped files
  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;

      let selected = Array.from(incoming);

      // Enforce maxFiles limit
      if (maxFiles) {
        const remaining = maxFiles - files.length;
        selected = selected.slice(0, Math.max(0, remaining));
      }

      // Validate each file and filter out invalid ones
      const valid: File[] = [];
      selected.forEach((file) => {
        const error = validateFile(file, accept, maxSize);
        if (!error) valid.push(file);
      });

      if (valid.length > 0) onFilesSelected(valid);
    },
    [accept, maxSize, maxFiles, files.length, onFilesSelected],
  );

  // Input change handler
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset so the same file can be selected again
      e.target.value = "";
    },
    [handleFiles],
  );

  // Drag-and-drop handlers
  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setDragOver(true);
    },
    [disabled],
  );

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles],
  );

  // Hidden file input shared across all variants
  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={onInputChange}
      style={{ display: "none" }}
    />
  );

  // Subtitle text describing accepted types
  const subtitle = accept
    ? `Accepted: ${accept}`
    : "All file types accepted";

  // ── Dropzone variant ───────────────────────────────────────────────────

  const renderDropzone = () => (
    <Box
      onClick={openPicker}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      sx={{
        border: 2,
        borderStyle: "dashed",
        borderColor: disabled
          ? "action.disabled"
          : dragOver
            ? "brand.primary.enabled"
            : "divider",
        borderRadius: 2,
        p: 5,
        textAlign: "center",
        cursor: disabled ? "default" : "pointer",
        bgcolor: dragOver
          ? "surface.neutral.secondary"
          : "surface.container.low",
        opacity: disabled ? 0.5 : 1,
        transition: "border-color 200ms ease, background-color 200ms ease",
        "&:hover": disabled
          ? {}
          : { borderColor: "brand.primary.enabled" },
      }}
    >
      {hiddenInput}
      <CloudUploadIcon
        sx={{
          fontSize: 48,
          color: dragOver ? "brand.primary.enabled" : "text.secondary",
          mb: 1,
        }}
      />
      <Typography variant="subtitle1" fontWeight={600}>
        Drop files here or click to browse
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {subtitle}
      </Typography>
      {maxSize && (
        <Typography variant="caption" color="text.secondary">
          Max size: {formatFileSize(maxSize)}
        </Typography>
      )}
    </Box>
  );

  // ── Button variant ─────────────────────────────────────────────────────

  const renderButton = () => (
    <Box>
      {hiddenInput}
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={openPicker}
        disabled={disabled}
      >
        {multiple ? "Upload files" : "Upload file"}
      </Button>
    </Box>
  );

  // ── Compact variant ────────────────────────────────────────────────────

  const renderCompact = () => (
    <Box
      onClick={openPicker}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      sx={{
        border: 1,
        borderStyle: "dashed",
        borderColor: disabled
          ? "action.disabled"
          : dragOver
            ? "brand.primary.enabled"
            : "divider",
        borderRadius: 1,
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: disabled ? "default" : "pointer",
        bgcolor: dragOver
          ? "surface.neutral.secondary"
          : "surface.container.low",
        opacity: disabled ? 0.5 : 1,
        transition: "border-color 200ms ease, background-color 200ms ease",
        "&:hover": disabled
          ? {}
          : { borderColor: "brand.primary.enabled" },
      }}
    >
      {hiddenInput}
      <CloudUploadIcon
        sx={{
          fontSize: 24,
          color: dragOver ? "brand.primary.enabled" : "text.secondary",
        }}
      />
      <Typography variant="body2" color="text.secondary">
        Drop files or click to browse
      </Typography>
    </Box>
  );

  // ── File list ──────────────────────────────────────────────────────────

  const renderFileList = () => {
    if (files.length === 0) return null;

    return (
      <Stack spacing={1} sx={{ mt: 2 }}>
        {files.map((file, index) => (
          <Stack
            key={`${file.name}-${index}`}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              bgcolor: file.error
                ? "states.negative.container"
                : "surface.container.low",
              border: 1,
              borderColor: file.error ? "states.negative.primary" : "divider",
            }}
          >
            {/* File icon or error icon */}
            {file.error ? (
              <ErrorOutlineIcon
                sx={{ fontSize: 20, color: "states.negative.primary" }}
              />
            ) : (
              <InsertDriveFileIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
            )}

            {/* File name and size / error */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={500}
                noWrap
                title={file.name}
              >
                {file.name}
              </Typography>

              {file.error ? (
                <Typography
                  variant="caption"
                  color="states.negative.primary"
                >
                  {file.error}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.size)}
                </Typography>
              )}

              {/* Progress bar */}
              {file.progress !== undefined && !file.error && (
                <LinearProgress
                  variant="determinate"
                  value={file.progress}
                  sx={{
                    mt: 0.5,
                    height: 4,
                    borderRadius: 9999,
                    bgcolor: "surface.neutral.secondary",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "brand.primary.enabled",
                      borderRadius: 9999,
                    },
                  }}
                />
              )}
            </Box>

            {/* Remove button */}
            {onFileRemove && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileRemove(index);
                }}
                aria-label={`Remove ${file.name}`}
                sx={{ color: "text.secondary" }}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Stack>
        ))}
      </Stack>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <Box>
      {variant === "dropzone" && renderDropzone()}
      {variant === "button" && renderButton()}
      {variant === "compact" && renderCompact()}
      {renderFileList()}
    </Box>
  );
}
