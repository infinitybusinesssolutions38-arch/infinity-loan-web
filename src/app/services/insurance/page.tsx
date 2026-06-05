import type { Metadata } from "next";
import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Insurance | Infinity Loans & Business Solutions",
  description:
    "Explore life, health, motor, home and business insurance. Get guidance and apply with a clear CTA.",
};

export default function InsuranceServicesPage() {
  return <LoanDetailPage loanType="insurance" />;
}
