import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price?: number;
  brand?: string;
  image?: string;
  stock?: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    brand: { type: String },
    image: { type: String },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export const getProductModelByBrand = (brand: string) => {
  const collectionName = brand.toLowerCase();
  if (mongoose.models[collectionName]) return mongoose.models[collectionName];
  return mongoose.model(collectionName, productSchema, collectionName);
};

export default Product;
