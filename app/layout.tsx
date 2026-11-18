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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} antialiased`}>
      <body className="grid min-h-svh font-sans">{children}</body>
    </html>
  );
}
