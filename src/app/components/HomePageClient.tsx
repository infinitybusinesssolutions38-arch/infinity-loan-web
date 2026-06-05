"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Hammer,
  Landmark,
  ScrollText,
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
import PrivateInstitutionalHighlight from "./PrivateInstitutionalHighlight";
import PoorCibilHighlight from "./PoorCibilHighlight";
import LoanTestimonials from "./LoanTestimonials";
import EmiRestructuringHighlight from "./Emirestructuringhighlight";
import PropertyLoanHighlight from "./Propertyloanhighlight";
import LogoCloud2 from "@/components/logocloud2";
import PopupModal from "@/components/PopupModal";


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
  icon: ComponentType<{ className?: string }>;
};

const AUTOPLAY_MS = 3000;

const CATEGORY_META: Array<{
  key: HubCategoryKey;
  title: string;
  icon: ComponentType<{ className?: string }>;
  gradient: string;
}> = [
    { key: "loans", title: "Loans", icon: Banknote, gradient: "bg-gradient-loans" },
    { key: "insurance", title: "Insurance", icon: Shield, gradient: "bg-gradient-insurance" },
    { key: "credit-cards", title: "Credits & Cards", icon: CreditCard, gradient: "bg-gradient-credit" },
    { key: "government-schemes", title: "Government Schemes", icon: Building2, gradient: "bg-gradient-government" },
  ];

const TRUST_INDICATORS = [
  { icon: Users, value: "60,000+", label: "Happy Customers" },
  { icon: TrendingUp, value: "₹600 Cr+", label: "Loans Disbursed" },
  { icon: Clock, value: "48 Hours", label: "Average Approval" },
  { icon: FileCheck, value: "96%", label: "Success Rate" },
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
      title: "Quick & Easy Approvals",
      description: "Get approvals in as little as 48 hours with minimal documentation",
      stat: "48hrs",
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
    () => {
      const fileNames = [
        "loanOffersForSalaried.jpeg",
        "smartLoanAndFundingSolutionsForAllBusinesses.png",
        "smartLoanAndFundingSolutionsForAllProfessional.jpeg",
        "smartLoanAndFundingSolutionsforGovernmentEmployees.png",
        "endToEndFinancingSupportForGovernmentSchemes.webp",
        "smartLoanAndProjectFundingSolutionsForBuildersAndDevelopers.jpeg",
        "loanOffersForSalariedEmployees2.jpeg",
        "smartLoanAndFundingSolutionsForAllBusinesses2.png",
        "smartLoanAndFundingSolutionsForAllProfessionals2.jpeg",
        "smartLoanAndFundingSolutionsForGovernment2.png",
        "endToEndFinancingSupportForGovernmentSchemes2.jpeg",
        "smartLoanAndProjectFundingSolutionsForBuildersAndDevelopers2.jpeg",
        "loanOffersForSalariedEmployees3.jpeg",
        "smartLoanAndFundingSolutionsForAllBusinesses3.jpeg",
        "smartLoanAndFundingSolutionsForAllProfessionals3.jpeg",
        "smartLoanAndFundingSolutionsForGovernmentEmployees3.jpeg",
        "endToEndFinancingSupportForGovernmentSchemes3.jpeg",
        "smartLoanAndProjectFundingSolutionsForBuildersAndDevelopers3.jpeg",
      ];

      return fileNames.map((fileName) => ({
        src: `/home2/${encodeURIComponent(fileName)}`,
        alt: "Infinity Loans & Business Solutions",
      }));
    },
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isSlideAnimating, setIsSlideAnimating] = useState(false);
  const activeSlide = slides[activeIndex];

  const heroContentGroups = useMemo(
    () => [
      {
        badge: "Trusted Financial Partner",
        icon: Users,
        title: "Loan Offers for Salaried Employees",

      },
      {
        badge: "Quick & Transparent",
        icon: Banknote,
        title: "Smart Loan & Funding Solutions for All Businesses — Proprietorships, Mid-Sized SMEs, Industrial Enterprises, and Corporates,",

      },
      {
        badge: "Eligibility-led Guidance",
        icon: Briefcase,
        title: "Smart Loan & Funding Solutions for All Professionals — Doctors, Chartered Accountants, Architects, Engineers, Lawyers, Consultants, and Self-Employed Professionals",
      },
      {
        badge: "Eligibility-led Guidance",
        icon: Landmark,
        title: "Smart Loan & Funding Solutions for Central & State Government Employees — Civil Services, Public Sector Staff, Defence Personnel, and Other Government Employees",
      },
      {
        badge: "Eligibility-led Guidance",
        icon: ScrollText,
        title: "End-to-End Financing Support for Central & State Government Schemes",
      },
      {
        badge: "Eligibility-led Guidance",
        icon: Hammer,
        title: "Smart Loan & Project Funding Solutions for Builders & Developer",
      },


    ],
    []
  );

  const activeHeroContent = heroContentGroups[activeIndex % heroContentGroups.length];
  const ActiveHeroIcon = activeHeroContent.icon;
  const isPausedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((i) => {
      setPreviousIndex(i);
      return (i + 1) % slides.length;
    });
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((i) => {
      setPreviousIndex(i);
      return (i - 1 + slides.length) % slides.length;
    });
  }, [slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      const len = slides.length;
      const safe = ((index % len) + len) % len;
      setActiveIndex((i) => {
        setPreviousIndex(i);
        return safe;
      });
    },
    [slides.length]
  );

  useEffect(() => {
    if (previousIndex === null) return;

    setIsSlideAnimating(false);
    const raf = window.requestAnimationFrame(() => {
      setIsSlideAnimating(true);
    });

    const t = window.setTimeout(() => {
      setPreviousIndex(null);
      setIsSlideAnimating(false);
    }, 720);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [previousIndex]);

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

  const onHeroKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  const slidesPerGroup = slides.length / heroContentGroups.length;
  const activeGroupIndex = Math.floor(activeIndex / slidesPerGroup);

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
          description: "Protect your family’s future with the right life cover and plan benefits",
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
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <section
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.10)] outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
          aria-roledescription="carousel"
          aria-label="Hero carousel"
          tabIndex={0}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={onHeroKeyDown}
        >
          {/* Slide images */}
          <div className="absolute inset-0">
            {previousIndex !== null && slides[previousIndex] && (
              <div
                key={`prev-${previousIndex}`}
                className="absolute inset-0 transition-all duration-300 ease-out will-change-transform"
                style={{ transform: isSlideAnimating ? "translateX(-100%)" : "translateX(0%)" }}
                aria-hidden
              >
                <Image
                  src={slides[previousIndex].src}
                  alt={slides[previousIndex].alt}
                  fill
                  priority={false}
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover object-top"
                />
              </div>
            )}

            <div
              key={`active-${activeIndex}`}
              className="absolute inset-0 transition-all duration-300 ease-out will-change-transform"
              style={
                previousIndex === null
                  ? { transform: "translateX(0%)" }
                  : { transform: isSlideAnimating ? "translateX(0%)" : "translateX(100%)" }
              }
            >
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover object-top"
              />
            </div>

            {/* Light fintech overlays for readability (no dark/black gradients) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/55 to-white/85" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,174,239,0.20),transparent_55%)]" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex min-h-[520px] items-center sm:min-h-[580px] lg:min-h-[680px]">
            <div className="w-full px-6 py-16 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <div
                key={`hero-content-${activeIndex}`}
                className="max-w-[600px]"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#00AEEF]" aria-hidden />
                  <span className="text-[#1A1A1A]">{activeHeroContent.badge}</span>
                </div>

                <h1 className="mt-6 text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#1A1A1A] sm:mt-7 sm:text-4xl lg:mt-8 lg:text-[2.75rem] lg:leading-[1.15]">
                  <span className="flex items-start gap-4">
                    <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D6EEF8] bg-[#E6F7FD] shadow-[0_2px_10px_rgba(15,23,42,0.06)] sm:h-14 sm:w-14">
                      <ActiveHeroIcon
                        className="h-6 w-6 text-[#00AEEF] sm:h-7 sm:w-7"
                        strokeWidth={2.25}
                      />
                    </span>
                    <span>{activeHeroContent.title}</span>
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Slider controls — arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6EEF8] bg-white text-[#00AEEF] shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:border-[#00AEEF]/40 sm:left-6 lg:left-8"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6EEF8] bg-white text-[#00AEEF] shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:border-[#00AEEF]/40 sm:right-6 lg:right-8"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>

          {/* Slider controls — dot indicators (grouped by content) */}
          <div
            className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#D6EEF8] bg-white/90 px-4 py-2.5 shadow-[0_2px_10px_rgba(15,23,42,0.06)] sm:bottom-8"
            aria-label="Slide pagination"
          >
            {heroContentGroups.map((_, i) => {
              const isActive = activeGroupIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  className={cx(
                    "h-2 rounded-full transition-all duration-300",
                    isActive
                      ? "w-7 bg-[#00AEEF] shadow-[0_0_0_4px_rgba(0,174,239,0.14)]"
                      : "w-2 bg-[#00AEEF]/25 hover:bg-[#00AEEF]/50"
                  )}
                  onClick={() => goToSlide(Math.round(i * slidesPerGroup))}
                  aria-label={`Go to slide group ${i + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              );
            })}
          </div>
        </section>
      </div>


      <section className="bg-[#F7F9FC] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
              <span className="text-[#00AEEF]">Our Key Strengths</span>
              <span className="mx-2 font-normal text-[#666666]">-</span>
              <span>Our Key Business Verticals</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <PrivateInstitutionalHighlight />
            <PoorCibilHighlight />
            <EmiRestructuringHighlight />
            <PropertyLoanHighlight />
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-[#F7F9FC] py-16 lg:py-24">
  <div className="container mx-auto px-4">
    <div className="mb-7 sm:mb-8 text-center">
      <h2 className="inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#1A1A1A] shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
        <span className="w-2 h-2 rounded-full bg-[#00AEEF]" />
        Why Choose Us
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {TRUST_INDICATORS.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 rounded-[20px] bg-white border border-[#D6EEF8] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E6F7FD] border border-[#D6EEF8]">
            <item.icon className="h-8 w-8 text-[#00AEEF]" />
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              {item.value}
            </p>
            <p className="text-sm text-[#666666]">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative mb-10 overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-background p-5 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out sm:mb-12 sm:p-6">

            <div className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
                Explore Our <span className="text-[#00AEEF] text-4xl sm:text-5xl lg:text-6xl">Loan</span> Services
              </h2>

              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore a comprehensive range of financial solutions tailored to your specific needs.
              </p>

              <div className="mt-8">
                <Link href="/services#ourAllServices">
                  <button className="cursor-pointer px-8 py-3 bg-[#00AEEF] text-white font-semibold rounded-xl shadow-[0_2px_10px_rgba(0,174,239,0.18)] hover:bg-[#008FCC] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20">
                    View All Loan Services
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <ModernSections />
        </div>
      </section>

      <LogoCloud />

      <section className="relative overflow-hidden bg-[#F7F9FC] py-16 lg:py-24">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,174,239,0.8) 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)] mb-4">
              <div className="w-2 h-2 bg-[#00AEEF] rounded-full" />
              <span className="text-sm font-semibold text-[#1A1A1A]">Why Choose Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1A1A]">
              Built for Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Success</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#00AEEF]/20 -rotate-1" />
              </span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We make financial products accessible, transparent, and hassle-free with cutting-edge technology
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="relative">
                <div className="relative h-full rounded-[20px] bg-white border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)] overflow-hidden">
                  <div className="relative p-6 sm:p-8">
                    {/* Icon Container with Stat Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        {/* Icon Background */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E6F7FD] border border-[#D6EEF8]">
                          <benefit.icon className="h-7 w-7 text-[#00AEEF]" strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* Stat Badge */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#00AEEF]">
                          {benefit.stat}
                        </div>
                        <div className="text-xs text-[#666666] font-medium mt-1">
                          {benefit.label}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                        {benefit.title}
                      </h3>
                      <p className="text-[#666666] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA (Optional) */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-[#00AEEF]" />
              <span>Trusted by over 60,000+ customers nationwide</span>
            </div>
          </div>
        </div>

      </section>

      {/* Testimonials Section */}
      <LoanTestimonials />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-white p-8 lg:p-16 text-center shadow-[0_8px_30px_rgba(15,23,42,0.10)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,174,239,0.18),transparent_55%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-[#1A1A1A] sm:text-4xl lg:text-5xl">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
                Apply now and get a decision within 48 hours. No hidden fees, no surprises.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link href="/services">Get Started Now</Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href="/contact#contact-form">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <PopupModal />
    </div>
  );
}