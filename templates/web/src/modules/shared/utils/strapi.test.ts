import { describe, expect, it } from "vitest";
import { createStrapiClient } from "./strapi.util";
import { env } from "@/env";

describe("strapi", () => {
  it("fetches a collection from the Strapi API", async () => {
    const strapi = createStrapiClient({ baseUrl: env.NEXT_PUBLIC_STRAPI_URL! });
    const posts = await strapi.getCollection("posts");
    expect(posts).toBeDefined();
    expect(posts.data).toBeDefined();
    expect(posts.data.length).toBeGreaterThan(0);
  });
  it("fetches an entry from the Strapi API", async () => {
    const strapi = createStrapiClient({ baseUrl: env.NEXT_PUBLIC_STRAPI_URL! });
    const post = await strapi.getEntry("posts", 1);
    expect(post).toBeDefined();
  });
  it("fetches an entry by slug from the Strapi API", async () => {
    const strapi = createStrapiClient({ baseUrl: env.NEXT_PUBLIC_STRAPI_URL! });
    const post = await strapi.getBySlug("posts", "hello-world");
    expect(post).toBeDefined();
  });
});