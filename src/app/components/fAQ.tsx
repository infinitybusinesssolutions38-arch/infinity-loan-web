"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Upload,
    CheckCircle2,
    Rocket,
    Shield,
    ChevronDown,
    HelpCircle,
    Sparkles,
    ArrowRight,
    CircleDot,
    MousePointerClick,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
            <section className="py-16 lg:py-24 relative overflow-hidden">
                {/* Background Elements (removed parent dark gradient to inherit page background) */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0099D8]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0099D8]/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    {/* Header */}
                    <ScrollReveal animation="fade-in-up">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border-2 border-[#0099D8]/30 bg-[#0099D8]/5 px-5 py-2.5 shadow-sm">
                                <Sparkles className="h-4 w-4 text-[#0099D8]" />
                                <span className="text-sm font-bold uppercase tracking-wide text-[#0099D8]">
                                    Simple Process
                                </span>
                            </div>

                            <h2 className="mb-4 text-4xl font-black text-gray-900 lg:text-5xl">
                                How It Works
                            </h2>

                            <p className="text-lg text-gray-600">
                                A simple step by step, guided process tailored to your selected service
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Steps Grid */}
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                            {activeHowItWorks.map((step, idx) => {
                                const Icon = stepIcons[idx];
                                return (
                                    <ScrollReveal key={idx} delay={idx * 100} animation="scale-in">
                                        <div className="group relative h-full">
                                            {idx < activeHowItWorks.length - 1 && (
                                                <div className="absolute -z-10 hidden lg:block left-[60%] top-14 h-0.5 w-full">
                                                    <div className="h-full w-3/4 bg-gradient-to-r from-[#0099D8] to-transparent opacity-30" />
                                                </div>
                                            )}

                                            <div className="modern-dark-card modern-card-shine relative h-full p-6">
                                                <div className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0099D8] to-[#2E3192] text-lg font-black text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                                    {idx + 1}
                                                </div>

                                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0099D8]/20 to-[#2E3192]/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                                    <Icon className="h-8 w-8 text-[#0099D8]" strokeWidth={2.5} />
                                                </div>

                                                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#0099D8]">
                                                    {step.title}
                                                </h3>

                                                <p className="text-sm leading-relaxed text-gray-600">
                                                    {step.description}
                                                </p>

                                                <div className="mt-4 flex items-center gap-2">
                                                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#0099D8] to-[#007BB0] transition-all duration-700"
                                                            style={{
                                                                width: `${((idx + 1) / activeHowItWorks.length) * 100}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <CircleDot className="h-4 w-4 shrink-0 text-[#0099D8]" />
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <ScrollReveal animation="fade-in-up" delay={400}>
                            <div className="mt-12 text-center">
                                <Link
                                    href="/services"
                                    className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#0099D8] to-[#2E3192] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0099D8]/30"
                                >
                                    <MousePointerClick className="h-5 w-5" />
                                    Get Started Now On Your Loan Journey
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="relative rounded-3xl bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <ScrollReveal animation="fade-in-up">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#0099D8]/30 bg-[#0099D8]/5 px-5 py-2.5 shadow-sm">
                                <HelpCircle className="h-4 w-4 text-[#0099D8]" />
                                <span className="text-sm font-bold uppercase tracking-wide text-[#0099D8]">
                                    Got Questions?
                                </span>
                            </div>

                            <h2 className="mb-4 text-4xl font-black text-gray-900 lg:text-5xl">
                                Frequently Asked Questions (FAQs)
                            </h2>

                            <p className="text-lg text-gray-600">
                                Quick answers based on the service you&apos;re viewing
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* FAQ Items */}
                    <div className="mx-auto max-w-3xl space-y-4">
                        {activeFaqItems.map((item, idx) => {
                            const isOpen = openFaqId === item.id;

                            return (
                                <ScrollReveal key={item.id} delay={Math.min(idx * 60, 400)} animation="fade-in-up">
                                    <div
                                        className={`modern-dark-card overflow-hidden transition-all duration-300 ${
                                            isOpen
                                                ? "border-[#0099D8] shadow-lg shadow-[#0099D8]/10"
                                                : "hover:border-[#0099D8]/50"
                                        }`}
                                    >
                                        {/* Question Button */}
                                        <button
                                            onClick={() =>
                                                setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                                            }
                                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0099D8] focus-visible:ring-offset-2 group"
                                        >
                                            <div className="flex items-start gap-3 flex-1">
                                                {/* Icon */}
                                                <div
                                                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                                        isOpen
                                                            ? "bg-gradient-to-br from-[#0099D8] to-[#2E3192]"
                                                            : "bg-gray-100 group-hover:bg-gray-200"
                                                    }`}
                                                >
                                                    <HelpCircle
                                                        className={`w-4 h-4 ${
                                                            isOpen ? "text-white" : "text-[#0099D8]"
                                                        }`}
                                                    />
                                                </div>

                                                {/* Question */}
                                                <span
                                                    className={`text-base lg:text-lg font-bold pr-4 transition-colors ${
                                                        isOpen
                                                            ? "text-[#0099D8]"
                                                            : "text-gray-900 group-hover:text-[#0099D8]"
                                                    }`}
                                                >
                                                    {item.question}
                                                </span>
                                            </div>

                                            {/* Chevron */}
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                                    isOpen
                                                        ? "bg-gradient-to-br from-[#0099D8] to-[#2E3192] rotate-180"
                                                        : "bg-gray-100 group-hover:bg-gray-200"
                                                }`}
                                            >
                                                <ChevronDown
                                                    className={`w-5 h-5 ${isOpen ? "text-white" : "text-gray-500"}`}
                                                />
                                            </div>
                                        </button>

                                        {/* Answer */}
                                        <div
                                            className={`transition-all duration-500 ease-in-out ${
                                                isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="px-5 pb-5">
                                                <div className="h-px bg-gradient-to-r from-transparent via-[#0099D8]/40 to-transparent mb-4" />
                                                
                                                <div className="flex gap-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-5 h-5 rounded-full bg-[#0099D8]/20 flex items-center justify-center">
                                                            <CheckCircle2 className="w-3 h-3 text-[#0099D8]" />
                                                        </div>
                                                    </div>
                                                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    <ScrollReveal animation="fade-in-up" delay={200}>
                        <div className="mx-auto mt-8 max-w-3xl">
                            <div className="modern-dark-card overflow-hidden border-[#0099D8]/40">
                                <div className="flex items-start gap-3 px-5 py-4">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0099D8] to-[#2E3192]">
                                        <Shield className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base font-bold text-gray-900 lg:text-lg">Disclaimer</p>
                                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600 lg:text-base">
                                            Infinity Loans & Business Solutions is not a Bank or NBFC.
                                            {"\n"}
                                            We provide loan advisory and facilitation services only. Final loan sanction, interest rates, terms, and disbursement are solely at the discretion of the respective Bank or NBFC, subject to eligibility norms and internal policies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Help Footer */}
                    <ScrollReveal animation="fade-in-up" delay={300}>
                        <div className="mt-10 text-center">
                            <div className="inline-flex items-center gap-3 rounded-2xl border border-[#0099D8]/30 bg-white px-6 py-3 shadow-sm">
                                <Shield className="h-5 w-5 text-[#0099D8]" />
                                <p className="text-sm font-semibold text-gray-600">
                                    Still have questions?{" "}
                                    <Link href="/contact" className="cursor-pointer text-[#0099D8] underline transition-colors hover:text-[#33B5E5]">
                                        Contact our support team
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}