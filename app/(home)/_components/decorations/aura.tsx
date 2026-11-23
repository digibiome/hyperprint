const SIZE = { width: 1627, height: 1626 };
const CENTRE = { x: 813.9, y: 813.4 };
const RADII = [60, 124, 220, 407, 595, 812];

/** Dash lengths to pick from; gaps are drawn from a wider spread so the rhythm keeps changing. */
const DASHES = [4, 4, 6, 6, 12, 24];

/** Seeded PRNG (mulberry32), so server and client render the same rings. */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Each ring gets its own irregular dash pattern and starting angle. An odd number of values
 * makes the pattern swap dashes and gaps on every repeat, doubling how long it runs before recurring.
 */
const RINGS = RADII.map((r, i) => {
  const rand = random(i + 1);
  const pattern = Array.from({ length: 15 }, (_, j) =>
    j % 2 === 0 ? DASHES[Math.floor(rand() * DASHES.length)] : Math.round(4 + rand() * 26),
  );
  return { r, dasharray: pattern.join(" "), rotate: Math.round(rand() * 360) };
});

/** Concentric dashed rings behind the hero. */
export default function Aura(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width={SIZE.width}
      height={SIZE.height}
      viewBox={`0 0 ${SIZE.width} ${SIZE.height}`}
      fill="none"
      stroke="#AAA8A4"
      strokeWidth={0.5}
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      {RINGS.map(({ r, dasharray, rotate }) => (
        <circle
          key={r}
          cx={CENTRE.x}
          cy={CENTRE.y}
          r={r}
          strokeDasharray={dasharray}
          transform={`rotate(${rotate} ${CENTRE.x} ${CENTRE.y})`}
        />
      ))}
    </svg>
  );
}
