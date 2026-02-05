import type { Metadata } from "next";
import Link from "next/link";
import BusinessLoanEmiCalculator from "./_components/BusinessLoanEmiCalculator";

export const metadata: Metadata = {
  title: "Business Loan",
};

export default function BusinessLoanPage() {
  return (
    <main className="bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-blue-600">Business Loan</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Growth capital for MSMEs, startups, and enterprises
              </h1>
              <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                Business loans help you manage working capital, expand operations, purchase equipment, and maintain cash
                flow—often with fast approvals and flexible repayment options.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Business Loan
                </Link>
                <Link
                  href="#eligibility"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Typical use</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Working capital</p>
                  <p className="mt-1 text-sm text-gray-600">Cover inventory, payroll, vendor payments and cash gaps.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Expansion</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Scale faster</p>
                  <p className="mt-1 text-sm text-gray-600">Open new locations, hire, and invest in growth.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Equipment</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Upgrade assets</p>
                  <p className="mt-1 text-sm text-gray-600">Purchase machinery, tools, and essential equipment.</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Options</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Secured / unsecured</p>
                  <p className="mt-1 text-sm text-gray-600">Choose based on collateral availability and pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900">Business loan categories</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Explore popular business funding options based on your working capital needs, repayment preference, and
              cash-flow cycle.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">MSME / SME Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Funding for small and mid-size businesses to support growth, operations, and business expansion.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Working Capital</h3>
              <p className="mt-2 text-sm text-gray-600">
                Manage day-to-day expenses like inventory, salaries, vendor payments, and short-term cash gaps.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Overdraft / CC</h3>
              <p className="mt-2 text-sm text-gray-600">
                A revolving credit facility to withdraw funds when needed and pay interest only on the amount used.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Invoice Discounting</h3>
              <p className="mt-2 text-sm text-gray-600">
                Unlock cash from unpaid invoices to improve liquidity and keep your sales cycle running smoothly.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">Machinery Loan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Finance equipment and machinery purchases to increase production capacity and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">Business loan description</h2>
              <div className="mt-3 space-y-3 text-sm text-gray-600 sm:text-base">
                <p>
                  A business loan is a funding solution designed to help businesses manage day-to-day operations and long
                  term growth. Depending on the lender and product, loans may be unsecured (minimal/no collateral) or
                  secured (backed by collateral such as property, deposits, or other assets).
                </p>
                <p>
                  Common use cases include working capital, expansion, equipment purchase, inventory stocking, marketing,
                  and cash flow management. Selecting the right tenure and repayment schedule helps maintain healthy
                  business finances.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5" aria-labelledby="use-cases">
                  <h3 id="use-cases" className="text-base font-semibold text-gray-900">Use cases</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Working capital and cash flow support
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Business expansion and new location setup
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Equipment purchase and upgrades
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      Inventory and vendor payments
                    </li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5" aria-labelledby="secured-unsecured">
                  <h3 id="secured-unsecured" className="text-base font-semibold text-gray-900">Secured vs unsecured</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Unsecured loans may require minimal collateral but can have higher rates. Secured loans often offer
                    lower rates and higher limits based on collateral value.
                  </p>
                </section>
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm" aria-labelledby="benefits">
              <h2 id="benefits" className="text-base font-bold text-gray-900">Key features &amp; benefits</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  No or minimal collateral for unsecured loans
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Flexible repayment tenure
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Competitive interest rates
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Quick disbursal and streamlined processing
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Higher loan amounts for eligible businesses
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

      <section id="eligibility" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="eligibility-title">
            <h2 id="eligibility-title" className="text-xl font-bold text-gray-900">Eligibility criteria</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Eligibility may vary by lender and product. These are common benchmarks for business loans.
            </p>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Minimum age of applicant</dt>
                <dd className="mt-1 text-sm text-gray-600">Typically 21 years (varies by lender)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Business vintage</dt>
                <dd className="mt-1 text-sm text-gray-600">Usually 2+ years in operation (product dependent)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Annual turnover requirement</dt>
                <dd className="mt-1 text-sm text-gray-600">Varies by lender and segment (commonly ₹10L+)</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Credit score / CIBIL score</dt>
                <dd className="mt-1 text-sm text-gray-600">Typically 700+ improves approval and pricing</dd>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <dt className="text-sm font-semibold text-gray-900">Type of business</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  Proprietorship, Partnership, LLP, or Private Limited (as per lender policy)
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="documents">
            <h2 id="documents" className="text-xl font-bold text-gray-900">Required documentation</h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Keep copies ready. Documentation requirements may vary based on secured/unsecured product.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">KYC documents</h3>
                <p className="mt-1 text-sm text-gray-600">PAN, Aadhaar, and address proof (as applicable)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Business registration proof</h3>
                <p className="mt-1 text-sm text-gray-600">Udyam, Shop Act, Incorporation certificate, etc.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">GST registration (if applicable)</h3>
                <p className="mt-1 text-sm text-gray-600">GST certificate and returns as required</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Income tax returns</h3>
                <p className="mt-1 text-sm text-gray-600">ITR for last 1–3 years (commonly requested)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Bank statements</h3>
                <p className="mt-1 text-sm text-gray-600">Last 6–12 months statements (commonly requested)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">Financial statements</h3>
                <p className="mt-1 text-sm text-gray-600">P&amp;L and balance sheet (for eligible profiles)</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <BusinessLoanEmiCalculator />
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
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Business Loan
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Check Eligibility
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
