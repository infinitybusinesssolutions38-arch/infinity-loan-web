import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, Building2, CreditCard, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";

import ServicesHubClient from "./_components/ServicesHubClient";

export const metadata: Metadata = {
  title: "All Services | Infinity Loans",
  description:
    "Explore loans, credit, government schemes, insurance and tools offered by Infinity Loans.",
};

export default function ServicesPage() {
  return (
    <main className="bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-blue-600">All Services</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Find the right product for your next goal
              </h1>
              <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
                Explore loans, credit, government schemes, insurance and tools — grouped exactly as in our
                navigation. Each service includes a clear next step so you can start quickly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/services/loans">Browse loans</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">Talk to an expert</Link>
              </Button>
            </div>

            <nav aria-label="Service categories" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Loans", href: "/services/loans", icon: Banknote },
                { title: "Insurance", href: "/services/insurance", icon: Shield },
                { title: "Credits & Cards", href: "/services/credit-cards", icon: CreditCard },
                { title: "Government Schemes", href: "/services/government-schemes", icon: Building2 },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.href}
                    asChild
                    size="sm"
                    variant="secondary"
                    className="justify-start gap-2"
                  >
                    <Link href={cat.href}>
                      <Icon className="h-4 w-4" />
                      {cat.title}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
        <ServicesHubClient />

        <section
          aria-labelledby="next-steps"
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <h2 id="next-steps" className="text-lg font-bold text-gray-900">
                Not sure what fits best?
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Share your requirement and we’ll recommend the right product and the next steps.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/contact">Get a callback</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/register">Start an application</Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="pb-10">
          <p className="text-xs text-gray-500">
            Disclaimer: Product availability and eligibility depend on your profile and partner lending policies.
          </p>
        </footer>
      </div>
    </main>
  );
}
