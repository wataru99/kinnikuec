import Link from "next/link";
import Header from "../components/Header";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← 商品一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">発送について</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">配送料金</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">全国一律</td>
                    <td className="py-3 text-gray-900 font-medium text-right">500円（税込）</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">10,000円以上お買い上げ</td>
                    <td className="py-3 text-green-600 font-medium text-right">送料無料</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">配送業者</h2>
            <p className="text-gray-600">
              ヤマト運輸、佐川急便、日本郵便のいずれかでお届けいたします。<br />
              配送業者の指定はできかねますので、あらかじめご了承ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">お届け日数</h2>
            <div className="bg-gray-50 rounded-lg p-4">
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
            <p className="text-gray-500 text-sm mt-3">
              ※ 土日祝日は発送業務をお休みしております。<br />
              ※ 離島・一部地域は追加日数がかかる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">お届け時間帯の指定</h2>
            <p className="text-gray-600 mb-3">
              以下の時間帯からお選びいただけます。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>午前中</li>
              <li>14:00〜16:00</li>
              <li>16:00〜18:00</li>
              <li>18:00〜20:00</li>
              <li>19:00〜21:00</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">不在時の対応</h2>
            <p className="text-gray-600">
              ご不在の場合は、不在票が投函されます。<br />
              不在票に記載された連絡先にご連絡いただき、再配達のお手続きをお願いいたします。<br />
              保管期間を過ぎた場合は、当店へ返送されますのでご注意ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">配送先の変更</h2>
            <p className="text-gray-600">
              発送前であれば配送先の変更が可能です。<br />
              お早めにお問い合わせフォームまたはお電話にてご連絡ください。<br />
              発送後の変更は、配送業者へ直接ご連絡ください。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
