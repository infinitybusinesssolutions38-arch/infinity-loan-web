const fs = require("fs");
const path = require("path");

const content = `import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { requireAdmin } from "../../lib/guard";
import { isValidObjectId } from "../../lib/validate";
import SalariedLoanModel from "../../../models/salaried-loan-schema";
import BusinessLoanModel from "../../../models/business-loan-schema";

function parseReceiptId(compositeId) {
  const raw = String(compositeId || "").trim();
  const dashIdx = raw.lastIndexOf("-");
  if (dashIdx <= 0) return null;

  const loanId = raw.slice(0, dashIdx);
  const receiptIndex = Number(raw.slice(dashIdx + 1));

  if (!isValidObjectId(loanId)) return null;
  if (!Number.isInteger(receiptIndex) || receiptIndex < 0) return null;

  return { loanId, receiptIndex };
}

export async function DELETE(req, { params }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.res;

  const resolvedParams = await params;
  const parsed = parseReceiptId(resolvedParams?.id);
  if (!parsed) {
    return NextResponse.json({ success: false, message: "Invalid receipt id" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const loanType = String(searchParams.get("loanType") || "").trim();
  if (loanType !== "salaried" && loanType !== "business") {
    return NextResponse.json({ success: false, message: "Invalid loan type" }, { status: 400 });
  }

  await connectDB();

  const Model = loanType === "business" ? BusinessLoanModel : SalariedLoanModel;
  const loan = await Model.findById(parsed.loanId);
  if (!loan) {
    return NextResponse.json({ success: false, message: "Loan application not found" }, { status: 404 });
  }

  const receipts = Array.isArray(loan.paymentReceipts) ? [...loan.paymentReceipts] : [];
  if (parsed.receiptIndex >= receipts.length) {
    return NextResponse.json({ success: false, message: "Payment receipt not found" }, { status: 404 });
  }

  receipts.splice(parsed.receiptIndex, 1);
  loan.paymentReceipts = receipts;
  await loan.save();

  return NextResponse.json({
    success: true,
    message: "Payment receipt deleted successfully",
  });
}
`;

const target = path.join(
  __dirname,
  "..",
  "src",
  "app",
  "api",
  "admin",
  "payment-receipts",
  "[id]",
  "route.js"
);
fs.writeFileSync(target, content, "utf8");
console.log("Wrote", target);