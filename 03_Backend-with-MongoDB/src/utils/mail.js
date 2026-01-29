import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Send an email using async/await
async function sendMail(token, email, subject){
    await transporter.sendMail({
        from: process.env.MAILTRAP_SENDER,
        to: email,
        subject: subject,
        text: `click on the following link to ${subject}: ${process.env.BASE_URL}/api/v1/users/verify/${token}`
    });
}

export default sendMail;