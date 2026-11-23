import { notFound } from "next/navigation";
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
    <main className="grid gap-4 p-6">
      <h1 className="text-2xl font-bold">{product.label.replace("\n", " ")}</h1>
      {/* TODO: product details + quote */}
    </main>
  );
}
