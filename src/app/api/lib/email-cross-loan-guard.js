import connectDB from "./db";
import SalariedLoanModel from "../models/salaried-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import PersonalLoanModel from "../models/personal-loan-schema";
import CreditCardModel from "../models/credit-card-schema";

const LOAN_TYPE_LABELS = {
  salaried: "salaried loan",
  business: "business loan",
  personal: "personal loan",
  credit_card: "credit card",
};

function escapeRegex(value) {
  return String(value || "")
    .split("")
    .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("");
}

export function normalizePersonalEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function personalEmailRegex(email) {
  return new RegExp(`^${escapeRegex(email)}$`, "i");
}

async function findExistingByEmail(Model, email) {
  return Model.findOne({ personalEmail: personalEmailRegex(email) })
    .select("applicationRef")
    .lean();
}

const COLLECTIONS = [
  { type: "salaried", Model: SalariedLoanModel },
  { type: "business", Model: BusinessLoanModel },
  { type: "personal", Model: PersonalLoanModel },
  { type: "credit_card", Model: CreditCardModel },
];

/**
 * Block duplicate submissions for the same loan category using the same email.
 * The same email may be used across different categories (e.g. salaried + business).
 * @param {unknown} emailRaw
 * @param {"salaried"|"business"|"personal"|"credit_card"} submittingType
 */
export async function assertEmailNotUsedForLoanApplication(
  emailRaw,
  submittingType
) {
  await connectDB();
  const email = normalizePersonalEmail(emailRaw);

  if (!email) {
    return { ok: false, status: 400, message: "Email is required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      status: 400,
      message: "Please enter a valid email address.",
    };
  }

  const target = COLLECTIONS.find(({ type }) => type === submittingType);
  if (!target) {
    return {
      ok: false,
      status: 400,
      message: "Invalid loan application type.",
    };
  }

  const existing = await findExistingByEmail(target.Model, email);
  if (existing) {
    const label = LOAN_TYPE_LABELS[submittingType] || "loan";
    return {
      ok: false,
      status: 409,
      message: `An application with this email already exists for ${label}. Check Applied Loans or use a different email to submit again.`,
      code: "DUPLICATE_EMAIL",
    };
  }

  return { ok: true, email };
}

export function isDuplicatePersonalEmailError(error) {
  return (
    error?.code === 11000 &&
    error?.keyPattern &&
    Object.keys(error.keyPattern)[0] === "personalEmail"
  );
}

/** Map apply-now `loanType` form value to guard submitting type. */
export function applyNowLoanTypeToGuardType(loanType) {
  const t = String(loanType || "")
    .trim()
    .toLowerCase();
  if (t === "salaried") return "salaried";
  if (t === "business") return "business";
  if (t === "personal" || t === "unified") return "personal";
  if (t === "credit-card") return "credit_card";
  return null;
}
