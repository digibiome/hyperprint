import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "./constants";
import Cube, { CELL_H, CELL_W } from "./cube";

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

export default function Honeycomb() {
  return (
    <nav aria-label="Products" className="mx-auto w-full max-w-[693px] @container">
      <ul
        className={cn(
          // Grid: 6 columns, 8 from 560px. A cube spans 2 columns, so --cell
          // (one cube's width) is a third or a quarter of the container.
          "grid grid-cols-6 [--cell:calc(100cqw/3)]",
          "@min-[560px]:grid-cols-8 @min-[560px]:[--cell:calc(100cqw/4)]",
          // A cube is a pointy-top hexagon, 2/√3 × --cell tall. Rows interlock
          // at 3/4 of that height (√3/2 × --cell)…
          "auto-rows-[calc(var(--cell)*sqrt(3)/2)]",
          // …so each cube overhangs its row by the remaining quarter
          // (1/(2√3) × --cell). Nothing absorbs the last row's, so pad it back.
          "pb-[calc(var(--cell)/sqrt(3)/2)]",
          // Label size scales with the cube.
          "text-[length:calc(var(--cell)*0.0931)]",
          "@min-[560px]:text-[length:calc(var(--cell)*0.0924)]",
          // Cube colours, read by <Cube />.
          "[--line:var(--color-accent)] [--line-width:0.6px]",
          "[--wall-left:#f4f6f6] [--wall-right:#ededed] [--floor:#fbfaf9]",
          "@min-[560px]:[--line:var(--color-surface-250)] @min-[560px]:[--line-width:0.5px]",
          "@min-[560px]:[--wall-right:var(--color-surface-175)]",
        )}
      >
        {PRODUCTS.map((product, i) => (
          <li
            key={product.slug}
            className={cn(
              // One cube: 2 columns wide, a full hexagon tall.
              "relative col-span-2 h-[calc(var(--cell)*2/sqrt(3))]",
              // Neighbouring rows' boxes overlap, so the box ignores the pointer;
              // the cube's faces opt back in and pass clicks up to the link.
              "pointer-events-none",
              // Stagger: push the first cube of each short row one column right.
              // 6 columns: rows of 2-3-2-3-2, so every 5th cube starts a short row.
              "@max-[560px]:nth-[5n+1]:col-start-2",
              // 8 columns: rows of 3-4-3-2, so every 7th cube starts a short row…
              "@min-[560px]:nth-[7n+1]:col-start-2",
              // …and when a full row would hold only the last two cubes, centre them.
              "@min-[560px]:nth-[7n+4]:nth-last-2:col-start-3",
              // State: brighten the floor on hover; outline the cube on keyboard focus.
              "has-hover:[--floor:#fff]",
              "has-focus-visible:z-1 has-focus-visible:[--floor:#fff]",
              "has-focus-visible:[--line:var(--color-accent)] has-focus-visible:[--line-width:1.5px]",
              // The first two cubes use a slightly bluer floor.
              i < 2 && "[--floor:#fdfeff]",
            )}
          >
            <Link
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
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
