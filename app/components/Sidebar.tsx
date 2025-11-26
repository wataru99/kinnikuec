"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { openCart, getTotalItems } = useCart();

  const footerLinks = [
    { href: "/shipping", label: "発送について" },
    { href: "/returns", label: "返品・交換" },
    { href: "/contact", label: "お問い合わせ" },
    { href: "/terms", label: "利用規約" },
    { href: "/privacy", label: "プライバシーポリシー" },
    { href: "/legal", label: "特定商取引法" },
    { href: "/company", label: "会社概要" },
  ];

  return (
    <aside className="w-48 space-y-8">
      {/* ロゴ */}
      <div className="mb-8">
        <Link href="/" className="text-lg font-light text-gray-900 tracking-widest">
          筋肉ショップ
        </Link>
      </div>

      {/* ホーム */}
      <div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="tracking-wide">ホーム</span>
        </Link>
      </div>

      {/* カート */}
      <div>
        <button
          onClick={openCart}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="tracking-wide">カート</span>
          {getTotalItems() > 0 && (
            <span className="bg-gray-900 text-white text-xs px-1.5 py-0.5 min-w-[20px] text-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* 商品一覧 */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">商品一覧</h3>
        <div className="space-y-0.5">
          <Link
            href="/"
            className="block px-3 py-2 text-sm transition-all duration-200 border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            全て
          </Link>
          <Link
            href="/?category=supplement"
            className="block px-3 py-2 text-sm transition-all duration-200 border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            サプリメント
          </Link>
          <Link
            href="/?category=equipment"
            className="block px-3 py-2 text-sm transition-all duration-200 border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            トレーニング器具
          </Link>
          <Link
            href="/?category=wear"
            className="block px-3 py-2 text-sm transition-all duration-200 border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            ウェア
          </Link>
          <Link
            href="/?category=accessories"
            className="block px-3 py-2 text-sm transition-all duration-200 border-l-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            アクセサリー
          </Link>
        </div>
      </div>

      {/* フッターリンク */}
      <div className="pt-8 border-t border-gray-200">
        <div className="space-y-2 text-xs text-gray-400">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block hover:text-gray-600 ${pathname === link.href ? "text-gray-600" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
