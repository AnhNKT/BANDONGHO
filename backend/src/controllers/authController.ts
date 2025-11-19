import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ username, password, role });

  res.json({ message: "User created" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (password !== user.password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = generateToken(user._id.toString(), user.role);

  res.json({
    token,
    user: {
      username: user.username,
      role: user.role,
    }
  });
};
