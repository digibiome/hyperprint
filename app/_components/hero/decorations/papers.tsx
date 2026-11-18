import { useEffect, useRef } from "react";
import Paper from "./paper";

/** Point the papers fly away from, in vw/vh. */
const ORIGIN = { x: 50, y: 75 };

/** How far each paper drifts outward when sent away, as a share of its offset from `ORIGIN`. */
const AWAY = 0.4;

/** Cursor hits: share of each paper's box trimmed off every side, and time before it drifts back (ms). */
const HIT_INSET = 0.15;
const HIT_RETURN_MS = 2500;

/**
 * When a paper shows, so cramped screens aren't crowded. Papers sitting beside the honeycomb
 * start covering its tiles as the screen narrows (or, low ones, as it gets shorter).
 */
const SHOW = {
  always: "",
  wide: "hidden xl:block", // ≥1280px
  wider: "hidden min-[1400px]:block",
  widerAndTall: "hidden min-[1400px]:[@media(min-height:800px)]:block",
};

/**
 * Flying papers, positioned as a share of the viewport (designed at 1440×900).
 * `shape` picks the outline from `Paper`; `depth` is the cursor parallax range in px: higher drifts more.
 */
const PAPERS = [
  { shape: 0, width: 218, height: 143, left: 4, top: 12, depth: 18, show: SHOW.always },
  { shape: 1, width: 124, height: 97, left: 8, top: 56, depth: 10, show: SHOW.wide },
  { shape: 2, width: 138, height: 87, left: 22, top: 66, depth: 14, show: SHOW.widerAndTall },
  { shape: 3, width: 109, height: 123, left: 16, top: 38, depth: 8, show: SHOW.wide },
  { shape: 4, width: 172, height: 197, left: 25, top: -5, depth: 22, show: SHOW.always },
  { shape: 5, width: 93, height: 120, left: 60, top: 5, depth: 12, show: SHOW.always },
  { shape: 6, width: 174, height: 175, left: 70, top: 26, depth: 20, show: SHOW.wide },
  { shape: 7, width: 101, height: 116, left: 73, top: 56, depth: 9, show: SHOW.wider },
  { shape: 8, width: 98, height: 139, left: 89, top: 23, depth: 15, show: SHOW.always },
].map((p) => {
  const centreX = p.left + (p.width / 1440) * 50;
  const centreY = p.top + (p.height / 900) * 50;
  return {
    ...p,
    style: {
      left: `${p.left}%`,
      top: `${p.top}%`,
      "--depth": `${p.depth}px`,
      "--away-x": `${((centreX - ORIGIN.x) * AWAY).toFixed(1)}vw`,
      "--away-y": `${((centreY - ORIGIN.y) * AWAY).toFixed(1)}vh`,
    } as React.CSSProperties,
  };
});

/**
 * The flying papers. They drift with the cursor and get knocked away when it touches them,
 * while staying click-through. `away` sends them all off (the hero has scrolled past).
 */
export default function Papers({ away }: { away: boolean }) {
  const papers = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = papers.current!;
    const timers = new Set<number>();
    let frame = 0;

    /** Papers stay click-through, so hits are tested against their boxes, trimmed toward the paper shape. */
    const hitTest = (x: number, y: number) => {
      if (el.hasAttribute("data-away")) return;
      for (const paper of el.children as HTMLCollectionOf<SVGSVGElement>) {
        if (paper.hasAttribute("data-hit")) continue;
        const r = paper.getBoundingClientRect();
        if (!r.width) continue; // hidden at this screen size
        const insetX = r.width * HIT_INSET;
        const insetY = r.height * HIT_INSET;
        if (x < r.left + insetX || x > r.right - insetX || y < r.top + insetY || y > r.bottom - insetY) continue;

        // Leaves the same way it does on scroll.
        paper.setAttribute("data-hit", "");

        const timer = window.setTimeout(() => {
          timers.delete(timer);
          paper.removeAttribute("data-hit");
        }, HIT_RETURN_MS);
        timers.add(timer);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
        hitTest(e.clientX, e.clientY);
      });
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={papers}
      data-away={away || undefined}
      className="group pointer-events-none fixed inset-0 z-40 hidden md:block"
    >
      {PAPERS.map(({ shape, width, height, style, show }) => (
        <Paper
          key={shape}
          shape={shape}
          width={width}
          height={height}
          style={style}
          className={`absolute max-w-none transition-[translate,transform,opacity] duration-700 ease-out group-data-away:opacity-0 data-hit:opacity-0 data-hit:ease-paper-hit motion-safe:[translate:calc(var(--mx,0)*var(--depth))_calc(var(--my,0)*var(--depth))] motion-safe:group-data-away:[transform:translate(var(--away-x),var(--away-y))] motion-safe:data-hit:[transform:translate(var(--away-x),var(--away-y))] ${show}`}
        />
      ))}
    </div>
  );
}
