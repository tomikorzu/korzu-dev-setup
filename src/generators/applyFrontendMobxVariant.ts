import path from "node:path";
import { copyTemplateDir, type SubstitutionTokens } from "./copyTemplate.js";
import { mergePackageJsonFragment } from "./mergePackageJson.js";

const SKIP = new Set(["package.json.fragment.json", "node_modules"]);

/** Overlays the Frontend template's MobX variant (added only when Backend=GraphQL). */
export async function applyFrontendMobxVariant(
  webTemplateDir: string,
  appDest: string,
  tokens: SubstitutionTokens,
): Promise<void> {
  const mobxDir = path.join(webTemplateDir, "_variants", "mobx");
  await copyTemplateDir(mobxDir, appDest, tokens, SKIP);
  await mergePackageJsonFragment(
    path.join(appDest, "package.json"),
    path.join(mobxDir, "package.json.fragment.json"),
  );
}
