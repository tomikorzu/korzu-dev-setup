import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildTokens, copyTemplateDir } from "./copyTemplate.js";

let srcDir: string;
let destDir: string;

beforeEach(async () => {
  srcDir = await mkdtemp(path.join(tmpdir(), "korzu-src-"));
  destDir = await mkdtemp(path.join(tmpdir(), "korzu-dest-"));
});

afterEach(async () => {
  await rm(srcDir, { recursive: true, force: true });
  await rm(destDir, { recursive: true, force: true });
});

describe("buildTokens", () => {
  it("pascal-cases a hyphenated project name", () => {
    expect(buildTokens("my-cool-app").PROJECT_NAME_PASCAL).toBe("MyCoolApp");
  });
});

describe("copyTemplateDir", () => {
  it("copies plain files byte-for-byte", async () => {
    await writeFile(path.join(srcDir, "readme.md"), "hello");
    await copyTemplateDir(srcDir, destDir, buildTokens("app"));
    expect(await readFile(path.join(destDir, "readme.md"), "utf8")).toBe(
      "hello",
    );
  });

  it("strips .tmpl and substitutes tokens", async () => {
    await writeFile(
      path.join(srcDir, "config.json.tmpl"),
      '{"name":"{{PROJECT_NAME}}"}',
    );
    await copyTemplateDir(srcDir, destDir, buildTokens("my-app"));
    expect(await readFile(path.join(destDir, "config.json"), "utf8")).toBe(
      '{"name":"my-app"}',
    );
  });

  it("skips _variants directories by default", async () => {
    await mkdir(path.join(srcDir, "_variants", "mobx"), { recursive: true });
    await writeFile(
      path.join(srcDir, "_variants", "mobx", "store.ts"),
      "// mobx",
    );
    await writeFile(path.join(srcDir, "kept.ts"), "// kept");

    await copyTemplateDir(srcDir, destDir, buildTokens("app"));

    await expect(readFile(path.join(destDir, "kept.ts"), "utf8")).resolves.toBe(
      "// kept",
    );
    await expect(
      readFile(path.join(destDir, "_variants", "mobx", "store.ts"), "utf8"),
    ).rejects.toThrow();
  });

  it("copies nested directories recursively", async () => {
    await mkdir(path.join(srcDir, "src", "modules"), { recursive: true });
    await writeFile(path.join(srcDir, "src", "modules", "file.ts"), "content");

    await copyTemplateDir(srcDir, destDir, buildTokens("app"));

    expect(
      await readFile(path.join(destDir, "src", "modules", "file.ts"), "utf8"),
    ).toBe("content");
  });
});
