import OtpModel from "../models/otp-schema";

function normalizeEmailKey(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeOtpValue(otp) {
  return String(otp || "").trim();
}

/**
 * Generate and store OTP for email
 */
export function generateAndStoreOTP(email) {
  const key = normalizeEmailKey(email);
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

  return OtpModel.findOneAndUpdate(
    { email: key },
    { email: key, otp, expiresAt: new Date(expiryTime) },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).then(() => otp);
}

/**
 * Validate OTP for email
 * Returns OTP if valid, null if invalid or expired
 */
export function validateOTP(email, providedOtp) {
  const key = normalizeEmailKey(email);
  const otp = normalizeOtpValue(providedOtp);

  return OtpModel.findOne({ email: key }).then((stored) => {
    if (!stored) return false;

    const expiresAtMs = stored?.expiresAt ? new Date(stored.expiresAt).getTime() : 0;
    if (!expiresAtMs || Date.now() > expiresAtMs) {
      return OtpModel.deleteOne({ email: key }).then(() => false);
    }

    if (String(stored.otp || "") !== otp) return false;
    return true;
  });
}

/**
 * Clear OTP after successful verification
 */
export function clearOTP(email) {
  const key = normalizeEmailKey(email);
  return OtpModel.deleteOne({ email: key });
}

/**
 * Get remaining time for OTP expiry (in seconds)
 */
export function getOTPExpiryTime(email) {
  const key = normalizeEmailKey(email);
  return OtpModel.findOne({ email: key }).then((stored) => {
    if (!stored) return 0;
    const expiresAtMs = stored?.expiresAt ? new Date(stored.expiresAt).getTime() : 0;
    if (!expiresAtMs) return 0;
    const remainingMs = expiresAtMs - Date.now();
    return Math.max(0, Math.floor(remainingMs / 1000));
  });
}
