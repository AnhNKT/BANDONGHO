// src/routes/productRoutes.ts

import express from "express";
import mongoose, { Model, Document } from "mongoose";
import {
  getProducts,
  getProductById,
  getProductsByBrand,
  getProductByBrandId, // <-- Đã import Controller đã sửa
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { protect, adminOnly } from "../middleware/authMiddleware";
import { getProductModelByBrand } from "../models/Product";

type IProduct = Document & Record<string, any>;

const router = express.Router();

// ==================== Public Routes (Đã sửa thứ tự) ====================

// 1. Lấy tất cả sản phẩm (Chung nhất)
router.get("/", getProducts);

// 2. Lấy sản phẩm theo slug (Cụ thể)
router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(400).json({ message: "Thiếu slug" });

    // Cập nhật danh sách brand bao gồm cả TAG HEUER mà bạn vừa gửi.
    const brands = ["casio", "rolex", "seiko", "tagheuer"];
    let product: IProduct | null = null;

    for (const brand of brands) {
      // ✨ FIX: Thêm 'as unknown' để buộc TypeScript chấp nhận chuyển đổi
      const Product = getProductModelByBrand(brand) as unknown as Model<IProduct>;
      product = await Product.findOne({ slug }).lean().exec();
      if (product) break;
    }

    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json(product);
  } catch (err) {
    console.error("Lỗi server tại Route /slug/:slug:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// 3. Lấy 1 sản phẩm theo Brand và theo _id (CỤ THỂ NHẤT CHO CHI TIẾT SẢN PHẨM)
// ✨ VỊ TRÍ QUAN TRỌNG: Phải đứng trước Route 4 và 5.
router.get("/brand/:brand/:id", getProductByBrandId);

// 4. Lấy tất cả sản phẩm cùng thương hiệu (Chung hơn)
router.get("/brand/:brand", getProductsByBrand);

// 5. Lấy sản phẩm theo MongoDB _id (CHUNG NHẤT - PHẢI ĐẶT CUỐI CÙNG)
router.get("/:id", getProductById);

// ==================== Admin Routes ====================
// ... (Các Route Admin giữ nguyên)
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;