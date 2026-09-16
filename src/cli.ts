import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import * as p from "@clack/prompts";
import { resolveDependencies } from "./conditions/resolveDependencies.js";
import { scaffoldMonorepo } from "./generators/scaffoldMonorepo.js";
import { scaffoldStandalone } from "./generators/scaffoldStandalone.js";
import { runPrompts } from "./prompts.js";
import {
  AVAILABLE_LAYERS,
  type BackendVariant,
  type Layer,
  type ScaffoldAnswers,
} from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.join(__dirname, "..", "templates");

function answersFromFlags(values: {
  name?: string;
  dir?: string;
  frontend?: boolean;
  backend?: string;
  mobile?: boolean;
  cms?: boolean;
  git?: boolean;
  install?: boolean;
  "no-git"?: boolean;
  "no-install"?: boolean;
}): ScaffoldAnswers {
  const projectName = values.name ?? "my-app";
  const layers: Layer[] = [];
  if (values.frontend) layers.push("frontend");
  if (values.backend) layers.push("backend");
  if (values.mobile) layers.push("mobile");
  if (values.cms) layers.push("cms");

  if (layers.length === 0) {
    throw new Error(
      "Pass at least one of --frontend/--backend/--mobile/--cms with --yes.",
    );
  }

  return {
    projectName,
    targetDir: path.resolve(process.cwd(), values.dir ?? projectName),
    layers,
    backendVariant: values.backend as BackendVariant | undefined,
    gitInit: values["no-git"] ? false : (values.git ?? true),
    install: values["no-install"] ? false : (values.install ?? true),
  };
}

async function main() {
  const { values } = parseArgs({
    options: {
      yes: { type: "boolean", default: false },
      name: { type: "string" },
      dir: { type: "string" },
      frontend: { type: "boolean", default: false },
      backend: { type: "string" },
      mobile: { type: "boolean", default: false },
      cms: { type: "boolean", default: false },
      install: { type: "boolean", default: true },
      git: { type: "boolean", default: true },
      "no-install": { type: "boolean", default: false },
      "no-git": { type: "boolean", default: false },
    },
  });

  const answers = values.yes ? answersFromFlags(values) : await runPrompts();

  for (const layer of answers.layers) {
    if (!AVAILABLE_LAYERS.includes(layer)) {
      throw new Error(
        `"${layer}" isn't scaffoldable yet — coming in a later release.`,
      );
    }
  }

  const plan = resolveDependencies(answers);

  const spinner = p.spinner();
  spinner.start("Copying files");
  if (plan.isMonorepo) {
    await scaffoldMonorepo(
      TEMPLATES_ROOT,
      answers.targetDir,
      plan,
      answers.projectName,
    );
  } else {
    await scaffoldStandalone(
      TEMPLATES_ROOT,
      answers.targetDir,
      plan,
      answers.projectName,
    );
  }
  spinner.stop("Files copied");

  if (answers.gitInit) {
    spawnSync("git", ["init"], { cwd: answers.targetDir, stdio: "ignore" });
  }

  if (answers.install) {
    spinner.start("Installing dependencies");
    spawnSync("pnpm", ["install"], { cwd: answers.targetDir, stdio: "ignore" });
    spinner.stop("Dependencies installed");
  }

  p.outro(
    `Done! cd ${path.relative(process.cwd(), answers.targetDir) || "."} && pnpm dev`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
