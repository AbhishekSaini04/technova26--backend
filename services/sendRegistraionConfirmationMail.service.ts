import { Request, Response } from "express";
import { transporter1, transporter2 } from "./mailConnect.service";
import { registrationConfirmationMail } from "../utils/registrationConfirmationMailTamplate.util";
import { getMailIdCount, mailIdCounter } from "../utils/mailCounter.util";
const mails = process.env.EMAILS?.split(",") ?? [];
const transporter = [transporter1, transporter2];
export const sendRegistrationConfirmation = async (
  name: string,
  email: string,
  eventName: string,
  eventDateTime: string,
  eventVenue: string,
  teamMembers: any[],
) => {
  try {
    const info = await transporter[getMailIdCount()].sendMail({
      from: mails[getMailIdCount()]?.trim() ?? process.env.EMAIL, // sender address
      to: email, 
      subject: "Technova'26: Registration Confirmation", // The title or subject of the email
      html: registrationConfirmationMail({
        userName: name,
        eventName,
        eventDateTime,
        eventVenue,
        teamMembers,
      }),
    });
    mailIdCounter();
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
