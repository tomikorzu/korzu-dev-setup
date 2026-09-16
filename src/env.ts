import { z } from "zod";

// Server-only vars — never exposed to the client bundle.
const serverSchema = z.object({
  STRAPI_API_TOKEN: z.string().optional(),
});

// Client-safe vars — must be prefixed NEXT_PUBLIC_ to be inlined by Next.js.
const clientSchema = z.object({
  NEXT_PUBLIC_WORDPRESS_URL: z.string().url().optional(),
  NEXT_PUBLIC_STRAPI_URL: z.string().url().optional(),
});

const parsedServer = serverSchema.safeParse({
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
});
const parsedClient = clientSchema.safeParse({
  NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
});

if (!parsedServer.success || !parsedClient.success) {
  console.error(
    "Invalid environment variables:",
    parsedServer.error?.flatten().fieldErrors,
    parsedClient.error?.flatten().fieldErrors,
  );
  throw new Error(
    "Invalid environment variables — check .env against src/env.ts",
  );
}

export const env = { ...parsedServer.data, ...parsedClient.data };
