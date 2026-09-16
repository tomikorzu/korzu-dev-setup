import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Strips an app's own Husky/lint-staged setup, and any `pnpm` config pnpm only reads from a
 * workspace root, once it's inside a monorepo — only the root owns those there. Each layer
 * template carries its own `.husky/` + "prepare" script (and, for templates/cms,
 * `pnpm.onlyBuiltDependencies`) so it works standalone; both become redundant (the former prints
 * ".git can't be found" noise, the latter prints a "will not take effect" warning) once copied
 * into `apps/<name>/` — the monorepo root's own package.json already covers them.
 */
export async function removeAppStandaloneConfig(
  appDest: string,
): Promise<void> {
  await rm(path.join(appDest, ".husky"), { recursive: true, force: true });

  const packageJsonPath = path.join(appDest, "package.json");
  const pkg = JSON.parse(await readFile(packageJsonPath, "utf8"));

  delete pkg.scripts?.prepare;
  delete pkg["lint-staged"];
  delete pkg.devDependencies?.husky;
  delete pkg.devDependencies?.["lint-staged"];
  delete pkg.pnpm;

  await writeFile(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
