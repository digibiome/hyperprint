import Link from "next/link";
import { cn } from "@/lib/cn";
import Label from "./label";
import Tile from "./tile";

/**
 * Header link button: a `Callout.Tile` and a `Callout.Label`, in whichever
 * order they should appear. Colours come from `--tile` and `--edge`, set via
 * `className` (e.g. `[--tile:#f09700] [--edge:#372005]`).
 *
 * Below `md` the label hides, leaving just the tile.
 */
function Callout({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn("grid h-9 grid-flow-col rounded-xs shadow-tile", className)}
    >
      {children}
    </Link>
  );
}

Callout.Tile = Tile;
Callout.Label = Label;

export default Callout;
