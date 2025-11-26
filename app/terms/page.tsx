"use client";

import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";

export default function TermsPage() {
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
              <li className="text-gray-900">利用規約</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">利用規約</h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第1条（適用）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                本規約は、筋肉ショップ（以下「当店」といいます）が提供するサービス（以下「本サービス」といいます）の利用条件を定めるものです。利用者の皆様（以下「お客様」といいます）には、本規約に従って本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第2条（利用登録）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                本サービスにおいては、登録希望者が本規約に同意の上、当店の定める方法によって利用登録を申請し、当店がこれを承認することによって、利用登録が完了するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第3条（禁止事項）</h2>
              <p className="text-gray-600 text-sm mb-3 tracking-wide">
                お客様は、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当店のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当店のサービスの運営を妨害するおそれのある行為</li>
                <li>他のお客様に関する個人情報等を収集または蓄積する行為</li>
                <li>他のお客様に成りすます行為</li>
                <li>当店のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当店が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第4条（本サービスの提供の停止等）</h2>
              <p className="text-gray-600 text-sm mb-3 tracking-wide">
                当店は、以下のいずれかの事由があると判断した場合、お客様に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 tracking-wide">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当店が本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第5条（著作権）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権は、当店または当店にその利用を許諾した権利者に帰属し、お客様は無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます）、伝送、配布、出版、営業使用等をしてはならないものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第6条（免責事項）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                当店は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。当店は、本サービスに起因してお客様に生じたあらゆる損害について、一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第7条（サービス内容の変更等）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                当店は、お客様に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってお客様に生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第8条（利用規約の変更）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                当店は、必要と判断した場合には、お客様に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、当店ウェブサイトに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">第9条（準拠法・裁判管轄）</h2>
              <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄とします。
              </p>
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
