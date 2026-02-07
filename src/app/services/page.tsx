import type { Metadata } from "next";

import { Suspense } from "react";

import ServicesHubClient from "./_components/ServicesHubClient";

export const metadata: Metadata = {
  title: "All Services | Infinity Loans",
  description:
    "Explore loans, credit, government schemes, insurance and tools offered by Infinity Loans.",
};

export default function ServicesPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <ServicesHubClient />
      </Suspense>
    </main>
  );
}
