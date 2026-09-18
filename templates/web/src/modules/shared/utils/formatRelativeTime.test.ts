import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "./formatRelativeTime.util";

describe("formatRelativeTime", () => {
  it("formats a date into a human-readable relative time string for less than 1 minute", () => {
    // 5 minutes ago — siteConfig.locale is "es", so the output is localized
    const date = new Date(Date.now() - 5 * 60 * 1000);
    const formatted = formatRelativeTime(new Date(date));
    expect(formatted).toBe("hace 5 minutos");
  });
  it("formats a date into a human-readable relative time string for less than 1 hour", () => {
    // 1 hour ago — siteConfig.locale is "es", so the output is localized
    const date = new Date(Date.now() - 1 * 60 * 60 * 1000);
    const formatted = formatRelativeTime(new Date(date));
    expect(formatted).toBe("hace 1 hora");
  });
});
