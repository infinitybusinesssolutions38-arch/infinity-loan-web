"use client";

import React, { useState } from "react";
import { BriefcaseBusiness, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import BusinessLoanModal from "@/components/loans/BusinessLoanModal";

export default function PrivateInstitutionalHighlight() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const closeApply = () => {
    setIsApplyOpen(false);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">

        <div className="relative overflow-hidden rounded-3xl border border-[#0099D8]/20 bg-gradient-to-br from-white via-slate-50 to-gray-50 p-6 shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#0099D8]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#0099D8]/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
                  <BriefcaseBusiness className="h-4 w-4 text-[#0099D8]" />
                  Private & Institutional Lending Services
                </p>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  🏦 Structured Private Lending for Complex Capital Requirements
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                  <p>
                    💼 Comprehensive secured and unsecured private lending solutions designed for businesses with diverse and complex capital needs.
                    <br />
                    We facilitate lending through Private Lenders, Venture Capital (VC) Networks, Strategic Investors, and HNI & UHNI channels, supported by structured deal frameworks and strong governance standards.
                  </p>

                  <p className="font-semibold text-gray-900">🔍 Our Lending Capabilities</p>
                  <div className="space-y-1">
                    <p>🏛️ Institutional & Professional Lending</p>
                    <p>🤝 Private Lender–Led Funding Structures</p>
                    <p>🧩 Customized Deal Structuring based on detailed eligibility assessment</p>
                  </div>

                  {!isReadMoreOpen && (
                    <button
                      type="button"
                      onClick={() => setIsReadMoreOpen(true)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0099D8] px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Read more
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  )}

                  {isReadMoreOpen && (
                    <>
                      <p className="mt-2">All lending structures are developed through:</p>
                      <div className="space-y-1">
                        <p>✔️ Credit Evaluation</p>
                        <p>✔️ Due Diligence</p>
                        <p>✔️ Risk & Compliance Review</p>
                      </div>

                      <p className="font-semibold text-gray-900">🚀 Capital Solutions We Support</p>
                      <div className="space-y-1">
                        <p>📈 Growth Capital</p>
                        <p>🏗️ Expansion & Scale-Up Lending</p>
                        <p>🎯 Strategic & Special Situation Funding</p>
                      </div>

                      <p>
                        All solutions are aligned with long-term business objectives and sustainable growth.
                      </p>

                      <p className="font-semibold text-gray-900">🏭 Who We Serve</p>
                      <div className="space-y-1">
                        <p>🏢 Small & Large Businesses</p>
                        <p>🏭 SMEs & Corporates</p>
                        <p>🏗️ Factory Owners & Industrialists</p>
                      </div>

                      <p className="text-gray-800">📌 All lending solutions are subject to profile evaluation and due diligence.</p>

                      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-gray-800 font-semibold">💡 Optional Short Version (for cards / sections)</p>
                        <p className="mt-2">🔒 Structured Private Lending</p>
                        <p className="mt-2 text-gray-900/70">
                          Tailored secured and unsecured funding solutions for businesses with complex capital requirements—powered by private lenders, strategic investors, and strong governance.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsReadMoreOpen(false)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                      >
                        Show less
                        <ChevronUp className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full max-w-xl lg:max-w-sm">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0099D8]/15">
                      <TrendingUp className="h-5 w-5 text-[#0099D8]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Lending Ticket Size</p>
                      <p className="text-xs text-gray-600">Subject to eligibility & due diligence</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-gray-100 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">Range</p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
                      INR 10 Lakhs to INR 1,000 Crores
                    </p>
                  </div>

                  <p className="mt-4 text-md font-bold leading-relaxed text-gray-600">
                    Based on borrower profile strength, legal & financial documentation, credit history, repayment track record, and overall risk assessment.
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Talk to an Expert
                    </a>
                    <a
                      href="/services?category=businesses"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Explore Our Loan  Services
                    </a>
                    <ApplyNowCTAButton 
                      loanType="Private & Institutional Lending" 
                      redirectToUnifiedForm={true}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsApplyOpen(true);
                      }}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Apply Now
                    </ApplyNowCTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BusinessLoanModal isOpen={isApplyOpen} onClose={closeApply} />
    </section>
  );
}