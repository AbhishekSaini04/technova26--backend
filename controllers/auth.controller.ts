import { Request, Response } from "express";
import {prisma} from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {generateOTP} from "../services/generateO TP.service";
import {sendOTP} from "../services/sendOTP.service";
import { log } from "node:console";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Generate OTP
  const otp = generateOTP(6);

  // Hash OTP & password
  const otpHash = await bcrypt.hash(otp, 10);
  const passwordHash = await bcrypt.hash(password, 10);

  // Store OTP temporarily
  await prisma.otp.upsert({
    where: { email },
    update: {
      otpHash,
      passwordHash,
      name,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    },
    create: {
      email,
      otpHash,
      passwordHash,
      name,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    }
  });

  // Send OTP email
  await sendOTP(name,email, otp);

  return res.json({ alert: "OTP sent to email" });
};

export const login = async (req: Request, res: Response) => {
  
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.json({ token });
};
