"use client";

import React, { useState } from "react";
import { BriefcaseBusiness, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import BusinessLoanModal from "@/components/loans/BusinessLoanModal";
import { hl } from "./highlight-ui";

export default function PrivateInstitutionalHighlight() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const closeApply = () => {
    setIsApplyOpen(false);
  };

  return (
    <article className={hl.card}>
      <div className={hl.layout}>
        <div className={hl.content}>
          <p className={hl.badge}>
            <span className={hl.badgeIcon}>
              <BriefcaseBusiness className="h-4 w-4 text-[#00AEEF]" />
            </span>
            Private & Institutional Lending Services
          </p>

          <h2 className={`mt-5 ${hl.title}`}>
            🏦 Structured Private Lending for Complex Capital Requirements
          </h2>

          <div className="mt-5 space-y-4">
            <p className={hl.body}>
              💼 Comprehensive secured and unsecured private lending solutions designed for businesses with diverse and complex capital needs.
              <br />
              We facilitate lending through Private Lenders, Venture Capital (VC) Networks, Strategic Investors, and HNI & UHNI channels, supported by structured deal frameworks and strong governance standards.
            </p>

            <p className={hl.bodyStrong}>🔍 Our Lending Capabilities</p>
            <div className="space-y-1.5">
              <p className={hl.listItem}>🏛️ Institutional & Professional Lending</p>
              <p className={hl.listItem}>🤝 Private Lender–Led Funding Structures</p>
              <p className={hl.listItem}>🧩 Customized Deal Structuring based on detailed eligibility assessment</p>
            </div>

            {!isReadMoreOpen && (
              <button
                type="button"
                onClick={() => setIsReadMoreOpen(true)}
                className={`mt-2 ${hl.btnPrimary}`}
              >
                Read more
                <ChevronDown className="h-4 w-4" />
              </button>
            )}

            {isReadMoreOpen && (
              <>
                <p className={hl.body}>All lending structures are developed through:</p>
                <div className="space-y-1.5">
                  <p className={hl.listItem}>✔️ Credit Evaluation</p>
                  <p className={hl.listItem}>✔️ Due Diligence</p>
                  <p className={hl.listItem}>✔️ Risk & Compliance Review</p>
                </div>

                <p className={hl.bodyStrong}>🚀 Capital Solutions We Support</p>
                <div className="space-y-1.5">
                  <p className={hl.listItem}>📈 Growth Capital</p>
                  <p className={hl.listItem}>🏗️ Expansion & Scale-Up Lending</p>
                  <p className={hl.listItem}>🎯 Strategic & Special Situation Funding</p>
                </div>

                <p className={hl.body}>
                  All solutions are aligned with long-term business objectives and sustainable growth.
                </p>

                <p className={hl.bodyStrong}>🏭 Who We Serve</p>
                <div className="space-y-1.5">
                  <p className={hl.listItem}>🏢 Small & Large Businesses</p>
                  <p className={hl.listItem}>🏭 SMEs & Corporates</p>
                  <p className={hl.listItem}>🏗️ Factory Owners & Industrialists</p>
                </div>

                <p className={hl.body}>📌 All lending solutions are subject to profile evaluation and due diligence.</p>

                <div className={hl.infoBox}>
                  <p className={`${hl.bodyStrong}`}>💡 Optional Short Version (for cards / sections)</p>
                  <p className={`mt-2 ${hl.bodyStrong}`}>🔒 Structured Private Lending</p>
                  <p className={`mt-2 ${hl.body}`}>
                    Tailored secured and unsecured funding solutions for businesses with complex capital requirements—powered by private lenders, strategic investors, and strong governance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReadMoreOpen(false)}
                  className={hl.btnSecondary}
                >
                  Show less
                  <ChevronUp className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-xl lg:max-w-sm">
          <div className={hl.sidebar}>
            <div className="flex items-center gap-3">
              <div className={hl.iconBox}>
                <TrendingUp className="h-5 w-5 text-[#00AEEF]" />
              </div>
              <div>
                <p className={hl.sidebarTitle}>Lending Ticket Size</p>
                <p className={hl.sidebarSub}>Subject to eligibility & due diligence</p>
              </div>
            </div>

            <div className={hl.innerBox}>
              <p className={hl.innerLabel}>Range</p>
              <p className={hl.innerValue}>
                INR 10 Lakhs to INR 1,000 Crores
              </p>
            </div>

            <p className="mt-4 text-sm font-semibold leading-relaxed text-[#666666]">
              Based on borrower profile strength, legal & financial documentation, credit history, repayment track record, and overall risk assessment.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a href="/contact#contactForm" className={hl.btnPrimary}>
                Talk to an Expert
              </a>
              <a href="/services?category=businesses" className={hl.btnPrimary}>
                Explore Our Loan  Services
              </a>
              <ApplyNowCTAButton
                loanType="Private & Institutional Lending"
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
