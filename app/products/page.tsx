import { redirect } from "next/navigation";

/** There's no products listing: the homepage's honeycomb is the catalogue. */
export default function ProductsPage() {
  redirect("/");
}
