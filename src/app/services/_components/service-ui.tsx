import type React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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

  return (
    <Button asChild size="sm" className="w-full sm:w-auto">
      <Link href={href}>{label}</Link>
    </Button>
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
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-blue-600">{eyebrow}</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
              {description}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/services">View all categories</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
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
