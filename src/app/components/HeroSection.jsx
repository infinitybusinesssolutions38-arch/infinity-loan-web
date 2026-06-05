"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AUTOPLAY_MS = 4000;

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ArrowIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
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
  );
}

export default function HeroSection({
  badgeText = "Trusted by 5L+ customers",
  headline = "Get Your Loan Approved in",
  headlineEmphasis = "24 Hours",
  subheading =
    "Quick approvals, competitive interest rates, and hassle-free documentation. Your financial goals are just one application away.",
  primaryCta = { href: "/register/borrower/personal", label: "Personal Loan" },
  secondaryCta = { href: "/register/borrower/business", label: "Business Loan" },
  stats = [],
  className,
}) {
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
  const isPausedRef = useRef(false);

  const goTo = useCallback(
    (nextIndex) => {
      const len = slides.length;
      const safe = ((nextIndex % len) + len) % len;
      setActiveIndex(safe);
    },
    [slides.length]
  );

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (isPausedRef.current) return;
      next();
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(id);
    };
  }, [next]);

  const onMouseEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);
  const onMouseLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [next, prev]
  );

  const hasPrimary = Boolean(primaryCta?.href && primaryCta?.label);
  const hasSecondary = Boolean(secondaryCta?.href && secondaryCta?.label);

  return (
    <section
      className={cx("relative overflow-hidden bg-[#F7F9FC]", className)}
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
              className={cx(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,174,239,0.22),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,174,239,0.14),transparent_60%)]" />
              <div className="absolute inset-0 bg-white/58" />
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="container-custom">
          <div className="flex min-h-[500px] items-center py-12 sm:min-h-[600px] sm:py-16 lg:min-h-[700px] lg:py-20">
            <div className="mx-auto w-full max-w-3xl text-center">
              {badgeText ? (
                <div className="inline-flex items-center rounded-full border border-[#B3E8FA] bg-[#E6F7FD] px-4 py-2 text-sm font-semibold text-[#00AEEF] shadow-[0_2px_8px_rgba(0,174,239,0.1)]">
                  {badgeText}
                </div>
              ) : null}

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                {headline}
                {headlineEmphasis ? (
                  <span className="text-[#00AEEF]"> {headlineEmphasis}</span>
                ) : null}
              </h1>

              {subheading ? (
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
                  {subheading}
                </p>
              ) : null}

              {(hasPrimary || hasSecondary) && (
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  {hasPrimary ? (
                    <Link
                      href={primaryCta.href}
                                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#00AEEF] bg-[#00AEEF] px-6 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(0,174,239,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#008FCC] hover:shadow-[0_10px_26px_rgba(0,174,239,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]/35 sm:w-auto"
                      aria-label={primaryCta.ariaLabel || primaryCta.label}
                    >
                      {primaryCta.label}
                      <ArrowIcon className="h-5 w-5" />
                    </Link>
                  ) : null}

                  {hasSecondary ? (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#B3E8FA] bg-white px-6 text-sm font-semibold text-[#00AEEF] shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#00AEEF]/35 hover:bg-[#F5FCFF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/25 sm:w-auto"
                      aria-label={secondaryCta.ariaLabel || secondaryCta.label}
                    >
                      {secondaryCta.label}
                      <ArrowIcon className="h-5 w-5" />
                    </Link>
                  ) : null}
                </div>
              )}

              {Array.isArray(stats) && stats.length > 0 ? (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[#4B5563]">
                  {stats.map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      {s.icon ? (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F7FD] text-[#00AEEF]">
                          {s.icon}
                        </span>
                      ) : null}
                      <span className="text-sm font-semibold">{s.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-10 flex items-center justify-center gap-2" aria-label="Slide pagination">
                {slides.map((_, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cx(
                        "h-2.5 w-2.5 rounded-full transition-all duration-300 ease-out",
                        isActive
                          ? "bg-[#00AEEF] shadow-[0_0_0_4px_rgba(0,174,239,0.16)]"
                          : "bg-[#BFD7F5] hover:bg-[#00AEEF]/60"
                      )}
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={isActive ? "true" : "false"}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-[#B3E8FA] bg-white px-3 py-2 text-sm font-semibold text-[#00AEEF] shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:border-[#00AEEF]/35 hover:bg-[#F5FCFF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/25 sm:left-4"
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
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-[#B3E8FA] bg-white px-3 py-2 text-sm font-semibold text-[#00AEEF] shadow-[0_4px_12px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:border-[#00AEEF]/35 hover:bg-[#F5FCFF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/25 sm:right-4"
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
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
