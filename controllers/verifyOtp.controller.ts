import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { error, log } from "node:console";
import { sendSignupConfirmationMail } from "../services/sendSignupConfirmationMail.service";

export const verifyOtp = async (req: Request, res: Response) => {
  try {
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
    const confirmationMailSend = await sendSignupConfirmationMail(
      record.name,
      record.email,
    );
    console.log("Confirmation mail sent:", confirmationMailSend);
    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
