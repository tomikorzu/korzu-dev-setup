import type { ResolvedPlan, ScaffoldAnswers } from "../types.js";

export function resolveDependencies(answers: ScaffoldAnswers): ResolvedPlan {
  const { layers, backendVariant } = answers;
  const hasBackend = layers.includes("backend");
  const consumesApi = layers.includes("frontend") || layers.includes("mobile");

  return {
    layers,
    backendVariant,
    needsMobx: hasBackend && backendVariant === "graphql",
    packagesToGenerate:
      hasBackend && consumesApi ? ["types", "api-client"] : [],
    isMonorepo: layers.length > 1,
  };
}
