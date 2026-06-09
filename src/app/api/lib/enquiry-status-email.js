import {
  createDirectorMailTransport,
  resolveDirectorFromAddress,
} from "./director-mail-transport";

function normalizeEnquiryStatusForEmail(status) {
  const raw = String(status || "").trim();
  if (/^contacted$/i.test(raw)) return "Contacted";
  if (/^closed$/i.test(raw)) return "Closed";
  return raw;
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

function getEnquiryTypeLabel(enquiryType) {
  return enquiryType === "regular" ? "General Enquiry" : "Loan Enquiry";
}

function buildEnquiryStatusEmailHtml({
  status,
  customerName,
  referenceNumber,
  enquiryDate,
  enquiryTypeLabel,
  subjectLine,
  messagePreview,
}) {
  const isContacted = status === "Contacted";
  const statusBadgeColor = isContacted ? "#00AEEF" : "#28a745";

  const headerTitle = isContacted
    ? "Update on Your Enquiry — Our Team Has Reached Out"
    : "Your Enquiry Has Been Closed";
  const headerSubtitle = isContacted
    ? "We Are Working on Your Request"
    : "Thank You for Contacting Infinity Loans & Business Solutions";

  const currentStatusSection = isContacted
    ? `<p>We are pleased to inform you that our team has reviewed your enquiry and initiated contact regarding your request.</p>
       <p>A member of our team may reach you via phone, email, or WhatsApp to discuss your requirements, provide guidance, or request any additional information needed to assist you further.</p>
       <p>We remain committed to delivering a transparent, efficient, and professional experience.</p>`
    : `<p>We are writing to inform you that your enquiry has been marked as <strong>Closed</strong> in our system.</p>
       <p>If your query has been resolved, we thank you for choosing Infinity Loans & Business Solutions. Should you require any further assistance or wish to submit a new enquiry, please feel free to contact us at any time.</p>`;

  const nextStepsSection = isContacted
    ? `<ul style="margin-left: 20px;">
         <li>Please keep your enquiry reference handy for faster assistance</li>
         <li>Ensure your phone and email are accessible for follow-up from our team</li>
         <li>Share any additional documents or details if requested by our Relationship Manager</li>
       </ul>`
    : `<ul style="margin-left: 20px;">
         <li>You may contact us again if you need further support or a new loan consultation</li>
         <li>Visit www.infinityloanservices.com to explore our loan products and services</li>
         <li>Quote your enquiry reference when reaching out for prompt assistance</li>
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
    .section-title { color: #00AEEF; font-weight: 600; margin-bottom: 15px; font-size: 18px; }
    .details-box { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #00AEEF; }
    .details-box p { margin: 12px 0; font-size: 15px; }
    .reference-number { background: #00AEEF; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; margin: 10px 0; }
    .status-badge { background: ${statusBadgeColor}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin: 5px 0; }
    .contact-box { background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #e9ecef; }
    .contact-box ul { margin: 15px 0; padding-left: 0; list-style: none; }
    .contact-box li { margin: 10px 0; font-size: 15px; }
    .footer { border-top: 1px solid #e9ecef; margin-top: 30px; padding-top: 25px; text-align: center; color: #6c757d; font-size: 13px; }
    .office-box { margin: 20px 0; padding: 20px; background: #f8f9fa; border-left: 4px solid #00AEEF; border-radius: 8px; }
    .office-box h4 { margin: 0 0 15px 0; color: #2c3e50; font-size: 16px; }
    .disclaimer { font-size: 12px; color: #6c757d; margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${headerTitle}</h1>
      <p>${headerSubtitle}</p>
    </div>

    <div class="content">
      <p class="greeting">Dear ${customerName || "Customer"},</p>
      <p>Thank you for choosing <strong>Infinity Loans & Business Solutions</strong>.</p>

      <div class="section">
        <div class="section-title">📄 Enquiry Details</div>
        <div class="details-box">
          <p><strong>Reference:</strong> <span class="reference-number">${referenceNumber || "—"}</span></p>
          <p><strong>Enquiry Date:</strong> ${enquiryDate || "—"}</p>
          <p><strong>Enquiry Type:</strong> ${enquiryTypeLabel}</p>
          ${subjectLine ? `<p><strong>Subject:</strong> ${subjectLine}</p>` : ""}
          <p><strong>Current Status:</strong> <span class="status-badge">${status}</span></p>
          ${messagePreview ? `<p><strong>Your Message:</strong> ${messagePreview}</p>` : ""}
        </div>
        <p><em>Kindly quote the above reference in all future communications for faster assistance.</em></p>
      </div>

      <div class="section">
        <div class="section-title">🔍 Current Status</div>
        ${currentStatusSection}
      </div>

      <div class="section">
        <div class="section-title">🔄 Next Steps</div>
        ${nextStepsSection}
      </div>

      <div class="section">
        <div class="section-title">📞 Need Assistance?</div>
        <div class="contact-box">
          <ul>
            <li><strong>Phone/WhatsApp:</strong> +91 9579880841 | +91 9766616960</li>
            <li><strong>Email:</strong> business@infinityloanservices.com</li>
            <li><strong>Website:</strong> www.infinityloanservices.com</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🏢 Our Office Locations</div>
        <div class="office-box">
          <h4>Gujarat Office</h4>
          <p>Incuspaze 3rd Floor, 1965, Gorwa,<br>Alembic City, Alembic Road,<br>Vadodara – 390003 Gujarat, India</p>
        </div>
        <div class="office-box">
          <h4>Pune Office</h4>
          <p>Saraswati Sadan, 7–8,<br>Next to ICICI Prudential Mutual Fund,<br>Behind Viera Unisex Salon & Riviresa Society Baner,<br>Pune – 411045 Maharashtra, India</p>
        </div>
      </div>

      <p>Warm Regards,<br><strong>Team Infinity Loans & Business Solutions</strong></p>

      <div class="footer">
        <p><strong>📞 Customer Support:</strong> +91 9579880841 | +91 9766616960</p>
        <p><strong>📧 Email:</strong> business@infinityloanservices.com</p>
        <p><strong>🌐 Website:</strong> www.infinityloanservices.com</p>
      </div>

      <div class="disclaimer">
        <p><strong>🔐 Confidentiality Notice</strong></p>
        <p>This communication is confidential and intended solely for the designated recipient(s). If you received this in error, please notify the sender and delete all copies.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function extractEnquiryEmail(record) {
  return String(record?.email || "").trim().toLowerCase();
}

export function extractEnquiryName(record, enquiryType) {
  if (enquiryType === "regular") {
    return String(record?.name || "").trim() || "Customer";
  }
  const first = String(record?.firstname || record?.firstName || "").trim();
  const last = String(record?.lastname || record?.lastName || "").trim();
  return `${first} ${last}`.trim() || "Customer";
}

function buildReference(record, enquiryType) {
  if (enquiryType === "loan" && record?.subject) {
    return record.subject;
  }
  const id = record?._id?.toString?.() || "";
  if (id) {
    return `ENQ-${id.slice(-8).toUpperCase()}`;
  }
  return "ENQ-N/A";
}

export async function sendEnquiryStatusUpdateEmail({
  customerEmail,
  customerName,
  referenceNumber,
  enquiryDate,
  enquiryType,
  status,
  subjectLine,
  messagePreview,
}) {
  const email = String(customerEmail || "").trim().toLowerCase();
  if (!email) {
    return { success: false, error: "No customer email" };
  }

  const normalizedStatus = normalizeEnquiryStatusForEmail(status);
  if (normalizedStatus !== "Contacted" && normalizedStatus !== "Closed") {
    return { success: false, error: "Status does not trigger email" };
  }

  const enquiryTypeLabel = getEnquiryTypeLabel(enquiryType);
  const { transporter, fromAddress } = createDirectorMailTransport();

  const mailSubject =
    normalizedStatus === "Contacted"
      ? `Enquiry Update — Our Team Has Contacted You (${referenceNumber || "Reference"})`
      : `Enquiry Closed — Reference: ${referenceNumber || "N/A"}`;

  const html = buildEnquiryStatusEmailHtml({
    status: normalizedStatus,
    customerName,
    referenceNumber,
    enquiryDate: formatDate(enquiryDate),
    enquiryTypeLabel,
    subjectLine: subjectLine || "",
    messagePreview: messagePreview ? String(messagePreview).slice(0, 200) : "",
  });

  await transporter.sendMail({
    from: `"Infinity Loans & Business Solutions" <${fromAddress}>`,
    replyTo: resolveDirectorFromAddress(),
    to: email,
    subject: mailSubject,
    html,
  });

  console.log("Enquiry status email sent:", { to: email, status: normalizedStatus, referenceNumber });
  return { success: true };
}

export async function maybeSendEnquiryStatusChangeEmail({
  previousStatus,
  newStatus,
  record,
  enquiryType,
}) {
  const normalizedNew = normalizeEnquiryStatusForEmail(newStatus);
  const normalizedPrev = normalizeEnquiryStatusForEmail(previousStatus);

  if (!normalizedNew || normalizedNew === normalizedPrev) return { skipped: true };
  if (normalizedNew !== "Contacted" && normalizedNew !== "Closed") {
    return { skipped: true };
  }

  const customerEmail = extractEnquiryEmail(record);
  if (!customerEmail) {
    console.warn("Enquiry status email skipped: no customer email", {
      enquiryType,
      id: record?._id?.toString?.(),
    });
    return { skipped: true, reason: "no email" };
  }

  try {
    return await sendEnquiryStatusUpdateEmail({
      customerEmail,
      customerName: extractEnquiryName(record, enquiryType),
      referenceNumber: buildReference(record, enquiryType),
      enquiryDate: record?.createdAt || new Date(),
      enquiryType,
      status: normalizedNew,
      subjectLine: enquiryType === "loan" ? record?.subject : record?.company,
      messagePreview: record?.message,
    });
  } catch (err) {
    console.error("Enquiry status email failed:", err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}
