/**
 * Grid layouts, narrowest first. `screen` is the Tailwind breakpoint a layout
 * starts at (none for the first). Columns must be even: a cube spans two, and
 * rows alternate between short (columns/2 − 1 cubes) and full (columns/2).
 * The Tailwind plugin in ./plugin.ts turns these into the `honeycomb` utility.
 */
export const LAYOUTS: { columns: number; screen?: string }[] = [
  { columns: 6 },
  { columns: 8, screen: "md" },
];
