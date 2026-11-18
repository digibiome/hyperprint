"use client";

import { useEffect, useRef, useState } from "react";
import Aura from "./aura";
import Papers from "./papers";

/**
 * Aura rings and flying paper, fixed to the viewport. Desktop only; never intercepts pointer events.
 * Scrolling past the top of the hero sends them away.
 */
export default function Decorations() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [away, setAway] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setAway(!entry.isIntersecting));
    observer.observe(sentinel.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Once this scrolls out of view, the decorations leave. */}
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24" />

      <Aura
        data-away={away || undefined}
        className="pointer-events-none fixed top-[-302px] left-1/2 -z-10 hidden w-[1627px] max-w-none -translate-x-1/2 transition-[scale,opacity] duration-700 ease-out motion-safe:animate-aura data-away:scale-50 data-away:opacity-0 md:block"
      />

      <Papers away={away} />
    </>
  );
}
