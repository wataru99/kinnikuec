"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { useCart } from "../components/CartContext";
import { getOrderByOrderNumber } from "@/lib/services/orderService";
import { Order } from "@/lib/types";

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("payment") || "credit_card";
  const orderNumberFromUrl = searchParams.get("orderNumber") || "";
  const isBankTransfer = paymentMethod === "bank_transfer";
  const { openCart, getTotalItems } = useCart();

  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [paymentDeadline, setPaymentDeadline] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    // 注文詳細を取得
    const fetchOrder = async () => {
      if (orderNumberFromUrl) {
        try {
          const orderData = await getOrderByOrderNumber(orderNumberFromUrl);
          setOrder(orderData);
        } catch (error) {
          console.error("注文取得エラー:", error);
        }
      }
      setIsLoading(false);
    };
    fetchOrder();
  }, [orderNumberFromUrl]);

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
            ← トップへ
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
          {/* 成功メッセージ */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl text-gray-900 mb-2 tracking-wide">ご注文ありがとうございます</h1>
            <p className="text-gray-500 text-sm tracking-wide">
              ご注文を承りました。確認メールをお送りしましたのでご確認ください。
            </p>
          </div>

          {/* 注文情報 */}
          <div className="border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">注文番号</h3>
                <p className="text-lg text-gray-900">{orderNumberFromUrl || "---"}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">お届け予定日</h3>
                <p className="text-lg text-gray-900">{estimatedDeliveryDate || "---"}</p>
              </div>
            </div>
          </div>

          {/* 注文詳細 */}
          {isLoading ? (
            <div className="border border-gray-200 p-6 mb-8 text-center text-gray-500">
              読み込み中...
            </div>
          ) : order ? (
            <div className="border border-gray-200 p-6 mb-8">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">ご注文内容</h2>

              {/* 商品一覧 */}
              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 flex-shrink-0 relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          IMG
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{item.productName}</p>
                      <p className="text-xs text-gray-500">数量: {item.quantity}</p>
                    </div>
                    <div className="text-sm text-gray-900">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* 金額明細 */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">小計</span>
                  <span className="text-gray-900">¥{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">消費税（10%）</span>
                  <span className="text-gray-900">¥{order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">送料</span>
                  <span className="text-gray-900">{order.shipping === 0 ? "無料" : `¥${order.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-200">
                  <span className="text-gray-900">合計（税込）</span>
                  <span className="text-gray-900">¥{order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* お届け先 */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">お届け先</h3>
                <p className="text-sm text-gray-900">
                  {order.customer.name} 様<br />
                  〒{order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.prefecture}{order.shippingAddress.city}{order.shippingAddress.address}
                  {order.shippingAddress.building && <><br />{order.shippingAddress.building}</>}
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 p-6 mb-8">
              <p className="text-sm text-gray-500 tracking-wide">ご注文内容の詳細は、確認メールをご確認ください。</p>
            </div>
          )}

          {/* 銀行振込の場合：振込先情報 */}
          {isBankTransfer && (
            <div className="border border-gray-300 p-6 mb-8">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">お振込先情報</h2>
              <p className="text-sm text-gray-600 mb-4 tracking-wide">
                以下の口座へ <span className="font-medium text-gray-900">{paymentDeadline || "---"}</span> までにお振込みをお願いいたします。
                <br />
                ご入金確認後、商品の発送手続きを開始いたします。
              </p>
              <div className="bg-gray-50 p-4 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-400">金融機関</span>
                  <span className="col-span-2 text-gray-900">筋肉銀行</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-400">支店名</span>
                  <span className="col-span-2 text-gray-900">マッスル支店（123）</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-400">口座種別</span>
                  <span className="col-span-2 text-gray-900">普通</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-400">口座番号</span>
                  <span className="col-span-2 text-gray-900">1234567</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-400">口座名義</span>
                  <span className="col-span-2 text-gray-900">カ）キンニクショップ</span>
                </div>
                {order && (
                  <div className="grid grid-cols-3 gap-2 text-sm border-t border-gray-200 pt-3">
                    <span className="text-gray-400">振込金額</span>
                    <span className="col-span-2 text-gray-900 font-medium">¥{order.total.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-3 tracking-wide">
                ※ 振込手数料はお客様のご負担となります。<br />
                ※ ご注文者名と振込名義が異なる場合は、事前にお問い合わせください。
              </p>
            </div>
          )}

          {/* 次のステップ */}
          <div className="border border-gray-200 p-6 mb-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">今後の流れ</h2>
            <ol className="space-y-3 text-sm text-gray-600 tracking-wide">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-900 text-white text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>ご注文確認メールをお送りしました。メールが届かない場合は迷惑メールフォルダをご確認ください。</span>
              </li>
              {isBankTransfer && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-900 text-white text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span>上記の口座へお振込みをお願いいたします。ご入金確認後、発送準備を開始いたします。</span>
                </li>
              )}
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-900 text-white text-xs mr-3 mt-0.5 flex-shrink-0">{isBankTransfer ? "3" : "2"}</span>
                <span>ご注文の商品を準備し、発送準備が整い次第、発送通知メールをお送りいたします。</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-900 text-white text-xs mr-3 mt-0.5 flex-shrink-0">{isBankTransfer ? "4" : "3"}</span>
                <span>商品がお手元に届きましたら、内容をご確認ください。</span>
              </li>
            </ol>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1 bg-gray-900 text-white text-center px-6 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors">
              買い物を続ける
            </Link>
          </div>

          {/* お問い合わせ */}
          <div className="mt-8 text-center text-sm text-gray-500 tracking-wide">
            <p>
              ご不明な点がございましたら、
              <Link href="/contact" className="text-gray-900 hover:underline">お問い合わせ</Link>
              よりご連絡ください。
            </p>
          </div>
        </main>
      </div>
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
