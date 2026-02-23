import type { Metadata } from "next";

import ABBCalculatorClient from "./ABBCalculatorClient";

export const metadata: Metadata = {
  title: "ABB Calculator - Infinity Loans & Business Solutions",
};

export default function ABBCalculatorPage() {
  return <ABBCalculatorClient />;
}
