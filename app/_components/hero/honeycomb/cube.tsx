/**
 * Design size of one cube, in px: a pointy-top hexagon 200 tall, so √3/2 × 200
 * (≈ 173.205) wide. Product SVGs in /public/hero/products share this artboard.
 */
export const CELL_H = 200;
export const CELL_W = (CELL_H * Math.sqrt(3)) / 2;

// Hexagon landmarks: the vertical centre line, and the side corners at ¼ and ¾ height.
const MID = CELL_W / 2;
const Q1 = CELL_H / 4;
const Q3 = (CELL_H * 3) / 4;
const CENTRE = CELL_H / 2;

/**
 * The three visible inner faces of a cube, drawn in the cube's design box.
 *
 * Colours come from custom properties set by the honeycomb (--wall-left,
 * --wall-right, --floor, --line, --line-width), so the grid can restyle every
 * cube per breakpoint, per cell and per hover/focus state.
 */
export default function Cube() {
  return (
    <svg
      className="absolute inset-0 size-full overflow-visible stroke-(--line) stroke-(length:--line-width)"
      viewBox={`0 0 ${CELL_W} ${CELL_H}`}
      preserveAspectRatio="none"
      strokeLinejoin="round"
      aria-hidden
    >
      {/*
        vector-effect doesn't inherit, so each face keeps its stroke unscaled itself.
        pointer-events: the cells' boxes overlap and ignore the pointer, so the
        faces opt back in; together they cover exactly the hexagon.
      */}
      <polygon
        className="fill-(--wall-left)"
        vectorEffect="non-scaling-stroke"
        pointerEvents="auto"
        points={`0,${Q1} ${MID},0 ${MID},${CENTRE} 0,${Q3}`}
      />
      <polygon
        className="fill-(--wall-right)"
        vectorEffect="non-scaling-stroke"
        pointerEvents="auto"
        points={`${MID},0 ${CELL_W},${Q1} ${CELL_W},${Q3} ${MID},${CENTRE}`}
      />
      <polygon
        className="fill-(--floor) transition-[fill] duration-200 ease-[ease]"
        vectorEffect="non-scaling-stroke"
        pointerEvents="auto"
        points={`${MID},${CENTRE} ${CELL_W},${Q3} ${MID},${CELL_H} 0,${Q3}`}
      />
    </svg>
  );
}
