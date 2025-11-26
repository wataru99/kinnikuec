"use client";

import { useCart } from "./CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* サイドバー */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-50 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <h2 className="text-sm text-gray-900 tracking-wide">
              カート ({getTotalItems()}点)
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* カート内容 */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg
                  className="w-12 h-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-sm tracking-wide mb-4">カートは空です</p>
                <button
                  onClick={closeCart}
                  className="text-sm text-gray-500 hover:text-gray-900 tracking-wide"
                >
                  買い物を続ける
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 border-b border-gray-200 pb-6"
                  >
                    {/* 商品画像 */}
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 relative overflow-hidden">
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
                      <h3 className="text-sm text-gray-900 line-clamp-2 tracking-wide mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-900 tracking-wide">
                        ¥{item.price.toLocaleString()}
                      </p>

                      {/* 数量調整 */}
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 border border-gray-300 hover:bg-gray-100 text-gray-600 text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 border border-gray-300 hover:bg-gray-100 text-gray-600 text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-gray-400 hover:text-gray-600 text-xs tracking-wide"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* フッター */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500 tracking-wide">小計</span>
                <span className="text-lg text-gray-900 tracking-wide">
                  ¥{getTotalPrice().toLocaleString()}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-gray-900 text-white py-3 text-center text-sm tracking-wider hover:bg-gray-800 transition-colors mb-3"
              >
                レジに進む
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full border border-gray-300 text-gray-700 py-3 text-center text-sm tracking-wider hover:bg-gray-50 transition-colors"
              >
                カートを見る
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
