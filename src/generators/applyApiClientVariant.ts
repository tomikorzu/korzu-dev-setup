import path from "node:path";
import type { BackendVariant } from "../types.js";
import { copyTemplateDir, type SubstitutionTokens } from "./copyTemplate.js";

// packages/api-client's base is the REST client (fetch against REST endpoints) — GraphQL
// overlays a client that speaks GraphQL over the same fetch primitive instead.
export async function applyApiClientVariant(
  monorepoRootDir: string,
  pkgDest: string,
  variant: BackendVariant,
  tokens: SubstitutionTokens,
): Promise<void> {
  if (variant !== "graphql") return;

  const graphqlDir = path.join(
    monorepoRootDir,
    "packages",
    "api-client",
    "_variants",
    "graphql",
  );
  await copyTemplateDir(
    path.join(graphqlDir, "src"),
    path.join(pkgDest, "src"),
    tokens,
  );
}
