import type { Metadata } from "next";
import {
  Briefcase,
  Car,
  Home,
  Landmark,
  Wallet,
} from "lucide-react";

import {
  type ServiceGroup,
  ServiceGroupCard,
  ServicesPageShell,
} from "../_components/service-ui";

export const metadata: Metadata = {
  title: "Loans | Infinity Loans",
  description:
    "Explore business, personal, home, vehicle, and secured loan options offered by Infinity Loans. Check eligibility or apply in minutes.",
};

const loanGroups: ServiceGroup[] = [
  {
    title: "Business Loans",
    icon: Briefcase,
    items: [
      {
        key: "msme-sme-loan",
        title: "MSME / SME Loan",
        description:
          "Funding for expansion, inventory and day-to-day operations with flexible repayment options.",
        popular: true,
        cta: "apply",
        href: "/register?service=msme-sme-loan",
      },
      {
        key: "working-capital",
        title: "Working Capital",
        description:
          "Short-term liquidity to manage cash flow, vendor payments and seasonal demand spikes.",
        cta: "apply",
        href: "/register?service=working-capital",
      },
      {
        key: "overdraft-cc",
        title: "Overdraft / Cash Credit",
        description:
          "A flexible limit for withdrawals as needed — interest is charged only on utilization.",
        cta: "apply",
        href: "/register?service=overdraft-cash-credit",
      },
      {
        key: "invoice-discounting",
        title: "Invoice Discounting",
        description:
          "Unlock funds stuck in receivables and keep operations running without payment delays.",
        cta: "apply",
        href: "/register?service=invoice-discounting",
      },
      {
        key: "machinery-loan",
        title: "Machinery Loan",
        description:
          "Finance equipment purchases to improve capacity, productivity and operational efficiency.",
        cta: "apply",
        href: "/register?service=machinery-loan",
      },
    ],
  },
  {
    title: "Personal Loans",
    icon: Wallet,
    items: [
      {
        key: "personal-loan",
        title: "Personal Loan",
        description:
          "Multipurpose unsecured funding for planned needs or urgent expenses with quick approvals.",
        popular: true,
        cta: "eligibility",
        href: "/register?service=personal-loan",
      },
      {
        key: "instant-loan",
        title: "Instant Loan",
        description:
          "Fast-disbursal credit for emergencies, bills and last-minute requirements.",
        cta: "eligibility",
        href: "/register?service=instant-loan",
      },
      {
        key: "education-loan",
        title: "Education Loan",
        description:
          "Support higher education costs — tuition, living expenses and course-related fees.",
        cta: "apply",
        href: "/register?service=education-loan",
      },
      {
        key: "medical-loan",
        title: "Medical Loan",
        description:
          "Finance planned procedures or medical emergencies with structured repayment.",
        cta: "eligibility",
        href: "/register?service=medical-loan",
      },
    ],
  },
  {
    title: "Home & Property Loans",
    icon: Home,
    items: [
      {
        key: "home-loan",
        title: "Home Loan",
        description:
          "Buy a home with competitive rates, transparent terms and end-to-end guidance.",
        popular: true,
        cta: "eligibility",
        href: "/register?service=home-loan",
      },
      {
        key: "loan-against-property",
        title: "Loan Against Property",
        description:
          "Leverage property value to raise funds for business, education or major expenses.",
        cta: "apply",
        href: "/register?service=loan-against-property",
      },
      {
        key: "plot-construction-loan",
        title: "Plot / Construction Loan",
        description:
          "Finance land purchase and construction with stage-wise disbursal options.",
        cta: "apply",
        href: "/register?service=plot-construction-loan",
      },
    ],
  },
  {
    title: "Vehicle Loans",
    icon: Car,
    items: [
      {
        key: "car-loan",
        title: "Car Loan",
        description:
          "Finance a new or used car with flexible tenures and fast processing.",
        cta: "eligibility",
        href: "/register?service=car-loan",
      },
      {
        key: "two-wheeler-loan",
        title: "Two-Wheeler Loan",
        description:
          "Affordable financing for bikes and scooters with minimal documentation.",
        cta: "eligibility",
        href: "/register?service=two-wheeler-loan",
      },
      {
        key: "commercial-vehicle-loan",
        title: "Commercial Vehicle Loan",
        description:
          "Fund trucks and commercial fleets to support logistics and business operations.",
        cta: "apply",
        href: "/register?service=commercial-vehicle-loan",
      },
      {
        key: "ev-loan",
        title: "EV Loan",
        description:
          "Finance electric vehicles with supportive terms and green mobility benefits.",
        cta: "eligibility",
        href: "/register?service=ev-loan",
      },
    ],
  },
  {
    title: "Gold & Asset Loans",
    icon: Landmark,
    items: [
      {
        key: "gold-loan",
        title: "Gold Loan",
        description:
          "Quick secured loan against gold with transparent valuation and fast disbursal.",
        cta: "eligibility",
        href: "/register?service=gold-loan",
      },
      {
        key: "loan-against-securities",
        title: "Loan Against Securities",
        description:
          "Borrow against investments like shares and mutual funds without selling holdings.",
        cta: "apply",
        href: "/register?service=loan-against-securities",
      },
    ],
  },
];

export default function LoansServicesPage() {
  return (
    <ServicesPageShell
      eyebrow="Services / Loans"
      title="Loans for individuals and businesses"
      description="Choose a loan category below. Each option includes a short summary and a clear next step to check eligibility or apply."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {loanGroups.map((group) => (
          <ServiceGroupCard key={group.title} group={group} />
        ))}
      </section>
    </ServicesPageShell>
  );
}
