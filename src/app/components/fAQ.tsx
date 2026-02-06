"use client";

import React, { useState } from "react";
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
        description: "Fill out our simple online application form with your basic details. Takes just 5 minutes!",
    },
    {
        title: "Upload Documents",
        description: "Submit required documents digitally through our secure platform. Quick and hassle-free.",
    },
    {
        title: "Quick Verification",
        description: "Our team verifies your application within 24 hours. We keep you updated at every step.",
    },
    {
        title: "Get Approved",
        description: "Receive funds directly in your bank account. Start achieving your financial goals today!",
    },
];

const activeFaqItems = [
    {
        id: "faq-1",
        question: "What documents are required for a loan application?",
        answer: "For personal loans, you need PAN card, Aadhaar card, bank statements (last 6 months), and salary slips. Business loans require additional documents like GST certificate, business registration proof, and ITR. We'll provide a complete checklist based on your loan type.",
    },
    {
        id: "faq-2",
        question: "How long does the approval process take?",
        answer: "Most applications are processed within 24 hours of submission. Once approved, the loan amount is typically disbursed to your bank account within 24-48 hours. We pride ourselves on quick turnaround times while maintaining thorough verification.",
    },
    {
        id: "faq-3",
        question: "What are the interest rates and charges?",
        answer: "Interest rates start from 10.5% p.a. for personal loans and 12% p.a. for business loans, depending on your credit profile and loan amount. We believe in complete transparency - there are no hidden charges. All fees are clearly mentioned in your loan agreement.",
    },
    {
        id: "faq-4",
        question: "Can I prepay my loan without penalties?",
        answer: "Yes! We do not charge any prepayment or foreclosure penalties. You are free to repay your loan anytime without any additional fees. We want to support your financial freedom, not restrict it.",
    },
];

// Icon mapping for steps
const stepIcons = [FileText, Upload, CheckCircle2, Rocket];

export default function ModernSections() {
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    return (
        <div className="w-full bg-gray-50">
            {/* HOW IT WORKS SECTION */}
            <section className="py-16 lg:py-24 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97415]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97415]/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#F97415]/30 rounded-full mb-6 shadow-sm animate-fade-in">
                            <Sparkles className="h-4 w-4 text-[#F97415]" />
                            <span className="text-sm font-bold text-[#F97415] uppercase tracking-wide">
                                Simple Process
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 animate-fade-in-up">
                            How It Works
                        </h2>

                        <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-100">
                            A simple, guided process tailored to your selected service
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {activeHowItWorks.map((step, idx) => {
                                const Icon = stepIcons[idx];
                                return (
                                    <div
                                        key={idx}
                                        className="relative group animate-scale-in"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        {/* Connector Line */}
                                        {idx < activeHowItWorks.length - 1 && (
                                            <div className="hidden lg:block absolute top-14 left-[60%] w-full h-0.5 -z-10">
                                                <div className="w-3/4 h-full bg-gradient-to-r from-[#F97415] to-transparent opacity-30" />
                                            </div>
                                        )}

                                        {/* Card */}
                                        <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 hover:border-[#F97415]/50 transition-all duration-300 h-full group-hover:-translate-y-2">
                                            {/* Step Number */}
                                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#F97415] to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 z-10">
                                                {idx + 1}
                                            </div>

                                            {/* Icon */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                                <Icon className="w-8 h-8 text-[#F97415]" strokeWidth={2.5} />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F97415] transition-colors">
                                                {step.title}
                                            </h3>

                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>

                                            {/* Progress Dot */}
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-[#F97415] to-orange-500 transition-all duration-700"
                                                        style={{
                                                            width: `${((idx + 1) / activeHowItWorks.length) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                                <CircleDot className="w-4 h-4 text-[#F97415] flex-shrink-0" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="mt-12 text-center animate-fade-in-up animation-delay-400">
                            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F97415] to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <MousePointerClick className="w-5 h-5" />
                                Get Started Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-16 lg:py-24 bg-white relative">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-50 border-2 border-[#F97415]/20 rounded-full mb-6 shadow-sm animate-fade-in">
                            <HelpCircle className="h-4 w-4 text-[#F97415]" />
                            <span className="text-sm font-bold text-[#F97415] uppercase tracking-wide">
                                Got Questions?
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 animate-fade-in-up">
                            FAQs
                        </h2>

                        <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-100">
                            Quick answers based on the service you're viewing
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="max-w-3xl mx-auto space-y-4">
                        {activeFaqItems.map((item, idx) => {
                            const isOpen = openFaqId === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <div
                                        className={`bg-white rounded-xl shadow-md border-2 transition-all duration-300 overflow-hidden ${
                                            isOpen
                                                ? "border-[#F97415] shadow-lg shadow-[#F97415]/10"
                                                : "border-gray-200 hover:border-[#F97415]/30 hover:shadow-lg"
                                        }`}
                                    >
                                        {/* Question Button */}
                                        <button
                                            onClick={() =>
                                                setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                                            }
                                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97415] focus-visible:ring-offset-2 group"
                                        >
                                            <div className="flex items-start gap-3 flex-1">
                                                {/* Icon */}
                                                <div
                                                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                                        isOpen
                                                            ? "bg-gradient-to-br from-[#F97415] to-orange-600"
                                                            : "bg-orange-100 group-hover:bg-orange-200"
                                                    }`}
                                                >
                                                    <HelpCircle
                                                        className={`w-4 h-4 ${
                                                            isOpen ? "text-white" : "text-[#F97415]"
                                                        }`}
                                                    />
                                                </div>

                                                {/* Question */}
                                                <span
                                                    className={`text-base lg:text-lg font-bold pr-4 transition-colors ${
                                                        isOpen
                                                            ? "text-[#F97415]"
                                                            : "text-gray-900 group-hover:text-[#F97415]"
                                                    }`}
                                                >
                                                    {item.question}
                                                </span>
                                            </div>

                                            {/* Chevron */}
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                                    isOpen
                                                        ? "bg-gradient-to-br from-[#F97415] to-orange-600 rotate-180"
                                                        : "bg-gray-100 group-hover:bg-orange-100"
                                                }`}
                                            >
                                                <ChevronDown
                                                    className={`w-5 h-5 ${isOpen ? "text-white" : "text-gray-600"}`}
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
                                                <div className="h-px bg-gradient-to-r from-transparent via-[#F97415]/20 to-transparent mb-4" />
                                                
                                                <div className="flex gap-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                                                            <CheckCircle2 className="w-3 h-3 text-[#F97415]" />
                                                        </div>
                                                    </div>
                                                    <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
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

                    {/* Help Footer */}
                    <div className="mt-10 text-center animate-fade-in-up animation-delay-400">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-[#F97415]/20">
                            <Shield className="w-5 h-5 text-[#F97415]" />
                            <p className="text-sm font-semibold text-gray-700">
                                Still have questions?{" "}
                                <span className="text-[#F97415] underline cursor-pointer hover:text-orange-700 transition-colors">
                                    Contact our support team
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Animations */}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }

                .animate-scale-in {
                    animation: scale-in 0.5s ease-out forwards;
                }

                .animation-delay-100 {
                    animation-delay: 100ms;
                }

                .animation-delay-400 {
                    animation-delay: 400ms;
                }
            `}</style>
        </div>
    );
}