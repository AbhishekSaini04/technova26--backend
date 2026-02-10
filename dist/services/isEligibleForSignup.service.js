"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEligibleForSignup = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const generateO_TP_service_1 = require("../services/generateO TP.service");
const sendOTP_service_1 = require("../services/sendOTP.service");
const isEligibleForSignup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const otp = (0, generateO_TP_service_1.generateOTP)(6);
    console.log(otp);
    await (0, sendOTP_service_1.sendOTP)(name, email, otp);
    return res.status(200).json({ OTP: otp, message: "Eligible for signup" });
};
exports.isEligibleForSignup = isEligibleForSignup;
