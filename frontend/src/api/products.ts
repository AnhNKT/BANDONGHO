import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Product } from "../types";

export const getProductsByBrand = async (brandKey: string): Promise<Product[]> => {
  try {
    // Lấy collection dựa trên brandKey (ví dụ "rolex", "casio", …)
    const productsRef = collection(db, brandKey); 
    const snapshot = await getDocs(productsRef);
    const products: Product[] = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as Product));
    return products;
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return [];
  }
};
