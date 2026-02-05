import type { Metadata } from "next";
import Link from "next/link";
import GoldAssetLoanCalculator from "./_components/GoldAssetLoanCalculator";

export const metadata: Metadata = {
  title: "Gold & Asset Loan",
};

export default function GoldAssetLoanPage() {
  return (
    <main className="bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Gold &amp; Asset Loan</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Secure a loan against your valuable assets
              </h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                Gold and asset-backed loans are secured loans where you pledge assets like gold, fixed deposits,
                insurance policies, or other valuables to access funds quickly—often at lower interest rates than
                unsecured credit.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Get Loan Against Assets
                </Link>
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Calculate EMI
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
              <h2 className="text-base font-bold text-gray-900">Assets you can pledge</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Depending on lender policy, you may be able to secure funding against:
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Gold</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Jewellery / coins</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Fixed deposits</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">FD-backed loans</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Insurance</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Policy-backed loans</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Other valuables</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">As per lender</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Gold &amp; asset loan categories</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Choose the right asset-backed product based on what you’re pledging and how fast you need funds.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Gold Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Secure funds against gold jewellery/coins with quick processing and a loan amount based on valuation.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Loan Against Securities</h3>
              <p className="mt-2 text-sm text-gray-600">
                Borrow against eligible investments like shares, mutual funds, or bonds without selling them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">Introduction</h2>
              <div className="mt-3 space-y-3 text-sm text-gray-600 sm:text-base">
                <p>
                  A gold and asset-backed loan is a secured borrowing option where the pledged asset reduces the lender’s
                  risk. This often results in lower interest rates, faster processing, and simpler documentation.
                </p>
                <p>
                  Assets can include gold jewellery, fixed deposits, insurance policies, or other valuable instruments.
                  The eligible loan amount is typically determined by the asset value and the lender’s loan-to-value
                  (LTV) policy.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5" aria-labelledby="advantages">
                  <h3 id="advantages" className="text-base font-semibold text-gray-900">Advantages</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Lower interest rates compared to unsecured loans
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Quick disbursal for urgent needs
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Minimal documentation in many cases
                    </li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5" aria-labelledby="use-cases">
                  <h3 id="use-cases" className="text-base font-semibold text-gray-900">Use cases</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Working capital, education, medical expenses, business expansion, or debt consolidation.
                  </p>
                </section>
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm" aria-labelledby="tips">
              <h2 id="tips" className="text-base font-bold text-gray-900">Quick tips</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Understand the LTV policy for your specific asset type.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Confirm custody/valuation process and associated fees.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Repay on time to avoid penalties and keep assets safe.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm" aria-labelledby="help">
              <h2 id="help" className="text-base font-bold text-blue-900">Need help choosing?</h2>
              <p className="mt-2 text-sm text-blue-900/80">
                Share your requirement and we’ll recommend the right product and next steps.
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

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="eligibility">
            <h2 id="eligibility" className="text-xl font-bold text-gray-900">Gold &amp; Asset Loans – Eligibility Criteria</h2>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Applicant must be an Indian resident</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Minimum age: 18 years or above</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Ownership of eligible gold jewellery or approved financial securities</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Assets must be clear, authentic, and acceptable to the lender</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Active bank account</dt>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Basic credit assessment as per lender policy</dt>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="documents">
            <h2 id="documents" className="text-xl font-bold text-gray-900">Gold &amp; Asset Loans – Documents Required</h2>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">PAN Card</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Aadhaar Card / Valid address proof</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Ownership proof of gold jewellery or financial securities</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Bank account details</h3>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <GoldAssetLoanCalculator />
      </section>

      <section id="apply" className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Get loan against assets</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  Start your application and we’ll guide you through eligibility checks and documentation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Get Loan Against Assets
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
