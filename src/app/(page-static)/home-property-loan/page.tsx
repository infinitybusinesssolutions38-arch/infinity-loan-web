import type { Metadata } from "next";
import Link from "next/link";
import EmiCalculator from "../../components/Calculator";

export const metadata: Metadata = {
  title: "Home & Property Loan",
};

export default function HomePropertyLoanPage() {
  return (
    <main className="bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Home &amp; Property Loan</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Unlock funds against your residential or commercial property
              </h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                A loan against property (LAP) lets you leverage the value of a property you own to access larger loan
                amounts, competitive interest rates, and flexible repayment tenures.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Property Loan
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Benefit</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Lower interest rates</p>
                  <p className="mt-1 text-sm text-gray-600">Because the loan is secured against property.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Loan size</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Higher amounts</p>
                  <p className="mt-1 text-sm text-gray-600">Access larger funding based on property value.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tenure</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Flexible repayment</p>
                  <p className="mt-1 text-sm text-gray-600">Choose a tenure that fits your cash flow.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Use cases</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Business or personal</p>
                  <p className="mt-1 text-sm text-gray-600">Expansion, consolidation, education, or emergencies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Home &amp; property loan categories</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Choose a product based on your property goal—buying a home, building on a plot, or leveraging an owned
              property for funds.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Home Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Finance the purchase of a new or resale home with long tenures and structured EMIs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Loan Against Property</h3>
              <p className="mt-2 text-sm text-gray-600">
                Borrow against a residential or commercial property you own for business or personal needs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Plot / Construction Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Funding for purchasing a plot or constructing a house, often disbursed in stages as work progresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">Detailed description</h2>
              <div className="mt-3 space-y-3 text-sm text-gray-600 sm:text-base">
                <p>
                  A loan against property is a secured loan where you pledge a residential or commercial property you
                  own as collateral. Since the loan is backed by an asset, lenders may offer lower interest rates
                  compared to unsecured loans.
                </p>
                <p>
                  LAP can be used for a wide range of needs such as business expansion, working capital, debt
                  consolidation, education, or major personal expenses. In many cases, borrowers can access higher loan
                  amounts and longer tenures, helping keep EMIs manageable.
                </p>
                <p>
                  The sanctioned amount depends on factors like property value, loan-to-value (LTV) policy, borrower
                  income, existing obligations, and credit history.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Why it’s beneficial</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Typically offers better pricing and higher eligibility due to security of collateral.
                  </p>
                </section>
                <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">What to watch</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Ensure repayments are on time to avoid risk to the pledged property.
                  </p>
                </section>
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900">Quick checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Clear property ownership and title documents.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Stable income proof and bank statements.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Healthy repayment history and credit score.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h3 className="text-base font-bold text-blue-900">Need assistance?</h3>
              <p className="mt-2 text-sm text-blue-900/80">
                Talk to an expert to understand eligibility, LTV and lender requirements.
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
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="eligibility">
            <h2 id="eligibility" className="text-xl font-bold text-gray-900">Home &amp; Property Loans – Eligibility Criteria</h2>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Applicant age: 21–65 years</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Indian resident</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Stable income source (salaried or self-employed)</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Acceptable credit profile / credit score of 650 or above preferred</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Clear and marketable property title</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Property must be legally approved as per local authorities</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Approved construction plan (where applicable)</dt>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="documents">
            <h2 id="documents" className="text-xl font-bold text-gray-900">Home &amp; Property Loans – Documents Required</h2>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">PAN Card</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Aadhaar Card / Valid address proof</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Income proof (salary slips or Income Tax Returns)</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Bank statements (last 6–12 months)</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Property ownership documents / sale agreement</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Approved construction plans and permissions (if applicable), for home &amp; property</h3>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <EmiCalculator />
      </section>

      <section id="apply" className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Apply for a property loan</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  Start your application and we’ll help you validate eligibility, property documents and next steps.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Property Loan
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
