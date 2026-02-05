"use client";

import React, { useMemo, useState } from "react";

type EmiInputs = {
  loanAmount: string;
  interestRate: string;
  tenureYears: string;
};

function formatINR(value: number) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function toNumberOrNaN(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number.NaN;
}

export default function HomeLoanEmiCalculator() {
  const [inputs, setInputs] = useState<EmiInputs>({
    loanAmount: "3000000",
    interestRate: "8.75",
    tenureYears: "20",
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
        months: Number.NaN,
      };
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    const pow = Math.pow(1 + monthlyRate, months);
    const emi = (principal * monthlyRate * pow) / (pow - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    return {
      emi,
      totalPayable,
      totalInterest,
      months,
    };
  }, [inputs.interestRate, inputs.loanAmount, inputs.tenureYears]);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Home Loan EMI Calculator</h3>
        <p className="text-sm text-gray-600">
          Estimate your EMI instantly. Adjust the values to match your expected loan amount, interest rate and tenure.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Loan Amount</span>
          <input
            inputMode="numeric"
            type="number"
            min={0}
            value={inputs.loanAmount}
            onChange={(e) => setInputs((prev) => ({ ...prev, loanAmount: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 3000000"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Interest Rate (%)</span>
          <input
            inputMode="decimal"
            type="number"
            min={0}
            step="0.01"
            value={inputs.interestRate}
            onChange={(e) => setInputs((prev) => ({ ...prev, interestRate: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 8.75"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Loan Tenure (years)</span>
          <input
            inputMode="numeric"
            type="number"
            min={0}
            value={inputs.tenureYears}
            onChange={(e) => setInputs((prev) => ({ ...prev, tenureYears: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 20"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Monthly EMI</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatINR(result.emi)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total Interest</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatINR(result.totalInterest)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total Payable</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatINR(result.totalPayable)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-xs text-blue-900">
          Calculations are indicative and may vary by lender fees, processing charges, insurance and final sanctioned
          interest rate.
        </p>
      </div>
    </section>
  );
}
