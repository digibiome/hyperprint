import type { Product as ProductData } from "@/lib/products";

/**
 * Product content. Rendered by the `/products/[product]` page and by the `@product`
 * slot as a section on the homepage.
 */
export default function Product({ product }: { product: ProductData }) {
  return (
    <section className="grid gap-4 p-6">
      <h1 className="text-2xl font-bold">{product.label.replace("\n", " ")}</h1>
      {/* TODO: product details + quote */}
    </section>
  );
}
