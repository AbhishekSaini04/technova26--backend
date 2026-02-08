import { Request, Response } from "express";
import { transporter } from "./mailConnect.service";
import { registrationConfirmationMail } from "../utils/registrationConfirmationMailTamplate.util";
import { getMailIdCount,mailIdCounter } from "../utils/mailCounter.util";
const mails = process.env.EMAILS?.split(",") ?? [];
export const sendRegistrationConfirmation = async ( name: string , email: string , eventName: string, eventDateTime: string, eventVenue: string, teamMembers: any[]) => {
try {
    const info = await transporter.sendMail({
      from:  mails[getMailIdCount()]?.trim() ?? process.env.EMAIL, // sender address
      to: email, // recipient email address
      subject: "Technova'26: Registration Confirmation", // The title or subject of the email
      html: registrationConfirmationMail({ userName: name, eventName, eventDateTime, eventVenue, teamMembers }) // HTML content of the email
    });
    mailIdCounter();
  } catch (error) {
    console.error("Error sending email:", error);
  }}