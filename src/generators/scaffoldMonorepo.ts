import { rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { LAYER_TEMPLATE_DIR, type ResolvedPlan } from "../types.js";
import { applyApiClientVariant } from "./applyApiClientVariant.js";
import { applyBackendVariant } from "./applyBackendVariant.js";
import { applyFrontendMobxVariant } from "./applyFrontendMobxVariant.js";
import {
  buildTokens,
  copyTemplateDir,
  LAYER_TEMPLATE_SKIP_ENTRIES,
  MONOREPO_ROOT_SKIP_ENTRIES,
} from "./copyTemplate.js";
import { removeAppStandaloneConfig } from "./removeAppStandaloneConfig.js";
import { setPackageName } from "./setPackageName.js";
import { wireFrontendCmsEnv } from "./wireFrontendCmsEnv.js";

/**
 * Scaffolds 2+ layers as a Turborepo + pnpm-workspaces monorepo (apps/*, packages/*).
 * Each app's directory name under apps/ matches its template folder name (LAYER_TEMPLATE_DIR).
 */
export async function scaffoldMonorepo(
  templatesRoot: string,
  targetDir: string,
  plan: ResolvedPlan,
  projectName: string,
): Promise<void> {
  const tokens = buildTokens(projectName);
  const monorepoRootDir = path.join(templatesRoot, "_monorepo-root");

  await copyTemplateDir(
    monorepoRootDir,
    targetDir,
    tokens,
    MONOREPO_ROOT_SKIP_ENTRIES,
  );

  for (const layer of plan.layers) {
    const templateDir = path.join(templatesRoot, LAYER_TEMPLATE_DIR[layer]);
    const appDest = path.join(targetDir, "apps", LAYER_TEMPLATE_DIR[layer]);

    await copyTemplateDir(
      templateDir,
      appDest,
      tokens,
      LAYER_TEMPLATE_SKIP_ENTRIES,
    );

    if (layer === "frontend" && plan.needsMobx) {
      await applyFrontendMobxVariant(templateDir, appDest, tokens);
    }

    if (layer === "frontend" && plan.layers.includes("cms")) {
      await wireFrontendCmsEnv(appDest);
    }

    if (layer === "backend" && plan.backendVariant) {
      await applyBackendVariant(
        templateDir,
        appDest,
        plan.backendVariant,
        tokens,
      );
    }

    await setPackageName(
      path.join(appDest, "package.json"),
      `${projectName}-${LAYER_TEMPLATE_DIR[layer]}`,
    );
    await removeAppStandaloneConfig(appDest);
    await rm(path.join(appDest, "pnpm-lock.yaml"), { force: true });
  }

  for (const pkg of plan.packagesToGenerate) {
    const pkgDest = path.join(targetDir, "packages", pkg);
    await copyTemplateDir(
      path.join(monorepoRootDir, "packages", pkg),
      pkgDest,
      tokens,
    );

    if (pkg === "api-client" && plan.backendVariant) {
      await applyApiClientVariant(
        monorepoRootDir,
        pkgDest,
        plan.backendVariant,
        tokens,
      );
    }
  }

  await writeRootClaudeMd(targetDir, plan);
}

/** A short index pointing at each app's own CLAUDE.md — not a merge of their contents. */
async function writeRootClaudeMd(
  targetDir: string,
  plan: ResolvedPlan,
): Promise<void> {
  const lines = [
    "# Monorepo",
    "",
    "Scaffolded by create-korzu-app. Each app owns its own conventions — see its CLAUDE.md:",
    "",
    ...plan.layers.map(
      (layer) => `- \`apps/${LAYER_TEMPLATE_DIR[layer]}/CLAUDE.md\``,
    ),
  ];

  if (plan.packagesToGenerate.length > 0) {
    lines.push(
      "",
      "Shared packages:",
      "",
      ...plan.packagesToGenerate.map((pkg) => `- \`packages/${pkg}\``),
    );
  }

  await writeFile(path.join(targetDir, "CLAUDE.md"), `${lines.join("\n")}\n`);
}
