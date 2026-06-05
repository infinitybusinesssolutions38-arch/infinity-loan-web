"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Percent, Calendar, Banknote, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type LoanType, LOAN_DETAILS } from "@/data/loanDetails";

import EligibilitySection from "./EligibilitySection";
import BenefitsSection from "./BenefitsSection";
import DocumentsSection from "./DocumentsSection";
import ApplyNowModal from "./ApplyNowModal";
import BusinessLoanModal from "./BusinessLoanModal";

interface LoanDetailPageProps {
    loanType: LoanType;
}

export default function LoanDetailPage({ loanType }: LoanDetailPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = LOAN_DETAILS[loanType];
    const HeroIcon = data.heroIcon;
    const router = useRouter();

    const handleApplyNow = () => {
        const isLoggedIn = (() => {
            try {
                return Boolean(localStorage.getItem("token"));
            } catch {
                return false;
            }
        })();

        if (!isLoggedIn) {
            const next = `${window.location.pathname}${window.location.search}`;
            router.push(`/login?next=${encodeURIComponent(next)}`);
            return;
        }

        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC]">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#F7F9FC] py-16 lg:py-24">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-12"
                        style={{ backgroundColor: "rgba(0, 174, 239, 0.18)" }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-10"
                        style={{ backgroundColor: "rgba(0, 174, 239, 0.14)" }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00AEEF]/[0.06] blur-3xl" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,174,239,0.7) 1px, transparent 0)`,
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <Link
                        href="/services"
                        className="group mb-8 inline-flex items-center gap-2 text-[#666666] transition-all duration-300 ease-out hover:text-[#00AEEF]"
                    >
                        <ArrowLeft className="h-4 w-4 transition-all duration-300 ease-out group-hover:-translate-x-0.5" />
                        Back to Services
                    </Link>

                    <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left Content */}
                        <div className="max-w-2xl">
                            <Badge
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-white text-[#1A1A1A] shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
                            >
                                <Sparkles className="h-3 w-3 text-[#00AEEF]" />
                                {data.subtitle}
                            </Badge>

                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-[#D6EEF8] bg-[#E6F7FD] text-[#00AEEF]"
                                >
                                    <HeroIcon className="h-7 w-7" />
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                                    {data.title}
                                </h1>
                            </div>

                            <p className="mt-6 text-lg text-[#666666] sm:text-xl leading-relaxed">{data.description}</p>

                            {/* CTA Buttons */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    onClick={handleApplyNow}
                                    className="group inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ease-out text-white bg-[#00AEEF] shadow-[0_2px_10px_rgba(0,174,239,0.18)] hover:-translate-y-0.5 hover:bg-[#008FCC] hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
                                >
                                    Apply Now
                                    <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 ease-out group-hover:translate-x-0.5" />
                                </button>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold border transition-all duration-300 ease-out border-[#D6EEF8] bg-white text-[#00AEEF] shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:bg-[#E6F7FD] hover:border-[#00AEEF]/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
                                >
                                    Talk to Expert
                                </Link>
                            </div>
                        </div>

                        {/* Right Info Cards */}
                        {(data.interestRate || data.maxAmount || data.tenure) && (
                            <div className="flex flex-col gap-4 lg:min-w-fit">
                                {data.interestRate && (
                                    <div
                                        className="flex items-center gap-4 rounded-[20px] bg-white border border-[#D6EEF8] p-6 text-[#1A1A1A] group transition-all duration-300 ease-out shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-[#00AEEF]"
                                    >
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 bg-[#E6F7FD] border border-[#D6EEF8] text-[#00AEEF]"
                                        >
                                            <Percent className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#666666] font-medium">Interest Rate</p>
                                            <p className="text-2xl font-bold mt-1">{data.interestRate}</p>
                                        </div>
                                    </div>
                                )}

                                {data.maxAmount && (
                                    <div
                                        className="flex items-center gap-4 rounded-[20px] bg-white border border-[#D6EEF8] p-6 text-[#1A1A1A] group transition-all duration-300 ease-out shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-[#00AEEF]"
                                    >
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 bg-[#E6F7FD] border border-[#D6EEF8] text-[#00AEEF]"
                                        >
                                            <Banknote className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#666666] font-medium">Maximum Amount</p>
                                            <p className="text-2xl font-bold mt-1">{data.maxAmount}</p>
                                        </div>
                                    </div>
                                )}

                                {data.tenure && (
                                    <div
                                        className="flex items-center gap-4 rounded-[20px] bg-white border border-[#D6EEF8] p-6 text-[#1A1A1A] group transition-all duration-300 ease-out shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-[#00AEEF]"
                                    >
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 bg-[#E6F7FD] border border-[#D6EEF8] text-[#00AEEF]"
                                        >
                                            <Calendar className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#666666] font-medium">Tenure</p>
                                            <p className="text-2xl font-bold mt-1">{data.tenure}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Three Main Sections */}
            <EligibilitySection id="criteria" criteria={data.eligibility} />
            <BenefitsSection id="benefits" benefits={data.benefits} />
            <DocumentsSection id="document" documents={data.documents} />

            {/* Final CTA Section */}
            <section
                className="py-16 lg:py-24 text-center border-t"
                style={{
                    backgroundColor: "rgba(39, 150, 202, 0.05)",
                    borderColor: "rgba(39, 150, 202, 0.1)"
                }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Apply now and get a decision within 24 hours. Our team is here to help you every step of the way.
                    </p>
                    <button
                        onClick={handleApplyNow}
                        className="group inline-flex items-center justify-center rounded-xl bg-[#00AEEF] px-8 py-3.5 font-semibold text-white shadow-[0_2px_10px_rgba(0,174,239,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#008FCC] hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)]"
                    >
                        Apply Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 ease-out group-hover:translate-x-0.5" />
                    </button>
                </div>
            </section>

            {/* Modal */}
            <BusinessLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  />
        </div>
    );
}