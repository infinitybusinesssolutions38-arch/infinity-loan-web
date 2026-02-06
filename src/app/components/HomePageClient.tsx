"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  Users,
} from "lucide-react";


import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LogoCloud from "@/components/logo-cloud";
import ModernSections from "./fAQ";

type HubCategoryKey = "loans" | "insurance" | "credit-cards" | "government-schemes";

type ServiceCardItem = {
  key: string;
  title: string;
  description: string;
  infoHref: string;
  highlight?: boolean;
  badge?: string;
};

type ServiceGroup = {
  title: string;
  items: ServiceCardItem[];
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type HowItWorksStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const AUTOPLAY_MS = 4000;

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

const TRUST_INDICATORS = [
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: TrendingUp, value: "₹500 Cr+", label: "Loans Disbursed" },
  { icon: Clock, value: "24 Hours", label: "Average Approval" },
  { icon: FileCheck, value: "99%", label: "Success Rate" },
];

const LOAN_SERVICES: ServiceGroup[] = [
  {
    title: "Business Loans",
    items: [
      {
        key: "msme-sme-loan",
        title: "MSME / SME Loan",
        description: "Funding for expansion, inventory and day-to-day operations with flexible repayment options.",
        infoHref: "/business-loan",
        highlight: true,
        badge: "Popular",
      },
      {
        key: "working-capital-loan",
        title: "Working Capital Loan",
        description: "Short-term liquidity to manage cash flow, vendor payments and seasonal demand spikes.",
        infoHref: "/business-loan",
      },
      {
        key: "overdraft-cash-credit",
        title: "Overdraft / Cash Credit (OD / CC)",
        description: "A flexible limit for withdrawals as needed — interest is charged only on utilisation.",
        infoHref: "/business-loan",
      },
      {
        key: "invoice-discounting",
        title: "Invoice Discounting",
        description: "Unlock cash tied up in invoices and improve working capital without waiting for payments.",
        infoHref: "/business-loan",
      },
      {
        key: "machinery-loan",
        title: "Machinery Loan",
        description: "Equipment financing for purchase, upgrade, or expansion with structured repayment.",
        infoHref: "/business-loan",
      },
    ],
  },
  {
    title: "Personal Loans",
    items: [
      {
        key: "personal-loan",
        title: "Personal Loan",
        description: "Multipurpose unsecured funding for planned needs or urgent expenses with quick approvals.",
        infoHref: "/personal-loan",
        highlight: true,
        badge: "Fast Approval",
      },
      {
        key: "instant-loan",
        title: "Instant Loan",
        description: "Fast-disbursal credit for emergencies, bills and last-minute requirements.",
        infoHref: "/personal-loan",
        badge: "24hr Disbursal",
      },
      {
        key: "education-loan",
        title: "Education Loan",
        description: "Financing for tuition and education expenses with flexible repayment options.",
        infoHref: "/personal-loan",
      },
      {
        key: "medical-loan",
        title: "Medical Loan",
        description: "Quick funding for planned or emergency medical expenses and treatments.",
        infoHref: "/personal-loan",
      },
    ],
  },
  {
    title: "Home & Property Loans",
    items: [
      {
        key: "home-loan",
        title: "Home Loan",
        description: "Buy a home with competitive rates, transparent terms and end-to-end guidance.",
        infoHref: "/home-property-loan",
        highlight: true,
        badge: "Low Interest",
      },
      {
        key: "loan-against-property",
        title: "Loan Against Property",
        description: "Leverage your property value for higher ticket funding with longer tenure options.",
        infoHref: "/home-property-loan",
      },
      {
        key: "plot-purchase-loan",
        title: "Plot Purchase Loan",
        description: "Finance plot purchase with repayment options aligned to your income profile.",
        infoHref: "/home-property-loan",
      },
      {
        key: "construction-loan",
        title: "Construction Loan",
        description: "Build your home with stage-wise disbursal and structured repayment plans.",
        infoHref: "/home-property-loan",
      },
    ],
  },
  {
    title: "Vehicle Loans",
    items: [
      {
        key: "car-loan",
        title: "Car Loan",
        description: "Finance a new or used car with flexible tenures and fast processing.",
        infoHref: "/vehicle-loan",
      },
      {
        key: "two-wheeler-loan",
        title: "Two-Wheeler Loan",
        description: "Affordable financing options for scooters and bikes with quick approvals.",
        infoHref: "/vehicle-loan",
      },
      {
        key: "commercial-vehicle-loan",
        title: "Commercial Vehicle Loan",
        description: "Funding for commercial vehicles with tenure options designed for cashflow.",
        infoHref: "/vehicle-loan",
      },
      {
        key: "ev-loan",
        title: "EV (Electric Vehicle) Loan",
        description: "Finance electric vehicles with attractive offers and tailored repayment plans.",
        infoHref: "/vehicle-loan",
        badge: "EV",
      },
    ],
  },
  {
    title: "Gold & Asset-Based Loans",
    items: [
      {
        key: "gold-loan",
        title: "Gold Loan",
        description: "Quick secured loan against gold with transparent valuation and fast disbursal.",
        infoHref: "/gold-asset-loan",
      },
      {
        key: "loan-against-securities",
        title: "Loan Against Securities",
        description: "Secure funding by pledging eligible securities with transparent terms.",
        infoHref: "/gold-asset-loan",
      },
    ],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePageClient() {

  const benefits = [
    {
      icon: Clock,
      title: "Quick Approvals",
      description: "Get approvals in as little as 24 hours with minimal documentation",
      stat: "24hrs",
      label: "Average Response"
    },
    {
      icon: CheckCircle2,
      title: "Best Options",
      description: "We guide you through eligibility, documentation, and next steps",
      stat: "100%",
      label: "Transparency"
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data is protected and never shared without consent",
      stat: "256-bit",
      label: "Encryption"
    },
  ];

  const slides = useMemo(
    () => [
      { src: "/home-img/home1.jpeg", alt: "Fintech services" },
      { src: "/home-img/home2.jpeg", alt: "Digital lending" },
      { src: "/home-img/home3.jpeg", alt: "Financial inclusion" },
      { src: "/home-img/home4.jpeg", alt: "Secure payments" },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      const len = slides.length;
      const safe = ((index % len) + len) % len;
      setActiveIndex(safe);
    },
    [slides.length]
  );

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (isPausedRef.current) return;
      nextSlide();
    }, AUTOPLAY_MS);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [nextSlide]);

  const onMouseEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const [activeCategory, setActiveCategory] = useState<HubCategoryKey>("loans");
  const activeMeta = CATEGORY_META.find((c) => c.key === activeCategory)!;

  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const activeCards = useMemo(() => {
    if (activeCategory === "loans") {
      return LOAN_SERVICES.flatMap((g) => g.items);
    }

    if (activeCategory === "insurance") {
      return [
        {
          key: "insurance-life",
          title: "Life Insurance",
          description: "Protect your family’s future with the right life cover and plan benefits.",
          infoHref: "/services/insurance",
          highlight: true,
          badge: "Trusted",
        },
        {
          key: "insurance-health",
          title: "Health Insurance",
          description: "Choose comprehensive medical coverage with cashless network support.",
          infoHref: "/services/insurance",
          badge: "Popular",
        },
        {
          key: "insurance-motor",
          title: "Motor Insurance",
          description: "Car/bike insurance with add-ons, easy renewal and claim guidance.",
          infoHref: "/services/insurance",
        },
        {
          key: "insurance-home",
          title: "Home Insurance",
          description: "Safeguard your home and valuables from damage, theft, and risks.",
          infoHref: "/services/insurance",
        },
      ];
    }

    if (activeCategory === "credit-cards") {
      return [
        {
          key: "credit-line-flexi",
          title: "Credit Line / Flexi Loan",
          description: "Flexible credit access for short-term needs with convenient repayments.",
          infoHref: "/services/credit-cards",
          highlight: true,
          badge: "Rewards",
        },
        {
          key: "business-credit-card",
          title: "Business Credit Card",
          description: "Manage business spends and cashflow with tailored limits and benefits.",
          infoHref: "/services/credit-cards",
          badge: "Business",
        },
        {
          key: "personal-credit-card",
          title: "Personal Credit Card",
          description: "Choose cards based on rewards, fees, and your monthly spending.",
          infoHref: "/services/credit-cards",
        },
        {
          key: "bnpl",
          title: "BNPL",
          description: "Buy now and pay later options with transparent terms and eligibility.",
          infoHref: "/services/credit-cards",
        },
      ];
    }

    return [
      {
        key: "pm-mudra-loan",
        title: "PM Mudra Loan",
        description: "Scheme-backed funding options for micro and small businesses.",
        infoHref: "/services/government-schemes",
        highlight: true,
        badge: "No Collateral",
      },
      {
        key: "stand-up-india",
        title: "Stand-Up India",
        description: "Support for entrepreneurs with eligible loan offerings and guidance.",
        infoHref: "/services/government-schemes",
        badge: "Scheme",
      },
      {
        key: "cgtmse",
        title: "CGTMSE Loan",
        description: "Collateral-free credit support for MSMEs under CGTMSE coverage.",
        infoHref: "/services/government-schemes",
      },
      {
        key: "jansamarth",
        title: "Jansamarth",
        description: "Explore linked schemes and apply with simplified eligibility checks.",
        infoHref: "/services/government-schemes",
      },
    ];
  }, [activeCategory]);

  const activeFaqItems = useMemo<FaqItem[]>(() => {
    if (activeCategory === "loans") {
      return [
        {
          id: "loans-eligibility",
          question: "How do I check eligibility for a loan?",
          answer:
            "Eligibility depends on income/cashflow, credit profile, age, and lender policy. Apply once and we help you identify the best options based on your profile.",
        },
        {
          id: "loans-docs",
          question: "What documents are commonly required?",
          answer:
            "Typically PAN and Aadhaar, recent bank statements, and income proof. For business loans, GST/registration and ITRs may be needed depending on the product.",
        },
        {
          id: "loans-approval-time",
          question: "How long does approval and disbursal take?",
          answer:
            "Most cases get an eligibility response quickly. Final approval and disbursal timelines depend on verification and documents, and can be as fast as 24–48 hours for eligible profiles.",
        },
        {
          id: "loans-prepayment",
          question: "Can I prepay or foreclose my loan?",
          answer:
            "Many lenders allow part-prepayment/foreclosure. Charges (if any) depend on lender and product. We’ll help you understand the exact terms before you proceed.",
        },
      ];
    }

    if (activeCategory === "insurance") {
      return [
        {
          id: "ins-which",
          question: "Which insurance is right for me?",
          answer:
            "It depends on your life stage and risk coverage needs. We help you compare plans for life, health, motor, and business coverage with clear pros/cons.",
        },
        {
          id: "ins-docs",
          question: "What documents are needed to buy insurance?",
          answer:
            "Usually basic KYC (PAN/Aadhaar) and plan-specific details (vehicle RC for motor, medical disclosures for health/life). Requirements vary by insurer.",
        },
        {
          id: "ins-claims",
          question: "How do claims work?",
          answer:
            "Claims are filed with the insurer and processed based on the policy terms. We guide you on documents, timelines, and escalation steps for a smooth process.",
        },
      ];
    }

    if (activeCategory === "credit-cards") {
      return [
        {
          id: "cc-eligibility",
          question: "What decides my credit card eligibility?",
          answer:
            "Credit score, income, existing liabilities, and your credit history are key factors. Different cards have different eligibility criteria.",
        },
        {
          id: "cc-best",
          question: "How do I choose the best card?",
          answer:
            "Pick based on your spends (fuel, travel, online, business), annual fees, and reward value. We help you match a card to your usage.",
        },
        {
          id: "cc-limit",
          question: "How is my credit limit decided?",
          answer:
            "Limits are decided by the issuer based on income and credit profile. Responsible usage can help you get increases over time.",
        },
      ];
    }

    return [
      {
        id: "govt-who",
        question: "Who can apply for government schemes?",
        answer:
          "Eligibility varies by scheme (sector, turnover, location, category). We help you shortlist schemes based on your business and documentation.",
      },
      {
        id: "govt-docs",
        question: "What documents are generally required?",
        answer:
          "Commonly KYC, business registration (Udyam/GST where applicable), bank details, and scheme-specific declarations. We’ll share a checklist for your selected scheme.",
      },
      {
        id: "govt-timeline",
        question: "How long does it take to get benefits?",
        answer:
          "Timelines depend on the scheme and department processing. We help you submit a correct application to avoid delays.",
      },
    ];
  }, [activeCategory]);

  const activeHowItWorks = useMemo<HowItWorksStep[]>(() => {
    if (activeCategory === "insurance") {
      return [
        { id: "ins-step-1", title: "Tell Us Your Needs", description: "Share what you want to protect and your budget.", icon: User },
        { id: "ins-step-2", title: "Compare Plans", description: "We shortlist plans with clear benefits and exclusions.", icon: Shield },
        { id: "ins-step-3", title: "Buy Securely", description: "Complete KYC and purchase with guided support.", icon: FileCheck },
        { id: "ins-step-4", title: "Get Help Anytime", description: "We assist with renewals and claim guidance.", icon: Clock },
      ];
    }

    if (activeCategory === "credit-cards") {
      return [
        { id: "cc-step-1", title: "Check Eligibility", description: "We review basic details to match the right cards.", icon: FileText },
        { id: "cc-step-2", title: "Pick Rewards", description: "Choose offers that fit your spending pattern.", icon: Sparkles },
        { id: "cc-step-3", title: "Apply Online", description: "Submit the application digitally in minutes.", icon: CreditCard },
        { id: "cc-step-4", title: "Get Approved", description: "Receive confirmation and track your card delivery.", icon: CheckCircle2 },
      ];
    }

    if (activeCategory === "government-schemes") {
      return [
        { id: "govt-step-1", title: "Shortlist Schemes", description: "We identify relevant schemes for your profile.", icon: Building2 },
        { id: "govt-step-2", title: "Prepare Documents", description: "Get a checklist and help with accurate submission.", icon: FileCheck },
        { id: "govt-step-3", title: "Apply & Track", description: "Submit and track your application status.", icon: TrendingUp },
        { id: "govt-step-4", title: "Receive Benefits", description: "Get subsidies/approvals as per scheme timelines.", icon: CheckCircle2 },
      ];
    }

    return [
      { id: "loan-step-1", title: "Apply Online", description: "Tell us your requirement and basic details.", icon: FileText },
      { id: "loan-step-2", title: "Upload Documents", description: "Submit KYC and income/business proofs digitally.", icon: FileCheck },
      { id: "loan-step-3", title: "Quick Verification", description: "We verify and match you with the best option.", icon: Clock },
      { id: "loan-step-4", title: "Get Approved", description: "Receive approval and disbursal updates.", icon: CheckCircle2 },
    ];
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Hero carousel"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute inset-0">
          {slides.map((slide, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={slide.src}
                className={cx(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  isActive ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-black/30 to-accent/30" />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        </div>

        <div className="relative">
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex min-h-[560px] items-center py-14 sm:min-h-[640px] sm:py-20 lg:min-h-[740px]">
              <div className="mx-auto w-full max-w-4xl text-center">
                <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Trusted Financial Partner
                </Badge>

                <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                  Your Financial Goals,{" "}
                  <span className="text-accent">Simplified</span>
                </h1>

                <p className="mt-6 text-lg text-primary-foreground/80 sm:text-xl max-w-3xl mx-auto">
                  From personal loans to business funding, insurance to credit cards — we help you access the right
                  financial products with complete transparency.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {/* <ApplyNowCTAButton size="xl" className="group">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </ApplyNowCTAButton> */}
                  <Button
                    asChild
                    variant="hero-outline"
                    size="xl"
                    className="text-white bg-[#F97415]"
                  >
                    <Link href="/contact">Talk to an Expert</Link>
                  </Button>
                </div>

                <div className="mt-10 flex items-center justify-center gap-2" aria-label="Slide pagination">
                  {slides.map((_, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={i}
                        type="button"
                        className={cx(
                          "h-2.5 w-2.5 rounded-full transition",
                          isActive
                            ? "bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]"
                            : "bg-white/40 hover:bg-white/70"
                        )}
                        onClick={() => goToSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={isActive ? "true" : "false"}
                      />
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                    aria-label="Previous slide"
                  >
                    <ArrowIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                    aria-label="Next slide"
                  >
                    <ArrowIcon className="h-5 w-5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              aria-hidden="true"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
                fill="#ffffff"
              />
            </svg>
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
              Explore Our <span className="text-[#f97415] text-7xl">Loan</span> Services
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
                  className={`gap-2 transition-all duration-300 border ${
                    isActive
                      ? "scale-105 bg-[#F97415] text-white border-[#F97415] hover:bg-[#F97415]/90"
                      : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {cat.title}
                </Button>
              );
            })}
          </div>

          {activeCategory === "loans" ? (
            <div className="space-y-10">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#F97415]/25 bg-[#F97415]/10 px-5 py-4">
                <div className="text-sm font-semibold text-[#F97415]">
                  Explore all services in one place
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F97415] text-white hover:bg-[#F97415]/90 shadow-md"
                >
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>

              {LOAN_SERVICES.map((group, groupIndex) => (
                <div key={group.title} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">{group.title}</h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.items.slice(0, 4).map((service, idx) => (
                      <Card
                        key={service.key}
                        className={`group relative overflow-hidden border-2 bg-gradient-to-br from-black via-neutral-900 to-neutral-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                          service.highlight ? "border-primary/30" : "border-transparent"
                        }`}
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
                          <CardTitle className="text-xl font-bold text-white pr-16">{service.title}</CardTitle>
                          <CardDescription className="text-white/70 mt-2 line-clamp-2">
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
            <div className="space-y-10">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#F97415]/25 bg-[#F97415]/10 px-5 py-4">
                <div className="text-sm font-semibold text-[#F97415]">
                  Explore all services in one place
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F97415] text-white hover:bg-[#F97415]/90 shadow-md"
                >
                  <Link
                    href={
                      activeCategory === "insurance"
                        ? "/services/insurance"
                        : activeCategory === "credit-cards"
                        ? "/services/credit-cards"
                        : "/services/government-schemes"
                    }
                  >
                    View All
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activeCards.slice(0, 4).map((service, idx) => (
                  <Card
                    key={service.key}
                    className={`group relative overflow-hidden border-2 bg-gradient-to-br from-black via-neutral-900 to-neutral-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      service.highlight ? "border-primary/30" : "border-transparent"
                    }`}
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
                      <CardTitle className="text-xl font-bold text-white pr-16">{service.title}</CardTitle>
                      <CardDescription className="text-white/70 mt-2 line-clamp-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-3">
                        <ApplyNowCTAButton loanType={service.title} className="w-full group-hover:shadow-glow-cta" size="lg">
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
          )}

<ModernSections />
          {/* <div className="mt-14 space-y-12">
            <section className="rounded-3xl bg-secondary/40 p-6 sm:p-10">
              <div className="text-center mb-10 animate-fade-in-up">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
                <p className="mt-3 text-lg text-muted-foreground">A simple, guided process tailored to your selected service</p>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                {activeHowItWorks.map((step, idx) => (
                  <div
                    key={step.id}
                    className="relative rounded-2xl bg-card p-6 shadow-lg border border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {idx + 1}
                      </div>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-card p-6 sm:p-10 border border-border/60">
              <div className="text-center mb-10 animate-fade-in-up">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">FAQs</h2>
                <p className="mt-3 text-lg text-muted-foreground">Quick answers based on the service you’re viewing</p>
              </div>

              <div className="mx-auto max-w-3xl space-y-3">
                {activeFaqItems.map((item, idx) => {
                  const isOpen = openFaqId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-border/70 bg-secondary/20 shadow-sm animate-fade-in-up"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`panel-${item.id}`}
                        id={`tab-${item.id}`}
                        onClick={() => setOpenFaqId((prev) => (prev === item.id ? null : item.id))}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span className="text-base sm:text-lg font-semibold text-foreground">{item.question}</span>
                        <svg
                          className={cx(
                            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div
                        id={`panel-${item.id}`}
                        role="region"
                        aria-labelledby={`tab-${item.id}`}
                        className={cx(
                          "px-5 pb-5 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div> */}
        </div>
      </section>

      <LogoCloud />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-sm mb-4">
            <div className="w-2 h-2 bg-[#F97415] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
            Built for Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Success</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#F97415]/20 -rotate-1" />
            </span>
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We make financial products accessible, transparent, and hassle-free with cutting-edge technology
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`
              }}
            >
              {/* Glass Card */}
              <div className="relative h-full rounded-2xl bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Orange Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F97415] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8">
                  {/* Icon Container with Stat Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      {/* Icon Background */}
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200/50 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <benefit.icon className="h-8 w-8 text-black group-hover:text-[#F97415] transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                      
                      {/* Animated Ring */}
                      <div className="absolute -inset-2 rounded-2xl border-2 border-[#F97415]/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </div>

                    {/* Stat Badge */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-black group-hover:text-[#F97415] transition-colors duration-300">
                        {benefit.stat}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-1">
                        {benefit.label}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-black group-hover:text-gray-900 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom Shine Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F97415]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Shadow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>

        {/* Bottom CTA (Optional) */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-[#F97415]" />
            <span>Trusted by over 10,000+ customers nationwide</span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-accent p-8 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Apply now and get a decision within 24 hours. No hidden fees, no surprises.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ApplyNowCTAButton loanType="Loan" className="shadow-2xl" size="xl">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ApplyNowCTAButton>
                <Button asChild variant="hero-outline" size="xl">
                  <Link href="/contact">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
