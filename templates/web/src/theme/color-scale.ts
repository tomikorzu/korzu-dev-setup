// Generates a 50–900 tint/shade scale from one exact brand hex, so a client's
// brand color (e.g. a restaurant's exact primary) renders pixel-for-pixel as given,
// instead of being approximated by the closest preset in primitives.colors.
//
// The input hex is pinned exactly at `anchorStep` (the shade used for buttons/links
// in light mode); every other step keeps the same hue/saturation and only shifts
// lightness, using a Tailwind-like reference curve shifted to pass through the anchor.

export type ColorScale = Record<
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  string
>;

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const REFERENCE_LIGHTNESS: Record<(typeof STEPS)[number], number> = {
  50: 97,
  100: 93,
  200: 84,
  300: 72,
  400: 60,
  500: 50,
  600: 42,
  700: 34,
  800: 27,
  900: 20,
};

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16) / 255;
  const g = Number.parseInt(normalized.slice(2, 4), 16) / 255;
  const b = Number.parseInt(normalized.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: l * 100 };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    default:
      h = (r - g) / d + 4;
  }

  return { h: h * 60, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) =>
    lNorm - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (n: number) =>
    Math.round(f(n) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(0)}${toHex(8)}${toHex(4)}`;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Builds a 50–900 scale from an exact hex, keeping that hex exact at `anchorStep`. */
export function generateColorScale(
  hex: string,
  anchorStep: (typeof STEPS)[number] = 600,
): ColorScale {
  const { h, s, l } = hexToHsl(hex);
  const offset = l - REFERENCE_LIGHTNESS[anchorStep];

  const scale = {} as ColorScale;
  for (const step of STEPS) {
    scale[step] =
      step === anchorStep
        ? hex
        : hslToHex(h, s, clamp(REFERENCE_LIGHTNESS[step] + offset, 4, 98));
  }
  return scale;
}
