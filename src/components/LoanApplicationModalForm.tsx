"use client";

import React, { useState } from "react";

type LoanFormData = {
  fullName: string;
  phone: string;
  loanAmount: string;
  loanPurpose: string;
  monthlyIncome: string;
};

export default function LoanApplicationModalForm() {
  const [form, setForm] = useState<LoanFormData>({
    fullName: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
    monthlyIncome: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({});

  const handleChange = <K extends keyof LoanFormData>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof LoanFormData, string>> = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Name is required";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      nextErrors.phone = "Enter a valid phone number";
    if (!form.loanAmount.trim()) nextErrors.loanAmount = "Enter loan amount";
    if (!form.loanPurpose.trim()) nextErrors.loanPurpose = "Purpose is required";
    if (!form.monthlyIncome.trim()) nextErrors.monthlyIncome = "Income is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Loan Application Submitted");
    setForm({
      fullName: "",
      phone: "",
      loanAmount: "",
      loanPurpose: "",
      monthlyIncome: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          value={form.fullName}
          error={errors.fullName}
          onChange={(v) => handleChange("fullName", v)}
        />
        <Input
          label="Phone Number"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => handleChange("phone", v)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Loan Amount (₹)"
          value={form.loanAmount}
          error={errors.loanAmount}
          onChange={(v) => handleChange("loanAmount", v)}
        />
        <Input
          label="Monthly Income (₹)"
          value={form.monthlyIncome}
          error={errors.monthlyIncome}
          onChange={(v) => handleChange("monthlyIncome", v)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Loan Purpose
        </label>
        <textarea
          rows={3}
          value={form.loanPurpose}
          onChange={(e) => handleChange("loanPurpose", e.target.value)}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
            errors.loanPurpose ? "border-red-500" : "border-slate-300"
          }`}
        />
        {errors.loanPurpose && (
          <p className="mt-1 text-xs text-red-500">{errors.loanPurpose}</p>
        )}
      </div>

      <p className="text-[11px] text-slate-500">
        By submitting this form, you confirm that the details provided are true and consent to be contacted by
        Infinity Loans or its partners regarding your loan application.
      </p>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
      >
        Submit Application
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
