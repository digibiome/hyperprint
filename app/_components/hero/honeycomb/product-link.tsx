"use client";

import Link from "next/link";
import { PRODUCT_SECTION_ID } from "@/lib/products";

/**
 * Honeycomb link to a product. Scrolls to the product section, which is
 * always on the homepage, as the navigation starts; the new product then
 * swaps in where the section already is.
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
