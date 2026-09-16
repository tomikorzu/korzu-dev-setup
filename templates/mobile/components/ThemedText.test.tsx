import { render, screen } from "@testing-library/react-native";
import { ThemedText } from "./ThemedText";

describe("ThemedText", () => {
  it("renders its children", () => {
    render(<ThemedText>Hello</ThemedText>);
    expect(screen.getByText("Hello")).toBeTruthy();
  });
});
