"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileText, AlertCircle } from "lucide-react";

import type { Document } from "@/data/loanDetails";
import { Badge } from "@/components/ui/badge";

interface DocumentsSectionProps {
  documents: Document[];
}

export default function DocumentsSection({ documents }: DocumentsSectionProps) {
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
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Required Documents</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Keep these documents ready for a smooth and quick application process
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Mandatory Documents</h3>
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
                    group flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all duration-500
                    ${checkedItems.has(idx) ? "border-accent bg-accent/5" : "border-border bg-card hover:border-primary/30"}
                    ${visibleItems.has(idx) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
                  `}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div
                    className={`
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300
                    ${
                      checkedItems.has(idx)
                        ? "border-accent bg-accent text-accent-foreground scale-110"
                        : "border-muted-foreground/30 group-hover:border-primary"
                    }
                  `}
                  >
                    {checkedItems.has(idx) && <Check className="h-4 w-4" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span
                        className={`font-semibold transition-colors ${checkedItems.has(idx) ? "text-accent" : "text-foreground"}`}
                      >
                        {doc.name}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    </div>
                    {doc.description && <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {optionalDocs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-bold text-foreground">Optional Documents</h3>
                <span className="text-sm text-muted-foreground">(if applicable)</span>
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
                        group flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all duration-500
                        ${
                          checkedItems.has(actualIdx)
                            ? "border-accent bg-accent/5"
                            : "border-border bg-card/50 hover:border-primary/30"
                        }
                        ${visibleItems.has(actualIdx) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
                      `}
                      style={{ transitionDelay: `${actualIdx * 80}ms` }}
                    >
                      <div
                        className={`
                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300
                        ${
                          checkedItems.has(actualIdx)
                            ? "border-accent bg-accent text-accent-foreground scale-110"
                            : "border-muted-foreground/20 group-hover:border-primary"
                        }
                      `}
                      >
                        {checkedItems.has(actualIdx) && <Check className="h-4 w-4" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span
                            className={`font-medium transition-colors ${
                              checkedItems.has(actualIdx) ? "text-accent" : "text-foreground"
                            }`}
                          >
                            {doc.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            Optional
                          </Badge>
                        </div>
                        {doc.description && <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
