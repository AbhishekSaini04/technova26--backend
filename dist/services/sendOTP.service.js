"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const mailConnect_service_1 = require("./mailConnect.service");
const otpMailTamplate_util_1 = require("../utils/otpMailTamplate.util");
const mailCounter_util_1 = require("../utils/mailCounter.util");
const mails = process.env.EMAILS?.split(",") ?? [];
const sendOTP = async (name, email, otp) => {
    try {
        const info = await mailConnect_service_1.transporter[(0, mailCounter_util_1.getMailIdCount)()].sendMail({
            from: mails[(0, mailCounter_util_1.getMailIdCount)()]?.trim() ?? process.env.EMAIL, // sender address
            to: email, // recipient email address
            subject: "Technova'26:OTP for Registration", // The title or subject of the email
            html: (0, otpMailTamplate_util_1.otpEmailTemplate)(otp, name) // HTML content of the email
        });
        (0, mailCounter_util_1.mailIdCounter)();
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendOTP = sendOTP;
