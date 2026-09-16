import { type Item, itemSchema } from "types";

export interface ApiClientOptions {
  baseUrl: string;
}

// REST client — talks to the backend's /items resource directly over fetch.
export function createApiClient({ baseUrl }: ApiClientOptions) {
  const url = baseUrl.replace(/\/$/, "");

  return {
    async listItems(): Promise<Item[]> {
      const res = await fetch(`${url}/items`);
      return itemSchema.array().parse(await res.json());
    },

    async createItem(title: string): Promise<Item> {
      const res = await fetch(`${url}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      return itemSchema.parse(await res.json());
    },
  };
}
