"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Banknote, Building2, CreditCard, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HubCategoryKey = "loans" | "insurance" | "credit-cards" | "government-schemes";

type ServiceCardItem = {
  key: string;
  title: string;
  description: string;
  applyHref: string;
  infoHref: string;
};

const CATEGORY_META: Array<{
  key: HubCategoryKey;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: "loans", title: "Loans", icon: Banknote },
  { key: "insurance", title: "Insurance", icon: Shield },
  { key: "credit-cards", title: "Credits & Cards", icon: CreditCard },
  { key: "government-schemes", title: "Government Schemes", icon: Building2 },
];

const SERVICES: Record<HubCategoryKey, ServiceCardItem[]> = {
  loans: [
    {
      key: "msme-sme-loan",
      title: "MSME / SME Loan",
      description:
        "Funding for expansion, inventory and day-to-day operations with flexible repayment options.",
      applyHref: "/register?service=msme-sme-loan",
      infoHref: "/business-loan",
    },
    {
      key: "working-capital",
      title: "Working Capital",
      description:
        "Short-term liquidity to manage cash flow, vendor payments and seasonal demand spikes.",
      applyHref: "/register?service=working-capital",
      infoHref: "/business-loan",
    },
    {
      key: "overdraft-cc",
      title: "Overdraft / Cash Credit",
      description:
        "A flexible limit for withdrawals as needed — interest is charged only on utilization.",
      applyHref: "/register?service=overdraft-cash-credit",
      infoHref: "/business-loan",
    },
    {
      key: "invoice-discounting",
      title: "Invoice Discounting",
      description:
        "Unlock funds stuck in receivables and keep operations running without payment delays.",
      applyHref: "/register?service=invoice-discounting",
      infoHref: "/business-loan",
    },
    {
      key: "machinery-loan",
      title: "Machinery Loan",
      description:
        "Finance equipment purchases to improve capacity, productivity and operational efficiency.",
      applyHref: "/register?service=machinery-loan",
      infoHref: "/business-loan",
    },
    {
      key: "personal-loan",
      title: "Personal Loan",
      description:
        "Multipurpose unsecured funding for planned needs or urgent expenses with quick approvals.",
      applyHref: "/register?service=personal-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "instant-loan",
      title: "Instant Loan",
      description:
        "Fast-disbursal credit for emergencies, bills and last-minute requirements.",
      applyHref: "/register?service=instant-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "education-loan",
      title: "Education Loan",
      description:
        "Support higher education costs — tuition, living expenses and course-related fees.",
      applyHref: "/register?service=education-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "medical-loan",
      title: "Medical Loan",
      description:
        "Finance planned procedures or medical emergencies with structured repayment.",
      applyHref: "/register?service=medical-loan",
      infoHref: "/personal-loan",
    },
    {
      key: "home-loan",
      title: "Home Loan",
      description:
        "Buy a home with competitive rates, transparent terms and end-to-end guidance.",
      applyHref: "/register?service=home-loan",
      infoHref: "/home-property-loan",
    },
    {
      key: "loan-against-property",
      title: "Loan Against Property",
      description:
        "Leverage property value to raise funds for business, education or major expenses.",
      applyHref: "/register?service=loan-against-property",
      infoHref: "/home-property-loan",
    },
    {
      key: "plot-construction-loan",
      title: "Plot / Construction Loan",
      description:
        "Finance land purchase and construction with stage-wise disbursal options.",
      applyHref: "/register?service=plot-construction-loan",
      infoHref: "/home-property-loan",
    },
    {
      key: "car-loan",
      title: "Car Loan",
      description:
        "Finance a new or used car with flexible tenures and fast processing.",
      applyHref: "/register?service=car-loan",
      infoHref: "/vehicle-loan",
    },
    {
      key: "two-wheeler-loan",
      title: "Two-Wheeler Loan",
      description:
        "Affordable financing for bikes and scooters with minimal documentation.",
      applyHref: "/register?service=two-wheeler-loan",
      infoHref: "/vehicle-loan",
    },
    {
      key: "commercial-vehicle-loan",
      title: "Commercial Vehicle Loan",
      description:
        "Fund trucks and commercial fleets to support logistics and business operations.",
      applyHref: "/register?service=commercial-vehicle-loan",
      infoHref: "/vehicle-loan",
    },
    {
      key: "ev-loan",
      title: "EV Loan",
      description:
        "Finance electric vehicles with supportive terms and green mobility benefits.",
      applyHref: "/register?service=ev-loan",
      infoHref: "/vehicle-loan",
    },
    {
      key: "gold-loan",
      title: "Gold Loan",
      description:
        "Quick secured loan against gold with transparent valuation and fast disbursal.",
      applyHref: "/register?service=gold-loan",
      infoHref: "/gold-asset-loan",
    },
    {
      key: "loan-against-securities",
      title: "Loan Against Securities",
      description:
        "Borrow against investments like shares and mutual funds without selling holdings.",
      applyHref: "/register?service=loan-against-securities",
      infoHref: "/gold-asset-loan",
    },
  ],
  insurance: [
    {
      key: "life-insurance",
      title: "Life Insurance",
      description: "Long-term protection plans with guidance to choose the right cover.",
      applyHref: "/contact?service=life-insurance",
      infoHref: "/services/insurance",
    },
    {
      key: "health-insurance",
      title: "Health Insurance",
      description: "Coverage for hospitalisation and treatments with plan comparisons.",
      applyHref: "/contact?service=health-insurance",
      infoHref: "/services/insurance",
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
    },
    {
      key: "bnpl",
      title: "Buy Now Pay Later (BNPL)",
      description: "Split purchases into smaller scheduled payments.",
      applyHref: "/register?service=bnpl",
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
    },
    {
      key: "stand-up-india",
      title: "Stand-Up India",
      description: "Support for SC/ST and women entrepreneurs.",
      applyHref: "/register?service=stand-up-india",
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
      key: "psb-59",
      title: "PSB Loans in 59 Minutes",
      description: "Quick in-principle approval through the PSB platform.",
      applyHref: "/register?service=psb-loans-59-minutes",
      infoHref: "/services/government-schemes",
    },
  ],
};

export default function ServicesHubClient() {
  const [activeCategory, setActiveCategory] = useState<HubCategoryKey>("loans");

  const activeCards = useMemo(() => SERVICES[activeCategory], [activeCategory]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {CATEGORY_META.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.key === activeCategory;

          return (
            <Button
              key={cat.key}
              type="button"
              size="sm"
              variant={isActive ? "default" : "secondary"}
              onClick={() => setActiveCategory(cat.key)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {cat.title}
            </Button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {activeCards.map((service) => (
          <Card key={service.key} className="border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="mt-1">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={service.applyHref}>Apply</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={service.infoHref}>Information</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
