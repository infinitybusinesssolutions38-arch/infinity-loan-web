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
      className={cx("relative overflow-hidden", className)}
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
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex min-h-[520px] items-center py-14 sm:min-h-[620px] sm:py-20 lg:min-h-[720px]">
            <div className="mx-auto w-full max-w-3xl text-center">
              {badgeText ? (
                <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur">
                  {badgeText}
                </div>
              ) : null}

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {headline}
                {headlineEmphasis ? (
                  <span className="text-yellow-200"> {headlineEmphasis}</span>
                ) : null}
              </h1>

              {subheading ? (
                <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
                  {subheading}
                </p>
              ) : null}

              {(hasPrimary || hasSecondary) && (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  {hasPrimary ? (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
                      aria-label={primaryCta.ariaLabel || primaryCta.label}
                    >
                      {primaryCta.label}
                      <ArrowIcon className="h-5 w-5" />
                    </Link>
                  ) : null}

                  {hasSecondary ? (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
                      aria-label={secondaryCta.ariaLabel || secondaryCta.label}
                    >
                      {secondaryCta.label}
                      <ArrowIcon className="h-5 w-5" />
                    </Link>
                  ) : null}
                </div>
              )}

              {Array.isArray(stats) && stats.length > 0 ? (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/80">
                  {stats.map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      {s.icon ? (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
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
                        "h-2.5 w-2.5 rounded-full transition",
                        isActive
                          ? "bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]"
                          : "bg-white/40 hover:bg-white/70"
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
                onClick={next}
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
