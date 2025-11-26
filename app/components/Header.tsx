"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { openCart, getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900">
            筋肉ショップ
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              商品一覧
            </Link>
            <button
              onClick={openCart}
              className="relative text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              カート
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* モバイル: カートアイコン + ハンバーガー */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* カートアイコン */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* ハンバーガーメニュー */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="space-y-3">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                商品一覧
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                カートを見る
              </Link>
              <hr className="border-gray-200" />
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                お問い合わせ
              </Link>
              <Link
                href="/shipping"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                発送について
              </Link>
              <Link
                href="/returns"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                返品・交換
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                利用規約
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/company"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                会社概要
              </Link>
              <Link
                href="/legal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-blue-600 text-sm"
              >
                特定商取引法に基づく表記
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
