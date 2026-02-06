import nodemailer from "nodemailer";

export  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL1, // your email address
        pass: process.env.EMAIL1_PASSWORD // the app password you generated, paste without spaces
    },
    secure: true,
    port: 465
});
