import { z } from "zod";

// This file is used to type the environment variables.

// Server-only vars
const serverSchema = z.object({
  STRAPI_API_TOKEN: z.string().optional(),
});

// Client-safe vars
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
