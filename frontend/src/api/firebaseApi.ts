import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../types";

export const getProductsByBrand = async (brandKey: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, brandKey); // collection phải đúng tên thương hiệu
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return [];
  }
};