"use client";

import { useEffect, useRef, useState } from "react";

import type { Benefit } from "@/data/loanDetails";

interface BenefitsSectionProps {
  benefits: Benefit[];
  variant?: "default" | "personal";
  anchorId?: string;
}

export default function BenefitsSection({ benefits, variant = "default", anchorId }: BenefitsSectionProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [benefits]);

  return (
    <section
      id={anchorId}
      className={`py-12 lg:py-16 ${variant === "personal" ? "bg-black" : "bg-secondary/30"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl ${
              variant === "personal" ? "text-white" : "text-foreground"
            }`}
          >
            Key Benefits
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              variant === "personal" ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            Why thousands of customers trust us for their financial needs
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={`
                  group relative rounded-2xl p-6 shadow-lg transition-all duration-500
                  ${variant === "personal" ? "bg-white/5 border border-white/10" : "bg-card"}
                  ${visibleItems.has(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  ${variant === "personal" ? "hover:border-[#0099D8]/40 hover:shadow-[0_0_0_1px_rgba(0,153,216,0.18),0_20px_60px_-20px_rgba(0,153,216,0.35)]" : "hover:shadow-xl"}
                  hover:-translate-y-2
                `}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${
                    variant === "personal" ? "bg-gradient-to-br from-[#0099D8]/0 to-white/0" : "bg-gradient-to-br from-accent/0 to-primary/0"
                  }`}
                />

                <div className="relative">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      variant === "personal"
                        ? "bg-[#0099D8]/15 text-[#0099D8] group-hover:bg-[#0099D8] group-hover:text-black"
                        : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-glow-accent"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3
                    className={`mt-5 text-xl font-bold transition-colors duration-300 ${
                      variant === "personal" ? "text-white group-hover:text-[#0099D8]" : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {benefit.title}
                  </h3>

                  <p className={`mt-2 ${variant === "personal" ? "text-white/70" : "text-muted-foreground"}`}>
                    {benefit.description}
                  </p>

                  <div
                    className={`mt-4 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full ${
                      variant === "personal"
                        ? "bg-gradient-to-r from-[#0099D8] to-white/40"
                        : "bg-gradient-to-r from-accent to-primary"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
