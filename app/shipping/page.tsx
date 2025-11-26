"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function ShippingPage() {
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
              <li className="text-gray-900">発送について</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">発送について</h1>

          <div className="space-y-8">
            <section className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">配送料金</h2>
              <div className="bg-gray-50 p-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">全国一律</td>
                      <td className="py-3 text-gray-900 font-medium text-right">500円（税込）</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">10,000円以上お買い上げ</td>
                      <td className="py-3 text-gray-600 font-medium text-right">送料無料</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">配送業者</h2>
              <p className="text-gray-600 text-sm tracking-wide">
                ヤマト運輸、佐川急便、日本郵便のいずれかでお届けいたします。<br />
                配送業者の指定はできかねますので、あらかじめご了承ください。
              </p>
            </section>

            <section className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">お届け日数</h2>
              <div className="bg-gray-50 p-4 mb-3">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">クレジットカード決済</td>
                      <td className="py-3 text-gray-900 text-right">ご注文から1〜3営業日で発送</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">銀行振込</td>
                      <td className="py-3 text-gray-900 text-right">ご入金確認後1〜3営業日で発送</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 text-xs tracking-wide">
                ※ 土日祝日は発送業務をお休みしております。<br />
                ※ 離島・一部地域は追加日数がかかる場合があります。
              </p>
            </section>

            <section className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">お届け時間帯の指定</h2>
              <p className="text-gray-600 text-sm mb-3 tracking-wide">
                以下の時間帯からお選びいただけます。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 tracking-wide">
                <li>午前中</li>
                <li>14:00〜16:00</li>
                <li>16:00〜18:00</li>
                <li>18:00〜20:00</li>
                <li>19:00〜21:00</li>
              </ul>
            </section>

            <section className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">不在時の対応</h2>
              <p className="text-gray-600 text-sm tracking-wide">
                ご不在の場合は、不在票が投函されます。<br />
                不在票に記載された連絡先にご連絡いただき、再配達のお手続きをお願いいたします。<br />
                保管期間を過ぎた場合は、当店へ返送されますのでご注意ください。
              </p>
            </section>

            <section className="border border-gray-200 p-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">配送先の変更</h2>
              <p className="text-gray-600 text-sm tracking-wide">
                発送前であれば配送先の変更が可能です。<br />
                お早めにお問い合わせフォームまたはお電話にてご連絡ください。<br />
                発送後の変更は、配送業者へ直接ご連絡ください。
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
