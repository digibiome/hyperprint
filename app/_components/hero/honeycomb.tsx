import Image from "next/image";
import Link from "next/link";
import Cube, { CELL_H, CELL_W } from "./cube";

type Art = {
  src: string;
  /** Top-left corner inside the cube, in design px. */
  x: number;
  y: number;
  /** Intrinsic size of the SVG, in design px. */
  w: number;
  h: number;
};

type Product = {
  slug: string;
  /** Use "\n" to break the label onto two lines. */
  label: string;
  art: Art[];
};

const art = (name: string, x: number, y: number, w: number, h: number): Art => ({
  src: `/hero/products/${name}.svg`,
  x,
  y,
  w,
  h,
});

/** Order matters: the grid flows these left-to-right, top-to-bottom. */
const PRODUCTS: Product[] = [
  { slug: "flyer", label: "Flyer", art: [art("flyer", 38.93, 121.91, 96, 56)] },
  {
    slug: "name-card",
    label: "Name\ncard",
    art: [art("name-card", 38.9, 112.45, 96, 55)],
  },
  { slug: "sticker", label: "Sticker", art: [art("sticker", 36.14, 116, 103, 60)] },
  { slug: "banner", label: "Banner", art: [art("banner", 39.24, 60.99, 90, 110)] },
  { slug: "bunting", label: "Bunting", art: [art("bunting", 64.33, 37.08, 45, 151)] },
  {
    slug: "wall-sticker",
    label: "Wall\nsticker",
    art: [art("wall-sticker", 59.59, 59.98, 53, 111)],
  },
  {
    slug: "corporate-profile",
    label: "Corporate\nprofile",
    art: [
      art("corporate-profile-left", 45.45, 82.46, 41, 88),
      art("corporate-profile-right", 86.34, 82.16, 42, 88),
    ],
  },
  {
    slug: "invitation-card",
    label: "Invitation\ncard",
    art: [art("invitation-card", 50.93, 102.11, 85, 63)],
  },
  {
    slug: "guest-book",
    label: "Guest\nbook",
    art: [art("guest-book", 33, 114.58, 101, 65)],
  },
  { slug: "brochure", label: "Brochure", art: [art("brochure", 39.4, 73.94, 97, 89)] },
  { slug: "booklet", label: "Booklet", art: [art("booklet", 37.39, 115.55, 106, 65)] },
  { slug: "book", label: "Book", art: [art("book", 35.8, 117.42, 103, 64)] },
];

const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(3)}%`;

/*
 * Honeycomb menu.
 *
 * Layout technique after Andy Barefoot (https://codepen.io/andybarefoot/pen/PBPrex):
 * a plain CSS grid where every cube spans two columns, and the first cube of
 * each "short" row is pushed one column to the right, which staggers the rows
 * by half a cube.
 *
 * Everything inside a cube is sized from --cell (one cube's width), so labels
 * and illustrations scale with the grid. Cube colours are custom properties
 * that <Cube /> reads; the grid sets them per breakpoint and the cells
 * override them per state.
 */

/** The comb has 6 columns, and 8 once its container is 560px wide. */
const GRID = [
  "m-0 grid list-none",
  "[--cols:6] @min-[560px]:[--cols:8]",
  "[--cell:calc(100cqw/var(--cols)*2)]",
  "grid-cols-[repeat(var(--cols),1fr)]",
  // A cube is a hexagon of height 2/√3 × width; rows interlock at 3/4 of that.
  "auto-rows-[calc(var(--cell)*0.866025)]",
  // The last row's cubes hang out of their track by the remaining quarter.
  "pb-[calc(var(--cell)*0.288675)]",
  "text-[length:calc(var(--cell)*0.0931)] @min-[560px]:text-[length:calc(var(--cell)*0.0924)]",
  // Cube colours, read by <Cube />.
  "[--line:var(--color-accent)] [--line-width:0.6px]",
  "[--wall-left:#f4f6f6] [--wall-right:#ededed] [--floor:#fbfaf9]",
  "@min-[560px]:[--line:var(--color-surface-250)] @min-[560px]:[--line-width:0.5px]",
  "@min-[560px]:[--wall-right:var(--color-surface-175)]",
].join(" ");

const CELL = [
  "relative col-end-[span_2] h-[calc(var(--cell)*1.154701)]",
  // Bounding boxes of neighbouring rows overlap; only the link takes clicks.
  "pointer-events-none",
  "has-hover:[--floor:#fff]",
  "has-focus-visible:z-1 has-focus-visible:[--floor:#fff]",
  "has-focus-visible:[--line:var(--color-accent)] has-focus-visible:[--line-width:1.5px]",
].join(" ");

/**
 * Column placement that staggers the rows.
 * 6 columns: rows of 2-3-2-3-2, so every 5th cube starts a short row.
 * 8 columns: rows of 3-4-3-2, so every 7th cube starts a short row, and the
 * two leftover cubes are centred under the row of three.
 */
function placement(i: number, count: number) {
  const narrow = i % 5 === 0 ? "col-start-2" : "";
  let wide = narrow ? "@min-[560px]:col-start-auto" : "";
  if (i % 7 === 0) wide = "@min-[560px]:col-start-2";
  else if (i % 7 === 3 && i === count - 2) wide = "@min-[560px]:col-start-3";
  return `${narrow} ${wide}`;
}

export default function Honeycomb() {
  return (
    <nav aria-label="Products" className="mx-auto w-full max-w-[693px] @container">
      <ul className={GRID}>
        {PRODUCTS.map((product, i) => (
          <li
            key={product.slug}
            className={`${CELL} ${placement(i, PRODUCTS.length)} ${i < 2 ? "[--floor:#fdfeff]" : ""}`}
          >
            <Cube />
            <Link
              href={`/products/${product.slug}`}
              prefetch={false}
              className="group pointer-events-auto absolute inset-0 block text-[#1e201f] outline-none [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]"
            >
              <span className="absolute top-[29%] left-[5.79%] origin-top-left [transform:skewY(-30deg)_scaleX(0.866025)] leading-[1.2] font-light tracking-[0.02em] whitespace-pre-line">
                {product.label}
              </span>
              {product.art.map((a) => (
                <Image
                  key={a.src}
                  src={a.src}
                  alt=""
                  width={a.w}
                  height={a.h}
                  unoptimized
                  className="absolute h-auto max-w-none transition-transform duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-[calc(var(--cell)*-0.035)] group-focus-visible:translate-y-[calc(var(--cell)*-0.035)] motion-reduce:transition-none"
                  style={{
                    left: pct(a.x, CELL_W),
                    top: pct(a.y, CELL_H),
                    width: pct(a.w, CELL_W),
                  }}
                />
              ))}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
