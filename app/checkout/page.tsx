"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import Sidebar from "../components/Sidebar";
import { createOrder, calculateOrderTotals } from "@/lib/services/orderService";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalItems, openCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // お客様情報
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    email: "",
    phone: "",
    // 配送先情報
    zipCode: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    // 支払い方法
    paymentMethod: "credit_card" as "credit_card" | "bank_transfer",
    // クレジットカード情報
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // カートが空の場合はトップページへリダイレクト（送信中は除く）
  useEffect(() => {
    if (getTotalItems() === 0 && !isSubmitting) {
      router.push("/");
    }
  }, [getTotalItems, router, isSubmitting]);

  const { subtotal, tax, shipping, total } = calculateOrderTotals(items);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { orderNumber } = await createOrder({
        customer: {
          name: `${formData.lastName} ${formData.firstName}`,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          zipCode: formData.zipCode,
          prefecture: formData.prefecture,
          city: formData.city,
          address: formData.address,
          building: formData.building || undefined,
        },
        cartItems: items,
        paymentMethod: formData.paymentMethod,
      });

      // 注文日時を生成
      const orderDate = new Date().toLocaleString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // 注文商品一覧を生成
      const orderItems = items
        .map(item => `・${item.name} x ${item.quantity} - ¥${(item.price * item.quantity).toLocaleString()}`)
        .join("\n");

      // 配送先住所を生成
      const shippingAddressText = `${formData.lastName} ${formData.firstName} 様
〒${formData.zipCode}
${formData.prefecture}${formData.city}${formData.address}${formData.building ? `\n${formData.building}` : ""}`;

      // メール送信
      try {
        if (formData.paymentMethod === "credit_card") {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "order_complete_credit",
              data: {
                to: formData.email,
                customerName: `${formData.lastName} ${formData.firstName}`,
                orderNumber,
                orderDate,
                orderItems,
                subtotal,
                tax,
                shipping,
                total,
                shippingAddress: shippingAddressText,
              },
            }),
          });
        } else {
          // 振込期限を7日後に設定
          const paymentDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "order_complete_bank",
              data: {
                to: formData.email,
                customerName: `${formData.lastName} ${formData.firstName}`,
                orderNumber,
                orderDate,
                orderItems,
                subtotal,
                tax,
                shipping,
                total,
                shippingAddress: shippingAddressText,
                bankName: "筋肉銀行",
                branchName: "マッスル支店（123）",
                accountType: "普通",
                accountNumber: "1234567",
                accountHolder: "カ）キンニクショップ",
                paymentDeadline,
              },
            }),
          });
        }
      } catch (emailErr) {
        console.error("メール送信エラー:", emailErr);
        // メール送信エラーは注文処理を中断しない
      }

      // カートをクリア
      clearCart();

      // 注文完了ページへ遷移
      router.push(`/order-complete?orderNumber=${orderNumber}&payment=${formData.paymentMethod}`);
    } catch (err) {
      console.error("注文エラー:", err);
      setError("注文の処理中にエラーが発生しました。もう一度お試しください。");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-sm tracking-wide">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* 処理中オーバーレイ */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-900 border-t-transparent mb-4"></div>
            <p className="text-gray-900 text-sm tracking-wide">注文を処理しています...</p>
            <p className="text-gray-500 text-xs tracking-wide mt-1">しばらくお待ちください</p>
          </div>
        </div>
      )}

      {/* サイドバー - 固定 */}
      <div className="hidden lg:block fixed left-0 top-0 h-full bg-gray-50 pl-8 pt-8 z-20">
        <Sidebar />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* モバイルヘッダー */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4">
          <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900">
            ← カートに戻る
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-5xl">
          <nav className="mb-8 hidden lg:block">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  商品一覧
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/cart" className="hover:text-gray-900">
                  カート
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">ご注文手続き</li>
            </ol>
          </nav>

          <h1 className="text-xl text-gray-900 mb-8 tracking-wide">
            ご注文手続き
          </h1>

          {error && (
            <div className="mb-6 p-4 border border-gray-300 bg-gray-50">
              <p className="text-gray-700 text-sm tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 注文フォーム */}
              <div className="lg:col-span-2 space-y-8">
                {/* お客様情報 */}
                <div className="border border-gray-200 p-6">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                    お客様情報
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        姓 <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="山田"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        名 <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="太郎"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        セイ <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastNameKana"
                        required
                        value={formData.lastNameKana}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="ヤマダ"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        メイ <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstNameKana"
                        required
                        value={formData.firstNameKana}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="タロウ"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                      メールアドレス <span className="text-gray-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                      電話番号 <span className="text-gray-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="090-1234-5678"
                    />
                  </div>
                </div>

                {/* 配送先情報 */}
                <div className="border border-gray-200 p-6">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                    配送先情報
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        郵便番号 <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        都道府県 <span className="text-gray-400">*</span>
                      </label>
                      <select
                        name="prefecture"
                        required
                        value={formData.prefecture}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      >
                        <option value="">選択してください</option>
                        <option value="北海道">北海道</option>
                        <option value="青森県">青森県</option>
                        <option value="岩手県">岩手県</option>
                        <option value="宮城県">宮城県</option>
                        <option value="秋田県">秋田県</option>
                        <option value="山形県">山形県</option>
                        <option value="福島県">福島県</option>
                        <option value="茨城県">茨城県</option>
                        <option value="栃木県">栃木県</option>
                        <option value="群馬県">群馬県</option>
                        <option value="埼玉県">埼玉県</option>
                        <option value="千葉県">千葉県</option>
                        <option value="東京都">東京都</option>
                        <option value="神奈川県">神奈川県</option>
                        <option value="新潟県">新潟県</option>
                        <option value="富山県">富山県</option>
                        <option value="石川県">石川県</option>
                        <option value="福井県">福井県</option>
                        <option value="山梨県">山梨県</option>
                        <option value="長野県">長野県</option>
                        <option value="岐阜県">岐阜県</option>
                        <option value="静岡県">静岡県</option>
                        <option value="愛知県">愛知県</option>
                        <option value="三重県">三重県</option>
                        <option value="滋賀県">滋賀県</option>
                        <option value="京都府">京都府</option>
                        <option value="大阪府">大阪府</option>
                        <option value="兵庫県">兵庫県</option>
                        <option value="奈良県">奈良県</option>
                        <option value="和歌山県">和歌山県</option>
                        <option value="鳥取県">鳥取県</option>
                        <option value="島根県">島根県</option>
                        <option value="岡山県">岡山県</option>
                        <option value="広島県">広島県</option>
                        <option value="山口県">山口県</option>
                        <option value="徳島県">徳島県</option>
                        <option value="香川県">香川県</option>
                        <option value="愛媛県">愛媛県</option>
                        <option value="高知県">高知県</option>
                        <option value="福岡県">福岡県</option>
                        <option value="佐賀県">佐賀県</option>
                        <option value="長崎県">長崎県</option>
                        <option value="熊本県">熊本県</option>
                        <option value="大分県">大分県</option>
                        <option value="宮崎県">宮崎県</option>
                        <option value="鹿児島県">鹿児島県</option>
                        <option value="沖縄県">沖縄県</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        市区町村 <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="渋谷区"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        番地 <span className="text-gray-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="道玄坂1-2-3"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                        建物名・部屋番号
                      </label>
                      <input
                        type="text"
                        name="building"
                        value={formData.building}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="マンション名 101号室"
                      />
                    </div>
                  </div>
                </div>

                {/* 支払い方法 */}
                <div className="border border-gray-200 p-6">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                    お支払い方法
                  </h2>

                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border cursor-pointer hover:bg-gray-50 ${formData.paymentMethod === "credit_card" ? "border-gray-900 bg-gray-50" : "border-gray-300"}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === "credit_card"}
                        onChange={handleChange}
                        className="w-4 h-4 text-gray-900"
                      />
                      <span className="ml-3 text-sm text-gray-900 tracking-wide">
                        クレジットカード
                      </span>
                    </label>

                    {/* クレジットカード情報入力フォーム */}
                    {formData.paymentMethod === "credit_card" && (
                      <div className="p-4 bg-gray-50 space-y-4 ml-7">
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                            カード番号 <span className="text-gray-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                            カード名義 <span className="text-gray-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            required
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                            placeholder="TARO YAMADA"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                              有効期限 <span className="text-gray-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              required
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-2 tracking-wide">
                              セキュリティコード <span className="text-gray-400">*</span>
                            </label>
                            <input
                              type="text"
                              name="cardCvc"
                              required
                              value={formData.cardCvc}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <label className={`flex items-center p-4 border cursor-pointer hover:bg-gray-50 ${formData.paymentMethod === "bank_transfer" ? "border-gray-900 bg-gray-50" : "border-gray-300"}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === "bank_transfer"}
                        onChange={handleChange}
                        className="w-4 h-4 text-gray-900"
                      />
                      <div className="ml-3">
                        <span className="text-sm text-gray-900 tracking-wide">銀行振込</span>
                        <p className="text-xs text-gray-500 tracking-wide">ご注文後、振込先をご案内いたします</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* 注文サマリー */}
              <div className="lg:col-span-1">
                <div className="border border-gray-200 p-6 sticky top-8">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                    注文内容
                  </h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm border-b border-gray-100 pb-4">
                        <div className="flex-1">
                          <p className="text-gray-900 tracking-wide">{item.name}</p>
                          <p className="text-gray-500 text-xs tracking-wide">数量: {item.quantity}</p>
                        </div>
                        <span className="text-gray-900 tracking-wide">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 tracking-wide">小計</span>
                      <span className="text-gray-900 tracking-wide">
                        ¥{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 tracking-wide">消費税（10%）</span>
                      <span className="text-gray-900 tracking-wide">¥{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 tracking-wide">配送料</span>
                      <span className="text-gray-900 tracking-wide">
                        {shipping === 0 ? (
                          <span className="text-gray-600">無料</span>
                        ) : (
                          `¥${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-900 tracking-wide">
                        合計金額
                      </span>
                      <span className="text-lg text-gray-900 tracking-wide">
                        ¥{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white px-6 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "処理中..." : "注文を確定する"}
                  </button>

                  <Link
                    href="/cart"
                    className="block w-full text-center text-gray-500 hover:text-gray-900 text-sm tracking-wide"
                  >
                    カートに戻る
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
