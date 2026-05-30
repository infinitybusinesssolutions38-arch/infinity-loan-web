"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  Briefcase,
  CheckCircle2,
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
  Car,
  ChevronLeft,
  ChevronRight,
  Calculator,
  MessageCircle,
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
import { ScrollReveal } from "@/components/ui/scroll-reveal";


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

const QUICK_LINKS = [
  { icon: FileCheck, label: "Apply Now", href: "/services" },
  { icon: Clock, label: "Check Status", href: "/login" },
  { icon: Calculator, label: "EMI Calculator", href: "/emi-calculator" },
  { icon: MessageCircle, label: "Contact Us", href: "/contact" },
];

const TRUST_INDICATORS = [
  { icon: Users, value: "60,000+", label: "Happy Customers" },
  { icon: TrendingUp, value: "â‚¹600 Cr+", label: "Loans Disbursed" },
  { icon: Clock, value: "48 Hours", label: "Average Approval" },
  { icon: FileCheck, value: "96%", label: "Success Rate" },
];

const FEATURED_LOAN_CARDS = [
  {
    icon: User,
    title: "Personal Loan",
    description: "Flexible personal financing for education, medical, travel and more.",
    href: "/personal-loan",
  },
  {
    icon: Landmark,
    title: "Home Loan",
    description: "Competitive rates for home purchase, construction and balance transfer.",
    href: "/services/loans",
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    description: "Working capital, MSME, machinery and expansion funding solutions.",
    href: "/business-loan",
  },
  {
    icon: Car,
    title: "Vehicle Loan",
    description: "Car, two-wheeler, commercial vehicle and EV financing options.",
    href: "/services/loans",
  },
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
        description: "A flexible limit for withdrawals as needed â€” interest is charged only on utilisation.",
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
        alt: "Infinity Loan Services",
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
        title: "Smart Loan & Funding Solutions for All Businesses â€” Proprietorships, Mid-Sized SMEs, Industrial Enterprises, and Corporates,",

      },
      {
        badge: "Eligibility-led Guidance",
        icon: Briefcase,
        title: "Smart Loan & Funding Solutions for All Professionals â€” Doctors, Chartered Accountants, Architects, Engineers, Lawyers, Consultants, and Self-Employed Professionals",
      },
      {
        badge: "Eligibility-led Guidance",
        icon: Landmark,
        title: "Smart Loan & Funding Solutions for Central & State Government Employees â€” Civil Services, Public Sector Staff, Defence Personnel, and Other Government Employees",
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
          description: "Protect your familyâ€™s future with the right life cover and plan benefits",
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
            "Most cases get an eligibility response quickly. Final approval and disbursal timelines depend on verification and documents, and can be as fast as 24â€“48 hours for eligible profiles.",
        },
        {
          id: "loans-prepayment",
          question: "Can I prepay or foreclose my loan?",
          answer:
            "Many lenders allow part-prepayment/foreclosure. Charges (if any) depend on lender and product. Weâ€™ll help you understand the exact terms before you proceed.",
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
          "Commonly KYC, business registration (Udyam/GST where applicable), bank details, and scheme-specific declarations. Weâ€™ll share a checklist for your selected scheme.",
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
          {previousIndex !== null && slides[previousIndex] && (
            <div
              key={`prev-${previousIndex}`}
              className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: isSlideAnimating ? "translateX(-100%)" : "translateX(0%)" }}
              aria-hidden
            >
              <Image
                src={slides[previousIndex].src}
                alt={slides[previousIndex].alt}
                fill
                priority={false}
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          )}

          <div
            key={`active-${activeIndex}`}
            className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
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
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-black/30 to-accent/30" />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="container relative z-10 mx-auto px-4">
            <div className="flex min-h-[520px] items-center py-14 sm:min-h-[600px] sm:py-16 lg:min-h-[680px]">
              <div className="max-w-2xl text-left lg:max-w-3xl">
                <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
                  {activeHeroContent.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="container mx-auto px-4">
        <div className="mt-10 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-3xl border-2 border-[#0099D8]/20 bg-white px-8 py-5 text-center shadow-lg sm:gap-x-4 sm:px-10 sm:py-6 lg:px-14 lg:py-7">
            <span className="text-lg font-bold text-[#0099D8] sm:text-xl lg:text-2xl xl:text-3xl">
              Our Key Strengths
            </span>
            <span className="text-base font-medium text-gray-400 sm:text-lg lg:text-xl xl:text-2xl">-</span>
            <span className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl xl:text-3xl">
              Our Key Business Verticals
            </span>
          </div>
        </div>
      </div>

      <PrivateInstitutionalHighlight />
      <PoorCibilHighlight />
      <EmiRestructuringHighlight />
      <PropertyLoanHighlight />

      {/* Quick Links */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {QUICK_LINKS.map((item, idx) => (
              <ScrollReveal key={item.label} delay={idx * 80} animation="scale-in">
                <Link
                  href={item.href}
                  className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-[#0099D8]/40 hover:shadow-md"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0099D8]/10 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-7 w-7 text-[#0099D8]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-[#0099D8]">
                    {item.label}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Our Loan Services Banner */}
      <section className="bg-[#0099D8]/5 py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-in-up">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our{" "}
              <span className="text-[#0099D8]">Loan Services</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Explore a comprehensive range of financial solutions tailored to your specific needs.
            </p>
            <div className="mt-8">
              <Link href="/services">
                <button className="cursor-pointer rounded-xl bg-[#0099D8] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#0099D8]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#007BB0] hover:shadow-xl hover:shadow-[#0099D8]/30">
                  View All Loan Services
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Loan Cards */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_LOAN_CARDS.map((card, idx) => (
              <ScrollReveal key={card.title} delay={idx * 100} animation="scale-in">
                <Link href={card.href} className="group block h-full">
                  <div className="modern-dark-card modern-card-shine h-full p-6">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#0099D8]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0099D8]/20 to-[#2E3192]/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <card.icon className="h-7 w-7 text-[#0099D8]" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#0099D8]">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                        {card.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0099D8]">
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ModernSections />

      {/* Trust Stats */}
      <section className="relative z-20 bg-gray-50 py-10 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TRUST_INDICATORS.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} animation="scale-in">
                <div className="modern-stat-card modern-card-shine group flex items-center gap-4 p-6">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0099D8]/15 to-[#2E3192]/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <item.icon className="h-7 w-7 text-[#0099D8]" />
                    <div className="absolute -inset-1 rounded-xl border border-[#0099D8]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="relative min-w-0">
                    <p className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-[#0099D8]">
                      {item.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoCloud />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="absolute top-0 left-1/4 h-96 w-96 animate-blob rounded-full bg-gray-200 opacity-20 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-2000 absolute top-0 right-1/4 h-96 w-96 animate-blob rounded-full bg-gray-300 opacity-20 mix-blend-multiply blur-3xl filter" />

        <div className="container relative z-10 mx-auto px-4">
          <ScrollReveal animation="fade-in-up">
            <div className="mb-16 space-y-4 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#0099D8]" />
                <span className="text-sm font-medium text-gray-700">Why Choose Us</span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl">
                Built for Your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Success</span>
                  <span className="absolute bottom-2 left-0 h-3 w-full -rotate-1 bg-[#0099D8]/20" />
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                We make financial products accessible, transparent, and hassle-free with cutting-edge technology
              </p>
            </div>
          </ScrollReveal>

          {/* Benefits Grid */}
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <ScrollReveal key={idx} delay={idx * 120} animation="scale-in">
                <div className="group relative h-full">
                  <div className="modern-dark-card modern-card-shine relative h-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg transition-all duration-500 hover:shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0099D8]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#0099D8] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative p-8">
                      <div className="mb-6 flex items-start justify-between">
                        <div className="relative">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-[#0099D8]/10 to-[#0099D8]/5 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <benefit.icon className="h-8 w-8 text-[#0099D8]" strokeWidth={1.5} />
                          </div>
                          <div className="absolute -inset-2 rounded-2xl border-2 border-[#0099D8]/20 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#0099D8]">{benefit.stat}</div>
                          <div className="mt-1 text-xs font-medium text-[#0099D8]/80">{benefit.label}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#0099D8]">
                          {benefit.title}
                        </h3>
                        <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                          {benefit.description}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-[#0099D8]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-[#0099D8]/20 via-[#2E3192]/10 to-[#0099D8]/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-60" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA (Optional) */}
          <ScrollReveal animation="fade-in" delay={400}>
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-[#0099D8]" />
                <span>Trusted by over 60,000+ customers nationwide</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <LoanTestimonials />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-accent p-8 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Apply now and get a decision within 48 hours. No hidden fees, no surprises.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {/* <ApplyNowCTAButton loanType="Loan" redirectToUnifiedForm={true} className="shadow-2xl" size="xl">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ApplyNowCTAButton> */}
                <Button asChild variant="hero-outline" className="bg-[#0099D8] text-white" size="xl">
                  <Link href="/services">Get Started Now</Link>
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <Link href="/contact#contact-form">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
