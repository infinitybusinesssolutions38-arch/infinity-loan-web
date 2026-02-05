import type { Metadata } from "next";
import { Building2 } from "lucide-react";

import {
  type ServiceGroup,
  ServiceGroupCard,
  ServicesPageShell,
} from "../_components/service-ui";

export const metadata: Metadata = {
  title: "Government Schemes | Infinity Loans",
  description:
    "Explore government-backed loan schemes for MSMEs and entrepreneurs. Check eligibility or apply with guidance.",
};

const groups: ServiceGroup[] = [
  {
    title: "Government Schemes",
    icon: Building2,
    items: [
      {
        key: "pm-mudra",
        title: "PM Mudra Loan",
        description:
          "Collateral-free micro and small business loans under Shishu, Kishor and Tarun categories.",
        cta: "apply",
        href: "/register?service=pm-mudra-loan",
      },
      {
        key: "stand-up-india",
        title: "Stand-Up India",
        description:
          "Support for SC/ST and women entrepreneurs to start greenfield enterprises.",
        cta: "apply",
        href: "/register?service=stand-up-india",
      },
      {
        key: "cgtmse",
        title: "CGTMSE Loan",
        description:
          "Collateral-free MSME loans backed by credit guarantee support for eligible businesses.",
        cta: "apply",
        href: "/register?service=cgtmse-loan",
      },
      {
        key: "psb-59",
        title: "PSB Loans in 59 Minutes",
        description:
          "Quick in-principle approval for MSME loans through the PSB digital platform.",
        cta: "eligibility",
        href: "/register?service=psb-loans-59-minutes",
      },
      {
        key: "jansamarth",
        title: "Jansamarth",
        description:
          "One platform for multiple schemes — check scheme fit and start your application journey.",
        cta: "eligibility",
        href: "/register?service=jansamarth",
      },
    ],
  },
];

export default function GovernmentSchemesServicesPage() {
  return (
    <ServicesPageShell
      eyebrow="Services / Government Schemes"
      title="Government-backed programs"
      description="Find programs designed to support MSMEs, first-time entrepreneurs and priority sectors."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <ServiceGroupCard key={group.title} group={group} />
        ))}
      </section>
    </ServicesPageShell>
  );
}
