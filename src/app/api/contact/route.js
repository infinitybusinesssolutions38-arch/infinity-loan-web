import { NextResponse } from "next/server";
import ContactModel from "../models/contact-schema";
import connectDB from "../lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const requiredFields = [
            "firstname",
            "lastname",
            "email",
            "subject",
            "mobile",
            "message",
        ];
        for (const field of requiredFields) {
            if (!body?.[field]) {
                return NextResponse.json(
                    { success: false, error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        const contactData = new ContactModel(body);
        await contactData.save();

        const companyName = process.env.COMPANY_NAME || "Infinity Loan Services";
        const fromEmail =
            process.env.FROM_EMAIL ||
            process.env.EMAIL_FROM ||
            process.env.SMTP_USER ||
            process.env.EMAIL_USER;

        const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST;
        const smtpPort = process.env.SMTP_PORT || process.env.EMAIL_PORT;
        const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
        const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
        const smtpSecureRaw = process.env.SMTP_SECURE || process.env.EMAIL_SECURE;

        let emailSent = false;
        let emailError = null;

        if (
            smtpHost &&
            smtpPort &&
            smtpUser &&
            smtpPass &&
            fromEmail
        ) {
            try {
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: Number(smtpPort),
                    secure: String(smtpSecureRaw || "").toLowerCase() === "true",
                    auth: {
                        user: smtpUser,
                        pass: smtpPass,
                    },
                });

                const customerName = `${body.firstname} ${body.lastname}`.trim();
                const subjectSafe = String(body.subject || "").trim();

                const mailSubject = `We received your message - ${companyName}`;

                const text =
                    `Hi ${customerName || "there"},\n\n` +
                    `Thank you for contacting ${companyName}. We have received your message and our team will get back to you shortly.\n\n` +
                    `Your details:\n` +
                    `Subject: ${subjectSafe}\n` +
                    `Message: ${String(body.message || "").trim()}\n\n` +
                    `If you have any additional information to share, you can reply to this email.\n\n` +
                    `Regards,\n` +
                    `${companyName} Team\n`;

                const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${companyName}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #eee;border-radius:16px;overflow:hidden;">
        <div style="background:#F97415;padding:18px 20px;color:#ffffff;">
          <div style="font-size:18px;font-weight:700;line-height:1.2;">${companyName}</div>
          <div style="font-size:12px;opacity:.95;margin-top:4px;">We’ve received your message</div>
        </div>
        <div style="padding:20px;color:#111827;">
          <p style="margin:0 0 12px;font-size:14px;line-height:1.6;">Hi <strong>${
                    customerName || "there"
                }</strong>,</p>
          <p style="margin:0 0 12px;font-size:14px;line-height:1.6;">Thanks for reaching out to <strong>${companyName}</strong>. We have received your message and our team will get back to you as soon as possible.</p>
          <div style="margin:16px 0;padding:14px;border:1px solid #fde3d2;background:#fff7f1;border-radius:12px;">
            <div style="font-size:13px;font-weight:700;color:#F97415;margin-bottom:8px;">Your submitted details</div>
            <div style="font-size:13px;line-height:1.6;">
              <div><strong>Subject:</strong> ${subjectSafe || "(not provided)"}</div>
              <div style="margin-top:8px;"><strong>Message:</strong></div>
              <div style="white-space:pre-wrap;">${String(body.message || "").replace(
                    /</g,
                    "&lt;"
                )}</div>
            </div>
          </div>
          <p style="margin:0 0 6px;font-size:13px;line-height:1.6;color:#374151;">If you want to add more details, just reply to this email.</p>
          <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#374151;">Regards,<br/>${companyName} Team</p>
        </div>
        <div style="padding:14px 20px;border-top:1px solid #eee;font-size:12px;color:#6b7280;background:#fafafa;">
          This is an automated confirmation email. Please do not share sensitive information.
        </div>
      </div>
    </div>
  </body>
</html>`;

                await transporter.sendMail({
                    from: `${companyName} <${fromEmail}>`,
                    to: body.email,
                    subject: mailSubject,
                    text,
                    html,
                    replyTo: fromEmail,
                });

                emailSent = true;
            } catch (err) {
                console.log(err);
                emailError = "failed_to_send_auto_reply";
            }
        } else {
            emailError = "smtp_not_configured";
        }

        return NextResponse.json({
            success: true,
            data: contactData,
            emailSent,
            emailError,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: "internal server error" },
            { status: 500 }
        );
    }
}

