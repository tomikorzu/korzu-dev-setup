import { cmsFetch, toQueryString } from "./cmsFetch.util";

interface StrapiOptions {
  baseUrl: string;
  /** API token for protected content (Settings → API Tokens in Strapi admin) */
  token?: string;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination?: { page: number; pageCount: number; total: number } };
}

// Strapi v4 nests fields under `attributes`; v5 flattens them onto the entry.
// biome-ignore lint/suspicious/noExplicitAny: raw Strapi entry shape, normalized right after
function flattenEntry<T>(rawEntry: any): T {
  return rawEntry && "attributes" in rawEntry
    ? { id: rawEntry.id, ...rawEntry.attributes }
    : rawEntry;
}

/**
 * Client for the Strapi REST API (`/api`). Works with any collection or single type.
 *
 * @example
 * const strapi = createStrapiClient({ baseUrl: "https://cms.example.com" });
 * const { data: posts } = await strapi.getCollection<Post>("posts");
 * const post = await strapi.getBySlug<Post>("posts", "hello-world");
 */
export function createStrapiClient({ baseUrl, token }: StrapiOptions) {
  const apiUrl = `${baseUrl.replace(/\/$/, "")}/api`;
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;

  return {
    async getCollection<T>(
      collection: string,
      params: Record<string, string | number | boolean> = {},
    ): Promise<{ data: T[]; meta: StrapiListResponse<T>["meta"] }> {
      const { data: rawEntries, meta } = await cmsFetch<StrapiListResponse<T>>(
        `${apiUrl}/${collection}${toQueryString(params)}`,
        { headers: authHeaders },
      );
      return {
        data: rawEntries.map((rawEntry) => flattenEntry<T>(rawEntry)),
        meta,
      };
    },

    async getEntry<T>(
      collection: string,
      id: number | string,
      params: Record<string, string | number | boolean> = {},
    ): Promise<T> {
      // biome-ignore lint/suspicious/noExplicitAny: raw Strapi entry shape, normalized right after
      const { data: rawEntry } = await cmsFetch<{ data: any }>(
        `${apiUrl}/${collection}/${id}${toQueryString(params)}`,
        { headers: authHeaders },
      );
      return flattenEntry<T>(rawEntry);
    },

    async getBySlug<T>(
      collection: string,
      slug: string,
      params: Record<string, string | number | boolean> = {},
    ): Promise<T | null> {
      const { data: matchingEntries } = await cmsFetch<StrapiListResponse<T>>(
        `${apiUrl}/${collection}${toQueryString({ "filters[slug][$eq]": slug, ...params })}`,
        { headers: authHeaders },
      );
      return matchingEntries[0] ? flattenEntry<T>(matchingEntries[0]) : null;
    },
  };
}
