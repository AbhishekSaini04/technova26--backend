import nodemailer from "nodemailer";
import { getMailIdCount } from "../utils/mailCounter.util";
const mails = process.env.EMAILS?.split(",") ?? [];
const passwords = process.env.EMAIL_PASSWORDS?.split(",") ?? [];

console.log('====================================');
console.log(mails[getMailIdCount()]?.trim() ?? process.env.MAIL);
console.log('====================================');
 export const transporter1 = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: mails[0]?.trim() ?? process.env.MAIL,
        pass: passwords[0]?.trim() ?? process.env.MAIL_PASSWORD 
    },
    secure: true,
    port: 465
});
 export const transporter2 = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: mails[1]?.trim() ?? process.env.MAIL,
        pass: passwords[1]?.trim() ?? process.env.MAIL_PASSWORD 
    },
    secure: true,
    port: 465
});
