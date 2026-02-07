import type React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type CtaVariant = "apply" | "eligibility";

export type ServiceItem = {
  key: string;
  title: string;
  description: string;
  popular?: boolean;
  cta: CtaVariant;
  href: string;
};

export type ServiceGroup = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ServiceItem[];
};

export function ServiceCtaButton({
  variant,
  href,
}: {
  variant: CtaVariant;
  href: string;
}) {
  const label = variant === "eligibility" ? "Check Eligibility" : "Apply Now";

  if (variant === "eligibility") {
    return (
      <Button asChild size="sm" className="w-full sm:w-auto">
        <Link href={href}>{label}</Link>
      </Button>
    );
  }

  return (
    <ApplyNowCTAButton size="sm" className="w-full sm:w-auto">
      {label}
    </ApplyNowCTAButton>
  );
}

export function PopularBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
      Popular
    </span>
  );
}

export function ServiceItemRow({ item }: { item: ServiceItem }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
          {item.popular ? <PopularBadge /> : null}
        </div>
        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
      </div>

      <div className="shrink-0">
        <ServiceCtaButton variant={item.cta} href={item.href} />
      </div>
    </div>
  );
}

export function ServiceGroupCard({ group }: { group: ServiceGroup }) {
  const Icon = group.icon;

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-base">{group.title}</CardTitle>
        </div>
        <CardDescription>
          Review options, check eligibility and apply with a clear next step.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {group.items.map((item) => (
          <ServiceItemRow key={item.key} item={item} />
        ))}
      </CardContent>
      <CardFooter className="border-t border-gray-100">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/contact">Need help choosing? Talk to us</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ServicesPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-50">
      <header className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
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

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 relative z-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#F97415]">{eyebrow}</p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-3xl text-sm text-gray-300 sm:text-base">
              {description}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/services">View all categories</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto bg-[#F97415] text-white hover:bg-[#F97415]/90">
              <Link href="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {children}

        <footer className="mt-14 pb-10">
          <p className="text-xs text-gray-500">
            Disclaimer: Product availability and eligibility depend on your profile and partner lending policies.
          </p>
        </footer>
      </div>
    </main>
  );
}
