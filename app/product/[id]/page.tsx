"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../components/CartContext";
import { getProductById, getRelatedProducts } from "@/lib/services/productService";
import { type Product, categoryLabels } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProductById(productId);
        if (data) {
          setProduct(data);
          // 関連商品を取得
          const related = await getRelatedProducts(data.category, data.id, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("商品取得エラー:", err);
        setError("商品の読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-4 py-8 flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">読み込み中...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-4 py-8 flex-1">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
              商品一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">商品が見つかりません</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              商品一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex-1">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                商品一覧
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        {/* 商品詳細 */}
        <div className="bg-white rounded-lg shadow p-4 lg:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* 商品画像 */}
            <div className="lg:col-span-2">
              {/* メイン画像 */}
              <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden mb-4">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-400 text-lg">商品画像</span>
                  </div>
                )}
              </div>
              {/* サムネイル */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gray-100 rounded-lg relative overflow-hidden ${
                        selectedImageIndex === index ? "ring-2 ring-blue-600" : ""
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 商品情報 */}
            <div className="lg:col-span-1">
              {/* カテゴリー */}
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-4">
                {categoryLabels[product.category]}
              </span>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* 価格 */}
              <div className="mb-6 flex items-baseline gap-3">
                {product.originalPrice && product.originalPrice > product.price ? (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ¥{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-3xl font-semibold text-red-600 tracking-tight">
                      ¥{product.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold text-gray-900 tracking-tight">
                    ¥{product.price.toLocaleString()}
                  </span>
                )}
                <span className="text-sm text-gray-600">(税込)</span>
              </div>

              {/* 説明文 */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {product.description}
              </p>
              {product.longDescription && (
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {product.longDescription}
                </p>
              )}

              {/* 商品詳細 */}
              {product.details && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">商品詳細</h3>
                  <dl className="space-y-2 text-sm">
                    {product.details.content && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">内容量</dt>
                        <dd className="text-gray-900">{product.details.content}</dd>
                      </div>
                    )}
                    {product.details.ingredients && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">成分</dt>
                        <dd className="text-gray-900">{product.details.ingredients}</dd>
                      </div>
                    )}
                    {product.details.material && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">素材</dt>
                        <dd className="text-gray-900">{product.details.material}</dd>
                      </div>
                    )}
                    {product.details.size && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">サイズ</dt>
                        <dd className="text-gray-900">{product.details.size}</dd>
                      </div>
                    )}
                    {product.details.weight && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">重量</dt>
                        <dd className="text-gray-900">{product.details.weight}</dd>
                      </div>
                    )}
                    {product.details.manufacturer && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">メーカー</dt>
                        <dd className="text-gray-900">{product.details.manufacturer}</dd>
                      </div>
                    )}
                    {product.details.origin && (
                      <div className="flex">
                        <dt className="w-24 text-gray-500 flex-shrink-0">原産国</dt>
                        <dd className="text-gray-900">{product.details.origin}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* 在庫状況 */}
              {product.stock === 0 && (
                <div className="mb-4">
                  <span className="text-red-600 text-sm">在庫切れ</span>
                </div>
              )}

              {/* 数量選択 */}
              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-4">数量:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-l-lg bg-gray-200 hover:bg-gray-300 font-bold text-gray-700"
                >
                  -
                </button>
                <span className="w-12 h-10 flex items-center justify-center bg-gray-100 text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-r-lg bg-gray-200 hover:bg-gray-300 font-bold text-gray-700"
                >
                  +
                </button>
              </div>

              {/* カートに追加ボタン */}
              <button
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(
                    {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0] || "/placeholder-product.jpg",
                    },
                    quantity
                  );
                }}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${
                  product.stock > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                カートに追加
              </button>
            </div>
          </div>
        </div>

        {/* 関連商品 */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">関連商品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  href={`/product/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden block"
                >
                  <div className="h-40 bg-gray-100 relative">
                    {relatedProduct.images && relatedProduct.images.length > 0 ? (
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">商品画像</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {categoryLabels[relatedProduct.category]}
                    </p>
                    <div className="flex items-baseline gap-2">
                      {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price ? (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ¥{relatedProduct.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-xl font-semibold text-red-600 tracking-tight">
                            ¥{relatedProduct.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-semibold text-gray-900 tracking-tight">
                          ¥{relatedProduct.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
