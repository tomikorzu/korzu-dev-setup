// This function opacity a color
export function alpha(channel: string, opacity: number): string {
  return `rgba(${channel} / ${opacity})`;
}

// Fluid font-size that scales from minPx (at minVw) to maxPx (at maxVw).
// Example — h1 that grows from 32px (mobile) to 48px (desktop):
//   fontSize: fluidType(32, 48, 375, 1200)
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
