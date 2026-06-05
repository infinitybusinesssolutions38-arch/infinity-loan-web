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
import { hl } from "./highlight-ui";

export default function EmiRestructuringHighlight() {
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
                    <AlertTriangle className="h-4 w-4 text-[#00AEEF]" />
                  </span>
                  HIGH EMI BURDEN? EMI RESTRUCTURING SUPPORT
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <AlertCircle className="h-6 w-6 text-[#00AEEF]" />
                  <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
                    Struggling with High EMIs? We're Here to Help
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#666666] sm:text-base">
                  If your monthly EMIs are too high and causing financial pressure, you can approach us for EMI restructuring and EMI burden reduction, provided your situation is supported by a genuine financial reason.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Target className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Who Should Contact Us</h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">High monthly EMI pressure</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Difficulty managing multiple loan EMIs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Reduced income impacting EMI payments</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Financial stress due to medical or family emergencies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">Temporary financial setback with recovery in progress</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Our Core Strength</h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-[#00AEEF] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">We specialise exclusively in EMI restructuring & EMI stress reduction</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-[#00AEEF] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#666666]">We focus on realistic, policy-based solutions — not false promises</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <RefreshCw className="h-6 w-6 text-[#00AEEF]" />
                  <h3 className="text-xl font-bold text-[#1A1A1A]">EMI Restructuring & Relief Support</h3>
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
                    <p className="mt-3 text-sm leading-relaxed text-[#666666] sm:text-base">
                      We assist clients with:
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">EMI restructuring as per lender policies</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Reduction of monthly EMI through tenure adjustment (subject to approval)</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Alignment of EMI commitments with current income</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Guidance on managing EMI stress legally and responsibly</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                      <TrendingDown className="h-5 w-5 text-[#00AEEF] mt-0.5 flex-shrink-0" />
                      <p className="text-sm leading-relaxed text-[#666666] sm:text-base font-semibold">
                        Our goal: Reduce EMI pressure and restore financial balance
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <FileText className="h-6 w-6 text-[#00AEEF]" />
                      <h3 className="text-xl font-bold text-[#1A1A1A]">
                        Genuine Reason is Mandatory
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#666666] sm:text-base">
                      EMI restructuring assistance is provided only when supported by a genuine reason, such as:
                    </p>

                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-[#666666]">• Medical emergency</p>
                      <p className="text-sm text-[#666666]">• Temporary income reduction</p>
                      <p className="text-sm text-[#666666]">• Job change or salary delay</p>
                      <p className="text-sm text-[#666666]">• Business slowdown</p>
                      <p className="text-sm text-[#666666]">• Family financial responsibility</p>
                    </div>

                    <div className={`mt-4 ${hl.alertBox}`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-red-600">
                          Cases without a genuine reason are not processed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Search className="h-6 w-6 text-[#00AEEF]" />
                      <h3 className="text-xl font-bold text-[#1A1A1A]">
                        Our Transparent & Ethical Process
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-sm text-[#666666]">EMI and income assessment</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-sm text-[#666666]">Verification of genuine financial difficulty</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-sm text-[#666666]">Identification of suitable restructuring options</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                        <p className="text-sm text-[#666666]">Guidance strictly as per lender policies</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                        <p className="text-sm text-[#666666]">Clear and transparent communication at every stage</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600">No fake documents</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600">No misleading commitments</p>
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

                    <div className="mt-3 rounded-xl border border-[#00AEEF]/20 bg-[#E6F7FD] p-4">
                      <p className="text-sm leading-relaxed text-[#1A1A1A] font-semibold">
                        "If high EMIs are creating stress and your financial difficulty is genuine, we help you explore legal and practical EMI restructuring solutions."
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Star className="h-6 w-6 text-[#00AEEF]" />
                      <h3 className="text-xl font-bold text-[#1A1A1A]">
                        Why Choose Us
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Honest and ethical advisory</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">EMI-focused financial solutions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Policy-compliant process</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Customer-first approach</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#666666]">Long-term financial stability focus</p>
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
                      <p className="text-sm font-semibold text-[#1A1A1A]">Important Disclaimer</p>
                      <p className="text-xs text-[#666666]">Please read carefully</p>
                    </div>
                  </div>

                  <div className={hl.innerBox}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#666666]">Approval Notice</p>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed text-[#666666]">
                          EMI restructuring and EMI reduction outcomes are subject to lender policies and final approval.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed text-[#666666]">
                          We provide assistance and guidance only—results cannot be guaranteed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-5 ${hl.accentBox}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#00AEEF]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]">Brand Power Line</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-[#1A1A1A]">
                      Reduce EMI Stress. Regain Financial Control.
                    </p>
                  </div>

                  <div className={`mt-5 ${hl.accentBox}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-5 w-5 text-[#00AEEF]" />
                      <p className="text-sm font-semibold text-[#1A1A1A]">Call to Action</p>
                    </div>
                    <p className="text-sm leading-relaxed text-[#1A1A1A] font-semibold mb-1">
                      High EMI burden? Don't wait.
                    </p>
                    <p className="text-sm leading-relaxed text-[#666666]">
                      Contact us today for professional EMI restructuring support.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className={hl.btnPrimary}
                    >
                      Get EMI Restructuring Help
                    </a>
                    <a
                      href="/services?category=emi-restructuring"
                      className={hl.btnPrimary}
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