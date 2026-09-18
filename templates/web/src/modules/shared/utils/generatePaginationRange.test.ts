import { describe, expect, it } from "vitest";
import { generatePaginationRange } from "./generatePaginationRange.util";

describe("generatePaginationRange", () => {
  it("generates a pagination range for 1 page", () => {
    const range = generatePaginationRange(1, 1);
    expect(range).toEqual([1]);
  });
  it("generates a pagination range for 10 pages", () => {
    const range = generatePaginationRange(6, 10);
    expect(range).toEqual([1, "...", 5, 6, 7, "...", 10]);
  });
  it("generates a pagination range for 10 pages with 2 siblings", () => {
    const range = generatePaginationRange(5, 10, 2);
    expect(range).toEqual([1, "...", 3, 4, 5, 6, 7, "...", 10]);
  });
});
