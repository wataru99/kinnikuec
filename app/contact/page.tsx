"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function ContactPage() {
  const { openCart, getTotalItems } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-3xl">
          <nav className="mb-8 hidden lg:block">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  商品一覧
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">お問い合わせ</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">お問い合わせ</h1>

          {submitted ? (
            <div className="border border-gray-200 p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg text-gray-900 mb-2 tracking-wide">お問い合わせを受け付けました</h2>
              <p className="text-gray-500 text-sm mb-6 tracking-wide">
                内容を確認の上、2営業日以内にご連絡いたします。
              </p>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 tracking-wide">
                ← 商品一覧に戻る
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <p className="text-gray-500 text-sm tracking-wide">
                ご質問・ご要望がございましたら、下記フォームよりお問い合わせください。<br />
                通常2営業日以内にご返信いたします。
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    お名前 <span className="text-gray-900">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    メールアドレス <span className="text-gray-900">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    注文番号（お持ちの場合）
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="例: ORD1234567"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    お問い合わせ種別 <span className="text-gray-900">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
                  >
                    <option value="">選択してください</option>
                    <option value="product">商品について</option>
                    <option value="order">注文について</option>
                    <option value="shipping">配送について</option>
                    <option value="return">返品・交換について</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    お問い合わせ内容 <span className="text-gray-900">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
                >
                  送信する
                </button>
              </form>

              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">お電話でのお問い合わせ</h3>
                <p className="text-gray-600 text-sm tracking-wide">
                  TEL: 03-1234-5678<br />
                  受付時間: 平日 10:00〜18:00（土日祝休み）
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
