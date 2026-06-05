import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Initialize Resend client lazily to avoid build-time errors
let resend = null;
function getResendClient() {
    if (!resend && process.env.RESEND_API_KEY) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
}

/**
 * Generate a cryptographically secure email verification token
 */
export function generateEmailVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Get email verification link
 */
export function getEmailVerificationLink(token) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}/verify-email?token=${token}`;
}

/**
 * Send email verification email using Resend (preferred)
 */
async function sendVerificationEmailResend(to, name, verificationLink) {
    try {
        const client = getResendClient();
        if (!client) {
            throw new Error('Resend API key not configured');
        }
        const { data, error } = await client.emails.send({
            from: 'business@infinityloanservices.com',
            to: to,
            subject: 'Verify Your Email Address – Infinity Loans & Business Solutions',
            html: `
                <div style="margin:0;padding:0;background:#f6f7fb">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%">
                        <tr>
                            <td style="padding:24px 12px">
                                <table role="presentation" width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse:separate;width:100%;max-width:600px;background:#ffffff;border:1px solid #e8ebf3;border-radius:16px;overflow:hidden">
                                    <tr>
                                        <td style="padding:18px 20px;background:linear-gradient(135deg,#0b1220,#111827)">
                                            <div style="font-family:Arial,sans-serif;font-size:14px;color:#ffffff;letter-spacing:0.6px;font-weight:700;text-transform:uppercase">Infinity Loans & Business Solutions</div>
                                            <div style="font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px">Email Verification</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:22px 20px 10px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#111827">Hello ${name},</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Thank you for registering with Infinity Loans & Business Solutions.</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Please verify your email address by clicking the button below.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:10px 20px">
                                            <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                <tr>
                                                    <td style="background:#00AEEF;border-radius:8px">
                                                        <a href="${verificationLink}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;text-align:center">Verify Email</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:8px 20px 22px 20px">
                                            <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280">This verification link will expire in 24 hours.</div>
                                            <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280;margin-top:8px">If you did not create this account, please ignore this email.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #eef2ff">
                                            <div style="font-family:Arial,sans-serif;font-size:11px;color:#9ca3af">Regards,<br>Infinity Loans & Business Solutions<br><a href="https://www.infinityloanservices.com" style="color:#00AEEF;text-decoration:none">https://www.infinityloanservices.com</a></div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            `
        });

        if (error) {
            console.error('[Email Verification Service] Resend error:', error);
            throw error;
        }

        console.log('[Email Verification Service] Verification email sent via Resend:', data);
        return { success: true, data };
    } catch (error) {
        console.error('[Email Verification Service] Resend failed:', error);
        throw error;
    }
}

/**
 * Send email verification email using Nodemailer (fallback)
 */
async function sendVerificationEmailNodemailer(to, name, verificationLink) {
    const emailPort = parseInt(process.env.EMAIL_PORT || "465");
    const emailSecure = process.env.EMAIL_SECURE !== undefined ? process.env.EMAIL_SECURE === "true" : emailPort === 465;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: emailPort,
        secure: emailSecure,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'business@infinityloanservices.com',
        to: to,
        subject: 'Verify Your Email Address – Infinity Loans & Business Solutions',
        html: `
            <div style="margin:0;padding:0;background:#f6f7fb">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%">
                    <tr>
                        <td style="padding:24px 12px">
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse:separate;width:100%;max-width:600px;background:#ffffff;border:1px solid #e8ebf3;border-radius:16px;overflow:hidden">
                                <tr>
                                    <td style="padding:18px 20px;background:linear-gradient(135deg,#0b1220,#111827)">
                                        <div style="font-family:Arial,sans-serif;font-size:14px;color:#ffffff;letter-spacing:0.6px;font-weight:700;text-transform:uppercase">Infinity Loans & Business Solutions</div>
                                        <div style="font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.75);margin-top:6px">Email Verification</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:22px 20px 10px 20px">
                                        <div style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#111827">Hello ${name},</div>
                                        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Thank you for registering with Infinity Loans & Business Solutions.</div>
                                        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Please verify your email address by clicking the button below.</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:10px 20px">
                                        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                            <tr>
                                                <td style="background:#00AEEF;border-radius:8px">
                                                    <a href="${verificationLink}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;text-align:center">Verify Email</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:8px 20px 22px 20px">
                                        <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280">This verification link will expire in 24 hours.</div>
                                        <div style="font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7280;margin-top:8px">If you did not create this account, please ignore this email.</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #eef2ff">
                                        <div style="font-family:Arial,sans-serif;font-size:11px;color:#9ca3af">Regards,<br>Infinity Loans & Business Solutions<br><a href="https://www.infinityloanservices.com" style="color:#00AEEF;text-decoration:none">https://www.infinityloanservices.com</a></div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Email Verification Service] Verification email sent via Nodemailer:', info.messageId);
    return { success: true, data: info };
}

/**
 * Send email verification email (tries Resend first, falls back to Nodemailer)
 */
export async function sendVerificationEmail(to, name, verificationLink) {
    // Try Resend first (preferred)
    if (process.env.RESEND_API_KEY) {
        try {
            return await sendVerificationEmailResend(to, name, verificationLink);
        } catch (error) {
            console.error('[Email Verification Service] Resend failed, trying Nodemailer fallback:', error);
            // Fall through to Nodemailer
        }
    }

    // Fallback to Nodemailer
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            return await sendVerificationEmailNodemailer(to, name, verificationLink);
        } catch (error) {
            console.error('[Email Verification Service] Nodemailer failed:', error);
            throw new Error('Failed to send verification email. Both Resend and Nodemailer failed.');
        }
    }

    throw new Error('No email service configured. Please set RESEND_API_KEY or EMAIL_HOST/EMAIL_USER/EMAIL_PASS environment variables.');
}

/**
 * Send welcome email using Resend (preferred)
 */
async function sendWelcomeEmailResend(to, name) {
    try {
        const client = getResendClient();
        if (!client) {
            throw new Error('Resend API key not configured');
        }
        const { data, error } = await client.emails.send({
            from: 'business@infinityloanservices.com',
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
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Your email has been successfully verified.</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Welcome to Infinity Loans & Business Solutions.</div>
                                            <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">You can now access your account and explore our services.</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #eef2ff">
                                            <div style="font-family:Arial,sans-serif;font-size:11px;color:#9ca3af">Regards,<br>Infinity Loans & Business Solutions<br><a href="https://www.infinityloanservices.com" style="color:#00AEEF;text-decoration:none">https://www.infinityloanservices.com</a></div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            `
        });

        if (error) {
            console.error('[Email Verification Service] Resend welcome email error:', error);
            throw error;
        }

        console.log('[Email Verification Service] Welcome email sent via Resend:', data);
        return { success: true, data };
    } catch (error) {
        console.error('[Email Verification Service] Resend welcome email failed:', error);
        throw error;
    }
}

/**
 * Send welcome email using Nodemailer (fallback)
 */
async function sendWelcomeEmailNodemailer(to, name) {
    const emailPort = parseInt(process.env.EMAIL_PORT || "465");
    const emailSecure = process.env.EMAIL_SECURE !== undefined ? process.env.EMAIL_SECURE === "true" : emailPort === 465;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: emailPort,
        secure: emailSecure,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

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
                                        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Your email has been successfully verified.</div>
                                        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">Welcome to Infinity Loans & Business Solutions.</div>
                                        <div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#4b5563;margin-top:8px">You can now access your account and explore our services.</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #eef2ff">
                                        <div style="font-family:Arial,sans-serif;font-size:11px;color:#9ca3af">Regards,<br>Infinity Loans & Business Solutions<br><a href="https://www.infinityloanservices.com" style="color:#00AEEF;text-decoration:none">https://www.infinityloanservices.com</a></div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Email Verification Service] Welcome email sent via Nodemailer:', info.messageId);
    return { success: true, data: info };
}

/**
 * Send welcome email (tries Resend first, falls back to Nodemailer)
 */
export async function sendWelcomeEmail(to, name) {
    // Try Resend first (preferred)
    if (process.env.RESEND_API_KEY) {
        try {
            return await sendWelcomeEmailResend(to, name);
        } catch (error) {
            console.error('[Email Verification Service] Resend welcome email failed, trying Nodemailer fallback:', error);
            // Fall through to Nodemailer
        }
    }

    // Fallback to Nodemailer
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            return await sendWelcomeEmailNodemailer(to, name);
        } catch (error) {
            console.error('[Email Verification Service] Nodemailer welcome email failed:', error);
            throw new Error('Failed to send welcome email. Both Resend and Nodemailer failed.');
        }
    }

    throw new Error('No email service configured. Please set RESEND_API_KEY or EMAIL_HOST/EMAIL_USER/EMAIL_PASS environment variables.');
}
