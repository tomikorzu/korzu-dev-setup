import { cmsFetch, toQueryString } from "./cmsFetch.util";

export interface WordPressEntry {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  link: string;
  featuredImage: string | null;
}

interface WordPressOptions {
  baseUrl: string;
}

// biome-ignore lint/suspicious/noExplicitAny: raw WP REST shape, normalized right after
function normalizeEntry(raw: any): WordPressEntry {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title?.rendered ?? "",
    excerpt: raw.excerpt?.rendered ?? "",
    content: raw.content?.rendered ?? "",
    date: raw.date,
    link: raw.link,
    featuredImage: raw._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
  };
}

/**
 * Client for the WordPress REST API (`/wp-json/wp/v2`). Works for posts, pages,
 * or any custom post type — they all share the same shape.
 */
export function createWordPressClient({ baseUrl }: WordPressOptions) {
  const apiUrl = `${baseUrl.replace(/\/$/, "")}/wp-json/wp/v2`;

  return {
    async getCollection(
      type: string,
      params: Record<string, string | number> = {},
    ): Promise<WordPressEntry[]> {
      // biome-ignore lint/suspicious/noExplicitAny: raw WP REST shape, normalized right after
      const raw = await cmsFetch<any[]>(
        `${apiUrl}/${type}${toQueryString({ _embed: 1, ...params })}`,
      );
      return raw.map(normalizeEntry);
    },

    async getEntryBySlug(
      type: string,
      slug: string,
    ): Promise<WordPressEntry | null> {
      // biome-ignore lint/suspicious/noExplicitAny: raw WP REST shape, normalized right after
      const raw = await cmsFetch<any[]>(
        `${apiUrl}/${type}${toQueryString({ slug, _embed: 1 })}`,
      );
      return raw[0] ? normalizeEntry(raw[0]) : null;
    },
  };
}
