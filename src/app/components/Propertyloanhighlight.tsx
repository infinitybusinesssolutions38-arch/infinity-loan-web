"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Shield, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Sparkles,
  FileText,
  TrendingUp,
  RefreshCw,
  Search,
  Star,
  MessageSquare,
  Flame,
  ChevronDown,
  ChevronUp,
  Home,
  BarChart3,
  Target,
  Phone
} from "lucide-react";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";

import BusinessLoanModal from "@/components/loans/BusinessLoanModal";

export default function PropertyLoanHighlight() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const closeApply = () => {
    setIsApplyOpen(false);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#F97415]/20 bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-6 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#F97415]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#F97415]/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#F97415]/30 bg-[#F97415]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                  <Building2 className="h-4 w-4 text-[#F97415]" />
                  Transparent Property-Based Loan & EMI Restructuring Solutions
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <CheckCircle2 className="h-6 w-6 text-[#F97415]" />
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    100% Legal | RBI-Compliant | Customer-First Approach
                  </h2>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Our Commitment
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  We provide ethical, transparent, and policy-compliant financial assistance for clients seeking property-based loan solutions or EMI restructuring support.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                  All our services are delivered strictly in accordance with banking regulations and lender policies.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Home className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Property Valuation – Our Clear Policy
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  Property valuation for loan purposes is conducted strictly as per current market value, based on independent and authorised valuer reports.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Valuation is based on the present market value at the time of loan application</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Future or expected appreciation is not considered during initial loan approval</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Artificial or inflated valuation is neither supported nor encouraged</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  All valuations and loan structures follow the guidelines issued by the Reserve Bank of India (RBI) and respective bank/NBFC policies.
                </p>

                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F97415] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                  >
                    Read More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {isExpanded && (
                  <>
                    <div className="flex items-center gap-2 mt-6">
                      <BarChart3 className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        How Loan Amount Is Determined
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                      Loan eligibility is calculated using Loan-to-Value (LTV) norms, which generally include:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200"><span className="font-semibold">Home Loans:</span> As per bank policy and applicable LTV limits</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200"><span className="font-semibold">Loan Against Property (LAP):</span> A percentage of the current market value</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-white">
                          Final loan amount and approval are entirely subject to lender discretion and policy.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <TrendingUp className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        Future Property Value – Our Honest Approach
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                      While property values may increase over time, banks and NBFCs:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Consider only the current market value at the time of loan sanction</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">May reassess the property at a later stage for:</p>
                      </div>
                    </div>

                    <div className="mt-2 ml-8 space-y-1">
                      <p className="text-sm text-gray-300">• Top-up loans</p>
                      <p className="text-sm text-gray-300">• Loan enhancement</p>
                      <p className="text-sm text-gray-300">• Balance transfer</p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                      Any reassessment is done only in the future, based on updated valuation and repayment history.
                    </p>

                    <div className="flex items-center gap-2 mt-6">
                      <RefreshCw className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        EMI Restructuring & High EMI Burden Support
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                      We also assist clients facing high EMI burden, provided the situation is supported by a genuine financial reason.
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base font-semibold">
                      💡 Our EMI-related assistance includes:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Guidance on lender-approved EMI restructuring options</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">EMI reduction through tenure modification (subject to approval)</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Financial stress assessment and solution mapping</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                      <Target className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed text-gray-200 sm:text-base font-semibold">
                        Our objective is to reduce EMI stress legally, responsibly, and sustainably.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <XCircle className="h-6 w-6 text-red-400" />
                      <h3 className="text-xl font-bold text-white">
                        What We Do Not Support
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">Inflated or manipulated property valuation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">Fake or misleading documentation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">False promises or guaranteed approvals</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">Any practice outside bank or NBFC policies</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Search className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        Our Process
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-sm text-gray-200">Profile and requirement assessment</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-sm text-gray-200">Verification of income, property, and financial stress</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-sm text-gray-200">Policy-based solution recommendation</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                        <p className="text-sm text-gray-200">Transparent coordination with banks/NBFCs</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                        <p className="text-sm text-gray-200">Clear communication at every stage</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Star className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        Why Choose Us
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">100% legal and compliant approach</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Transparent and honest advisory</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Long-term financial stability focus</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Customer trust and ethical practices</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">No misleading commitments</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsExpanded(false)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Show Less
                      <ChevronUp className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>

              <div className="w-full max-w-xl lg:max-w-sm lg:sticky lg:top-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97415]/15">
                      <Shield className="h-5 w-5 text-[#F97415]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Important Disclaimer</p>
                      <p className="text-xs text-gray-300">Please read carefully</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-black/30 px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">Approval Notice</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-200">
                      All loan approvals, valuations, EMI restructuring, and top-up facilities are subject to bank/NBFC policies and final approval.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-200">
                      We provide assistance and guidance only and do not guarantee approvals or specific loan amounts.
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#F97415]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-white">Our Professional Promise</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-white">
                      "We believe in honest valuation, responsible lending, and long-term financial well-being."
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-5 w-5 text-[#F97415]" />
                      <p className="text-sm font-semibold text-white">Get in Touch</p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-200 mb-2">
                      If you are looking for legal, transparent property-based loan guidance or EMI restructuring support,
                    </p>
                    <p className="text-sm leading-relaxed text-white font-semibold">
                      📩 contact us today for a professional consultation.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Get Professional Consultation
                    </a>
                    <a
                      href="/services?category=property-loans"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Explore Our Loan Services
                    </a>
                    <ApplyNowCTAButton 
                      loanType="Property Loan Support" 
                      redirectToUnifiedForm={true}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsApplyOpen(true);
                      }}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
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