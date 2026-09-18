import { describe, expect, it } from "vitest";
import { CmsFetchError, cmsFetch, toQueryString } from "./cmsFetch.util";

const WP_API_URL = "https://wordpress.org/news/wp-json/wp/v2";

describe("cmsFetch", () => {
  it("fetches data from the CMS", async () => {
    const data = await cmsFetch(`${WP_API_URL}/posts`);
    expect(data).toBeDefined();
  });
  it("throws an error if the CMS fetch fails", async () => {
    await expect(cmsFetch(`${WP_API_URL}/posts/999999999`)).rejects.toThrow(
      CmsFetchError,
    );
  });
  it("converts a record of parameters to a query string", () => {
    const params = { page: 1, limit: 10 };
    const queryString = toQueryString(params);
    expect(queryString).toBe("?page=1&limit=10");
  });
  it("returns an empty string if the parameters are empty", () => {
    const params = {};
    const queryString = toQueryString(params);
    expect(queryString).toBe("");
  });
});
