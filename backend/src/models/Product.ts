// src/models/Product.ts (Đã sửa lỗi cấu hình Model dynamic)

import mongoose, { Schema, model, Model, Document } from "mongoose";


export interface IProduct extends Document {
  _id: string; // ✨ Quan trọng: Thêm _id vào interface để khớp với ID chuỗi tùy chỉnh
  name: string;
  description?: string;
  price?: number;
  brand?: string;
  image?: string;
  stock?: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    // ✨ Cần khai báo _id là string nếu bạn dùng ID chuỗi tùy chỉnh (rolex9, tag10)
    _id: { type: String, required: true }, 
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    brand: { type: String },
    image: { type: String },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true, _id: false } // ✨ _id: false để cho phép đặt _id: String
);

// Model mặc định, sử dụng cho Route /api/products và /api/products/:id
const Product: Model<IProduct> = (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>("Product", productSchema, "products"); 

export const getProductModelByBrand = (
  brand: string
): Model<IProduct> => {
  const b = brand.toLowerCase();

  // Nếu brand có collection riêng → dùng collection đó
  if (brandCollections[b as Brand]) {
    return brandCollections[b as Brand];
  }

  // Ngược lại → dùng collection "products" mặc định
  return mongoose.models.Product || model<IProduct>("Product", productSchema, "products");
};
type Brand = "casio" | "rolex" | "seiko" | "tagheuer";
const brandCollections: Record<Brand, Model<IProduct>> = {
  casio: getOrCreateBrandModel("casio"),
  rolex: getOrCreateBrandModel("rolex"),
  seiko: getOrCreateBrandModel("seiko"),
  tagheuer: getOrCreateBrandModel("tagheuer"),
};  
function getOrCreateBrandModel(collectionName: string): Model<IProduct> {

  // Tránh lỗi "Cannot overwrite model..." trong phát triển (hot reload)
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName] as Model<IProduct>;
  }
  
  // Khởi tạo và trả về Model cho collectionName đó
  return mongoose.model<IProduct>(collectionName, productSchema, collectionName);
};

export default Product;