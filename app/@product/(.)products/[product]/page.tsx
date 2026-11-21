import { notFound } from "next/navigation";
import { getProduct, PRODUCT_SECTION_ID } from "@/lib/products";

/**
 * Intercepts soft navigation to /products/[product] and renders it as a
 * section under the current page.
 */
export default async function ProductSection({ params }: { params: Promise<{ product: string }> }) {
  const product = getProduct((await params).product);
  if (!product) notFound();

  return (
    // Same section as ../../page.tsx, so links can scroll to it either way.
    // scroll-mt clears the sticky header. min-h-svh: the section is the last
    // thing on the page, so without it a short section can't scroll to the top.
    <section id={PRODUCT_SECTION_ID} className="grid min-h-svh scroll-mt-32 content-start gap-4 p-6">
      {/* h2: the hero holds the homepage's h1. */}
      <h2 className="text-2xl font-bold">{product.label.replace("\n", " ")}</h2>
      {/* TODO: product details + quote */}
    </section>
  );
}
