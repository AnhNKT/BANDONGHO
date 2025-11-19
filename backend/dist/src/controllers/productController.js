"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    const products = await Product_1.default.find();
    res.json(products);
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    const product = await Product_1.default.create(req.body);
    res.json(product);
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    await Product_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sản phẩm" });
};
exports.deleteProduct = deleteProduct;
