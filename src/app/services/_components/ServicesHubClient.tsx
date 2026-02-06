"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Banknote,
  Building2,
  CreditCard,
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type HubCategoryKey = "loans" | "insurance" | "credit-cards" | "government-schemes";

type ServiceCardItem = {
  key: string;
  title: string;
  description: string;
  applyHref: string;
  infoHref: string;
  highlight?: boolean;
  badge?: string;
};

type ServiceGroup = {
  title: string;
  items: ServiceCardItem[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/\(|\)/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

const makeItems = (params: {
  prefix: string;
  titles: string[];
  infoHref: string;
  applyPrefix?: string;
}) => {
  const applyPrefix = params.applyPrefix ?? "";
  return params.titles.map((title) => {
    const slug = slugify(title);
    return {
      key: `${params.prefix}-${slug}`,
      title,
      description: `Apply for ${title} with tailored eligibility and quick processing.`,
      applyHref: `/register?service=${applyPrefix}${slug}`,
      infoHref: params.infoHref,
    } satisfies ServiceCardItem;
  });
};

const CATEGORY_META: Array<{
  key: HubCategoryKey;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}> = [
  { key: "loans", title: "Loans", icon: Banknote, gradient: "bg-gradient-loans" },
  { key: "insurance", title: "Insurance", icon: Shield, gradient: "bg-gradient-insurance" },
  { key: "credit-cards", title: "Credits & Cards", icon: CreditCard, gradient: "bg-gradient-credit" },
  { key: "government-schemes", title: "Government Schemes", icon: Building2, gradient: "bg-gradient-government" },
];

const LOAN_SERVICES: ServiceGroup[] = [
  {
    title: "Business / MSME / Enterprise Loans",
    items: [
      {
        key: "msme-sme-loan",
        title: "MSME / SME Loan",
        description: "Funding for expansion, inventory and day-to-day operations with flexible repayment options.",
        applyHref: "/register?service=msme-sme-loan",
        infoHref: "/business-loan",
        highlight: true,
        badge: "Popular",
      },
      ...makeItems({
        prefix: "biz",
        infoHref: "/business-loan",
        titles: [
          "Business Loan",
          "MSME Loan",
          "SME Loan",
          "Micro Enterprise Loan",
          "Startup Loan",
          "Working Capital Loan",
          "Short-Term Business Loan",
          "Long-Term Business Loan",
          "Term Loan",
          "Industrial Term Loan",
          "Enterprise Business Loan",
          "Unsecured Business Loan",
          "Private Funding",
          "Project Loan",
          "Builder Project Loan",
          "Developer Project Funding Loan",
          "Greenfield Project Loan",
          "Brownfield Expansion Loan",
          "Cluster Financing Loan",
          "SIDBI Assisted Loan",
          "CGTMSE Loan",
          "PMEGP Loan",
          "Stand-Up India Loan",
          "Mudra Shishu Loan",
          "Mudra Kishor Loan",
          "Mudra Tarun Loan",
          "Women Entrepreneur Loan",
          "Professional Loan (Doctors / CAs / Architects)",
          "Loan for Professionals",
          "Teacher Loan",
          "Shopkeeper / Trader Loan",
          "Self-Employed Loan",
          "New to Credit Loan",
        ],
      }),
    ],
  },
  {
    title: "Working Capital / Credit Facilities",
    items: [
      ...makeItems({
        prefix: "wc",
        infoHref: "/business-loan",
        titles: [
          "Working Capital",
          "Working Capital Loan for Builders",
          "Construction Working Capital Finance",
          "Seasonal Working Capital Loan",
          "Inventory / Raw Material Funding",
          "Inventory Funding Loan",
          "Power & Fuel Cost Funding Loan",
          "Project Cash-Flow Funding",
          "Overdraft Facility",
          "Cash Credit Facility",
          "OD / CC / Term Loan",
          "Dropline Overdraft",
          "Line of Credit (Business)",
          "Flexi Business Loan",
        ],
      }),
    ],
  },
  {
    title: "Invoice / Trade / Supply Chain Finance",
    items: [
      ...makeItems({
        prefix: "trade",
        infoHref: "/business-loan",
        titles: [
          "Invoice Discounting",
          "Bill Discounting",
          "Receivables Financing",
          "Receivables Financing (Sold Units Funding)",
          "Payables Financing",
          "Supply Chain Finance",
          "Dealer Finance",
          "Distributor Finance",
          "Vendor Financing",
          "Buyer / Supplier Credit",
          "Trade Finance",
          "Export Packing Credit",
          "Import Finance",
          "Export-Oriented Unit (EOU) Loan",
          "Letter of Credit (LC) Facility",
          "Bank Guarantee (BG) Facility",
        ],
      }),
    ],
  },
  {
    title: "Industrial / Manufacturing / Infrastructure",
    items: [
      ...makeItems({
        prefix: "industrial",
        infoHref: "/business-loan",
        titles: [
          "Manufacturing Unit Loan",
          "Factory Setup Loan",
          "Factory Building Loan",
          "Industrial Expansion Loan",
          "Industrial Infrastructure Loan",
          "Industrial Shed Mortgage Loan",
          "Industrial Plot Purchase Loan",
          "MIDC / GIDC Plot + Construction Loan",
          "Industrial Property Loan",
          "Loan Against Industrial Property",
          "Industrial Property Balance Transfer Loan",
          "Leasehold Industrial Property Loan",
          "Plant & Machinery Loan",
          "Machinery Loan",
          "Equipment Loan",
          "Heavy Machinery Loan",
          "CNC / VMC Machine Loan",
          "Imported Machinery Finance",
          "Technology Upgrade Loan",
          "Energy-Efficient Machinery Loan",
          "Pollution Control Equipment Loan",
          "Pharma Machinery Loan",
          "Plastic Injection / Moulding Machine Loan",
          "Packaging & Printing Machine Loan",
          "Food Processing Machinery Loan",
          "Textile Machinery Loan",
          "Engineering Industry Loan",
          "Chemical & Pharma Industry Loan",
          "Textile & Garment Unit Loan",
          "Auto Ancillary Unit Loan",
          "Plastic & Polymer Industry Loan",
          "Food & Agro-Processing Unit Loan",
          "Solar Plant Loan for Factories",
          "Rooftop Solar Finance (Industrial)",
          "Energy Efficiency Loan",
          "Green Business Loan",
        ],
      }),
    ],
  },
  {
    title: "Real Estate / Builder / Project Finance",
    items: [
      ...makeItems({
        prefix: "re",
        infoHref: "/business-loan",
        titles: [
          "Secured Construction Finance Loan",
          "Construction Finance Loan",
          "Construction Funding",
          "Real Estate Project Finance",
          "Residential Project Loan",
          "Commercial Project Loan",
          "Mixed-Use Development Loan",
          "Under-Construction Project Loan",
          "Land Purchase & Development Loan",
          "Land Acquisition Loan",
          "Plot Development Loan",
          "Asset-Backed Project Loan",
          "Bridge Finance / Bridge Loan",
          "Short-Term Project Funding Loan",
          "Buyer Advance / Escrow-Linked Project Loan",
          "Sales-Linked Construction Finance",
          "Structured Real Estate Finance",
          "Mezzanine Project Loan",
          "Subordinate Debt for Developers",
          "Hybrid Debt-Equity Funding",
          "Project Completion Funding",
          "Project Refinance Loan",
          "Take-Out Financing",
          "Expansion / New Project Funding Loan",
          "Stressed / Stalled Project Funding",
          "Balance Sheet Cleanup Loan",
          "Lease Rental Discounting (LRD)",
          "Rental Income Backed Loan",
          "Commercial Asset Monetization Loan",
          "SPV (Special Purpose Vehicle) Project Loan",
          "Corporate Real Estate Term Loan",
          "Capex Loan for Construction Projects",
        ],
      }),
    ],
  },
  {
    title: "Personal / Consumer Loans",
    items: [
      ...makeItems({
        prefix: "personal",
        infoHref: "/personal-loan",
        titles: [
          "Personal Loan",
          "Personal Loan for Salaried Individuals",
          "Instant Loan",
          "Short-Term Loan",
          "Long-Term Personal Loan",
          "Flexi Personal Loan",
          "Line of Credit (Personal)",
          "Salary Advance Loan",
          "Payday Loan",
          "Emergency Loan",
          "Wedding Loan",
          "Travel / Vacation Loan",
          "Festival Loan",
          "Lifestyle Loan",
          "Consumer Loan",
          "Consumer Durable Loan",
          "Electronics Loan",
          "Mobile Phone Loan",
          "Furniture Loan",
          "No-Cost EMI Loan",
        ],
      }),
    ],
  },
  {
    title: "Education / Medical / Wellness",
    items: [
      ...makeItems({
        prefix: "edu-med",
        infoHref: "/personal-loan",
        titles: [
          "Education Loan",
          "Domestic Education Loan",
          "Overseas Education Loan",
          "Skill Development Loan",
          "Skill Loan",
          "Coaching / Test Prep Loan",
          "Apprenticeship Loan",
          "Medical Loan",
          "Surgery Loan",
          "IVF / Fertility Loan",
          "Dental Loan",
          "Wellness Loan",
        ],
      }),
    ],
  },
  {
    title: "Home & Property Loans",
    items: [
      {
        key: "home-loan",
        title: "Home Loan",
        description: "Buy a home with competitive rates, transparent terms and end-to-end guidance.",
        applyHref: "/register?service=home-loan",
        infoHref: "/home-property-loan",
        highlight: true,
        badge: "Low Interest",
      },
      ...makeItems({
        prefix: "home-prop",
        infoHref: "/home-property-loan",
        titles: [
          "Loan Against Property (LAP)",
          "Residential LAP",
          "Commercial LAP",
          "Agreement Property Loan",
          "Mortgage Loan",
          "Tin Shed Property Loan",
        ],
      }),
    ],
  },
  {
    title: "Vehicle / Mobility Loans",
    items: [
      ...makeItems({
        prefix: "vehicle",
        infoHref: "/vehicle-loan",
        titles: [
          "Vehicle Loan",
          "Car Loan (New)",
          "Used / Old Car Loan",
          "Two-Wheeler Loan",
          "Electric Two-Wheeler Loan",
          "Electric Car Loan",
          "EV Loan",
          "EV Infrastructure Loan",
          "Commercial Vehicle Loan",
          "Truck Loan",
          "Tip-Truck Loan",
          "Fleet Finance",
          "Taxi / Cab Loan",
          "School Bus Loan",
          "Construction Equipment Loan",
          "Tractor Loan",
        ],
      }),
    ],
  },
  {
    title: "Gold & Asset-Backed Loans",
    items: [
      ...makeItems({
        prefix: "asset",
        infoHref: "/gold-asset-loan",
        titles: [
          "Gold Loan",
          "Gold Overdraft",
          "Loan Against Securities (LAS)",
          "Loan Against Shares",
          "Loan Against Mutual Funds",
          "Loan Against Bonds",
          "Loan Against Fixed Deposit",
          "Loan Against Recurring Deposit",
          "Loan Against Insurance Policy",
          "Loan Against NSC / KVP",
          "Loan Against Warehouse Receipt",
        ],
      }),
    ],
  },
  {
    title: "Credit / Card / BNPL",
    items: [
      ...makeItems({
        prefix: "credit",
        infoHref: "/services/credit-cards",
        titles: [
          "Personal Credit Card",
          "Business Credit Card",
          "Corporate Credit Card",
          "EMI Card",
          "Buy Now Pay Later (BNPL)",
          "Postpaid Credit Line",
          "Subscription Financing",
        ],
      }),
    ],
  },
  {
    title: "Government / Social / Rural",
    items: [
      ...makeItems({
        prefix: "govt",
        infoHref: "/services/government-schemes",
        titles: [
          "PM Mudra Loan",
          "All Central & State Government Scheme Loans",
          "PM Awas Yojana Loan",
          "PM SVANidhi Loan",
          "PSB Loans in 59 Minutes",
          "Jansamarth Scheme Loans",
          "Microfinance Loan",
          "P2P Loan",
          "SHG Loan",
          "NRLM / SHG Loan",
          "Self-Help Group Loan",
          "Minority Community Loan",
          "SC / ST Development Loan",
          "Differently-Abled Loan",
        ],
      }),
    ],
  },
  {
    title: "Agriculture & Allied",
    items: [
      ...makeItems({
        prefix: "agri",
        infoHref: "/services/loans",
        titles: [
          "Agriculture Loan",
          "Crop Loan",
          "Kisan Credit Card (KCC)",
          "Farm Mechanization Loan",
          "Irrigation Loan",
          "Dairy Loan",
          "Poultry Loan",
          "Fisheries Loan",
          "Horticulture Loan",
          "Cold Storage Loan",
          "Allied Agriculture Loan",
        ],
      }),
    ],
  },
];

const SERVICES: Record<HubCategoryKey, ServiceCardItem[]> = {
  loans: [],
  insurance: [
    {
      key: "life-insurance",
      title: "Life Insurance",
      description: "Long-term protection plans with guidance to choose the right cover.",
      applyHref: "/contact?service=life-insurance",
      infoHref: "/services/insurance",
      highlight: true,
      badge: "Essential",
    },
    {
      key: "health-insurance",
      title: "Health Insurance",
      description: "Coverage for hospitalisation and treatments with plan comparisons.",
      applyHref: "/contact?service=health-insurance",
      infoHref: "/services/insurance",
      highlight: true,
      badge: "Family Plans",
    },
    {
      key: "motor-insurance",
      title: "Motor Insurance",
      description: "Car and two-wheeler protection including third-party coverage.",
      applyHref: "/contact?service=motor-insurance",
      infoHref: "/services/insurance",
    },
    {
      key: "home-insurance",
      title: "Home Insurance",
      description: "Secure home and valuables against common risks and calamities.",
      applyHref: "/contact?service=home-insurance",
      infoHref: "/services/insurance",
    },
  ],
  "credit-cards": [
    {
      key: "credit-line-flexi",
      title: "Credit Line / Flexi Loan",
      description: "Revolving limit you can draw from when needed.",
      applyHref: "/register?service=credit-line-flexi",
      infoHref: "/services/credit-cards",
      highlight: true,
      badge: "Flexible",
    },
    {
      key: "business-credit-card",
      title: "Business Credit Card",
      description: "Higher limits and tracking for business spending.",
      applyHref: "/register?service=business-credit-card",
      infoHref: "/services/credit-cards",
    },
    {
      key: "personal-credit-card",
      title: "Personal Credit Card",
      description: "Everyday credit with rewards and EMI options.",
      applyHref: "/register?service=personal-credit-card",
      infoHref: "/services/credit-cards",
      badge: "Rewards",
    },
    {
      key: "corporate-credit-card",
      title: "Corporate Credit Card",
      description: "Corporate cards for company expenses and better spend controls.",
      applyHref: "/register?service=corporate-credit-card",
      infoHref: "/services/credit-cards",
    },
    {
      key: "emi-card",
      title: "EMI Card",
      description: "Pre-approved EMI limit for easy instalment purchases.",
      applyHref: "/register?service=emi-card",
      infoHref: "/services/credit-cards",
      badge: "EMI",
    },
    {
      key: "bnpl",
      title: "Buy Now Pay Later (BNPL)",
      description: "Split purchases into smaller scheduled payments.",
      applyHref: "/register?service=bnpl",
      infoHref: "/services/credit-cards",
      highlight: true,
      badge: "0% EMI",
    },
    {
      key: "postpaid-credit-line",
      title: "Postpaid Credit Line",
      description: "A revolving postpaid line for everyday expenses and bill payments.",
      applyHref: "/register?service=postpaid-credit-line",
      infoHref: "/services/credit-cards",
    },
    {
      key: "subscription-financing",
      title: "Subscription Financing",
      description: "Convert subscriptions into manageable monthly instalments.",
      applyHref: "/register?service=subscription-financing",
      infoHref: "/services/credit-cards",
    },
  ],
  "government-schemes": [
    {
      key: "pm-mudra",
      title: "PM Mudra Loan",
      description: "Collateral-free micro and small business loans.",
      applyHref: "/register?service=pm-mudra-loan",
      infoHref: "/services/government-schemes",
      highlight: true,
      badge: "No Collateral",
    },
    {
      key: "mudra-shishu",
      title: "Mudra Shishu Loan",
      description: "Micro loans for early-stage small businesses under Mudra Shishu category.",
      applyHref: "/register?service=mudra-shishu-loan",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "mudra-kishor",
      title: "Mudra Kishor Loan",
      description: "Working capital loans for growing micro enterprises under Mudra Kishor.",
      applyHref: "/register?service=mudra-kishor-loan",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "mudra-tarun",
      title: "Mudra Tarun Loan",
      description: "Higher ticket Mudra loans for established micro enterprises under Mudra Tarun.",
      applyHref: "/register?service=mudra-tarun-loan",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "stand-up-india",
      title: "Stand-Up India",
      description: "Support for SC/ST and women entrepreneurs.",
      applyHref: "/register?service=stand-up-india",
      infoHref: "/services/government-schemes",
      badge: "Women & SC/ST",
    },
    {
      key: "pmegp-loan",
      title: "PMEGP Loan",
      description: "Subsidy-linked credit for micro enterprises under PMEGP.",
      applyHref: "/register?service=pmegp-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "cgtmse",
      title: "CGTMSE Loan",
      description: "Collateral-free MSME loans with credit guarantee support.",
      applyHref: "/register?service=cgtmse-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "jansamarth",
      title: "Jansamarth Scheme Loans",
      description: "Apply for government credit-linked schemes via the Jansamarth portal.",
      applyHref: "/register?service=jansamarth-scheme-loans",
      infoHref: "/services/government-schemes",
      badge: "Portal",
    },
    {
      key: "pm-svanidhi",
      title: "PM SVANidhi Loan",
      description: "Micro credit for street vendors under PM SVANidhi.",
      applyHref: "/register?service=pm-svanidhi-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "pm-awas-yojana",
      title: "PM Awas Yojana Loan",
      description: "Housing-linked support for eligible beneficiaries under PMAY.",
      applyHref: "/register?service=pm-awas-yojana-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "psb-59",
      title: "PSB Loans in 59 Minutes",
      description: "Quick in-principle approval through the PSB platform.",
      applyHref: "/register?service=psb-loans-59-minutes",
      infoHref: "/services/government-schemes",
      highlight: true,
      badge: "59 Min Approval",
    },
  ],
};

const TRUST_INDICATORS = [
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: TrendingUp, value: "₹500 Cr+", label: "Loans Disbursed" },
  { icon: Clock, value: "24 Hours", label: "Average Approval" },
  { icon: FileCheck, value: "99%", label: "Success Rate" },
];

export default function ServicesHubClient() {
  const [activeCategory, setActiveCategory] = useState<HubCategoryKey>("loans");

  const activeCards = useMemo(() => SERVICES[activeCategory], [activeCategory]);
  const activeMeta = CATEGORY_META.find((c) => c.key === activeCategory)!;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cta/20 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" />
              Trusted Financial Partner
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Your Financial Goals,{" "}
              <span className="text-accent">Simplified</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 sm:text-xl max-w-2xl">
              From personal loans to business funding, insurance to credit cards — we help you access the right
              financial products with complete transparency.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="cta" size="xl">
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-8 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TRUST_INDICATORS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-xl animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Explore Our Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a wide range of financial products tailored to your needs
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORY_META.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.key === activeCategory;

              return (
                <Button
                  key={cat.key}
                  type="button"
                  size="lg"
                  variant={isActive ? (cat.key as any) : "tab-inactive"}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`gap-2 transition-all duration-300 ${isActive ? "scale-105" : ""}`}
                >
                  <Icon className="h-5 w-5" />
                  {cat.title}
                </Button>
              );
            })}
          </div>

          {activeCategory === "loans" ? (
            <div className="space-y-10">
              {LOAN_SERVICES.map((group, groupIndex) => (
                <div key={group.title} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {group.title}
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.items.map((service, idx) => (
                      <Card
                        key={service.key}
                        className={`group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                          service.highlight ? "border-primary/30" : "border-transparent"
                        } ${activeMeta.gradient}`}
                        style={{ animationDelay: `${(groupIndex * 4 + idx) * 50}ms` }}
                      >
                        {service.badge && (
                          <Badge
                            className={`absolute top-4 right-4 ${
                              service.highlight
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {service.badge}
                          </Badge>
                        )}
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl font-bold text-foreground pr-16">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground mt-2 line-clamp-2">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-3">
                            <ApplyNowCTAButton
                              loanType={service.title}
                              className="w-full group-hover:shadow-glow-cta"
                              size="lg"
                            >
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </ApplyNowCTAButton>
                            <Button asChild variant="outline" className="w-full">
                              <Link href={service.infoHref}>Learn More</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeCards.map((service, idx) => (
                <Card
                  key={service.key}
                  className={`group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    service.highlight ? "border-primary/30" : "border-transparent"
                  } ${activeMeta.gradient}`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {service.badge && (
                    <Badge
                      className={`absolute top-4 right-4 ${
                        service.highlight
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {service.badge}
                    </Badge>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-foreground pr-16">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <ApplyNowCTAButton
                        loanType={service.title}
                        className="w-full group-hover:shadow-glow-cta"
                        size="lg"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </ApplyNowCTAButton>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={service.infoHref}>Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We make financial products accessible, transparent, and hassle-free
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "Quick Approvals",
                description: "Get loan approvals in as little as 24 hours with minimal documentation",
              },
              {
                icon: CheckCircle2,
                title: "Best Rates Guaranteed",
                description: "We compare 30+ lenders to find you the lowest interest rates",
              },
              {
                icon: Shield,
                title: "100% Secure",
                description: "Your data is encrypted and never shared without consent",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-2xl bg-card p-6 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-accent p-8 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Apply now and get a decision within 24 hours. No hidden fees, no surprises.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ApplyNowCTAButton loanType="Loan" className="shadow-2xl" size="xl">
                  Apply for a Loan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ApplyNowCTAButton>
                <Button asChild variant="hero-outline" size="xl">
                  <Link href="/register">Check Eligibility</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
