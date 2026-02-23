import type { Metadata } from "next";

import ObligationCalculatorClient from "./ObligationCalculatorClient";

export const metadata: Metadata = {
  title: "Obligation Calculator - Infinity Loans & Business Solutions",
};

export default function ObligationCalculatorPage() {
  return <ObligationCalculatorClient />;
}
