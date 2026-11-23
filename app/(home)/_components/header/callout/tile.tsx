/**
 * The coloured icon tile with its speech-bubble tail. Corners and tail follow
 * its place in the button: first rounds left with the tail on the left, last
 * rounds right with the tail mirrored on the right. Below `md` it stands alone,
 * so it rounds all corners.
 */
export default function Tile({ children }: { children: React.ReactNode }) {
  return (
    <span className="group/tile relative grid w-10 place-items-center border border-(--edge) bg-(--tile) first:rounded-l-xs last:rounded-r-xs max-md:rounded-xs">
      <svg
        aria-hidden
        viewBox="0 0 12 8"
        className="absolute -top-1.75 h-2 w-3 overflow-visible group-first/tile:left-2 group-last/tile:right-2 group-last/tile:-scale-x-100"
      >
        <path
          d="M3.1625 0.8289L11.763 6.9722C11.9117 7.0784 12 7.2499 12 7.4327C12 7.7452 11.7466 7.9986 11.4341 7.9986H0.8571C0.3838 7.9986 0 7.6148 0 7.1414V2.4564C0 0.8296 1.8387 -0.1166 3.1625 0.8289Z"
          className="fill-(--tile)"
        />
        <path
          d="M12 7.1414L3.1625 0.8289C1.8387 -0.1166 0 0.8296 0 2.4564V7.1414"
          fill="none"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="stroke-(--edge)"
        />
      </svg>
      {children}
    </span>
  );
}
