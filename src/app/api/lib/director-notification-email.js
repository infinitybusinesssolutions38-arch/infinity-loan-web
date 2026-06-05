import { createDirectorMailTransport } from "./director-mail-transport";

/** Director inbox(es) for all internal form submission alerts. */
export function resolveDirectorRecipients() {
  const raw = [
    process.env.DIRECTOR_EMAIL,
    process.env.DIRECTORMAIL,
    process.env.ADMIN_USER,
  ];

  const seen = new Set();
  const recipients = [];

  for (const entry of raw) {
    const email = String(entry || "").trim().toLowerCase();
    if (email && !seen.has(email)) {
      seen.add(email);
      recipients.push(email);
    }
  }

  return recipients;
}

/**
 * Send an internal alert to the director when a user submits a form.
 * Uses Zoho/business SMTP so delivery matches the director inbox.
 */
export async function sendDirectorInternalMail({
  subject,
  html,
  text,
  replyTo,
  recipients,
}) {
  const toList = (
    Array.isArray(recipients) && recipients.length
      ? recipients
      : resolveDirectorRecipients()
  )
    .map((entry) => String(entry || "").trim().toLowerCase())
    .filter(Boolean);

  const uniqueRecipients = [...new Set(toList)];
  if (!uniqueRecipients.length) {
    return { success: false, error: "No director email configured" };
  }

  const { transporter, fromAddress } = createDirectorMailTransport();

  await transporter.sendMail({
    from: `"Infinity Loans & Business Solutions" <${fromAddress}>`,
    replyTo: replyTo || fromAddress,
    to: uniqueRecipients.join(", "),
    subject,
    html,
    text,
  });

  console.log("Director submission notification sent:", {
    subject,
    to: uniqueRecipients,
  });

  return { success: true, recipients: uniqueRecipients };
}

export async function notifyDirectorInternalMail(options) {
  try {
    return await sendDirectorInternalMail(options);
  } catch (err) {
    console.error("Director internal mail failed:", err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSubmittedAt(value) {
  const d = value ? new Date(value) : new Date();
  if (Number.isNaN(d.getTime())) {
    return String(value || new Date().toISOString());
  }
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function buildDirectorNotificationHtml({
  serviceName,
  referenceId,
  submittedAt,
  fields,
  message,
  actionNote,
  extraHtml,
}) {
  const rows = (fields || [])
    .filter((row) => row && row.label)
    .map(
      (row) => `
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #666; width: 38%;">${escapeHtml(row.label)}:</td>
        <td style="padding: 8px;">${escapeHtml(row.value ?? "-")}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:'Segoe UI',Tahoma,Arial,sans-serif;">
  <div style="max-width:700px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#00AEEF 0%,#33C1F3 100%);padding:36px 24px;border-radius:12px 12px 0 0;color:#fff;text-align:center;">
      <h1 style="margin:0;font-size:26px;">New Form Submission</h1>
      <p style="margin:10px 0 0 0;font-size:16px;opacity:0.95;">${escapeHtml(serviceName)}</p>
    </div>
    <div style="background:#fff;padding:28px 24px;border-radius:0 0 12px 12px;color:#333;line-height:1.7;">
      <p style="margin:0 0 16px 0;">A new submission has been received on the Infinity Loans website.</p>
      <div style="background:#f8f9fa;padding:20px;border-radius:10px;border-left:4px solid #00AEEF;margin:20px 0;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          ${referenceId ? `<tr><td style="padding:8px;font-weight:bold;color:#666;">Reference ID:</td><td style="padding:8px;">${escapeHtml(referenceId)}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;color:#666;">Submitted At:</td><td style="padding:8px;">${escapeHtml(formatSubmittedAt(submittedAt))}</td></tr>
          ${rows}
        </table>
      </div>
      ${
        message
          ? `<div style="background:#fff7ed;padding:16px;border-radius:8px;border:1px solid #fed7aa;margin:20px 0;">
               <p style="margin:0 0 8px 0;font-weight:700;color:#9a3412;">Message</p>
               <p style="margin:0;white-space:pre-wrap;word-wrap:break-word;">${escapeHtml(message)}</p>
             </div>`
          : ""
      }
      ${
        extraHtml
          ? `<div style="margin:20px 0;">${extraHtml}</div>`
          : ""
      }
      <div style="background:#fff3cd;padding:16px;border-radius:8px;border:1px solid #ffeaa7;margin:20px 0;">
        <p style="margin:0;font-weight:700;color:#00AEEF;">Action Required</p>
        <p style="margin:8px 0 0 0;">${escapeHtml(actionNote || "Please review this submission in the admin panel and follow up with the applicant promptly.")}</p>
      </div>
      <p style="margin:24px 0 0 0;color:#666;font-size:13px;">Infinity Loans & Business Solutions — Internal Notification</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Notify director when any public form is submitted.
 * Failures are logged by callers; must not block form save.
 */
export async function sendDirectorFormNotification({
  serviceName,
  referenceId = "",
  submittedAt,
  fields = [],
  message = "",
  actionNote = "",
  extraHtml = "",
  subject,
}) {
  const recipients = resolveDirectorRecipients();
  if (!recipients.length) {
    return { success: false, error: "No director email configured" };
  }

  const { transporter, fromAddress } = createDirectorMailTransport();
  const mailSubject =
    subject ||
    `New ${serviceName} Submission${referenceId ? ` — ${referenceId}` : ""}`;

  const html = buildDirectorNotificationHtml({
    serviceName,
    referenceId,
    submittedAt,
    fields,
    message,
    actionNote,
    extraHtml,
  });

  await transporter.sendMail({
    from: `"Infinity Loans & Business Solutions" <${fromAddress}>`,
    replyTo: fromAddress,
    to: recipients.join(", "),
    subject: mailSubject,
    html,
  });

  console.log("Director form notification sent:", {
    serviceName,
    referenceId,
    to: recipients,
  });

  return { success: true, recipients };
}

/** Fire-and-forget wrapper for route handlers. */
export async function notifyDirectorOnFormSubmit(options) {
  try {
    return await sendDirectorFormNotification(options);
  } catch (err) {
    console.error(`Director notification failed (${options?.serviceName || "form"}):`, err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}
