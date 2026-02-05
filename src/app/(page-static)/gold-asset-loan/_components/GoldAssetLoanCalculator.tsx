"use client";

import React, { useMemo, useState } from "react";

type Inputs = {
  assetValue: string;
  ltvPercent: string;
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

export default function GoldAssetLoanCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    assetValue: "1000000",
    ltvPercent: "75",
    interestRate: "11.5",
    tenureYears: "3",
  });

  const result = useMemo(() => {
    const assetValue = toNumberOrNaN(inputs.assetValue);
    const ltv = toNumberOrNaN(inputs.ltvPercent);
    const annualRate = toNumberOrNaN(inputs.interestRate);
    const years = toNumberOrNaN(inputs.tenureYears);

    if (!(assetValue > 0) || !(ltv > 0) || !(annualRate > 0) || !(years > 0)) {
      return {
        loanAmount: Number.NaN,
        emi: Number.NaN,
        totalInterest: Number.NaN,
        totalPayable: Number.NaN,
      };
    }

    const loanAmount = (assetValue * ltv) / 100;
    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    const pow = Math.pow(1 + monthlyRate, months);
    const emi = (loanAmount * monthlyRate * pow) / (pow - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - loanAmount;

    return { loanAmount, emi, totalInterest, totalPayable };
  }, [inputs.assetValue, inputs.interestRate, inputs.ltvPercent, inputs.tenureYears]);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Loan Calculator</h3>
        <p className="text-sm text-gray-600">
          Estimate EMI based on your asset value and the loan-to-value (LTV) percentage.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Asset value</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={inputs.assetValue}
            onChange={(e) => setInputs((prev) => ({ ...prev, assetValue: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 1000000"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Loan-to-value (LTV %)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step="0.01"
            value={inputs.ltvPercent}
            onChange={(e) => setInputs((prev) => ({ ...prev, ltvPercent: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 75"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Interest rate (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={inputs.interestRate}
            onChange={(e) => setInputs((prev) => ({ ...prev, interestRate: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 11.5"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-900">Tenure (years)</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={inputs.tenureYears}
            onChange={(e) => setInputs((prev) => ({ ...prev, tenureYears: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 3"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Estimated loan amount</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{formatINR(result.loanAmount)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Monthly EMI</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{formatINR(result.emi)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total interest</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{formatINR(result.totalInterest)}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total payable</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{formatINR(result.totalPayable)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-xs text-blue-900">
          Indicative calculation. Actual EMI and eligible loan amount depend on lender LTV policy, asset type, and final
          sanctioned terms.
        </p>
      </div>
    </section>
  );
}
