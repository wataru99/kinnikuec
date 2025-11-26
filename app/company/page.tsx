import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-12 flex-1 w-full">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← 商品一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">会社概要</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">会社名</th>
                <td className="py-4 text-gray-900">株式会社筋肉ショップ</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">代表者</th>
                <td className="py-4 text-gray-900">代表取締役 山田 太郎</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">設立</th>
                <td className="py-4 text-gray-900">2020年4月1日</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">資本金</th>
                <td className="py-4 text-gray-900">1,000万円</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">所在地</th>
                <td className="py-4 text-gray-900">
                  〒100-0001<br />
                  東京都千代田区マッスル1-2-3<br />
                  プロテインビル 5階
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">電話番号</th>
                <td className="py-4 text-gray-900">03-1234-5678</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">FAX</th>
                <td className="py-4 text-gray-900">03-1234-5679</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">メール</th>
                <td className="py-4 text-gray-900">info@kinniku-shop.example.com</td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">事業内容</th>
                <td className="py-4 text-gray-900">
                  <ul className="list-disc list-inside space-y-1">
                    <li>スポーツサプリメントの販売</li>
                    <li>トレーニング器具の販売</li>
                    <li>フィットネス関連商品の企画・開発</li>
                    <li>健康・栄養に関する情報発信</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-4 text-left text-sm font-medium text-gray-500 w-32 align-top">取引銀行</th>
                <td className="py-4 text-gray-900">筋肉銀行 マッスル支店</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">企業理念</h2>
            <p className="text-gray-600 leading-relaxed">
              「すべての人に、最高のトレーニング体験を」<br /><br />
              私たちは、高品質なサプリメントとトレーニング器具を通じて、お客様の健康的なライフスタイルをサポートします。科学的根拠に基づいた製品選定と、お客様第一のサービスで、フィットネスの喜びをお届けします。
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">アクセス</h2>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
              <span className="text-gray-400">地図（準備中）</span>
            </div>
            <p className="text-gray-600 text-sm">
              東京メトロ千代田線「マッスル駅」A1出口より徒歩3分<br />
              JR「プロテイン駅」東口より徒歩7分
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
