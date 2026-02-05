import type { Metadata } from "next";
import Link from "next/link";
import PersonalLoanEmiCalculator from "./_components/PersonalLoanEmiCalculator";

export const metadata: Metadata = {
  title: "Personal Loan",
};

export default function PersonalLoanPage() {
  return (
    <main className="bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Personal Loan</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Fast, flexible funding for your personal goals
              </h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                A personal loan is an unsecured loan you can use for planned or urgent expenses. It offers quick
                approvals, predictable EMIs, and no collateral in most cases.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#eligibility"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Check Personal Loan Eligibility
                </Link>
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Calculate EMI
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900">Common uses</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    Medical expenses
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    Travel and holidays
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    Education and courses
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    Emergency cash needs
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900">Why borrowers choose it</h2>
                <div className="mt-3 space-y-3">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Collateral</p>
                    <p className="mt-1 text-base font-bold text-gray-900">Not required</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Approval</p>
                    <p className="mt-1 text-base font-bold text-gray-900">Often quick</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tenure</p>
                    <p className="mt-1 text-base font-bold text-gray-900">Flexible</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2">
                <h2 className="text-sm font-semibold text-gray-900">Introduction</h2>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Personal loans can help cover both planned expenses and emergencies without needing to pledge an asset.
                  With fixed EMIs and transparent terms, they’re suitable for consolidating bills, funding life events,
                  handling medical needs, or investing in upskilling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Personal loan categories</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Choose the loan type that matches your requirement. Below are the most common personal loan categories.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Personal Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Unsecured loan for everyday needs like bills, weddings, purchases, or debt consolidation.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Instant Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Quick disbursal loan for urgent requirements with minimal documentation (subject to eligibility).
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Education Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Funding for tuition fees and education-related expenses to support higher studies or skill programs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Medical Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Helps manage hospital bills and treatment costs with structured EMIs for planned or emergency care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">Key features</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Personal loans are designed for speed and convenience. Here are the features borrowers value most.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">No collateral</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Since it’s unsecured, you typically don’t need to pledge property, gold, or other assets.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Quick approval</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Faster processing compared to secured loans, especially for salaried profiles with stable income.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Flexible tenure</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Choose a tenure that balances your EMI with the total interest you pay.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Fixed EMIs</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Repay in predictable monthly installments to simplify budgeting and cash flow planning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900">Before you apply</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Check your credit score and recent repayment history.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Keep income documents and bank statements ready.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Choose a tenure that keeps EMI comfortable.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h3 className="text-base font-bold text-blue-900">Need help?</h3>
              <p className="mt-2 text-sm text-blue-900/80">
                Share your requirement and we’ll help you shortlist the right product.
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

      <section id="eligibility" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Eligibility criteria</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Lenders may have different benchmarks. These are common requirements.
            </p>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Age limit</dt>
                <dd className="mt-1 text-sm text-gray-600">Typically 21 to 60 years (varies by lender)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Employment status</dt>
                <dd className="mt-1 text-sm text-gray-600">Salaried or self-employed with stable income</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Minimum monthly income</dt>
                <dd className="mt-1 text-sm text-gray-600">Often ₹20,000+/month (depends on city and lender)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Credit score</dt>
                <dd className="mt-1 text-sm text-gray-600">Generally 700+ for better pricing (varies by lender)</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Required documents</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Keep clear copies ready. Document requirements can differ by profile.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">PAN card</h3>
                <p className="mt-1 text-sm text-gray-600">Mandatory for identity and credit checks.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Aadhaar card</h3>
                <p className="mt-1 text-sm text-gray-600">Used for identity/address verification (as applicable).</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Salary slips / income proof</h3>
                <p className="mt-1 text-sm text-gray-600">Salary slips, Form 16, ITR, or business proof.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Bank statements</h3>
                <p className="mt-1 text-sm text-gray-600">Last 3–6 months statements (commonly requested).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <PersonalLoanEmiCalculator />
      </section>

      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Ready to check eligibility?</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  Start an application and we’ll help you validate your eligibility and required documents.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Check Personal Loan Eligibility
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
            Disclaimer: Eligibility and interest rates depend on lender policies and your profile. This page is for
            informational purposes.
          </p>
        </div>
      </section>
    </main>
  );
}
