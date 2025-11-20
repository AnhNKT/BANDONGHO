import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

// ================= Public Routes =================

// GET /api/products?brand=Rolex  --> Lấy tất cả sản phẩm hoặc lọc theo brand
router.get("/", getProducts);

// GET /api/products/:id  --> Lấy 1 sản phẩm theo id
router.get("/:id", getProductById);

// ================= Admin Only Routes =================
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
