import type { Metadata } from "next";

import EmiCalculatorClient from "./EmiCalculatorClient";

export const metadata: Metadata = {
  title: "EMI Calculator - Infinity Loans & Business Solutions",
};

export default function EmiCalculatorPage() {
  return <EmiCalculatorClient />;
}