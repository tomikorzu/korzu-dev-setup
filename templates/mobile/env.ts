import { z } from "zod";

// Expo loads .env itself (no dotenv needed) and inlines EXPO_PUBLIC_* vars into the bundle —
// same parse-or-throw pattern as the other templates, different loading mechanism.
const schema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url().optional(),
});

const parsed = schema.safeParse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables — check .env against env.ts");
}

export const env = parsed.data;
