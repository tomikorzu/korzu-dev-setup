import { z } from "zod";

// Mirrors the backend's Item model — the one place both apps agree on its shape.
export const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.coerce.date(),
});

export type Item = z.infer<typeof itemSchema>;
