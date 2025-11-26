import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-4 py-12 flex-1 w-full">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← 商品一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">特定商取引法に基づく表記</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">販売業者</th>
                <td className="py-4 text-gray-900">株式会社筋肉ショップ</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">運営責任者</th>
                <td className="py-4 text-gray-900">山田 太郎</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">所在地</th>
                <td className="py-4 text-gray-900">
                  〒100-0001<br />
                  東京都千代田区マッスル1-2-3<br />
                  プロテインビル 5階
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">電話番号</th>
                <td className="py-4 text-gray-900">
                  03-1234-5678<br />
                  <span className="text-sm text-gray-500">受付時間：平日 10:00〜18:00（土日祝休み）</span>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">メールアドレス</th>
                <td className="py-4 text-gray-900">info@kinniku-shop.example.com</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">販売URL</th>
                <td className="py-4 text-gray-900">https://kinniku-shop.example.com</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">販売価格</th>
                <td className="py-4 text-gray-900">各商品ページに記載の価格（税抜）</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">商品代金以外の必要料金</th>
                <td className="py-4 text-gray-900">
                  <ul className="list-disc list-inside space-y-1">
                    <li>消費税（10%）</li>
                    <li>送料：全国一律500円（税込）<br />
                      <span className="text-sm text-gray-500">※10,000円以上のご購入で送料無料</span>
                    </li>
                    <li>銀行振込の場合：振込手数料はお客様負担</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">支払方法</th>
                <td className="py-4 text-gray-900">
                  <ul className="list-disc list-inside space-y-1">
                    <li>クレジットカード（VISA、MasterCard、JCB、American Express）</li>
                    <li>銀行振込</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">支払期限</th>
                <td className="py-4 text-gray-900">
                  <ul className="list-disc list-inside space-y-1">
                    <li>クレジットカード：ご注文時に決済</li>
                    <li>銀行振込：ご注文日から7日以内</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">引渡し時期</th>
                <td className="py-4 text-gray-900">
                  <ul className="list-disc list-inside space-y-1">
                    <li>クレジットカード：ご注文確定後1〜3営業日以内に発送</li>
                    <li>銀行振込：ご入金確認後1〜3営業日以内に発送</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">
                    ※離島・一部地域は追加日数がかかる場合があります
                  </p>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">返品・交換</th>
                <td className="py-4 text-gray-900">
                  <p className="mb-2">【お客様都合の場合】</p>
                  <p className="text-gray-600 mb-3">商品の性質上、お客様都合による返品・交換はお受けできません。</p>
                  <p className="mb-2">【不良品・誤配送の場合】</p>
                  <p className="text-gray-600">
                    商品到着後7日以内にご連絡ください。<br />
                    当店負担にて交換または返金いたします。
                  </p>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-40 align-top">返品送料</th>
                <td className="py-4 text-gray-900">
                  不良品・誤配送の場合は当店負担。<br />
                  お客様都合の場合はお客様負担。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
