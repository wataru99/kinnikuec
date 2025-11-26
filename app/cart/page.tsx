"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex-1 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          ショッピングカート
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">カートは空です</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              商品を探す
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* カート商品リスト */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
                >
                  {/* 商品画像 */}
                  <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 relative overflow-hidden">
                    {item.image && item.image !== "/placeholder-product.jpg" ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">商品画像</span>
                      </div>
                    )}
                  </div>

                  {/* 商品情報 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600">
                      ¥{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* 数量コントロール */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700"
                    >
                      +
                    </button>
                  </div>

                  {/* 小計 */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* 削除ボタン */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  注文サマリー
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">小計（税込）</span>
                    <span className="font-medium text-gray-900">
                      ¥{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">配送料</span>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">無料</span>
                      ) : (
                        `¥${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      ¥10,000以上のご購入で送料無料
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      合計
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ¥{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 font-medium mb-3"
                >
                  レジに進む
                </Link>

                <Link
                  href="/"
                  className="block w-full text-center text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  買い物を続ける
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
