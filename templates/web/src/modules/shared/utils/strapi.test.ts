import { describe, expect, it, vi } from "vitest";
import { createStrapiClient } from "./strapi.util";

describe("strapi", () => {
  it("fetches a collection from the Strapi API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: [{ id: 1, attributes: {} }], meta: {} }),
      }),
    );
    const strapi = createStrapiClient({ baseUrl: "https://mock.cms.test" });
    const posts = await strapi.getCollection("posts");
    expect(posts).toBeDefined();
    expect(posts.data).toBeDefined();
    expect(posts.data.length).toBeGreaterThan(0);
  });
  it("fetches an entry from the Strapi API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: { id: 1, attributes: {} } }),
      }),
    );
    const strapi = createStrapiClient({ baseUrl: "https://mock.cms.test" });
    const post = await strapi.getEntry("posts", 1);
    expect(post).toBeDefined();
  });
  it("fetches an entry by slug from the Strapi API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: [{ id: 1, attributes: { slug: "hello-world" } }] }),
      }),
    );
    const strapi = createStrapiClient({ baseUrl: "https://mock.cms.test" });
    const post = await strapi.getBySlug("posts", "hello-world");
    expect(post).toBeDefined();
  });
});
