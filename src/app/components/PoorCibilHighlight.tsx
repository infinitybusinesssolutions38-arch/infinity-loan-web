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
import { hl } from "./highlight-ui";

export default function PoorCibilHighlight() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const closeApply = () => {
    setIsApplyOpen(false);
  };

  return (
    <article className={hl.card}>
            <div className={hl.layout}>
              <div className={hl.content}>
                <p className={hl.badge}>
                  <span className={hl.badgeIcon}>
                    <BadgeAlert className="h-4 w-4 text-[#00AEEF]" />
                  </span>
                  Our Strength – Genuine Solutions for Poor CIBIL Profiles
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <FileQuestion className="h-6 w-6 text-[#00AEEF]" />
                  <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
                    What type of cases do we consider?
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#666666] sm:text-base">
                  We consider loan applications with poor CIBIL scores, EMI bounces, and past credit issues, only when there is a genuine and valid reason.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Cases we accept:
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Low / Poor CIBIL Score</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">EMI Bounces or Late Payments</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Settled or Closed Loan Accounts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Credit issues due to COVID-19 impact</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Business loss followed by income stability</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Medical or family emergencies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Temporary financial setbacks (currently resolved)</p>
                  </div>
                </div>

                <div className={`mt-4 ${hl.alertBox}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-semibold text-red-700">
                      Important: We do not accept cases involving fraud, fake documents, or intentional defaults.
                    </p>
                  </div>
                </div>

                {!isExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className={`mt-6 ${hl.btnPrimary}`}
                  >
                    Read More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {isExpanded && (
                  <>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Our Core Strength
                  </h3>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <TrendingUp className="h-5 w-5 text-[#00AEEF] mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed text-[#666666] sm:text-base font-semibold">
                    We evaluate repayment capability, not just the CIBIL score
                  </p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#666666] sm:text-base">
                  Each profile is assessed based on:
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-sm text-[#666666]">• Current income stability</p>
                  <p className="text-sm text-[#666666]">• Bank statement cash flow</p>
                  <p className="text-sm text-[#666666]">• Available security (if any)</p>
                  <p className="text-sm text-[#666666]">• Genuine reason explanation</p>
                  <p className="text-sm text-[#666666] sm:col-span-2">• Future repayment capacity</p>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <FileText className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Genuine Reason is Mandatory
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#666666] sm:text-base">
                  To process any poor CIBIL case, a clear and genuine explanation is required, such as:
                </p>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-[#666666]">• Medical emergency</p>
                  <p className="text-sm text-[#666666]">• COVID-related income loss</p>
                  <p className="text-sm text-[#666666]">• Temporary business slowdown</p>
                  <p className="text-sm text-[#666666]">• Job change or salary delay</p>
                  <p className="text-sm text-[#666666]">• Family emergency</p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-red-600 font-semibold">
                  Applications without a genuine reason are not processed.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Building2 className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Available Loan Solutions
                  </h3>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] font-bold">1</div>
                      <p className="text-base font-bold text-[#1A1A1A]">Secured Loan Options</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-[#666666]">• Loan Against Property</p>
                      <p className="text-sm text-[#666666]">• Gold Loan</p>
                      <p className="text-sm text-[#666666]">• Loan Against Fixed Deposit / Insurance</p>
                      <p className="text-sm text-green-700 font-semibold mt-2">✔️ Higher approval chances even with poor CIBIL</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] font-bold">2</div>
                      <p className="text-base font-bold text-[#1A1A1A]">Co-Applicant / Guarantor Based Loans</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-[#666666]">• Family member with good CIBIL score</p>
                      <p className="text-sm text-[#666666]">• Combined income strength</p>
                      <p className="text-sm text-green-700 font-semibold mt-2">✔️ Reduced risk for lenders</p>
                      <p className="text-sm text-green-700 font-semibold">✔️ Improved approval possibility</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] font-bold">3</div>
                      <p className="text-base font-bold text-[#1A1A1A]">Step-by-Step Loan Strategy</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-[#666666]">• Start with a small loan amount</p>
                      <p className="text-sm text-[#666666]">• Maintain regular EMIs for 6–9 months</p>
                      <p className="text-sm text-[#666666]">• Become eligible for higher loan amounts or top-ups</p>
                      <p className="text-sm text-green-700 font-semibold mt-2">✔️ Helps rebuild credit profile over time</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Search className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Our Process (Transparent & Legal)
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-[#666666]">Profile assessment (CIBIL & income)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-[#666666]">Verification of genuine reason</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-[#666666]">Recommendation of the most suitable solution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <p className="text-sm text-[#666666]">Proper documentation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                    <p className="text-sm text-[#666666]">Transparent lender-based approval process</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">No fake documentation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">No false promises</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">No approval guarantees</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <MessageSquare className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Clear Message for Clients
                  </h3>
                </div>

                <div className={`mt-3 ${hl.accentBox}`}>
                  <p className="text-sm leading-relaxed text-[#1A1A1A] font-semibold">
                    "If your CIBIL profile is weak but your current income is stable and your intent to repay is genuine, we help you find the most suitable and legal loan solution."
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Star className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">
                    Why Choose Us?
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Honest and ethical guidance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Risk-based lending solutions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Client-focused approach</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Long-term relationship building</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Complete transparency</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className={`mt-6 ${hl.btnSecondary}`}
                >
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </button>
                  </>
                )}
              </div>

              <div className="w-full max-w-xl lg:max-w-sm">
                <div className={hl.sidebar}>
                  <div className="flex items-center gap-3">
                    <div className={hl.iconBox}>
                      <Shield className="h-5 w-5 text-[#00AEEF]" />
                    </div>
                    <div>
                      <p className={hl.sidebarTitle}>Important Disclaimer</p>
                      <p className={hl.sidebarSub}>Please read carefully</p>
                    </div>
                  </div>

                  <div className={hl.innerBox}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <p className={hl.innerLabel}>Approval Notice</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                      Loan approval depends entirely on the lender's policies and the applicant's profile strength. We assist only in identifying the best possible genuine options—approval is not guaranteed.
                    </p>
                  </div>

                  <div className={`mt-5 ${hl.accentBox}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#00AEEF]" />
                      <p className={hl.accentLabel}>Brand Power Line</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-[#1A1A1A]">
                      "We don't judge your past credit score. We evaluate your present strength."
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact#contactForm"
                      className={hl.btnPrimary}
                    >
                      Talk to an Expert
                    </a>
                    <a
                      href="/services?category=poor-cibil"
                      className={hl.btnPrimary}
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
                      className={hl.btnPrimary}
                    >
                      Apply Now
                    </ApplyNowCTAButton>
                  </div>
                </div>
              </div>
            </div>

      <BusinessLoanModal isOpen={isApplyOpen} onClose={closeApply} />
    </article>
  );
}