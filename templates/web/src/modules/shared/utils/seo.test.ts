import { describe, expect, it } from "vitest";
import { createMetadata, createRootMetadata } from "./seo.util";
import { siteConfig } from "@/site.config";

describe("seo", () => {
  it("creates a root metadata object", () => {
    const metadata = createRootMetadata();
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe(siteConfig.name);
    expect(metadata.description).toBe(siteConfig.description);
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
  });
  it("creates a page metadata object", () => {
    const metadata = createMetadata({ title: "Test Page" });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe(`Test Page · ${siteConfig.name}`);
    expect(metadata.description).toBe(siteConfig.description);
  });
});