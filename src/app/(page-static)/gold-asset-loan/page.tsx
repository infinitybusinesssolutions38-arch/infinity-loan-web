import type { Metadata } from "next";
import Link from "next/link";
import EmiCalculator from "../../components/Calculator";
import { ArrowRight, CheckCircle, TrendingUp, Shield, Clock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Loan | Finance Your Dream Home",
  description: "Get flexible home loans with competitive rates, long tenures, and tax benefits. Calculate EMI, check eligibility, and apply online.",
};

export default function HomeLoanPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-3xl" />
          <div className="absolute -bottom-32 -left-40 h-96 w-96 rounded-full bg-indigo-400 opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-blue-300 opacity-10 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-200 uppercase tracking-widest">
                    Smart Home Financing
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Finance Your <span className="text-blue-200">Dream Home</span> Today
                  </h1>
                </div>

                <p className="max-w-2xl text-lg text-blue-100 sm:text-xl">
                  Get flexible home loans with competitive interest rates, extended tenures, and potential tax benefits. Whether you're buying, building, or renovating—we make homeownership accessible.
                </p>

                {/* Key Features */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-300" />
                    <span className="text-blue-50">Loan amounts up to ₹1 Crore with minimal documentation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-300" />
                    <span className="text-blue-50">Tenure up to 30 years to fit your budget</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-300" />
                    <span className="text-blue-50">Fixed or floating rates based on your preference</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:gap-5">
                  <Link
                    href="#apply"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-blue-600 shadow-lg transition hover:shadow-xl hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Apply for Home Loan
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#calculator"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-blue-500/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-blue-100 backdrop-blur-sm transition hover:bg-blue-500/20 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Calculate EMI
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-400/30">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">50K+</p>
                    <p className="text-sm text-blue-200">Happy Customers</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">₹500Cr+</p>
                    <p className="text-sm text-blue-200">Disbursed</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">24hrs</p>
                    <p className="text-sm text-blue-200">Approval</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Feature Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Card 1 */}
                <div className="group rounded-2xl border border-blue-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-blue-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-blue-300 transition">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Competitive Rates</h3>
                  <p className="mt-2 text-sm text-blue-100">Starting from 6.5% onwards, tailored to your profile</p>
                </div>

                {/* Card 2 */}
                <div className="group rounded-2xl border border-blue-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-blue-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-blue-300 transition">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Quick Processing</h3>
                  <p className="mt-2 text-sm text-blue-100">Approval within 24 hours with instant disbursal</p>
                </div>

                {/* Card 3 */}
                <div className="group rounded-2xl border border-blue-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-blue-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-blue-300 transition">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Secure & Safe</h3>
                  <p className="mt-2 text-sm text-blue-100">256-bit encryption & RBI compliant platform</p>
                </div>

                {/* Card 4 */}
                <div className="group rounded-2xl border border-blue-400/30 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15 hover:border-blue-300/50">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 group-hover:bg-blue-300 transition">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">Easy Documentation</h3>
                  <p className="mt-2 text-sm text-blue-100">Minimal documents required with digital verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose Our Home Loans?</h2>
          <p className="mt-4 text-lg text-gray-600">Everything you need to make your homeownership dream a reality</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900">Flexible Amounts</h3>
            <p className="mt-3 text-gray-600">Borrow from ₹5 lakhs up to ₹1 crore based on your property value and income</p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900">Flexible Tenure</h3>
            <p className="mt-3 text-gray-600">Repay over 5 to 30 years with options to prepay without penalty</p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-900">Tax Benefits</h3>
            <p className="mt-3 text-gray-600">Potential deductions on principal and interest under income tax laws</p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold text-gray-900">Balance Transfer</h3>
            <p className="mt-3 text-gray-600">Switch from existing lender and get better rates with hassle-free process</p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-gray-900">Multiple Use Cases</h3>
            <p className="mt-3 text-gray-600">Buy, build, renovate, or refinance with same documentation</p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900">Expert Support</h3>
            <p className="mt-3 text-gray-600">Dedicated relationship manager to guide you through the entire process</p>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What is a Home Loan?</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  A home loan is a secured loan offered by banks and financial institutions to help you buy a new home,
                  purchase a resale property, construct a house, or renovate an existing one. The property generally
                  acts as collateral.
                </p>
                <p>
                  Home loans usually offer lower interest rates compared to unsecured credit because they are backed by
                  the property. You can choose between fixed or floating interest rates and repay over a long tenure,
                  helping you manage monthly cash flow.
                </p>
                <p>
                  Many borrowers also explore tax benefits (as applicable under prevailing laws) on principal repayment
                  and interest paid. Typical use cases include purchasing a flat/house, building on a plot, home
                  extension, and major repairs.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="#calculator"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  Use EMI Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Interest Rates</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">6.5% - 9.5%</p>
                <p className="mt-2 text-sm text-gray-600">Rates vary by lender and profile</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Tenure</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">Up to 30 Years</p>
                <p className="mt-2 text-sm text-gray-600">Flexible repayment options</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Loan Amount</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">₹5L - ₹1Cr</p>
                <p className="mt-2 text-sm text-gray-600">Based on profile and property</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Processing Fee</h3>
                <p className="mt-3 text-2xl font-bold text-gray-900">0% - 2%</p>
                <p className="mt-2 text-sm text-gray-600">Transparent & minimal</p>
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
              <p className="mt-2 text-gray-600">Common benchmarks used during evaluation</p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Minimum Age</dt>
                  <dd className="mt-2 text-lg font-bold text-gray-900">21 years</dd>
                  <p className="mt-1 text-xs text-gray-600">Commonly required</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Max Age at Maturity</dt>
                  <dd className="mt-2 text-lg font-bold text-gray-900">60-65 years</dd>
                  <p className="mt-1 text-xs text-gray-600">Varies by lender</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Employment Type</dt>
                  <dd className="mt-2 text-lg font-bold text-gray-900">Salaried / Self-employed</dd>
                  <p className="mt-1 text-xs text-gray-600">With stable income</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <dt className="text-sm font-semibold text-gray-900">Minimum Income</dt>
                  <dd className="mt-2 text-lg font-bold text-gray-900">₹25,000+/month</dd>
                  <p className="mt-1 text-xs text-gray-600">Varies by city</p>
                </div>
              </dl>
            </div>

            {/* Documentation Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Required Documentation</h2>
              <p className="mt-2 text-gray-600">Keep digital copies ready. The exact list depends on your profile.</p>

              <div className="mt-6 grid gap-4">
                <div className="rounded-xl border-l-4 border-l-blue-600 bg-blue-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-900">Identity Proof</h3>
                  <p className="mt-2 text-sm text-gray-700">Aadhaar, PAN, Passport, or Voter ID</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-green-600 bg-green-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-900">Address Proof</h3>
                  <p className="mt-2 text-sm text-gray-700">Utility bill, Aadhaar, Passport, or Rent agreement</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-purple-600 bg-purple-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-900">Income Proof</h3>
                  <p className="mt-2 text-sm text-gray-700">Salary slips, Form 16, ITR, or business financials</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-orange-600 bg-orange-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-900">Property Documents</h3>
                  <p className="mt-2 text-sm text-gray-700">Sale agreement, title deed, approved plan, and NOC</p>
                </div>
                <div className="rounded-xl border-l-4 border-l-red-600 bg-red-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-900">Bank Statements</h3>
                  <p className="mt-2 text-sm text-gray-700">Last 6 months statements (commonly requested)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Tips */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">💡 Quick Tips</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Keep your credit score 700+ for better rates</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Compare fixed vs floating rates based on risk comfort</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Maintain a buffer for registration and closing costs</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm text-gray-700">Pre-approval can boost your negotiating power</span>
                </li>
              </ul>
            </div>

            {/* Expert Help CTA */}
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="text-lg font-bold text-blue-900">🤝 Need Expert Guidance?</h3>
              <p className="mt-2 text-sm text-blue-800">
                Our financial experts will help you find the best loan tailored to your needs.
              </p>
              <Link
                href="/contact"
                className="mt-4 block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Talk to an Expert
              </Link>
            </div>

            {/* FAQ Preview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900">❓ Common Questions</h3>
              <div className="mt-4 space-y-3">
                <details className="group cursor-pointer">
                  <summary className="text-sm font-medium text-gray-900 group-open:text-blue-600">
                    How long does approval take?
                  </summary>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    Most loans are approved within 24 hours with instant disbursal.
                  </p>
                </details>
                <details className="group cursor-pointer">
                  <summary className="text-sm font-medium text-gray-900 group-open:text-blue-600">
                    What's the minimum credit score?
                  </summary>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    Typically 700+, but some lenders may consider lower scores.
                  </p>
                </details>
                <details className="group cursor-pointer">
                  <summary className="text-sm font-medium text-gray-900 group-open:text-blue-600">
                    Can I prepay without penalty?
                  </summary>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    Yes, most modern home loans allow prepayment without charges.
                  </p>
                </details>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <EmiCalculator />
      </section>

      {/* CTA Section */}
      <section id="apply" className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Own Your Dream Home?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Start your application today and get approval within 24 hours. Our team will guide you through every step of the process.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:shadow-xl transition hover:bg-blue-50"
            >
              Apply for Home Loan
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Request a Callback
            </Link>
          </div>

          <p className="mt-8 text-sm text-blue-200">
            ✓ No hidden charges | ✓ Transparent process | ✓ Expert support
          </p>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Disclaimer:</strong> Eligibility, interest rates, tenure, and loan amounts depend on individual lender policies and your profile including credit score, income, employment status, and property details. This page is for informational purposes only and does not constitute an offer or commitment for any loan. Please consult with our experts or directly with lenders for personalized quotes and terms. Tax benefits are subject to applicable income tax laws and individual circumstances.
          </p>
        </div>
      </section>
    </main>
  );
}