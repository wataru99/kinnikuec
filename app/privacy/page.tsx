"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function PrivacyPage() {
  const { openCart, getTotalItems } = useCart();

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
              <li className="text-gray-900">プライバシーポリシー</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">プライバシーポリシー</h1>

          <div className="space-y-12">
            <section>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                筋肉ショップ（以下「当店」といいます）は、お客様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーに基づき、適切な取り扱いと保護に努めます。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">1. 個人情報の定義</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                個人情報とは、氏名、住所、電話番号、メールアドレスなど、特定の個人を識別できる情報をいいます。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">2. 個人情報の収集</h2>
              <p className="text-gray-600 text-sm mb-3 tracking-wide">
                当店は、以下の目的で個人情報を収集することがあります。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>商品のご注文・配送</li>
                <li>お問い合わせへの対応</li>
                <li>新商品・キャンペーン情報のお知らせ（ご同意いただいた場合のみ）</li>
                <li>サービス向上のための分析</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">3. 個人情報の利用目的</h2>
              <p className="text-gray-600 text-sm mb-3 tracking-wide">
                収集した個人情報は、以下の目的で利用いたします。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>ご注文いただいた商品の発送</li>
                <li>ご注文内容の確認、お支払いに関するご連絡</li>
                <li>お問い合わせへの回答</li>
                <li>重要なお知らせの送付</li>
                <li>メールマガジンの配信（ご希望の方のみ）</li>
                <li>サービスの改善・新サービスの開発</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">4. 個人情報の第三者提供</h2>
              <p className="text-gray-600 text-sm mb-3 tracking-wide">
                当店は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要な場合</li>
                <li>配送業者等、業務委託先に必要な範囲で提供する場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">5. 個人情報の管理</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                当店は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス、紛失、破壊、改ざん、漏洩などを防止するため、適切なセキュリティ対策を講じます。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">6. Cookieの使用</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                当店のウェブサイトでは、サービス向上のためCookieを使用しています。Cookieはお客様のブラウザの設定により無効にすることができますが、一部のサービスがご利用いただけなくなる場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">7. 個人情報の開示・訂正・削除</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                お客様ご自身の個人情報について、開示・訂正・削除をご希望の場合は、お問い合わせフォームよりご連絡ください。本人確認の上、対応いたします。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">8. プライバシーポリシーの変更</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                当店は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">9. お問い合わせ窓口</h2>
              <p className="text-gray-600 text-sm mb-4 tracking-wide">
                個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
              </p>
              <div className="border border-gray-200 p-4 text-sm text-gray-600 tracking-wide">
                <p>筋肉ショップ 個人情報お問い合わせ窓口</p>
                <p>メール: privacy@kinniku-shop.example.com</p>
                <p>電話: 03-1234-5678（平日 10:00〜18:00）</p>
              </div>
            </section>

            <p className="text-gray-400 text-xs pt-8 border-t border-gray-200 tracking-wide">
              制定日：2024年1月1日<br />
              最終改定日：2024年1月1日
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
