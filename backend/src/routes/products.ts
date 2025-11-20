import express from "express";
import Product from "../models/Product";

const router = express.Router();

// GET tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET sản phẩm theo brand
router.get("/brand/:brand", async (req, res) => {
  try {
    const { brand } = req.params;
    if (!brand) return res.status(400).json({ message: "Thiếu brand" });

    const products = await Product.find({ brand: { $regex: new RegExp(`^${brand}$`, "i") } });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm cho thương hiệu "${brand}"` });
    }

    res.json(products);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
