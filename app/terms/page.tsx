import Link from "next/link";
import Header from "../components/Header";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← 商品一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">利用規約</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第1条（適用）</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約は、筋肉ショップ（以下「当店」といいます）が提供するサービス（以下「本サービス」といいます）の利用条件を定めるものです。利用者の皆様（以下「お客様」といいます）には、本規約に従って本サービスをご利用いただきます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第2条（利用登録）</h2>
            <p className="text-gray-600 leading-relaxed">
              本サービスにおいては、登録希望者が本規約に同意の上、当店の定める方法によって利用登録を申請し、当店がこれを承認することによって、利用登録が完了するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第3条（禁止事項）</h2>
            <p className="text-gray-600 mb-3">
              お客様は、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">第4条（本サービスの提供の停止等）</h2>
            <p className="text-gray-600 mb-3">
              当店は、以下のいずれかの事由があると判断した場合、お客様に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当店が本サービスの提供が困難と判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第5条（著作権）</h2>
            <p className="text-gray-600 leading-relaxed">
              本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権は、当店または当店にその利用を許諾した権利者に帰属し、お客様は無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます）、伝送、配布、出版、営業使用等をしてはならないものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第6条（免責事項）</h2>
            <p className="text-gray-600 leading-relaxed">
              当店は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。当店は、本サービスに起因してお客様に生じたあらゆる損害について、一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第7条（サービス内容の変更等）</h2>
            <p className="text-gray-600 leading-relaxed">
              当店は、お客様に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってお客様に生じた損害について一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第8条（利用規約の変更）</h2>
            <p className="text-gray-600 leading-relaxed">
              当店は、必要と判断した場合には、お客様に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、当店ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">第9条（準拠法・裁判管轄）</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄とします。
            </p>
          </section>

          <p className="text-gray-500 text-sm pt-4 border-t border-gray-200">
            制定日：2024年1月1日<br />
            最終改定日：2024年1月1日
          </p>
        </div>
      </main>
    </div>
  );
}
