import type { Metadata } from "next";
import { Shield } from "lucide-react";

import {
  type ServiceGroup,
  ServiceGroupCard,
  ServicesPageShell,
} from "../_components/service-ui";

export const metadata: Metadata = {
  title: "Insurance | Infinity Loans",
  description:
    "Explore life, health, motor, home and business insurance. Get guidance and apply with a clear CTA.",
};

const groups: ServiceGroup[] = [
  {
    title: "Insurance",
    icon: Shield,
    items: [
      {
        key: "life-insurance",
        title: "Life Insurance",
        description:
          "Long-term protection for your family with coverage options aligned to your goals.",
        cta: "apply",
        href: "/contact?service=life-insurance",
      },
      {
        key: "health-insurance",
        title: "Health Insurance",
        description:
          "Medical coverage for hospitalization and treatments with cashless network benefits.",
        cta: "apply",
        href: "/contact?service=health-insurance",
      },
      {
        key: "motor-insurance",
        title: "Motor Insurance",
        description:
          "Comprehensive protection for cars and two-wheelers including third-party coverage.",
        cta: "apply",
        href: "/contact?service=motor-insurance",
      },
      {
        key: "home-insurance",
        title: "Home Insurance",
        description:
          "Secure your home and valuables against fire, theft and natural calamities.",
        cta: "apply",
        href: "/contact?service=home-insurance",
      },
      {
        key: "business-insurance",
        title: "Business Insurance",
        description:
          "Coverage for assets, liability and continuity to protect your operations.",
        cta: "apply",
        href: "/contact?service=business-insurance",
      },
    ],
  },
];

export default function InsuranceServicesPage() {
  return (
    <ServicesPageShell
      eyebrow="Services / Insurance"
      title="Insurance for people and businesses"
      description="Choose the cover you need. We’ll help you compare plans, understand inclusions, and complete the next step."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <ServiceGroupCard key={group.title} group={group} />
        ))}
      </section>
    </ServicesPageShell>
  );
}
