import { describe, expect, it } from "vitest";
import { createWordPressClient } from "./wordpress.util";
import { env } from "@/env";

describe("wordpress", () => {
  it("fetches a collection from the WordPress API", async () => {
    const wordpress = createWordPressClient({ baseUrl: env.NEXT_PUBLIC_WORDPRESS_URL! });
    const posts = await wordpress.getCollection("posts");
    expect(posts).toBeDefined();
  });
});