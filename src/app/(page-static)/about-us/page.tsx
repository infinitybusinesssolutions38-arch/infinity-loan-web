import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUsPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Infinity Loans &amp; Business Solutions</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                Infinity Loans &amp; Business Solutions is a trusted financial distribution and loan advisory firm dedicated to delivering transparent, reliable, and result-driven funding solutions across India.
              </p>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                We help individuals, professionals, entrepreneurs, and businesses access the right finance through our strong lending network and expert advisory support. Our approach focuses on simplifying the borrowing process while enabling long-term financial stability and growth for our clients.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Talk to an expert
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Network</p>
                  <p className="mt-1 text-base font-bold text-gray-900">100+ Banks</p>
                  <p className="mt-1 text-sm text-gray-600">Leading banking partners across India</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Partners</p>
                  <p className="mt-1 text-base font-bold text-gray-900">100+ NBFCs</p>
                  <p className="mt-1 text-sm text-gray-600">Financial institutions &amp; lenders</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Integrations</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Fintech platforms</p>
                  <p className="mt-1 text-sm text-gray-600">Multiple lending platform integrations</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Support</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Expert guidance</p>
                  <p className="mt-1 text-sm text-gray-600">Dedicated relationship managers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              To be recognized as one of India's most trusted and customer-centric financial distribution companies by delivering ethical, transparent, and customized loan solutions that create lasting value.
            </p>
            
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-900">Building trust through transparency and excellence</p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                Deliver fast, simple, and transparent loan processing
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                Understand every client's financial profile to offer tailored funding solutions
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                Provide competitive interest rates and faster approvals through strong lender partnerships
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                Maintain the highest standards of professionalism, ethics, and regulatory compliance
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                Build long-term relationships based on trust, reliability, and service excellence
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* Lending Network Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Our Strong Lending Network</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Infinity Loans &amp; Business Solutions operates through a diversified and powerful lending ecosystem, enabling higher approval success and flexible funding options.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">100+ Leading Banks</h3>
              <p className="mt-2 text-sm text-gray-600">Partnerships with top banking institutions across India</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">100+ NBFCs &amp; Financial Institutions</h3>
              <p className="mt-2 text-sm text-gray-600">Extensive network of non-banking financial companies</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">Fintech Platform Integrations</h3>
              <p className="mt-2 text-sm text-gray-600">Multiple lending platform integrations for faster processing</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">Verified Private Lenders</h3>
              <p className="mt-2 text-sm text-gray-600">Network of trusted and verified private lending sources</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">Dedicated Relationship Managers</h3>
              <p className="mt-2 text-sm text-gray-600">Expert loan advisors and support throughout your journey</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Network advantage:</span> This extensive network allows us to offer competitive interest structures, faster disbursements, and customized loan solutions aligned with each client's needs.
            </p>
          </div>
        </div>
      </section>

      {/* Loan Solutions Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Our Expertise – Comprehensive Loan Solutions</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Our experienced team provides end-to-end consultation and processing support across a wide range of loan products.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Vehicle &amp; Transport Loans</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      New &amp; Used Car Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Commercial Vehicle &amp; Fleet Financing
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Two-Wheeler Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Luxury Vehicle Loans
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">SME &amp; Business Loans</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      SME &amp; MSME Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      Business Expansion &amp; Working Capital Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      Startup Funding
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      Trade &amp; Inventory Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      Overdraft &amp; Cash Credit Facilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Industrial &amp; Project Finance</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Industrial Loans &amp; Project Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Machinery &amp; Equipment Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Infrastructure &amp; Factory Expansion Funding
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      Warehouse &amp; Logistics Financing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Property &amp; Mortgage Loans</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Home Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Loan Against Property (LAP)
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Commercial Property Loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Construction Finance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      Balance Transfer &amp; Top-Up Loans
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 lg:col-span-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                  <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Personal &amp; Private Funding Solutions</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Personal &amp; Professional Loans
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Emergency Funding
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Private Funding Solutions
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                      Debt Consolidation Loans
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Benefits Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">End-to-End Loan Assistance</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                We manage the complete loan lifecycle to ensure a smooth and hassle-free experience for our clients.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Financial Profile Evaluation", icon: "📊" },
                  { title: "Documentation & Compliance Support", icon: "📄" },
                  { title: "Lender Matching & Expert Consultation", icon: "🤝" },
                  { title: "Approval & Processing Assistance", icon: "✅" },
                  { title: "Loan Disbursement Support", icon: "💰" },
                  { title: "Post-Disbursement Customer Service", icon: "🎯" },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900">Why Choose Us</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Experienced advisory team
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Strong network
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Fast processing
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Transparent practices
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Customized solutions
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  End-to-end support
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  High approval rate
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Customer-centric approach
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h2 className="text-base font-bold text-blue-900">Ready to get started?</h2>
              <p className="mt-2 text-sm text-blue-900/80">
                Connect with our expert team and discover the right loan solution for your needs.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Talk to an expert
              </Link>
            </section>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Let's Build Your Financial Future with Confidence</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  At Infinity Loans &amp; Business Solutions, every loan is handled with expertise, integrity, and commitment—ensuring you receive the right financial solution at the right time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Contact Us
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">Disclaimer: This page is for informational purposes.</p>
        </div>
      </section>
    </main>
  );
}