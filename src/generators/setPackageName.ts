import { readFile, writeFile } from "node:fs/promises";

/** Rewrites just the "name" field of a copied package.json to the scaffolded project's name. */
export async function setPackageName(
  packageJsonPath: string,
  name: string,
): Promise<void> {
  const pkg = JSON.parse(await readFile(packageJsonPath, "utf8"));
  pkg.name = name;
  await writeFile(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
