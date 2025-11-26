import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex-1 w-full">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← 商品一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          <section>
            <p className="text-gray-600 leading-relaxed">
              筋肉ショップ（以下「当店」といいます）は、お客様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーに基づき、適切な取り扱いと保護に努めます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">1. 個人情報の定義</h2>
            <p className="text-gray-600 leading-relaxed">
              個人情報とは、氏名、住所、電話番号、メールアドレスなど、特定の個人を識別できる情報をいいます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">2. 個人情報の収集</h2>
            <p className="text-gray-600 mb-3">
              当店は、以下の目的で個人情報を収集することがあります。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>商品のご注文・配送</li>
              <li>お問い合わせへの対応</li>
              <li>新商品・キャンペーン情報のお知らせ（ご同意いただいた場合のみ）</li>
              <li>サービス向上のための分析</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">3. 個人情報の利用目的</h2>
            <p className="text-gray-600 mb-3">
              収集した個人情報は、以下の目的で利用いたします。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>ご注文いただいた商品の発送</li>
              <li>ご注文内容の確認、お支払いに関するご連絡</li>
              <li>お問い合わせへの回答</li>
              <li>重要なお知らせの送付</li>
              <li>メールマガジンの配信（ご希望の方のみ）</li>
              <li>サービスの改善・新サービスの開発</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">4. 個人情報の第三者提供</h2>
            <p className="text-gray-600 mb-3">
              当店は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>お客様の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
              <li>配送業者等、業務委託先に必要な範囲で提供する場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">5. 個人情報の管理</h2>
            <p className="text-gray-600 leading-relaxed">
              当店は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス、紛失、破壊、改ざん、漏洩などを防止するため、適切なセキュリティ対策を講じます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">6. Cookieの使用</h2>
            <p className="text-gray-600 leading-relaxed">
              当店のウェブサイトでは、サービス向上のためCookieを使用しています。Cookieはお客様のブラウザの設定により無効にすることができますが、一部のサービスがご利用いただけなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">7. 個人情報の開示・訂正・削除</h2>
            <p className="text-gray-600 leading-relaxed">
              お客様ご自身の個人情報について、開示・訂正・削除をご希望の場合は、お問い合わせフォームよりご連絡ください。本人確認の上、対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">8. プライバシーポリシーの変更</h2>
            <p className="text-gray-600 leading-relaxed">
              当店は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当ウェブサイトに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">9. お問い合わせ窓口</h2>
            <p className="text-gray-600 mb-4">
              個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>筋肉ショップ 個人情報お問い合わせ窓口</p>
              <p>メール: privacy@kinniku-shop.example.com</p>
              <p>電話: 03-1234-5678（平日 10:00〜18:00）</p>
            </div>
          </section>

          <p className="text-gray-500 text-sm pt-4 border-t border-gray-200">
            制定日：2024年1月1日<br />
            最終改定日：2024年1月1日
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
