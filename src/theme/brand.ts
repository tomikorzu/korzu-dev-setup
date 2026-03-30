/**
 * Brand Configuration
 *
 * Este es el UNICO archivo que necesitas cambiar para re-brandear un proyecto.
 * Mapea roles semánticos a escalas de color de primitives.
 */

import { primitives } from "./primitives";

const { colors } = primitives;

export const brand = {
  /** Color principal de acción (botones, links, focus rings) */
  primary: colors.green,
  /** Color de acento/secundario (highlights, nav activo, botones secundarios) */
  accent: colors.yellow,

  // Colores semánticos — raramente cambian entre marcas
  positive: colors.green,
  negative: colors.red,
  info: colors.blue,
  caution: colors.yellow,
  neutral: colors.neutral,
} as const;

export type BrandConfig = typeof brand;
