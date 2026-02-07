"use client";

import React, { useMemo, useState } from "react";
import { IndianRupee, Calendar, TrendingUp, PiggyBank } from "lucide-react";

/* -------------------- Types -------------------- */
type LoanInputs = {
  loanAmount: string;
  interestRate: string;
  tenureYears: string;
};

/* -------------------- Helpers -------------------- */
function toNumberOrNaN(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number.NaN;
}

function formatINR(value: number) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatINRWithDecimals(value: number) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

/* -------- Number to Words (Indian System) -------- */
function numberToWordsIndian(num: number): string {
  if (!Number.isFinite(num) || num <= 0) return "";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const numToWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
    return "";
  };

  let result = "";
  let crore = Math.floor(num / 10000000);
  let lakh = Math.floor((num / 100000) % 100);
  let thousand = Math.floor((num / 1000) % 100);
  let remainder = num % 1000;

  if (crore) result += numToWords(crore) + " Crore ";
  if (lakh) result += numToWords(lakh) + " Lakh ";
  if (thousand) result += numToWords(thousand) + " Thousand ";
  if (remainder) result += numToWords(remainder) + " ";

  return result.trim() + " Rupees";
}

/* -------------------- Component -------------------- */
export default function VehicleLoanEmiCalculator() {
  const [inputs, setInputs] = useState<LoanInputs>({
    loanAmount: "800000",
    interestRate: "9.5",
    tenureYears: "5",
  });

  const result = useMemo(() => {
    const principal = toNumberOrNaN(inputs.loanAmount);
    const annualRate = toNumberOrNaN(inputs.interestRate);
    const years = toNumberOrNaN(inputs.tenureYears);

    if (!(principal > 0) || !(annualRate > 0) || !(years > 0)) {
      return { emi: NaN, totalPayable: NaN, totalInterest: NaN };
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;
    const pow = Math.pow(1 + monthlyRate, months);

    const emi = (principal * monthlyRate * pow) / (pow - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    return { emi, totalPayable, totalInterest };
  }, [inputs]);

  const principal = toNumberOrNaN(inputs.loanAmount);
  const amountInWords =
    Number.isFinite(principal) && principal > 0
      ? numberToWordsIndian(Math.round(principal))
      : "";

  const handleInputChange = (field: keyof LoanInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black px-4 py-12 lg:py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F97415]/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gray-800/10 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-[#F97415] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">Loan Calculator</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            EMI{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#F97415]">Calculator</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#F97415]/20 -rotate-2" />
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Calculate your loan EMI instantly and plan your finances smartly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Card */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#F97415]/20 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-[#F97415]" />
              </div>
              <h2 className="text-xl font-semibold text-white">Loan Details</h2>
            </div>

            {/* Loan Amount */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-gray-300">Loan Amount (₹)</label>
              <input
                type="number"
                value={inputs.loanAmount}
                onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#F97415] focus:border-transparent transition-all backdrop-blur-sm"
              />
              <input
                type="range"
                min={10000}
                max={10000000}
                step={10000}
                value={inputs.loanAmount}
                onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F97415] [&::-webkit-slider-thumb]:cursor-pointer"
              />
              {amountInWords && (
                <p className="text-xs text-gray-400 italic leading-tight">
                  {amountInWords}
                </p>
              )}
            </div>

            {/* Interest Rate */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-gray-300">Interest Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) => handleInputChange("interestRate", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#F97415] focus:border-transparent transition-all backdrop-blur-sm"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Loan Tenure (Years)</label>
              <input
                type="number"
                value={inputs.tenureYears}
                onChange={(e) => handleInputChange("tenureYears", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#F97415] focus:border-transparent transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main EMI Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#F97415] to-[#E06410] p-8 sm:p-10 shadow-2xl border border-[#F97415]/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/80 font-semibold mb-2">
                    Monthly EMI
                  </p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                    {formatINR(result.emi)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-6 text-white/90">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {inputs.tenureYears} years ({Number(inputs.tenureYears) * 12} months)
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { 
                  label: "Principal Amount", 
                  value: formatINR(principal),
                  icon: PiggyBank,
                  gradient: "from-blue-500/20 to-blue-600/20"
                },
                { 
                  label: "Total Interest", 
                  value: formatINR(result.totalInterest),
                  icon: TrendingUp,
                  gradient: "from-purple-500/20 to-purple-600/20"
                },
                { 
                  label: "Total Repayment", 
                  value: formatINR(result.totalPayable),
                  icon: IndianRupee,
                  gradient: "from-green-500/20 to-green-600/20",
                  highlight: true
                },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10 hover:border-[#F97415]/50 transition-all duration-300 hover:scale-105 ${
                    stat.highlight ? 'sm:col-span-2' : ''
                  }`}
                  style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {stat.label}
                    </p>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Breakdown Info */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                Payment Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Interest Rate</span>
                  <span className="text-white font-semibold">{inputs.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Loan Tenure</span>
                  <span className="text-white font-semibold">{inputs.tenureYears} Years</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="text-gray-400 text-sm">Total Payments</span>
                  <span className="text-white font-semibold">{Number(inputs.tenureYears) * 12} EMIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}