import { describe, expect, it } from "vitest";
import { renderWithTheme, screen } from "@/test/render";
import StatusDot from "./StatusDot.component";

describe("StatusDot", () => {
  it("renders the label when showLabel is true", () => {
    renderWithTheme(<StatusDot status="online" label="Online" showLabel />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("hides the label by default", () => {
    renderWithTheme(<StatusDot status="online" label="Online" />);
    expect(screen.queryByText("Online")).not.toBeInTheDocument();
  });
});
