import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * When Frontend and CMS are scaffolded together, point the Frontend's .env.example at the
 * CMS's local dev URL — saves a manual step, since both apps run on well-known local ports.
 */
export async function wireFrontendCmsEnv(
  frontendAppDir: string,
): Promise<void> {
  const envExamplePath = path.join(frontendAppDir, ".env.example");
  const content = await readFile(envExamplePath, "utf8");
  const wired = content.replace(
    /^NEXT_PUBLIC_STRAPI_URL=$/m,
    "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337",
  );
  await writeFile(envExamplePath, wired);
}
