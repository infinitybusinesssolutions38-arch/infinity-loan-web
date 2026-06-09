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
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const numToWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
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
      return { emi: Number.NaN, totalPayable: Number.NaN, totalInterest: Number.NaN };
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
    Number.isFinite(principal) && principal > 0 ? numberToWordsIndian(Math.round(principal)) : "";

  const emiInWords =
    Number.isFinite(result.emi) && result.emi > 0 ? numberToWordsIndian(Math.round(result.emi)) : "";

  const handleInputChange = (field: keyof LoanInputs, value: string) => {
    if (field === "loanAmount") {
      const trimmed = value.trim();
      if (trimmed === "") {
        setInputs((prev) => ({ ...prev, [field]: "" }));
        return;
      }

      const n = Number(trimmed);
      if (!Number.isFinite(n)) {
        setInputs((prev) => ({ ...prev, [field]: "" }));
        return;
      }

      setInputs((prev) => ({ ...prev, [field]: String(Math.max(0, n)) }));
      return;
    }

    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F9FC] px-4 py-12 lg:py-20">
      {/* Soft Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#00AEEF]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00AEEF]/10 blur-3xl" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.18]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,174,239,0.75) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)] mb-6">
            <div className="w-2 h-2 bg-[#00AEEF] rounded-full" />
            <span className="text-sm font-semibold text-[#00AEEF]">Loan Calculator</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-tight mb-4">
            EMI{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#00AEEF]">Calculator</span>
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 bg-[#00AEEF]/15" />
            </span>
          </h1>

          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">Calculate your loan EMI instantly and plan your finances smartly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Card */}
          <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-[#D6EEF8] shadow-[0_8px_30px_rgba(15,23,42,0.10)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#E6F7FD] flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">Loan Details</h2>
            </div>

            {/* Loan Amount */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-semibold text-[#1A1A1A]">Loan Amount (₹)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter loan amount"
                value={inputs.loanAmount}
                onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
              />
              {amountInWords && <p className="text-xs text-[#666666] italic leading-tight">{amountInWords}</p>}
            </div>

            {/* Interest Rate */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-semibold text-[#1A1A1A]">Interest Rate (% p.a.)</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Enter interest rate"
                value={inputs.interestRate}
                onChange={(e) => handleInputChange("interestRate", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#1A1A1A]">Loan Tenure (Years)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter loan tenure in years"
                value={inputs.tenureYears}
                onChange={(e) => handleInputChange("tenureYears", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main EMI Card */}
            <div className="rounded-[20px] bg-[#00AEEF] p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,174,239,0.18)] border border-[#00AEEF]/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/90 font-semibold mb-2">Monthly EMI</p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{formatINR(result.emi)}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 text-white/90">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {inputs.tenureYears} years ({Number(inputs.tenureYears) * 12} months)
                </span>
              </div>
              {emiInWords && <p className="mt-2 text-md text-white/90 italic leading-tight">{emiInWords}</p>}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  label: "Principal Amount",
                  value: formatINR(principal),
                  icon: PiggyBank,
                },
                {
                  label: "Total Interest",
                  value: formatINR(result.totalInterest),
                  icon: TrendingUp,
                },
                {
                  label: "Total Repayment",
                  value: formatINR(result.totalPayable),
                  icon: IndianRupee,
                  highlight: true,
                },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`group rounded-[20px] bg-white p-6 border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00AEEF] ${
                    stat.highlight ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#666666]">{stat.label}</p>
                    <div className="w-10 h-10 rounded-full bg-[#E6F7FD] flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-[#00AEEF]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#1A1A1A]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Breakdown Info */}
            <div className="rounded-[20px] bg-white p-6 border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
              <h3 className="text-sm font-semibold text-[#1A1A1A] mb-4 uppercase tracking-wide">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Interest Rate</span>
                  <span className="text-[#1A1A1A] font-semibold">{inputs.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Loan Tenure</span>
                  <span className="text-[#1A1A1A] font-semibold">{inputs.tenureYears} Years</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#D6EEF8]">
                  <span className="text-[#666666] text-sm">Total Payments</span>
                  <span className="text-[#1A1A1A] font-semibold">{Number(inputs.tenureYears) * 12} EMIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
