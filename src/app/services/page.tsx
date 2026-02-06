import type { Metadata } from "next";

import ServicesHubClient from "./_components/ServicesHubClient";

export const metadata: Metadata = {
  title: "All Services | Infinity Loans",
  description:
    "Explore loans, credit, government schemes, insurance and tools offered by Infinity Loans.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHubClient />
    </main>
  );
}
