"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mails = process.env.EMAILS?.split(",") ?? [];
const passwords = process.env.EMAIL_PASSWORDS?.split(",") ?? [];
// console.log('====================================');
// console.log(mails[getMailIdCount()]?.trim() ?? process.env.MAIL);
// console.log('====================================');
const transporter1 = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: mails[0]?.trim() ?? process.env.MAIL,
        pass: passwords[0]?.trim() ?? process.env.MAIL_PASSWORD
    },
    secure: true,
    port: 465
});
const transporter2 = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: mails[1]?.trim() ?? process.env.MAIL,
        pass: passwords[1]?.trim() ?? process.env.MAIL_PASSWORD
    },
    secure: true,
    port: 465
});
const transporter = [transporter1, transporter2];
exports.transporter = transporter;
