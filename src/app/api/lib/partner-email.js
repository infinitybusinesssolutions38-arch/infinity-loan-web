
import nodemailer from "nodemailer";

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

    <!-- ✅ YOUR FULL CUSTOMER HTML EXACTLY SAME (NOT CHANGED) -->
    ${/* PASTE YOUR FULL CUSTOMER HTML HERE EXACTLY AS YOU SENT */""}

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
    const transporter = createGmailTransporter();

    const adminEmails = [
      process.env.DIRECTOR_EMAIL,
      process.env.ADMIN_EMAIL,
    ].filter(Boolean);

    if (adminEmails.length === 0) {
      return { success: false, error: "No admin emails configured" };
    }

      const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #F97415 0%, #ff8c42 100%); padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📋 New Partner Application</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Channel Partner Registration</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 30px 20px; background: white; color: #333; line-height: 1.8;">
          <p><strong>New partner application received:</strong></p>
          
          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F97415;">
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
            <h3 style="margin-top: 0; color: #F97415;">📎 Uploaded Documents</h3>
            <ul style="margin: 10px 0; padding-left: 25px;">
              ${partnerData.aadhaarFrontUrl ? `<li><a href="${partnerData.aadhaarFrontUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Aadhaar Front</a></li>` : ''}
              ${partnerData.aadhaarBackUrl ? `<li><a href="${partnerData.aadhaarBackUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Aadhaar Back</a></li>` : ''}
              ${partnerData.panFrontUrl ? `<li><a href="${partnerData.panFrontUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 PAN Card</a></li>` : ''}
              ${partnerData.bankPassbookUrl ? `<li><a href="${partnerData.bankPassbookUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Bank Passbook</a></li>` : ''}
              ${partnerData.passportPhotoUrl ? `<li><a href="${partnerData.passportPhotoUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Passport Photo</a></li>` : ''}
            </ul>
          </div>

          <!-- Action Required -->
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffeaa7;">
            <h3 style="margin-top: 0; color: #F97415;">⚡ Action Required</h3>
            <p>Please review the application and uploaded documents. Contact the partner within 24-48 hours for further discussion and onboarding process.</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #1a1a1a; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 12px;">© 2024 Infinity Loans & Business Solutions</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Infinity Loans & Business Solutions" <${process.env.EMAIL_HOST_USER}>`,
      to: adminEmails.join(","), // ✅ Sends to both emails
      subject: `New Partner Application - ${partnerData.fullName}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification emails:", error);
    return { success: false, error: error.message };
  }
};




// import nodemailer from "nodemailer";

// // Create email transporter
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: parseInt(process.env.EMAIL_PORT),
//     secure: process.env.EMAIL_SECURE === "true",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
// };

// // Create Gmail SMTP transporter for admin emails
// const createGmailTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_smtp_HOST,
//     port: parseInt(process.env.EMAIL_smtp_PORT),
//     secure: true, // Gmail uses SSL on port 465
//     auth: {
//       user: process.env.EMAIL_HOST_USER,
//       pass: process.env.EMAIL_HOST_PASSWORD,
//     },
//   });
// };

// // Send partner confirmation email to customer
// export const sendPartnerConfirmationEmail = async (partnerData) => {
//   try {
//     const transporter = createTransporter();

//     const htmlContent = `
//       <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 0;">
//         <!-- Header -->
//         <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; color: #F97415; font-size: 28px; font-weight: bold;">🤝 Channel Partner Program</h1>
//           <p style="margin: 10px 0 0 0; color: #000000; font-size: 16px;">Welcome to Infinity Loans & Business Solutions</p>
//         </div>

//         <!-- Main Content -->
//         <div style="padding: 30px 20px; background: white; color: #333; line-height: 1.8;">
//           <p>Dear <strong>${partnerData.fullName}</strong>,</p>

//           <p>Greetings from Infinity Loans & Business Solutions.</p>

//           <p>We are pleased to inform you that we have successfully received your application for the <strong>Loan Channel Partner Program</strong>. We sincerely appreciate your interest in associating with us and are confident that this collaboration will result in a strong, transparent, and successful business relationship.</p>

//           <!-- Application Details -->
//           <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F97415;">
//             <h3 style="margin-top: 0; color: #F97415;">📋 Your Application Details</h3>
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Full Name:</td>
//                 <td style="padding: 8px;">${partnerData.fullName}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Mobile Number:</td>
//                 <td style="padding: 8px;">${partnerData.mobileNumber}</td>
//               </tr>
//               ${partnerData.altMobileNumber ? `
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Alternate Mobile:</td>
//                 <td style="padding: 8px;">${partnerData.altMobileNumber}</td>
//               </tr>` : ''}
//               ${partnerData.whatsappNumber ? `
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">WhatsApp Number:</td>
//                 <td style="padding: 8px;">${partnerData.whatsappNumber}</td>
//               </tr>` : ''}
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
//                 <td style="padding: 8px;">${partnerData.email}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">State:</td>
//                 <td style="padding: 8px;">${partnerData.state}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">City:</td>
//                 <td style="padding: 8px;">${partnerData.city}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Pincode:</td>
//                 <td style="padding: 8px;">${partnerData.pincode}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Preferred Loan:</td>
//                 <td style="padding: 8px;">${partnerData.preferredLoan}</td>
//               </tr>
//               ${partnerData.experience && partnerData.experience !== 'Not provided' ? `
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Experience:</td>
//                 <td style="padding: 8px;">${partnerData.experience}</td>
//               </tr>` : ''}
//                           </table>
//           </div>

//           <!-- Support & Working Assistance -->
//           <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F97415;">
//             <h3 style="margin-top: 0; color: #F97415;">📞 Support & Working Assistance</h3>
//             <p style="margin: 10px 0;">Please be assured that our team and directors are available from <strong>9:00 AM to 9:00 PM</strong> to assist you with any queries, guidance, or operational support you may require.</p>
//             <p style="margin: 10px 0;"><strong>⚡ Important Note:</strong> You are requested to focus exclusively on <strong>file sourcing and client referrals</strong>. All other activities, including processing, coordination, verification, approvals, and disbursement support, will be handled entirely by our internal team.</p>
//           </div>

//           <!-- Next Steps -->
//           <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffeaa7;">
//             <h3 style="margin-top: 0; color: #F97415;">🔄 Next Steps</h3>
//             <p>Our team will review your application and documents. You will be contacted within <strong>24-48 hours</strong> for further discussion and onboarding process.</p>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div style="background: #1a1a1a; padding: 30px 20px; text-align: center; color: white;">
//           <p style="margin: 0; font-size: 14px;">© 2024 Infinity Loans & Business Solutions. All rights reserved.</p>
//           <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
//             This is an automated email. Please do not reply to this message.
//           </p>
//         </div>
//       </div>
//     `;

//     const mailOptions = {
//       from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
//       to: partnerData.email,
//       subject: "Channel Partner Application Received - Infinity Loans & Business Solutions",
//       html: htmlContent,
//     };

//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending partner confirmation email:", error);
//     return { success: false, error: error.message };
//   }
// };

// // Send notification email to admin
// export const sendPartnerNotificationToAdmin = async (partnerData) => {
//   try {
//     const transporter = createTransporter();

//     const htmlContent = `
//       <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 0;">
//         <!-- Header -->
//         <div style="background: linear-gradient(135deg, #F97415 0%, #ff8c42 100%); padding: 40px 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📋 New Partner Application</h1>
//           <p style="margin: 10px 0 0 0; font-size: 16px;">Channel Partner Registration</p>
//         </div>

//         <!-- Main Content -->
//         <div style="padding: 30px 20px; background: white; color: #333; line-height: 1.8;">
//           <p><strong>New partner application received:</strong></p>
          
//           <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F97415;">
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Full Name:</td>
//                 <td style="padding: 8px;">${partnerData.fullName}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Mobile:</td>
//                 <td style="padding: 8px;">${partnerData.mobileNumber}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
//                 <td style="padding: 8px;">${partnerData.email}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">State:</td>
//                 <td style="padding: 8px;">${partnerData.state}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">City:</td>
//                 <td style="padding: 8px;">${partnerData.city}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Preferred Loan:</td>
//                 <td style="padding: 8px;">${partnerData.preferredLoan}</td>
//               </tr>
//             </table>
//           </div>

//           <!-- Document Links -->
//           <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
//             <h3 style="margin-top: 0; color: #F97415;">📎 Uploaded Documents</h3>
//             <ul style="margin: 10px 0; padding-left: 25px;">
//               ${partnerData.aadhaarFrontUrl ? `<li><a href="${partnerData.aadhaarFrontUrl}" target="_blank">Aadhaar Front</a></li>` : ''}
//               ${partnerData.aadhaarBackUrl ? `<li><a href="${partnerData.aadhaarBackUrl}" target="_blank">Aadhaar Back</a></li>` : ''}
//               ${partnerData.panFrontUrl ? `<li><a href="${partnerData.panFrontUrl}" target="_blank">PAN Card</a></li>` : ''}
//               ${partnerData.bankPassbookUrl ? `<li><a href="${partnerData.bankPassbookUrl}" target="_blank">Bank Passbook</a></li>` : ''}
//               ${partnerData.passportPhotoUrl ? `<li><a href="${partnerData.passportPhotoUrl}" target="_blank">Passport Photo</a></li>` : ''}
//             </ul>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div style="background: #1a1a1a; padding: 20px; text-align: center; color: white;">
//           <p style="margin: 0; font-size: 12px;">© 2024 Infinity Loans & Business Solutions</p>
//         </div>
//       </div>
//     `;

//     const mailOptions = {
//       from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
//       to: process.env.ADMIN_EMAIL || process.env.SUPPORT_EMAIL,
//       subject: `New Partner Application - ${partnerData.fullName}`,
//       html: htmlContent,
//     };

//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending admin notification email:", error);
//     return { success: false, error: error.message };
//   }
// };

// // Send notification emails to admin addresses using Gmail SMTP
// export const sendPartnerNotificationToAdminEmails = async (partnerData) => {
//   try {
//     const gmailTransporter = createGmailTransporter();
    
//     const adminEmails = [
//       process.env.ADMIN_EMAIL,
//       process.env.DIRECTOR_EMAIL,
//       process.env.NEXT_PUBLIC_PARTNER_SUPPORT_EMAIL
//     ].filter(email => email);

//     if (adminEmails.length === 0) {
//       return { success: false, error: "No admin emails configured" };
//     }

//     const htmlContent = `
//       <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 0;">
//         <!-- Header -->
//         <div style="background: linear-gradient(135deg, #F97415 0%, #ff8c42 100%); padding: 40px 20px; text-align: center; color: white;">
//           <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📋 New Partner Application</h1>
//           <p style="margin: 10px 0 0 0; font-size: 16px;">Channel Partner Registration</p>
//         </div>

//         <!-- Main Content -->
//         <div style="padding: 30px 20px; background: white; color: #333; line-height: 1.8;">
//           <p><strong>New partner application received:</strong></p>
          
//           <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F97415;">
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Full Name:</td>
//                 <td style="padding: 8px;">${partnerData.fullName}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Mobile:</td>
//                 <td style="padding: 8px;">${partnerData.mobileNumber}</td>
//               </tr>
//               ${partnerData.altMobileNumber ? `
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Alt Mobile:</td>
//                 <td style="padding: 8px;">${partnerData.altMobileNumber}</td>
//               </tr>` : ''}
//               ${partnerData.whatsappNumber ? `
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">WhatsApp:</td>
//                 <td style="padding: 8px;">${partnerData.whatsappNumber}</td>
//               </tr>` : ''}
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
//                 <td style="padding: 8px;">${partnerData.email}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">State:</td>
//                 <td style="padding: 8px;">${partnerData.state}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">City:</td>
//                 <td style="padding: 8px;">${partnerData.city}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Pincode:</td>
//                 <td style="padding: 8px;">${partnerData.pincode}</td>
//               </tr>
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Preferred Loan:</td>
//                 <td style="padding: 8px;">${partnerData.preferredLoan}</td>
//               </tr>
//               ${partnerData.experience && partnerData.experience !== 'Not provided' ? `
//               <tr>
//                 <td style="padding: 8px; font-weight: bold; color: #666;">Experience:</td>
//                 <td style="padding: 8px;">${partnerData.experience}</td>
//               </tr>` : ''}
//                           </table>
//           </div>

//           <!-- Document Links -->
//           <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
//             <h3 style="margin-top: 0; color: #F97415;">📎 Uploaded Documents</h3>
//             <ul style="margin: 10px 0; padding-left: 25px;">
//               ${partnerData.aadhaarFrontUrl ? `<li><a href="${partnerData.aadhaarFrontUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Aadhaar Front</a></li>` : ''}
//               ${partnerData.aadhaarBackUrl ? `<li><a href="${partnerData.aadhaarBackUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Aadhaar Back</a></li>` : ''}
//               ${partnerData.panFrontUrl ? `<li><a href="${partnerData.panFrontUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 PAN Card</a></li>` : ''}
//               ${partnerData.bankPassbookUrl ? `<li><a href="${partnerData.bankPassbookUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Bank Passbook</a></li>` : ''}
//               ${partnerData.passportPhotoUrl ? `<li><a href="${partnerData.passportPhotoUrl}" target="_blank" style="color: #F97415; text-decoration: none;">📄 Passport Photo</a></li>` : ''}
//             </ul>
//           </div>

//           <!-- Action Required -->
//           <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffeaa7;">
//             <h3 style="margin-top: 0; color: #F97415;">⚡ Action Required</h3>
//             <p>Please review the application and uploaded documents. Contact the partner within 24-48 hours for further discussion and onboarding process.</p>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div style="background: #1a1a1a; padding: 20px; text-align: center; color: white;">
//           <p style="margin: 0; font-size: 12px;">© 2024 Infinity Loans & Business Solutions</p>
//         </div>
//       </div>
//     `;

//     const emailPromises = adminEmails.map(email => 
//       gmailTransporter.sendMail({
//         from: process.env.EMAIL_HOST_USER,
//         to: email,
//         subject: `New Partner Application - ${partnerData.fullName}`,
//         html: htmlContent,
//       })
//     );

//     await Promise.all(emailPromises);
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending admin Gmail notification emails:", error);
//     return { success: false, error: error.message };
//   }
// };

// // Export Gmail transporter function for use in other modules
// export { createGmailTransporter };
