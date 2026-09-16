import { ThemeProvider } from "@mui/material/styles";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";
import theme from "@/theme/theme";

export function renderWithTheme(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
