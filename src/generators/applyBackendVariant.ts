import { rm } from "node:fs/promises";
import path from "node:path";
import type { BackendVariant } from "../types.js";
import { copyTemplateDir, type SubstitutionTokens } from "./copyTemplate.js";
import { mergePackageJsonFragment } from "./mergePackageJson.js";

// The backend template's base IS the REST variant (a complete, runnable API) — GraphQL is the
// only real overlay, and it replaces REST's controller layer with a resolver layer.
const REST_ONLY_FILES = [
  "src/items/items.controller.ts",
  "src/items/items.controller.spec.ts",
  "src/items/dto/create-item.dto.ts",
  "src/items/dto/update-item.dto.ts",
];

export async function applyBackendVariant(
  apiTemplateDir: string,
  appDest: string,
  variant: BackendVariant,
  tokens: SubstitutionTokens,
): Promise<void> {
  if (variant !== "graphql") return;

  const graphqlDir = path.join(apiTemplateDir, "_variants", "graphql");
  await copyTemplateDir(
    path.join(graphqlDir, "src"),
    path.join(appDest, "src"),
    tokens,
  );
  await mergePackageJsonFragment(
    path.join(appDest, "package.json"),
    path.join(graphqlDir, "package.json.fragment.json"),
  );

  await Promise.all(
    REST_ONLY_FILES.map((relativePath) =>
      rm(path.join(appDest, relativePath), { force: true }),
    ),
  );
}
