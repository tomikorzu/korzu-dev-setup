"use client";

import { useColorScheme } from "@mui/material/styles";

/**
 * Hook para controlar el modo de color (dark/light).
 * Wrapper sobre useColorScheme de MUI que agrega helpers.
 *
 * Uso:
 *   const { mode, toggle, isDark } = useColorMode();
 */
export function useColorMode() {
  const { mode, setMode, systemMode } = useColorScheme();

  const resolvedMode = mode === "system" ? systemMode : mode;

  const toggle = () => {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  };

  return {
    mode: resolvedMode,
    setMode,
    toggle,
    isDark: resolvedMode === "dark",
  } as const;
}
