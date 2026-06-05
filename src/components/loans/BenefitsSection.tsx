"use client";

import { useEffect, useRef, useState } from "react";

import type { Benefit } from "@/data/loanDetails";

interface BenefitsSectionProps {
  benefits: Benefit[];
  id: string;
}

export default function BenefitsSection({ benefits, id }: BenefitsSectionProps) {
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
      className="relative overflow-hidden py-14 lg:py-20"
      style={{ backgroundColor: "#f8fafb" }}
      id={id}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -right-40 h-80 w-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#2796CA" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#2796CA" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Key Benefits
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Why thousands of customers trust us for their financial needs
          </p>
        </div>

        {/* Benefits Grid */}
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
                  group relative rounded-[20px] border bg-white p-6 sm:p-7 transition-all duration-300 ease-out
                  ${
                    visibleItems.has(idx)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }
                  hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]
                `}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  borderColor: "rgba(39, 150, 202, 0.15)",
                  borderWidth: "1px",
                }}
              >
                {/* Gradient Overlay on Hover */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, rgba(39, 150, 202, 0.08) 0%, transparent 100%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Background Accent */}
                <div
                  className="absolute right-0 top-0 h-32 w-32 rounded-bl-[20px] opacity-5 transition-all duration-300 ease-out group-hover:opacity-10"
                  style={{ backgroundColor: "#2796CA" }}
                />

                <div className="relative">
                  {/* Icon Container */}
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ease-out"
                    style={{
                      backgroundColor: "rgba(39, 150, 202, 0.1)",
                      color: "#2796CA",
                    }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl font-bold text-slate-900 transition-all duration-300 ease-out">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div
                    className="mt-4 h-1 w-8 rounded-full transition-all duration-300 ease-out group-hover:w-16"
                    style={{ backgroundColor: "#2796CA" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div
          className="mt-14 rounded-[20px] border p-7 text-center lg:p-10"
          style={{
            backgroundColor: "rgba(39, 150, 202, 0.05)",
            borderColor: "rgba(39, 150, 202, 0.2)",
          }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Ready to Experience These Benefits?
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            financial journey with our comprehensive loan solutions.
          </p>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";

// import type { Benefit } from "@/data/loanDetails";

// interface BenefitsSectionProps {
//     benefits: Benefit[];
//     id: string;
// }

// export default function BenefitsSection({ benefits ,id}: BenefitsSectionProps) {
//   const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
//   const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const observers: IntersectionObserver[] = [];

//     itemRefs.current.forEach((ref, index) => {
//       if (!ref) return;

//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               setVisibleItems((prev) => new Set([...prev, index]));
//             }
//           });
//         },
//         { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
//       );

//       observer.observe(ref);
//       observers.push(observer);
//     });

//     return () => observers.forEach((obs) => obs.disconnect());
//   }, [benefits]);

//   return (
//     <section className="py-12 lg:py-16 bg-secondary/30" id={id}>
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Key Benefits</h2>
//           <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
//             Why thousands of customers trust us for their financial needs
//           </p>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {benefits.map((benefit, idx) => {
//             const Icon = benefit.icon;
//             return (
//               <div
//                 key={idx}
//                 ref={(el) => {
//                   itemRefs.current[idx] = el;
//                 }}
//                 className={`
//                   group relative rounded-2xl bg-card p-6 shadow-lg transition-all duration-500
//                   ${visibleItems.has(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//                   hover:shadow-xl hover:-translate-y-2
//                 `}
//                 style={{ transitionDelay: `${idx * 100}ms` }}
//               >
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

//                 <div className="relative">
//                   <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 group-hover:shadow-glow-accent">
//                     <Icon className="h-7 w-7" />
//                   </div>

//                   <h3 className="mt-5 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
//                     {benefit.title}
//                   </h3>

//                   <p className="mt-2 text-muted-foreground">{benefit.description}</p>

//                   <div className="mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500 group-hover:w-full" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
