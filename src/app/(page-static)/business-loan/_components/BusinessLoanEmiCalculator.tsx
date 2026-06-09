"use client";

import React, { useMemo, useState } from "react";

type LoanInputs = {
  loanAmount: string;
  interestRate: string;
  tenureYears: string;
};

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

export default function BusinessLoanEmiCalculator() {
  const [inputs, setInputs] = useState<LoanInputs>({
    loanAmount: "2000000",
    interestRate: "13.5",
    tenureYears: "3",
  });

  const result = useMemo(() => {
    const principal = toNumberOrNaN(inputs.loanAmount);
    const annualRate = toNumberOrNaN(inputs.interestRate);
    const years = toNumberOrNaN(inputs.tenureYears);

    if (!(principal > 0) || !(annualRate > 0) || !(years > 0)) {
      return {
        emi: Number.NaN,
        totalPayable: Number.NaN,
        totalInterest: Number.NaN,
      };
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    const pow = Math.pow(1 + monthlyRate, months);
    const emi = (principal * monthlyRate * pow) / (pow - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    return { emi, totalPayable, totalInterest };
  }, [inputs.interestRate, inputs.loanAmount, inputs.tenureYears]);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Business Loan EMI Calculator</h3>
        <p className="text-sm text-gray-600">
          Estimate your EMI based on the loan amount, annual interest rate, and tenure.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Loan amount</span>
          <input
            type="text"
            inputMode="numeric"
            value={inputs.loanAmount}
            onChange={(e) => setInputs((prev) => ({ ...prev, loanAmount: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#E6F7FD]"
            placeholder="e.g. 2000000"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Interest rate (% p.a.)</span>
          <input
            type="text"
            inputMode="decimal"
            value={inputs.interestRate}
            onChange={(e) => setInputs((prev) => ({ ...prev, interestRate: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#E6F7FD]"
            placeholder="e.g. 13.5"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Loan tenure (years)</span>
          <input
            type="text"
            inputMode="numeric"
            value={inputs.tenureYears}
            onChange={(e) => setInputs((prev) => ({ ...prev, tenureYears: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#E6F7FD]"
            placeholder="e.g. 3"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Monthly EMI</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatINR(result.emi)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total interest payable</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatINR(result.totalInterest)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total amount payable</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatINR(result.totalPayable)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#E6F7FD] bg-[#E6F7FD] px-4 py-3">
        <p className="text-xs text-[#2E3192]">
          Indicative calculation. Actual EMI may vary based on processing fees, lender policies, and final sanctioned
          interest rate.
        </p>
      </div>
    </section>
  );
}
