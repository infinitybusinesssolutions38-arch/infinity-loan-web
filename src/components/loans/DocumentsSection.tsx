"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileText, AlertCircle, CheckCircle2 } from "lucide-react";

import type { Document } from "@/data/loanDetails";
import { Badge } from "@/components/ui/badge";

interface DocumentsSectionProps {
    documents: Document[];
    id: string;
}

export default function DocumentsSection({
    documents,
    id,
}: DocumentsSectionProps) {
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
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
    }, [documents]);

    const toggleCheck = (idx: number) => {
        setCheckedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(idx)) {
                newSet.delete(idx);
            } else {
                newSet.add(idx);
            }
            return newSet;
        });
    };

    const requiredDocs = documents.filter((d) => d.required);
    const optionalDocs = documents.filter((d) => !d.required);

    return (
        <section
            className="relative overflow-hidden bg-white py-14 lg:py-20"
            id={id}
        >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-3xl opacity-12"
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
                            <FileText className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Required Documents
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Keep these documents ready for a smooth and quick application
                        process
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-10">
                    {/* Mandatory Documents Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "#2796CA" }}
                            >
                                <AlertCircle className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">
                                Mandatory Documents
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {requiredDocs.map((doc, idx) => (
                                <div
                                    key={idx}
                                    ref={(el) => {
                                        itemRefs.current[idx] = el;
                                    }}
                                    onClick={() => toggleCheck(idx)}
                    className={`
                    group flex cursor-pointer items-start gap-4 rounded-[20px] border p-5 transition-all duration-300 ease-out sm:p-6
                    ${visibleItems.has(idx)
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                        }
                    ${checkedItems.has(idx)
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                        }
                    hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]
                  `}
                                    style={{ transitionDelay: `${idx * 80}ms` }}
                                >
                                    {/* Checkbox */}
                                    <div
                                        className={`
                    mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ease-out
                    ${checkedItems.has(idx)
                                                ? "border-emerald-500 bg-emerald-500 text-white"
                                                : "border-slate-300 group-hover:border-slate-400"
                                            }
                  `}
                                    >
                                        {checkedItems.has(idx) && (
                                            <Check className="h-5 w-5" />
                                        )}
                                    </div>

                                    {/* Document Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <FileText
                                                className="h-5 w-5 flex-shrink-0"
                                                style={{ color: "#2796CA" }}
                                            />
                                            <span
                                                className={`font-semibold text-lg transition-colors ${checkedItems.has(idx)
                                                        ? "text-emerald-600"
                                                        : "text-slate-900"
                                                    }`}
                                            >
                                                {doc.name}
                                            </span>
                                            <Badge
                                                className="text-xs font-bold uppercase tracking-wider text-white"
                                                style={{ backgroundColor: "#2796CA" }}
                                            >
                                                Required
                                            </Badge>
                                        </div>
                                        {doc.description && (
                                            <p className="mt-2 text-sm text-slate-600">
                                                {doc.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Optional Documents Section */}
                    {optionalDocs.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: "rgba(39, 150, 202, 0.1)" }}
                                >
                                    <FileText
                                        className="h-5 w-5"
                                        style={{ color: "#2796CA" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">
                                        Optional Documents
                                    </h3>
                                    <p className="text-sm text-slate-600">(if applicable)</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {optionalDocs.map((doc, idx) => {
                                    const actualIdx = requiredDocs.length + idx;
                                    return (
                                        <div
                                            key={actualIdx}
                                            ref={(el) => {
                                                itemRefs.current[actualIdx] = el;
                                            }}
                                            onClick={() => toggleCheck(actualIdx)}
                                            className={`
                        group flex cursor-pointer items-start gap-4 rounded-[20px] border p-5 transition-all duration-300 ease-out sm:p-6
                        ${visibleItems.has(actualIdx)
                                                    ? "opacity-100 translate-x-0"
                                                    : "opacity-0 -translate-x-4"
                                                }
                        ${checkedItems.has(actualIdx)
                                                    ? "border-[#33C1F3] bg-[#E6F7FD]"
                                                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                                                }
                        hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]
                      `}
                                            style={{ transitionDelay: `${actualIdx * 80}ms` }}
                                        >
                                            {/* Checkbox */}
                                            <div
                                                className={`
                        mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ease-out
                        ${checkedItems.has(actualIdx)
                                                        ? "border-[#33C1F3] bg-[#33C1F3] text-white"
                                                        : "border-slate-300 group-hover:border-slate-400"
                                                    }
                      `}
                                            >
                                                {checkedItems.has(actualIdx) && (
                                                    <Check className="h-5 w-5" />
                                                )}
                                            </div>

                                            {/* Document Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <FileText
                                                        className="h-5 w-5 flex-shrink-0 text-slate-500"
                                                    />
                                                    <span
                                                        className={`font-semibold text-lg transition-colors ${checkedItems.has(actualIdx)
                                                                ? "text-[#00AEEF]"
                                                                : "text-slate-900"
                                                            }`}
                                                    >
                                                        {doc.name}
                                                    </span>
                                                    <Badge
                                                        className="text-xs font-bold uppercase tracking-wider text-slate-600"
                                                        style={{
                                                            backgroundColor: "rgba(39, 150, 202, 0.15)",
                                                        }}
                                                    >
                                                        Optional
                                                    </Badge>
                                                </div>
                                                {doc.description && (
                                                    <p className="mt-2 text-sm text-slate-600">
                                                        {doc.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Cards Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Document Tips Card */}
                    <div
                        className="rounded-[20px] border p-7"
                        style={{
                            backgroundColor: "rgba(39, 150, 202, 0.05)",
                            borderColor: "rgba(39, 150, 202, 0.2)",
                        }}
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <FileText
                                className="h-6 w-6 flex-shrink-0 mt-1"
                                style={{ color: "#2796CA" }}
                            />
                            <h3 className="text-lg font-bold text-slate-900">
                                Document Tips
                            </h3>
                        </div>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex gap-3">
                                <CheckCircle2
                                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                                    style={{ color: "#2796CA" }}
                                />
                                <span>Ensure all documents are clear and legible</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2
                                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                                    style={{ color: "#2796CA" }}
                                />
                                <span>Use recent documents (not older than 3-6 months)</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2
                                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                                    style={{ color: "#2796CA" }}
                                />
                                <span>Keep digital and physical copies ready</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2
                                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                                    style={{ color: "#2796CA" }}
                                />
                                <span>Upload documents in PDF or image format</span>
                            </li>
                        </ul>
                    </div>

                    {/* Processing Timeline Card */}
                    <div
                        className="rounded-[20px] border p-7"
                        style={{
                            backgroundColor: "rgba(39, 150, 202, 0.05)",
                            borderColor: "rgba(39, 150, 202, 0.2)",
                        }}
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <CheckCircle2
                                className="h-6 w-6 flex-shrink-0 mt-1"
                                style={{ color: "#2796CA" }}
                            />
                            <h3 className="text-lg font-bold text-slate-900">
                                Processing Timeline
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-slate-900 mb-1">
                                    Document Verification
                                </p>
                                <p className="text-slate-600 text-sm">1-2 business days</p>
                            </div>
                            <div style={{ height: "1px", backgroundColor: "rgba(39, 150, 202, 0.1)" }} />
                            <div>
                                <p className="font-semibold text-slate-900 mb-1">
                                    Approval Decision
                                </p>
                                <p className="text-slate-600 text-sm">
                                    24 hours after verification
                                </p>
                            </div>
                            <div style={{ height: "1px", backgroundColor: "rgba(39, 150, 202, 0.1)" }} />
                            <div>
                                <p className="font-semibold text-slate-900 mb-1">
                                    Loan Disbursement
                                </p>
                                <p className="text-slate-600 text-sm">
                                    Within 48 hours of approval
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <div
                    className="mx-auto mt-12 max-w-4xl rounded-[20px] border p-7 text-center lg:p-10"
                    style={{
                        backgroundColor: "rgba(39, 150, 202, 0.08)",
                        borderColor: "rgba(39, 150, 202, 0.25)",
                    }}
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        All Set with Your Documents?
                    </h3>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Once you have gathered all the required documents, you can proceed
                        with your application. Our team will review them and get back to you
                        within 24 hours.
                    </p>
                </div>
            </div>
        </section>
    );
}



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Check, FileText, AlertCircle } from "lucide-react";

// import type { Document } from "@/data/loanDetails";
// import { Badge } from "@/components/ui/badge";

// interface DocumentsSectionProps {
//     documents: Document[];
//     id: string;
// }

// export default function DocumentsSection({ documents,id }: DocumentsSectionProps) {
//   const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
//   const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
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
//   }, [documents]);

//   const toggleCheck = (idx: number) => {
//     setCheckedItems((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(idx)) {
//         newSet.delete(idx);
//       } else {
//         newSet.add(idx);
//       }
//       return newSet;
//     });
//   };

//   const requiredDocs = documents.filter((d) => d.required);
//   const optionalDocs = documents.filter((d) => !d.required);

//   return (
//     <section className="py-12 lg:py-16" id={id}>
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Required Documents</h2>
//           <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
//             Keep these documents ready for a smooth and quick application process
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto space-y-8">
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <AlertCircle className="h-5 w-5 text-destructive" />
//               <h3 className="text-xl font-bold text-foreground">Mandatory Documents</h3>
//             </div>

//             <div className="space-y-3">
//               {requiredDocs.map((doc, idx) => (
//                 <div
//                   key={idx}
//                   ref={(el) => {
//                     itemRefs.current[idx] = el;
//                   }}
//                   onClick={() => toggleCheck(idx)}
//                   className={`
//                     group flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all duration-500
//                     ${checkedItems.has(idx) ? "border-accent bg-accent/5" : "border-border bg-card hover:border-primary/30"}
//                     ${visibleItems.has(idx) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
//                   `}
//                   style={{ transitionDelay: `${idx * 80}ms` }}
//                 >
//                   <div
//                     className={`
//                     flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300
//                     ${
//                       checkedItems.has(idx)
//                         ? "border-accent bg-accent text-accent-foreground scale-110"
//                         : "border-muted-foreground/30 group-hover:border-primary"
//                     }
//                   `}
//                   >
//                     {checkedItems.has(idx) && <Check className="h-4 w-4" />}
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-primary" />
//                       <span
//                         className={`font-semibold transition-colors ${checkedItems.has(idx) ? "text-accent" : "text-foreground"}`}
//                       >
//                         {doc.name}
//                       </span>
//                       <Badge variant="destructive" className="text-xs">
//                         Required
//                       </Badge>
//                     </div>
//                     {doc.description && <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {optionalDocs.length > 0 && (
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <FileText className="h-5 w-5 text-muted-foreground" />
//                 <h3 className="text-xl font-bold text-foreground">Optional Documents</h3>
//                 <span className="text-sm text-muted-foreground">(if applicable)</span>
//               </div>

//               <div className="space-y-3">
//                 {optionalDocs.map((doc, idx) => {
//                   const actualIdx = requiredDocs.length + idx;
//                   return (
//                     <div
//                       key={actualIdx}
//                       ref={(el) => {
//                         itemRefs.current[actualIdx] = el;
//                       }}
//                       onClick={() => toggleCheck(actualIdx)}
//                       className={`
//                         group flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all duration-500
//                         ${
//                           checkedItems.has(actualIdx)
//                             ? "border-accent bg-accent/5"
//                             : "border-border bg-card/50 hover:border-primary/30"
//                         }
//                         ${visibleItems.has(actualIdx) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
//                       `}
//                       style={{ transitionDelay: `${actualIdx * 80}ms` }}
//                     >
//                       <div
//                         className={`
//                         flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300
//                         ${
//                           checkedItems.has(actualIdx)
//                             ? "border-accent bg-accent text-accent-foreground scale-110"
//                             : "border-muted-foreground/20 group-hover:border-primary"
//                         }
//                       `}
//                       >
//                         {checkedItems.has(actualIdx) && <Check className="h-4 w-4" />}
//                       </div>

//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <FileText className="h-4 w-4 text-muted-foreground" />
//                           <span
//                             className={`font-medium transition-colors ${
//                               checkedItems.has(actualIdx) ? "text-accent" : "text-foreground"
//                             }`}
//                           >
//                             {doc.name}
//                           </span>
//                           <Badge variant="secondary" className="text-xs">
//                             Optional
//                           </Badge>
//                         </div>
//                         {doc.description && <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
