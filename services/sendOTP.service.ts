import { Request, Response } from "express";
import { transporter } from "./mailConnect.service";
import { otpEmailTemplate } from "../utils/otpMailTamplate.util";

export const sendOTP = async ( name: string , email: string , otp: string) => {
try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL1, // sender address
      to: email, // recipient email address
      subject: "Technova'26:OTP for Registration", // The title or subject of the email
      html: otpEmailTemplate(otp, name) // HTML content of the email
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }}