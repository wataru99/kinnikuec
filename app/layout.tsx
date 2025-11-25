import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import CartSidebar from "./components/CartSidebar";

export const metadata: Metadata = {
  title: "筋肉ショップ - オンラインショップ",
  description: "筋トレをサポートする高品質な商品をご提供",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50">
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
