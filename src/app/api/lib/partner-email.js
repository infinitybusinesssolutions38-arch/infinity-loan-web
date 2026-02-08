import nodemailer from "nodemailer";

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send partner confirmation email to customer
export const sendPartnerConfirmationEmail = async (
  partnerEmail,
  partnerName,
  partnerData
) => {
  try {
    const transporter = createTransporter();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 10px; color: white; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #F97415;">Welcome to Infinity Loans Partner Network!</h1>
          <p style="margin: 10px 0 0 0; color: #e0e0e0;">Your Registration is Confirmed</p>
        </div>

        <div style="color: #333; line-height: 1.6;">
          <p>Dear <strong>${partnerName}</strong>,</p>

          <p>Thank you for registering as a partner with <strong>Infinity Loan Services</strong>! We're excited to have you join our trusted loan distribution network.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #F97415;">Registration Details:</h3>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${partnerData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${partnerData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Mobile:</strong></td>
                <td style="padding: 8px 0;">${partnerData.mobileNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>City:</strong></td>
                <td style="padding: 8px 0;">${partnerData.city}</td>
              </tr>
              ${partnerData.experience !== "Not provided" ? `
              <tr>
                <td style="padding: 8px 0;"><strong>Experience:</strong></td>
                <td style="padding: 8px 0;">${partnerData.experience}</td>
              </tr>
              ` : ""}
              ${partnerData.preferredCategory !== "Not specified" ? `
              <tr>
                <td style="padding: 8px 0;"><strong>Preferred Category:</strong></td>
                <td style="padding: 8px 0;">${partnerData.preferredCategory}</td>
              </tr>
              ` : ""}
            </table>
          </div>

          <div style="background: #f0f8ff; padding: 20px; border-left: 4px solid #F97415; border-radius: 4px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team will review your registration within 24-48 hours</li>
              <li>You'll receive a confirmation call or email with onboarding details</li>
              <li>Complete the KYC process to activate your partner account</li>
              <li>Start earning commissions on successful loan disbursements</li>
            </ul>
          </div>

          <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;">
            <h3 style="margin-top: 0;">Need Help?</h3>
            <p>Have questions? Our dedicated partner support team is here to help!</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><strong>Phone/WhatsApp:</strong> ${process.env.NEXT_PUBLIC_PARTNER_SUPPORT_PHONE}</li>
              <li><strong>Email:</strong> ${process.env.NEXT_PUBLIC_PARTNER_SUPPORT_EMAIL}</li>
              <li><strong>Support Hours:</strong> ${process.env.NEXT_PUBLIC_PARTNER_SUPPORT_HOURS}</li>
            </ul>
          </div>

          <p>We're excited to partner with you and help you build a successful loan distribution business!</p>

          <p>Best regards,<br/>
          <strong>Infinity Loans & Business Solutions</strong><br/>
          <a href="${process.env.COMPANY_WEBSITE}" style="color: #F97415; text-decoration: none;">${process.env.COMPANY_WEBSITE}</a></p>
        </div>

        <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Infinity Loan Services. All rights reserved.</p>
          <p>This is an automated email. Please do not reply directly to this email.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: partnerEmail,
      subject: "Welcome to Infinity Loans Partner Network - Registration Confirmed",
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending partner confirmation email:", error);
    return { success: false, error: error.message };
  }
};

// Send partner notification email to admin
export const sendPartnerNotificationToAdmin = async (partnerData) => {
  try {
    const transporter = createTransporter();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F97415 0%, #E06410 100%); padding: 30px; border-radius: 10px; color: white; margin-bottom: 30px;">
          <h1 style="margin: 0;">New Partner Registration</h1>
          <p style="margin: 10px 0 0 0;">Action Required - Review & Approve</p>
        </div>

        <div style="color: #333; line-height: 1.6;">
          <p>A new partner has registered on the Infinity Loans platform. Please review the details below and take appropriate action.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #F97415;">Partner Registration Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px 0;">${partnerData.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${partnerData.email}">${partnerData.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; font-weight: bold;">Mobile:</td>
                <td style="padding: 10px 0;"><a href="tel:${partnerData.mobileNumber}">${partnerData.mobileNumber}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; font-weight: bold;">City:</td>
                <td style="padding: 10px 0;">${partnerData.city}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; font-weight: bold;">Experience:</td>
                <td style="padding: 10px 0;">${partnerData.experience}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px 0; font-weight: bold;">Preferred Category:</td>
                <td style="padding: 10px 0;">${partnerData.preferredCategory}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold;">Registered:</td>
                <td style="padding: 10px 0;">${new Date(partnerData.createdAt).toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
            <strong>Next Steps:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Review partner registration details</li>
              <li>Conduct KYC verification</li>
              <li>Contact partner for onboarding</li>
              <li>Approve/Reject registration in dashboard</li>
            </ul>
          </div>

          <p>Access the partner management dashboard to approve or review this registration.</p>

          <p>
            Best regards,<br/>
            <strong>Infinity Loans System</strong>
          </p>
        </div>

        <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Infinity Loan Services. All rights reserved.</p>
          <p>This is an automated email from your partner management system.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NEXT_PUBLIC_PARTNER_SUPPORT_EMAIL,
      subject: `New Partner Registration - ${partnerData.fullName}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending partner notification to admin:", error);
    return { success: false, error: error.message };
  }
};
