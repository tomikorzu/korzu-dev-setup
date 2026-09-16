import "dotenv/config";
import { z } from "zod";

// Same parse-or-throw pattern as the Frontend template's src/env.ts.
const schema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3001),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error(
    "Invalid environment variables — check .env against src/env.ts",
  );
}

export const env = parsed.data;
