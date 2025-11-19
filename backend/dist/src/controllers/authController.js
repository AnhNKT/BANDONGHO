"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User_1.default.findOne({ email });
    if (userExists)
        return res.status(400).json({ message: "Người dùng đã tồn tại" });
    const user = await User_1.default.create({ name, email, password });
    res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: (0, generateToken_1.generateToken)(user.id),
    });
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: (0, generateToken_1.generateToken)(user.id),
        });
    }
    else {
        res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }
};
exports.loginUser = loginUser;
