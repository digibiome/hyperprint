"use client";

import { useEffect, useState } from "react";
import Aura from "./aura";
import Papers from "./papers";

/**
 * Aura rings and flying paper, fixed to the viewport. Desktop only; never intercepts pointer events.
 * They leave once the bottom of the element with id `leaveAfter` scrolls above the bottom of the viewport.
 */
export default function Decorations({ leaveAfter }: { leaveAfter: string }) {
  const [away, setAway] = useState(false);

  useEffect(() => {
    // Shrink the root to a line along the viewport's bottom edge: the target intersects it
    // while it spans that edge, and once it stops, it's either still below or already past.
    const observer = new IntersectionObserver(
      ([entry]) => setAway(!entry.isIntersecting && entry.boundingClientRect.top < innerHeight),
      { rootMargin: "-100% 0px 0px 0px" },
    );
    observer.observe(document.getElementById(leaveAfter)!);
    return () => observer.disconnect();
  }, [leaveAfter]);

  return (
    <>
      <Aura
        data-away={away || undefined}
        className="pointer-events-none fixed top-[-302px] left-1/2 -z-10 hidden w-[1627px] max-w-none -translate-x-1/2 transition-[scale,opacity] duration-700 ease-out motion-safe:animate-aura data-away:scale-50 data-away:opacity-0 md:block"
      />

      <Papers away={away} />
    </>
  );
}
