import Image from "next/image";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "@/lib/products";
import { LAYOUTS } from "./constants";
import Cube, { CELL_H, CELL_W } from "./cube";
import ProductLink from "./product-link";

/*
 * Honeycomb menu.
 *
 * Layout technique after Andy Barefoot (https://codepen.io/andybarefoot/pen/PBPrex):
 * a plain CSS grid where every cube spans two columns, and the first cube of
 * each "short" row is pushed one column to the right, which staggers the rows
 * by half a cube. The `honeycomb` utility (./plugin.ts, built from LAYOUTS)
 * sets the columns, --cell and that placement per breakpoint.
 *
 * Everything inside a cube is sized from --cell (one cube's width), so labels
 * and illustrations scale with the grid. Cube colours are custom properties
 * that <Cube /> reads; the grid sets the defaults and the cells override them
 * per state.
 */

export default function Honeycomb() {
  return (
    <nav
      aria-label="Products"
      className="mx-auto w-full @container"
      // At most one full row of the widest layout at design size, so the art never upscales.
      style={{ maxWidth: CELL_W * (LAYOUTS.at(-1)!.columns / 2) }}
    >
      <ul
        className={cn(
          // Columns, --cell (one cube's width) and cube placement (./plugin.ts).
          "honeycomb",
          // A cube is a pointy-top hexagon, 2/√3 × --cell tall. Rows interlock
          // at 3/4 of that height (√3/2 × --cell)…
          "auto-rows-[calc(var(--cell)*sqrt(3)/2)]",
          // …so each cube overhangs its row by the remaining quarter
          // (1/(2√3) × --cell). Nothing absorbs the last row's, so pad it back.
          "pb-[calc(var(--cell)/sqrt(3)/2)]",
          // Label size scales with the cube.
          "text-[length:calc(var(--cell)*0.0931)]",
          "md:text-[length:calc(var(--cell)*0.0924)]",
          // Cube colours, read by <Cube />.
          "[--line:var(--color-surface-250)] [--line-width:0.5px]",
          "[--wall-left:#f4f6f6] [--wall-right:var(--color-surface-175)] [--floor:#fbfaf9]",
        )}
      >
        {PRODUCTS.map((product, i) => (
          <li
            key={product.slug}
            className={cn(
              // One cube: a full hexagon tall (its columns come from `honeycomb`).
              "relative h-[calc(var(--cell)*2/sqrt(3))]",
              // Neighbouring rows' boxes overlap, so the box ignores the pointer;
              // the cube's faces opt back in and pass clicks up to the link.
              "pointer-events-none",
              // State: on hover, raise the cube over its neighbours' shared edges,
              // ink its lines in the accent, shade its right wall, brighten its floor…
              "has-hover:z-1 has-hover:[--floor:#fff] has-hover:[--wall-right:#ededed]",
              "has-hover:[--line:var(--color-accent)] has-hover:[--line-width:0.6px]",
              // …and outline it more heavily on keyboard focus.
              "has-focus-visible:z-1 has-focus-visible:[--floor:#fff]",
              "has-focus-visible:[--line:var(--color-accent)] has-focus-visible:[--line-width:1.5px]",
              // The first two cubes use a slightly bluer floor.
              i < 2 && "[--floor:#fdfeff]",
            )}
          >
            <ProductLink
              href={`/products/${product.slug}`}
              prefetch={false}
              className="group absolute inset-0 text-[#1e201f] outline-none"
            >
              {/* The cube's faces are the only part that takes the pointer (see <Cube />). */}
              <Cube />
              <span
                className={cn(
                  // Sits on the left wall (Figma position)…
                  "absolute top-[29%] left-[5.79%] origin-top-left",
                  // …sheared onto its 30° slope: skew, then narrow by cos 30°.
                  "[transform:skewY(-30deg)_scaleX(calc(sqrt(3)/2))]",
                  "leading-[1.2] font-light tracking-[0.02em] whitespace-pre-line",
                )}
              >
                {product.label}
              </span>
              <Image
                src={`/hero/products/${product.slug}.svg`}
                alt=""
                width={CELL_W}
                height={CELL_H}
                unoptimized
                className={cn(
                  // Art is drawn on the cube's artboard, so it just covers the cell.
                  "absolute inset-0 size-full",
                  // Lifts slightly on hover / keyboard focus.
                  "transition-transform duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
                  "group-hover:translate-y-[calc(var(--cell)*-0.035)]",
                  "group-focus-visible:translate-y-[calc(var(--cell)*-0.035)]",
                )}
              />
            </ProductLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
