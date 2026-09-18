import { env } from "@/env";
import { describe, expect, it } from "vitest";
import { cmsFetch, CmsFetchError, toQueryString } from "./cmsFetch.util";

describe("cmsFetch", () => {
    it("fetches data from the CMS", async () => {
        const data = await cmsFetch(`${env.NEXT_PUBLIC_STRAPI_URL}/api/pages`);
        expect(data).toBeDefined();
    });
    it("throws an error if the CMS fetch fails", async () => {
        await expect(cmsFetch(`${env.NEXT_PUBLIC_STRAPI_URL}/api/pages/not-found`)).rejects.toThrow(CmsFetchError);
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