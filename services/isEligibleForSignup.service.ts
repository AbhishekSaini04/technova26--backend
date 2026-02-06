
import { Request, Response } from "express";
import {prisma} from "../lib/prisma";
import bcrypt from "bcrypt";
import {generateOTP} from "../services/generateO TP.service";
import {sendOTP} from "../services/sendOTP.service";

export const isEligibleForSignup = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;
if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

const otp = generateOTP(6);
console.log(otp);
await sendOTP( name, email, otp);
  return res.status(200).json({ OTP: otp, message: "Eligible for signup" });
}