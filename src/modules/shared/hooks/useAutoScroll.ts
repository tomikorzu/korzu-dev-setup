"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a scrollable container.
 * Automatically scrolls to the bottom when the dependency changes.
 */
export function useAutoScroll<T>(dependency: T) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [dependency]);

  return ref;
}
