// This class is used to throw an error when the CMS fetch fails.
export class CmsFetchError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "CmsFetchError";
    this.status = status;
    this.url = url;
  }
}

/*
 * This function fetches data from CMS, and if it fails, it throws a CmsFetchError.
 * If not, it returns a typed JSON response.
 *
 * @example
 * const posts = await cmsFetch<Post[]>(`${env.NEXT_PUBLIC_STRAPI_URL}/api/posts`);
 */
export async function cmsFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new CmsFetchError(
      `${response.status} ${response.statusText} for ${url}`,
      response.status,
      url,
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Converts a params object into a URL query string, omitting the `?` when empty.
 *
 * @example
 * toQueryString({ page: 1, limit: 10 }); // "?page=1&limit=10"
 * toQueryString({}); // ""
 */
export function toQueryString(
  params: Record<string, string | number | boolean>,
): string {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)]),
    ),
  ).toString();
  return queryString ? `?${queryString}` : "";
}
