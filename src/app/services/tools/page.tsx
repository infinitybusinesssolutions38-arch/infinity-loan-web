import type { Metadata } from "next";
import { Calculator } from "lucide-react";

import {
  type ServiceGroup,
  ServiceGroupCard,
  ServicesPageShell,
} from "../_components/service-ui";
import EMICalculator from "@/components/EmiCalculator";

export const metadata: Metadata = {
  title: "Tools | Infinity Loans",
  description:
    "Use loan tools like EMI Calculator and Eligibility Checker to plan affordability before applying.",
};

const groups: ServiceGroup[] = [
  {
    title: "Tools",
    icon: Calculator,
    items: [
      {
        key: "emi-calculator",
        title: "EMI Calculator",
        description:
          "Estimate monthly repayments based on loan amount, tenure and interest rate.",
        cta: "eligibility",
        href: "/contact?tool=emi-calculator",
      },
      {
        key: "eligibility-checker",
        title: "Loan Eligibility Checker",
        description:
          "Check eligibility across products using basic income and credit profile details.",
        cta: "eligibility",
        href: "/contact?tool=loan-eligibility",
      },
    ],
  },
];

export default function ToolsServicesPage() {
  return (
    <>
      <EMICalculator />
    </>
  )
    // <ServicesPageShell
    //   eyebrow="Services / Tools"
    //   title="Plan before you apply"
    //   description="Use quick calculators to understand affordability and eligibility before starting an application."
    // >
      // {/* <section className="grid gap-4 lg:grid-cols-2">
      //   {groups.map((group) => (
      //     <ServiceGroupCard key={group.title} group={group} />
      //   ))}
      // </section> */}
    // {/* </ServicesPageShell> */}
}
