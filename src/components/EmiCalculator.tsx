"use client";

import { useState, useMemo } from "react";
import { useLoanModal } from "./LoanModalProvider";
import ApplyNowCTAButton from "./loans/ApplyNowCTAButton";

function toNumber(value: string) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
}

export default function EMICalculator() {
    const [amount, setAmount] = useState("500000");
    const [tenure, setTenure] = useState("36");
    const [annualRate, setAnnualRate] = useState("12");

    const loanModal = useLoanModal();

    const numericAmount = toNumber(amount);
    const numericTenure = toNumber(tenure);
    const numericRate = toNumber(annualRate);
    const monthlyRate = numericRate / 12 / 100;

    const emi = useMemo(() => {
        const p = numericAmount;
        const r = monthlyRate;
        const n = numericTenure;

        if (!(p > 0) || !(n > 0)) return 0;
        if (r === 0) return p / n;

        return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }, [numericAmount, numericTenure, monthlyRate]);

    const totalPayable = emi * numericTenure;
    const interest = totalPayable - numericAmount;

    const handleApply = () => {
        loanModal?.open?.();
    };

    const inputClass =
        "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#00AEEF] focus:ring-4 focus:ring-[#E6F7FD]";

    return (
        <section
            id="emi-calculator"
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#E8EAF6] flex items-center justify-center px-4 py-12"
        >
            <div className="w-full max-w-5xl bg-white/80 border border-gray-200 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 lg:p-10">

                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-4xl font-black tracking-tight text-gray-900">
                        EMI Calculator
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Plan your repayment smartly with real-time EMI insights
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">

                    <div className="space-y-6">

                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <label className="text-sm font-medium text-gray-700">
                                Loan Amount (₹)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter loan amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                                className={inputClass}
                            />
                        </div>

                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <label className="text-sm font-medium text-gray-700">
                                Tenure (Months)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter tenure in months"
                                value={tenure}
                                onChange={(e) => setTenure(e.target.value.replace(/[^\d.]/g, ""))}
                                className={inputClass}
                            />
                        </div>

                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <label className="text-sm font-medium text-gray-700">
                                Interest Rate (% p.a.)
                            </label>
                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="Enter interest rate"
                                value={annualRate}
                                onChange={(e) => setAnnualRate(e.target.value.replace(/[^\d.]/g, ""))}
                                className={inputClass}
                            />
                        </div>

                        <ApplyNowCTAButton
                            loanType="Loan"
                            size="xl"
                            className="hidden w-full lg:flex"
                        >
                            Apply for Loan
                        </ApplyNowCTAButton>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-white to-[#E6F7FD] p-6 shadow-xl border border-[#E6F7FD]/60 flex flex-col justify-between">

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
                                        ₹ {numericAmount.toLocaleString()}
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

                        <ApplyNowCTAButton
                            loanType="Loan"
                            size="xl"
                            className="lg:hidden mt-6 w-full"
                            onClick={handleApply}
                        >
                            Apply for Loan
                        </ApplyNowCTAButton>
                    </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-6">
                    * EMI values are calculated from the values you enter above.
                </p>
            </div>
        </section>
    );
}
