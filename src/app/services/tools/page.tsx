import type { Metadata } from "next";
import EMICalculator from "@/components/EmiCalculator";

export const metadata: Metadata = {
  title: "Tools | Infinity Loans & Business Solutions",
  description:
    "Use loan tools like EMI Calculator and Eligibility Checker to plan affordability before applying.",
};

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
