import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../types";

/**
 * Lấy toàn bộ sản phẩm từ collection tên là brandKey
 */
export const getProductsByBrand = async (brandKey: string): Promise<Product[]> => {
  try {
    // brandKey chính là tên collection
    const productsRef = collection(db, brandKey); 
    const snapshot = await getDocs(productsRef);
    const products: Product[] = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as Product));
    return products;
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return [];
  }
};
