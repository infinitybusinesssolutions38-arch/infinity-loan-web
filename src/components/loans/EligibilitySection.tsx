"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Shield } from "lucide-react";

import type { EligibilityCriteria } from "@/data/loanDetails";

interface EligibilitySectionProps {
  criteria: EligibilityCriteria[];
  id: string;
}

export default function EligibilitySection({
  criteria,
  id,
}: EligibilitySectionProps) {
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
    <section
      className="relative overflow-hidden bg-white py-14 lg:py-20"
      id={id}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-12"
          style={{ backgroundColor: "#2796CA" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#2796CA" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-6">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#2796CA" }}
            >
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Eligibility Criteria
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Check if you qualify for this loan. Meeting these criteria improves
            your approval chances.
          </p>
        </div>

        {/* Criteria Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={`
                group relative overflow-hidden rounded-[20px] border p-6 transition-all duration-300 ease-out
                ${visibleItems.has(idx)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                }
                hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]
              `}
              style={{
                transitionDelay: `${idx * 100}ms`,
                borderColor: item.highlight ? "#2796CA" : "rgba(39, 150, 202, 0.15)",
                backgroundColor: item.highlight
                  ? "rgba(39, 150, 202, 0.05)"
                  : "rgba(39, 150, 202, 0.02)",
              }}
            >
              {/* Accent Top Border */}
              <div
                className="absolute left-0 top-0 h-1 rounded-t-[20px] transition-all duration-300 ease-out group-hover:w-full"
                style={{
                  backgroundColor: "#2796CA",
                  width: item.highlight ? "100%" : "24px",
                }}
              />

              {/* Important Badge */}
              {item.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full border border-[#B3E8FA] bg-[#E6F7FD] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00AEEF]">
                    Important
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Icon Container */}
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ease-out"
                  style={{
                    backgroundColor: item.highlight
                      ? "#2796CA"
                      : "rgba(39, 150, 202, 0.1)",
                    color: item.highlight ? "white" : "#2796CA",
                  }}
                >
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Glow Effect on Hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, rgba(39, 150, 202, 0.1) 0%, transparent 100%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div
          className="mt-12 rounded-[20px] border p-7 lg:mt-14 lg:p-8"
          style={{
            backgroundColor: "rgba(39, 150, 202, 0.08)",
            borderColor: "rgba(39, 150, 202, 0.2)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#2796CA" }}
            >
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                How to improve your approval chances?
              </h3>
              <p className="text-slate-600 text-sm">
                Ensure all your documents are accurate and up-to-date. If you
                don't meet all criteria, our team can discuss alternative loan
                options that might suit your needs better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { CheckCircle2 } from "lucide-react";

// import type { EligibilityCriteria } from "@/data/loanDetails";

// interface EligibilitySectionProps {
//     criteria: EligibilityCriteria[];
//     id: string;
// }

// export default function EligibilitySection({ criteria,id }: EligibilitySectionProps) {
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
//   }, [criteria]);

//   return (
//     <section className="py-12 lg:py-16" id={id} >
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//             Eligibility Criteria
//           </h2>
//           <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
//             Check if you qualify for this loan. Meeting these criteria improves your approval chances.
//           </p>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {criteria.map((item, idx) => (
//             <div
//               key={idx}
//               ref={(el) => {
//                 itemRefs.current[idx] = el;
//               }}
//               className={`
//                 group relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-500
//                 ${item.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card"}
//                 ${visibleItems.has(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//                 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1
//               `}
//               style={{ transitionDelay: `${idx * 100}ms` }}
//             >
//               {item.highlight && (
//                 <div className="absolute top-3 right-3">
//                   <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
//                     Important
//                   </span>
//                 </div>
//               )}

//               <div className="flex items-start gap-4">
//                 <div
//                   className={`
//                   flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300
//                   ${
//                     item.highlight
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
//                   }
//                 `}
//                 >
//                   <CheckCircle2 className="h-5 w-5" />
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
//                   <p className="mt-1 text-muted-foreground">{item.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
