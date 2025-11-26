import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-4 py-12 flex-1 w-full">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← 商品一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">返品・交換について</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">返品・交換の条件</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                商品到着後7日以内にご連絡ください。<br />
                期限を過ぎた場合は、返品・交換をお受けできません。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">返品・交換が可能な場合</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>商品に破損・汚損があった場合</li>
              <li>ご注文と異なる商品が届いた場合</li>
              <li>商品の数量が不足していた場合</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3">
              ※ 上記の場合、送料は当店負担にて交換または返金いたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">返品・交換ができない場合</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>お客様のご都合による返品・交換（イメージ違い、サイズ違いなど）</li>
              <li>一度開封・使用された商品</li>
              <li>サプリメント等の食品類（未開封でも衛生上の理由により不可）</li>
              <li>商品到着後7日を過ぎた商品</li>
              <li>セール品・アウトレット品</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">返品・交換の手順</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-3">
              <li>
                <span className="font-medium text-gray-900">お問い合わせフォームからご連絡</span>
                <p className="text-sm mt-1 ml-5">注文番号、商品名、返品・交換の理由をお知らせください。</p>
              </li>
              <li>
                <span className="font-medium text-gray-900">当店からの返信をお待ちください</span>
                <p className="text-sm mt-1 ml-5">返送先住所と返送方法をご案内いたします。</p>
              </li>
              <li>
                <span className="font-medium text-gray-900">商品を返送</span>
                <p className="text-sm mt-1 ml-5">案内に従って商品をご返送ください。</p>
              </li>
              <li>
                <span className="font-medium text-gray-900">商品確認後、交換品発送または返金</span>
                <p className="text-sm mt-1 ml-5">商品到着後、3営業日以内に対応いたします。</p>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">返金方法</h2>
            <p className="text-gray-600">
              クレジットカードでお支払いの場合は、カード会社経由で返金いたします。<br />
              銀行振込でお支払いの場合は、ご指定の口座へ返金いたします。<br />
              返金までに2週間程度かかる場合がございます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">お問い合わせ</h2>
            <p className="text-gray-600 mb-4">
              返品・交換に関するご質問は、お問い合わせフォームよりご連絡ください。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              お問い合わせフォームへ
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
