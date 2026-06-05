"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Upload,
    CheckCircle2,
    Rocket,
    Clock,
    Shield,
    Zap,
    ChevronDown,
    HelpCircle,
    Sparkles,
    ArrowRight,
    CircleDot,
    MousePointerClick,
    TrendingUp,
} from "lucide-react";

// Replace these with your actual data
const activeHowItWorks = [
    {
        title: "Apply Online",
        description: "Fill out our simple online application form with your basic details. Takes just 10 minutes!",
    },
    {
        title: "Upload Documents or Share Documents",
        description: "Submit required documents digitally through our secure platform. Quick and hassle-free.",
    },
    {
        title: "Quick & Easy Verification",
        description: "Our team verifies your application within 48 hours. We keep you updated at every step.",
    },
    {
        title: "Get Approved",
        description: "Receive funds directly in your bank account. Start achieving your financial goals today!",
    },
];

const activeFaqItems = [
    {
        id: "faq-1",
        question: "What does Infinity Loans & Business Solutions do?",
        answer: "Infinity Loans & Business Solutions is a loan advisory and facilitation firm. We analyze client profiles and assist in securing the right loan from the right Bank or NBFC. We do not provide loans directly.",
    },
    {
        id: "faq-2",
        question: "Do you provide loans directly?",
        answer: "No. We act strictly as a financial advisor and channel partner. Final loan approval and disbursement are carried out solely by the respective Bank or NBFC.",
    },
    {
        id: "faq-3",
        question: "Are your services available Pan-India?",
        answer: "Yes. We provide loan advisory services across Pan-India, covering all States and Union Territories of India.",
    },
    {
        id: "faq-4",
        question: "Which Banks and NBFCs do you work with?",
        answer: "We work with 100+ leading Banks and NBFCs, allowing us to match each profile with the most suitable lender.",
    },
    {
        id: "faq-5",
        question: "How do you check loan eligibility?",
        answer: "We evaluate CIBIL score, income, employment or business profile, existing liabilities, and submitted documents to assess eligibility.",
    },
    {
        id: "faq-6",
        question: "What is the minimum CIBIL score required?",
        answer: "CIBIL score requirements vary by lender and loan type. Generally, a score of 650 or above improves approval chances.",
    },
    {
        id: "faq-7",
        question: "Can I apply if my CIBIL score is low?",
        answer: "Yes. We analyze the complete profile and may suggest alternate Banks/NBFCs or profile-improvement strategies, subject to eligibility.",
    },
    {
        id: "faq-8",
        question: "What is the loan process?",
        answer: "Our process includes profile assessment, internal credit and document analysis, Bank/NBFC matching, application support, and disbursement coordination.",
    },
    {
        id: "faq-9",
        question: "When will I know my loan eligibility?",
        answer: "Once all required documents are submitted, your profile is evaluated and loan eligibility is communicated within 48 hours, subject to internal assessment and lender criteria.",
    },
    {
        id: "faq-10",
        question: "What documents are required?",
        answer: "Common documents include PAN, Aadhaar, address proof, income proof (salary slips / ITR), bank statements, and employment or business details.",
    },
    {
        id: "faq-11",
        question: "Will my documents be shared with banks?",
        answer: "Yes. Documents are shared only with selected Banks or NBFCs, only after internal analysis, and strictly with your consent.",
    },
    {
        id: "faq-12",
        question: "What charges do you take for your services?",
        answer:
            "Our charges are applicable only as professional advisory and facilitation fees payable to Infinity Loans & Business Solutions.\n\nThese fees do not include any Bank or NBFC charges. All Bank/NBFC-related charges, including processing fees or statutory costs, are deducted directly from the loan amount by the respective lender, as per their policies.\n\nInfinity Loans & Business Solutions’ professional fees are payable separately and are communicated clearly in advance.",
    },
    {
        id: "faq-13",
        question: "Will interest rates be decided by you?",
        answer: "No. Interest rates, tenure, and loan terms are solely decided by the respective Bank or NBFC, based on eligibility and internal credit policy.",
    },
    {
        id: "faq-14",
        question: "Is my personal and financial data safe?",
        answer: "Yes. We follow strict data confidentiality and privacy practices to protect client information.",
    },
    {
        id: "faq-15",
        question: "How do you protect my documents and CIBIL score?",
        answer:
            "We first thoroughly review and analyze all documents internally to assess eligibility.\n\nWe do not distribute documents to multiple lenders initially, ensuring no unnecessary impact on your CIBIL score. Documents are shared only with carefully selected lenders, after detailed analysis and with your consent.",
    },
    {
        id: "faq-16",
        question: "How can I contact your team?",
        answer:
            "You may contact us through:\n\nTalk to a Financial Expert\nChat with a Loan Expert on WhatsApp\nRequest a Call Back\nEmail our advisory team",
    },
    {
        id: "faq-17",
        question: "Do you provide post-disbursement support?",
        answer: "Yes. We assist with documentation clarifications, balance transfer guidance, and future funding advisory.",
    },
];

// Icon mapping for steps
const stepIcons = [FileText, Upload, CheckCircle2, Rocket];

export default function ModernSections() {
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    return (
        <div className="w-full">
            {/* HOW IT WORKS SECTION */}
            <section className="py-16 lg:py-24 relative overflow-hidden bg-[#F7F9FC]">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E6F7FD] opacity-60 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#E6F7FD] opacity-60 blur-3xl" />

                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-white px-5 py-2.5 shadow-sm">
                            <Sparkles className="h-4 w-4 text-[#00AEEF]" />
                            <span className="text-sm font-bold text-[#00AEEF] uppercase tracking-wide">
                                Simple Process
                            </span>
                        </div>

                        <h2 className="mb-4 text-4xl font-bold text-[#1A1A1A] lg:text-5xl">
                            How It Works
                        </h2>

                        <p className="text-lg text-[#666666]">
                            A simple step by step, guided process tailored to your selected service
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {activeHowItWorks.map((step, idx) => {
                                const Icon = stepIcons[idx];
                                return (
                                    <div key={idx} className="group relative">
                                        {/* Connector Line */}
                                        {idx < activeHowItWorks.length - 1 && (
                                            <div className="hidden lg:block absolute top-14 left-[60%] w-full h-0.5 -z-10">
                                                <div className="w-3/4 h-full bg-gradient-to-r from-[#00AEEF] to-transparent opacity-20" />
                                            </div>
                                        )}

                                        {/* Card */}
                                        <div className="relative h-full rounded-[20px] border border-[#D6EEF8] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-y-0.5 hover:border-[#00AEEF] hover:shadow-[0_8px_24px_rgba(0,174,239,0.12)]">
                                            {/* Step Number */}
                                            <div className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00AEEF] text-lg font-bold text-white shadow-[0_4px_12px_rgba(0,174,239,0.2)] transition-all duration-300 ease-out">
                                                {idx + 1}
                                            </div>

                                            {/* Icon */}
                                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[#E6F7FD] transition-all duration-300 ease-out">
                                                <Icon className="w-8 h-8 text-[#00AEEF]" strokeWidth={2.5} />
                                            </div>

                                            {/* Content */}
                                            <h3 className="mb-3 text-xl font-bold text-[#1A1A1A] transition-all duration-300 ease-out group-hover:text-[#00AEEF]">
                                                {step.title}
                                            </h3>

                                            <p className="text-sm text-[#666666] leading-relaxed">
                                                {step.description}
                                            </p>

                                            {/* Progress Dot */}
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="flex-1 h-1 bg-[#D6EEF8] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#00AEEF] transition-all duration-300 ease-out"
                                                        style={{
                                                            width: `${((idx + 1) / activeHowItWorks.length) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                                <CircleDot className="w-4 h-4 text-[#00AEEF] flex-shrink-0" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="mt-12 text-center">
                            <Link href="/services" className="inline-flex items-center gap-3 px-8 py-4 bg-[#00AEEF] text-white font-bold text-lg rounded-xl shadow-[0_2px_10px_rgba(0,174,239,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#008FCC] hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 group">
                                <MousePointerClick className="w-5 h-5" />
                                Get Started Now On Your Loan Journey
                                <ArrowRight className="h-5 w-5 transition-all duration-300 ease-out group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="relative rounded-[20px] border border-[#D6EEF8] bg-white py-16 lg:py-24 shadow-[0_8px_30px_rgba(15,23,42,0.10)]">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-[#E6F7FD] px-5 py-2.5 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
                            <HelpCircle className="h-4 w-4 text-[#00AEEF]" />
                            <span className="text-sm font-bold text-[#00AEEF] uppercase tracking-wide">
                                Got Questions?
                            </span>
                        </div>

                        <h2 className="mb-4 text-4xl font-black text-[#1A1A1A] lg:text-5xl">
                            Frequently Asked Questions (FAQs)
                        </h2>

                        <p className="text-lg text-[#666666]">
                            Quick answers based on the service you're viewing
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="max-w-3xl mx-auto space-y-4">
                        {activeFaqItems.map((item) => {
                            const isOpen = openFaqId === item.id;

                            return (
                                <div key={item.id}>
                                    <div
                                        className={`rounded-[20px] shadow-[0_2px_10px_rgba(15,23,42,0.06)] border transition-all duration-300 ease-out overflow-hidden ${
                                            isOpen
                                                ? "border-[#00AEEF]"
                                                : "border-[#D6EEF8] hover:border-[#00AEEF]/40 hover:-translate-y-0.5"
                                        }`}
                                    >
                                        {/* Question Button */}
                                        <button
                                            onClick={() =>
                                                setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                                            }
                                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 focus-visible:ring-offset-2 group"
                                        >
                                            <div className="flex items-start gap-3 flex-1">
                                                {/* Icon */}
                                                <div
                                                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ease-out ${
                                                        isOpen
                                                            ? "bg-[#E6F7FD]"
                                                            : "bg-[#F7F9FC] group-hover:bg-[#E6F7FD]"
                                                    }`}
                                                >
                                                    <HelpCircle
                                                        className={`w-4 h-4 ${
                                                            isOpen ? "text-[#00AEEF]" : "text-[#00AEEF]"
                                                        }`}
                                                    />
                                                </div>

                                                {/* Question */}
                                                <span
                                                    className={`pr-4 text-base font-bold transition-all duration-300 ease-out lg:text-lg ${
                                                        isOpen
                                                            ? "text-[#00AEEF]"
                                                            : "text-[#1A1A1A] group-hover:text-[#00AEEF]"
                                                    }`}
                                                >
                                                    {item.question}
                                                </span>
                                            </div>

                                            {/* Chevron */}
                                            <div
                                                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ease-out ${
                                                    isOpen
                                                        ? "bg-[#E6F7FD] rotate-180"
                                                        : "bg-[#F7F9FC] group-hover:bg-[#E6F7FD]"
                                                }`}
                                            >
                                                <ChevronDown
                                                    className={`w-5 h-5 ${isOpen ? "text-[#00AEEF]" : "text-[#666666]"}`}
                                                />
                                            </div>
                                        </button>

                                        {/* Answer */}
                                        <div
                                            className={`transition-all duration-300 ease-out ${
                                                isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="px-5 pb-5">
                                                <div className="h-px bg-gradient-to-r from-transparent via-[#00AEEF]/25 to-transparent mb-4" />
                                                
                                                <div className="flex gap-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-5 h-5 rounded-full bg-[#E6F7FD] flex items-center justify-center border border-[#D6EEF8]">
                                                            <CheckCircle2 className="w-3 h-3 text-[#00AEEF]" />
                                                        </div>
                                                    </div>
                                                    <p className="text-sm lg:text-base text-[#666666] leading-relaxed whitespace-pre-line">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mx-auto mt-8 max-w-3xl">
                        <div className="bg-[#F7F9FC] rounded-[20px] shadow-[0_2px_10px_rgba(15,23,42,0.06)] border border-[#D6EEF8] overflow-hidden">
                            <div className="px-5 py-4 flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E6F7FD] border border-[#D6EEF8] flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-[#00AEEF]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base lg:text-lg font-bold text-[#1A1A1A]">Disclaimer</p>
                                    <p className="mt-2 text-sm lg:text-base text-[#666666] leading-relaxed whitespace-pre-line">
                                        Infinity Loans & Business Solutions is not a Bank or NBFC.
                                        {"\n"}
                                        We provide loan advisory and facilitation services only. Final loan sanction, interest rates, terms, and disbursement are solely at the discretion of the respective Bank or NBFC, subject to eligibility norms and internal policies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Help Footer */}
                    <div className="mt-10 text-center">
                        <div className="inline-flex items-center gap-3 rounded-[20px] border border-[#D6EEF8] bg-white px-6 py-3 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
                            <Shield className="w-5 h-5 text-[#00AEEF]" />
                            <p className="text-sm font-semibold text-[#666666]">
                                Still have questions?{" "}
                                <Link href={"/contact"} className="cursor-pointer text-[#00AEEF] underline transition-all duration-300 ease-out hover:text-[#008FCC]">
                                    Contact our support team
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}