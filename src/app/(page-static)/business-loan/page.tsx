import type { Metadata } from "next";

import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Business Loan - Fast Approval | Growth Capital for MSMEs & Enterprises",
  description: "Get business loans with competitive rates, flexible tenure, and quick approval. Fund your working capital, expansion, equipment, and more.",
};

export default function BusinessLoanPage() {
  return <LoanDetailPage loanType="business-loan" />;
}