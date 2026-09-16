import path from "node:path";
import * as p from "@clack/prompts";
import validateProjectName from "validate-npm-package-name";
import {
  AVAILABLE_LAYERS,
  type BackendVariant,
  type Layer,
  type ScaffoldAnswers,
} from "./types.js";

const LAYER_LABELS: Record<Layer, string> = {
  frontend: "Frontend — Next.js + MUI + GSAP",
  backend: "Backend — NestJS + Prisma + PostgreSQL",
  mobile: "Mobile — Expo + NativeWind",
  cms: "CMS — Strapi",
};

function bail(value: unknown): void {
  if (p.isCancel(value)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }
}

export async function runPrompts(): Promise<ScaffoldAnswers> {
  p.intro("create-korzu-app");

  const projectName = await p.text({
    message: "Project name",
    placeholder: "my-app",
    validate: (value) => {
      const result = validateProjectName(value || "my-app");
      if (!result.validForNewPackages) return "Not a valid npm package name";
    },
  });
  bail(projectName);

  const layers = await p.multiselect({
    message: "What do you want to scaffold?",
    options: AVAILABLE_LAYERS.map((layer) => ({
      value: layer,
      label: LAYER_LABELS[layer],
    })),
    required: true,
  });
  bail(layers);

  let backendVariant: BackendVariant | undefined;
  if ((layers as Layer[]).includes("backend")) {
    const variant = await p.select({
      message: "REST or GraphQL?",
      options: [
        { value: "rest", label: "REST" },
        { value: "graphql", label: "GraphQL" },
      ],
    });
    bail(variant);
    backendVariant = variant as BackendVariant;
  }

  const gitInit = await p.confirm({
    message: "Initialize a git repository?",
    initialValue: true,
  });
  bail(gitInit);

  const install = await p.confirm({
    message: "Install dependencies now?",
    initialValue: true,
  });
  bail(install);

  p.outro("Scaffolding...");

  const name = projectName as string;
  return {
    projectName: name,
    targetDir: path.resolve(process.cwd(), name),
    layers: layers as Layer[],
    backendVariant,
    gitInit: gitInit as boolean,
    install: install as boolean,
  };
}
