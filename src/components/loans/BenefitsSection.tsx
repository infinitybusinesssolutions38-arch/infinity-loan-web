"use client";

import { useEffect, useRef, useState } from "react";

import type { Benefit } from "@/data/loanDetails";

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
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
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Key Benefits</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  group relative rounded-2xl bg-card p-6 shadow-lg transition-all duration-500
                  ${visibleItems.has(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  hover:shadow-xl hover:-translate-y-2
                `}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 group-hover:shadow-glow-accent">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-muted-foreground">{benefit.description}</p>

                  <div className="mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
