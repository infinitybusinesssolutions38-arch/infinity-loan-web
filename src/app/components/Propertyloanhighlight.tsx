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
        <div className="relative overflow-hidden rounded-3xl border border-[#0099D8]/20 bg-gradient-to-br from-white via-slate-50 to-gray-50 p-6 shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#0099D8]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#0099D8]/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#0099D8]/30 bg-[#0099D8]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#0099D8]">
                  <Building2 className="h-4 w-4 text-[#0099D8]" />
                  Transparent Property-Based Loan & EMI Restructuring Solutions
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <CheckCircle2 className="h-6 w-6 text-[#0099D8]" />
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    100% Legal | RBI-Compliant | Customer-First Approach
                  </h2>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Our Commitment
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                  We provide ethical, transparent, and policy-compliant financial assistance for clients seeking property-based loan solutions or EMI restructuring support.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                  All our services are delivered strictly in accordance with banking regulations and lender policies.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Home className="h-6 w-6 text-[#0099D8]" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Property Valuation – Our Clear Policy
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                  Property valuation for loan purposes is conducted strictly as per current market value, based on independent and authorised valuer reports.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Valuation is based on the present market value at the time of loan application</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Future or expected appreciation is not considered during initial loan approval</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Artificial or inflated valuation is neither supported nor encouraged</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                  All valuations and loan structures follow the guidelines issued by the Reserve Bank of India (RBI) and respective bank/NBFC policies.
                </p>

                {!isExpanded && (
                  <button
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
                      <BarChart3 className="h-6 w-6 text-[#0099D8]" />
                      <h3 className="text-xl font-bold text-gray-900">
                        How Loan Amount Is Determined
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                      Loan eligibility is calculated using Loan-to-Value (LTV) norms, which generally include:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-[#0099D8] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700"><span className="font-semibold">Home Loans:</span> As per bank policy and applicable LTV limits</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-[#0099D8] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700"><span className="font-semibold">Loan Against Property (LAP):</span> A percentage of the current market value</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#0099D8]/30 bg-[#0099D8]/10 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#0099D8] mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-gray-900">
                          Final loan amount and approval are entirely subject to lender discretion and policy.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <TrendingUp className="h-6 w-6 text-[#0099D8]" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Future Property Value – Our Honest Approach
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                      While property values may increase over time, banks and NBFCs:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Consider only the current market value at the time of loan sanction</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">May reassess the property at a later stage for:</p>
                      </div>
                    </div>

                    <div className="mt-2 ml-8 space-y-1">
                      <p className="text-sm text-gray-700">• Top-up loans</p>
                      <p className="text-sm text-gray-700">• Loan enhancement</p>
                      <p className="text-sm text-gray-700">• Balance transfer</p>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                      Any reassessment is done only in the future, based on updated valuation and repayment history.
                    </p>

                    <div className="flex items-center gap-2 mt-6">
                      <RefreshCw className="h-6 w-6 text-[#0099D8]" />
                      <h3 className="text-xl font-bold text-gray-900">
                        EMI Restructuring & High EMI Burden Support
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                      We also assist clients facing high EMI burden, provided the situation is supported by a genuine financial reason.
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base font-semibold">
                      💡 Our EMI-related assistance includes:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Guidance on lender-approved EMI restructuring options</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">EMI reduction through tenure modification (subject to approval)</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Financial stress assessment and solution mapping</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                      <Target className="h-5 w-5 text-[#0099D8] mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed text-gray-700 sm:text-base font-semibold">
                        Our objective is to reduce EMI stress legally, responsibly, and sustainably.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <XCircle className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        What We Do Not Support
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-800">Inflated or manipulated property valuation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-800">Fake or misleading documentation</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-800">False promises or guaranteed approvals</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-800">Any practice outside bank or NBFC policies</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Search className="h-6 w-6 text-[#0099D8]" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Our Process
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-sm text-gray-700">Profile and requirement assessment</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-sm text-gray-700">Verification of income, property, and financial stress</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-sm text-gray-700">Policy-based solution recommendation</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                        <p className="text-sm text-gray-700">Transparent coordination with banks/NBFCs</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0099D8]/20 text-[#0099D8] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                        <p className="text-sm text-gray-700">Clear communication at every stage</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Star className="h-6 w-6 text-[#0099D8]" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Why Choose Us
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">100% legal and compliant approach</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Transparent and honest advisory</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Long-term financial stability focus</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Customer trust and ethical practices</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">No misleading commitments</p>
                      </div>
                    </div>

                    <button
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
                      All loan approvals, valuations, EMI restructuring, and top-up facilities are subject to bank/NBFC policies and final approval.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      We provide assistance and guidance only and do not guarantee approvals or specific loan amounts.
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#0099D8]/30 bg-[#0099D8]/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#0099D8]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#0099D8]">Our Professional Promise</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-gray-900">
                      "We believe in honest valuation, responsible lending, and long-term financial well-being."
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#0099D8]/30 bg-[#0099D8]/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-5 w-5 text-[#0099D8]" />
                      <p className="text-sm font-semibold text-gray-900">Get in Touch</p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 mb-2">
                      If you are looking for legal, transparent property-based loan guidance or EMI restructuring support,
                    </p>
                    <p className="text-sm leading-relaxed text-gray-800 font-semibold">
                      📩 contact us today for a professional consultation.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
                    >
                      Get Professional Consultation
                    </a>
                    <a
                      href="/services?category=property-loans"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0099D8] px-5 text-sm font-semibold text-gray-900 transition hover:bg-[#0099D8]/90"
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