import { readFile, writeFile } from "node:fs/promises";

interface PackageJsonFragment {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/** Spreads a fragment's dependencies/devDependencies into an existing package.json on disk. */
export async function mergePackageJsonFragment(
  packageJsonPath: string,
  fragmentPath: string,
): Promise<void> {
  const pkg = JSON.parse(await readFile(packageJsonPath, "utf8"));
  const fragment: PackageJsonFragment = JSON.parse(
    await readFile(fragmentPath, "utf8"),
  );

  pkg.dependencies = { ...pkg.dependencies, ...fragment.dependencies };
  pkg.devDependencies = { ...pkg.devDependencies, ...fragment.devDependencies };

  await writeFile(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
