import type { Metadata } from "next";
import Link from "next/link";
import EmiCalculator from "../../components/Calculator";
import {
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ArrowRightIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  TruckIcon,
  ReceiptPercentIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Business Loan - Fast Approval | Growth Capital for MSMEs & Enterprises",
  description: "Get business loans with competitive rates, flexible tenure, and quick approval. Fund your working capital, expansion, equipment, and more.",
};

const loanTypes = [
  {
    icon: BuildingOfficeIcon,
    title: "MSME / SME Loan",
    description: "Tailored funding for small and mid-size businesses to support growth, operations, and business expansion with minimal documentation.",
  },
  {
    icon: BanknotesIcon,
    title: "Working Capital",
    description: "Manage day-to-day expenses like inventory, salaries, vendor payments, and short-term cash gaps with flexible repayment options.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Overdraft / CC",
    description: "A revolving credit facility to withdraw funds when needed and pay interest only on the amount used. Perfect for seasonal businesses.",
  },
  {
    icon: ReceiptPercentIcon,
    title: "Invoice Discounting",
    description: "Unlock cash from unpaid invoices to improve liquidity and keep your sales cycle running smoothly without affecting customer relationships.",
  },
  {
    icon: CogIcon,
    title: "Machinery Loan",
    description: "Finance equipment and machinery purchases to increase production capacity, efficiency, and stay competitive in your industry.",
  },
  {
    icon: TruckIcon,
    title: "Asset Finance",
    description: "Fund the purchase of commercial vehicles, office equipment, IT infrastructure, and other business-critical assets.",
  },
];

const benefits = [
  {
    icon: ClockIcon,
    title: "Quick Approval",
    description: "Get approval in as little as 48 hours with minimal documentation",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Flexible Repayment",
    description: "Choose tenure from 12 to 84 months based on your cash flow",
  },
  {
    icon: ShieldCheckIcon,
    title: "Competitive Rates",
    description: "Interest rates starting from 9.99% per annum for eligible businesses",
  },
  {
    icon: DocumentTextIcon,
    title: "Minimal Documentation",
    description: "Simple KYC and business documents for faster processing",
  },
];

const faqData = [
  {
    question: "What is the minimum and maximum loan amount?",
    answer: "Business loans typically range from ₹50,000 to ₹5 crore, depending on your business profile, turnover, and creditworthiness. Some lenders may offer higher amounts for established businesses.",
  },
  {
    question: "How long does the approval process take?",
    answer: "With complete documentation, approval can be received within 48-72 hours. Disbursal typically happens within 3-7 working days after final approval and documentation verification.",
  },
  {
    question: "What is the interest rate for business loans?",
    answer: "Interest rates vary from 9.99% to 24% per annum based on your credit score, business vintage, turnover, and the type of loan (secured vs unsecured). Better credit profiles receive lower rates.",
  },
  {
    question: "Can I prepay my business loan?",
    answer: "Yes, most lenders allow prepayment with minimal or no charges after a certain period (usually 6-12 months). Some lenders offer zero prepayment charges throughout the loan tenure.",
  },
  {
    question: "Do I need collateral for a business loan?",
    answer: "It depends on the loan type. Unsecured business loans don't require collateral but may have lower limits and higher rates. Secured loans require collateral but offer better rates and higher amounts.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Application",
    description: "Fill out our simple online application form with basic business details and requirements.",
  },
  {
    step: "02",
    title: "Document Verification",
    description: "Upload required KYC, business registration, and financial documents for quick verification.",
  },
  {
    step: "03",
    title: "Credit Assessment",
    description: "Our team reviews your application and assesses eligibility based on your business profile.",
  },
  {
    step: "04",
    title: "Approval & Disbursal",
    description: "Receive approval within 48-72 hours and get funds disbursed directly to your bank account.",
  },
];

const comparisons = [
  {
    feature: "Loan Amount",
    unsecured: "₹50K - ₹50L",
    secured: "₹1L - ₹5Cr+",
  },
  {
    feature: "Interest Rate",
    unsecured: "14% - 24% p.a.",
    secured: "9.99% - 16% p.a.",
  },
  {
    feature: "Tenure",
    unsecured: "12 - 60 months",
    secured: "12 - 84 months",
  },
  {
    feature: "Processing Time",
    unsecured: "24 - 48 hours",
    secured: "3 - 7 days",
  },
  {
    feature: "Collateral",
    unsecured: "Not required",
    secured: "Required",
  },
];

export default function BusinessLoanPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Business Loan - Fast Approval
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Growth Capital for Your Business
              </h1>

              <p className="max-w-xl text-lg text-blue-100 sm:text-xl">
                Fund your working capital, expansion, equipment purchases, and operational needs with flexible business loans.
                Get approved in 48 hours with competitive rates starting from 9.99% p.a.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#apply"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  Apply Now
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  Calculate EMI
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">₹50K+</p>
                  <p className="text-sm text-blue-100">Min Amount</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">9.99%</p>
                  <p className="text-sm text-blue-100">From Rate</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">48hrs</p>
                  <p className="text-sm text-blue-100">Approval</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold">7 days</p>
                  <p className="text-sm text-blue-100">Disbursal</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-2xl"></div>
                <div className="relative grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div className="transform rounded-2xl bg-white p-6 shadow-2xl transition-transform hover:scale-105">
                      <div className="inline-flex rounded-xl bg-blue-100 p-3">
                        <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-gray-500">Working Capital</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">Cash Flow Support</p>
                    </div>
                    <div className="transform rounded-2xl bg-white p-6 shadow-2xl transition-transform hover:scale-105">
                      <div className="inline-flex rounded-xl bg-green-100 p-3">
                        <ChartBarIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-gray-500">Expansion</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">Scale Faster</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="transform rounded-2xl bg-white p-6 shadow-2xl transition-transform hover:scale-105">
                      <div className="inline-flex rounded-xl bg-purple-100 p-3">
                        <CogIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-gray-500">Equipment</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">Upgrade Assets</p>
                    </div>
                    <div className="transform rounded-2xl bg-white p-6 shadow-2xl transition-transform hover:scale-105">
                      <div className="inline-flex rounded-xl bg-orange-100 p-3">
                        <ShieldCheckIcon className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-gray-500">Options</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">Secured/Unsecured</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Our Business Loans?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience hassle-free financing with benefits designed for business growth
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative">
                <div className="inline-flex rounded-xl bg-blue-100 p-3 transition-transform group-hover:scale-110">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Business Loan Categories</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Explore funding options tailored to your business needs, cash flow cycle, and growth objectives
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loanTypes.map((loan, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:border-blue-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex rounded-xl bg-blue-100 p-3 transition-all group-hover:bg-blue-600 group-hover:scale-110">
                      <loan.icon className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {loan.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{loan.description}</p>
                    <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2">
                      Learn more
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Simple Application Process</h2>
          <p className="mt-4 text-lg text-gray-600">Get funded in 4 easy steps</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              {index < processSteps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-blue-600 to-blue-400 lg:block"></div>
              )}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-3xl font-bold text-white shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secured vs Unsecured Comparison */}
      <section className="border-y border-gray-100 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Secured vs Unsecured Loans</h2>
            <p className="mt-4 text-lg text-gray-600">Choose the right option based on your requirements</p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">Unsecured Loan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-600">Secured Loan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons.map((row, index) => (
                    <tr key={index} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.unsecured}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.secured}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Article */}
          <div className="lg:col-span-2 space-y-8">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">About Business Loans</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  A business loan is a comprehensive funding solution designed to help businesses of all sizes manage
                  day-to-day operations, invest in growth opportunities, and navigate financial challenges. Whether you're
                  a startup looking to establish your presence or an established enterprise planning expansion, business
                  loans provide the capital you need to achieve your goals.
                </p>
                <p>
                  Depending on the lender and product type, business loans can be unsecured (requiring minimal or no
                  collateral) or secured (backed by collateral such as property, fixed deposits, securities, or other
                  valuable assets). Unsecured loans offer faster processing but may have higher interest rates, while
                  secured loans provide larger amounts at competitive rates.
                </p>
                <p>
                  Common use cases include managing working capital needs, funding business expansion into new markets,
                  purchasing machinery and equipment, stocking inventory, running marketing campaigns, bridging cash flow
                  gaps, hiring talent, and refinancing existing debt. Selecting the right loan type, tenure, and
                  repayment schedule is crucial for maintaining healthy business finances and sustainable growth.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                    Primary Use Cases
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      <span>Working capital for inventory, payroll, and operational expenses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      <span>Business expansion including new locations and market entry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      <span>Equipment, machinery, and technology infrastructure purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      <span>Inventory stocking and vendor payment management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      <span>Marketing campaigns and brand building initiatives</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-white p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                    Loan Security Options
                  </h3>
                  <div className="mt-4 space-y-4 text-sm text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-900">Unsecured Loans</p>
                      <p className="mt-1">Require minimal or no collateral, faster processing, suitable for smaller amounts,
                        but typically come with higher interest rates and shorter tenure options.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Secured Loans</p>
                      <p className="mt-1">Backed by collateral (property, equipment, securities), offer lower interest rates,
                        higher loan amounts, longer tenure, and better terms for established businesses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Interest Rate Factors */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">Factors Affecting Interest Rates</h2>
              <p className="mt-2 text-gray-600">
                Understanding these factors can help you secure better loan terms
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">Credit Score</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Higher credit scores (750+) typically qualify for rates 3-5% lower than average rates. Maintaining
                    good credit is crucial for better terms.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">Business Vintage</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Businesses operating for 3+ years receive preferential rates due to established track record and
                    lower perceived risk.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">Annual Turnover</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Higher annual turnover demonstrates business stability and repayment capacity, leading to better
                    interest rates and loan amounts.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">Loan Security</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Secured loans with valuable collateral receive significantly lower rates (2-5% less) compared to
                    unsecured options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* Key Features */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                  Key Features & Benefits
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Loan amounts from ₹50,000 up to ₹5 crore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Competitive interest rates starting at 9.99% p.a.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Flexible tenure options from 12 to 84 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Quick approval within 48-72 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Minimal documentation for faster processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>No or low prepayment charges after 6 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Dedicated relationship manager support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Online account management and tracking</span>
                  </li>
                </ul>
              </section>

              {/* CTA Card */}
              <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
                <div className="text-center">
                  <div className="mx-auto inline-flex rounded-full bg-blue-100 p-3">
                    <UserGroupIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-blue-900">Need Expert Guidance?</h2>
                  <p className="mt-2 text-sm text-blue-900/80">
                    Our loan specialists are here to help you choose the right business loan product and guide you
                    through the application process.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Talk to an Expert
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              {/* Quick Links */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                <div className="mt-4 space-y-2">
                  <Link
                    href="#calculator"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-all hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span>Calculate EMI</span>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                  <Link
                    href="#eligibility"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-all hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                  <Link
                    href="#documents"
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-all hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span>Required Documents</span>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section id="eligibility" className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Eligibility & Documentation</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ensure you meet the criteria and have documents ready for faster processing
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Eligibility */}
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900">Eligibility Criteria</h3>
              <p className="mt-2 text-gray-600">
                Standard requirements that may vary by lender and loan product
              </p>

              <dl className="mt-6 space-y-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <UserGroupIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    Age Requirement
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600">
                    Applicant should be between 21 to 65 years of age. Co-applicants may have different age criteria.
                  </dd>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                      <BuildingOfficeIcon className="h-4 w-4 text-green-600" />
                    </div>
                    Business Vintage
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600">
                    Minimum 2-3 years of business operations. Startups may qualify for specific startup loan programs with
                    relaxed criteria.
                  </dd>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                      <ChartBarIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    Annual Turnover
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600">
                    Minimum annual turnover of ₹10 lakhs for unsecured loans. Secured loans may have higher requirements
                    based on loan amount.
                  </dd>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                      <ShieldCheckIcon className="h-4 w-4 text-orange-600" />
                    </div>
                    Credit Score
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600">
                    CIBIL score of 700+ is recommended for better approval chances and interest rates. Scores above 750
                    receive preferential pricing.
                  </dd>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                      <DocumentTextIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    Business Entity Type
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600">
                    Proprietorship, Partnership, LLP, Private Limited, or Public Limited companies. Requirements vary by
                    entity structure.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Documents */}
            <div id="documents" className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900">Required Documents</h3>
              <p className="mt-2 text-gray-600">
                Keep these documents ready for quick application processing
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-600">
                      1
                    </span>
                    KYC Documents
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    PAN card (mandatory), Aadhaar card, Voter ID, Passport, or Driving License for identity and address
                    verification of all partners/directors.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-600">
                      2
                    </span>
                    Business Registration
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Udyam registration, Shop Act license, GST certificate, Partnership deed, Certificate of Incorporation,
                    MOA/AOA as applicable.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-600">
                      3
                    </span>
                    Financial Documents
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    ITR for last 2-3 years with computation, audited financial statements (P&L, Balance Sheet), GST
                    returns for last 12 months.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-600">
                      4
                    </span>
                    Bank Statements
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Last 6-12 months current account statements showing regular business transactions, salary credits,
                    and healthy account conduct.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-600">
                      5
                    </span>
                    Business Proof
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Office address proof (rent agreement/ownership documents), business photographs, existing loan
                    statements if any.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-600">
                      6
                    </span>
                    Collateral Documents (for secured loans)
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Property documents, valuation reports, NOC from co-owners, insurance papers, or other security-related
                    documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section id="calculator" className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Business Loan EMI Calculator</h2>
            <p className="mt-4 text-lg text-gray-600">
              Calculate your monthly EMI and plan your finances effectively
            </p>
          </div>
          <div className="mt-12">
            <EmiCalculator />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get answers to common questions about business loans
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                  <span className="text-base">{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-blue-600 transition-transform group-open:rotate-180">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="border-t border-gray-100 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl sm:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full bg-blue-50 opacity-50"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-20 translate-y-20 rounded-full bg-indigo-50 opacity-50"></div>

            <div className="relative">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ready to Grow Your Business?</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Apply now and get approval within 48 hours. Our team will guide you through every step of the process.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Apply for Business Loan
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-md transition-all hover:border-blue-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  Calculate EMI
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
                  <ClockIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">48-Hour Approval</p>
                    <p className="text-xs text-gray-600">Quick decision</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">From 9.99% p.a.</p>
                    <p className="text-xs text-gray-600">Competitive rates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-4">
                  <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure Process</p>
                    <p className="text-xs text-gray-600">100% safe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-blue-100">
            *Eligibility criteria, interest rates, and loan terms are subject to lender policies and applicant profile.
            This page is for informational purposes only. Actual terms may vary.
          </p>
        </div>
      </section>
    </main>
  );
}