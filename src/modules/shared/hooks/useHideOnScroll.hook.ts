"use client";

import { useEffect, useRef, useState } from "react";

export const useHideOnScroll = () => {
  const lastScrollY = useRef(0);
  const [show, setShow] = useState(true);
  const handleScroll = () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 50) {
      if (currentScrollY > lastScrollY.current && show) {
        setShow(false);
      } else if (currentScrollY < lastScrollY.current && !show) {
        setShow(true);
      }
    } else {
      if (!show) {
        setShow(true);
      }
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      lastScrollY.current = window.pageYOffset;

      const throttledHandleScroll = () => {
        requestAnimationFrame(handleScroll);
      };

      window.addEventListener("scroll", throttledHandleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", throttledHandleScroll);
      };
    }
  }, [show]);
  return show;
};
