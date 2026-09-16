import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setPackageName } from "./setPackageName.js";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "korzu-pkg-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("setPackageName", () => {
  it("rewrites only the name field, keeping the rest intact", async () => {
    const pkgPath = path.join(dir, "package.json");
    await writeFile(
      pkgPath,
      JSON.stringify({ name: "placeholder", version: "0.1.0" }),
    );

    await setPackageName(pkgPath, "my-app");

    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    expect(pkg.name).toBe("my-app");
    expect(pkg.version).toBe("0.1.0");
  });
});
