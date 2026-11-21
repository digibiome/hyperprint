"use client";

import Link from "next/link";
import { PRODUCT_SECTION_ID } from "@/lib/products";

/**
 * Honeycomb link to a product. Also scrolls to the product section, since
 * reopening the current product doesn't re-render it.
 */
export default function ProductLink(props: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      scroll={false}
      onNavigate={(e) => {
        props.onNavigate?.(e);
        document.getElementById(PRODUCT_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    />
  );
}
