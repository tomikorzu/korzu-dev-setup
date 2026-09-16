import { rm } from "node:fs/promises";
import path from "node:path";
import { LAYER_TEMPLATE_DIR, type ResolvedPlan } from "../types.js";
import { applyBackendVariant } from "./applyBackendVariant.js";
import {
  buildTokens,
  copyTemplateDir,
  LAYER_TEMPLATE_SKIP_ENTRIES,
} from "./copyTemplate.js";
import { setPackageName } from "./setPackageName.js";

/**
 * Scaffolds exactly one layer straight into targetDir — no apps/, no turbo/pnpm-workspace files.
 * `plan.needsMobx` never applies here: it's only ever true when Backend+GraphQL is combined
 * with Frontend, which is a 2+ selection and therefore always monorepo mode.
 */
export async function scaffoldStandalone(
  templatesRoot: string,
  targetDir: string,
  plan: ResolvedPlan,
  projectName: string,
): Promise<void> {
  const [layer] = plan.layers;
  const templateDir = path.join(templatesRoot, LAYER_TEMPLATE_DIR[layer]);
  const tokens = buildTokens(projectName);

  await copyTemplateDir(
    templateDir,
    targetDir,
    tokens,
    LAYER_TEMPLATE_SKIP_ENTRIES,
  );

  if (layer === "backend" && plan.backendVariant) {
    await applyBackendVariant(
      templateDir,
      targetDir,
      plan.backendVariant,
      tokens,
    );
  }

  await setPackageName(path.join(targetDir, "package.json"), projectName);

  // The template's lockfile pins ITS OWN dependency set for the template's own CI —
  // a freshly scaffolded project should get a fresh lockfile on its first `pnpm install`.
  await rm(path.join(targetDir, "pnpm-lock.yaml"), { force: true });
}
