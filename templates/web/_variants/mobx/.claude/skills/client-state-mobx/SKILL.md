---
name: client-state-mobx
description: Use for client-side domain state in this project — it's paired with a GraphQL backend, so MobX models domain entities on top of query results, while Zustand still owns plain UI state.
---

# Client state: MobX (GraphQL projects only)

This project's backend is GraphQL, so MobX is included alongside Zustand — they don't compete
for the same job.

- **MobX** models *domain* state: normalized entities derived from GraphQL query results,
  computed/derived values over them (`get pendingCount()` style), mutations that need to feel
  synchronous in the UI before a mutation round-trips. See `items.store.ts` for the pattern —
  a plain class with `makeAutoObservable(this)`, exported as a singleton.
- **Zustand** still owns plain UI state (open/closed, selected tab) — see the
  `client-state-zustand` skill. Don't move a command-palette-style toggle into a MobX store just
  because MobX is available.
- **MobX doesn't fetch data.** Feed a store from wherever the GraphQL client's query result
  lands (e.g. an effect after a query resolves) — the store only holds and derives from that
  data afterward.
- **Components read MobX state via `mobx-react-lite`'s `observer()`** wrapper, not by calling
  store getters directly in a plain component — without `observer()`, the component won't
  re-render when the store changes.
- **One store per domain concern**, named `<thing>.store.ts` in `src/modules/shared/stores/`,
  same location convention as the Zustand stores — just a different shape (a class singleton,
  not a `create()` hook).
