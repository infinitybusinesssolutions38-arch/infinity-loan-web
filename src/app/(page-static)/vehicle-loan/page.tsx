import type { Metadata } from "next";
import Link from "next/link";
import VehicleLoanEmiCalculator from "./_components/VehicleLoanEmiCalculator";
import { ArrowRight, CheckCircle, Zap, Gauge, DollarSign, TrendingUp, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Vehicle Loan | Finance Your Dream Car, Bike & Commercial Vehicle",
  description: "Get instant vehicle loans for cars, bikes, and commercial vehicles. Competitive rates, flexible EMI, quick approval. Apply online today.",
};

export default function VehicleLoanPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-400 opacity-20 blur-3xl" />
          <div className="absolute -bottom-32 -left-40 h-96 w-96 rounded-full bg-teal-400 opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-blue-300 opacity-10 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-cyan-200 uppercase tracking-widest">
                    Vehicle Financing
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Drive Your <span className="text-cyan-200">Dream</span> Vehicle Today
                  </h1>
                </div>

                <p className="max-w-2xl text-lg text-cyan-50 sm:text-xl">
                  Finance your car, bike, or commercial vehicle with competitive interest rates, flexible EMI options, and quick approval. Get on the road without the financial burden.
                </p>

                {/* Key Features */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-200" />
                    <span className="text-cyan-50">Instant approval within 24-48 hours</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-200" />
                    <span className="text-cyan-50">Interest rates from 6.5% onwards</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-200" />
                    <span className="text-cyan-50">Tenure up to 7 years with flexible EMI</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:gap-5">
                  <Link
                    href="#apply"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-blue-600 shadow-lg transition hover:shadow-xl hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                  >
                    Apply Now
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#calculator"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-cyan-200 bg-blue-500/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-cyan-100 backdrop-blur-sm transition hover:bg-blue-500/20 hover:border-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                  >
                    Calculate EMI
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-cyan-400/30">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">60K+</p>
                    <p className="text-sm text-cyan-200">Happy Drivers</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">₹300Cr+</p>
                    <p className="text-sm text-cyan-200">Financed</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">48 Hours</p>
                    <p className="text-sm text-cyan-200">Avg Approval</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Vehicle Type Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Car Card */}
                <div className="group rounded-2xl border border-cyan-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-cyan-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-cyan-300 transition">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Car Loan</h3>
                  <p className="mt-2 text-sm text-cyan-100">New & used cars with instant valuation</p>
                </div>

                {/* Bike Card */}
                <div className="group rounded-2xl border border-cyan-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-cyan-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-cyan-300 transition">
                    <span className="text-2xl">🏍️</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Bike Loan</h3>
                  <p className="mt-2 text-sm text-cyan-100">Two-wheelers with quick processing</p>
                </div>

                {/* Commercial Card */}
                <div className="group rounded-2xl border border-cyan-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-cyan-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-cyan-300 transition">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Commercial</h3>
                  <p className="mt-2 text-sm text-cyan-100">Fleet & commercial vehicles</p>
                </div>

                {/* EV Card */}
                <div className="group rounded-2xl border border-cyan-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-cyan-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-cyan-300 transition">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">EV Loan</h3>
                  <p className="mt-2 text-sm text-cyan-100">Electric vehicles with special rates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Vehicle Loans from Us?</h2>
          <p className="mt-4 text-lg text-gray-600">Fast, flexible, and hassle-free financing for your perfect vehicle</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Fast Approval */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-100">
              <Zap className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Quick Approval</h3>
            <p className="mt-3 text-gray-600">Get approved within 24-48 hours with digital KYC and instant verification</p>
          </div>

          {/* Flexible EMI */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-cyan-100">
              <DollarSign className="h-7 w-7 text-cyan-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Flexible EMI</h3>
            <p className="mt-3 text-gray-600">Choose tenure from 12 to 84 months and get EMI that fits your budget</p>
          </div>

          {/* Competitive Rates */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-teal-100">
              <TrendingUp className="h-7 w-7 text-teal-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Best Rates</h3>
            <p className="mt-3 text-gray-600">Interest from 6.5% onwards based on your credit profile</p>
          </div>

          {/* Wide Coverage */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-green-100">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Wide Coverage</h3>
            <p className="mt-3 text-gray-600">Finance cars, bikes, commercial vehicles, and EVs</p>
          </div>

          {/* Minimal Docs */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-orange-100">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Easy Documentation</h3>
            <p className="mt-3 text-gray-600">Minimal paperwork with digital submission and instant verification</p>
          </div>

          {/* Expert Support */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-purple-100">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Expert Support</h3>
            <p className="mt-3 text-gray-600">Dedicated team to guide you through the entire process</p>
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Vehicle Types We Finance</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive financing options for every vehicle type</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Cars */}
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center hover:shadow-md transition">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-900">Cars</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• New cars</p>
                <p>• Used cars</p>
                <p>• Luxury cars</p>
              </div>
              <p className="mt-4 text-xs font-semibold text-blue-600">Up to ₹50 Lakh</p>
            </div>

            {/* Bikes */}
            <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center hover:shadow-md transition">
              <div className="text-5xl mb-4">🏍️</div>
              <h3 className="text-xl font-bold text-gray-900">Two-Wheelers</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• Bikes</p>
                <p>• Scooters</p>
                <p>• Mopeds</p>
              </div>
              <p className="mt-4 text-xs font-semibold text-green-600">Up to ₹5 Lakh</p>
            </div>

            {/* Commercial */}
            <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-8 text-center hover:shadow-md transition">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900">Commercial</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• Trucks</p>
                <p>• Buses</p>
                <p>• Fleet vehicles</p>
              </div>
              <p className="mt-4 text-xs font-semibold text-orange-600">Up to ₹1 Crore</p>
            </div>

            {/* EVs */}
            <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center hover:shadow-md transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900">Electric Vehicles</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• EVs (Cars)</p>
                <p>• E-scooters</p>
                <p>• E-bikes</p>
              </div>
              <p className="mt-4 text-xs font-semibold text-purple-600">Up to ₹30 Lakh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loan Process in 5 Easy Steps</h2>
          <p className="mt-4 text-lg text-gray-600">Get approved and drive home in 48 hours</p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Step 1 */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-md transition">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900">Check Eligibility</h3>
              <p className="mt-3 text-sm text-gray-600">Quick pre-approval check in 2 minutes</p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-md transition">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900">Upload Docs</h3>
              <p className="mt-3 text-sm text-gray-600">Submit documents digitally online</p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-md transition">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900">Get Approved</h3>
              <p className="mt-3 text-sm text-gray-600">Approval within 24-48 hours</p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-md transition">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900">Disburse Funds</h3>
              <p className="mt-3 text-sm text-gray-600">Funds released to dealer instantly</p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          </div>

          {/* Step 5 */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-md transition">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mx-auto mb-4">
                5
              </div>
              <h3 className="text-lg font-bold text-gray-900">Drive Away</h3>
              <p className="mt-3 text-sm text-gray-600">Take delivery of your vehicle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">About Vehicle Loans</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  A vehicle loan is a secured loan that helps you purchase a new or used car, bike, or commercial vehicle. The vehicle itself acts as collateral, allowing lenders to offer competitive interest rates.
                </p>
                <p>
                  Instead of paying the full amount upfront, you can spread the cost over a period of 1-7 years through affordable monthly EMI payments. This makes vehicle ownership accessible and financially manageable.
                </p>
                <p>
                  With options for both new and used vehicles, and special programs for electric vehicles, vehicle loans have become an essential tool for those looking to upgrade their mobility solutions.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="#calculator"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Calculate your monthly EMI
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Interest Rates</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">6.5% - 9.5%</p>
                <p className="mt-2 text-sm text-gray-600">Varies by vehicle type & profile</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Tenure</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">12-84 Months</p>
                <p className="mt-2 text-sm text-gray-600">Flexible repayment period</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Loan Amount</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">₹1L - ₹1Cr</p>
                <p className="mt-2 text-sm text-gray-600">Based on vehicle & profile</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Processing</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">24-48 Hours</p>
                <p className="mt-2 text-sm text-gray-600">Quick approval & disbursal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Eligibility Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Eligibility Criteria</h2>
              <p className="mt-2 text-gray-600">Basic requirements to qualify for vehicle loans</p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Minimum Age</dt>
                  <dd className="mt-2 text-sm text-gray-700">21 years or above</dd>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Employment</dt>
                  <dd className="mt-2 text-sm text-gray-700">Salaried or self-employed</dd>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Monthly Income</dt>
                  <dd className="mt-2 text-sm text-gray-700">₹20,000+ per month</dd>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Credit Score</dt>
                  <dd className="mt-2 text-sm text-gray-700">700+ for best rates</dd>
                </div>
              </dl>
            </div>

            {/* Documentation Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Required Documents</h2>
              <p className="mt-2 text-gray-600">Keep digital copies ready for faster processing</p>

              <div className="mt-6 grid gap-4">
                <div className="rounded-xl border-l-4 border-l-blue-600 bg-blue-50 p-5 hover:shadow-sm transition">
                  <h3 className="text-sm font-semibold text-gray-900">Identity Proof</h3>
                  <p className="mt-2 text-sm text-gray-700">PAN, Aadhaar, Passport, or Voter ID</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-green-600 bg-green-50 p-5 hover:shadow-sm transition">
                  <h3 className="text-sm font-semibold text-gray-900">Address Proof</h3>
                  <p className="mt-2 text-sm text-gray-700">Aadhaar, utility bill, rent agreement</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-orange-600 bg-orange-50 p-5 hover:shadow-sm transition">
                  <h3 className="text-sm font-semibold text-gray-900">Income Proof</h3>
                  <p className="mt-2 text-sm text-gray-700">Salary slips, Form 16, ITR, or financials</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-purple-600 bg-purple-50 p-5 hover:shadow-sm transition">
                  <h3 className="text-sm font-semibold text-gray-900">Vehicle Quotation</h3>
                  <p className="mt-2 text-sm text-gray-700">Proforma invoice from dealer</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>

              <div className="mt-6 space-y-4">
                <details className="group cursor-pointer rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition">
                  <summary className="flex items-center justify-between font-semibold text-gray-900">
                    <span>Can I get a loan for a used vehicle?</span>
                    <span className="text-xl group-open:rotate-180 transition">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Yes! We finance both new and used vehicles. Used vehicles must be less than 8-10 years old, in good condition, and have valid documentation.
                  </p>
                </details>

                <details className="group cursor-pointer rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition">
                  <summary className="flex items-center justify-between font-semibold text-gray-900">
                    <span>What is the maximum tenure I can get?</span>
                    <span className="text-xl group-open:rotate-180 transition">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Maximum tenure is typically 84 months (7 years) for cars and 60 months for two-wheelers. Some lenders may offer longer tenures for specific vehicle types.
                  </p>
                </details>

                <details className="group cursor-pointer rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition">
                  <summary className="flex items-center justify-between font-semibold text-gray-900">
                    <span>Can I prepay my loan?</span>
                    <span className="text-xl group-open:rotate-180 transition">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Yes, you can prepay your loan partially or fully without penalty. Most lenders encourage prepayment to reduce interest burden.
                  </p>
                </details>

                <details className="group cursor-pointer rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition">
                  <summary className="flex items-center justify-between font-semibold text-gray-900">
                    <span>What documents are required from the dealer?</span>
                    <span className="text-xl group-open:rotate-180 transition">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    You'll need a quotation/proforma invoice from the dealer showing vehicle details, price, and specifications. This helps us verify the vehicle and process the loan faster.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Tips */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">💡 Pro Tips</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">A good credit score gets you better interest rates</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Compare offers from multiple lenders before applying</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Lower tenure means higher EMI but less interest</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Keep insurance costs in your budget</span>
                </li>
              </ul>
            </div>

            {/* Rate Comparison */}
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">📊 Rate Comparison</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Car Loan</span>
                  <span className="font-semibold">6.5-9.5%</span>
                </div>
                <div className="border-t border-blue-200 pt-3 flex justify-between">
                  <span className="text-gray-600">Bike Loan</span>
                  <span className="font-semibold">7-10%</span>
                </div>
                <div className="border-t border-blue-200 pt-3 flex justify-between">
                  <span className="text-gray-600">Commercial</span>
                  <span className="font-semibold">6-8.5%</span>
                </div>
                <div className="border-t border-blue-200 pt-3 flex justify-between">
                  <span className="text-gray-600">EV Loan</span>
                  <span className="font-semibold">5.5-8%</span>
                </div>
              </div>
            </div>

            {/* Expert Help CTA */}
            <div className="rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-teal-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">🤝 Need Help?</h3>
              <p className="mt-2 text-sm text-gray-700">
                Unsure which vehicle or tenure to choose? Our experts can guide you through the best options.
              </p>
              <Link
                href="/contact"
                className="mt-4 block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Talk to Expert
              </Link>
            </div>

            {/* Insurance Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-bold text-gray-900">Insurance Included</h3>
              <p className="mt-2 text-xs text-gray-600">
                Add comprehensive insurance to your EMI for complete coverage
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <VehicleLoanEmiCalculator />
      </section>

      {/* CTA Section */}
      <section id="apply" className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-700 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Drive Home?
          </h2>
          <p className="mt-4 text-lg text-cyan-100 max-w-2xl mx-auto">
            Get instant approval for your vehicle loan. Complete the process in just 3 simple steps and get the keys to your dream vehicle.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:shadow-xl transition hover:bg-cyan-50"
            >
              Apply Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Request Callback
            </Link>
          </div>

          <p className="mt-8 text-sm text-cyan-100">
            ✓ 24-48 hour approval | ✓ Easy documentation | ✓ Instant disbursal | ✓ Expert support
          </p>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Disclaimer:</strong> Eligibility, interest rates, tenure, loan amount, and processing fees depend on vehicle type, lender policies, your credit profile, income, employment status, and other factors. Interest rates are subject to change based on RBI guidelines and market conditions. This page is for informational purposes only and does not constitute an offer or commitment for any loan. Please consult with our experts or directly with lenders for personalized quotes and terms. We are not responsible for any changes in vehicle prices or availability after the loan application is submitted.
          </p>
        </div>
      </section>
    </main>
  );
}