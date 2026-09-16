"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "numbered" | "compact";
  siblingCount?: number;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  variant = "numbered",
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  if (variant === "compact") {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          size="small"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {page} / {totalPages}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <MuiPagination
      page={page}
      count={totalPages}
      onChange={(_, value) => onPageChange(value)}
      siblingCount={siblingCount}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            borderRadius: "radius.full",
          }}
        />
      )}
      sx={{
        "& .MuiPaginationItem-root": {
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "text.secondary",
          transition: "all 150ms ease-out",
          "&:hover": {
            bgcolor: "surface.neutral.secondary",
          },
          "&.Mui-selected": {
            fontWeight: 600,
            bgcolor: "brand.primary.enabled",
            color: "text.primaryInverse",
            "&:hover": {
              bgcolor: "brand.primary.hovered",
            },
          },
        },
        "& .MuiPaginationItem-ellipsis": {
          color: "text.tertiary",
        },
      }}
    />
  );
}
