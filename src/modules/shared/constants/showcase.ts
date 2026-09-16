/**
 * Section definitions for the /components showcase page.
 * Used by both AsideMenu and the page layout.
 */
export const SHOWCASE_SECTIONS = [
  { id: "navigation", label: "Navigation & Layout" },
  { id: "data-display", label: "Data Display" },
  { id: "feedback", label: "Feedback & Overlays" },
  { id: "chat", label: "Chat" },
  { id: "inputs", label: "Inputs & Controls" },
  { id: "typography-code", label: "Typography & Code" },
  { id: "cards", label: "Cards & Profiles" },
  { id: "indicators", label: "Indicators & Progress" },
  { id: "overlays", label: "Menus & Overlays" },
] as const;

export type ShowcaseSection = (typeof SHOWCASE_SECTIONS)[number];
