/**
 * The text half of the button. It drops its border on the side that meets the
 * tile, so the tile's edge is the only divider. Hidden below `md`, where the
 * button is just the tile.
 */
export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid place-items-center border border-surface-600 bg-surface-100 px-3 leading-none tracking-wider text-(--edge) uppercase first:rounded-l-xs first:border-r-0 last:rounded-r-xs last:border-l-0 max-md:hidden">
      {children}
    </span>
  );
}
