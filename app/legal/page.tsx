"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function LegalPage() {
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
              <li className="text-gray-900">特定商取引法に基づく表記</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">特定商取引法に基づく表記</h1>

          <div className="border border-gray-200 p-6">
            <table className="w-full">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">販売業者</th>
                  <td className="py-4 text-gray-900 text-sm">株式会社筋肉ショップ</td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">運営責任者</th>
                  <td className="py-4 text-gray-900 text-sm">山田 太郎</td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">所在地</th>
                  <td className="py-4 text-gray-900 text-sm">
                    〒100-0001<br />
                    東京都千代田区マッスル1-2-3<br />
                    プロテインビル 5階
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">電話番号</th>
                  <td className="py-4 text-gray-900 text-sm">
                    03-1234-5678<br />
                    <span className="text-gray-500">受付時間：平日 10:00〜18:00（土日祝休み）</span>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">メールアドレス</th>
                  <td className="py-4 text-gray-900 text-sm">info@kinniku-shop.example.com</td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">販売URL</th>
                  <td className="py-4 text-gray-900 text-sm">https://kinniku-shop.example.com</td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">販売価格</th>
                  <td className="py-4 text-gray-900 text-sm">各商品ページに記載の価格（税抜）</td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">商品代金以外の必要料金</th>
                  <td className="py-4 text-gray-900 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li>消費税（10%）</li>
                      <li>送料：全国一律500円（税込）<br />
                        <span className="text-gray-500">※10,000円以上のご購入で送料無料</span>
                      </li>
                      <li>銀行振込の場合：振込手数料はお客様負担</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">支払方法</th>
                  <td className="py-4 text-gray-900 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li>クレジットカード（VISA、MasterCard、JCB、American Express）</li>
                      <li>銀行振込</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">支払期限</th>
                  <td className="py-4 text-gray-900 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li>クレジットカード：ご注文時に決済</li>
                      <li>銀行振込：ご注文日から7日以内</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">引渡し時期</th>
                  <td className="py-4 text-gray-900 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li>クレジットカード：ご注文確定後1〜3営業日以内に発送</li>
                      <li>銀行振込：ご入金確認後1〜3営業日以内に発送</li>
                    </ul>
                    <p className="text-gray-500 mt-2">
                      ※離島・一部地域は追加日数がかかる場合があります
                    </p>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">返品・交換</th>
                  <td className="py-4 text-gray-900 text-sm">
                    <p className="mb-2 font-medium">【お客様都合の場合】</p>
                    <p className="text-gray-600 mb-3">商品の性質上、お客様都合による返品・交換はお受けできません。</p>
                    <p className="mb-2 font-medium">【不良品・誤配送の場合】</p>
                    <p className="text-gray-600">
                      商品到着後7日以内にご連絡ください。<br />
                      当店負担にて交換または返金いたします。
                    </p>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-40 align-top">返品送料</th>
                  <td className="py-4 text-gray-900 text-sm">
                    不良品・誤配送の場合は当店負担。<br />
                    お客様都合の場合はお客様負担。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
