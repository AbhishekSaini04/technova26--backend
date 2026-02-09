import { transporter } from "./mailConnect.service";
import { registrationConfirmationMail } from "../utils/registrationConfirmationMailTamplate.util";
import { getMailIdCount, mailIdCounter } from "../utils/mailCounter.util";
const mails = process.env.EMAILS?.split(",") ?? [];
export const sendRegistrationConfirmation = async (name, email, eventName, eventDateTime, eventVenue, teamMembers) => {
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
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
