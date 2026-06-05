import nodemailer from 'nodemailer';

/**
 * Send welcome email using existing Nodemailer configuration
 */
export async function sendWelcomeEmail(to, name) {
    console.log(`[Welcome Email Service] Starting sendWelcomeEmail for ${to}, name: ${name}`);
    console.log(`[Welcome Email Service] Email configuration check:`, {
        EMAIL_HOST: process.env.EMAIL_HOST ? 'SET' : 'NOT SET',
        EMAIL_PORT: process.env.EMAIL_PORT || '465',
        EMAIL_SECURE: process.env.EMAIL_SECURE,
        EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'NOT SET',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
        EMAIL_FROM: process.env.EMAIL_FROM || 'business@infinityloanservices.com'
    });

    try {
        const emailPort = parseInt(process.env.EMAIL_PORT || "465");
        const emailSecure = process.env.EMAIL_SECURE !== undefined ? process.env.EMAIL_SECURE === "true" : emailPort === 465;

        console.log(`[Welcome Email Service] Creating transporter with host: ${process.env.EMAIL_HOST}, port: ${emailPort}, secure: ${emailSecure}`);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: emailPort,
            secure: emailSecure,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log(`[Welcome Email Service] Transporter created successfully`);

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'business@infinityloanservices.com',
            to: to,
            subject: 'Welcome to Infinity Loans & Business Solutions',
            html: `
                <div style="margin:0;padding:0;background:#f6f7fb">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%">
                        <tr>
                            <td style="padding:24px 12px">
                                <table role="presentation" width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse:separate;width:100%;max-width:600px;background:#ffffff;border:1px solid #e8ebf3;border-radius:16px;overflow:hidden">
                                    <tr>
                                        <td style="padding:18px 20px;background:linear-gradient(135deg,#0b1220,#111827)">
                                            <div style="font-family:Arial,sans-serif;font-size:14px;color:#ffffff;letter-spacing:0.6px;font-weight:700;text-transform:uppercase">Infinity Loans & Business Solutions</div>
                                            <div style="font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px">Welcome</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:22px 20px 10px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#111827">Hello ${name},</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Welcome to Infinity Loans & Business Solutions.</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Your registration has been successfully completed and your account is now active.</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">We are delighted to have you with us.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:10px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563">At Infinity Loans & Business Solutions, we are committed to helping individuals and businesses access the right financial solutions with a smooth and transparent experience.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:10px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563">You can now explore our loan services, financing options, and support resources through our platform.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:10px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563">If you have any questions, our team is always ready to assist you.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:10px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563">Thank you for choosing Infinity Loans & Business Solutions.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #eef2ff">
                                            <div style="font-family:Arial,sans-serif;font-size:11px;color:#9ca3af">Warm Regards,<br>Infinity Loans & Business Solutions<br><a href="mailto:business@infinityloanservices.com" style="color:#00AEEF;text-decoration:none">business@infinityloanservices.com</a><br><a href="https://www.infinityloanservices.com" style="color:#00AEEF;text-decoration:none">https://www.infinityloanservices.com</a></div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            `
        };

        console.log(`[Welcome Email Service] Sending email to ${to} from ${process.env.EMAIL_FROM || 'business@infinityloanservices.com'}`);
        const info = await transporter.sendMail(mailOptions);
        console.log(`[Welcome Email Service] Welcome email sent successfully to ${to}. MessageID: ${info.messageId}`);
        console.log(`[Welcome Email Service] Email provider response:`, info);
        return { success: true, data: info };
    } catch (error) {
        console.error(`[Welcome Email Service] Failed to send welcome email to ${to}:`, error);
        console.error(`[Welcome Email Service] Error details:`, {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode
        });
        throw error;
    }
}
