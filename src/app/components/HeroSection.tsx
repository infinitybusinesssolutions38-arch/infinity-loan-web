"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    Shield,
    TrendingDown,
    FileText,
    Users,
    Building2,
    User,
    ChevronRight,
    Sparkles,
} from "lucide-react";

const AUTOPLAY_MS = 4000;

const HeroSection: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const slides = useMemo(
        () => [
            { src: "/home-img/home1.jpeg", alt: "Fintech services" },
            { src: "/home-img/home2.jpeg", alt: "Digital lending" },
            { src: "/home-img/home3.jpeg", alt: "Financial inclusion" },
            { src: "/home-img/home4.jpeg", alt: "Secure payments" },
        ],
        []
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);

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

    const nextSlide = useCallback(() => {
        setActiveIndex((i) => (i + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = useCallback(
        (index: number) => {
            const len = slides.length;
            const safe = ((index % len) + len) % len;
            setActiveIndex(safe);
        },
        [slides.length]
    );

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            if (isPausedRef.current) return;
            nextSlide();
        }, AUTOPLAY_MS);

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [nextSlide]);

    const onMouseEnter = useCallback(() => {
        isPausedRef.current = true;
    }, []);
    const onMouseLeave = useCallback(() => {
        isPausedRef.current = false;
    }, []);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevSlide();
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                nextSlide();
            }
        },
        [nextSlide, prevSlide]
    );

    const personalHref =
        isAuthenticated === false
            ? "/login?next=/register/borrower/personal"
            : "/register/borrower/personal";
    const businessHref =
        isAuthenticated === false
            ? "/login?next=/register/borrower/business"
            : "/register/borrower/business";

    return (
        <div>
            <section
                className="relative overflow-hidden"
                aria-roledescription="carousel"
                aria-label="Hero carousel"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className="absolute inset-0"
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    aria-label="Hero carousel. Use left and right arrow keys to change slides."
                >
                    {slides.map((slide, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <div
                                key={slide.src}
                                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                                    isActive ? "opacity-100" : "opacity-0"
                                }`}
                                aria-hidden={!isActive}
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    priority={i === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
                            </div>
                        );
                    })}
                </div>

                <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">Trusted by 5L+ customers</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                            Get Your Loan Approved in {" "}
                            <span className="text-yellow-200">24 Hours</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Quick approvals, competitive interest rates, and hassle-free documentation.
                            Your financial goals are just one application away.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild className="h-11 px-7 text-base bg-white text-blue-700 hover:bg-white/90">
                                <Link href={personalHref}>
                                    Personal Loan
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="h-11 px-7 text-base border-white/40 text-white bg-white/10 hover:bg-white/15 hover:text-white"
                            >
                                <Link href={businessHref}>
                                    Business Loan
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-12">
                            <div className="flex items-center gap-2 text-white/70">
                                <Shield className="w-5 h-5" />
                                <span className="text-sm">RBI Registered</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm">24h Approval</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                                <TrendingDown className="w-5 h-5" />
                                <span className="text-sm">Low Interest Rates</span>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-2" aria-label="Slide pagination">
                            {slides.map((_, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        className={`h-2.5 w-2.5 rounded-full transition ${
                                            isActive
                                                ? "bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]"
                                                : "bg-white/40 hover:bg-white/70"
                                        }`}
                                        onClick={() => goToSlide(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        aria-current={isActive ? "true" : "false"}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                            aria-label="Previous slide"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                <path
                                    d="M19 12H7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="m11 6-6 6 6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                            aria-label="Next slide"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                <path
                                    d="M5 12h12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="m13 6 6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff" />
                    </svg>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Loan Type</h2>
                        <p className="text-gray-600 text-lg">We offer tailored loan solutions for your personal and business needs</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Link
                            href={personalHref}
                            className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-lg border border-gray-200/70 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Personal Loan</h3>
                            <p className="text-gray-600 mb-6">
                                For medical emergencies, education, home renovation, or any personal need.
                                Get up to ₹20 Lakhs with flexible EMI options.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Interest from 10.5% p.a.
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Tenure up to 60 months
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Minimal documentation
                                </li>
                            </ul>
                            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                                Apply Now <ChevronRight className="w-4 h-4" />
                            </span>
                        </Link>

                        <Link
                            href={businessHref}
                            className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-lg border border-gray-200/70 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Loan</h3>
                            <p className="text-gray-600 mb-6">
                                Fuel your business growth with our flexible loan options.
                                Get up to ₹50 Lakhs for working capital, expansion, or machinery.
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Interest from 12% p.a.
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Tenure up to 84 months
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Collateral-free options
                                </li>
                            </ul>
                            <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                                Apply Now <ChevronRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
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
                            <div key={item.step} className="relative text-center">
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200" />
                                )}
                                <div className="relative z-10 w-24 h-24 bg-white rounded-full shadow-md mx-auto mb-4 flex items-center justify-center border-4 border-blue-100">
                                    <item.icon className="w-10 h-10 text-blue-600" />
                                </div>
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
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
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white rounded-xl p-6 shadow-md border border-gray-200/70 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 p-8 lg:p-16 text-center">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                        <div className="relative z-10 max-w-2xl mx-auto text-white">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-white/80 text-lg mb-8">
                                Apply now and take the first step towards achieving your financial goals.
                                Our team is ready to help you every step of the way.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild className="h-11 px-7 text-base bg-white text-blue-700 hover:bg-white/90">
                                    <Link href={personalHref}>Apply for Personal Loan</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="h-11 px-7 text-base border-white/40 text-white bg-white/10 hover:bg-white/15 hover:text-white"
                                >
                                    <Link href={businessHref}>Apply for Business Loan</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
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
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200/70">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
