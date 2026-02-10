"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signedUpUsers = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateO_TP_service_1 = require("../services/generateO TP.service");
const sendOTP_service_1 = require("../services/sendOTP.service");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Generate OTP
        const otp = (0, generateO_TP_service_1.generateOTP)(6);
        // Hash OTP & password
        const otpHash = await bcrypt_1.default.hash(otp, 10);
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        // Store OTP temporarily
        await prisma_1.default.otp.upsert({
            where: { email },
            update: {
                otpHash,
                passwordHash,
                name,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
            create: {
                email,
                otpHash,
                passwordHash,
                name,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
        // Send OTP email
        await (0, sendOTP_service_1.sendOTP)(name, email, otp);
        return res.json({ alert: "OTP sent to email" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: "User not found" });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
const signedUpUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            select: {
                name: true,
                email: true,
            },
        });
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.signedUpUsers = signedUpUsers;
