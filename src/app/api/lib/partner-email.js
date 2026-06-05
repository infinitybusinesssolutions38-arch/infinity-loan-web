
import nodemailer from "nodemailer";
import { resolveDirectorRecipients, notifyDirectorInternalMail } from "./director-notification-email";

// ===============================
// Gmail SMTP Transporter
// ===============================
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_smtp_HOST,
    port: parseInt(process.env.EMAIL_smtp_PORT),
    secure: true, // Gmail SSL 465
    auth: {
      user: process.env.EMAIL_HOST_USER,      // infinityloans2026@gmail.com
      pass: process.env.EMAIL_HOST_PASSWORD,  // App password
    },
  });
};

const createPrimaryTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT || "465", 10);
  const secureEnv = typeof process.env.EMAIL_SECURE !== "undefined"
    ? String(process.env.EMAIL_SECURE).toLowerCase() === "true"
    : port === 465;

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure: secureEnv,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ======================================================
// Send Partner Confirmation Email (TO CUSTOMER)
// ======================================================
export const sendPartnerConfirmationEmail = async (partnerData) => {
  try {
    const transporter = createPrimaryTransporter();

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 0; background: #ffffff; color: #111827;">
        <div style="background: linear-gradient(135deg, #00AEEF 0%, #33C1F3 100%); padding: 36px 20px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.2px;">Channel Partner Application Received</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.95;">Infinity Loans & Business Solutions</p>
        </div>

        <div style="padding: 26px 20px; background: #ffffff; line-height: 1.7;">
          <p style="margin: 0 0 12px 0;">Dear ${partnerData?.fullName || "Partner"},</p>
          <p style="margin: 0 0 16px 0;">Thank you for registering as a Channel Partner with <strong>Infinity Loans & Business Solutions</strong>. We have received your application successfully.</p>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-left: 4px solid #00AEEF; padding: 16px; border-radius: 10px; margin: 18px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 700;">Submitted details</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #6b7280; width: 42%;">Full Name</td>
                <td style="padding: 6px 0; color: #111827; font-weight: 600;">${partnerData?.fullName || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Mobile</td>
                <td style="padding: 6px 0; color: #111827; font-weight: 600;">${partnerData?.mobileNumber || "-"}</td>
              </tr>
              ${partnerData?.email ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Email</td>
                <td style="padding: 6px 0; color: #111827; font-weight: 600;">${partnerData.email}</td>
              </tr>` : ""}
              ${(partnerData?.state || partnerData?.city || partnerData?.pincode) ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Location</td>
                <td style="padding: 6px 0; color: #111827; font-weight: 600;">${[partnerData?.city, partnerData?.state, partnerData?.pincode].filter(Boolean).join(", ") || "-"}</td>
              </tr>` : ""}
              ${partnerData?.preferredLoan ? `
              <tr>
                <td style="padding: 6px 0; color: #6b7280;">Preferred Loan</td>
                <td style="padding: 6px 0; color: #111827; font-weight: 600;">${partnerData.preferredLoan}</td>
              </tr>` : ""}
            </table>
          </div>

          <div style="margin: 18px 0; padding: 16px; border-radius: 10px; background: #fff7ed; border: 1px solid #fed7aa;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #9a3412;">Next steps</p>
            <ul style="margin: 0; padding-left: 18px; color: #7c2d12; font-size: 14px;">
              <li>Our team will review your application and documents.</li>
              <li>After reviewing your documents, we will get back to you within <strong>24–48 working hours</strong> for the onboarding process.</li>
            </ul>
          </div>

          <div style="margin: 18px 0; padding: 16px; border-radius: 10px; background: #f0f9ff; border: 1px solid #bae6fd;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #075985;">Need help?</p>
            <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
              Phone/WhatsApp: <strong>+91 90283 46300</strong><br/>
              Email: <strong>business@infinityloanservices.com</strong> | <strong>personal.infinityloans@gmail.com</strong><br/>
              Website: <strong>www.infinityloanservices.com</strong>
            </p>
          </div>

          <div style="margin: 18px 0; padding: 16px; border-radius: 10px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #374151;">Privacy note</p>
            <p style="margin: 0; color: #6b7280; font-size: 13px;">
              Your personal and business information (including documents) will be used only for verifying your profile and processing your Channel Partner onboarding. We do not sell your data to third parties. Information may be shared only with authorized internal teams and service providers strictly on a need-to-know basis.
            </p>
          </div>

          <p style="margin: 18px 0 0 0;">Warm regards,<br/><strong>Team Infinity Loans & Business Solutions</strong></p>
        </div>

        <div style="background: #111827; color: #9ca3af; padding: 16px 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2026 Infinity Loans & Business Solutions. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Infinity Loans & Business Solutions" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: partnerData.email, // ✅ Customer email
      subject:
        "Channel Partner Application Received - Infinity Loans & Business Solutions",
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending partner confirmation email:", error);
    return { success: false, error: error.message };
  }
};

// ======================================================
// Send Notification To Admin (DIRECTOR + SUPPORT)
// ======================================================
export const sendPartnerNotificationToAdminEmails = async (partnerData) => {
  try {
    const adminEmails = resolveDirectorRecipients();

    if (adminEmails.length === 0) {
      return { success: false, error: "No admin emails configured" };
    }

      const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00AEEF 0%, #33C1F3 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📋 New Partner Application</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Channel Partner Registration</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px 20px; background: white; color: #333; line-height: 1.8;">
          <p><strong>New partner application received:</strong></p>
          
          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #00AEEF;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Full Name:</td>
                <td style="padding: 8px;">${partnerData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Mobile:</td>
                <td style="padding: 8px;">${partnerData.mobileNumber}</td>
              </tr>
              ${partnerData.altMobileNumber ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Alt Mobile:</td>
                <td style="padding: 8px;">${partnerData.altMobileNumber}</td>
              </tr>` : ''}
              ${partnerData.whatsappNumber ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">WhatsApp:</td>
                <td style="padding: 8px;">${partnerData.whatsappNumber}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 8px;">${partnerData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">State:</td>
                <td style="padding: 8px;">${partnerData.state}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">City:</td>
                <td style="padding: 8px;">${partnerData.city}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Pincode:</td>
                <td style="padding: 8px;">${partnerData.pincode}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Preferred Loan:</td>
                <td style="padding: 8px;">${partnerData.preferredLoan}</td>
              </tr>
              ${partnerData.experience && partnerData.experience !== 'Not provided' ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #666;">Experience:</td>
                <td style="padding: 8px;">${partnerData.experience}</td>
              </tr>` : ''}
                          </table>
          </div>

          <!-- Document Links -->
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #00AEEF;">📎 Uploaded Documents</h3>
            <ul style="margin: 10px 0; padding-left: 25px;">
              ${partnerData.aadhaarFrontUrl ? `<li><a href="${partnerData.aadhaarFrontUrl}" target="_blank" style="color: #00AEEF; text-decoration: none;">📄 Aadhaar Front</a></li>` : ''}
              ${partnerData.aadhaarBackUrl ? `<li><a href="${partnerData.aadhaarBackUrl}" target="_blank" style="color: #00AEEF; text-decoration: none;">📄 Aadhaar Back</a></li>` : ''}
              ${partnerData.panFrontUrl ? `<li><a href="${partnerData.panFrontUrl}" target="_blank" style="color: #00AEEF; text-decoration: none;">📄 PAN Card</a></li>` : ''}
              ${partnerData.bankPassbookUrl ? `<li><a href="${partnerData.bankPassbookUrl}" target="_blank" style="color: #00AEEF; text-decoration: none;">📄 Bank Passbook / Cancelled Cheque</a></li>` : ''}
              ${partnerData.passportPhotoUrl ? `<li><a href="${partnerData.passportPhotoUrl}" target="_blank" style="color: #00AEEF; text-decoration: none;">📄 Passport Photo</a></li>` : ''}
            </ul>
          </div>

          <!-- Action Required -->
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffeaa7;">
            <h3 style="margin-top: 0; color: #00AEEF;">⚡ Action Required</h3>
            <p>Please review the application and uploaded documents. Contact the partner within 24-48 hours for further discussion and onboarding process.</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #1a1a1a; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 12px;">© 2026 Infinity Loans & Business Solutions</p>
        </div>
      </div>
    `;

    await notifyDirectorInternalMail({
      subject: `New Partner Application - ${partnerData.fullName}`,
      replyTo: partnerData.email,
      html: htmlContent,
      recipients: adminEmails,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification emails:", error);
    return { success: false, error: error.message };
  }
};

