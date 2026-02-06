import type { Metadata } from "next";

import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Home & Property Loan",
};

export default function HomePropertyLoanPage() {
  return <LoanDetailPage loanType="home-property-loan" />;
}
