import {
  collection,
  doc,
  getDocs,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../types";

const COLLECTION_NAME = "products";

// Firestore のドキュメントを Product 型に変換
function docToProduct(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    name: data.name as string,
    description: data.description as string,
    longDescription: data.longDescription as string | undefined,
    price: data.price as number,
    originalPrice: data.originalPrice as number | undefined,
    stock: data.stock as number,
    category: data.category as Product["category"],
    status: data.status as Product["status"],
    images: data.images as string[] | undefined,
    rating: data.rating as number | undefined,
    reviews: data.reviews as number | undefined,
    details: data.details as Product["details"],
    createdAt: data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : data.createdAt as string,
    updatedAt: data.updatedAt instanceof Timestamp
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt as string,
  };
}

export type ProductFilter = {
  category?: Product["category"];
  minPrice?: number;
  maxPrice?: number;
};

// 公開中の商品一覧を取得（statusがactiveのみ）
export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  if (!db) throw new Error("Firestore is not initialized");

  // 複合インデックス不要のシンプルなクエリ
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  let products = snapshot.docs
    .map((doc) => docToProduct(doc.id, doc.data()))
    .filter((p) => p.status === "active");

  // カテゴリフィルタリング
  if (filter?.category) {
    products = products.filter((p) => p.category === filter.category);
  }

  // 価格フィルタリング
  if (filter?.minPrice !== undefined) {
    products = products.filter((p) => p.price >= filter.minPrice!);
  }
  if (filter?.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= filter.maxPrice!);
  }

  // createdAtで降順ソート
  products.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  return products;
}

// 商品詳細を取得
export async function getProductById(id: string): Promise<Product | null> {
  if (!db) throw new Error("Firestore is not initialized");

  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  const product = docToProduct(snapshot.id, snapshot.data());

  // 非公開商品は表示しない
  if (product.status !== "active") {
    return null;
  }

  return product;
}

// 関連商品を取得（同じカテゴリの商品）
export async function getRelatedProducts(
  category: Product["category"],
  excludeId: string,
  limitCount: number = 4
): Promise<Product[]> {
  if (!db) throw new Error("Firestore is not initialized");

  // 複合インデックス不要のシンプルなクエリ
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const products = snapshot.docs
    .map((doc) => docToProduct(doc.id, doc.data()))
    .filter((p) => p.status === "active" && p.category === category && p.id !== excludeId)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, limitCount);

  return products;
}

// カテゴリ別の商品数を取得
export async function getProductCountByCategory(): Promise<Record<string, number>> {
  if (!db) throw new Error("Firestore is not initialized");

  const products = await getProducts();
  const counts: Record<string, number> = {
    all: products.length,
    supplement: 0,
    equipment: 0,
    wear: 0,
    accessories: 0,
    other: 0,
  };

  products.forEach((product) => {
    counts[product.category]++;
  });

  return counts;
}
