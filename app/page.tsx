"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const { addToCart, openCart, getTotalItems } = useCart();

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* サイドバー - 固定 */}
      <div className="hidden lg:block fixed left-0 top-0 h-full bg-gray-50 pl-8 pt-8 z-20">
        <aside className="w-48 space-y-8">
          {/* ロゴ */}
          <div className="mb-8">
            <Link href="/" className="text-lg font-light text-gray-900 tracking-widest">
              筋肉ショップ
            </Link>
          </div>

          {/* カート */}
          <div>
            <button
              onClick={openCart}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="tracking-wide">カート</span>
              {getTotalItems() > 0 && (
                <span className="bg-gray-900 text-white text-xs px-1.5 py-0.5 min-w-[20px] text-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* カテゴリー */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">カテゴリー</h3>
            <div className="space-y-0.5">
              {[
                { value: "all", label: "全て" },
                { value: "supplement", label: categoryLabels.supplement },
                { value: "equipment", label: categoryLabels.equipment },
                { value: "wear", label: categoryLabels.wear },
                { value: "accessories", label: categoryLabels.accessories },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 border-l-2 ${
                    selectedCategory === cat.value
                      ? "border-gray-900 bg-gray-100 text-gray-900 font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 価格帯 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">価格帯</h3>
            <div className="space-y-0.5">
              {[
                { value: "all", label: "全て" },
                { value: "under_2000", label: "¥2,000以下" },
                { value: "2000_5000", label: "¥2,000 - ¥5,000" },
                { value: "over_5000", label: "¥5,000以上" },
              ].map((price) => (
                <button
                  key={price.value}
                  onClick={() => handlePriceChange(price.value)}
                  className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 border-l-2 ${
                    priceRange === price.value
                      ? "border-gray-900 bg-gray-100 text-gray-900 font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {price.label}
                </button>
              ))}
            </div>
          </div>

          {/* ソート */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">並び替え</h3>
            <div className="space-y-0.5">
              {[
                { value: "new", label: "新着順" },
                { value: "popular", label: "人気順" },
                { value: "price_asc", label: "価格が安い順" },
                { value: "price_desc", label: "価格が高い順" },
              ].map((sort) => (
                <button
                  key={sort.value}
                  onClick={() => handleSortChange(sort.value)}
                  className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 border-l-2 ${
                    sortBy === sort.value
                      ? "border-gray-900 bg-gray-100 text-gray-900 font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>

          {/* フッターリンク */}
          <div className="pt-8 border-t border-gray-200">
            <div className="space-y-2 text-xs text-gray-400">
              <Link href="/shipping" className="block hover:text-gray-600">発送について</Link>
              <Link href="/returns" className="block hover:text-gray-600">返品・交換</Link>
              <Link href="/contact" className="block hover:text-gray-600">お問い合わせ</Link>
              <Link href="/terms" className="block hover:text-gray-600">利用規約</Link>
              <Link href="/privacy" className="block hover:text-gray-600">プライバシーポリシー</Link>
              <Link href="/legal" className="block hover:text-gray-600">特定商取引法</Link>
              <Link href="/company" className="block hover:text-gray-600">会社概要</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* モバイルヘッダー */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-light text-gray-900 tracking-widest">
            筋肉ショップ
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
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
        </div>

        {/* モバイル: フィルターパネル */}
        {isFilterOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-900 tracking-wide">絞り込み</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* カテゴリー */}
              <div>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">カテゴリー</h3>
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
                        className="w-3 h-3 text-gray-900"
                      />
                      <span className="ml-2 text-xs text-gray-600">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* 価格帯 */}
              <div>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">価格帯</h3>
                <div className="space-y-1">
                  {[
                    { value: "all", label: "全て" },
                    { value: "under_2000", label: "¥2,000以下" },
                    { value: "2000_5000", label: "¥2,000-¥5,000" },
                    { value: "over_5000", label: "¥5,000以上" },
                  ].map((price) => (
                    <label key={price.value} className="flex items-center">
                      <input
                        type="radio"
                        name="price-mobile"
                        value={price.value}
                        checked={priceRange === price.value}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-3 h-3 text-gray-900"
                      />
                      <span className="ml-2 text-xs text-gray-600">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* ソート */}
              <div>
                <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">並び替え</h3>
                <div className="space-y-1">
                  {[
                    { value: "new", label: "新着順" },
                    { value: "popular", label: "人気順" },
                    { value: "price_asc", label: "安い順" },
                    { value: "price_desc", label: "高い順" },
                  ].map((sort) => (
                    <label key={sort.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sort-mobile"
                        value={sort.value}
                        checked={sortBy === sort.value}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="w-3 h-3 text-gray-900"
                      />
                      <span className="ml-2 text-xs text-gray-600">{sort.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 text-sm tracking-wide">読み込み中...</div>
            </div>
          ) : error ? (
            <div className="border border-gray-300 p-6 text-center">
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-xs text-gray-400 uppercase tracking-wider">
                {sortedProducts.length} ITEMS
              </div>

              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6 lg:gap-8">
                  {paginatedProducts.map((product) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className="group block w-full sm:w-[200px]"
                    >
                      {/* 商品画像 */}
                      <div className="w-full aspect-[4/5] sm:w-[200px] sm:h-[250px] bg-gray-100 relative overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <span className="text-gray-400 text-xs tracking-wide">NO IMAGE</span>
                          </div>
                        )}
                      </div>

                      {/* 商品情報 */}
                      <div className="pt-3 sm:pt-4 w-full sm:w-[200px]">
                        {/* カテゴリー */}
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                          {categoryLabels[product.category]}
                        </p>

                        {/* 商品名 */}
                        <h3 className="text-sm text-gray-900 line-clamp-2 mb-2 tracking-wide leading-relaxed">
                          {product.name}
                        </h3>

                        {/* 価格 */}
                        <div className="flex items-baseline gap-2 flex-wrap">
                          {product.originalPrice && product.originalPrice > product.price ? (
                            <>
                              <span className="text-xs text-gray-400 line-through">
                                ¥{product.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-red-600 font-medium tracking-wide">
                                ¥{product.price.toLocaleString()}
                              </span>
                              <span className="text-xs text-red-600 font-medium">
                                {Math.round((1 - product.price / product.originalPrice) * 100)}%OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-900 tracking-wide">
                              ¥{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-sm tracking-wide">
                    条件に一致する商品が見つかりませんでした
                  </p>
                </div>
              )}

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-6 py-2 text-sm tracking-wider transition-colors ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    前へ
                  </button>
                  <span className="text-sm text-gray-500 tracking-wide">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-2 text-sm tracking-wider transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    次へ
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
