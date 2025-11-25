"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { createOrder, calculateOrderTotals } from "@/lib/services/orderService";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalItems } = useCart();
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

  // カートが空の場合はトップページへリダイレクト
  useEffect(() => {
    if (getTotalItems() === 0) {
      router.push("/");
    }
  }, [getTotalItems, router]);

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
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <Link
                href="/cart"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                カート
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          ご注文内容の確認
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 注文フォーム */}
            <div className="lg:col-span-2 space-y-6">
              {/* お客様情報 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  お客様情報
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="山田"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="太郎"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      セイ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastNameKana"
                      required
                      value={formData.lastNameKana}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ヤマダ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メイ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstNameKana"
                      required
                      value={formData.firstNameKana}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="タロウ"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="090-1234-5678"
                  />
                </div>
              </div>

              {/* 配送先情報 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  配送先情報
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      郵便番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      都道府県 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="prefecture"
                      required
                      value={formData.prefecture}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      市区町村 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="渋谷区"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      番地 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="道玄坂1-2-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      建物名・部屋番号
                    </label>
                    <input
                      type="text"
                      name="building"
                      value={formData.building}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="マンション名 101号室"
                    />
                  </div>
                </div>
              </div>

              {/* 支払い方法 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  お支払い方法
                </h2>

                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${formData.paymentMethod === "credit_card" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === "credit_card"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-900 font-medium">
                      クレジットカード
                    </span>
                  </label>

                  {/* クレジットカード情報入力フォーム */}
                  {formData.paymentMethod === "credit_card" && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4 ml-7">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          カード番号 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          カード名義 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          required
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="TARO YAMADA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            有効期限 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            required
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            セキュリティコード <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            required
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${formData.paymentMethod === "bank_transfer" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === "bank_transfer"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="text-gray-900 font-medium">銀行振込</span>
                      <p className="text-sm text-gray-500">ご注文後、振込先をご案内いたします</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* 注文サマリー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  注文内容
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-600">数量: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">小計</span>
                    <span className="font-medium">
                      ¥{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">消費税（10%）</span>
                    <span className="font-medium">¥{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">配送料</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">無料</span>
                      ) : (
                        `¥${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      合計金額
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ¥{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "処理中..." : "注文を確定する"}
                </button>

                <Link
                  href="/cart"
                  className="block w-full text-center text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  カートに戻る
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
