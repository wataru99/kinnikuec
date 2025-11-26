"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("payment") || "credit_card";
  const orderNumberFromUrl = searchParams.get("orderNumber") || "";
  const isBankTransfer = paymentMethod === "bank_transfer";

  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [paymentDeadline, setPaymentDeadline] = useState("");

  useEffect(() => {
    setEstimatedDeliveryDate(
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setPaymentDeadline(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              筋肉ショップ
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                商品一覧
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex-1 w-full">
        {/* 成功メッセージ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ご注文ありがとうございます
          </h1>
          <p className="text-gray-600">
            ご注文を承りました。確認メールをお送りしましたのでご確認ください。
          </p>
        </div>

        {/* 注文情報 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                注文番号
              </h3>
              <p className="text-lg font-bold text-gray-900">{orderNumberFromUrl || "---"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                お届け予定日
              </h3>
              <p className="text-lg font-bold text-gray-900">
                {estimatedDeliveryDate || "---"}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              ご注文内容の詳細は、確認メールをご確認ください。
            </p>
          </div>
        </div>

        {/* 銀行振込の場合：振込先情報 */}
        {isBankTransfer && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              お振込先情報
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              以下の口座へ <span className="font-bold text-red-600">{paymentDeadline || "---"}</span> までにお振込みをお願いいたします。
              <br />
              ご入金確認後、商品の発送手続きを開始いたします。
            </p>
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">金融機関</span>
                <span className="col-span-2 font-medium text-gray-900">筋肉銀行</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">支店名</span>
                <span className="col-span-2 font-medium text-gray-900">マッスル支店（123）</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">口座種別</span>
                <span className="col-span-2 font-medium text-gray-900">普通</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">口座番号</span>
                <span className="col-span-2 font-medium text-gray-900">1234567</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">口座名義</span>
                <span className="col-span-2 font-medium text-gray-900">カ）キンニクショップ</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-3">
                <span className="text-gray-500">振込金額</span>
                <span className="col-span-2 font-bold text-blue-600 text-lg">確認メールをご参照ください</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ※ 振込手数料はお客様のご負担となります。<br />
              ※ ご注文者名と振込名義が異なる場合は、事前にお問い合わせください。
            </p>
          </div>
        )}

        {/* 次のステップ */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            今後の流れ
          </h2>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                1
              </span>
              <span>
                ご注文確認メールをお送りしました。メールが届かない場合は迷惑メールフォルダをご確認ください。
              </span>
            </li>
            {isBankTransfer && (
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span>
                  上記の口座へお振込みをお願いいたします。ご入金確認後、発送準備を開始いたします。
                </span>
              </li>
            )}
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                {isBankTransfer ? "3" : "2"}
              </span>
              <span>
                ご注文の商品を準備し、発送準備が整い次第、発送通知メールをお送りいたします。
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                {isBankTransfer ? "4" : "3"}
              </span>
              <span>
                商品がお手元に届きましたら、内容をご確認ください。
              </span>
            </li>
          </ol>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            買い物を続ける
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-white border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-lg hover:bg-gray-50 font-medium"
          >
            注文内容を印刷
          </button>
        </div>

        {/* お問い合わせ */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            ご不明な点がございましたら、
            <Link href="/contact" className="text-blue-600 hover:underline">
              お問い合わせ
            </Link>
            よりご連絡ください。
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">読み込み中...</div>}>
      <OrderCompleteContent />
    </Suspense>
  );
}
