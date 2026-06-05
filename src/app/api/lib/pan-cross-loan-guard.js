import connectDB from "./db";
import BusinessLoanModel from "../models/business-loan-schema";
import SalariedLoanModel from "../models/salaried-loan-schema";

export function normalizePanNumber(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function panNumberRegex(normalizedPan) {
  const escaped = normalizedPan
    .split("")
    .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s*");
  return new RegExp(`^${escaped}$`, "i");
}

/**
 * Block the same individual PAN from being used on both salaried and business loans.
 * @param {unknown} panRaw
 * @param {"salaried"|"business"} submittingType
 */
export async function assertPanNotUsedInOtherLoanType(panRaw, submittingType) {
  await connectDB();
  const pan = normalizePanNumber(panRaw);

  if (!pan) {
    return { ok: false, status: 400, message: "PAN number is required." };
  }

  if (pan.length !== 10) {
    return {
      ok: false,
      status: 400,
      message: "Please enter a valid 10-character PAN number.",
    };
  }

  const regex = panNumberRegex(pan);

  if (submittingType === "salaried") {
    const existing = await BusinessLoanModel.findOne({ panNumber: regex })
      .select("applicationRef")
      .lean();

    if (existing) {
      return {
        ok: false,
        status: 409,
        message:
          "This PAN is already used for a business loan application. You cannot apply for a salaried loan with the same PAN card.",
        code: "PAN_USED_BUSINESS",
      };
    }
  }

  if (submittingType === "business") {
    const existing = await SalariedLoanModel.findOne({ panNumber: regex })
      .select("applicationRef")
      .lean();

    if (existing) {
      return {
        ok: false,
        status: 409,
        message:
          "This PAN is already used for a salaried loan application. You cannot apply for a business loan with the same PAN card.",
        code: "PAN_USED_SALARIED",
      };
    }
  }

  return { ok: true, pan };
}
