import type { Metadata } from "next";

import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Vehicle Loan | Finance Your Dream Car, Bike & Commercial Vehicle",
  description:
    "Get instant vehicle loans for cars, bikes, and commercial vehicles. Competitive rates, flexible EMI, quick approval. Apply online today.",
};

export default function VehicleLoanPage() {
  return <LoanDetailPage loanType="vehicle-loan" />;
}