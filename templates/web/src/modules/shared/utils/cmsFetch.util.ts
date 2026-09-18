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
*/

export async function cmsFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new CmsFetchError(
      `${res.status} ${res.statusText} for ${url}`,
      res.status,
      url,
    );
  }

  return res.json() as Promise<T>;
}

// This function converts a record of parameters to a query string.
// Example: { page: 1, limit: 10 } -> "?page=1&limit=10"
export function toQueryString(
  params: Record<string, string | number | boolean>,
): string {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)]),
    ),
  ).toString();
  return query ? `?${query}` : "";
}
