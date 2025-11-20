// src/api/productsApi.ts
import type { Product } from "../types";

export const getProductsByBrand = async (brand: string): Promise<Product[]> => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/products/brand/${brand}`);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Lỗi server");
    }
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return [];
  }
};
