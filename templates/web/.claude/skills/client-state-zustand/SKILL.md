---
name: client-state-zustand
description: Use when a piece of UI state needs to be shared across components that aren't naturally parent/child — global toggles, palettes, drawers. Zustand is the pattern; TanStack Query still owns server state.
---

# Client state: Zustand

Not every shared state needs a store. Reach for Zustand only when prop-drilling or a single
`useState` genuinely doesn't reach — e.g. `commandPalette.store.ts`, where a nav button, a
keyboard shortcut, and the modal itself all need the same `open` boolean without a common parent
to hold it.

## Rules

1. **Server data (API responses, CMS content) belongs in TanStack Query, never a Zustand
   store.** Zustand is for client-only UI state — open/closed, selected tab, draft form values
   kept across navigation.
2. **One store per concern**, named `<thing>.store.ts` in `src/modules/shared/stores/`, exporting
   a single `use<Thing>Store` hook. Don't build one giant app-wide store.
3. **Keep stores tiny**: state + the actions that mutate it, no derived data that a selector or a
   plain computation in the component can produce instead.
4. **Local component state stays local.** If only one component tree needs it, use `useState`,
   not a store — a store is for state shared across components with no natural parent/child
   relationship.
