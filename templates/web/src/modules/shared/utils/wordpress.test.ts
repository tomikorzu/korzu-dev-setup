import { describe, expect, it } from "vitest";
import { createWordPressClient } from "./wordpress.util";

describe("wordpress", () => {
  it("fetches a collection from the WordPress API", async () => {
    const wordpress = createWordPressClient({
      baseUrl: "https://wordpress.org/news",
    });
    const posts = await wordpress.getCollection("posts");
    expect(posts).toBeDefined();
  });
});
