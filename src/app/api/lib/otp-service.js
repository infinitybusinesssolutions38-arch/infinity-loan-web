// In-memory OTP store (in production, use Redis or MongoDB with TTL)
const otpStore = new Map();

/**
 * Generate and store OTP for email
 */
export function generateAndStoreOTP(email) {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email.toLowerCase(), { otp, expiryTime });
  return otp;
}

/**
 * Validate OTP for email
 * Returns OTP if valid, null if invalid or expired
 */
export function validateOTP(email, providedOtp) {
  const stored = otpStore.get(email.toLowerCase());
  
  if (!stored) return false;
  
  // Check expiry
  if (Date.now() > stored.expiryTime) {
    otpStore.delete(email.toLowerCase());
    return false;
  }
  
  // Check OTP match
  if (stored.otp !== providedOtp) {
    return false;
  }
  
  return true;
}

/**
 * Clear OTP after successful verification
 */
export function clearOTP(email) {
  otpStore.delete(email.toLowerCase());
}

/**
 * Get remaining time for OTP expiry (in seconds)
 */
export function getOTPExpiryTime(email) {
  const stored = otpStore.get(email.toLowerCase());
  if (!stored) return 0;
  
  const remainingMs = stored.expiryTime - Date.now();
  return Math.max(0, Math.floor(remainingMs / 1000));
}
