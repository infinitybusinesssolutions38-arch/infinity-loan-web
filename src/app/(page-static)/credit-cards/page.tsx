import type { Metadata } from "next";
import Link from "next/link";

import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";

export const metadata: Metadata = {
  title: "Credit & Cards | Infinity Loan",
  description:
    "Compare credit cards, business cards, credit lines and pay-later options. See key benefits, eligibility, documents and apply with guidance.",
};

type Badge = "Popular" | "Recommended";

type Product = {
  id: string;
  title: string;
  badge?: Badge;
  tagline: string;
  overview: string[];
  highlights: Array<{ label: string; value: string }>;
  features: string[];
  eligibility: string[];
  documents: string[];
};

const products: Product[] = [
  {
    id: "credit-card",
    title: "Credit Cards",
    badge: "Popular",
    tagline: "Everyday spends, rewards and smart repayment flexibility.",
    overview: [
      "A credit card can help you manage monthly expenses, build credit history, and unlock rewards.",
      "Choose a card based on your spend pattern (fuel, travel, shopping) and your repayment comfort.",
    ],
    highlights: [
      { label: "Typical limit", value: "₹25,000 to ₹10L+" },
      { label: "Billing cycle", value: "Monthly" },
      { label: "Rewards", value: "Cashback / points / miles" },
      { label: "Best for", value: "Salaried & self-employed" },
    ],
    features: [
      "Interest-free period (subject to issuer terms) when you pay total due by the due date.",
      "Reward points / cashback on eligible spends.",
      "Add-on cards and contactless payments on supported networks.",
      "EMI conversions on eligible transactions (as per issuer policy).",
    ],
    eligibility: [
      "Age typically 21 to 60 years (issuer-specific).",
      "Stable income / business vintage as required by the issuer.",
      "Acceptable credit history (or consider secured cards if new-to-credit).",
      "Valid KYC and current address proof.",
    ],
    documents: [
      "PAN card.",
      "Identity & address proof (Aadhaar / Passport / Driving License, etc.).",
      "Income proof (salary slips / Form 16 / ITR, as applicable).",
      "Recent bank statements (if required by the issuer).",
    ],
  },
  {
    id: "business-credit-card",
    title: "Business Credit Cards",
    badge: "Recommended",
    tagline: "Working-capital convenience with expense tracking for teams.",
    overview: [
      "Business credit cards help manage company expenses, vendor payments and travel spends.",
      "They can simplify reconciliation with statements, limits, and optional employee add-ons.",
    ],
    highlights: [
      { label: "Typical limit", value: "₹50,000 to ₹25L+" },
      { label: "Usage", value: "Travel, ads, vendor spends" },
      { label: "Controls", value: "Spend categories & limits" },
      { label: "Best for", value: "MSMEs & professionals" },
    ],
    features: [
      "Business-friendly rewards (fuel, travel, online spends) on eligible categories.",
      "Expense management with statements for accounting and audits.",
      "Employee/add-on cards (issuer-specific) with optional spend limits.",
      "GST invoices and vendor payments support (as per issuer/partner flows).",
    ],
    eligibility: [
      "Business registration / proof of profession (as applicable).",
      "Business vintage and turnover/income as required by issuer.",
      "KYC for proprietor/authorized signatory.",
      "Good banking conduct (inflows, low bounces).",
    ],
    documents: [
      "PAN of business/proprietor.",
      "GST / Udyam / Shop & Establishment / incorporation proof (as applicable).",
      "Bank statements (typically last 6-12 months, issuer-specific).",
      "ITR / financials (as applicable).",
    ],
  },
  {
    id: "secured-credit-card",
    title: "Secured / FD-Backed Credit Cards",
    tagline: "Start building credit with a fixed-deposit backed limit.",
    overview: [
      "A secured credit card is backed by a fixed deposit and can be suitable if you are new-to-credit.",
      "On-time repayments can help improve your credit profile over time.",
    ],
    highlights: [
      { label: "Limit basis", value: "Against FD value" },
      { label: "Approval", value: "Usually easier" },
      { label: "Objective", value: "Build / rebuild credit" },
      { label: "Best for", value: "New-to-credit" },
    ],
    features: [
      "Credit limit is linked to FD amount (issuer-specific LTV).",
      "Helps establish credit history when used responsibly.",
      "Rewards and benefits may be available depending on issuer.",
      "FD remains pledged while card is active (terms apply).",
    ],
    eligibility: [
      "KYC-compliant individual.",
      "Ability to open/maintain an FD with the issuer/partner bank.",
      "Age criteria as per issuer.",
    ],
    documents: [
      "PAN card.",
      "Identity & address proof.",
      "FD opening/pledge documentation (issuer-specific).",
    ],
  },
  {
    id: "credit-line",
    title: "Credit Line / Pay-Later",
    badge: "Popular",
    tagline: "Short-term limit for bills, shopping and cashflow gaps.",
    overview: [
      "Credit lines and pay-later products provide a pre-approved limit for eligible users.",
      "They can be used for merchant payments and bills, with repayment schedules as per partner terms.",
    ],
    highlights: [
      { label: "Limit range", value: "₹5,000 to ₹5L+" },
      { label: "Tenure", value: "Short-term" },
      { label: "Access", value: "Digital / app-based" },
      { label: "Best for", value: "Cashflow smoothing" },
    ],
    features: [
      "Fast access to a revolving/pre-approved limit (eligibility-based).",
      "Useful for utilities, online spends, and emergency cashflow needs.",
      "Repayment options can include monthly bill or EMI plans (partner-specific).",
      "May report to bureaus depending on the product structure.",
    ],
    eligibility: [
      "KYC-compliant individual.",
      "Minimum income / bureau score as required by partner.",
      "Active mobile number and email.",
      "Accepted banking profile (partner-specific).",
    ],
    documents: [
      "PAN card.",
      "Aadhaar / address proof.",
      "Income or bank statement may be required (partner-specific).",
    ],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase",
        badge === "Popular"
          ? "bg-blue-100 text-blue-700"
          : "bg-emerald-100 text-emerald-700"
      )}
    >
      {badge}
    </span>
  );
}

function Icon({
  name,
  className,
}: {
  name: "features" | "eligibility" | "documents" | "shield";
  className?: string;
}) {
  const base = "h-5 w-5";

  if (name === "features") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cx(base, className)}
      >
        <path
          d="M4 7h16M6 11h12M8 15h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "eligibility") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cx(base, className)}
      >
        <path
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === "documents") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cx(base, className)}
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 13h8M8 17h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cx(base, className)}
    >
      <path
        d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm text-gray-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Disclosure({
  title,
  icon,
  children,
}: {
  title: string;
  icon: "eligibility" | "documents";
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 hover:bg-gray-50 transition">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <Icon name={icon} className="text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition group-open:rotate-180">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm text-gray-700">{children}</div>
    </details>
  );
}

function CtaButton({
  href,
  intent,
  children,
}: {
  href: string;
  intent: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}) {
  const className =
    intent === "primary"
      ? "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
      : intent === "secondary"
      ? "inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
      : "inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <section
      id={product.id}
      className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-labelledby={`${product.id}-title`}
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 id={`${product.id}-title`} className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.title}
            </h2>
            {product.badge ? <BadgePill badge={product.badge} /> : null}
          </div>
          <p className="text-base font-semibold text-blue-600">{product.tagline}</p>
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            {product.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:min-w-[280px]">
          <ApplyNowCTAButton loanType={product.title} size="lg" className="w-full">
            Apply Now
          </ApplyNowCTAButton>
          <CtaButton href="#eligibility" intent="secondary">
            Details & Docs
          </CtaButton>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Key Features */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Icon name="features" className="text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Key Features</h3>
            </div>
            <div className="space-y-2">
              <List items={product.features} />
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {h.label}
                </p>
                <p className="mt-2 text-base font-bold text-gray-900">{h.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Disclosure title="Eligibility" icon="eligibility">
            <List items={product.eligibility} />
          </Disclosure>
          <Disclosure title="Documents" icon="documents">
            <List items={product.documents} />
          </Disclosure>
        </aside>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CtaButton href="/register/borrower/personal" intent="primary">
          Start Application
        </CtaButton>
        <CtaButton href="/about/contact" intent="secondary">
          Speak to Team
        </CtaButton>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Note: Eligibility, limits, fees, and benefits vary by issuer/partner and are subject to verification and approvals.
      </p>
    </section>
  );
}

export default function CreditCardsPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <Icon name="shield" className="text-blue-600" />
                <span>Transparent guidance. Eligibility-led suggestions.</span>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  Credit & Cards
                </h1>
                <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                Find the right credit product for your needs—rewards, business spends, credit building or short-term cashflow. Compare features, understand documents, and apply with support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CtaButton href="#products" intent="primary">
                  Explore Products
                </CtaButton>
                <CtaButton href="#apply" intent="secondary">
                  Get Help Choosing
                </CtaButton>
              </div>
            </div>

            {/* Quick Comparison Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl">
                <h2 className="text-lg font-bold text-gray-900">Quick Comparison</h2>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      q: "Need rewards?",
                      a: "Credit Cards",
                      d: "Cashback/points on spends",
                    },
                    {
                      q: "Business spends?",
                      a: "Business Credit Cards",
                      d: "Expense tracking & controls",
                    },
                    {
                      q: "New-to-credit?",
                      a: "Secured Cards",
                      d: "FD-backed with responsible use",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 hover:border-blue-200 hover:from-blue-50 hover:to-indigo-50 transition-all"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        {item.q}
                      </p>
                      <p className="mt-2 text-base font-bold text-gray-900">
                        {item.a}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Navigation */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Products</h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Start with what you want to achieve. We'll guide you to the most suitable issuer/partner option.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`#${p.id}`}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              {p.title}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Eligibility & Documents Section */}
      <section id="eligibility" className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Eligibility & Documents
                </h2>
                <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>
              <p className="text-lg text-gray-700">
                Exact criteria vary by issuer/partner. Keep these ready to speed up checks and avoid rework.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Icon name="eligibility" className="text-blue-600" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">Common Eligibility</h3>
                  </div>
                  <List
                    items={[
                      "Age, resident status and KYC completeness.",
                      "Income/turnover and banking conduct.",
                      "Credit bureau history (where applicable).",
                      "Existing obligations and repayment capacity.",
                    ]}
                  />
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Icon name="documents" className="text-blue-600" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">Document Checklist</h3>
                  </div>
                  <List
                    items={[
                      "PAN, identity and address proof.",
                      "Income proof (salary slips / ITR) as applicable.",
                      "Bank statements as required by the issuer.",
                      "Business proofs for business cards (GST/Udyam/etc.).",
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* How We Help */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900">How We Help</h3>
                <p className="mt-3 text-lg text-gray-700">
                  Share your basic profile and we'll recommend the best-fit product and guide you through the next steps.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Right-fit suggestions",
                      desc: "Based on your goal and eligibility signals.",
                    },
                    {
                      title: "Document readiness",
                      desc: "Checklist and guidance to reduce back-and-forth.",
                    },
                    {
                      title: "Transparent expectations",
                      desc: "Fees, limits and timelines depend on issuer approval.",
                    },
                    {
                      title: "Post-approval help",
                      desc: "Usage tips for credit building and repayments.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-5 hover:border-blue-200 hover:from-blue-50 hover:to-indigo-50 transition-all"
                    >
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CtaButton href="#apply" intent="primary">
                    Get Assisted
                  </CtaButton>
                  <CtaButton href="/about/contact" intent="secondary">
                    Contact Us
                  </CtaButton>
                </div>

                <p className="mt-6 text-xs text-gray-500">
                  We do not guarantee approval. Final decision, pricing and benefits are at the sole discretion of the issuer/partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Ready to apply?
              </h2>
              <p className="mt-4 text-lg text-blue-50 leading-relaxed">
                Start your application and our team will help you choose the right option based on your profile.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <CtaButton href="/register/borrower/personal" intent="primary">
                Start Application
              </CtaButton>
              <CtaButton href="/about/contact" intent="ghost">
                Speak to an Expert
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <section className="h-12"></section>
    </main>
  );
}