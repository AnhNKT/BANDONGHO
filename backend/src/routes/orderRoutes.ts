import express from "express";
import { createOrder, getOrders } from "../controllers/orderController";
import authMiddleware = require("../middleware/authMiddleware");
const { protect } = authMiddleware;

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

export default router;
