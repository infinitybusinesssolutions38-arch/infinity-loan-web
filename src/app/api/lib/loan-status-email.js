import {
  createDirectorMailTransport,
  resolveDirectorFromAddress,
} from "./director-mail-transport";
import { COMPANY_OFFICE_EMAIL_SECTION_HTML } from "./company-contact.js";

function normalizeStatusForEmail(status) {
  const raw = String(status || "").trim();
  if (/^approved$/i.test(raw)) return "Approved";
  if (/^rejected$/i.test(raw)) return "Rejected";
  return raw;
}

function getLoanTypeName(loanType) {
  const map = {
    salaried: "Salaried Employee Loan",
    business: "Business Loan",
    personal: "Personal Loan",
    "credit-card": "Credit Card",
    partner: "Loan Partner Registration",
  };
  const key = String(loanType || "").trim().toLowerCase();
  return map[key] || "Loan Application";
}

function formatDate(value) {
  if (!value) {
    return new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return String(value);
  }
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function buildStatusEmailHtml({
  status,
  customerName,
  applicationNumber,
  applicationDate,
  loanTypeName,
  loanAmount,
  adminRemarks,
}) {
  const isApproved = status === "Approved";
  const headerTitle = isApproved
    ? `Your ${loanTypeName} Application Has Been Approved!`
    : `Update on Your ${loanTypeName} Application`;
  const headerSubtitle = isApproved
    ? "Congratulations — Your Application Has Been Approved"
    : "Application Status Update";

  const statusBadgeColor = isApproved ? "#28a745" : "#dc3545";

  const currentStatusSection = isApproved
    ? `<p>We are pleased to inform you that your application has been <strong>approved</strong> by our review team at Infinity Loans & Business Solutions.</p>
       <p>Your application has successfully cleared our preliminary review and internal compliance validation in accordance with partner lender requirements and applicable regulatory guidelines.</p>
       <p>A designated Relationship Manager / Loan Expert will contact you shortly regarding next steps, documentation (if any), and coordination with the partner bank or NBFC for further processing.</p>`
    : `<p>Thank you for your interest in Infinity Loans & Business Solutions and for submitting your application with us.</p>
       <p>After careful review of the information and documentation provided, we regret to inform you that your application could <strong>not be approved</strong> at this time.</p>
       ${adminRemarks ? `<p><strong>Remarks from our team:</strong> ${adminRemarks}</p>` : ""}
       <p>You may contact our support team if you need clarification or wish to discuss alternative financing options.</p>`;

  const nextStepsSection = isApproved
    ? `<p>The next phase of processing may include, but is not limited to, the following:</p>
       <ul style="margin-left: 20px;">
         <li>Final document verification and coordination with the partner lender</li>
         <li>Credit bureau checks and lender-specific risk assessment (where applicable)</li>
         <li>Sanction and disbursement processing as per the respective bank or NBFC policies</li>
         <li><strong>Indicative timeline:</strong> Subject to lender policies and completeness of documentation</li>
       </ul>
       <p>We remain committed to delivering a transparent, efficient, and professional loan processing experience.</p>`
    : `<p>You may consider the following options:</p>
       <ul style="margin-left: 20px;">
         <li>Contact our team for guidance on other suitable loan products</li>
         <li>Reapply in the future if your financial profile or requirements change</li>
         <li>Quote your Application Number when reaching out for faster assistance</li>
       </ul>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
    .container { max-width: 650px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 12px; }
    .header { background: linear-gradient(135deg, #00AEEF 0%, #33C1F3 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; color: white; text-align: center; }
    .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .header p { margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; }
    .content { padding: 30px; }
    .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; font-weight: 500; }
    .section { margin: 30px 0; }
    .section-title { color: #00AEEF; font-weight: 600; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center; }
    .details-box { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #00AEEF; }
    .details-box p { margin: 12px 0; font-size: 15px; }
    .details-box strong { color: #2c3e50; }
    .contact-box { background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #e9ecef; }
    .contact-box ul { margin: 15px 0; padding-left: 0; list-style: none; }
    .contact-box li { margin: 10px 0; font-size: 15px; }
    .footer { border-top: 1px solid #e9ecef; margin-top: 30px; padding-top: 25px; text-align: center; color: #6c757d; font-size: 13px; }
    .office-box { margin: 20px 0; padding: 20px; background: #f8f9fa; border-left: 4px solid #00AEEF; border-radius: 8px; }
    .office-box h4 { margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; }
    .office-box p { margin: 8px 0; font-size: 14px; }
    .disclaimer { font-size: 12px; color: #6c757d; margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; }
    .application-number { background: #00AEEF; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; margin: 10px 0; }
    .loan-type-badge { background: #28a745; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin: 5px 0; }
    .status-badge { background: ${statusBadgeColor}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin: 5px 0; }
    .amount-highlight { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 12px 20px; border-radius: 25px; font-size: 16px; font-weight: 700; display: inline-block; margin: 10px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${headerTitle}</h1>
      <p>${headerSubtitle}</p>
    </div>

    <div class="content">
      <p class="greeting">Dear ${customerName || "Applicant"},</p>

      <p>Thank you for choosing <strong>Infinity Loans & Business Solutions</strong> for your financing requirements.</p>

      <div class="section">
        <div class="section-title">📄 Application Details</div>
        <div class="details-box">
          <p><strong>Application Number:</strong> <span class="application-number">${applicationNumber || "—"}</span></p>
          <p><strong>Application Date:</strong> ${applicationDate || "—"}</p>
          <p><strong>Loan Product:</strong> <span class="loan-type-badge">${loanTypeName}</span></p>
          <p><strong>Applicant Name:</strong> ${customerName || "—"}</p>
          ${loanAmount ? `<p><strong>Requested Amount:</strong> <span class="amount-highlight">${loanAmount}</span></p>` : ""}
          <p><strong>Current Status:</strong> <span class="status-badge">${status}</span></p>
        </div>
        <p><em>Kindly quote the above Application Number in all future communications for faster assistance and effective tracking.</em></p>
      </div>

      <div class="section">
        <div class="section-title">🔍 Current Status</div>
        ${currentStatusSection}
      </div>

      <div class="section">
        <div class="section-title">🔄 ${isApproved ? "Next Steps" : "What You Can Do Next"}</div>
        ${nextStepsSection}
      </div>

      <div class="section">
        <div class="section-title">⚠️ Important Disclosures</div>
        <ul style="margin-left: 20px;">
          <li>Infinity Loans & Business Solutions acts strictly as a financial advisory and loan facilitation service provider.</li>
          <li>Final sanction, interest rates, tenure, terms & conditions, and disbursement decisions are taken solely by the respective bank or NBFC, in accordance with their internal credit policies, credit bureau evaluations, risk assessment frameworks, and regulatory norms.</li>
          <li>Infinity Loans & Business Solutions does not guarantee loan approval, sanction, or disbursement unless explicitly confirmed by the lending institution.</li>
        </ul>
      </div>

      <div class="section">
        <div class="section-title">🔐 Privacy Policy, Data Protection & Customer Consent</div>
        <p>Infinity Loans & Business Solutions is committed to protecting your privacy and safeguarding the confidentiality, integrity, and security of your personal, financial, and business information.</p>
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
            <li><strong>Phone/WhatsApp:</strong> +91 9579880841 | +91 9766616960</li>
            <li><strong>Email:</strong> business@infinityloanservices.com</li>
            <li><strong>Website:</strong> www.infinityloanservices.com</li>
          </ul>
        </div>
      </div>

      ${COMPANY_OFFICE_EMAIL_SECTION_HTML}

      <p>Warm Regards,<br><strong>Team Infinity Loans & Business Solutions</strong></p>

      <div class="footer">
        <p><strong>📞 Customer Support:</strong> +91 9579880841 | +91 9766616960</p>
        <p><strong>📧 Email:</strong> business@infinityloanservices.com</p>
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
  </div>
</body>
</html>`;
}

/**
 * Send approved/rejected status email to applicant (from director/business mail).
 */
export async function sendLoanStatusUpdateEmail({
  customerEmail,
  customerName,
  applicationNumber,
  applicationDate,
  loanType,
  loanAmount,
  status,
  adminRemarks,
}) {
  const email = String(customerEmail || "").trim().toLowerCase();
  if (!email) {
    return { success: false, error: "No customer email" };
  }

  const emailStatus = normalizeStatusForEmail(status);
  if (emailStatus !== "Approved" && emailStatus !== "Rejected") {
    return { success: false, error: "Status does not trigger email" };
  }

  const loanTypeName = getLoanTypeName(loanType);
  const { transporter, fromAddress } = createDirectorMailTransport();

  const subject =
    emailStatus === "Approved"
      ? `Loan Application Approved – Reference No: ${applicationNumber || "N/A"}`
      : `Loan Application Update – Reference No: ${applicationNumber || "N/A"}`;

  const html = buildStatusEmailHtml({
    status: emailStatus,
    customerName: customerName || "Applicant",
    applicationNumber,
    applicationDate: formatDate(applicationDate),
    loanTypeName,
    loanAmount: loanAmount ? String(loanAmount) : "",
    adminRemarks: adminRemarks || "",
  });

  await transporter.sendMail({
    from: `"Infinity Loans & Business Solutions" <${fromAddress}>`,
    replyTo: resolveDirectorFromAddress(),
    to: email,
    subject,
    html,
  });

  console.log("Loan status email sent:", { to: email, status: emailStatus, applicationNumber });
  return { success: true };
}

export function extractApplicantEmail(record) {
  return (
    record?.personalEmail ||
    record?.email ||
    record?.officialEmail ||
    record?.businessEmail ||
    ""
  );
}

export function extractApplicantName(record) {
  const first =
    record?.firstName ||
    record?.firstname ||
    record?.fullName ||
    "";
  const last = record?.lastName || record?.lastname || "";
  return `${first} ${last}`.trim() || "Applicant";
}

export function extractLoanAmount(record) {
  return (
    record?.requiredLoanAmount ||
    record?.loanAmountRequired ||
    record?.preferredLoan ||
    ""
  );
}

export async function maybeSendStatusChangeEmail({
  previousStatus,
  newStatus,
  record,
  loanType,
  adminRemarks,
}) {
  const normalizedNew = normalizeStatusForEmail(newStatus);
  const normalizedPrev = normalizeStatusForEmail(previousStatus);

  if (!normalizedNew || normalizedNew === normalizedPrev) return { skipped: true };
  if (normalizedNew !== "Approved" && normalizedNew !== "Rejected") {
    return { skipped: true };
  }

  const customerEmail = extractApplicantEmail(record);
  if (!customerEmail) {
    console.warn("Status email skipped: no applicant email", {
      loanType,
      applicationRef: record?.applicationRef,
    });
    return { skipped: true, reason: "no email" };
  }

  try {
    return await sendLoanStatusUpdateEmail({
      customerEmail,
      customerName: extractApplicantName(record),
      applicationNumber: record?.applicationRef || record?._id?.toString?.() || "",
      applicationDate: record?.createdAt || new Date(),
      loanType,
      loanAmount: extractLoanAmount(record),
      status: normalizedNew,
      adminRemarks,
    });
  } catch (err) {
    console.error("Status update email failed:", err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}
