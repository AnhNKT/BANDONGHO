import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  const order = await Order.create(req.body);
  res.json(order);
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};
