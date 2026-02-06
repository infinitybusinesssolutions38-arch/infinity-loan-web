"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import type { EligibilityCriteria } from "@/data/loanDetails";

interface EligibilitySectionProps {
  criteria: EligibilityCriteria[];
}

export default function EligibilitySection({ criteria }: EligibilitySectionProps) {
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
  }, [criteria]);

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Eligibility Criteria
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Check if you qualify for this loan. Meeting these criteria improves your approval chances.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={`
                group relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-500
                ${item.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card"}
                ${visibleItems.has(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                hover:border-primary/50 hover:shadow-lg hover:-translate-y-1
              `}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item.highlight && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Important
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300
                  ${
                    item.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
                  }
                `}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
