"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
});
exports.default = router;
