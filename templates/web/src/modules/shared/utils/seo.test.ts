import { describe, expect, it } from "vitest";
import { siteConfig } from "@/site.config";
import { createMetadata, createRootMetadata } from "./seo.util";

describe("seo", () => {
  it("creates a root metadata object", () => {
    const metadata = createRootMetadata();
    expect(metadata).toBeDefined();
    // Root metadata sets the title *template* every page's title fills into —
    // Next.js applies it when rendering, not this function.
    expect(metadata.title).toEqual({
      default: siteConfig.name,
      template: `%s · ${siteConfig.name}`,
    });
    expect(metadata.description).toBe(siteConfig.description);
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
  });
  it("creates a page metadata object", () => {
    const metadata = createMetadata({ title: "Test Page" });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Test Page");
    expect(metadata.description).toBe(siteConfig.description);
  });
});
