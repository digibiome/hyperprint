import styles from "./honeycomb.module.css";

/** Design size of one cube, in px. Art positions in honeycomb.tsx are measured against it. */
export const CELL_W = 173.205;
export const CELL_H = 200;

/** The three visible inner faces of a cube, drawn in the cube's design box. */
export default function Cube() {
  return (
    <svg
      className={styles.cube}
      viewBox={`0 0 ${CELL_W} ${CELL_H}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polygon className={styles.wallLeft} points="0,50 86.6025,0 86.6025,100 0,150" />
      <polygon
        className={styles.wallRight}
        points="86.6025,0 173.205,50 173.205,150 86.6025,100"
      />
      <polygon
        className={styles.floor}
        points="86.6025,100 173.205,150 86.6025,200 0,150"
      />
    </svg>
  );
}
