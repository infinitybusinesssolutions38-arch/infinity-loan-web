"use client";

import React from "react";
import { BriefcaseBusiness, TrendingUp } from "lucide-react";

export default function PrivateInstitutionalHighlight() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#F97415]/20 bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-6 sm:p-10 shadow-2xl">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#F97415]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#F97415]/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                  <BriefcaseBusiness className="h-4 w-4 text-[#F97415]" />
                  Private & Institutional Lending Services
                </p>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Structured private lending for complex capital requirements
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  Comprehensive secured and unsecured private lending solutions designed for businesses with diverse and complex capital requirements. We facilitate lending through private lenders, Venture Capital (VC) networks, strategic investors, and HNI & UHNI channels, supported by structured deal frameworks and strong governance standards.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  Our solutions include institutional, professional, and private lender-led lending, with customized lending structures developed through detailed eligibility assessment, credit evaluation, and due diligence. We support growth capital, expansion lending, and strategic lending requirements, aligned with long-term business objectives and sustainability.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  Private lending solutions for small and large businesses, SMEs, corporates, factory owners, and industrialists, subject to profile evaluation and due diligence.
                </p>
              </div>

              <div className="w-full max-w-xl lg:max-w-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97415]/15">
                      <TrendingUp className="h-5 w-5 text-[#F97415]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Lending Ticket Size</p>
                      <p className="text-xs text-gray-300">Subject to eligibility & due diligence</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-black/30 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">Range</p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                      INR 10 Lakhs to INR 1,000 Crores
                    </p>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-gray-300">
                    Based on borrower profile strength, legal & financial documentation, credit history, repayment track record, and overall risk assessment.
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Talk to an Expert
                    </a>
                    <a
                      href="/services?category=businesses"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Explore Business Services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
