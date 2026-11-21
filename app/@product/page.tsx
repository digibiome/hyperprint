import { PRODUCT_SECTION_ID, PRODUCTS } from "@/lib/products";

/**
 * `/`: show the first product until another is picked, so the section is
 * always there for honeycomb links to scroll to.
 */
export default function DefaultProduct() {
  const product = PRODUCTS[0];

  return (
    // Same section as (.)products/[product]/page.tsx, so links can scroll to it either way.
    <section id={PRODUCT_SECTION_ID} className="grid min-h-svh scroll-mt-32 content-start gap-4 p-6">
      <h2 className="text-2xl font-bold">{product.label.replace("\n", " ")}</h2>
      {/* TODO: product details + quote */}
    </section>
  );
}
