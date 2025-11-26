"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useCart } from "./components/CartContext";
import { getProducts, type ProductFilter } from "@/lib/services/productService";
import { type Product, categoryLabels } from "@/lib/types";

const ITEMS_PER_PAGE = 30;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  // 商品データを取得
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const filter: ProductFilter = {};
        if (selectedCategory !== "all") {
          filter.category = selectedCategory as Product["category"];
        }
        if (priceRange === "under_2000") {
          filter.maxPrice = 1999;
        } else if (priceRange === "2000_5000") {
          filter.minPrice = 2000;
          filter.maxPrice = 4999;
        } else if (priceRange === "over_5000") {
          filter.minPrice = 5000;
        }
        const data = await getProducts(filter);
        setProducts(data);
      } catch (err) {
        console.error("商品取得エラー:", err);
        setError("商品の読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, priceRange]);

  // 販売価格を取得（割引価格があれば割引価格、なければ定価）
  const getDisplayPrice = (product: Product) =>
    product.originalPrice ?? product.price;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "popular") return (b.reviews ?? 0) - (a.reviews ?? 0);
    // new - createdAt desc（サービス層でソート済みなのでそのまま）
    return 0;
  });

  // ページネーション
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // フィルター変更時にページをリセット
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: string) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-8">
        {/* モバイル: フィルターボタン */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            絞り込み
          </button>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700"
          >
            <option value="new">新着順</option>
            <option value="popular">人気順</option>
            <option value="price_asc">価格が安い順</option>
            <option value="price_desc">価格が高い順</option>
          </select>
        </div>

        {/* モバイル: フィルターパネル */}
        {isFilterOpen && (
          <div className="lg:hidden bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">絞り込み</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* カテゴリー */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">カテゴリー</h3>
                <div className="space-y-1">
                  {[
                    { value: "all", label: "全て" },
                    { value: "supplement", label: categoryLabels.supplement },
                    { value: "equipment", label: categoryLabels.equipment },
                    { value: "wear", label: categoryLabels.wear },
                    { value: "accessories", label: categoryLabels.accessories },
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category-mobile"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* 価格帯 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">価格帯</h3>
                <div className="space-y-1">
                  {[
                    { value: "all", label: "全て" },
                    { value: "under_2000", label: "¥2,000以下" },
                    { value: "2000_5000", label: "¥2,000 - ¥5,000" },
                    { value: "over_5000", label: "¥5,000以上" },
                  ].map((price) => (
                    <label key={price.value} className="flex items-center">
                      <input
                        type="radio"
                        name="price-mobile"
                        value={price.value}
                        checked={priceRange === price.value}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバー - フィルター（デスクトップ） */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">絞り込み</h2>

              {/* カテゴリー */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">カテゴリー</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "全て" },
                    { value: "supplement", label: categoryLabels.supplement },
                    { value: "equipment", label: categoryLabels.equipment },
                    { value: "wear", label: categoryLabels.wear },
                    { value: "accessories", label: categoryLabels.accessories },
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 価格帯 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">価格帯</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "全て" },
                    { value: "under_2000", label: "¥2,000以下" },
                    { value: "2000_5000", label: "¥2,000 - ¥5,000" },
                    { value: "over_5000", label: "¥5,000以上" },
                  ].map((price) => (
                    <label key={price.value} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={priceRange === price.value}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ソート */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">並び替え</h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="new">新着順</option>
                  <option value="popular">人気順</option>
                  <option value="price_asc">価格が安い順</option>
                  <option value="price_desc">価格が高い順</option>
                </select>
              </div>
            </div>
          </aside>

          {/* 商品グリッド */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">読み込み中...</div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700">{error}</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  {sortedProducts.length}件の商品
                  {sortedProducts.length > 0 && (
                    <>（{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)}件表示）</>
                  )}
                </div>

                {paginatedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {paginatedProducts.map((product) => (
                      <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden block"
                      >
                        {/* 商品画像 */}
                        <div className="h-32 sm:h-48 bg-gray-100 relative">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <span className="text-gray-400 text-sm">商品画像</span>
                            </div>
                          )}
                        </div>

                        {/* 商品情報 */}
                        <div className="px-3 py-2">
                          {/* 価格 */}
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            {product.originalPrice && product.originalPrice > product.price ? (
                              <>
                                <span className="text-xs text-gray-400 line-through">
                                  ¥{product.originalPrice.toLocaleString()}
                                </span>
                                <span className="text-sm text-red-600">
                                  ¥{product.price.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500">(税込)</span>
                              </>
                            ) : (
                              <>
                                <span className="text-sm text-gray-900">
                                  ¥{product.price.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500">(税込)</span>
                              </>
                            )}
                          </div>

                          {/* 商品名 */}
                          <h3 className="text-sm text-gray-900 line-clamp-1 mt-1">
                            {product.name}
                          </h3>

                          {/* カテゴリー */}
                          <p className="text-xs text-gray-500">
                            {categoryLabels[product.category]}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-500">
                      条件に一致する商品が見つかりませんでした
                    </p>
                  </div>
                )}

                {/* ページネーション */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      前へ
                    </button>
                    <span className="text-sm text-gray-700">
                      {currentPage} / {totalPages} ページ
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      次へ
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
