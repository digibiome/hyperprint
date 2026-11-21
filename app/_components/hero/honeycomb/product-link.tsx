"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCT_SECTION_ID } from "@/lib/products";

/**
 * Honeycomb link to a product. The product section scrolls itself into view
 * when it changes; clicking the product that's already open is a same-URL
 * navigation that changes nothing, so scroll to the section by hand instead.
 */
export default function ProductLink({ href, onClick, ...props }: React.ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href={href}
      // The section handles scrolling; Next's own scroll only nudges it into the viewport.
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        const section = document.getElementById(PRODUCT_SECTION_ID);
        if (pathname === href && section) {
          e.preventDefault();
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    />
  );
}
