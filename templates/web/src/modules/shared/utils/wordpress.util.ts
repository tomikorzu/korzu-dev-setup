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
function normalizeEntry(rawEntry: any): WordPressEntry {
  return {
    id: rawEntry.id,
    slug: rawEntry.slug,
    title: rawEntry.title?.rendered ?? "",
    excerpt: rawEntry.excerpt?.rendered ?? "",
    content: rawEntry.content?.rendered ?? "",
    date: rawEntry.date,
    link: rawEntry.link,
    featuredImage:
      rawEntry._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
  };
}

/**
 * Client for the WordPress REST API (`/wp-json/wp/v2`). Works for posts, pages,
 * or any custom post type — they all share the same shape.
 *
 * @example
 * const wp = createWordPressClient({ baseUrl: "https://blog.example.com" });
 * const posts = await wp.getCollection("posts");
 * const post = await wp.getEntryBySlug("posts", "hello-world");
 */
export function createWordPressClient({ baseUrl }: WordPressOptions) {
  const apiUrl = `${baseUrl.replace(/\/$/, "")}/wp-json/wp/v2`;

  return {
    async getCollection(
      postType: string,
      params: Record<string, string | number> = {},
    ): Promise<WordPressEntry[]> {
      // biome-ignore lint/suspicious/noExplicitAny: raw WP REST shape, normalized right after
      const rawEntries = await cmsFetch<any[]>(
        `${apiUrl}/${postType}${toQueryString({ _embed: 1, ...params })}`,
      );
      return rawEntries.map(normalizeEntry);
    },

    async getEntryBySlug(
      postType: string,
      slug: string,
    ): Promise<WordPressEntry | null> {
      // biome-ignore lint/suspicious/noExplicitAny: raw WP REST shape, normalized right after
      const rawEntries = await cmsFetch<any[]>(
        `${apiUrl}/${postType}${toQueryString({ slug, _embed: 1 })}`,
      );
      return rawEntries[0] ? normalizeEntry(rawEntries[0]) : null;
    },
  };
}
