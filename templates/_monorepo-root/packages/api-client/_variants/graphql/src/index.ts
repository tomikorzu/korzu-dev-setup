import { type Item, itemSchema } from "types";

export interface ApiClientOptions {
  baseUrl: string;
}

async function graphqlRequest<T>(
  url: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = (await res.json()) as {
    data: T;
    errors?: { message: string }[];
  };
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

// GraphQL client — plain fetch against the backend's GraphQL endpoint, no Apollo/urql.
// Swap in a real GraphQL client here if the project outgrows this (codegen, caching, etc.).
export function createApiClient({ baseUrl }: ApiClientOptions) {
  return {
    async listItems(): Promise<Item[]> {
      const { items } = await graphqlRequest<{ items: unknown[] }>(
        baseUrl,
        "query { items { id title done createdAt } }",
      );
      return itemSchema.array().parse(items);
    },

    async createItem(title: string): Promise<Item> {
      const { createItem } = await graphqlRequest<{ createItem: unknown }>(
        baseUrl,
        "mutation($input: CreateItemInput!) { createItem(input: $input) { id title done createdAt } }",
        { input: { title } },
      );
      return itemSchema.parse(createItem);
    },
  };
}
