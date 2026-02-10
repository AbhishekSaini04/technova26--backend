import { transporter } from "./mailConnect.service";
import { getMailIdCount, mailIdCounter } from "../utils/mailCounter.util";
import { signupConfirmationMailTamplate } from "../utils/signupConfirmationMailTamplate";
const mails = process.env.EMAILS?.split(",") ?? [];
export const sendSignupConfirmationMail = async (
  name: string,
  email: string,
) => {
  try {
    const info = await transporter[getMailIdCount()].sendMail({
      from: mails[getMailIdCount()]?.trim() ?? process.env.EMAIL, // sender address
      to: email, // recipient email address
      subject: "Technova'26:Welcome to Technova26", // The title or subject of the email
      html: signupConfirmationMailTamplate({ userName: name, email }), // HTML content of the email
    });
    mailIdCounter();
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
