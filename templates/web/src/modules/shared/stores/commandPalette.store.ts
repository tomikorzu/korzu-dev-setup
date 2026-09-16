import { create } from "zustand";

interface CommandPaletteStore {
  open: boolean;
  openPalette: () => void;
  closePalette: () => void;
  toggle: () => void;
}

// Global, so any component (nav button, ⌘K shortcut, a menu item) can open it
// without prop-drilling `open`/`onClose` through the tree.
export const useCommandPaletteStore = create<CommandPaletteStore>((set) => ({
  open: false,
  openPalette: () => set({ open: true }),
  closePalette: () => set({ open: false }),
  toggle: () => set((state) => ({ open: !state.open })),
}));
