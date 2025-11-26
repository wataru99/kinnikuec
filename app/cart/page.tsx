"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, openCart, getTotalItems } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* サイドバー - 固定 */}
      <div className="hidden lg:block fixed left-0 top-0 h-full bg-gray-50 pl-8 pt-8 z-20">
        <Sidebar />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* モバイルヘッダー */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
            ← 戻る
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-5xl">
          <nav className="mb-8 hidden lg:block">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  商品一覧
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">カート</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">カート</h1>

          {items.length === 0 ? (
            <div className="border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-sm mb-6 tracking-wide">カートは空です</p>
              <Link
                href="/"
                className="inline-block bg-gray-900 text-white px-6 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
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
                    className="border border-gray-200 p-6 flex items-center space-x-4"
                  >
                    {/* 商品画像 */}
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative overflow-hidden">
                      {item.image && item.image !== "/placeholder-product.jpg" ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs tracking-wide">NO IMAGE</span>
                        </div>
                      )}
                    </div>

                    {/* 商品情報 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 mb-1 truncate tracking-wide">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-900 tracking-wide">
                        ¥{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* 数量コントロール */}
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-700 text-sm"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 text-sm text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-700 text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* 小計 */}
                    <div className="text-right">
                      <p className="text-sm text-gray-900 tracking-wide">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* 削除ボタン */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-gray-600 text-xs tracking-wide"
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>

              {/* 注文サマリー */}
              <div className="lg:col-span-1">
                <div className="border border-gray-200 p-6 sticky top-8">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    注文サマリー
                  </h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 tracking-wide">小計（税込）</span>
                      <span className="text-gray-900 tracking-wide">
                        ¥{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 tracking-wide">配送料</span>
                      <span className="text-gray-900 tracking-wide">
                        {shipping === 0 ? (
                          <span className="text-gray-600">無料</span>
                        ) : (
                          `¥${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gray-400 tracking-wide">
                        ¥10,000以上のご購入で送料無料
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-900 tracking-wide">
                        合計
                      </span>
                      <span className="text-lg text-gray-900 tracking-wide">
                        ¥{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-gray-900 text-white text-center px-6 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors mb-3"
                  >
                    レジに進む
                  </Link>

                  <Link
                    href="/"
                    className="block w-full text-center text-gray-500 hover:text-gray-900 text-sm tracking-wide"
                  >
                    買い物を続ける
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
