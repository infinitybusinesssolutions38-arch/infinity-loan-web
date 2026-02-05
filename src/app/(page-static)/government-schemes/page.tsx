import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileText,
  HelpCircle,
  Landmark,
  ListChecks,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";

import {
  type ServiceGroup,
  ServiceGroupCard,
  ServicesPageShell,
} from "../../services/_components/service-ui";

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
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </span>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-gray-900">
                  What you get on this page
                </h2>
                <p className="text-sm text-gray-600">
                  Compare schemes, understand eligibility & documents, and apply
                  with a clear next step.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Users,
                  title: "MSME & startups",
                  desc: "Programs for micro, small and emerging businesses.",
                },
                {
                  icon: BadgeCheck,
                  title: "Eligibility-led",
                  desc: "Shortlist the right scheme before applying.",
                },
                {
                  icon: FileText,
                  title: "Documents",
                  desc: "Know what to keep ready to avoid delays.",
                },
                {
                  icon: Timer,
                  title: "Faster process",
                  desc: "Simple steps to reduce back-and-forth.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                      <item.icon className="h-5 w-5 text-blue-700" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900">
                  Not sure which scheme fits?
                </h3>
                <p className="text-sm text-gray-600">
                  Share your basic details and we’ll guide you to the best-fit
                  option.
                </p>
              </div>
              <Landmark className="h-6 w-6 text-blue-700" />
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
              >
                Talk to an expert
              </Link>
              <Link
                href="/register"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 sm:w-auto"
              >
                Start application
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {groups.map((group) => (
            <ServiceGroupCard key={group.title} group={group} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-blue-700" />
            <h2 className="text-base font-semibold text-gray-900">
              Criteria & Eligibility
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Exact conditions depend on the scheme and partner policy. These are
            common checks.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "KYC completeness (PAN, Aadhaar, address proof)",
              "Business vintage / continuity (where applicable)",
              "Turnover / income and banking conduct",
              "Credit profile and existing obligations",
              "Industry and purpose eligibility (scheme-specific)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-700" />
            <h2 className="text-base font-semibold text-gray-900">
              Documentation
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Keep these ready to speed up verification.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "PAN, Aadhaar, address proof",
              "Business proof (GST/Udyam/Shop Act, as applicable)",
              "Bank statements (typically 6–12 months)",
              "ITR / financials (if required by scheme/partner)",
              "Quotation / invoice / project details (for some purposes)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-blue-700" />
            <h2 className="text-base font-semibold text-gray-900">Final CTA</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Apply online, then we’ll help you finalize documentation and the next
            steps.
          </p>
          <div className="mt-5 space-y-3">
            <Link
              href="/register"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Apply now
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              Get assisted
            </Link>
            <p className="text-xs text-gray-500">
              Note: Approval, pricing and timelines depend on eligibility and
              partner discretion.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <HelpCircle className="h-5 w-5 text-blue-700" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
            <p className="mt-1 text-sm text-gray-600">
              Quick answers to common questions.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {[ 
            {
              q: "Do government schemes guarantee approval?",
              a: "No. Schemes provide frameworks/subsidies/guarantees, but final approval depends on eligibility checks and partner policy.",
            },
            {
              q: "How long does the process take?",
              a: "Timelines vary by scheme and document readiness. Keeping KYC, bank statements and business proof ready reduces delays.",
            },
            {
              q: "Is collateral always required?",
              a: "Not always. Some schemes support collateral-free lending (scheme and partner terms apply).",
            },
            {
              q: "Can I apply if I’m a new business?",
              a: "Some schemes allow new-to-business profiles, while others require business vintage. We recommend checking eligibility first.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-4"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-gray-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </ServicesPageShell>
  );
}
