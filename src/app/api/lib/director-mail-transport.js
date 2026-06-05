import nodemailer from "nodemailer";

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

/** Director / business from address for customer-facing status emails. */
export function resolveDirectorFromAddress() {
  return (
    process.env.DIRECTOR_EMAIL ||
    process.env.DIRECTORMAIL ||
    process.env.ADMIN_USER ||
    process.env.EMAIL_FROM ||
    process.env.EMAIL_USER ||
    "business@infinityloanservices.com"
  ).trim();
}

/**
 * SMTP transport aligned with the director from address.
 * Uses Zoho (EMAIL_HOST + EMAIL_USER) when sending as business@infinityloanservices.com.
 */
export function createDirectorMailTransport() {
  const fromAddress = resolveDirectorFromAddress();
  const fromLower = normalizeEmail(fromAddress);

  const zohoHost = process.env.EMAIL_HOST;
  const zohoUser = String(process.env.EMAIL_USER || process.env.EMAIL_FROM || "").trim();
  const zohoPass = process.env.EMAIL_PASS;

  if (
    zohoHost &&
    zohoUser &&
    zohoPass &&
    normalizeEmail(zohoUser) === fromLower
  ) {
    const port = parseInt(process.env.EMAIL_PORT || "465", 10);
    const secure =
      typeof process.env.EMAIL_SECURE !== "undefined"
        ? String(process.env.EMAIL_SECURE).toLowerCase() === "true"
        : port === 465;

    return {
      transporter: nodemailer.createTransport({
        host: zohoHost,
        port,
        secure,
        auth: { user: zohoUser, pass: zohoPass },
      }),
      fromAddress: zohoUser,
    };
  }

  const host =
    process.env.EMAIL_SMTP_HOST ||
    process.env.EMAIL_smtp_HOST ||
    "smtp.gmail.com";

  const port = parseInt(
    process.env.EMAIL_SMTP_PORT ||
      process.env.EMAIL_smtp_PORT ||
      process.env.EMAIL_PORT ||
      "465",
    10
  );

  const user =
    process.env.EMAIL_SMTP_USER ||
    process.env.EMAIL_HOST_USER ||
    process.env.EMAIL_USER;

  const pass =
    process.env.EMAIL_SMTP_PASS ||
    process.env.EMAIL_HOST_PASSWORD ||
    process.env.EMAIL_PASS;

  const secure =
    typeof process.env.EMAIL_SECURE !== "undefined"
      ? String(process.env.EMAIL_SECURE).toLowerCase() === "true"
      : port === 465;

  if (!user || !pass) {
    throw new Error("Email transporter is not configured.");
  }

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    }),
    fromAddress: user,
  };
}
