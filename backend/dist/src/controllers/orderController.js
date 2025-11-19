"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = async (req, res) => {
    const order = await Order_1.default.create(req.body);
    res.json(order);
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const orders = await Order_1.default.find().populate("user", "name email");
    res.json(orders);
};
exports.getOrders = getOrders;
