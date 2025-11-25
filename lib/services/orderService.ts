import {
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Order, CartItem } from "../types";

const COLLECTION_NAME = "orders";

// 注文番号を生成
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `ORD-${year}${month}${day}-${random}`;
}

export type CreateOrderInput = {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    zipCode: string;
    prefecture: string;
    city: string;
    address: string;
    building?: string;
  };
  cartItems: CartItem[];
  paymentMethod: Order["paymentMethod"];
};

// 注文を作成
export async function createOrder(input: CreateOrderInput): Promise<{
  orderId: string;
  orderNumber: string;
}> {
  if (!db) throw new Error("Firestore is not initialized");

  const now = Timestamp.now();
  const orderNumber = generateOrderNumber();

  // カートアイテムから注文アイテムに変換
  const items = input.cartItems.map((item) => ({
    productId: item.id,
    productName: item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  }));

  // 金額計算
  const subtotal = input.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.floor(subtotal * 0.1); // 10%税
  const shipping = subtotal >= 10000 ? 0 : 500; // 10,000円以上で送料無料
  const total = subtotal + tax + shipping;

  const orderData = {
    orderNumber,
    customer: input.customer,
    shippingAddress: input.shippingAddress,
    items,
    subtotal,
    tax,
    shipping,
    total,
    paymentMethod: input.paymentMethod,
    paymentStatus: "pending" as const,
    status: "pending" as const,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), orderData);

  return {
    orderId: docRef.id,
    orderNumber,
  };
}

// 金額計算ユーティリティ
export function calculateOrderTotals(cartItems: CartItem[]): {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
} {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.floor(subtotal * 0.1);
  const shipping = subtotal >= 10000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
}
