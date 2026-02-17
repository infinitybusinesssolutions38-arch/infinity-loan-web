"use client";

import React, { useState } from "react";
import { 
  AlertCircle, 
  Shield, 
  CheckCircle2, 
  XCircle,
  Target,
  Sparkles,
  RefreshCw,
  FileText,
  Search,
  Star,
  MessageSquare,
  Flame,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingDown,
  Phone
} from "lucide-react";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";

import BusinessLoanModal from "@/components/loans/BusinessLoanModal";

export default function EmiRestructuringHighlight() {
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
                  <AlertTriangle className="h-4 w-4 text-[#F97415]" />
                  HIGH EMI BURDEN? EMI RESTRUCTURING SUPPORT
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <AlertCircle className="h-6 w-6 text-[#F97415]" />
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Struggling with High EMIs? We're Here to Help
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  If your monthly EMIs are too high and causing financial pressure, you can approach us for EMI restructuring and EMI burden reduction, provided your situation is supported by a genuine financial reason.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Target className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">Who Should Contact Us</h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">High monthly EMI pressure</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Difficulty managing multiple loan EMIs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Reduced income impacting EMI payments</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Financial stress due to medical or family emergencies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Temporary financial setback with recovery in progress</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">Our Core Strength</h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">We specialise exclusively in EMI restructuring & EMI stress reduction</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">We focus on realistic, policy-based solutions — not false promises</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <RefreshCw className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">EMI Restructuring & Relief Support</h3>
                </div>

                {!isExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F97415] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                  >
                    Read More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {isExpanded && (
                  <>
                    <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                      We assist clients with:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">EMI restructuring as per lender policies</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Reduction of monthly EMI through tenure adjustment (subject to approval)</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Alignment of EMI commitments with current income</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Guidance on managing EMI stress legally and responsibly</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                      <TrendingDown className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed text-gray-200 sm:text-base font-semibold">
                        Our goal: Reduce EMI pressure and restore financial balance
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <FileText className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        Genuine Reason is Mandatory
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                      EMI restructuring assistance is provided only when supported by a genuine reason, such as:
                    </p>

                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-300">• Medical emergency</p>
                      <p className="text-sm text-gray-300">• Temporary income reduction</p>
                      <p className="text-sm text-gray-300">• Job change or salary delay</p>
                      <p className="text-sm text-gray-300">• Business slowdown</p>
                      <p className="text-sm text-gray-300">• Family financial responsibility</p>
                    </div>

                    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-red-200">
                          Cases without a genuine reason are not processed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Search className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        Our Transparent & Ethical Process
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-sm text-gray-200">EMI and income assessment</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-sm text-gray-200">Verification of genuine financial difficulty</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-sm text-gray-200">Identification of suitable restructuring options</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                        <p className="text-sm text-gray-200">Guidance strictly as per lender policies</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                        <p className="text-sm text-gray-200">Clear and transparent communication at every stage</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">No fake documents</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">No misleading commitments</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-200">No approval guarantees</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <MessageSquare className="h-6 w-6 text-[#F97415]" />
                      <h3 className="text-xl font-bold text-white">
                        Clear Message for Clients
                      </h3>
                    </div>

                    <div className="mt-3 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                      <p className="text-sm leading-relaxed text-white font-semibold">
                        "If high EMIs are creating stress and your financial difficulty is genuine, we help you explore legal and practical EMI restructuring solutions."
                      </p>
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
                        <p className="text-sm text-gray-200">Honest and ethical advisory</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">EMI-focused financial solutions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Policy-compliant process</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Customer-first approach</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200">Long-term financial stability focus</p>
                      </div>
                    </div>

                    <button
                      type="button"
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
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed text-gray-200">
                          EMI restructuring and EMI reduction outcomes are subject to lender policies and final approval.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed text-gray-200">
                          We provide assistance and guidance only—results cannot be guaranteed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#F97415]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-white">Brand Power Line</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-white">
                      Reduce EMI Stress. Regain Financial Control.
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-5 w-5 text-[#F97415]" />
                      <p className="text-sm font-semibold text-white">Call to Action</p>
                    </div>
                    <p className="text-sm leading-relaxed text-white font-semibold mb-1">
                      High EMI burden? Don't wait.
                    </p>
                    <p className="text-sm leading-relaxed text-gray-200">
                      Contact us today for professional EMI restructuring support.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Get EMI Restructuring Help
                    </a>
                    <a
                      href="/services?category=emi-restructuring"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Explore Our Loan Services
                    </a>
                    <ApplyNowCTAButton 
                      loanType="EMI Restructuring" 
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