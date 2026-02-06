import type { Metadata } from "next";
import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Government Schemes | Infinity Loans",
  description:
    "Explore government-backed loan schemes for MSMEs and entrepreneurs. Check eligibility or apply with guidance.",
};

export default function GovernmentSchemesServicesPage() {
  return <LoanDetailPage loanType="government-schemes" />;
}
