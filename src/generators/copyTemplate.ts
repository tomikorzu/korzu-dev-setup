import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface SubstitutionTokens {
  PROJECT_NAME: string;
  PROJECT_NAME_PASCAL: string;
}

function toPascalCase(input: string): string {
  return input
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function buildTokens(projectName: string): SubstitutionTokens {
  return {
    PROJECT_NAME: projectName,
    PROJECT_NAME_PASCAL: toPascalCase(projectName),
  };
}

function substitute(content: string, tokens: SubstitutionTokens): string {
  return Object.entries(tokens).reduce(
    (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value),
    content,
  );
}

const DEFAULT_SKIP_ENTRIES = new Set([
  "_variants",
  "node_modules",
  ".next",
  "dist",
  "coverage",
  // Strapi's local dev/build output (templates/cms) — never something a fresh scaffold should
  // inherit from whoever last ran `pnpm dev`/`pnpm build` inside the template source.
  "build",
  ".cache",
  ".tmp",
  ".strapi",
  ".strapi-updater.json",
]);

// Every individual layer template (web/api/mobile/cms) carries its own pnpm-workspace.yaml so
// it can `pnpm install` on its own without being absorbed into this tool repo's workspace — that
// file is irrelevant to a scaffolded project and must never end up in the output. The monorepo
// root's OWN pnpm-workspace.yaml (from templates/_monorepo-root) is real and must be kept, so
// this skip is applied explicitly by callers copying a layer template, not baked into the default.
export const LAYER_TEMPLATE_SKIP_ENTRIES = new Set([
  ...DEFAULT_SKIP_ENTRIES,
  "pnpm-workspace.yaml",
]);

// The initial copy of _monorepo-root must not blanket-copy packages/ — only the ones
// resolveDependencies() actually calls for get copied, explicitly, afterward.
export const MONOREPO_ROOT_SKIP_ENTRIES = new Set([
  ...DEFAULT_SKIP_ENTRIES,
  "packages",
]);

/**
 * Recursively copies a template directory into a destination, stripping the
 * `.tmpl` suffix and substituting `{{TOKEN}}` placeholders in those files.
 * Everything else is copied byte-for-byte. `_variants/` (and build junk) is
 * skipped by default — callers overlay a specific variant explicitly.
 */
export async function copyTemplateDir(
  srcDir: string,
  destDir: string,
  tokens: SubstitutionTokens,
  skipEntries: Set<string> = DEFAULT_SKIP_ENTRIES,
): Promise<void> {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (skipEntries.has(entry.name)) continue;

    const srcPath = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      await copyTemplateDir(
        srcPath,
        path.join(destDir, entry.name),
        tokens,
        skipEntries,
      );
      continue;
    }

    const isTemplateFile = entry.name.endsWith(".tmpl");
    const destName = isTemplateFile
      ? entry.name.slice(0, -".tmpl".length)
      : entry.name;
    const destPath = path.join(destDir, destName);

    if (isTemplateFile) {
      const content = await readFile(srcPath, "utf8");
      await writeFile(destPath, substitute(content, tokens));
    } else {
      await cp(srcPath, destPath);
    }
  }
}
