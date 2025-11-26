"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Sidebar from "../../components/Sidebar";
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
  const { addToCart, openCart, getTotalItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProductById(productId);
        if (data) {
          setProduct(data);
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
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden lg:block fixed left-0 top-0 h-full bg-gray-50 pl-8 pt-8 z-20">
          <Sidebar />
        </div>
        <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
          <div className="lg:hidden flex items-center justify-between px-4 py-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
              ← 戻る
            </Link>
            <button onClick={openCart} className="relative p-2 text-gray-600 hover:text-gray-900">
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
          <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 text-sm tracking-wide">読み込み中...</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden lg:block fixed left-0 top-0 h-full bg-gray-50 pl-8 pt-8 z-20">
          <Sidebar />
        </div>
        <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
          <div className="lg:hidden flex items-center justify-between px-4 py-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
              ← 戻る
            </Link>
            <button onClick={openCart} className="relative p-2 text-gray-600 hover:text-gray-900">
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
          <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-lg text-gray-900 mb-4 tracking-wide">
                {error || "商品が見つかりません"}
              </h1>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 tracking-wide">
                ← 商品一覧に戻る
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
            ← 戻る
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
          {/* パンくずリスト */}
          <nav className="mb-8 hidden lg:block">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  商品一覧
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          {/* 商品詳細 */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* 商品画像 */}
              <div>
                {/* メイン画像 */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden mb-4">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[selectedImageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm tracking-wide">NO IMAGE</span>
                    </div>
                  )}
                </div>
                {/* サムネイル */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-16 h-16 bg-gray-100 relative overflow-hidden flex-shrink-0 ${
                          selectedImageIndex === index ? "ring-2 ring-gray-900" : ""
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
              <div>
                {/* カテゴリー */}
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                  {categoryLabels[product.category]}
                </p>

                <h1 className="text-xl lg:text-2xl text-gray-900 mb-4 tracking-wide">
                  {product.name}
                </h1>

                {/* 価格 */}
                <div className="mb-6 flex items-baseline gap-3 flex-wrap">
                  {product.originalPrice && product.originalPrice > product.price ? (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ¥{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl text-red-600 font-medium tracking-wide">
                        ¥{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-red-600 font-medium">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}%OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl text-gray-900 tracking-wide">
                      ¥{product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* 説明文 */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm tracking-wide">
                  {product.description}
                </p>
                {product.longDescription && (
                  <p className="text-gray-500 mb-6 leading-relaxed text-sm tracking-wide">
                    {product.longDescription}
                  </p>
                )}

                {/* 商品詳細 */}
                {product.details && (
                  <div className="border border-gray-200 p-4 mb-6">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">商品詳細</h3>
                    <dl className="space-y-2 text-sm">
                      {product.details.content && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">内容量</dt>
                          <dd className="text-gray-900">{product.details.content}</dd>
                        </div>
                      )}
                      {product.details.ingredients && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">成分</dt>
                          <dd className="text-gray-900">{product.details.ingredients}</dd>
                        </div>
                      )}
                      {product.details.material && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">素材</dt>
                          <dd className="text-gray-900">{product.details.material}</dd>
                        </div>
                      )}
                      {product.details.size && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">サイズ</dt>
                          <dd className="text-gray-900">{product.details.size}</dd>
                        </div>
                      )}
                      {product.details.weight && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">重量</dt>
                          <dd className="text-gray-900">{product.details.weight}</dd>
                        </div>
                      )}
                      {product.details.manufacturer && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">メーカー</dt>
                          <dd className="text-gray-900">{product.details.manufacturer}</dd>
                        </div>
                      )}
                      {product.details.origin && (
                        <div className="flex">
                          <dt className="w-24 text-gray-400 flex-shrink-0">原産国</dt>
                          <dd className="text-gray-900">{product.details.origin}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {/* 在庫状況 */}
                {product.stock === 0 && (
                  <div className="mb-4">
                    <span className="text-gray-500 text-sm tracking-wide">在庫切れ</span>
                  </div>
                )}

                {/* 数量・カートボタン */}
                <div className="flex flex-col gap-4 mt-6">
                  {/* 数量選択 */}
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-4 text-sm tracking-wide">数量</span>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm"
                    >
                      -
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300 text-gray-900 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm"
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
                    className={`w-full py-3 text-sm tracking-wider transition-colors ${
                      product.stock > 0
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    カートに追加
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 関連商品 */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">関連商品</h2>
              <div className="flex flex-wrap gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    href={`/product/${relatedProduct.id}`}
                    key={relatedProduct.id}
                    className="group block w-[180px]"
                  >
                    <div className="w-[180px] h-[225px] bg-gray-100 relative overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs tracking-wide">NO IMAGE</span>
                        </div>
                      )}
                    </div>
                    <div className="pt-3 w-[180px]">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {categoryLabels[relatedProduct.category]}
                      </p>
                      <h3 className="text-sm text-gray-900 line-clamp-1 mb-1 tracking-wide">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price ? (
                          <>
                            <span className="text-xs text-gray-400 line-through">
                              ¥{relatedProduct.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-red-600 font-medium tracking-wide">
                              ¥{relatedProduct.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-red-600 font-medium">
                              {Math.round((1 - relatedProduct.price / relatedProduct.originalPrice) * 100)}%OFF
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-900 tracking-wide">
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
      </div>
    </div>
  );
}
