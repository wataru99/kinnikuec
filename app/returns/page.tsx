"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function ReturnsPage() {
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
              <li className="text-gray-900">返品・交換について</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">返品・交換について</h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">返品・交換の条件</h2>
              <div className="border border-gray-200 p-4">
                <p className="text-gray-600 text-sm tracking-wide">
                  商品到着後7日以内にご連絡ください。<br />
                  期限を過ぎた場合は、返品・交換をお受けできません。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">返品・交換が可能な場合</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>商品に破損・汚損があった場合</li>
                <li>ご注文と異なる商品が届いた場合</li>
                <li>商品の数量が不足していた場合</li>
              </ul>
              <p className="text-gray-400 text-xs mt-4 tracking-wide">
                ※ 上記の場合、送料は当店負担にて交換または返金いたします。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">返品・交換ができない場合</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>お客様のご都合による返品・交換（イメージ違い、サイズ違いなど）</li>
                <li>一度開封・使用された商品</li>
                <li>サプリメント等の食品類（未開封でも衛生上の理由により不可）</li>
                <li>商品到着後7日を過ぎた商品</li>
                <li>セール品・アウトレット品</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">返品・交換の手順</h2>
              <ol className="list-decimal list-inside text-gray-600 text-sm space-y-4 tracking-wide">
                <li>
                  <span className="font-medium text-gray-900">お問い合わせフォームからご連絡</span>
                  <p className="text-sm mt-1 ml-5 text-gray-500">注文番号、商品名、返品・交換の理由をお知らせください。</p>
                </li>
                <li>
                  <span className="font-medium text-gray-900">当店からの返信をお待ちください</span>
                  <p className="text-sm mt-1 ml-5 text-gray-500">返送先住所と返送方法をご案内いたします。</p>
                </li>
                <li>
                  <span className="font-medium text-gray-900">商品を返送</span>
                  <p className="text-sm mt-1 ml-5 text-gray-500">案内に従って商品をご返送ください。</p>
                </li>
                <li>
                  <span className="font-medium text-gray-900">商品確認後、交換品発送または返金</span>
                  <p className="text-sm mt-1 ml-5 text-gray-500">商品到着後、3営業日以内に対応いたします。</p>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">返金方法</h2>
              <p className="text-gray-600 text-sm tracking-wide leading-relaxed">
                クレジットカードでお支払いの場合は、カード会社経由で返金いたします。<br />
                銀行振込でお支払いの場合は、ご指定の口座へ返金いたします。<br />
                返金までに2週間程度かかる場合がございます。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">お問い合わせ</h2>
              <p className="text-gray-600 text-sm mb-4 tracking-wide">
                返品・交換に関するご質問は、お問い合わせフォームよりご連絡ください。
              </p>
              <Link
                href="/contact"
                className="inline-block bg-gray-900 text-white px-6 py-2 text-sm tracking-wider hover:bg-gray-800 transition-colors"
              >
                お問い合わせフォームへ
              </Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
