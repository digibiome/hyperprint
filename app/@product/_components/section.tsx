"use client";

import { useEffect, useRef } from "react";
import { PRODUCT_SECTION_ID } from "@/lib/products";

/**
 * Wraps the product section and scrolls it into view whenever the product
 * changes. Keyed on `slug`, not the URL, so opening/closing a modal over it
 * doesn't yank the page back down here.
 */
export default function Section({ slug, children }: { slug: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  return (
    // scroll-mt clears the sticky header. min-h-svh: the section is the last
    // thing on the page, so without it a short section can't scroll to the top.
    <div ref={ref} id={PRODUCT_SECTION_ID} className="min-h-svh scroll-mt-32">
      {children}
    </div>
  );
}
