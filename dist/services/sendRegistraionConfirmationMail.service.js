"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegistrationConfirmation = void 0;
const mailConnect_service_1 = require("./mailConnect.service");
const registrationConfirmationMailTamplate_util_1 = require("../utils/registrationConfirmationMailTamplate.util");
const mailCounter_util_1 = require("../utils/mailCounter.util");
const mails = process.env.EMAILS?.split(",") ?? [];
const sendRegistrationConfirmation = async (name, email, eventName, eventDateTime, eventVenue, teamMembers) => {
    try {
        const info = await mailConnect_service_1.transporter[(0, mailCounter_util_1.getMailIdCount)()].sendMail({
            from: mails[(0, mailCounter_util_1.getMailIdCount)()]?.trim() ?? process.env.EMAIL, // sender address
            to: email,
            subject: "Technova'26: Registration Confirmation", // The title or subject of the email
            html: (0, registrationConfirmationMailTamplate_util_1.registrationConfirmationMail)({
                userName: name,
                eventName,
                eventDateTime,
                eventVenue,
                teamMembers,
            }),
        });
        (0, mailCounter_util_1.mailIdCounter)();
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendRegistrationConfirmation = sendRegistrationConfirmation;
