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
