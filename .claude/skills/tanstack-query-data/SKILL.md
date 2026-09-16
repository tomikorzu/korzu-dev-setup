---
name: tanstack-query-data
description: Use when fetching, caching, or mutating server data on the client in this project — loading states, refetching, optimistic updates, form submissions that hit an API.
---

# Data fetching: TanStack Query

`@tanstack/react-query` is a dependency, wired up via
`src/modules/shared/providers/Query.provider.tsx` (mounted in `App.provider.tsx`). This is the
only client-side data-fetching pattern — no ad-hoc `useEffect` + `useState` fetch logic.

## Pattern

1. **Server Components fetch by default.** Only reach for `useQuery`/`useMutation` when data
   needs client-side caching, polling, refetch-on-focus, or lives behind user interaction
   (search-as-you-type, infinite scroll, optimistic mutation).
2. **One hook per resource**, colocated in `src/modules/shared/hooks` if reused, or next to the
   feature that owns it otherwise:
   ```ts
   function useUser(id: string) {
     return useQuery({
       queryKey: ["user", id],
       queryFn: () => fetchUser(id),
     });
   }
   ```
3. **Mutations pair with `queryClient.invalidateQueries`**, not manual refetch calls:
   ```ts
   const queryClient = useQueryClient();
   const mutation = useMutation({
     mutationFn: updateUser,
     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user", id] }),
   });
   ```
4. **Reuse the `zod` schema** from `forms-rhf-zod` as the mutation's input type when a form
   submits to this mutation — don't define the shape twice.

## Rules

- Query keys are arrays, structured most-generic-first (`["user", id]`, not `["user-" + id]`).
- Don't put `QueryClientProvider` anywhere but `Query.provider.tsx` — one client for the app.
- Loading/error UI comes from shared components (skeletons, `EmptyState`, `NotificationCard`),
  not one-off markup per screen.
- No manual `isLoading` + `useEffect` fetch chains once a query/mutation hook exists for that
  resource — that's exactly what this library replaces.
