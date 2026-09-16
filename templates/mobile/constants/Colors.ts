// Mobile's own color tokens — deliberately not shared with the Frontend template's MUI theme.
// MUI and React Native render fundamentally differently; keep this file as the single place to
// rebrand the mobile app, same spirit as project.config.ts on the web side, just separate.
export const Colors = {
  light: {
    text: "#11181C",
    background: "#ffffff",
    tint: "#16A34A",
    icon: "#687076",
    border: "#E5E5E5",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#4ADE80",
    icon: "#9BA1A6",
    border: "#2A2D2E",
  },
} as const;
