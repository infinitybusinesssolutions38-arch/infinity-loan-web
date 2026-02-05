import type { Metadata } from "next";
import { CreditCard } from "lucide-react";

import {
  type ServiceGroup,
  ServiceGroupCard,
  ServicesPageShell,
} from "../_components/service-ui";

export const metadata: Metadata = {
  title: "Credit & Cards | Infinity Loans",
  description:
    "Explore credit lines, business and personal cards, and BNPL options. Check eligibility or apply with a clear CTA.",
};

const groups: ServiceGroup[] = [
  {
    title: "Credit & Cards",
    icon: CreditCard,
    items: [
      {
        key: "credit-line-flexi",
        title: "Credit Line / Flexi Loan",
        description:
          "A revolving limit you can draw from when needed — pay interest only on the amount used.",
        cta: "eligibility",
        href: "/register?service=credit-line-flexi",
      },
      {
        key: "business-credit-card",
        title: "Business Credit Card",
        description:
          "Higher limits and tracking to manage business expenses, rewards and vendor payments.",
        cta: "apply",
        href: "/register?service=business-credit-card",
      },
      {
        key: "personal-credit-card",
        title: "Personal Credit Card",
        description:
          "Everyday credit with offers, cashback and EMI options for smarter monthly spending.",
        cta: "eligibility",
        href: "/register?service=personal-credit-card",
      },
      {
        key: "bnpl",
        title: "Buy Now Pay Later (BNPL)",
        description:
          "Split purchases into smaller payments with clear schedules and quick onboarding.",
        cta: "eligibility",
        href: "/register?service=bnpl",
      },
    ],
  },
];

export default function CreditCardsServicesPage() {
  return (
    <ServicesPageShell
      eyebrow="Services / Credit & Cards"
      title="Flexible credit and card products"
      description="Compare credit solutions for short-term needs, recurring expenses and business purchases."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <ServiceGroupCard key={group.title} group={group} />
        ))}
      </section>
    </ServicesPageShell>
  );
}
