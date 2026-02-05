import type { Metadata } from "next";
import Link from "next/link";
import VehicleLoanEmiCalculator from "./_components/VehicleLoanEmiCalculator";

export const metadata: Metadata = {
  title: "Vehicle Loan",
};

export default function VehicleLoanPage() {
  return (
    <main className="bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Vehicle Loan</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Drive your goals forward with affordable EMIs
              </h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                Vehicle loans help you finance a new or used car, bike, or commercial vehicle. With flexible tenures and
                competitive rates, you can spread the cost into manageable monthly repayments.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply Now
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
              <h2 className="text-base font-bold text-gray-900">Overview</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Whether you’re purchasing a personal vehicle or expanding your fleet, vehicle loans can cover:
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Car loan</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">New &amp; used cars</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Bike loan</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Two-wheelers</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Commercial</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Fleet &amp; logistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Vehicle loan categories</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Select the vehicle type you want to finance. Categories may differ based on lender policies and vehicle
              eligibility.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Car Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Finance a new or used car with structured EMIs and flexible tenure options.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Two-Wheeler Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Easy financing for bikes and scooters with quick processing and manageable repayments.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Commercial Vehicle</h3>
              <p className="mt-2 text-sm text-gray-600">
                Funding for trucks and commercial vehicles to support business operations and fleet expansion.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">EV Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Finance electric vehicles with competitive rates and flexible repayment options (subject to policy).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="benefits">
              <h2 id="benefits" className="text-xl font-bold text-gray-900">Benefits</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Vehicle loans are built for speed and convenience, helping you get on the road without large upfront
                payments.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Competitive interest rates</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Rates depend on your profile and vehicle type. A strong credit history can unlock better offers.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Flexible repayment options</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Choose a tenure and EMI that fits your income. Some lenders offer step-up EMIs or part-prepayment.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Fast processing</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Digital KYC and simplified documentation can speed up approvals and disbursal.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-base font-semibold text-gray-900">Wide coverage</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Finance new or used vehicles, and in many cases, add-ons like insurance and accessories.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm" aria-labelledby="quick-tips">
              <h2 id="quick-tips" className="text-base font-bold text-gray-900">Quick tips</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Compare offers and processing fees before finalising.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Keep a stable income and minimize existing EMIs.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Get a vehicle quotation ready for faster processing.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm" aria-labelledby="support">
              <h2 id="support" className="text-base font-bold text-blue-900">Need assistance?</h2>
              <p className="mt-2 text-sm text-blue-900/80">
                Share your requirement and we’ll help you shortlist the right lender and product.
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
            <h2 id="eligibility" className="text-xl font-bold text-gray-900">Eligibility criteria</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Eligibility varies by lender and vehicle type. These are common criteria.
            </p>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Minimum age</dt>
                <dd className="mt-1 text-sm text-gray-600">Typically 21 years (varies by lender)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Employment type</dt>
                <dd className="mt-1 text-sm text-gray-600">Salaried or self-employed with stable income</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Income requirement</dt>
                <dd className="mt-1 text-sm text-gray-600">Often ₹20,000+/month (depends on city and lender)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Credit score</dt>
                <dd className="mt-1 text-sm text-gray-600">Generally 700+ for better rates (varies by lender)</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="documents">
            <h2 id="documents" className="text-xl font-bold text-gray-900">Required documents</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Keep clear copies ready. Some lenders may request additional documents based on your profile.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Identity proof</h3>
                <p className="mt-1 text-sm text-gray-600">PAN, Aadhaar, Passport, or Voter ID (as applicable)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Address proof</h3>
                <p className="mt-1 text-sm text-gray-600">Aadhaar, utility bill, rent agreement, etc. (as applicable)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Income proof</h3>
                <p className="mt-1 text-sm text-gray-600">Salary slips, Form 16, ITR, or business financials</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Vehicle quotation</h3>
                <p className="mt-1 text-sm text-gray-600">Quotation/proforma invoice from the dealer or vendor</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <VehicleLoanEmiCalculator />
      </section>

      <section id="apply" className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Apply now</h2>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  Start your application and we’ll guide you through eligibility checks and documentation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply Now
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
