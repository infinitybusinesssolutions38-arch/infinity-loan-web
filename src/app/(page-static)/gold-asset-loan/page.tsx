import type { Metadata } from "next";

import LoanDetailPage from "@/components/loans/LoanDetailPage";

export const metadata: Metadata = {
  title: "Gold & Asset Loan | Unlock Value from Assets",
  description:
    "Get instant funds against gold and other assets with transparent valuation and quick disbursal. Apply online today.",
};

export default function GoldAssetLoanPage() {
  return <LoanDetailPage loanType="gold-asset-loan" />;
}