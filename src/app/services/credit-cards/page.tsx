import type { Metadata } from "next";
import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Credit & Cards | Infinity Loans",
  description:
    "Explore credit lines, business and personal cards, and BNPL options. Check eligibility or apply with a clear CTA.",
};

export default function CreditCardsServicesPage() {
  return <LoanDetailPage loanType="credit-cards" />;
}
