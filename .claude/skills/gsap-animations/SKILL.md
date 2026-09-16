---
name: gsap-animations
description: Use when adding, reviewing, or reasoning about any GSAP animation in this project — entrance effects, scroll-triggered reveals, hover/press feedback, page/route transitions, or deciding which GSAP plugin fits a screen or component.
---

# GSAP in a Next.js + MUI codebase

GSAP always runs client-side. Animation logic never lives in a shared component's render
body — it lives in a `useGSAP` hook so components stay reusable and animation stays opt-in.
`gsap` and `@gsap/react` are already dependencies.

## Always use `useGSAP`

Never call `gsap.to/from/timeline` directly in a `useEffect`. Always use `useGSAP` from
`@gsap/react` inside a `"use client"` component or hook:

```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Example() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".card", { opacity: 0, y: 24, stagger: 0.08 });
  }, { scope });

  return <div ref={scope}>...</div>;
}
```

- `{ scope }` scopes selectors to the ref's subtree and auto-reverts/cleans up on unmount —
  this is why `useGSAP` replaces `useEffect` here, not a style preference.
- Add `dependencies` to `useGSAP`'s options when the animation must re-run on prop/state change,
  same as a `useEffect` dep array.
- Reusable patterns become a shared hook in `src/modules/shared/hooks`
  (e.g. `useFadeInOnScroll.ts`), not a timeline copy-pasted per page.

## Choosing what to animate — think UX first, not "add motion"

Before writing an animation, identify *why* it helps the screen/component, then pick the
matching tool:

| UX goal | Technique |
|---|---|
| Reveal content as the user scrolls into it | `ScrollTrigger` (`start`/`end`, `toggleActions`) |
| Communicate loading/empty/success state changes | `gsap.timeline()` driven by state, not scroll |
| Give feedback on hover/press for interactive components | short `gsap.to()` on enter/leave, not a scroll plugin |
| Guide attention to one element among many | stagger (`stagger: 0.05–0.12`) instead of animating everything at once |
| Smooth route/section transitions | `gsap.context()`/timeline in a layout-level hook, kept out of leaf components |
| Draw attention to data changes in charts/lists | animate the changed value only (`gsap.to(ref, { ... })` targeted, not full re-render animation) |
| Complex scroll-driven scenes (pinning, scrubbing) | `ScrollTrigger` with `pin`/`scrub` — only when the design explicitly calls for it |
| Reordering/adding/removing list or grid items | `Flip` plugin |
| Text reveal effects (char/word/line splitting) | `SplitText` |
| Draggable UI (reorder, swipe-to-dismiss, sliders) | `Draggable` |

Register a plugin once per file with `gsap.registerPlugin(...)`, not per render, and only
import the plugins actually used — don't blanket-import the whole GSAP plugin set.

## Rules

1. **`useGSAP` + `scope` always** — no raw `useEffect` + `gsap.to`, no unscoped selectors.
2. **Don't animate via `sx` or inline style objects.** MUI props/variants own static look;
   GSAP owns motion, targeting refs or stable class names.
3. **Match effect to intent.** If you can't name the UX reason for an animation (draw
   attention, confirm an action, orient the user during a change), don't add it.
4. **Keep timelines short and declarative** — a handful of `.to()`/`.from()` calls. Only build
   a longer orchestrated sequence when the design explicitly needs a multi-step scene.
5. **Respect reduced motion.** Wrap non-essential entrance/scroll animations with a check
   against `window.matchMedia("(prefers-reduced-motion: reduce)")` inside the `useGSAP`
   callback, and skip or shorten the animation when it matches.
6. **Clean up plugin side effects.** `ScrollTrigger` instances tied to a scope are killed
   automatically by `useGSAP`'s revert — don't manually track/kill them unless doing something
   outside the scoped context (e.g. a global smooth-scroll setup).
