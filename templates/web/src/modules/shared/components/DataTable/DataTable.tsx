"use client";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import EmptyState from "../EmptyState/EmptyState.component";
import Pagination from "../Pagination/Pagination";

export interface DataTableColumn<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTablePagination {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string | number;
  selectable?: boolean;
  selectedIds?: Set<string | number>;
  onSelectionChange?: (ids: Set<string | number>) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string, direction: "asc" | "desc") => void;
  emptyMessage?: string;
  loading?: boolean;
  pagination?: DataTablePagination;
}

export default function DataTable<T>({
  columns,
  rows,
  getRowId,
  selectable = false,
  selectedIds,
  onSelectionChange,
  sortColumn,
  sortDirection = "asc",
  onSort,
  emptyMessage = "No data available",
  loading = false,
  pagination,
}: DataTableProps<T>) {
  const [internalSelected, setInternalSelected] = useState<
    Set<string | number>
  >(new Set());
  const selected = selectedIds ?? internalSelected;
  const setSelected = onSelectionChange ?? setInternalSelected;

  const allSelected =
    rows.length > 0 && rows.every((r) => selected.has(getRowId(r)));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rows.map(getRowId)));
    }
  };

  const toggleRow = (id: string | number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleSort = (column: string) => {
    if (!onSort) return;
    const newDir =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    onSort(column, newDir);
  };

  if (loading) {
    return (
      <Paper variant="outlined">
        <Stack spacing={0}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} sx={{ px: 4, py: 3 }}>
              <Skeleton variant="text" width="100%" height={24} />
            </Box>
          ))}
        </Stack>
      </Paper>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={selected.size > 0 && !allSelected}
                    onChange={toggleAll}
                    size="small"
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    width: col.width,
                    fontWeight: 600,
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {col.sortable && onSort ? (
                    <TableSortLabel
                      active={sortColumn === col.key}
                      direction={sortColumn === col.key ? sortDirection : "asc"}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  sx={{ border: 0 }}
                >
                  <EmptyState title={emptyMessage} />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const id = getRowId(row);
                return (
                  <TableRow
                    key={id}
                    hover
                    selected={selected.has(id)}
                    sx={{ "&:last-child td": { border: 0 } }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.has(id)}
                          onChange={() => toggleRow(id)}
                          size="small"
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && pagination.total > pagination.pageSize && (
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Pagination
            page={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.pageSize)}
            onPageChange={pagination.onPageChange}
          />
        </Stack>
      )}
    </Box>
  );
}
