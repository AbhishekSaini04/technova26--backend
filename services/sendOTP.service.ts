import { Request, Response } from "express";
import { transporter} from "./mailConnect.service";
import { otpEmailTemplate } from "../utils/otpMailTamplate.util";
import {getMailIdCount, mailIdCounter } from "../utils/mailCounter.util";
const mails = process.env.EMAILS?.split(",") ?? [];
export const sendOTP = async ( name: string , email: string , otp: string) => {
try {
    const info = await transporter[getMailIdCount()].sendMail({
      from: mails[getMailIdCount()]?.trim() ?? process.env.EMAIL, // sender address
      to: email, // recipient email address
      subject: "Technova'26:OTP for Registration", // The title or subject of the email
      html: otpEmailTemplate(otp, name) // HTML content of the email
    });
    mailIdCounter();

  } catch (error) {
    console.error("Error sending email:", error);
  }}