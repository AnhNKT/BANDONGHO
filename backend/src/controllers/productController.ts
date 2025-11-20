import { Request, Response } from "express";
import { Model } from "mongoose";
import ProductModel, { getProductModelByBrand, IProduct } from "../models/Product";

// =================== PUBLIC CONTROLLERS ===================

// Lấy tất cả sản phẩm từ default collection
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().lean().exec();
    res.json(products);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy sản phẩm theo _id từ default collection
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id).lean().exec();

    if (!product) return res.status(404).json({ message: `Không tìm thấy sản phẩm với id: ${id}` });

    res.json(product);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy tất cả sản phẩm theo brand (dynamic collection)
export const getProductsByBrand = async (req: Request, res: Response) => {
  try {
    const { brand } = req.params;
    if (!brand) return res.status(400).json({ message: "Thiếu brand" });

    const Product: Model<IProduct> = getProductModelByBrand(brand);
    const products = await Product.find().lean().exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm cho brand: ${brand}` });
    }

    res.json(products);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy 1 sản phẩm theo brand + id
export const getProductByBrandId = async (req: Request, res: Response) => {
  try {
    const { brand, id } = req.params;
    if (!brand || !id) return res.status(400).json({ message: "Thiếu brand hoặc id" });

    const Product: Model<IProduct> = getProductModelByBrand(brand);
    const product = await Product.findById(id).lean().exec();

    if (!product) return res.status(404).json({ message: `Không tìm thấy sản phẩm với id: ${id}` });

    res.json(product);
  } catch (err) {
    console.error("Lỗi server:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// =================== ADMIN CONTROLLERS ===================

// Tạo sản phẩm mới vào default collection
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Lỗi tạo sản phẩm:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật sản phẩm trong default collection
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true }).lean().exec();

    if (!updatedProduct) return res.status(404).json({ message: `Không tìm thấy sản phẩm với id: ${id}` });

    res.json(updatedProduct);
  } catch (err) {
    console.error("Lỗi cập nhật sản phẩm:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa sản phẩm trong default collection
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id).lean().exec();

    if (!deletedProduct) return res.status(404).json({ message: `Không tìm thấy sản phẩm với id: ${id}` });

    res.json({ message: "Xóa sản phẩm thành công", product: deletedProduct });
  } catch (err) {
    console.error("Lỗi xóa sản phẩm:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
