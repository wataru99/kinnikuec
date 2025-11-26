import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* ショップ情報 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">筋肉ショップ</h3>
            <p className="text-sm text-gray-600">
              トレーニングに必要な商品を取り揃えています。
            </p>
          </div>

          {/* ご利用ガイド */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">ご利用ガイド</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-blue-600">
                  発送について
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-blue-600">
                  返品・交換
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* 規約 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">規約・ポリシー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-600 hover:text-blue-600">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/company" className="text-gray-600 hover:text-blue-600">
                  会社概要
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>&copy; 2024 筋肉ショップ All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
