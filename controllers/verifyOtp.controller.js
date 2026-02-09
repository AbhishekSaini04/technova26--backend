import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const record = await prisma.otp.findUnique({ where: { email } });
    if (!record) {
        return res.status(400).json({ message: "OTP not found" });
    }
    //  Check expiry
    if (record.expiresAt < new Date()) {
        return res.status(400).json({ error: "OTP expired" });
    }
    // Verify OTP
    const isValid = await bcrypt.compare(otp, record.otpHash);
    if (!isValid) {
        return res.status(400).json({ error: "Invalid OTP" });
    }
    // Create user
    await prisma.user.create({
        data: {
            name: record.name,
            email: record.email,
            password: record.passwordHash,
            role: "USER",
        },
    });
    // Cleanup
    await prisma.otp.delete({ where: { email } });
    return res.json({ message: "User registered successfully" });
};
