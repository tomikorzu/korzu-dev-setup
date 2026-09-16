import { describe, expect, it } from "vitest";
import { resolveDependencies } from "./resolveDependencies.js";

function answers(
  overrides: Partial<Parameters<typeof resolveDependencies>[0]> = {},
) {
  return {
    projectName: "test-app",
    targetDir: "/tmp/test-app",
    layers: [],
    gitInit: true,
    install: true,
    ...overrides,
  };
}

describe("resolveDependencies", () => {
  it("is standalone with exactly one layer", () => {
    const plan = resolveDependencies(answers({ layers: ["frontend"] }));
    expect(plan.isMonorepo).toBe(false);
  });

  it("is a monorepo with two or more layers", () => {
    const plan = resolveDependencies(
      answers({ layers: ["frontend", "backend"] }),
    );
    expect(plan.isMonorepo).toBe(true);
  });

  it("adds MobX only when backend is GraphQL", () => {
    expect(
      resolveDependencies(
        answers({ layers: ["frontend", "backend"], backendVariant: "graphql" }),
      ).needsMobx,
    ).toBe(true);
    expect(
      resolveDependencies(
        answers({ layers: ["frontend", "backend"], backendVariant: "rest" }),
      ).needsMobx,
    ).toBe(false);
  });

  it("generates shared packages only when backend is paired with frontend or mobile", () => {
    expect(
      resolveDependencies(
        answers({ layers: ["backend"], backendVariant: "rest" }),
      ).packagesToGenerate,
    ).toEqual([]);
    expect(
      resolveDependencies(
        answers({ layers: ["frontend", "backend"], backendVariant: "rest" }),
      ).packagesToGenerate,
    ).toEqual(["types", "api-client"]);
    expect(
      resolveDependencies(
        answers({ layers: ["backend", "cms"], backendVariant: "rest" }),
      ).packagesToGenerate,
    ).toEqual([]);
  });
});
