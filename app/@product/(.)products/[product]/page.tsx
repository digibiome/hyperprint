import { notFound } from "next/navigation";
import Product from "@/components/product";
import { getProduct } from "@/lib/products";
import Section from "../../_components/section";

/**
 * Intercepts soft navigation to /products/[product] and renders it as a
 * section under the current page.
 */
export default async function ProductSection({ params }: { params: Promise<{ product: string }> }) {
  const product = getProduct((await params).product);
  if (!product) notFound();

  return (
    <Section slug={product.slug}>
      <Product product={product} />
    </Section>
  );
}
