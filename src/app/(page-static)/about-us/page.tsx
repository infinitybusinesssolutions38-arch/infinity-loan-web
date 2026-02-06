import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/80 py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Home
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur">
                <Sparkles className="mr-1 h-3 w-3" />
                Infinity Loans &amp; Business Solutions
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
                About Us
              </h1>
              <p className="max-w-xl text-primary-foreground/80 sm:text-lg">
                Infinity Loans &amp; Business Solutions is a trusted financial distribution and loan advisory firm dedicated to delivering transparent, reliable, and result-driven funding solutions across India.
              </p>
              <p className="max-w-xl text-primary-foreground/80 sm:text-lg">
                We help individuals, professionals, entrepreneurs, and businesses access the right finance through our strong lending network and expert advisory support. Our approach focuses on simplifying the borrowing process while enabling long-term financial stability and growth for our clients.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="cta" size="xl" className="group">
                  <Link href="/contact">Talk to an expert</Link>
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-primary-foreground/10 bg-card/10 backdrop-blur-sm p-6 shadow-xl sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-card/80 backdrop-blur p-4 border border-primary-foreground/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">Network</p>
                  <p className="mt-1 text-base font-bold text-primary-foreground">100+ Banks</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">Leading banking partners across India</p>
                </div>
                <div className="rounded-2xl bg-card/80 backdrop-blur p-4 border border-primary-foreground/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">Partners</p>
                  <p className="mt-1 text-base font-bold text-primary-foreground">100+ NBFCs</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">Financial institutions &amp; lenders</p>
                </div>
                <div className="rounded-2xl bg-card/80 backdrop-blur p-4 border border-primary-foreground/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">Integrations</p>
                  <p className="mt-1 text-base font-bold text-primary-foreground">Fintech platforms</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">Multiple lending platform integrations</p>
                </div>
                <div className="rounded-2xl bg-card/80 backdrop-blur p-4 border border-primary-foreground/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">Support</p>
                  <p className="mt-1 text-base font-bold text-primary-foreground">Expert guidance</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">Dedicated relationship managers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
            <h2 className="text-xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-3 text-muted-foreground sm:text-base">
              To be recognized as one of India's most trusted and customer-centric financial distribution companies by delivering ethical, transparent, and customized loan solutions that create lasting value.
            </p>
            
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm font-semibold text-foreground">Building trust through transparency and excellence</p>
            </div>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
            <h2 className="text-xl font-bold text-foreground">Our Mission</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Deliver fast, simple, and transparent loan processing
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Understand every client's financial profile to offer tailored funding solutions
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Provide competitive interest rates and faster approvals through strong lender partnerships
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Maintain the highest standards of professionalism, ethics, and regulatory compliance
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Build long-term relationships based on trust, reliability, and service excellence
              </li>
            </ul>
          </article>
        </div>
        </div>
      </section>

      {/* Lending Network Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">Our Strong Lending Network</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Infinity Loans &amp; Business Solutions operates through a diversified and powerful lending ecosystem, enabling higher approval success and flexible funding options.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">100+ Leading Banks</h3>
              <p className="mt-2 text-sm text-muted-foreground">Partnerships with top banking institutions across India</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">100+ NBFCs &amp; Financial Institutions</h3>
              <p className="mt-2 text-sm text-muted-foreground">Extensive network of non-banking financial companies</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">Fintech Platform Integrations</h3>
              <p className="mt-2 text-sm text-muted-foreground">Multiple lending platform integrations for faster processing</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">Verified Private Lenders</h3>
              <p className="mt-2 text-sm text-muted-foreground">Network of trusted and verified private lending sources</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta/10 text-cta">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">Dedicated Relationship Managers</h3>
              <p className="mt-2 text-sm text-muted-foreground">Expert loan advisors and support throughout your journey</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-gradient-to-r from-secondary/60 to-secondary p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Network advantage:</span> This extensive network allows us to offer competitive interest structures, faster disbursements, and customized loan solutions aligned with each client's needs.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Loan Solutions Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">Our Expertise – Comprehensive Loan Solutions</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Our experienced team provides end-to-end consultation and processing support across a wide range of loan products.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Vehicle &amp; Transport Loans</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      New &amp; Used Car Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Commercial Vehicle &amp; Fleet Financing
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Two-Wheeler Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Luxury Vehicle Loans
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-card p-5 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">SME &amp; Business Loans</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      SME &amp; MSME Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      Business Expansion &amp; Working Capital Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      Startup Funding
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      Trade &amp; Inventory Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      Overdraft &amp; Cash Credit Facilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Industrial &amp; Project Finance</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Industrial Loans &amp; Project Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Machinery &amp; Equipment Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Infrastructure &amp; Factory Expansion Funding
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Warehouse &amp; Logistics Financing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Property &amp; Mortgage Loans</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Home Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Loan Against Property (LAP)
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Commercial Property Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Construction Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Balance Transfer &amp; Top-Up Loans
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 lg:col-span-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                  <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Personal &amp; Private Funding Solutions</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Personal &amp; Professional Loans
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Emergency Funding
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Private Funding Solutions
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Debt Consolidation Loans
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Services & Benefits Section */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
              <h2 className="text-xl font-bold text-foreground">End-to-End Loan Assistance</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                We manage the complete loan lifecycle to ensure a smooth and hassle-free experience for our clients.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Financial Profile Evaluation", icon: "📊" },
                  { title: "Documentation & Compliance Support", icon: "📄" },
                  { title: "Lender Matching & Expert Consultation", icon: "🤝" },
                  { title: "Approval & Processing Assistance", icon: "✅" },
                  { title: "Loan Disbursement Support", icon: "💰" },
                  { title: "Post-Disbursement Customer Service", icon: "🎯" },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-card/60 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-lg">
              <h2 className="text-base font-bold text-foreground">Why Choose Us</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Experienced advisory team
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Strong network
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Fast processing
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Transparent practices
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Customized solutions
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  End-to-end support
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  High approval rate
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Customer-centric approach
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-6 shadow-lg">
              <h2 className="text-base font-bold text-foreground">Ready to get started?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect with our expert team and discover the right loan solution for your needs.
              </p>
              <div className="mt-4">
                <Button asChild variant="cta" className="w-full">
                  <Link href="/contact">Talk to an expert</Link>
                </Button>
              </div>
            </section>
          </aside>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Let's Build Your Financial Future with Confidence</h2>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  At Infinity Loans &amp; Business Solutions, every loan is handled with expertise, integrity, and commitment—ensuring you receive the right financial solution at the right time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="cta">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">Disclaimer: This page is for informational purposes.</p>
        </div>
      </section>
    </main>
  );
}