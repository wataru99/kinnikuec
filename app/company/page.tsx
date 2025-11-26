"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function CompanyPage() {
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
              <li className="text-gray-900">会社概要</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">会社概要</h1>

          <div className="space-y-8">
            <div className="border border-gray-200 p-6">
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">会社名</th>
                    <td className="py-4 text-gray-900 text-sm">株式会社筋肉ショップ</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">代表者</th>
                    <td className="py-4 text-gray-900 text-sm">代表取締役 山田 太郎</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">設立</th>
                    <td className="py-4 text-gray-900 text-sm">2020年4月1日</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">資本金</th>
                    <td className="py-4 text-gray-900 text-sm">1,000万円</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">所在地</th>
                    <td className="py-4 text-gray-900 text-sm">
                      〒100-0001<br />
                      東京都千代田区マッスル1-2-3<br />
                      プロテインビル 5階
                    </td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">電話番号</th>
                    <td className="py-4 text-gray-900 text-sm">03-1234-5678</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">FAX</th>
                    <td className="py-4 text-gray-900 text-sm">03-1234-5679</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">メール</th>
                    <td className="py-4 text-gray-900 text-sm">info@kinniku-shop.example.com</td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">事業内容</th>
                    <td className="py-4 text-gray-900 text-sm">
                      <ul className="list-disc list-inside space-y-1">
                        <li>スポーツサプリメントの販売</li>
                        <li>トレーニング器具の販売</li>
                        <li>フィットネス関連商品の企画・開発</li>
                        <li>健康・栄養に関する情報発信</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-32 align-top">取引銀行</th>
                    <td className="py-4 text-gray-900 text-sm">筋肉銀行 マッスル支店</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">企業理念</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                「すべての人に、最高のトレーニング体験を」<br /><br />
                私たちは、高品質なサプリメントとトレーニング器具を通じて、お客様の健康的なライフスタイルをサポートします。科学的根拠に基づいた製品選定と、お客様第一のサービスで、フィットネスの喜びをお届けします。
              </p>
            </div>

            <div className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">アクセス</h2>
              <div className="bg-gray-100 h-48 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-sm tracking-wide">地図（準備中）</span>
              </div>
              <p className="text-gray-500 text-sm tracking-wide">
                東京メトロ千代田線「マッスル駅」A1出口より徒歩3分<br />
                JR「プロテイン駅」東口より徒歩7分
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
