import nodemailer from "nodemailer";

// Create Gmail transporter for admin emails
export const createGmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_smtp_HOST,
    port: parseInt(process.env.EMAIL_smtp_PORT),
    secure: true, // Gmail uses SSL on port 465
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  });
};
