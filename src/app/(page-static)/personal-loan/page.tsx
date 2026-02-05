import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  CreditCard,
  Heart,
  Plane,
  Briefcase,
  GraduationCap,
  AlertCircle,
  ChevronDown,
  Percent,
  Calendar,
  Target,
  Award,
  ShoppingCart,
} from "lucide-react";
import PersonalLoanEmiCalculator from "./_components/PersonalLoanEmiCalculator";

export const metadata: Metadata = {
  title: "Personal Loan - Fast Approval, Flexible EMI | Get Unsecured Loans",
  description: "Get quick personal loans with minimal documentation, flexible EMI, and instant approval. Perfect for medical, education, travel, and emergency needs. Apply online today.",
};

export default function PersonalLoanPage() {
  const loanFeatures = [
    { icon: Zap, title: "Quick Approval", description: "Often within 24-48 hours" },
    { icon: Shield, title: "No Collateral", description: "Unsecured loan, no assets needed" },
    { icon: Clock, title: "Flexible EMI", description: "Choose tenure from 12-60 months" },
    { icon: TrendingUp, title: "Competitive Rates", description: "From 9% onwards (indicative)" },
  ];

  const loanCategories = [
    {
      icon: Heart,
      title: "Medical Loan",
      description: "For hospitalization, surgery, and medical treatment costs",
      amount: "₹1L - ₹50L",
      tenure: "12-60 months"
    },
    {
      icon: Plane,
      title: "Travel Loan",
      description: "Fund your dream vacation, family trips, and adventures",
      amount: "₹50K - ₹50L",
      tenure: "12-60 months"
    },
    {
      icon: GraduationCap,
      title: "Education Loan",
      description: "For courses, upskilling, and higher education expenses",
      amount: "₹1L - ₹100L",
      tenure: "12-84 months"
    },
    {
      icon: Briefcase,
      title: "Business Loan",
      description: "Support your business expansion and working capital needs",
      amount: "₹1L - ₹100L",
      tenure: "12-84 months"
    },
    {
      icon: DollarSign,
      title: "Debt Consolidation",
      description: "Merge multiple debts into single manageable EMI",
      amount: "₹2L - ₹100L",
      tenure: "12-84 months"
    },
    {
      icon: ShoppingCart,
      title: "Shopping & Lifestyle",
      description: "For shopping, home upgrades, and lifestyle needs",
      amount: "₹50K - ₹50L",
      tenure: "12-60 months"
    },
  ];

  const keyFeatures = [
    {
      icon: Zap,
      title: "No Collateral Required",
      description: "Being unsecured means you don't pledge any asset, making it faster and simpler"
    },
    {
      icon: Clock,
      title: "Quick Approval",
      description: "Often approved within 24-48 hours for salaried individuals with proper documentation"
    },
    {
      icon: DollarSign,
      title: "Flexible Amount",
      description: "Borrow from ₹50,000 to ₹100 lakhs based on your profile and requirement"
    },
    {
      icon: Calendar,
      title: "Flexible Tenure",
      description: "Choose tenure from 12 to 84 months based on your repayment capacity"
    },
    {
      icon: Target,
      title: "Multiple Uses",
      description: "Use funds for any purpose - medical, education, travel, shopping, or emergencies"
    },
    {
      icon: Shield,
      title: "Transparent Terms",
      description: "Fixed EMI, no hidden charges, and clear terms and conditions upfront"
    },
  ];

  const loanComparison = [
    {
      feature: "Collateral Required",
      personalLoan: "No",
      homeLoan: "Yes (Property)",
      autoLoan: "Yes (Vehicle)"
    },
    {
      feature: "Interest Rate",
      personalLoan: "9-21%",
      homeLoan: "7-9%",
      autoLoan: "7-12%"
    },
    {
      feature: "Approval Time",
      personalLoan: "24-48 hours",
      homeLoan: "7-15 days",
      autoLoan: "2-3 days"
    },
    {
      feature: "Maximum Amount",
      personalLoan: "₹100L",
      homeLoan: "₹1Cr+",
      autoLoan: "₹20L"
    },
    {
      feature: "Tenure",
      personalLoan: "12-84 months",
      homeLoan: "5-30 years",
      autoLoan: "12-84 months"
    },
  ];

  const eligibilityCriteria = [
    { label: "Age", value: "21-65 years", icon: "👤" },
    { label: "Employment", value: "Salaried or Self-employed", icon: "💼" },
    { label: "Monthly Income", value: "₹20,000+/month", icon: "💰" },
    { label: "Credit Score", value: "700+ preferred", icon: "📊" },
    { label: "Job Experience", value: "Min 1-2 years", icon: "⏳" },
    { label: "Citizenship", value: "Indian citizen/NRI", icon: "🇮🇳" },
  ];

  const documentsList = [
    {
      title: "Identity Proof",
      items: ["Aadhaar", "PAN Card", "Passport", "Voter ID"],
      icon: "🆔"
    },
    {
      title: "Address Proof",
      items: ["Utility Bill", "Passport", "Aadhaar", "Driving License"],
      icon: "🏠"
    },
    {
      title: "Income Proof",
      items: ["Salary Slips", "Form 16", "ITR", "Bank Statements"],
      icon: "📄"
    },
    {
      title: "Employment Proof",
      items: ["Employee ID", "Offer Letter", "Business Proof"],
      icon: "📋"
    },
  ];

  const benefitCards = [
    {
      title: "Quick Money",
      description: "Get funds in your account within 24-48 hours of approval",
      stat: "24-48 hrs",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Lower Interest",
      description: "Competitive rates starting from 9% for excellent credit profiles",
      stat: "From 9%",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Minimal Documents",
      description: "Quick verification process with minimal documentation requirement",
      stat: "5-6 Docs",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Multiple Uses",
      description: "Use funds freely for any purpose - no restrictions on usage",
      stat: "Any Purpose",
      color: "from-orange-500 to-red-500"
    },
  ];

  const faqItems = [
    {
      question: "What is the difference between a personal loan and other types of loans?",
      answer: "Personal loans are unsecured loans that don't require collateral, making them quick and easy to obtain. Unlike home loans or auto loans, they can be used for any purpose and have faster approval times (24-48 hours). However, they typically have higher interest rates (9-21%) compared to secured loans."
    },
    {
      question: "How much can I borrow with a personal loan?",
      answer: "Loan amounts typically range from ₹50,000 to ₹100 lakhs, depending on your credit profile, income, employment stability, and the lender's policies. Your debt-to-income ratio also affects the maximum amount you can borrow. Most lenders offer up to 36-60 months of your monthly income as the maximum loan amount."
    },
    {
      question: "What is the typical interest rate for personal loans?",
      answer: "Personal loan interest rates typically range from 9% to 21% per annum, depending on your credit score, income, employment type, and loan amount. Excellent credit scores (750+) may get rates as low as 9-10%, while average credit (700-750) might see 12-16%. Self-employed individuals may face slightly higher rates."
    },
    {
      question: "How quickly can I get approval and funds?",
      answer: "Most lenders can provide approval within 24-48 hours after document submission for salaried individuals. Some offer instant approval based on CIBIL score and basic verification. Funds are typically disbursed within 24 hours of approval. Instant loans may process even faster with minimal documentation."
    },
    {
      question: "Can I prepay or foreclose my personal loan early?",
      answer: "Yes, most personal loans allow prepayment and foreclosure without penalty. Prepaying helps reduce total interest cost significantly. However, some lenders may charge a small prepayment fee (1-2%) or may have restrictions during the first 6 months. Always check your lender's prepayment policy."
    },
    {
      question: "What documents do I need to apply for a personal loan?",
      answer: "Generally, you need: identity proof (Aadhaar/PAN), address proof, salary slips (3-6 months) or income proof, bank statements (6-12 months), and employment proof. Self-employed individuals may need additional documents like ITR, business registration, and business bank statements. Requirements vary by lender."
    },
    {
      question: "Does a personal loan affect my credit score?",
      answer: "A hard inquiry during loan application may temporarily dip your credit score by 10-15 points. However, once approved, regular EMI payments improve your score over time as it shows responsible credit behavior. Missing EMI payments severely damages your credit score and makes future borrowing difficult."
    },
    {
      question: "Can I get a personal loan with a low credit score?",
      answer: "While a score of 700+ is ideal, some lenders offer loans to individuals with lower scores (600-700) at higher interest rates. You may need to provide a co-applicant or guarantor. Improving your credit score before applying helps you get better rates and higher loan amounts. Check your CIBIL score for free regularly."
    },
  ];

  const stats = [
    { number: "100K+", label: "Active Borrowers", suffix: "across India" },
    { number: "₹500Cr+", label: "Loans Disbursed", suffix: "annually" },
    { number: "98%", label: "Approval Rate", suffix: "for eligible applicants" },
    { number: "10+", label: "Lending Partners", suffix: "top banks & NBFCs" },
  ];

  const borrowerStories = [
    {
      name: "Priya M.",
      use: "Medical Treatment",
      amount: "₹5L",
      quote: "Got funds within 48 hours for my mother's surgery. Minimal stress!",
      rating: 5
    },
    {
      name: "Raj K.",
      use: "Business Expansion",
      amount: "₹15L",
      quote: "Quick approval helped me expand my business without delay.",
      rating: 5
    },
    {
      name: "Meera S.",
      use: "Education",
      amount: "₹8L",
      quote: "Perfect for funding my MBA without putting assets at risk.",
      rating: 5
    },
  ];

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
       <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative w-full mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">Get Approved in 24-48 Hours</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Fast Personal <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Loans for Any</span> Goal
                </h1>

                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  Unsecured personal loans with competitive rates, flexible EMI, and minimal documentation. Get funds for medical needs, travel, education, or any emergency.
                </p>
              </div>

              {/* Key Stats */}
              <div className="space-y-3 pt-4">
                {[
                  "Quick approval - Often within 24-48 hours",
                  "Competitive interest rates from 9% onwards",
                  "Flexible tenure from 12-84 months",
                  "No collateral required"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 duration-300"
                >
                  Calculate EMI <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#eligibility"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>

            {/* Right - Feature Cards */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {loanFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-fit group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-r from-slate-50 to-blue-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Why Choose Personal Loans?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fast, flexible, and transparent - perfect for your financial goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitCards.map((card, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />

              <div className="relative space-y-4">
                <div className="text-5xl font-bold">{card.stat}</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="text-white/90 text-base">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Categories */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Personal Loan Types</h2>
            <p className="text-xl text-gray-600">Choose the loan type that matches your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanCategories.map((category, idx) => (
              <div key={idx} className="group rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="p-8 space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-blue-600">{category.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tenure:</span>
                        <span className="font-semibold text-blue-600">{category.tenure}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Key Features of Personal Loans</h2>
          <p className="text-xl text-gray-600">What makes personal loans the right choice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all group">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Comparison */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Personal vs Other Loans</h2>
            <p className="text-xl text-gray-600">Compare personal loans with other loan types</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-left font-bold text-blue-600">Personal Loan</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600">Home Loan</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600">Auto Loan</th>
                </tr>
              </thead>
              <tbody>
                {loanComparison.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-blue-600 font-semibold">{row.personalLoan}</td>
                    <td className="px-6 py-4 text-gray-600">{row.homeLoan}</td>
                    <td className="px-6 py-4 text-gray-600">{row.autoLoan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-16">What You Need to Know</h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Eligibility */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-blue-600" />
                Eligibility Criteria
              </h3>
              <p className="text-gray-600">Common benchmarks used by lenders. Specific requirements may vary.</p>
            </div>

            <div className="space-y-3">
              {eligibilityCriteria.map((criterion, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{criterion.icon}</span>
                    <div>
                      <dt className="font-bold text-gray-900 text-sm">{criterion.label}</dt>
                      <dd className="text-gray-600 text-sm mt-1">{criterion.value}</dd>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8 text-cyan-600" />
                Required Documents
              </h3>
              <p className="text-gray-600">Keep digital copies ready before applying.</p>
            </div>

            <div className="space-y-4">
              {documentsList.map((docCategory, idx) => (
                <details
                  key={idx}
                  className="group border border-slate-200 rounded-2xl bg-white hover:border-blue-300 hover:shadow-md transition-all overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center gap-3 p-5 font-semibold text-gray-900 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl">{docCategory.icon}</span>
                    <span className="flex-1">{docCategory.title}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-slate-100 bg-slate-50 p-5">
                    <div className="flex flex-wrap gap-2">
                      {docCategory.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Borrower Stories */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Real Stories from Borrowers</h2>
            <p className="text-xl text-gray-600">See how personal loans have helped achieve their goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {borrowerStories.map((story, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-blue-600 font-semibold">{story.use}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{story.amount}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 italic">"{story.quote}"</p>

                <div className="flex gap-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section id="calculator" className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Calculate Your EMI</h2>
            <p className="text-xl text-gray-600">Estimate your monthly payment instantly and compare options</p>
          </div>
          <PersonalLoanEmiCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about personal loans</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 rounded-2xl bg-white hover:border-blue-300 hover:shadow-md transition-all overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 sm:p-8 font-semibold text-gray-900 hover:bg-blue-50 transition-colors">
                  <span className="text-left text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180 ml-4" />
                </summary>
                <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-8 py-6 text-gray-700 text-base leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="eligibility" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="text-center text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Ready for <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Quick Funds?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Check your eligibility in minutes and get instant approval. No collateral, minimal documentation, quick disbursal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 duration-300"
              >
                Check Eligibility <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Get Expert Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl bg-white border border-blue-200 p-6 sm:p-8">
            <h3 className="font-bold text-gray-900 mb-3">Disclaimer</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Eligibility, interest rates, loan amount, and tenure depend on lender policies, your credit profile, income, employment stability, and other factors. This page is for informational purposes only. Interest rates mentioned are indicative and vary by lender, credit score, and individual profile. Please consult with your lender for specific terms, conditions, and fees. Loan approval is subject to compliance with RBI guidelines and lender policies. Past performance doesn't guarantee future results. Please exercise caution and review all terms before applying.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


// import type { Metadata } from "next";
// import Link from "next/link";
// import PersonalLoanEmiCalculator from "./_components/PersonalLoanEmiCalculator";

// export const metadata: Metadata = {
//   title: "Personal Loan",
// };

// export default function PersonalLoanPage() {
//   return (
//     <main className="bg-gray-50">
//       <section className="border-b border-gray-100 bg-white">
//         <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
//           <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
//             <div className="space-y-4">
//               <p className="text-sm font-semibold text-blue-600">Personal Loan</p>
//               <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                 Fast, flexible funding for your personal goals
//               </h1>
//               <p className="max-w-xl text-sm text-gray-600 sm:text-base">
//                 A personal loan is an unsecured loan you can use for planned or urgent expenses. It offers quick
//                 approvals, predictable EMIs, and no collateral in most cases.
//               </p>

//               <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//                 <Link
//                   href="#eligibility"
//                   className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
//                 >
//                   Check Personal Loan Eligibility
//                 </Link>
//                 <Link
//                   href="#calculator"
//                   className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
//                 >
//                   Calculate EMI
//                 </Link>
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//                 <h2 className="text-sm font-semibold text-gray-900">Common uses</h2>
//                 <ul className="mt-3 space-y-2 text-sm text-gray-600">
//                   <li className="flex gap-2">
//                     <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                     Medical expenses
//                   </li>
//                   <li className="flex gap-2">
//                     <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                     Travel and holidays
//                   </li>
//                   <li className="flex gap-2">
//                     <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                     Education and courses
//                   </li>
//                   <li className="flex gap-2">
//                     <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                     Emergency cash needs
//                   </li>
//                 </ul>
//               </div>

//               <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm">
//                 <h2 className="text-sm font-semibold text-gray-900">Why borrowers choose it</h2>
//                 <div className="mt-3 space-y-3">
//                   <div className="rounded-2xl bg-white p-4 shadow-sm">
//                     <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Collateral</p>
//                     <p className="mt-1 text-base font-bold text-gray-900">Not required</p>
//                   </div>
//                   <div className="rounded-2xl bg-white p-4 shadow-sm">
//                     <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Approval</p>
//                     <p className="mt-1 text-base font-bold text-gray-900">Often quick</p>
//                   </div>
//                   <div className="rounded-2xl bg-white p-4 shadow-sm">
//                     <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tenure</p>
//                     <p className="mt-1 text-base font-bold text-gray-900">Flexible</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-900">Introduction</h2>
//                 <p className="mt-2 text-sm text-gray-600 sm:text-base">
//                   Personal loans can help cover both planned expenses and emergencies without needing to pledge an asset.
//                   With fixed EMIs and transparent terms, they’re suitable for consolidating bills, funding life events,
//                   handling medical needs, or investing in upskilling.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
//         <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
//           <div className="flex flex-col gap-2">
//             <h2 className="text-xl font-bold text-gray-900">Personal loan categories</h2>
//             <p className="text-sm text-gray-600 sm:text-base">
//               Choose the loan type that matches your requirement. Below are the most common personal loan categories.
//             </p>
//           </div>

//           <div className="mt-6 grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//               <h3 className="text-base font-semibold text-gray-900">Personal Loan</h3>
//               <p className="mt-2 text-sm text-gray-600">
//                 Unsecured loan for everyday needs like bills, weddings, purchases, or debt consolidation.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//               <h3 className="text-base font-semibold text-gray-900">Instant Loan</h3>
//               <p className="mt-2 text-sm text-gray-600">
//                 Quick disbursal loan for urgent requirements with minimal documentation (subject to eligibility).
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//               <h3 className="text-base font-semibold text-gray-900">Education Loan</h3>
//               <p className="mt-2 text-sm text-gray-600">
//                 Funding for tuition fees and education-related expenses to support higher studies or skill programs.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//               <h3 className="text-base font-semibold text-gray-900">Medical Loan</h3>
//               <p className="mt-2 text-sm text-gray-600">
//                 Helps manage hospital bills and treatment costs with structured EMIs for planned or emergency care.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
//         <div className="grid gap-6 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
//               <h2 className="text-xl font-bold text-gray-900">Key features</h2>
//               <p className="mt-2 text-sm text-gray-600 sm:text-base">
//                 Personal loans are designed for speed and convenience. Here are the features borrowers value most.
//               </p>

//               <div className="mt-6 grid gap-4 sm:grid-cols-2">
//                 <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//                   <h3 className="text-base font-semibold text-gray-900">No collateral</h3>
//                   <p className="mt-2 text-sm text-gray-600">
//                     Since it’s unsecured, you typically don’t need to pledge property, gold, or other assets.
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//                   <h3 className="text-base font-semibold text-gray-900">Quick approval</h3>
//                   <p className="mt-2 text-sm text-gray-600">
//                     Faster processing compared to secured loans, especially for salaried profiles with stable income.
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//                   <h3 className="text-base font-semibold text-gray-900">Flexible tenure</h3>
//                   <p className="mt-2 text-sm text-gray-600">
//                     Choose a tenure that balances your EMI with the total interest you pay.
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
//                   <h3 className="text-base font-semibold text-gray-900">Fixed EMIs</h3>
//                   <p className="mt-2 text-sm text-gray-600">
//                     Repay in predictable monthly installments to simplify budgeting and cash flow planning.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <aside className="space-y-4">
//             <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//               <h3 className="text-base font-bold text-gray-900">Before you apply</h3>
//               <ul className="mt-3 space-y-2 text-sm text-gray-600">
//                 <li className="flex gap-2">
//                   <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                   Check your credit score and recent repayment history.
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                   Keep income documents and bank statements ready.
//                 </li>
//                 <li className="flex gap-2">
//                   <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                   Choose a tenure that keeps EMI comfortable.
//                 </li>
//               </ul>
//             </div>

//             <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
//               <h3 className="text-base font-bold text-blue-900">Need help?</h3>
//               <p className="mt-2 text-sm text-blue-900/80">
//                 Share your requirement and we’ll help you shortlist the right product.
//               </p>
//               <Link
//                 href="/contact"
//                 className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
//               >
//                 Talk to an expert
//               </Link>
//             </div>
//           </aside>
//         </div>
//       </section>

//       <section id="eligibility" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
//         <div className="grid gap-6 lg:grid-cols-2">
//           <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
//             <h2 className="text-xl font-bold text-gray-900">Eligibility criteria</h2>
//             <p className="mt-2 text-sm text-gray-600 sm:text-base">
//               Lenders may have different benchmarks. These are common requirements.
//             </p>

//             <dl className="mt-5 grid gap-3">
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <dt className="text-sm font-semibold text-gray-900">Age limit</dt>
//                 <dd className="mt-1 text-sm text-gray-600">Typically 21 to 60 years (varies by lender)</dd>
//               </div>
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <dt className="text-sm font-semibold text-gray-900">Employment status</dt>
//                 <dd className="mt-1 text-sm text-gray-600">Salaried or self-employed with stable income</dd>
//               </div>
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <dt className="text-sm font-semibold text-gray-900">Minimum monthly income</dt>
//                 <dd className="mt-1 text-sm text-gray-600">Often ₹20,000+/month (depends on city and lender)</dd>
//               </div>
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <dt className="text-sm font-semibold text-gray-900">Credit score</dt>
//                 <dd className="mt-1 text-sm text-gray-600">Generally 700+ for better pricing (varies by lender)</dd>
//               </div>
//             </dl>
//           </div>

//           <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
//             <h2 className="text-xl font-bold text-gray-900">Required documents</h2>
//             <p className="mt-2 text-sm text-gray-600 sm:text-base">
//               Keep clear copies ready. Document requirements can differ by profile.
//             </p>

//             <div className="mt-5 grid gap-3">
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <h3 className="text-sm font-semibold text-gray-900">PAN card</h3>
//                 <p className="mt-1 text-sm text-gray-600">Mandatory for identity and credit checks.</p>
//               </div>
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <h3 className="text-sm font-semibold text-gray-900">Aadhaar card</h3>
//                 <p className="mt-1 text-sm text-gray-600">Used for identity/address verification (as applicable).</p>
//               </div>
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <h3 className="text-sm font-semibold text-gray-900">Salary slips / income proof</h3>
//                 <p className="mt-1 text-sm text-gray-600">Salary slips, Form 16, ITR, or business proof.</p>
//               </div>
//               <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
//                 <h3 className="text-sm font-semibold text-gray-900">Bank statements</h3>
//                 <p className="mt-1 text-sm text-gray-600">Last 3–6 months statements (commonly requested).</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="calculator" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
//         <PersonalLoanEmiCalculator />
//       </section>

//       <section className="border-t border-gray-100 bg-white">
//         <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
//           <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm sm:p-8">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Ready to check eligibility?</h2>
//                 <p className="mt-1 text-sm text-gray-600 sm:text-base">
//                   Start an application and we’ll help you validate your eligibility and required documents.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-3 sm:flex-row">
//                 <Link
//                   href="/register"
//                   className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
//                 >
//                   Check Personal Loan Eligibility
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
//                 >
//                   Request a callback
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <p className="mt-6 text-xs text-gray-500">
//             Disclaimer: Eligibility and interest rates depend on lender policies and your profile. This page is for
//             informational purposes.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }
