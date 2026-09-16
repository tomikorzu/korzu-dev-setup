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
function flattenEntry<T>(entry: any): T {
  return entry && "attributes" in entry
    ? { id: entry.id, ...entry.attributes }
    : entry;
}

/** Client for the Strapi REST API (`/api`). Works with any collection or single type. */
export function createStrapiClient({ baseUrl, token }: StrapiOptions) {
  const apiUrl = `${baseUrl.replace(/\/$/, "")}/api`;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  return {
    async getCollection<T>(
      collection: string,
      params: Record<string, string | number | boolean> = {},
    ): Promise<{ data: T[]; meta: StrapiListResponse<T>["meta"] }> {
      const { data, meta } = await cmsFetch<StrapiListResponse<T>>(
        `${apiUrl}/${collection}${toQueryString(params)}`,
        { headers },
      );
      return { data: data.map((entry) => flattenEntry<T>(entry)), meta };
    },

    async getEntry<T>(
      collection: string,
      id: number | string,
      params: Record<string, string | number | boolean> = {},
    ): Promise<T> {
      // biome-ignore lint/suspicious/noExplicitAny: raw Strapi entry shape, normalized right after
      const { data } = await cmsFetch<{ data: any }>(
        `${apiUrl}/${collection}/${id}${toQueryString(params)}`,
        { headers },
      );
      return flattenEntry<T>(data);
    },

    async getBySlug<T>(
      collection: string,
      slug: string,
      params: Record<string, string | number | boolean> = {},
    ): Promise<T | null> {
      const { data } = await cmsFetch<StrapiListResponse<T>>(
        `${apiUrl}/${collection}${toQueryString({ "filters[slug][$eq]": slug, ...params })}`,
        { headers },
      );
      return data[0] ? flattenEntry<T>(data[0]) : null;
    },
  };
}
