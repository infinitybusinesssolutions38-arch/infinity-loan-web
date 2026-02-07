"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Percent, Calendar, Banknote, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type LoanType, LOAN_DETAILS } from "@/data/loanDetails";

import EligibilitySection from "./EligibilitySection";
import BenefitsSection from "./BenefitsSection";
import DocumentsSection from "./DocumentsSection";
import ApplyNowModal from "./ApplyNowModal";

interface LoanDetailPageProps {
  loanType: LoanType;
}

export default function LoanDetailPage({ loanType }: LoanDetailPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = LOAN_DETAILS[loanType];
  const HeroIcon = data.heroIcon;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F97415]/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gray-800/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur">
                <Sparkles className="mr-1 h-3 w-3" />
                {data.subtitle}
              </Badge>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                  <HeroIcon className="h-6 w-6" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {data.title}
                </h1>
              </div>

              <p className="mt-6 text-lg text-gray-300 sm:text-xl">{data.description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  variant="cta"
                  size="xl"
                  onClick={() => setIsModalOpen(true)}
                  className="group"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button asChild variant="hero-outline" size="xl">
                  <Link href="/contact">Talk to Expert</Link>
                </Button>
              </div>
            </div>

            {(data.interestRate || data.maxAmount || data.tenure) && (
              <div className="flex flex-col gap-4">
                {data.interestRate && (
                  <div className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97415]/15">
                      <Percent className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Interest Rate</p>
                      <p className="text-2xl font-bold">{data.interestRate}</p>
                    </div>
                  </div>
                )}

                {data.maxAmount && (
                  <div className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <Banknote className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Maximum Amount</p>
                      <p className="text-2xl font-bold">{data.maxAmount}</p>
                    </div>
                  </div>
                )}

                {data.tenure && (
                  <div className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Tenure</p>
                      <p className="text-2xl font-bold">{data.tenure}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <EligibilitySection criteria={data.eligibility} />
      <BenefitsSection benefits={data.benefits} />
      <DocumentsSection documents={data.documents} />

      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/50 to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Apply now and get a decision within 24 hours. Our team is here to help you every step of the way.
          </p>
          <div className="mt-8">
            <Button
              variant="cta"
              size="xl"
              onClick={() => setIsModalOpen(true)}
              className="animate-pulse-subtle group"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      <ApplyNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} loanType={data.title} />
    </div>
  );
}
