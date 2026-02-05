"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import EMICalculator from "@/components/EmiCalculator";
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    Briefcase,
    Car,
    Globe,
    Landmark,
    BadgeCheck,
    Shield,
    TrendingDown,
    FileText,
    Users,
    Building2,
    Banknote,
    Handshake,
    User,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import BankLogosSlider from "./BankInfinte";

const HeroSection: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [enquiry, setEnquiry] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        message: "",
    });
    const [enquiryLoading, setEnquiryLoading] = useState(false);
    const [enquiryError, setEnquiryError] = useState<string | null>(null);
    const [enquirySuccess, setEnquirySuccess] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                setIsAuthenticated(!!res.data?.user);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkUser();
    }, []);

    const personalHref =
        isAuthenticated === false
            ? "/login?next=/register/borrower/personal"
            : "/register/borrower/personal";
    const businessHref =
        isAuthenticated === false
            ? "/login?next=/register/borrower/business"
            : "/register/borrower/business";

    const whatsappHref = "https://wa.me/919579880841?text=" + encodeURIComponent("Hi, I want to apply for a loan. Please call me back.");

    const submitEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnquiryError(null);
        setEnquirySuccess(false);

        if (!enquiry.firstname.trim() || !enquiry.lastname.trim() || !enquiry.email.trim() || !enquiry.mobile.trim() || !enquiry.message.trim()) {
            setEnquiryError("Please fill all fields.");
            return;
        }

        setEnquiryLoading(true);
        try {
            await axios.post("/api/contact", {
                ...enquiry,
                subject: "Homepage Enquiry",
            });
            setEnquirySuccess(true);
            setEnquiry({ firstname: "", lastname: "", email: "", mobile: "", message: "" });
        } catch {
            setEnquiryError("Something went wrong. Please try again.");
        } finally {
            setEnquiryLoading(false);
        }
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 opacity-95" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

                {/* Animated floating elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
                    <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
                        <div className="max-w-3xl mx-auto text-center text-white lg:max-w-none lg:text-left animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-down">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span className="text-sm font-medium">Trusted by 5L+ customers</span>
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up delay-100">
                                Get Your Loan Approved in{" "}
                                <span className="text-yellow-200 inline-block animate-bounce-subtle">24 Hours</span>
                            </h1>

                            <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
                                Quick approvals, competitive interest rates, and hassle-free documentation.
                                Your financial goals are just one application away.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
                                <Button asChild className="h-11 px-7 text-base bg-white text-blue-700 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <Link href={personalHref}>
                                        Personal Loan
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="h-11 px-7 text-base border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <Link href={businessHref}>
                                        Business Loan
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="h-11 px-7 text-base border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <Link href={whatsappHref} target="_blank" rel="noreferrer">
                                        WhatsApp
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-12 animate-fade-in-up delay-400">
                                <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                                    <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">RBI Registered</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                                    <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">24h Approval</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
                                    <TrendingDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm">Low Interest Rates</span>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-md rounded-2xl bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/20 animate-fade-in-left hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                            <h3 className="text-lg font-semibold">Quick Enquiry</h3>
                            <p className="mt-1 text-sm text-white/75">
                                Share your details and we'll call you back.
                            </p>

                            <form onSubmit={submitEnquiry} className="mt-5 space-y-3">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <input
                                        value={enquiry.firstname}
                                        onChange={(e) => setEnquiry((p) => ({ ...p, firstname: e.target.value }))}
                                        placeholder="First name"
                                        className="h-10 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                                    />
                                    <input
                                        value={enquiry.lastname}
                                        onChange={(e) => setEnquiry((p) => ({ ...p, lastname: e.target.value }))}
                                        placeholder="Last name"
                                        className="h-10 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                                    />
                                </div>

                                <input
                                    value={enquiry.email}
                                    onChange={(e) => setEnquiry((p) => ({ ...p, email: e.target.value }))}
                                    placeholder="Email"
                                    type="email"
                                    className="h-10 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                                />

                                <input
                                    value={enquiry.mobile}
                                    onChange={(e) => setEnquiry((p) => ({ ...p, mobile: e.target.value }))}
                                    placeholder="Mobile"
                                    inputMode="numeric"
                                    className="h-10 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                                />

                                <textarea
                                    value={enquiry.message}
                                    onChange={(e) => setEnquiry((p) => ({ ...p, message: e.target.value }))}
                                    placeholder="What do you need help with?"
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none ring-0 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                                />

                                {enquiryError && <p className="text-xs text-red-200 animate-shake">{enquiryError}</p>}
                                {enquirySuccess && <p className="text-xs text-emerald-200 animate-fade-in">Thanks! We'll contact you shortly.</p>}

                                <button
                                    type="submit"
                                    disabled={enquiryLoading}
                                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-blue-700 transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {enquiryLoading ? "Submitting..." : "Request Callback"}
                                </button>

                                <div className="text-center">
                                    <Link href="/contact" className="text-xs text-white/75 underline underline-offset-4 hover:text-white transition-colors">
                                        Prefer details? Use full contact form
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff" />
                    </svg>
                </div>
            </section>

            {/* Company Overview Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div className="animate-fade-in-up">
                            <p className="text-sm font-semibold text-blue-600">Company Overview</p>
                            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
                                Experience, expertise, and end-to-end support
                            </h2>
                            <p className="mt-4 text-gray-600">
                                Infinity Loans helps individuals and MSMEs compare options, prepare documentation and apply faster.
                                We work with banks and NBFC partners to guide you through eligibility, paperwork and disbursal.
                            </p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {[
                                    { icon: BadgeCheck, title: "Expert Guidance", desc: "Profile review and product matching." },
                                    { icon: Handshake, title: "Partner Network", desc: "Multiple lender tie-ups for better fit." },
                                    { icon: Globe, title: "Service Coverage", desc: "Online assistance across India." },
                                    { icon: FileText, title: "Documentation Help", desc: "Checklist-driven, transparent process." },
                                ].map((item, index) => (
                                    <div 
                                        key={item.title} 
                                        className="rounded-xl border border-gray-200/70 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 group-hover:scale-110 transition-transform">
                                                <item.icon className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.title}</p>
                                                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200/70 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-8 shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in-left">
                            <p className="text-sm font-semibold text-gray-900">Industries we support</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Retail", "Manufacturing", "Services", "Trading", "Transport", "Healthcare", "Education"].map((t, index) => (
                                    <span 
                                        key={t} 
                                        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:scale-105 transition-all duration-300 cursor-default animate-fade-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow duration-300">
                                <p className="text-sm font-semibold text-gray-900">Need help choosing the right product?</p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Explore our categories and start an application in minutes.
                                </p>
                                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                    <Button asChild className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                                        <Link href="/services">Browse services</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                                        <Link href="/contact">Talk to an expert</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Highlights Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Services Highlights</h2>
                        <p className="text-gray-600 text-lg">Smart links to what you already offer — no fluff.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Banknote, title: "Loan Services", desc: "Business, personal, property, vehicle and more.", href: "/services/loans" },
                            { icon: Building2, title: "Government Schemes", desc: "Mudra, Stand-Up India, CGTMSE and more.", href: "/services/government-schemes" },
                            { icon: Shield, title: "Insurance", desc: "Life, health, motor, home and business coverage.", href: "/services/insurance" },
                            { icon: Clock, title: "Tools", desc: "EMI calculator and eligibility guidance.", href: "/services/tools" },
                        ].map((item, index) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                                    <item.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                                    View details <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Government Scheme Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div className="animate-fade-in-up">
                            <p className="text-sm font-semibold text-blue-600">Government Scheme Highlights</p>
                            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">Subsidy & scheme-backed support</h2>
                            <p className="mt-4 text-gray-600">
                                Explore popular government-backed programs and understand eligibility before applying. We help you with documentation and submission.
                            </p>

                            <ul className="mt-6 space-y-3">
                                {[
                                    "PM Mudra Loan (Shishu, Kishor, Tarun)",
                                    "Stand-Up India for women & SC/ST entrepreneurs",
                                    "CGTMSE collateral-free MSME loans",
                                    "PSB Loans in 59 Minutes guidance",
                                ].map((t, index) => (
                                    <li 
                                        key={t} 
                                        className="flex items-start gap-2 text-sm text-gray-700 animate-fade-in-right"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 animate-scale-in" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button asChild className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                                    <Link href="/services/government-schemes">Explore schemes</Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                                    <Link href="/register?service=pm-mudra-loan">Apply now</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200/70 bg-gray-50 p-8 animate-fade-in-left hover:shadow-lg transition-shadow duration-500">
                            <p className="text-sm font-semibold text-gray-900">Eligibility highlights</p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                {[
                                    { title: "Business profile", desc: "MSME/entrepreneur eligibility varies by scheme." },
                                    { title: "Documentation", desc: "KYC + business proof + bank statements." },
                                    { title: "Credit fit", desc: "Partner policies apply for approval." },
                                    { title: "Turnaround", desc: "Guidance to reduce delays and rework." },
                                ].map((c, index) => (
                                    <div 
                                        key={c.title} 
                                        className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <p className="font-semibold text-gray-900">{c.title}</p>
                                        <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loan Categories Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loan Categories Overview</h2>
                        <p className="text-gray-600 text-lg">Pick a category and jump into the right service page.</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {[
                            { icon: Briefcase, title: "Business Loan", desc: "MSME, working capital, machinery and more.", href: "/services/loans" },
                            { icon: Landmark, title: "Property Loan", desc: "Home loan & loan against property options.", href: "/services/loans" },
                            { icon: User, title: "Personal Loan", desc: "Personal, instant, medical and education loans.", href: "/services/loans" },
                            { icon: Car, title: "Vehicle Loan", desc: "Car, two-wheeler, commercial and EV loans.", href: "/services/loans" },
                            { icon: Building2, title: "Agriculture / Priority Sector", desc: "Guidance for sector-focused lending & schemes.", href: "/services/government-schemes" },
                            { icon: Building2, title: "Government Scheme Loan", desc: "Mudra, CGTMSE, Stand-Up India and more.", href: "/services/government-schemes" },
                        ].map((c, index) => (
                            <Link 
                                key={c.title} 
                                href={c.href} 
                                className="group rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                                    <c.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{c.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                                    Explore <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMI Calculator Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loan Calculator Section</h2>
                        <p className="text-gray-600 text-lg">Calculate your EMI and then apply with confidence.</p>
                    </div>

                    <div className="rounded-3xl border border-gray-200/70 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-500 animate-fade-in-up">
                        <EMICalculator />
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {[
                            { title: "Loan Eligibility Checker", desc: "Share basic details and we'll guide you to the right product.", href: "/contact?tool=loan-eligibility" },
                            { title: "Subsidy / Scheme Guidance", desc: "Explore scheme programs and get help with documentation.", href: "/services/government-schemes" },
                        ].map((item, index) => (
                            <Link 
                                key={item.title}
                                href={item.href} 
                                className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <p className="font-semibold text-gray-900">{item.title}</p>
                                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                                    {item.title.includes("Eligibility") ? "Check eligibility" : "View schemes"} <ChevronRight className="h-4 w-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Required Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                        <div className="animate-fade-in-up">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Documents Required</h2>
                            <p className="mt-3 text-gray-600">
                                Keep these ready for faster processing. Exact requirements depend on product and lender.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { title: "Loan Documents", items: ["KYC (PAN/Aadhaar)", "Bank statements", "Income proof"] },
                                { title: "Business / Registration", items: ["GST / Udyam", "Business proof", "ITR & financials"] },
                                { title: "Property / Collateral", items: ["Property papers", "Valuation details", "Existing loan details"] },
                                { title: "Scheme Requirements", items: ["Scheme-specific forms", "Project details", "Eligibility proofs"] },
                            ].map((box, index) => (
                                <div 
                                    key={box.title} 
                                    className="rounded-2xl border border-gray-200/70 bg-gray-50 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <p className="font-semibold text-gray-900">{box.title}</p>
                                    <ul className="mt-3 space-y-2">
                                        {box.items.map((t, i) => (
                                            <li 
                                                key={t} 
                                                className="flex items-start gap-2 text-sm text-gray-700 animate-fade-in-right"
                                                style={{ animationDelay: `${(index * 100) + (i * 50)}ms` }}
                                            >
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                                                <span>{t}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Success & Achievements Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div className="animate-fade-in-up">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Success & Achievements</h2>
                            <p className="mt-3 text-gray-600">A snapshot of the scale and trust we've built.</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                { title: "Loans processed", value: "10K+" },
                                { title: "Happy clients", value: "5L+" },
                                { title: "Partner lenders", value: "50+" },
                            ].map((s, index) => (
                                <div 
                                    key={s.title} 
                                    className="rounded-2xl border border-gray-200/70 bg-white p-6 text-center shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <p className="text-3xl font-extrabold text-blue-700 animate-counter">{s.value}</p>
                                    <p className="mt-2 text-sm font-medium text-gray-700">{s.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Testimonials Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
                        <p className="text-gray-600 text-lg">Real experiences from borrowers and MSMEs.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { name: "Amit S.", role: "Business Loan", quote: "Fast guidance and clear documentation checklist. The process felt smooth." },
                            { name: "Neha P.", role: "Personal Loan", quote: "Quick response and helpful support. Got clarity on eligibility and next steps." },
                            { name: "Rahul K.", role: "MSME Scheme", quote: "Good guidance for scheme selection and paperwork. Saved a lot of time." },
                        ].map((t, index) => (
                            <div 
                                key={t.name} 
                                className="rounded-2xl border border-gray-200/70 bg-gray-50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <p className="text-sm text-gray-700 italic">"{t.quote}"</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="font-semibold text-gray-900">{t.name}</p>
                                    <p className="text-xs font-medium text-blue-600">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bank & NBFC Partners Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Bank & NBFC Partners</h2>
                        <p className="text-gray-600 text-lg">We work with multiple partners to find the best fit for your profile.</p>
                    </div>

                    <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200/70 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-500 animate-fade-in-up">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {["Banks", "NBFCs", "Fintech partners", "Scheme partners"].map((p, index) => (
                                <span 
                                    key={p} 
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-blue-300 hover:bg-blue-50 hover:scale-105 transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Handshake className="h-4 w-4 text-blue-600" />
                                    {p}
                                </span>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-xs text-gray-500">
                            Partner availability depends on location and eligibility.
                        </p>
                    </div>
                </div>

<BankLogosSlider />
               
            </section>

            {/* Latest Updates Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                        <div className="animate-fade-in-up">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Updates</h2>
                            <p className="mt-3 text-gray-600">
                                Updates and guidance mapped to your current services.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            {[
                                { title: "Government schemes to explore for MSMEs", href: "/services/government-schemes" },
                                { title: "Compare loan categories before applying", href: "/services/loans" },
                                { title: "Use tools like EMI calculator to plan affordability", href: "/services/tools" },
                            ].map((u, index) => (
                                <Link 
                                    key={u.title} 
                                    href={u.href} 
                                    className="group rounded-2xl border border-gray-200/70 bg-gray-50 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{u.title}</p>
                                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                                        Read more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Area / Coverage Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div className="animate-fade-in-up">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Service Area / Coverage</h2>
                            <p className="mt-3 text-gray-600">Online consultation and assisted processing across India.</p>

                            <div className="mt-6 rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-3">
                                    <Globe className="mt-1 h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Pan-India assistance</p>
                                        <p className="mt-1 text-sm text-gray-600">Share your city/state and we'll guide the next steps remotely.</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                    <Button asChild className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                                        <Link href="/contact">Get a callback</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                                        <Link href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200/70 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-500 animate-fade-in-left">
                            <h3 className="text-lg font-semibold text-gray-900">Trust & Security</h3>
                            <div className="mt-4 space-y-3">
                                {[
                                    { title: "Data privacy assurance", desc: "We handle your information responsibly." },
                                    { title: "Confidential documentation", desc: "Only required documents are collected." },
                                    { title: "Secure application process", desc: "Partner-aligned verification and tracking." },
                                ].map((i, index) => (
                                    <div 
                                        key={i.title} 
                                        className="flex items-start gap-3 animate-fade-in-right"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <Shield className="mt-0.5 h-5 w-5 text-emerald-600" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{i.title}</p>
                                            <p className="mt-1 text-sm text-gray-600">{i.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-600 text-lg">Get your loan approved in 4 simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { step: 1, title: "Apply Online", desc: "Fill in the application form with your details", icon: FileText },
                            { step: 2, title: "Upload Documents", desc: "Submit required documents digitally", icon: CheckCircle2 },
                            { step: 3, title: "Quick Verification", desc: "Our team verifies your application", icon: Clock },
                            { step: 4, title: "Get Approved", desc: "Receive funds directly in your account", icon: TrendingDown },
                        ].map((item, index) => (
                            <div 
                                key={item.step} 
                                className="relative text-center animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-blue-300" />
                                )}
                                <div className="relative z-10 w-24 h-24 bg-white rounded-full shadow-lg mx-auto mb-4 flex items-center justify-center border-4 border-blue-100 hover:scale-110 hover:shadow-xl transition-all duration-300 group">
                                    <item.icon className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-3 animate-bounce-subtle">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Fortune Loan?</h2>
                        <p className="text-gray-600 text-lg">Experience the difference with our customer-first approach</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: Clock, title: "Quick Approval", desc: "Get your loan approved within 24 hours of application submission" },
                            { icon: TrendingDown, title: "Low Interest Rates", desc: "Competitive interest rates starting from 10.5% p.a. for eligible customers" },
                            { icon: Shield, title: "Secure Process", desc: "Your data is protected with bank-grade security and encryption" },
                            { icon: FileText, title: "Minimal Documentation", desc: "Simple digital documentation process with quick verification" },
                            { icon: Users, title: "Dedicated Support", desc: "24/7 customer support to assist you throughout the process" },
                            { icon: CheckCircle2, title: "Transparent Terms", desc: "No hidden charges. Clear and transparent loan terms" },
                        ].map((feature, index) => (
                            <div
                                key={feature.title}
                                className="bg-white rounded-xl p-6 shadow-md border border-gray-200/70 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 p-8 lg:p-16 text-center shadow-2xl animate-fade-in-up hover:shadow-3xl transition-shadow duration-500">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                        
                        {/* Animated particles */}
                        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
                            <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl animate-float-delayed" />
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto text-white">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-white/80 text-lg mb-8">
                                Apply now and take the first step towards achieving your financial goals.
                                Our team is ready to help you every step of the way.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild className="h-11 px-7 text-base bg-white text-blue-700 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg">
                                    <Link href={personalHref}>Apply for Personal Loan</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="h-11 px-7 text-base border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300"
                                >
                                    <Link href={businessHref}>Apply for Business Loan</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */} 

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                q: "What documents are required for a loan application?",
                                a: "For personal loans, you need PAN card, Aadhaar card, and bank statements. Business loans require additional documents like GST certificate and business registration proof.",
                            },
                            {
                                q: "How long does the approval process take?",
                                a: "Most applications are processed within 24 hours. Once approved, the amount is disbursed within 24-48 hours to your bank account.",
                            },
                            {
                                q: "What is the interest rate for loans?",
                                a: "Interest rates start from 10.5% p.a. for personal loans and 12% p.a. for business loans, depending on your credit profile and loan amount.",
                            },
                            {
                                q: "Is there any prepayment penalty?",
                                a: "No, we do not charge any prepayment or foreclosure charges. You can repay your loan anytime without any penalty.",
                            },
                        ].map((faq, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl p-6 shadow-md border border-gray-200/70 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
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

                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fade-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes scale-in {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-5px);
                    }
                    75% {
                        transform: translateX(5px);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(20px) translateX(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }

                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out forwards;
                }

                .animate-fade-in-left {
                    animation: fade-in-left 0.6s ease-out forwards;
                }

                .animate-fade-in-right {
                    animation: fade-in-right 0.6s ease-out forwards;
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out forwards;
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 7s ease-in-out infinite;
                }

                .delay-100 {
                    animation-delay: 100ms;
                }

                .delay-200 {
                    animation-delay: 200ms;
                }

                .delay-300 {
                    animation-delay: 300ms;
                }

                .delay-400 {
                    animation-delay: 400ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
};

export default HeroSection;