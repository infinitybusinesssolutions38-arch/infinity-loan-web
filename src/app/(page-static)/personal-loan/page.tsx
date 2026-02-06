import type { Metadata } from "next";

import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Personal Loan - Fast Approval, Flexible EMI | Get Unsecured Loans",
  description: "Get quick personal loans with minimal documentation, flexible EMI, and instant approval. Perfect for medical, education, travel, and emergency needs. Apply online today.",
};

export default function PersonalLoanPage() {
  return <LoanDetailPage loanType="personal-loan" />;
}