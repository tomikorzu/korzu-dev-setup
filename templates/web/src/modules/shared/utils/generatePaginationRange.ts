/**
 * Generates an array of page numbers and ellipsis markers for pagination.
 * Returns items like: [1, "...", 4, 5, 6, "...", 10]
 *
 * @param currentPage - Active page (1-indexed)
 * @param totalPages  - Total number of pages
 * @param siblings    - Number of pages to show on each side of current (default 1)
 */
export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblings: number = 1,
): (number | "...")[] {
  const range: (number | "...")[] = [];

  const leftSibling = Math.max(currentPage - siblings, 2);
  const rightSibling = Math.min(currentPage + siblings, totalPages - 1);

  range.push(1);

  if (leftSibling > 2) {
    range.push("...");
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    range.push(i);
  }

  if (rightSibling < totalPages - 1) {
    range.push("...");
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}
