"use client";

import React, { useState } from "react";
import { 
  BadgeAlert, 
  Shield, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileQuestion,
  Sparkles,
  FileText,
  Building2,
  Users,
  TrendingDown,
  Zap,
  Search,
  Star,
  MessageSquare,
  Flame,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";

import BusinessLoanModal from "@/components/loans/BusinessLoanModal";

export default function PoorCibilHighlight() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

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
                  <BadgeAlert className="h-4 w-4 text-[#0099D8]" />
                  Our Strength – Genuine Solutions for Poor CIBIL Profiles
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <FileQuestion className="h-6 w-6 text-[#0099D8]" />
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    What type of cases do we consider?
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                  We consider loan applications with poor CIBIL scores, EMI bounces, and past credit issues, only when there is a genuine and valid reason.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Cases we accept:
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Low / Poor CIBIL Score</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">EMI Bounces or Late Payments</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Settled or Closed Loan Accounts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Credit issues due to COVID-19 impact</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Business loss followed by income stability</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Medical or family emergencies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Temporary financial setbacks (currently resolved)</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-green-500/30 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-semibold text-green-800">
                      Important: We do not accept cases involving fraud, fake documents, or intentional defaults.
                    </p>
                  </div>
                </div>

                {!isExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0099D8] px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                  >
                    Read More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {isExpanded && (
                  <>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Core Strength
                  </h3>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <TrendingUp className="h-5 w-5 text-[#0099D8] mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed text-gray-700 sm:text-base font-semibold">
                    We evaluate repayment capability, not just the CIBIL score
                  </p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                  Each profile is assessed based on:
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-sm text-gray-700">• Current income stability</p>
                  <p className="text-sm text-gray-700">• Bank statement cash flow</p>
                  <p className="text-sm text-gray-700">• Available security (if any)</p>
                  <p className="text-sm text-gray-700">• Genuine reason explanation</p>
                  <p className="text-sm text-gray-700 sm:col-span-2">• Future repayment capacity</p>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <FileText className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Genuine Reason is Mandatory
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                  To process any poor CIBIL case, a clear and genuine explanation is required, such as:
                </p>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-700">• Medical emergency</p>
                  <p className="text-sm text-gray-700">• COVID-related income loss</p>
                  <p className="text-sm text-gray-700">• Temporary business slowdown</p>
                  <p className="text-sm text-gray-700">• Job change or salary delay</p>
                  <p className="text-sm text-gray-700">• Family emergency</p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-green-800 font-semibold">
                  Applications without a genuine reason are not processed.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Building2 className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Available Loan Solutions
                  </h3>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0099D8]/20 text-[#0099D8] font-bold">1</div>
                      <p className="text-base font-bold text-gray-900">Secured Loan Options</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-700">• Loan Against Property</p>
                      <p className="text-sm text-gray-700">• Gold Loan</p>
                      <p className="text-sm text-gray-700">• Loan Against Fixed Deposit / Insurance</p>
                      <p className="text-sm text-green-300 font-semibold mt-2">✔️ Higher approval chances even with poor CIBIL</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0099D8]/20 text-[#0099D8] font-bold">2</div>
                      <p className="text-base font-bold text-gray-900">Co-Applicant / Guarantor Based Loans</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-700">• Family member with good CIBIL score</p>
                      <p className="text-sm text-gray-700">• Combined income strength</p>
                      <p className="text-sm text-green-300 font-semibold mt-2">✔️ Reduced risk for lenders</p>
                      <p className="text-sm text-green-300 font-semibold">✔️ Improved approval possibility</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0099D8]/20 text-[#0099D8] font-bold">3</div>
                      <p className="text-base font-bold text-gray-900">Step-by-Step Loan Strategy</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-700">• Start with a small loan amount</p>
                      <p className="text-sm text-gray-700">• Maintain regular EMIs for 6–9 months</p>
                      <p className="text-sm text-gray-700">• Become eligible for higher loan amounts or top-ups</p>
                      <p className="text-sm text-green-300 font-semibold mt-2">✔️ Helps rebuild credit profile over time</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Search className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Process (Transparent & Legal)
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-gray-700">Profile assessment (CIBIL & income)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-gray-700">Verification of genuine reason</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-gray-700">Recommendation of the most suitable solution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <p className="text-sm text-gray-700">Proper documentation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                    <p className="text-sm text-gray-700">Transparent lender-based approval process</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">No fake documentation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">No false promises</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">No approval guarantees</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <MessageSquare className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Clear Message for Clients
                  </h3>
                </div>

                <div className="mt-3 rounded-xl border border-[#0099D8]/30 bg-[#0099D8]/10 p-4">
                  <p className="text-sm leading-relaxed text-gray-800 font-semibold">
                    "If your CIBIL profile is weak but your current income is stable and your intent to repay is genuine, we help you find the most suitable and legal loan solution."
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Star className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Why Choose Us?
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Honest and ethical guidance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Risk-based lending solutions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Client-focused approach</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Long-term relationship building</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Complete transparency</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </button>
                  </>
                )}
              </div>

              <div className="w-full max-w-xl lg:max-w-sm lg:sticky lg:top-6">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0099D8]/15">
                      <Shield className="h-5 w-5 text-[#0099D8]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Important Disclaimer</p>
                      <p className="text-xs text-gray-600">Please read carefully</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-gray-100 px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">Approval Notice</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      Loan approval depends entirely on the lender's policies and the applicant's profile strength. We assist only in identifying the best possible genuine options—approval is not guaranteed.
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#0099D8]/30 bg-[#0099D8]/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#0099D8]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#0099D8]">Brand Power Line</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-gray-900">
                      "We don't judge your past credit score. We evaluate your present strength."
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Talk to an Expert
                    </a>
                    <a
                      href="/services?category=poor-cibil"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Explore Our Loan Services
                    </a>
                    <ApplyNowCTAButton 
                      loanType="Poor CIBIL Support" 
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