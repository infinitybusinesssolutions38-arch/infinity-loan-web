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