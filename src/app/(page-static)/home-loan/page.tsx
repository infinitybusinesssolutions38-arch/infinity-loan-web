import type { Metadata } from "next";
import Link from "next/link";
import HomeLoanEmiCalculator from "./_components/HomeLoanEmiCalculator";

export const metadata: Metadata = {
  title: "Home Loan",
};

export default function HomeLoanPage() {
  return (
    <main className="bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Home Loan</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Finance your dream home with flexible EMIs
              </h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                A home loan helps you purchase, construct, or renovate a house with affordable repayments, long tenures
                and potential tax benefits. Compare options and apply with confidence.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Home Loan
                </Link>
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Calculate EMI
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Typical Tenure</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Up to 30 years</p>
                  <p className="mt-1 text-sm text-gray-600">Plan long-term EMIs that fit your monthly budget.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Interest Options</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Fixed / Floating</p>
                  <p className="mt-1 text-sm text-gray-600">Choose stability or flexibility based on your goals.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tax Benefits</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">May apply</p>
                  <p className="mt-1 text-sm text-gray-600">Potential deductions on principal and interest.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Use Cases</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Buy / Build / Renovate</p>
                  <p className="mt-1 text-sm text-gray-600">Support multiple property-related needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">What is a home loan?</h2>
              <div className="mt-3 space-y-3 text-sm text-gray-600 sm:text-base">
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

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Interest rates</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Rates vary by lender and profile. Better credit score and stable income can improve your offer.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Tenure</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Longer tenures reduce EMI but increase total interest. Balance affordability with total cost.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Tax benefits</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Potential deductions may be available on principal and interest. Consult a tax advisor for details.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Use cases</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Purchase, construction, renovation, balance transfer, or top-up (subject to lender policy).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900">Quick tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Keep your credit score healthy before applying.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Compare fixed vs floating based on risk comfort.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Maintain a buffer for registration and other costs.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h3 className="text-base font-bold text-blue-900">Need help choosing?</h3>
              <p className="mt-2 text-sm text-blue-900/80">
                Share your requirement and we’ll help you shortlist a suitable lender and product.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Talk to an expert
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Eligibility criteria</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Eligibility can vary by lender. These are common benchmarks used during evaluation.
            </p>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Minimum age</dt>
                <dd className="mt-1 text-sm text-gray-600">21 years (commonly)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Maximum age at loan maturity</dt>
                <dd className="mt-1 text-sm text-gray-600">Up to 60–65 years (commonly)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Employment type</dt>
                <dd className="mt-1 text-sm text-gray-600">Salaried or self-employed (with stable income)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Minimum income</dt>
                <dd className="mt-1 text-sm text-gray-600">Varies by city and lender (often ₹25,000+/month)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Credit score requirement</dt>
                <dd className="mt-1 text-sm text-gray-600">Typically 700+ for better rates (varies by lender)</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Required documentation</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Keep digital copies ready. The exact list depends on your profile and property type.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Identity proof</h3>
                <p className="mt-1 text-sm text-gray-600">Aadhaar, PAN, Passport, or Voter ID (any as applicable)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Address proof</h3>
                <p className="mt-1 text-sm text-gray-600">Utility bill, Aadhaar, Passport, or Rent agreement</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Income proof</h3>
                <p className="mt-1 text-sm text-gray-600">Salary slips, Form 16, ITR, or business financials</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Property documents</h3>
                <p className="mt-1 text-sm text-gray-600">Sale agreement, title deed, approved plan, and NOC (as applicable)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Bank statements</h3>
                <p className="mt-1 text-sm text-gray-600">Last 6 months statements (commonly requested)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <HomeLoanEmiCalculator />
      </section>

      <section id="apply" className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Ready to apply?</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  Start your application and we’ll guide you through eligibility checks and documentation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Home Loan
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Request a callback
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Disclaimer: Eligibility, interest rates and tenure depend on lender policies and your profile. This page is for
            informational purposes.
          </p>
        </div>
      </section>
    </main>
  );
}
