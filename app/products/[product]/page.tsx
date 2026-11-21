import { notFound } from "next/navigation";
import Product from "@/components/product";
import { getProduct, PRODUCTS } from "@/lib/products";

/**
 * Prebuild every product. Unknown slugs 404 via `notFound()` below.
 * (Not `dynamicParams = false`: in Next 16.2 dev it broke the @product
 * interception — "Invalid interception route: /(.)(.)flyer". Prod was fine.)
 */
export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ product: slug }));
}

export default async function ProductPage({ params }: PageProps<"/products/[product]">) {
  const product = getProduct((await params).product);
  if (!product) notFound();

  return (
    <main className="grid">
      <Product product={product} />
    </main>
  );
}
