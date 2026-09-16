export type Layer = "frontend" | "backend" | "mobile" | "cms";
export type BackendVariant = "rest" | "graphql";

// Maps a layer to its template folder under templates/, and to its apps/<dir> name in monorepo mode.
export const LAYER_TEMPLATE_DIR: Record<Layer, string> = {
  frontend: "web",
  backend: "api",
  mobile: "mobile",
  cms: "cms",
};

// Layers with a working template. The rest of the CLI (prompts, resolveDependencies,
// generators) already supports all four.
export const AVAILABLE_LAYERS: Layer[] = [
  "frontend",
  "backend",
  "mobile",
  "cms",
];

export interface ScaffoldAnswers {
  projectName: string;
  targetDir: string;
  layers: Layer[];
  backendVariant?: BackendVariant;
  gitInit: boolean;
  install: boolean;
}

export interface ResolvedPlan {
  layers: Layer[];
  backendVariant?: BackendVariant;
  needsMobx: boolean;
  packagesToGenerate: Array<"types" | "api-client">;
  isMonorepo: boolean;
}
