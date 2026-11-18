import plugin from "tailwindcss/plugin";
import { LAYOUTS } from "./constants";

/*
 * Tailwind plugin: the `honeycomb` utility.
 *
 * Loaded from app/globals.css with `@plugin`. Tailwind runs this file at build
 * time (TypeScript is fine, it's loaded through jiti), so the numbers in
 * LAYOUTS become plain static CSS. Nothing here ships to the browser.
 *
 * Put `honeycomb` on the grid and it lays out its children as cubes:
 *
 * - each layout gets its own media-query range, so its rules never leak into
 *   another breakpoint;
 * - the grid gets the layout's columns and sets --cell (one cube's width);
 * - every child spans two columns;
 * - the rows alternate short, full, short, full… A short row starts one
 *   column in, which staggers it by half a cube against its neighbours;
 * - a partly filled last row is centred, as far as the stagger allows.
 *
 * The child rules use nth-child selectors (like `space-x-*` does), so they
 * work for any number of cubes.
 */

type Css = { [key: string]: string | Css };

/** The rules for one layout, as nested CSS-in-JS under the utility's class. */
function layoutRules(columns: number): Css {
  const full = columns / 2; // cubes in a full row
  const short = full - 1; // cubes in a short row
  const period = short + full; // cubes per short + full pair of rows

  // Each row's first cube, as an nth-child() formula. Rows repeat every
  // `period` cubes: a short row starts at 1, the full row after it at short + 1.
  const rows = [
    { first: `${period}n+1`, capacity: short, odd: false }, // starts on column 2
    { first: `${period}n+${short + 1}`, capacity: full, odd: true }, // column 1
  ];

  const rules: Css = {
    "grid-template-columns": `repeat(${columns}, minmax(0, 1fr))`,
    "--cell": `calc(100cqw / ${full})`,
    // On the end line, so it survives the start lines set below (the
    // `grid-column: span 2` shorthand puts the span on the start line).
    "& > *": { "grid-column-end": "span 2" },
  };

  for (const { first, capacity, odd } of rows) {
    // Where a row of k cubes starts. Centred is column full − k + 1, but a cube
    // only interlocks with the rows around it on odd (full row) or even (short
    // row) columns, so step one column left when the parity is wrong.
    const start = (k: number) => {
      const centred = full - k + 1;
      return centred % 2 === (odd ? 1 : 0) ? centred : centred - 1;
    };

    // The row's usual start: column 2 for a short row; a full row needs nothing.
    if (start(capacity) !== 1) {
      rules[`& > :nth-child(${first})`] = { "grid-column-start": `${start(capacity)}` };
    }

    // A last row with only k cubes: its first cube is also k-th from the end.
    for (let k = 1; k < capacity; k++) {
      if (start(k) !== start(capacity)) {
        rules[`& > :nth-child(${first}):nth-last-child(${k})`] = {
          "grid-column-start": `${start(k)}`,
        };
      }
    }
  }

  return rules;
}

export default plugin(({ addUtilities, theme }) => {
  const honeycomb: Css = { display: "grid" };

  LAYOUTS.forEach(({ columns }, i) => {
    const from = LAYOUTS[i].screen && theme(`screens.${LAYOUTS[i].screen}`);
    const to = LAYOUTS[i + 1]?.screen && theme(`screens.${LAYOUTS[i + 1].screen}`);
    const range = [from && `(width >= ${from})`, to && `(width < ${to})`].filter(Boolean);
    if (range.length) honeycomb[`@media ${range.join(" and ")}`] = layoutRules(columns);
    else Object.assign(honeycomb, layoutRules(columns)); // a single layout needs no query
  });

  addUtilities({ ".honeycomb": honeycomb });
});
