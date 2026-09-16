"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useState } from "react";

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = children.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (!autoPlay || paused || total <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, autoPlayInterval, next, total]);

  if (total === 0) return null;

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{ position: "relative" }}
    >
      {/* Track */}
      <Box sx={{ overflow: "hidden", borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            transform: `translateX(-${active * 100}%)`,
            transition: "transform 400ms ease-in-out",
          }}
        >
          {children.map((child, i) => (
            <Box key={i} sx={{ minWidth: "100%", flexShrink: 0 }}>
              {child}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "surface.container.low",
              "&:hover": { bgcolor: "surface.container.high" },
              boxShadow: 2,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "surface.container.low",
              "&:hover": { bgcolor: "surface.container.high" },
              boxShadow: 2,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          {children.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                bgcolor:
                  i === active
                    ? "brand.primary.enabled"
                    : "surface.neutral.primary",
                cursor: "pointer",
                transition: "all 200ms ease-out",
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
