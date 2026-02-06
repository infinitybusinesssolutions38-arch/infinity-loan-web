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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/80 py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur">
                <Sparkles className="mr-1 h-3 w-3" />
                {data.subtitle}
              </Badge>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground">
                  <HeroIcon className="h-6 w-6" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                  {data.title}
                </h1>
              </div>

              <p className="mt-6 text-lg text-primary-foreground/80 sm:text-xl">{data.description}</p>

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
                  <div className="flex items-center gap-4 rounded-2xl bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-5 text-primary-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                      <Percent className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Interest Rate</p>
                      <p className="text-2xl font-bold">{data.interestRate}</p>
                    </div>
                  </div>
                )}

                {data.maxAmount && (
                  <div className="flex items-center gap-4 rounded-2xl bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-5 text-primary-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta/20">
                      <Banknote className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Maximum Amount</p>
                      <p className="text-2xl font-bold">{data.maxAmount}</p>
                    </div>
                  </div>
                )}

                {data.tenure && (
                  <div className="flex items-center gap-4 rounded-2xl bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-5 text-primary-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
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
