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
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

  const activeCards = useMemo(() => {
    if (activeCategory === "loans") {
      return LOAN_SERVICES.flatMap((g) => g.items);
    }

    if (activeCategory === "insurance") {
      return [
        {
          key: "insurance",
          title: "Insurance Solutions",
          description: "Life, health, motor, home and business insurance with expert guidance.",
          infoHref: "/services/insurance",
          highlight: true,
          badge: "Trusted",
        },
      ];
    }

    if (activeCategory === "credit-cards") {
      return [
        {
          key: "credit-cards",
          title: "Credit Cards & Credit Lines",
          description: "Smart credit products for personal and business spending.",
          infoHref: "/services/credit-cards",
          highlight: true,
          badge: "Rewards",
        },
      ];
    }

    return [
      {
        key: "government-schemes",
        title: "Government Schemes",
        description: "Explore subsidised and scheme-backed programs for MSMEs and entrepreneurs.",
        infoHref: "/services/government-schemes",
        highlight: true,
        badge: "No Collateral",
      },
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
                  <ApplyNowCTAButton size="xl" className="group">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </ApplyNowCTAButton>
                  <Button asChild variant="hero-outline" size="xl">
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
              <div className="flex items-center justify-end">
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">View All</Link>
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
                description: "Get approvals in as little as 24 hours with minimal documentation",
              },
              {
                icon: CheckCircle2,
                title: "Best Options",
                description: "We guide you through eligibility, documentation, and next steps",
              },
              {
                icon: Shield,
                title: "100% Secure",
                description: "Your data is protected and never shared without consent",
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
