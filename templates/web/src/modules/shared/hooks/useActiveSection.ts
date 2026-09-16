"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently visible in the viewport using IntersectionObserver.
 * Returns the id of the most visible section — used for scroll-spy navigation.
 */
export function useActiveSection(
  sectionIds: string[],
  options?: { rootMargin?: string; threshold?: number },
): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const ratioMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratioMap.current.set(entry.target.id, entry.intersectionRatio);
        }

        let maxRatio = 0;
        let maxId = activeId;
        ratioMap.current.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxId !== activeId) {
          setActiveId(maxId);
        }
      },
      {
        rootMargin: options?.rootMargin ?? "-20% 0px -60% 0px",
        threshold: options?.threshold ?? [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds, options?.rootMargin, options?.threshold, activeId]);

  return activeId;
}
