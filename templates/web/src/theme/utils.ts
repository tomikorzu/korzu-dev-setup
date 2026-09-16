import type { Theme } from "@mui/material/styles";

// wraps a palette "*Channel" value (e.g. "34 197 94") into an rgba() string
export function alpha(channel: string, opacity: number): string {
  return `rgba(${channel} / ${opacity})`;
}

export function focusRing(theme: Theme) {
  return {
    "&:focus-visible": {
      outline: `2px solid ${theme.vars.palette.primary.main}`,
      outlineOffset: 2,
    },
  } as const;
}

// fluid font-size that scales from minPx (at minVw) to maxPx (at maxVw)
export function fluidType(
  minPx: number,
  maxPx: number,
  minVw: number = 320,
  maxVw: number = 1200,
): string {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const yIntercept = minPx - slope * minVw;
  return `clamp(${minPx / 16}rem, ${yIntercept / 16}rem + ${slope * 100}vw, ${maxPx / 16}rem)`;
}
