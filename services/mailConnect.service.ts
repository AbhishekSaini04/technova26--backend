import nodemailer from "nodemailer";
import { getMailIdCount } from "../utils/mailCounter.util";
const mails = process.env.EMAILS?.split(",") ?? [];
const passwords = process.env.EMAIL_PASSWORDS?.split(",") ?? [];

console.log('====================================');
console.log(mails[getMailIdCount()]?.trim() ?? process.env.MAIL);
console.log('====================================');
 export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: mails[getMailIdCount()]?.trim() ?? process.env.MAIL,
        pass: passwords[getMailIdCount()]?.trim() ?? process.env.MAIL_PASSWORD 
    },
    secure: true,
    port: 465
});
