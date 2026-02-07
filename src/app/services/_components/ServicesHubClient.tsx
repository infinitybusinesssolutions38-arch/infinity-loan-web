"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Banknote,
  Building2,
  Briefcase,
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
import PrivateInstitutionalHighlight from "@/app/components/PrivateInstitutionalHighlight";

type HubCategoryKey =
  | "salaried-employees"
  | "businesses"
  | "professionals"
  | "govt-employees"
  | "government-schemes"
  | "builders-developers"
  | "credit-cards";

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
      applyHref: `/apply-now?product=${applyPrefix}${slug}`,
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
  {
    key: "salaried-employees",
    title: "Loan Offers for Salaried Employees",
    icon: Users,
    gradient: "bg-gradient-loans",
  },
  {
    key: "businesses",
    title: "Smart Loan & Funding Solutions for All Businesses",
    icon: Banknote,
    gradient: "bg-gradient-loans",
  },
  {
    key: "professionals",
    title: "Smart Loan & Funding Solutions for All Professionals",
    icon: Briefcase,
    gradient: "bg-gradient-loans",
  },
  {
    key: "govt-employees",
    title: "Smart Loan & Funding Solutions for Central & State Government Employees",
    icon: Building2,
    gradient: "bg-gradient-government",
  },
  {
    key: "government-schemes",
    title: "End-to-End Financing Support for Central & State Government Schemes",
    icon: Building2,
    gradient: "bg-gradient-government",
  },
  {
    key: "builders-developers",
    title: "Smart Loan & Project Funding Solutions for Builders & Developers",
    icon: Building2,
    gradient: "bg-gradient-loans",
  },
  { key: "credit-cards", title: "Credits & Cards", icon: CreditCard, gradient: "bg-gradient-credit" },
];

const LOAN_SERVICES: ServiceGroup[] = [
  {
    title: "Business / MSME / Enterprise Loans",
    items: [
      {
        key: "msme-sme-loan",
        title: "MSME / SME Loan",
        description: "Funding for expansion, inventory and day-to-day operations with flexible repayment options.",
        applyHref: "/apply-now?product=msme-sme-loan",
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
        applyHref: "/apply-now?product=home-loan",
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
  "salaried-employees": [],
  businesses: [],
  professionals: [
    ...makeItems({
      prefix: "pro",
      infoHref: "/business-loan",
      titles: [
        "Professional Loan (Doctors / CAs / Architects)",
        "Loan for Professionals",
        "Teacher Loan",
        "Shopkeeper / Trader Loan",
        "Self-Employed Loan",
        "New to Credit Loan",
      ],
    }),
  ],
  "govt-employees": [
    ...makeItems({
      prefix: "govt-emp",
      infoHref: "/personal-loan",
      titles: [
        "Personal Loan for Salaried Individuals",
        "Salary Advance Loan",
        "Line of Credit (Personal)",
        "Emergency Loan",
      ],
    }),
  ],
  "builders-developers": [],
  "credit-cards": [
    {
      key: "credit-line-flexi",
      title: "Credit Line / Flexi Loan",
      description: "Revolving limit you can draw from when needed.",
      applyHref: "/apply-now?product=credit-line-flexi",
      infoHref: "/services/credit-cards",
      highlight: true,
      badge: "Flexible",
    },
    {
      key: "business-credit-card",
      title: "Business Credit Card",
      description: "Higher limits and tracking for business spending.",
      applyHref: "/apply-now?product=business-credit-card",
      infoHref: "/services/credit-cards",
    },
    {
      key: "personal-credit-card",
      title: "Personal Credit Card",
      description: "Everyday credit with rewards and EMI options.",
      applyHref: "/apply-now?product=personal-credit-card",
      infoHref: "/services/credit-cards",
      badge: "Rewards",
    },
    {
      key: "corporate-credit-card",
      title: "Corporate Credit Card",
      description: "Corporate cards for company expenses and better spend controls.",
      applyHref: "/apply-now?product=corporate-credit-card",
      infoHref: "/services/credit-cards",
    },
    {
      key: "emi-card",
      title: "EMI Card",
      description: "Pre-approved EMI limit for easy instalment purchases.",
      applyHref: "/apply-now?product=emi-card",
      infoHref: "/services/credit-cards",
      badge: "EMI",
    },
    {
      key: "bnpl",
      title: "Buy Now Pay Later (BNPL)",
      description: "Split purchases into smaller scheduled payments.",
      applyHref: "/apply-now?product=bnpl",
      infoHref: "/services/credit-cards",
      highlight: true,
      badge: "0% EMI",
    },
    {
      key: "postpaid-credit-line",
      title: "Postpaid Credit Line",
      description: "A revolving postpaid line for everyday expenses and bill payments.",
      applyHref: "/apply-now?product=postpaid-credit-line",
      infoHref: "/services/credit-cards",
    },
    {
      key: "subscription-financing",
      title: "Subscription Financing",
      description: "Convert subscriptions into manageable monthly instalments.",
      applyHref: "/apply-now?product=subscription-financing",
      infoHref: "/services/credit-cards",
    },
  ],
  "government-schemes": [
    {
      key: "pm-mudra",
      title: "PM Mudra Loan",
      description: "Collateral-free micro and small business loans.",
      applyHref: "/apply-now?product=pm-mudra-loan",
      infoHref: "/services/government-schemes",
      highlight: true,
      badge: "No Collateral",
    },
    {
      key: "mudra-shishu",
      title: "Mudra Shishu Loan",
      description: "Micro loans for early-stage small businesses under Mudra Shishu category.",
      applyHref: "/apply-now?product=mudra-shishu-loan",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "mudra-kishor",
      title: "Mudra Kishor Loan",
      description: "Working capital loans for growing micro enterprises under Mudra Kishor.",
      applyHref: "/apply-now?product=mudra-kishor-loan",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "mudra-tarun",
      title: "Mudra Tarun Loan",
      description: "Higher ticket Mudra loans for established micro enterprises under Mudra Tarun.",
      applyHref: "/apply-now?product=mudra-tarun-loan",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "stand-up-india",
      title: "Stand-Up India",
      description: "Support for SC/ST and women entrepreneurs.",
      applyHref: "/apply-now?product=stand-up-india",
      infoHref: "/services/government-schemes",
      badge: "Women & SC/ST",
    },
    {
      key: "pmegp-loan",
      title: "PMEGP Loan",
      description: "Subsidy-linked credit for micro enterprises under PMEGP.",
      applyHref: "/apply-now?product=pmegp-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "cgtmse",
      title: "CGTMSE Loan",
      description: "Collateral-free MSME loans with credit guarantee support.",
      applyHref: "/apply-now?product=cgtmse-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "jansamarth",
      title: "Jansamarth Scheme Loans",
      description: "Apply for government credit-linked schemes via the Jansamarth portal.",
      applyHref: "/apply-now?product=jansamarth-scheme-loans",
      infoHref: "/services/government-schemes",
      badge: "Portal",
    },
    {
      key: "pm-svanidhi",
      title: "PM SVANidhi Loan",
      description: "Micro credit for street vendors under PM SVANidhi.",
      applyHref: "/apply-now?product=pm-svanidhi-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "pm-awas-yojana",
      title: "PM Awas Yojana Loan",
      description: "Housing-linked support for eligible beneficiaries under PMAY.",
      applyHref: "/apply-now?product=pm-awas-yojana-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "psb-59",
      title: "PSB Loans in 59 Minutes",
      description: "Quick in-principle approval through the PSB platform.",
      applyHref: "/apply-now?product=psb-loans-59-minutes",
      infoHref: "/services/government-schemes",
      highlight: true,
      badge: "59 Min Approval",
    },
  ],
};

const LOAN_GROUP_BY_TITLE = Object.fromEntries(
  LOAN_SERVICES.map((group) => [group.title, group])
) as Record<string, ServiceGroup>;

const SALARIED_EMPLOYEE_LOAN_OFFERS: ServiceGroup = {
  title: "Loan Offers for Salaried Employees",
  items: [
    ...makeItems({
      prefix: "salaried",
      infoHref: "/services/loans",
      titles: [
        "Personal Loan",
        "New Home Loan",
        "Resale Home Loan",
        "Home Extension Loan",
        "Self-Construction Home Loan",
        "Open Plot / Plot Purchase Loan",
        "Plot + Construction Loan",
        "Home Renovation / Improvement Loan",
        "New Car Loan",
        "Used / Resale Car Loan",
        "Education Loan",
        "Medical Emergency Loan",
        "Wedding / Marriage Loan",
        "Travel / Holiday Loan",
        "Consumer Durable Loan",
        "Loan Against Property (LAP)",
        "Salary Advance / Short-Term Loan",
        "Balance Transfer Loan",
        "Top-Up Loan",
        "Balance Transfer & Top-Up Loan",
        "Gold Loan",
        "Credit Card Loan",
        "Overdraft Facility for Salaried Employees",
        "Personal Overdraft Loan",
        "Flexi Personal Loan",
        "Flexi Home Loan",
        "Festival Loan Offers",
        "Instant Cash Loan",
        "Small Ticket Loan",
        "Emergency Cash Loan",
        "Digital / Paperless Loan",
        "Refinance Loan",
        "Pre-Approved Loan",
        "NRI Home Loan (for Salaried NRIs)",
        "Pension Loan",
        "Government Employee Special Loan",
        "Women Salaried Loan",
        "Green Home / EV Vehicle Loan",
        "Solar Panel Installation Loan",
        "Salary Account–Linked Loan",
        "Corporate Salary Package Loan",
        "Joint Home Loan",
        "No-Collateral Personal Loan",
        "Quick Disbursal Loan",
        "Same-Day Approval Loan",
        "Online Instant Approval Loan",
        "Lifestyle Loan",
        "Tax-Saving Home Loan",
        "PMAY-Linked Home Loan (Eligible Salaried Employees)",
      ],
    }),
  ],
};

const BUSINESS_LOAN_SERVICES: ServiceGroup = {
  title: "Smart Loan & Funding Solutions for All Businesses",
  items: [
    {
      key: "business-audience",
      title: "Proprietorships, SMEs, Industrial Enterprises & Corporates",
      description: "Solutions tailored to different business structures and funding needs.",
      applyHref: "/apply-now?product=business-business-audience",
      infoHref: "/business-loan",
      highlight: true,
      badge: "Business",
    },
    {
      key: "business-working-capital-loan",
      title: "Working Capital Loan",
      description: "Short-term funding to manage day-to-day operations and cash flow gaps.",
      applyHref: "/apply-now?product=business-working-capital-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-cash-credit-cc-facility",
      title: "Cash Credit (CC) Facility",
      description: "Revolving cash credit limit for ongoing working capital needs.",
      applyHref: "/apply-now?product=business-cash-credit-cc-facility",
      infoHref: "/business-loan",
    },
    {
      key: "business-overdraft-od-facility",
      title: "Overdraft (OD) Facility",
      description: "Flexible overdraft limit with interest charged only on utilised amount.",
      applyHref: "/apply-now?product=business-overdraft-od-facility",
      infoHref: "/business-loan",
    },
    {
      key: "business-short-term-business-loan",
      title: "Short-Term Business Loan",
      description: "Quick funding for urgent needs, seasonal demand or short cycles.",
      applyHref: "/apply-now?product=business-short-term-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-msme-business-loan",
      title: "MSME Business Loan",
      description: "Financing for MSMEs to support growth, operations and expansion.",
      applyHref: "/apply-now?product=business-msme-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-sme-term-loan",
      title: "SME Term Loan",
      description: "Structured term loan for SMEs with fixed tenure and repayment plan.",
      applyHref: "/apply-now?product=business-sme-term-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-startup-business-loan",
      title: "Startup Business Loan",
      description: "Funding for early-stage businesses based on profile and cash flows.",
      applyHref: "/apply-now?product=business-startup-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-proprietorship-business-loan",
      title: "Proprietorship Business Loan",
      description: "Loans designed for sole proprietors with simplified documentation.",
      applyHref: "/apply-now?product=business-proprietorship-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-partnership-firm-loan",
      title: "Partnership Firm Loan",
      description: "Business finance for partnership firms aligned to turnover and banking.",
      applyHref: "/apply-now?product=business-partnership-firm-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-unsecured-business-loan",
      title: "Unsecured Business Loan",
      description: "Collateral-free funding based on income, turnover and credit profile.",
      applyHref: "/apply-now?product=business-unsecured-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-collateral-free-business-loan",
      title: "Collateral-Free Business Loan",
      description: "Business loans without collateral, subject to eligibility and policy.",
      applyHref: "/apply-now?product=business-collateral-free-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-loan-against-property-business-lap",
      title: "Loan Against Property (Business LAP)",
      description: "Leverage property value to raise higher business funds at better rates.",
      applyHref: "/apply-now?product=business-loan-against-property-business-lap",
      infoHref: "/business-loan",
    },
    {
      key: "business-machinery-equipment-loan",
      title: "Machinery / Equipment Loan",
      description: "Finance purchase or upgrade of machinery to expand production capacity.",
      applyHref: "/apply-now?product=business-machinery-equipment-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-commercial-vehicle-loan",
      title: "Commercial Vehicle Loan",
      description: "Funding for commercial vehicles to support transport and logistics needs.",
      applyHref: "/apply-now?product=business-commercial-vehicle-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-industrial-term-loan",
      title: "Industrial Term Loan",
      description: "Longer-tenure funding for industrial capex and large business requirements.",
      applyHref: "/apply-now?product=business-industrial-term-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-manufacturing-unit-loan",
      title: "Manufacturing Unit Loan",
      description: "Project/capex support for manufacturing setup, upgrade, or expansion.",
      applyHref: "/apply-now?product=business-manufacturing-unit-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-raw-material-procurement-loan",
      title: "Raw Material Procurement Loan",
      description: "Working capital support to procure inventory and raw materials on time.",
      applyHref: "/apply-now?product=business-raw-material-procurement-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-business-expansion-loan",
      title: "Business Expansion Loan",
      description: "Funding to expand operations, add branches, or scale business capacity.",
      applyHref: "/apply-now?product=business-business-expansion-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-capacity-expansion-loan",
      title: "Capacity Expansion Loan",
      description: "Finance to increase output capacity via capex, machinery or upgrades.",
      applyHref: "/apply-now?product=business-capacity-expansion-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-franchise-branch-expansion-loan",
      title: "Franchise / Branch Expansion Loan",
      description: "Funding to open new outlets, franchises or branches with planned rollout.",
      applyHref: "/apply-now?product=business-franchise-branch-expansion-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-trade-finance-loan",
      title: "Trade Finance Loan",
      description: "Finance to support purchase cycles, trade transactions and working capital.",
      applyHref: "/apply-now?product=business-trade-finance-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-invoice-bill-discounting",
      title: "Invoice / Bill Discounting",
      description: "Unlock cash tied in receivables by discounting invoices and bills.",
      applyHref: "/apply-now?product=business-invoice-bill-discounting",
      infoHref: "/business-loan",
    },
    {
      key: "business-import-finance-loan",
      title: "Import Finance Loan",
      description: "Working capital support for imports including LC/BG-linked finance.",
      applyHref: "/apply-now?product=business-import-finance-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-export-finance-loan",
      title: "Export Finance Loan",
      description: "Finance to support export orders, production and shipment cycles.",
      applyHref: "/apply-now?product=business-export-finance-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-corporate-term-loan",
      title: "Corporate Term Loan",
      description: "Term funding for corporates for capex, growth and structured needs.",
      applyHref: "/apply-now?product=business-corporate-term-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-project-finance",
      title: "Project Finance",
      description: "Structured funding for large projects with milestone-based assessment.",
      applyHref: "/apply-now?product=business-project-finance",
      infoHref: "/business-loan",
    },
    {
      key: "business-structured-corporate-finance",
      title: "Structured Corporate Finance",
      description: "Customised corporate funding solutions based on cashflows and structure.",
      applyHref: "/apply-now?product=business-structured-corporate-finance",
      infoHref: "/business-loan",
    },
    {
      key: "business-syndicated-loan",
      title: "Syndicated Loan",
      description: "Large-ticket funding arranged through multiple lenders for scale.",
      applyHref: "/apply-now?product=business-syndicated-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-bridge-finance-for-corporates",
      title: "Bridge Finance for Corporates",
      description: "Short-term bridge funding to meet immediate corporate requirements.",
      applyHref: "/apply-now?product=business-bridge-finance-for-corporates",
      infoHref: "/business-loan",
    },
    {
      key: "business-pre-approved-business-loan",
      title: "Pre-Approved Business Loan",
      description: "Faster processing offers for eligible profiles with minimal steps.",
      applyHref: "/apply-now?product=business-pre-approved-business-loan",
      infoHref: "/business-loan",
    },
    {
      key: "business-digital-paperless-business-loan",
      title: "Digital / Paperless Business Loan",
      description: "Online-first loan journey with quick document checks and tracking.",
      applyHref: "/apply-now?product=business-digital-paperless-business-loan",
      infoHref: "/business-loan",
    },
  ],
};

const PROFESSIONAL_LOAN_SERVICES: ServiceGroup = {
  title: "Smart Loan & Funding Solutions for All Professionals",
  items: [
    {
      key: "professional-audience",
      title: "Doctors, CAs, Architects, Engineers, Lawyers, Consultants, Self-Employed",
      description: "Funding options tailored for working professionals and self-employed profiles.",
      applyHref: "/apply-now?product=professional-professional-audience",
      infoHref: "/personal-loan",
      highlight: true,
      badge: "Professionals",
    },
    {
      key: "professional-professional-personal-loan",
      title: "Professional Personal Loan",
      description: "Unsecured personal loan options designed for professional income profiles.",
      applyHref: "/apply-now?product=professional-professional-personal-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-doctor-loan",
      title: "Doctor Loan",
      description: "Loans for doctors to support practice setup, equipment or working capital.",
      applyHref: "/apply-now?product=professional-doctor-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-chartered-accountant-ca-loan",
      title: "Chartered Accountant (CA) Loan",
      description: "Funding for CA professionals for office setup, expansion and cashflow needs.",
      applyHref: "/apply-now?product=professional-chartered-accountant-ca-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-architect-loan",
      title: "Architect Loan",
      description: "Finance for architects to manage projects, tools, office setup and growth.",
      applyHref: "/apply-now?product=professional-architect-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-engineer-loan",
      title: "Engineer Loan",
      description: "Loan options for engineers for business needs, equipment and working capital.",
      applyHref: "/apply-now?product=professional-engineer-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-lawyer-advocate-loan",
      title: "Lawyer / Advocate Loan",
      description: "Funding support for advocates to set up chambers, manage cases and cashflow.",
      applyHref: "/apply-now?product=professional-lawyer-advocate-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-consultant-loan",
      title: "Consultant Loan",
      description: "Unsecured funding for consultants to support growth, travel and operations.",
      applyHref: "/apply-now?product=professional-consultant-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-self-employed-professional-loan",
      title: "Self-Employed Professional Loan",
      description: "Loans for self-employed professionals based on cashflow and banking history.",
      applyHref: "/apply-now?product=professional-self-employed-professional-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-practice-setup-loan",
      title: "Practice Setup Loan",
      description: "Finance to start or upgrade your clinic/office/practice with planned spend.",
      applyHref: "/apply-now?product=professional-practice-setup-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-clinic-office-purchase-loan",
      title: "Clinic / Office Purchase Loan",
      description: "Funding for purchase of clinic or office premises with structured tenure.",
      applyHref: "/apply-now?product=professional-clinic-office-purchase-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-clinic-office-renovation-loan",
      title: "Clinic / Office Renovation Loan",
      description: "Renovation finance for interiors, upgrades and setup improvements.",
      applyHref: "/apply-now?product=professional-clinic-office-renovation-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-medical-equipment-loan",
      title: "Medical Equipment Loan",
      description: "Equipment financing for diagnostic/medical devices with repayment options.",
      applyHref: "/apply-now?product=professional-medical-equipment-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-office-equipment-loan",
      title: "Office Equipment Loan",
      description: "Finance office equipment purchases like computers, furniture and tools.",
      applyHref: "/apply-now?product=professional-office-equipment-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-working-capital-loan-for-professionals",
      title: "Working Capital Loan for Professionals",
      description: "Manage monthly cashflow, receivables and operating expenses smoothly.",
      applyHref: "/apply-now?product=professional-working-capital-loan-for-professionals",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-unsecured-professional-loan",
      title: "Unsecured Professional Loan",
      description: "Collateral-free loan based on profile, income and credit eligibility.",
      applyHref: "/apply-now?product=professional-unsecured-professional-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-loan-against-property-for-professionals",
      title: "Loan Against Property for Professionals",
      description: "Use property as collateral to access higher ticket funding at better terms.",
      applyHref: "/apply-now?product=professional-loan-against-property-for-professionals",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-overdraft-facility-for-professionals",
      title: "Overdraft Facility for Professionals",
      description: "Flexible overdraft for professionals with interest on utilised amount.",
      applyHref: "/apply-now?product=professional-overdraft-facility-for-professionals",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-balance-transfer-for-professional-loans",
      title: "Balance Transfer for Professional Loans",
      description: "Shift existing loan to better rates/terms and reduce monthly burden.",
      applyHref: "/apply-now?product=professional-balance-transfer-for-professional-loans",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-top-up-loan-for-professionals",
      title: "Top-Up Loan for Professionals",
      description: "Additional funding over an existing loan for expansion or urgent needs.",
      applyHref: "/apply-now?product=professional-top-up-loan-for-professionals",
      infoHref: "/personal-loan",
    },
    {
      key: "professional-tax-saving-loan-for-professionals",
      title: "Tax-Saving Loan for Professionals",
      description: "Loan planning aligned with eligible tax-saving benefits (where applicable).",
      applyHref: "/apply-now?product=professional-tax-saving-loan-for-professionals",
      infoHref: "/personal-loan",
    },
  ],
};

const GOVT_EMPLOYEE_LOAN_SERVICES: ServiceGroup = {
  title: "Smart Loan & Funding Solutions for Central & State Government Employees",
  items: [
    {
      key: "govt-employee-audience",
      title: "Civil Services, PSU Staff, Defence & Govt Employees",
      description: "Loan options designed for stable income profiles and salaried government employees.",
      applyHref: "/apply-now?product=govt-employee-govt-employee-audience",
      infoHref: "/personal-loan",
      highlight: true,
      badge: "Govt",
    },
    {
      key: "govt-employee-government-employee-personal-loan",
      title: "Government Employee Personal Loan",
      description: "Personal loan options tailored to government salary profiles and eligibility.",
      applyHref: "/apply-now?product=govt-employee-government-employee-personal-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-central-government-employee-loan",
      title: "Central Government Employee Loan",
      description: "Loans for central government staff with structured repayment and support.",
      applyHref: "/apply-now?product=govt-employee-central-government-employee-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-state-government-employee-loan",
      title: "State Government Employee Loan",
      description: "Funding options for state government employees based on salary eligibility.",
      applyHref: "/apply-now?product=govt-employee-state-government-employee-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-psu-employee-loan",
      title: "PSU Employee Loan",
      description: "Loans for PSU employees with quick processing and transparent terms.",
      applyHref: "/apply-now?product=govt-employee-psu-employee-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-defence-personnel-loan",
      title: "Defence Personnel Loan",
      description: "Loan solutions for defence personnel with profile-based eligibility support.",
      applyHref: "/apply-now?product=govt-employee-defence-personnel-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-salary-based-personal-loan",
      title: "Salary-Based Personal Loan",
      description: "Personal loans based on salary credits and banking conduct.",
      applyHref: "/apply-now?product=govt-employee-salary-based-personal-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-pre-approved-salary-loan",
      title: "Pre-Approved Salary Loan",
      description: "Fast-track offers for eligible salary accounts with minimal steps.",
      applyHref: "/apply-now?product=govt-employee-pre-approved-salary-loan",
      infoHref: "/personal-loan",
      badge: "Fast",
    },
    {
      key: "govt-employee-pension-loan",
      title: "Pension Loan",
      description: "Loans for pensioners with eligibility based on pension credits and profile.",
      applyHref: "/apply-now?product=govt-employee-pension-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-home-loan-for-government-employees",
      title: "Home Loan for Government Employees",
      description: "Home loan options with competitive terms for eligible government employees.",
      applyHref: "/apply-now?product=govt-employee-home-loan-for-government-employees",
      infoHref: "/home-property-loan",
    },
    {
      key: "govt-employee-car-loan-for-government-employees",
      title: "Car Loan for Government Employees",
      description: "Vehicle financing options aligned to salary profiles and repayment comfort.",
      applyHref: "/apply-now?product=govt-employee-car-loan-for-government-employees",
      infoHref: "/vehicle-loan",
    },
    {
      key: "govt-employee-education-loan-for-government-employees",
      title: "Education Loan for Government Employees",
      description: "Education funding support for higher studies with guided documentation.",
      applyHref: "/apply-now?product=govt-employee-education-loan-for-government-employees",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-loan-against-property-for-govt-employees",
      title: "Loan Against Property for Govt Employees",
      description: "Leverage property value to access higher ticket funding at better rates.",
      applyHref: "/apply-now?product=govt-employee-loan-against-property-for-govt-employees",
      infoHref: "/home-property-loan",
    },
    {
      key: "govt-employee-salary-overdraft-facility",
      title: "Salary Overdraft Facility",
      description: "Overdraft linked to salary account for flexible short-term liquidity.",
      applyHref: "/apply-now?product=govt-employee-salary-overdraft-facility",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-emergency-loan-for-government-employees",
      title: "Emergency Loan for Government Employees",
      description: "Quick funding for emergencies with simplified checks and support.",
      applyHref: "/apply-now?product=govt-employee-emergency-loan-for-government-employees",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-balance-transfer-for-salary-loans",
      title: "Balance Transfer for Salary Loans",
      description: "Move existing loan to better rates/terms and reduce EMI burden.",
      applyHref: "/apply-now?product=govt-employee-balance-transfer-for-salary-loans",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-top-up-loan-on-existing-loan",
      title: "Top-Up Loan on Existing Loan",
      description: "Additional funding over an existing loan for planned or urgent needs.",
      applyHref: "/apply-now?product=govt-employee-top-up-loan-on-existing-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "govt-employee-special-scheme-loan-for-govt-employees",
      title: "Special Scheme Loan for Govt Employees",
      description: "Special offers/structured products for eligible government employee profiles.",
      applyHref: "/apply-now?product=govt-employee-special-scheme-loan-for-govt-employees",
      infoHref: "/personal-loan",
    },
  ],
};

const GOVT_SCHEME_SERVICES: ServiceGroup = {
  title: "End-to-End Financing Support for Central & State Government Schemes",
  items: [
    {
      key: "govt-scheme-pmegp-loan",
      title: "PMEGP Loan",
      description: "Subsidy-linked credit support for eligible micro enterprises under PMEGP.",
      applyHref: "/apply-now?product=govt-scheme-pmegp-loan",
      infoHref: "/services/government-schemes",
      highlight: true,
      badge: "Subsidy",
    },
    {
      key: "govt-scheme-mudra-loan-shishu-kishor-tarun",
      title: "Mudra Loan (Shishu, Kishor, Tarun)",
      description: "Collateral-free micro & small business loans across Mudra categories.",
      applyHref: "/apply-now?product=govt-scheme-mudra-loan-shishu-kishor-tarun",
      infoHref: "/services/government-schemes",
      badge: "Mudra",
    },
    {
      key: "govt-scheme-stand-up-india-loan",
      title: "Stand-Up India Loan",
      description: "Support for women and SC/ST entrepreneurs to start greenfield enterprises.",
      applyHref: "/apply-now?product=govt-scheme-stand-up-india-loan",
      infoHref: "/services/government-schemes",
      badge: "Scheme",
    },
    {
      key: "govt-scheme-cgtmse-backed-business-loan",
      title: "CGTMSE-Backed Business Loan",
      description: "Collateral-free MSME credit backed by CGTMSE guarantee coverage.",
      applyHref: "/apply-now?product=govt-scheme-cgtmse-backed-business-loan",
      infoHref: "/services/government-schemes",
      badge: "No Collateral",
    },
    {
      key: "govt-scheme-pmay-home-loan-urban-and-rural",
      title: "PMAY Home Loan (Urban & Rural)",
      description: "Housing-linked support for eligible beneficiaries under PMAY schemes.",
      applyHref: "/apply-now?product=govt-scheme-pmay-home-loan-urban-and-rural",
      infoHref: "/services/government-schemes",
      badge: "Housing",
    },
    {
      key: "govt-scheme-credit-linked-subsidy-scheme-clss",
      title: "Credit-Linked Subsidy Scheme (CLSS)",
      description: "Interest subsidy benefits for eligible home loan borrowers under CLSS.",
      applyHref: "/apply-now?product=govt-scheme-credit-linked-subsidy-scheme-clss",
      infoHref: "/services/government-schemes",
    },
    {
      key: "govt-scheme-msme-government-scheme-loan",
      title: "MSME Government Scheme Loan",
      description: "Scheme-aligned MSME loans with guidance on eligibility and documentation.",
      applyHref: "/apply-now?product=govt-scheme-msme-government-scheme-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "govt-scheme-startup-india-scheme-loan",
      title: "Startup India Scheme Loan",
      description: "Funding support for eligible startups with scheme/process guidance.",
      applyHref: "/apply-now?product=govt-scheme-startup-india-scheme-loan",
      infoHref: "/services/government-schemes",
      badge: "Startup",
    },
    {
      key: "govt-scheme-women-entrepreneurship-scheme-loan",
      title: "Women Entrepreneurship Scheme Loan",
      description: "Loan assistance for women entrepreneurs under eligible programs.",
      applyHref: "/apply-now?product=govt-scheme-women-entrepreneurship-scheme-loan",
      infoHref: "/services/government-schemes",
      badge: "Women",
    },
    {
      key: "govt-scheme-sc-st-category-business-loan",
      title: "SC / ST Category Business Loan",
      description: "Business loan guidance for SC/ST category applicants under scheme norms.",
      applyHref: "/apply-now?product=govt-scheme-sc-st-category-business-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "govt-scheme-minority-community-business-loan",
      title: "Minority Community Business Loan",
      description: "Support for minority community applicants under eligible lending programs.",
      applyHref: "/apply-now?product=govt-scheme-minority-community-business-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "govt-scheme-agriculture-and-allied-activity-loan",
      title: "Agriculture & Allied Activity Loan",
      description: "Loans for farming and allied activities with scheme-led guidance.",
      applyHref: "/apply-now?product=govt-scheme-agriculture-and-allied-activity-loan",
      infoHref: "/services/government-schemes",
      badge: "Agri",
    },
    {
      key: "govt-scheme-skill-development-scheme-loan",
      title: "Skill Development Scheme Loan",
      description: "Funding support for skill development and training aligned programs.",
      applyHref: "/apply-now?product=govt-scheme-skill-development-scheme-loan",
      infoHref: "/services/government-schemes",
    },
    {
      key: "govt-scheme-state-government-subsidy-loan",
      title: "State Government Subsidy Loan",
      description: "State subsidy-linked financing support for eligible profiles and purposes.",
      applyHref: "/apply-now?product=govt-scheme-state-government-subsidy-loan",
      infoHref: "/services/government-schemes",
      badge: "Subsidy",
    },
    {
      key: "govt-scheme-central-government-sponsored-scheme-loan",
      title: "Central Government Sponsored Scheme Loan",
      description: "Assistance for central schemes with eligibility checks and documentation.",
      applyHref: "/apply-now?product=govt-scheme-central-government-sponsored-scheme-loan",
      infoHref: "/services/government-schemes",
      badge: "Scheme",
    },
  ],
};

const BUILDER_DEVELOPER_SERVICES: ServiceGroup = {
  title: "Smart Loan & Project Funding Solutions for Builders & Developers",
  items: [
    {
      key: "builder-builder-project-loan",
      title: "Builder Project Loan",
      description: "Project funding for builders with structured disbursal and milestone tracking.",
      applyHref: "/apply-now?product=builder-builder-project-loan",
      infoHref: "/business-loan",
      highlight: true,
      badge: "Project",
    },
    {
      key: "builder-real-estate-project-funding",
      title: "Real Estate Project Funding",
      description: "Funding solutions for real estate projects based on cashflows and approvals.",
      applyHref: "/apply-now?product=builder-real-estate-project-funding",
      infoHref: "/business-loan",
    },
    {
      key: "builder-construction-finance-loan",
      title: "Construction Finance Loan",
      description: "Construction finance with planned disbursal tied to project progress.",
      applyHref: "/apply-now?product=builder-construction-finance-loan",
      infoHref: "/business-loan",
    },
    {
      key: "builder-residential-project-funding",
      title: "Residential Project Funding",
      description: "Funding for residential developments to support construction and completion.",
      applyHref: "/apply-now?product=builder-residential-project-funding",
      infoHref: "/business-loan",
    },
    {
      key: "builder-commercial-project-funding",
      title: "Commercial Project Funding",
      description: "Finance for commercial projects aligned to leasing/sales and cashflow.",
      applyHref: "/apply-now?product=builder-commercial-project-funding",
      infoHref: "/business-loan",
    },
    {
      key: "builder-mixed-use-development-loan",
      title: "Mixed-Use Development Loan",
      description: "Funding for mixed-use projects combining residential and commercial assets.",
      applyHref: "/apply-now?product=builder-mixed-use-development-loan",
      infoHref: "/business-loan",
    },
    {
      key: "builder-land-purchase-loan",
      title: "Land Purchase Loan",
      description: "Land acquisition finance for project development and expansion plans.",
      applyHref: "/apply-now?product=builder-land-purchase-loan",
      infoHref: "/business-loan",
    },
    {
      key: "builder-plot-development-loan",
      title: "Plot Development Loan",
      description: "Funding for plot development, approvals, infrastructure and site readiness.",
      applyHref: "/apply-now?product=builder-plot-development-loan",
      infoHref: "/business-loan",
    },
    {
      key: "builder-construction-working-capital-loan",
      title: "Construction Working Capital Loan",
      description: "Working capital support for construction expenses and vendor payments.",
      applyHref: "/apply-now?product=builder-construction-working-capital-loan",
      infoHref: "/business-loan",
    },
    {
      key: "builder-inventory-funding-for-builders",
      title: "Inventory Funding for Builders",
      description: "Funding support to manage inventory cycles and raw material procurement.",
      applyHref: "/apply-now?product=builder-inventory-funding-for-builders",
      infoHref: "/business-loan",
    },
    {
      key: "builder-lease-rental-discounting-lrd",
      title: "Lease Rental Discounting (LRD)",
      description: "Raise funds against lease rentals from commercial properties.",
      applyHref: "/apply-now?product=builder-lease-rental-discounting-lrd",
      infoHref: "/business-loan",
      badge: "LRD",
    },
    {
      key: "builder-loan-against-property-for-builders",
      title: "Loan Against Property for Builders",
      description: "Use property as collateral to access higher ticket builder funding.",
      applyHref: "/apply-now?product=builder-loan-against-property-for-builders",
      infoHref: "/business-loan",
    },
    {
      key: "builder-bridge-loan-for-builders",
      title: "Bridge Loan for Builders",
      description: "Short-term bridge funding to manage project timelines and cash gaps.",
      applyHref: "/apply-now?product=builder-bridge-loan-for-builders",
      infoHref: "/business-loan",
      badge: "Bridge",
    },
    {
      key: "builder-project-expansion-funding",
      title: "Project Expansion Funding",
      description: "Funding to expand project scope, add phases or increase capacity.",
      applyHref: "/apply-now?product=builder-project-expansion-funding",
      infoHref: "/business-loan",
    },
    {
      key: "builder-redevelopment-project-loan",
      title: "Redevelopment Project Loan",
      description: "Finance solutions for redevelopment projects and project completion.",
      applyHref: "/apply-now?product=builder-redevelopment-project-loan",
      infoHref: "/business-loan",
    },
    {
      key: "builder-joint-development-project-funding",
      title: "Joint Development Project Funding",
      description: "Funding support for joint development arrangements and SPV structures.",
      applyHref: "/apply-now?product=builder-joint-development-project-funding",
      infoHref: "/business-loan",
    },
    {
      key: "builder-balance-transfer-for-builder-loans",
      title: "Balance Transfer for Builder Loans",
      description: "Transfer existing builder/project loan to better terms and reduce cost.",
      applyHref: "/apply-now?product=builder-balance-transfer-for-builder-loans",
      infoHref: "/business-loan",
    },
    {
      key: "builder-project-restructuring-takeover-loan",
      title: "Project Restructuring / Takeover Loan",
      description: "Restructure or takeover project finance to improve timelines and liquidity.",
      applyHref: "/apply-now?product=builder-project-restructuring-takeover-loan",
      infoHref: "/business-loan",
    },
  ],
};

const GROUPED_SERVICES: Partial<Record<HubCategoryKey, ServiceGroup[]>> = {
  "salaried-employees": [SALARIED_EMPLOYEE_LOAN_OFFERS],
  businesses: [BUSINESS_LOAN_SERVICES],
  professionals: [PROFESSIONAL_LOAN_SERVICES],
  "govt-employees": [GOVT_EMPLOYEE_LOAN_SERVICES],
  "government-schemes": [GOVT_SCHEME_SERVICES],
  "builders-developers": [BUILDER_DEVELOPER_SERVICES],
};

const TRUST_INDICATORS = [
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: TrendingUp, value: "₹500 Cr+", label: "Loans Disbursed" },
  { icon: Clock, value: "24 Hours", label: "Average Approval" },
  { icon: FileCheck, value: "99%", label: "Success Rate" },
];

export default function ServicesHubClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<HubCategoryKey>("salaried-employees");

  useEffect(() => {
    const requested = searchParams.get("category") as HubCategoryKey | null;
    if (requested && requested in SERVICES) {
      setActiveCategory(requested);
    }
  }, [searchParams]);

  const activeCards = useMemo(() => SERVICES[activeCategory], [activeCategory]);
  const activeMeta = CATEGORY_META.find((c) => c.key === activeCategory)!;
  const activeGroups = GROUPED_SERVICES[activeCategory];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F97415]/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gray-800/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" />
              Trusted Financial Partner
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Financial Goals,{" "}
              <span className="text-[#F97415]">Simplified</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-2xl">
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

      <PrivateInstitutionalHighlight />

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

          <div className="grid grid-cols-1 gap-3 mb-10 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_META.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.key === activeCategory;

              return (
                <Button
                  key={cat.key}
                  type="button"
                  size="lg"
                  variant="tab-inactive"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`h-auto w-full justify-start gap-3 py-4 transition-all duration-300 whitespace-normal text-left leading-snug text-base sm:text-lg ${
                    isActive
                      ? "scale-105 bg-[#F97415] text-white border border-[#F97415] hover:bg-[#F97415]/90"
                      : ""
                  }`}
                >
                  <Icon className="h-7 w-7" />
                  {cat.title}
                </Button>
              );
            })}
          </div>

          {activeGroups ? (
            <div className="space-y-10">
              {activeGroups.map((group, groupIndex) => (
                <div key={group.title} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground">{group.title}</h3>
                    <Link
                      href="/services/loans"
                      className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1"
                    >
                      View all
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.items.map((service, idx) => (
                      <Card
                        key={service.key}
                        className={`group relative overflow-hidden border-2 bg-gradient-to-br from-black via-neutral-900 to-neutral-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                          service.highlight ? "border-primary/30" : "border-transparent"
                        }`}
                        style={{ animationDelay: `${groupIndex * 120 + idx * 50}ms` }}
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
                          <CardTitle className="text-xl font-bold text-white pr-16">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300 mt-2 line-clamp-2">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-3">
                            <ApplyNowCTAButton
                              loanType={service.title}
                              loanTypeKey={service.applyHref.split("product=")[1]?.split("&")[0]}
                              categoryKey={activeCategory}
                              className="w-full group-hover:shadow-glow-cta"
                              size="lg"
                            >
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </ApplyNowCTAButton>
                            <Button asChild variant="outline" className="w-full text-black border-white/30 hover:bg-white/10 hover:text-white">
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
                    <CardDescription className="text-gray-300 mt-2 line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <ApplyNowCTAButton
                        loanType={service.title}
                        loanTypeKey={service.applyHref.split("product=")[1]?.split("&")[0]}
                        categoryKey={activeCategory}
                        className="w-full group-hover:shadow-glow-cta"
                        size="lg"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </ApplyNowCTAButton>
                      <Button asChild variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 hover:text-white">
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
