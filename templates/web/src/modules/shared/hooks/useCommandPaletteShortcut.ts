"use client";

import { useEffect } from "react";
import { useCommandPaletteStore } from "../stores/commandPalette.store";

/** Toggles the command palette on Cmd/Ctrl+K from anywhere in the app. */
export function useCommandPaletteShortcut() {
  const toggle = useCommandPaletteStore((state) => state.toggle);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);
}
