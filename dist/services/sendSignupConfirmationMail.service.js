"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignupConfirmationMail = void 0;
const mailConnect_service_1 = require("./mailConnect.service");
const mailCounter_util_1 = require("../utils/mailCounter.util");
const signupConfirmationMailTamplate_1 = require("../utils/signupConfirmationMailTamplate");
const mails = process.env.EMAILS?.split(",") ?? [];
const sendSignupConfirmationMail = async (name, email) => {
    try {
        const info = await mailConnect_service_1.transporter[(0, mailCounter_util_1.getMailIdCount)()].sendMail({
            from: mails[(0, mailCounter_util_1.getMailIdCount)()]?.trim() ?? process.env.EMAIL, // sender address
            to: email, // recipient email address
            subject: "Technova'26:Welcome to Technova26", // The title or subject of the email
            html: (0, signupConfirmationMailTamplate_1.signupConfirmationMailTamplate)({ userName: name, email }), // HTML content of the email
        });
        (0, mailCounter_util_1.mailIdCounter)();
        return info;
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendSignupConfirmationMail = sendSignupConfirmationMail;
