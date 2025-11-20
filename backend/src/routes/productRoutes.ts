import express from "express";
import type { Model, Document } from "mongoose";
// fallback IProduct type if '../types/index' is not present
type IProduct = Document & Record<string, any>;
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { protect, adminOnly } from "../middleware/authMiddleware";
import { getProductModelByBrand } from "../models/Product";

const router = express.Router();

// =============== Public Routes ===============

// Lấy sản phẩm theo brand (dynamic collection)
router.get("/brand/:brand", async (req, res) => {
  try {
    const { brand } = req.params;
    if (!brand) return res.status(400).json({ message: "Thiếu brand" });

    const Product = getProductModelByBrand(brand) as Model<IProduct>;
    const products = await Product.find().lean().exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm cho brand: ${brand}` });
    }

    res.json(products);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Lấy 1 sản phẩm theo brand + product id
router.get("/brand/:brand/:id", async (req, res) => {
  try {
    const { brand, id } = req.params;
    if (!brand || !id) return res.status(400).json({ message: "Thiếu brand hoặc id" });

    const Product = getProductModelByBrand(brand) as Model<IProduct>;
    const product = await Product.findById(id).lean().exec();

    if (!product) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm với id: ${id}` });
    }

    res.json(product);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Lấy tất cả sản phẩm chung (admin/public)
router.get("/", getProducts);

// Lấy 1 sản phẩm theo id từ default collection
router.get("/:id", getProductById);

// =============== Admin Routes ===============
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
