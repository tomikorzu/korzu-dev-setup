import * as icons from "@mui/icons-material";
import { describe, expect, it } from "vitest";
import { getIconByString } from "./getIconByString.util";

describe("getIconByString", () => {
  it("returns the correct icon", () => {
    expect(getIconByString("Home")).toBe(icons.Home);
  });
  it("returns null if the icon is not found", () => {
    expect(getIconByString("NotAValidIcon" as keyof typeof icons)).toBeNull();
  });
  it("returns null if the icon is not a valid string", () => {
    expect(getIconByString(null as unknown as keyof typeof icons)).toBeNull();
  });
});