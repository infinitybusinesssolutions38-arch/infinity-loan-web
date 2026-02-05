"use client";

import { useState, useMemo } from "react";
import { useLoanModal } from "./LoanModalProvider";
import Link from "next/link";

export default function EMICalculator() {
    const [amount, setAmount] = useState(0);
    const [tenure, setTenure] = useState(36);
    const [annualRate, setAnnualRate] = useState(12);

    const loanModal = useLoanModal();

    const monthlyRate = annualRate / 12 / 100;

    const emi = useMemo(() => {
        const p = amount;
        const r = monthlyRate;
        const n = tenure;

        if (r === 0) return p / n;

        return (p * r * Math.pow(1 + r, n)) /
            (Math.pow(1 + r, n) - 1);
    }, [amount, tenure, monthlyRate]);

    const totalPayable = emi * tenure;
    const interest = totalPayable - amount;

    const handleApply = () => {
        loanModal?.open?.();
    };

    return (
        <section
            id="emi-calculator"
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12"
        >
            <div className="w-full max-w-5xl bg-white/80 border border-gray-200 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 lg:p-10">

                {/* Header */}
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-4xl font-black tracking-tight text-gray-900">
                        EMI Calculator
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Plan your repayment smartly with real-time EMI insights
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid gap-8 lg:grid-cols-2">

                    {/* LEFT */}
                    <div className="space-y-8">

                        {/* Loan Amount */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Loan Amount
                                </span>
                                <span className="text-sm font-bold text-indigo-600">
                                    ₹ {amount.toLocaleString()}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={2000000}
                                step={10000}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full accent-indigo-600 cursor-pointer"
                            />
                        </div>

                        {/* Tenure */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Tenure
                                </span>
                                <span className="text-sm font-bold text-indigo-600">
                                    {tenure} Months
                                </span>
                            </div>
                            <input
                                type="range"
                                min={6}
                                max={84}
                                step={6}
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full accent-indigo-600 cursor-pointer"
                            />
                        </div>

                        {/* Interest Rate */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Interest Rate (Annual)
                                </span>
                                <span className="text-sm font-bold text-indigo-600">
                                    {annualRate}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min={5}
                                max={30}
                                step={0.5}
                                value={annualRate}
                                onChange={(e) => setAnnualRate(Number(e.target.value))}
                                className="w-full accent-indigo-600 cursor-pointer"
                            />
                        </div>

                        {/* CTA Desktop */}
                        <Link
                        href={"/apply"}
                            className="hidden text-center lg:block w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
                        >
                            Apply for Loan
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="rounded-2xl bg-gradient-to-br from-white to-blue-50 p-6 shadow-xl border border-blue-100/60 flex flex-col justify-between">

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                EMI Breakdown
                            </h3>

                            <div className="space-y-5">

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Monthly EMI</span>
                                    <span className="text-4xl font-extrabold text-indigo-700 tracking-tight">
                                        ₹ {emi.toFixed(0)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm border-t border-gray-200 pt-4">
                                    <span className="text-gray-500">Principal Amount</span>
                                    <span className="font-semibold text-gray-900">
                                        ₹ {amount.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Total Interest</span>
                                    <span className="font-semibold text-gray-900">
                                        ₹ {interest.toFixed(0)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Total Payable</span>
                                    <span className="font-semibold text-gray-900">
                                        ₹ {totalPayable.toFixed(0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    

                    {/* CTA Mobile */}
                    <button
                        type="button"
                        onClick={handleApply}
                        className="lg:hidden mt-6 w-full bg-white text-indigo-700 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition"
                    >
                        Apply for Loan
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-6">
                * EMI values are dynamically calculated based on your selections.
            </p>
        </div>
        </section >
    );
}
