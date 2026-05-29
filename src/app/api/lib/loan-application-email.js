import nodemailer from "nodemailer";

// Create email transporter
const createTransporter = () => {
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.EMAIL_PORT || "465", 10);
  const user = process.env.EMAIL_USER; // ✅ FIXED
  const pass = process.env.EMAIL_PASS;
  const secure =
    typeof process.env.EMAIL_SECURE !== "undefined"
      ? String(process.env.EMAIL_SECURE).toLowerCase() === "true"
      : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

// Send loan application confirmation email to customer
export const sendLoanApplicationConfirmationEmail = async (
  customerEmail,
  applicationData
) => {
  try {
    const transporter = createTransporter();

    const {
      customerName,
      applicationNumber,
      applicationDate,
      loanType,
      originalLoanType,
      loanAmount,
      bankName,
      limitAmount,
      cardType,
      cibilIssues,
    } = applicationData;

    // ===============================
    // 🔥 YOUR FULL HTML (UNCHANGED)
    // ===============================

    const htmlContent = `

    <!-- YOUR FULL HTML EXACTLY SAME AS YOU SENT -->
    
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 12px; }
          .header { background: linear-gradient(135deg, #F97415 0%, #ff8c42 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; color: white; text-align: center; }
          .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
          .header p { margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; }
          .content { padding: 30px; }
          .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; font-weight: 500; }
          .section { margin: 30px 0; }
          .section-title { color: #F97415; font-weight: 600; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center; }
          .section-title::before { content: ''; margin-right: 10px; }
          .details-box { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #F97415; }
          .details-box p { margin: 12px 0; font-size: 15px; }
          .details-box strong { color: #2c3e50; }
          .highlight { background: linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%); padding: 25px; border-left: 4px solid #F97415; border-radius: 8px; margin: 25px 0; }
          .highlight h3 { margin-top: 0; color: #F97415; font-size: 18px; }
          .highlight ul { margin: 15px 0; padding-left: 25px; }
          .highlight li { margin: 10px 0; font-size: 15px; }
          .contact-box { background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #e9ecef; }
          .contact-box h3 { margin-top: 0; color: #2c3e50; font-size: 18px; }
          .contact-box ul { margin: 15px 0; padding-left: 0; list-style: none; }
          .contact-box li { margin: 10px 0; font-size: 15px; display: flex; align-items: center; }
          .contact-box li::before { content: '📞'; margin-right: 10px; font-size: 16px; }
          .footer { border-top: 1px solid #e9ecef; margin-top: 30px; padding-top: 25px; text-align: center; color: #6c757d; font-size: 13px; }
          .office-box { margin: 20px 0; padding: 20px; background: #f8f9fa; border-left: 4px solid #F97415; border-radius: 8px; }
          .office-box h4 { margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; }
          .office-box p { margin: 8px 0; font-size: 14px; }
          .disclaimer { font-size: 12px; color: #6c757d; margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; }
          .application-number { background: #F97415; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; margin: 10px 0; }
          .loan-type-badge { background: #28a745; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin: 5px 0; }
          .amount-highlight { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 12px 20px; border-radius: 25px; font-size: 16px; font-weight: 700; display: inline-block; margin: 10px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
          .business-header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your {{LOAN_TYPE_NAME}} Application!</h1>
            <p>Your Application Has Been Successfully Received</p>
          </div>

          <div class="content">
            <p class="greeting">Dear {{CUSTOMER_NAME}},</p>

            <p>Thank you for choosing <strong>Infinity Loans & Business Solutions</strong> for your financing requirements.</p>

            <p>We are pleased to formally acknowledge the successful receipt of your loan application along with the supporting documents submitted by you. Your application has been registered in our system, and the relevant details are outlined below for your reference:</p>

            <div class="section">
              <div class="section-title">📄 Application Details</div>
              <div class="details-box">
                <p><strong>Application Number:</strong> <span class="application-number">{{APPLICATION_NUMBER}}</span></p>
                <p><strong>Application Date:</strong> {{APPLICATION_DATE}}</p>
                <p><strong>Loan Product:</strong> <span class="loan-type-badge">{{LOAN_TYPE}}</span></p>
                <p><strong>Applicant Name:</strong> {{CUSTOMER_NAME}}</p>
                <p><strong>Requested Amount:</strong> <span class="amount-highlight">{{LOAN_AMOUNT}}</span></p>
              </div>
            </div>

            ${originalLoanType === 'credit-card' ? `
            <div class="section">
              <div class="section-title">💳 Credit Card Details</div>
              <div class="details-box">
                <p><strong>Bank Name:</strong> {{BANK_NAME}}</p>
                <p><strong>Limit Amount:</strong> {{LIMIT_AMOUNT}}</p>
                <p><strong>Card Type:</strong> {{CARD_TYPE}}</p>
              </div>
            </div>
            ` : ''}

            ${cibilIssues ? `
            <div class="section">
              <div class="section-title">📊 CIBIL Information</div>
              <div class="details-box">
                <p><strong>CIBIL Issues:</strong> ${cibilIssues}</p>
              </div>
            </div>
            ` : ''}
            </div>
            <p><em>Kindly quote the above Application Number in all future communications for faster assistance and effective tracking.</em></p>
          </div>

          <div class="section">
            <div class="section-title">🔍 Current Status</div>
            <p>Your application is currently under preliminary review. As part of the evaluation process, our team is validating the information and documentation provided by you in accordance with internal compliance standards, partner lender requirements, and applicable regulatory guidelines.</p>
          </div>

          <div class="section">
            <div class="section-title">🔄 Evaluation & Next Steps</div>
            <p>The review process may include, but is not limited to, the following:</p>
            <ul style="margin-left: 20px;">
              <li>Document verification and preliminary eligibility assessment</li>
              <li>Credit bureau checks (including CIBIL and other authorized credit bureaus) to assess your credit score, repayment behavior, and historical credit profile</li>
              <li>Analysis of existing and past loan facilities, repayment track record, and overall financial position</li>
              <li><strong>Indicative processing timeline: Up to 48 working hours</strong>, subject to receipt of complete, accurate, and satisfactory documentation</li>
            </ul>
            <p>A designated Relationship Manager / Loan Expert may contact you should any additional information, clarification, or supporting documents be required.</p>
            <p>We remain committed to delivering a transparent, efficient, and professional loan processing experience.</p>
          </div>

          <div class="section">
            <div class="section-title">⚠️ Important Disclosures</div>
            <ul style="margin-left: 20px;">
              <li>Submission of this application does not constitute a loan sanction, approval, or commitment of any nature.</li>
              <li>Loan approval, interest rates, tenure, terms & conditions, and disbursement decisions are taken solely by the respective bank or NBFC, in accordance with their internal credit policies, credit bureau evaluations, risk assessment frameworks, and regulatory norms.</li>
              <li>Infinity Loans & Business Solutions acts strictly as a financial advisory and loan facilitation service provider and does not guarantee loan approval, sanction, or disbursement.</li>
            </ul>
          </div>

          <div class="section">
            <div class="section-title">🔐 Privacy Policy, Data Protection & Customer Consent</div>
            <p>Infinity Loans & Business Solutions is committed to protecting your privacy and safeguarding the confidentiality, integrity, and security of your personal, financial, and business information.</p>
            <p>By submitting your loan application, you expressly authorize and consent to:</p>
            <ul style="margin-left: 20px;">
              <li>Collection, storage, processing, and verification of the information and documents provided by you</li>
              <li>Credit bureau inquiries (including CIBIL and other authorized agencies) to evaluate your creditworthiness and repayment history</li>
              <li>Sharing of relevant personal, financial, and business information with partner banks, NBFCs, credit bureaus, and authorized service providers strictly for loan evaluation, processing, and related purposes</li>
              <li>Communication via phone calls, SMS, email, WhatsApp, or other electronic modes regarding application status, documentation, and loan-related services</li>
            </ul>
            <p>All data is processed in accordance with applicable data protection and privacy laws and retained only for such period as required under law or for legitimate business purposes.</p>
          </div>

          <div class="section">
            <div class="section-title">🌍 PAN-India Presence & Expansion Roadmap</div>
            <p>Our services are currently available PAN-India across all States and Union Territories of India through our robust operating network. In parallel, we are actively expanding our physical branch presence, with upcoming branches planned in 20+ states and over 100 cities, to further strengthen nationwide accessibility and customer engagement.</p>
          </div>

          <div class="section">
            <div class="section-title">📞 Need Assistance?</div>
            <p>For any queries, clarifications, or support related to your loan application, please feel free to contact us. Kindly mention your Application Number for prompt and efficient assistance.</p>
            <div class="contact-box">
              <ul>
                <li><strong>Phone/WhatsApp:</strong> +91 95798 80841 | +91 97666 16960</li>
                <li><strong>Email:</strong> business@infinityloanservices.com | businessservicesinfinity@gmail.com</li>
                <li><strong>Website:</strong> www.infinityloanservices.com</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🏢 Our Office Locations</div>
            <div class="office-box">
              <h4>Corporate & Registered Office</h4>
              <p>8th Floor, Magnum Tower – 1,<br>Golf Course Extension Road, Sector 58,<br>Gurugram, Haryana – 122098, India</p>
            </div>
          </div>

          <p>Warm Regards,<br><strong>Team Infinity Loans & Business Solutions</strong></p>

          <div class="footer">
            <p><strong>📞 Customer Support:</strong> +91 95798 80841 | +91 9766616960</p>
            <p><strong>📧 Email:</strong> business@infinityloanservices.com | businessservicesinfinity@gmail.com</p>
            <p><strong>🌐 Website:</strong> www.infinityloanservices.com</p>
          </div>

          <div class="disclaimer">
            <p><strong>⚖️ Legal Disclaimer</strong></p>
            <p>This communication is issued for informational purposes only and shall not be construed as an offer, sanction letter, approval, or legally binding commitment of any nature. Loan processing, eligibility, approval, interest rates, tenure, terms and conditions, and disbursement are subject to the policies, credit norms, risk assessment, credit bureau evaluation, submission and verification of complete and satisfactory documentation, and final approval of the respective bank or NBFC. Infinity Loans & Business Solutions acts solely as a financial advisory and loan facilitation service provider and does not assume responsibility for approval or rejection decisions taken by lending institutions.</p>
            <p><strong>🔐 Confidentiality & Data Protection Notice</strong></p>
            <p>This communication, including any attachments, is confidential and intended solely for the use of the designated recipient(s). It may contain privileged, proprietary, or sensitive information belonging to Infinity Loans & Business Solutions and/or its clients. Any unauthorized review, access, use, disclosure, reproduction, copying, forwarding, or distribution of this communication, in whole or in part, is strictly prohibited and may be unlawful.</p>
            <p>If you are not the intended recipient, or if you have received this communication in error, please notify the sender immediately, refrain from any further use or dissemination of its contents, and permanently delete or destroy all copies from your system and records.</p>
            <p>All personal and financial data contained herein is processed and protected in accordance with applicable data protection, privacy, and confidentiality laws and is accessed strictly on a need-to-know basis by authorized personnel only.</p>
          </div>
        </div>
      </body>
      </html>
    `;


    // ===============================
    // Loan Type Mapping
    // ===============================
    const getLoanTypeName = (loanType) => {
      const loanTypeMap = {
        salaried: "Salaried Employee Loan",
        business: "Business Loan",
        personal: "Personal Loan",
        home: "Home Loan",
        car: "Car Loan",
        education: "Education Loan",
        property: "Property Loan",
        professional: "Professional Loan",
        doctor: "Doctor Loan",
        ca: "CA Loan",
        architect: "Architect Loan",
        unified: "Business Loan",
        "credit-card": "Credit Card",
      };
      return (
        loanTypeMap[loanType] ||
        loanType.charAt(0).toUpperCase() + loanType.slice(1)
      );
    };

    const loanTypeName = getLoanTypeName(loanType);

    const finalHtml = htmlContent
      .replace(/{{CUSTOMER_NAME}}/g, customerName)
      .replace(/{{APPLICATION_NUMBER}}/g, applicationNumber)
      .replace(/{{APPLICATION_DATE}}/g, applicationDate)
      .replace(/{{LOAN_TYPE}}/g, loanTypeName)
      .replace(/{{LOAN_TYPE_NAME}}/g, loanTypeName)
      .replace(/{{LOAN_AMOUNT}}/g, loanAmount || "Not specified")
      .replace(/{{BANK_NAME}}/g, bankName || "Not specified")
      .replace(/{{LIMIT_AMOUNT}}/g, limitAmount || "Not specified")
      .replace(/{{CARD_TYPE}}/g, cardType || "Not specified");

    // ===============================
    // ✅ SEND EMAIL CORRECTLY
    // ===============================

    await transporter.sendMail({
      from: `"Infinity Loans & Business Solutions" <${process.env.EMAIL_USER}>`,
      to: customerEmail, // ✅ CUSTOMER EMAIL
      subject: `Loan Application Under Review – Reference No: ${applicationNumber}`,
      html: finalHtml,
    });

    console.log("Email sent to:", customerEmail);

    return { success: true };
  } catch (error) {
    console.error("Error sending loan application confirmation email:", error);
    return { success: false, error: error.message };
  }
};


// import nodemailer from "nodemailer";

// // Create email transporter
// const createTransporter = () => {
//   const host = process.env.EMAIL_HOST || process.env.EMAIL_HOSTNAME || "smtp.gmail.com";
//   const port = parseInt(process.env.EMAIL_PORT || "465", 10);
//   // const user = process.env.EMAIL_USER || process.env.EMAIL_HOST_USER || process.env.EMAIL_HOST_USER_NAME || process.env.EMAIL_HOSTNAME_USER;
//   const pass = process.env.EMAIL_PASS || process.env.EMAIL_HOST_PASSWORD || process.env.EMAIL_HOST_PASS || process.env.EMAIL_HOST_PASSWORD_RAW;
//   const secureEnv = typeof process.env.EMAIL_SECURE !== "undefined" ? String(process.env.EMAIL_SECURE).toLowerCase() === "true" : port === 465;

//   return nodemailer.createTransport({
//     host,
//     port,
//     secure: secureEnv,
//     auth: {
//       user,
//       pass,
//     },
//   });
// };

// // Format date for display
// const formatDate = (date) => {
//   const options = { day: "numeric", month: "long", year: "numeric" };
//   return new Date(date).toLocaleDateString("en-IN", options);
// };

// // Send loan application confirmation email to customer
// export const sendLoanApplicationConfirmationEmail = async (
//   customerEmail,
//   applicationData
// ) => {
//   try {
//     const transporter = createTransporter();

//     const {
//       customerName,
//       applicationNumber,
//       applicationDate,
//       loanType,
//       originalLoanType,
//       loanAmount,
//       bankName,
//       limitAmount,
//       cardType,
//       cibilIssues,
//     } = applicationData;

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
//           .container { max-width: 650px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 12px; }
//           .header { background: linear-gradient(135deg, #F97415 0%, #ff8c42 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; color: white; text-align: center; }
//           .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
//           .header p { margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; }
//           .content { padding: 30px; }
//           .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; font-weight: 500; }
//           .section { margin: 30px 0; }
//           .section-title { color: #F97415; font-weight: 600; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center; }
//           .section-title::before { content: ''; margin-right: 10px; }
//           .details-box { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #F97415; }
//           .details-box p { margin: 12px 0; font-size: 15px; }
//           .details-box strong { color: #2c3e50; }
//           .highlight { background: linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%); padding: 25px; border-left: 4px solid #F97415; border-radius: 8px; margin: 25px 0; }
//           .highlight h3 { margin-top: 0; color: #F97415; font-size: 18px; }
//           .highlight ul { margin: 15px 0; padding-left: 25px; }
//           .highlight li { margin: 10px 0; font-size: 15px; }
//           .contact-box { background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #e9ecef; }
//           .contact-box h3 { margin-top: 0; color: #2c3e50; font-size: 18px; }
//           .contact-box ul { margin: 15px 0; padding-left: 0; list-style: none; }
//           .contact-box li { margin: 10px 0; font-size: 15px; display: flex; align-items: center; }
//           .contact-box li::before { content: '📞'; margin-right: 10px; font-size: 16px; }
//           .footer { border-top: 1px solid #e9ecef; margin-top: 30px; padding-top: 25px; text-align: center; color: #6c757d; font-size: 13px; }
//           .office-box { margin: 20px 0; padding: 20px; background: #f8f9fa; border-left: 4px solid #F97415; border-radius: 8px; }
//           .office-box h4 { margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; }
//           .office-box p { margin: 8px 0; font-size: 14px; }
//           .disclaimer { font-size: 12px; color: #6c757d; margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; }
//           .application-number { background: #F97415; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; margin: 10px 0; }
//           .loan-type-badge { background: #28a745; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin: 5px 0; }
//           .amount-highlight { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 12px 20px; border-radius: 25px; font-size: 16px; font-weight: 700; display: inline-block; margin: 10px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
//           .business-header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>Thank You for Your {{LOAN_TYPE_NAME}} Application!</h1>
//             <p>Your Application Has Been Successfully Received</p>
//           </div>

//           <div class="content">
//             <p class="greeting">Dear {{CUSTOMER_NAME}},</p>

//             <p>Thank you for choosing <strong>Infinity Loans & Business Solutions</strong> for your financing requirements.</p>

//             <p>We are pleased to formally acknowledge the successful receipt of your loan application along with the supporting documents submitted by you. Your application has been registered in our system, and the relevant details are outlined below for your reference:</p>

//             <div class="section">
//               <div class="section-title">📄 Application Details</div>
//               <div class="details-box">
//                 <p><strong>Application Number:</strong> <span class="application-number">{{APPLICATION_NUMBER}}</span></p>
//                 <p><strong>Application Date:</strong> {{APPLICATION_DATE}}</p>
//                 <p><strong>Loan Product:</strong> <span class="loan-type-badge">{{LOAN_TYPE}}</span></p>
//                 <p><strong>Applicant Name:</strong> {{CUSTOMER_NAME}}</p>
//                 <p><strong>Requested Amount:</strong> <span class="amount-highlight">{{LOAN_AMOUNT}}</span></p>
//               </div>
//             </div>

//             ${originalLoanType === 'credit-card' ? `
//             <div class="section">
//               <div class="section-title">💳 Credit Card Details</div>
//               <div class="details-box">
//                 <p><strong>Bank Name:</strong> {{BANK_NAME}}</p>
//                 <p><strong>Limit Amount:</strong> {{LIMIT_AMOUNT}}</p>
//                 <p><strong>Card Type:</strong> {{CARD_TYPE}}</p>
//               </div>
//             </div>
//             ` : ''}

//             ${cibilIssues ? `
//             <div class="section">
//               <div class="section-title">📊 CIBIL Information</div>
//               <div class="details-box">
//                 <p><strong>CIBIL Issues:</strong> ${cibilIssues}</p>
//               </div>
//             </div>
//             ` : ''}
//             </div>
//             <p><em>Kindly quote the above Application Number in all future communications for faster assistance and effective tracking.</em></p>
//           </div>

//           <div class="section">
//             <div class="section-title">🔍 Current Status</div>
//             <p>Your application is currently under preliminary review. As part of the evaluation process, our team is validating the information and documentation provided by you in accordance with internal compliance standards, partner lender requirements, and applicable regulatory guidelines.</p>
//           </div>

//           <div class="section">
//             <div class="section-title">🔄 Evaluation & Next Steps</div>
//             <p>The review process may include, but is not limited to, the following:</p>
//             <ul style="margin-left: 20px;">
//               <li>Document verification and preliminary eligibility assessment</li>
//               <li>Credit bureau checks (including CIBIL and other authorized credit bureaus) to assess your credit score, repayment behavior, and historical credit profile</li>
//               <li>Analysis of existing and past loan facilities, repayment track record, and overall financial position</li>
//               <li><strong>Indicative processing timeline: Up to 48 working hours</strong>, subject to receipt of complete, accurate, and satisfactory documentation</li>
//             </ul>
//             <p>A designated Relationship Manager / Loan Expert may contact you should any additional information, clarification, or supporting documents be required.</p>
//             <p>We remain committed to delivering a transparent, efficient, and professional loan processing experience.</p>
//           </div>

//           <div class="section">
//             <div class="section-title">⚠️ Important Disclosures</div>
//             <ul style="margin-left: 20px;">
//               <li>Submission of this application does not constitute a loan sanction, approval, or commitment of any nature.</li>
//               <li>Loan approval, interest rates, tenure, terms & conditions, and disbursement decisions are taken solely by the respective bank or NBFC, in accordance with their internal credit policies, credit bureau evaluations, risk assessment frameworks, and regulatory norms.</li>
//               <li>Infinity Loans & Business Solutions acts strictly as a financial advisory and loan facilitation service provider and does not guarantee loan approval, sanction, or disbursement.</li>
//             </ul>
//           </div>

//           <div class="section">
//             <div class="section-title">🔐 Privacy Policy, Data Protection & Customer Consent</div>
//             <p>Infinity Loans & Business Solutions is committed to protecting your privacy and safeguarding the confidentiality, integrity, and security of your personal, financial, and business information.</p>
//             <p>By submitting your loan application, you expressly authorize and consent to:</p>
//             <ul style="margin-left: 20px;">
//               <li>Collection, storage, processing, and verification of the information and documents provided by you</li>
//               <li>Credit bureau inquiries (including CIBIL and other authorized agencies) to evaluate your creditworthiness and repayment history</li>
//               <li>Sharing of relevant personal, financial, and business information with partner banks, NBFCs, credit bureaus, and authorized service providers strictly for loan evaluation, processing, and related purposes</li>
//               <li>Communication via phone calls, SMS, email, WhatsApp, or other electronic modes regarding application status, documentation, and loan-related services</li>
//             </ul>
//             <p>All data is processed in accordance with applicable data protection and privacy laws and retained only for such period as required under law or for legitimate business purposes.</p>
//           </div>

//           <div class="section">
//             <div class="section-title">🌍 PAN-India Presence & Expansion Roadmap</div>
//             <p>Our services are currently available PAN-India across all States and Union Territories of India through our robust operating network. In parallel, we are actively expanding our physical branch presence, with upcoming branches planned in 20+ states and over 100 cities, to further strengthen nationwide accessibility and customer engagement.</p>
//           </div>

//           <div class="section">
//             <div class="section-title">📞 Need Assistance?</div>
//             <p>For any queries, clarifications, or support related to your loan application, please feel free to contact us. Kindly mention your Application Number for prompt and efficient assistance.</p>
//             <div class="contact-box">
//               <ul>
//                 <li><strong>Phone/WhatsApp:</strong> +91 95798 80841 | +91 9766616960</li>
//                 <li><strong>Email:</strong> business@infinityloanservices.com | businessservicesinfinity@gmail.com</li>
//                 <li><strong>Website:</strong> www.infinityloanservices.com</li>
//               </ul>
//             </div>
//           </div>

//           <div class="section">
//             <div class="section-title">🏢 Our Office Locations</div>
//             <div class="office-box">
//               <h4>Corporate & Registered Office</h4>
//               <p>8th Floor, Magnum Tower – 1,<br>Golf Course Extension Road, Sector 58,<br>Gurugram, Haryana – 122098, India</p>
//             </div>
//             <div class="office-box">
//               <h4>New Delhi Office</h4>
//               <p>505, Surya Kiran Building,<br>15, Kasturba Gandhi Marg,<br>New Delhi – 110001, India</p>
//             </div>
//             <div class="office-box">
//               <h4>Hyderabad Office</h4>
//               <p>6-3-247/22/8,<br>Dwarakapuri Colony, Punjagutta,<br>Hyderabad, Telangana – 500082, India</p>
//             </div>
//           </div>

//           <p>Warm Regards,<br><strong>Team Infinity Loans & Business Solutions</strong></p>

//           <div class="footer">
//             <p><strong>📞 Customer Support:</strong> +91 95798 80841 | +91 9766616960</p>
//             <p><strong>📧 Email:</strong> business@infinityloanservices.com | businessservicesinfinity@gmail.com</p>
//             <p><strong>🌐 Website:</strong> www.infinityloanservices.com</p>
//           </div>

//           <div class="disclaimer">
//             <p><strong>⚖️ Legal Disclaimer</strong></p>
//             <p>This communication is issued for informational purposes only and shall not be construed as an offer, sanction letter, approval, or legally binding commitment of any nature. Loan processing, eligibility, approval, interest rates, tenure, terms and conditions, and disbursement are subject to the policies, credit norms, risk assessment, credit bureau evaluation, submission and verification of complete and satisfactory documentation, and final approval of the respective bank or NBFC. Infinity Loans & Business Solutions acts solely as a financial advisory and loan facilitation service provider and does not assume responsibility for approval or rejection decisions taken by lending institutions.</p>
//             <p><strong>🔐 Confidentiality & Data Protection Notice</strong></p>
//             <p>This communication, including any attachments, is confidential and intended solely for the use of the designated recipient(s). It may contain privileged, proprietary, or sensitive information belonging to Infinity Loans & Business Solutions and/or its clients. Any unauthorized review, access, use, disclosure, reproduction, copying, forwarding, or distribution of this communication, in whole or in part, is strictly prohibited and may be unlawful.</p>
//             <p>If you are not the intended recipient, or if you have received this communication in error, please notify the sender immediately, refrain from any further use or dissemination of its contents, and permanently delete or destroy all copies from your system and records.</p>
//             <p>All personal and financial data contained herein is processed and protected in accordance with applicable data protection, privacy, and confidentiality laws and is accessed strictly on a need-to-know basis by authorized personnel only.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     // Helper function to get proper loan type name
//     const getLoanTypeName = (loanType) => {
//       const loanTypeMap = {
//         'salaried': 'Salaried Employee Loan',
//         'business': 'Business Loan',
//         'personal': 'Personal Loan',
//         'home': 'Home Loan',
//         'car': 'Car Loan',
//         'education': 'Education Loan',
//         'property': 'Property Loan',
//         'professional': 'Professional Loan',
//         'doctor': 'Doctor Loan',
//         'ca': 'CA Loan',
//         'architect': 'Architect Loan',
//         'unified': 'Business Loan',
//         'credit-card': 'Credit Card'
//       };
//       return loanTypeMap[loanType] || (loanType.charAt(0).toUpperCase() + loanType.slice(1)).replace(' Loan', '');
//     };

//     // Get loan type name for header
//     const loanTypeName = getLoanTypeName(loanType);
    
//     // Special header for credit card
//     const getHeaderTitle = (loanType) => {
//       if (loanType === 'credit-card') {
//         return 'Thank You for Your Credit Card Application!';
//       }
//       return `Thank You for Your ${loanTypeName} Application!`;
//     };

//     // Replace placeholders
//     const finalHtml = htmlContent
//       .replace(/{{CUSTOMER_NAME}}/g, customerName)
//       .replace(/{{APPLICATION_NUMBER}}/g, applicationNumber)
//       .replace(/{{APPLICATION_DATE}}/g, applicationDate)
//       .replace(/{{LOAN_TYPE}}/g, loanTypeName)
//       .replace(/{{LOAN_TYPE_NAME}}/g, loanTypeName)
//       .replace(/{{LOAN_AMOUNT}}/g, loanAmount || "Not specified")
//       .replace(/{{BANK_NAME}}/g, bankName || "Not specified")
//       .replace(/{{LIMIT_AMOUNT}}/g, limitAmount || "Not specified")
//       .replace(/{{CARD_TYPE}}/g, cardType || "Not specified");

//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: customerEmail,
//       subject: `Loan Application Under Review – Reference No: ${applicationNumber}`,
//       html: finalHtml,
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error sending loan application confirmation email:", error);
//     return { success: false, error: error.message };
//   }
// };
