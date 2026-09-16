import { describe, expect, it } from "vitest";
import { getInitials } from "./getInitials";

describe("getInitials", () => {
  it("takes the first letter of up to two words", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("handles a single word", () => {
    expect(getInitials("Alice")).toBe("A");
  });

  it("ignores extra words past the second", () => {
    expect(getInitials("Ana Maria Lopez")).toBe("AM");
  });

  it("uppercases lowercase input", () => {
    expect(getInitials("ana maria")).toBe("AM");
  });
});
