"use client";

import { useColorScheme } from "@mui/material/styles";

/**
 * Hook to control the color mode (dark/light/system).
 * Wraps MUI's useColorScheme with convenience helpers.
 *
 * On first visit, mode is "system" — resolved via prefers-color-scheme.
 * After the user picks a mode, their choice is persisted in localStorage.
 *
 * @example
 *   const { mode, resolvedMode, toggle, isDark } = useColorMode();
 */
export function useColorMode() {
  const { mode, setMode, systemMode } = useColorScheme();

  // The actual applied mode after resolving "system"
  const resolvedMode = mode === "system" ? systemMode : mode;

  const toggle = () => {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  };

  return {
    /** Raw mode — can be "light", "dark", or "system" */
    mode,
    /** The actual applied mode after resolving "system" to the device preference */
    resolvedMode,
    setMode,
    toggle,
    isDark: resolvedMode === "dark",
  } as const;
}
