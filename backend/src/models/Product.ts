import mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  brand: String,
  image: String,
  stock: Number,
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export = Product;
