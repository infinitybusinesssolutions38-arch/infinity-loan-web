import nodemailer from "nodemailer";

// Create Gmail transporter for admin emails
export const createGmailTransporter = () => {
  const host =
    process.env.EMAIL_SMTP_HOST ||
    process.env.EMAIL_smtp_HOST ||
    "smtp.gmail.com";
  const port = parseInt(
    process.env.EMAIL_SMTP_PORT || process.env.EMAIL_smtp_PORT || "465",
    10
  );
  const user =
    process.env.EMAIL_SMTP_USER ||
    process.env.EMAIL_HOST_USER ||
    process.env.EMAIL_USER;
  const pass =
    process.env.EMAIL_SMTP_PASS ||
    process.env.EMAIL_HOST_PASSWORD ||
    process.env.EMAIL_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure: true, // Gmail uses SSL on port 465
    auth: {
      user,
      pass,
    },
  });
};
