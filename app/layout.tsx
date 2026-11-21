import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Hyperprint — Instant print quote",
  description:
    "Get an instant quote for flyers, name cards, stickers, banners, booklets and more.",
};

/**
 * `modal` and `product` are parallel-route slots (app/@modal, app/@product).
 * They're empty unless a soft navigation is intercepted:
 *   /account/login, /order/bag → @modal renders them in a dialog over the current page
 *   /products/[product] → @product renders it as a section under the current page
 * A refresh or shared link skips interception and renders the full page instead.
 */
export default function RootLayout({ children, modal, product }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ubuntu.variable} antialiased`}>
      <body className="grid min-h-svh font-sans">
        {children}
        {product}
        {modal}
      </body>
    </html>
  );
}
