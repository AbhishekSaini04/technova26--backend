"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendSignupConfirmationMail_service_1 = require("../services/sendSignupConfirmationMail.service");
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const record = await prisma_1.default.otp.findUnique({ where: { email } });
        if (!record) {
            return res.status(400).json({ message: "OTP not found" });
        }
        //  Check expiry
        if (record.expiresAt < new Date()) {
            return res.status(400).json({ error: "OTP expired" });
        }
        // Verify OTP
        const isValid = await bcrypt_1.default.compare(otp, record.otpHash);
        if (!isValid) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        // Create user
        await prisma_1.default.user.create({
            data: {
                name: record.name,
                email: record.email,
                password: record.passwordHash,
                role: "USER",
            },
        });
        // Cleanup
        await prisma_1.default.otp.delete({ where: { email } });
        const confirmationMailSend = await (0, sendSignupConfirmationMail_service_1.sendSignupConfirmationMail)(record.name, record.email);
        console.log("Confirmation mail sent:", confirmationMailSend);
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: "User not found" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.json({ message: "User registered successfully", token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.verifyOtp = verifyOtp;
