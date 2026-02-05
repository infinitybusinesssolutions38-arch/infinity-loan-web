// "use client";

// import React, { useMemo, useState } from "react";
// import { TrendingDown, IndianRupee, Calendar } from "lucide-react";

// type LoanInputs = {
//   loanAmount: string;
//   interestRate: string;
//   tenureYears: string;
// };

// function toNumberOrNaN(value: string) {
//   const n = Number(value);
//   return Number.isFinite(n) ? n : Number.NaN;
// }

// function formatINR(value: number) {
//   if (!Number.isFinite(value)) return "—";
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(Math.round(value));
// }

// function formatINRWithDecimals(value: number) {
//   if (!Number.isFinite(value)) return "—";
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(value);
// }

// export default function VehicleLoanEmiCalculator() {
//   const [inputs, setInputs] = useState<LoanInputs>({
//     loanAmount: "800000",
//     interestRate: "9.5",
//     tenureYears: "5",
//   });

//   const [activeTab, setActiveTab] = useState<"results" | "breakdown">("results");

//   const result = useMemo(() => {
//     const principal = toNumberOrNaN(inputs.loanAmount);
//     const annualRate = toNumberOrNaN(inputs.interestRate);
//     const years = toNumberOrNaN(inputs.tenureYears);

//     if (!(principal > 0) || !(annualRate > 0) || !(years > 0)) {
//       return {
//         emi: Number.NaN,
//         totalPayable: Number.NaN,
//         totalInterest: Number.NaN,
//       };
//     }

//     const months = years * 12;
//     const monthlyRate = annualRate / 12 / 100;

//     const pow = Math.pow(1 + monthlyRate, months);
//     const emi = (principal * monthlyRate * pow) / (pow - 1);
//     const totalPayable = emi * months;
//     const totalInterest = totalPayable - principal;

//     return { emi, totalPayable, totalInterest };
//   }, [inputs.interestRate, inputs.loanAmount, inputs.tenureYears]);

//   const principal = toNumberOrNaN(inputs.loanAmount);
//   const totalInterest = result.totalInterest;
//   const interestPercentage =
//     Number.isFinite(principal) && Number.isFinite(totalInterest) && principal > 0
//       ? (totalInterest / principal) * 100
//       : 0;

//   const handleInputChange = (field: keyof LoanInputs, value: string) => {
//     setInputs((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12 md:mb-16">
//           <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600">
//             <IndianRupee className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
//             Loan Calculator
//           </h1>
//           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//             Get instant EMI estimates for your car, bike, or commercial vehicle loan. See detailed breakdowns and plan your finances with confidence.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Input Section */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 bg-gradient-to-b from-white/90 to-blue-50/90 backdrop-blur-xl rounded-3xl border border-blue-200/50 p-8 shadow-xl">
//               <h2 className="text-xl font-semibold text-slate-900 mb-8 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
//                   <span className="w-2 h-2 rounded-full bg-blue-500"></span>
//                 </span>
//                 Loan Details
//               </h2>

//               <div className="space-y-6">
//                 {/* Loan Amount Input */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Loan Amount (₹)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       inputMode="numeric"
//                       min={0}
//                       value={inputs.loanAmount}
//                       onChange={(e) =>
//                         handleInputChange("loanAmount", e.target.value)
//                       }
//                       className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="800000"
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
//                       ₹
//                     </span>
//                   </div>
//                   <input
//                     type="range"
//                     min={100000}
//                     max={1000000000000}
//                     step={100000}
//                     value={inputs.loanAmount}
//                     onChange={(e) =>
//                       handleInputChange("loanAmount", e.target.value)
//                     }
//                     className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                 </div>

//                 {/* Interest Rate Input */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Interest Rate (%)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       inputMode="decimal"
//                       min={0}
//                       step="0.01"
//                       value={inputs.interestRate}
//                       onChange={(e) =>
//                         handleInputChange("interestRate", e.target.value)
//                       }
//                       className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="9.5"
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
//                       %
//                     </span>
//                   </div>
//                   <input
//                     type="range"
//                     min={0}
//                     max={20}
//                     step={0.1}
//                     value={inputs.interestRate}
//                     onChange={(e) =>
//                       handleInputChange("interestRate", e.target.value)
//                     }
//                     className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                 </div>

//                 {/* Tenure Input */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Loan Tenure (Years)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       inputMode="numeric"
//                       min={0}
//                       value={inputs.tenureYears}
//                       onChange={(e) =>
//                         handleInputChange("tenureYears", e.target.value)
//                       }
//                       className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                       placeholder="5"
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
//                       yrs
//                     </span>
//                   </div>
//                   <input
//                     type="range"
//                     min={1}
//                     max={20}
//                     step={1}
//                     value={inputs.tenureYears}
//                     onChange={(e) =>
//                       handleInputChange("tenureYears", e.target.value)
//                     }
//                     className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                 </div>
//               </div>

//               {/* Disclaimer */}
//               <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200">
//                 <p className="text-xs text-blue-900">
//                   ℹ️ Estimates are indicative. Actual EMI may vary based on lender fees and sanctioned rates.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Main EMI Card */}
//             <div className="group relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
//               {/* Gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//               <div className="relative p-8 md:p-12">
//                 <div className="flex items-start justify-between mb-8">
//                   <div>
//                     <p className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-2">
//                       Monthly EMI
//                     </p>
//                     <p className="text-5xl md:text-6xl font-bold text-white">
//                       {formatINR(result.emi)}
//                     </p>
//                   </div>
//                   <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm">
//                     <Calendar className="w-10 h-10 text-blue-200" />
//                   </div>
//                 </div>

//                 <div className="flex items-baseline gap-3 text-blue-100 text-sm">
//                   <span>for {inputs.tenureYears} years</span>
//                   <span className="text-blue-300/60">•</span>
//                   <span>
//                     {Number.isFinite(toNumberOrNaN(inputs.tenureYears)) &&
//                       Math.round(
//                         toNumberOrNaN(inputs.tenureYears) * 12
//                       )}{" "}
//                     months
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Results Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Total Repayment */}
//               <div className="group bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 hover:border-slate-600/50 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-sm font-medium text-slate-300 uppercase tracking-wide">
//                     Total Repayment
//                   </p>
//                   <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
//                 </div>
//                 <p className="text-3xl md:text-4xl font-bold text-white mb-2">
//                   {formatINR(result.totalPayable)}
//                 </p>
//                 <p className="text-sm text-slate-400">
//                   Principal + Interest over loan period
//                 </p>
//               </div>

//               {/* Total Interest */}
//               <div className="group bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 hover:border-slate-600/50 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-sm font-medium text-slate-300 uppercase tracking-wide">
//                     Total Interest
//                   </p>
//                   <div className="w-3 h-3 rounded-full bg-orange-500/30"></div>
//                 </div>
//                 <p className="text-3xl md:text-4xl font-bold text-white mb-2">
//                   {formatINR(result.totalInterest)}
//                 </p>
//                 <p className="text-sm text-slate-400">
//                   {interestPercentage.toFixed(1)}% of loan amount
//                 </p>
//               </div>
//             </div>

//             {/* Breakdown Section */}
//             <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
//               {/* Tab Navigation */}
//               <div className="flex border-b border-slate-700/50">
//                 {[
//                   { id: "results", label: "Cost Breakdown" },
//                   { id: "breakdown", label: "Payment Summary" },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id as typeof activeTab)}
//                     className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
//                         ? "text-blue-400 border-b-2 border-blue-400"
//                         : "text-slate-400 hover:text-slate-300 border-b-2 border-transparent"
//                       }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               <div className="p-8">
//                 {activeTab === "results" ? (
//                   <div className="space-y-6">
//                     {/* Breakdown Chart */}
//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="text-sm font-medium text-slate-300">
//                             Principal Amount
//                           </span>
//                           <span className="text-sm font-semibold text-white">
//                             {formatINR(principal)}
//                           </span>
//                         </div>
//                         <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
//                             style={{
//                               width: `${(principal / result.totalPayable) * 100
//                                 }%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="text-sm font-medium text-slate-300">
//                             Interest Amount
//                           </span>
//                           <span className="text-sm font-semibold text-white">
//                             {formatINR(result.totalInterest)}
//                           </span>
//                         </div>
//                         <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
//                             style={{
//                               width: `${(result.totalInterest / result.totalPayable) *
//                                 100
//                                 }%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Summary Table */}
//                     <div className="mt-8 space-y-3 p-6 bg-slate-700/20 rounded-xl border border-slate-600/30">
//                       <div className="flex items-center justify-between">
//                         <span className="text-slate-400">Principal</span>
//                         <span className="text-white font-semibold">
//                           {formatINRWithDecimals(principal)}
//                         </span>
//                       </div>
//                       <div className="h-px bg-slate-600/30"></div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-slate-400">Total Interest</span>
//                         <span className="text-white font-semibold">
//                           {formatINRWithDecimals(result.totalInterest)}
//                         </span>
//                       </div>
//                       <div className="h-px bg-slate-600/30"></div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-slate-200 font-medium">
//                           Total Repayment
//                         </span>
//                         <span className="text-white font-bold text-lg">
//                           {formatINRWithDecimals(result.totalPayable)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="p-4 rounded-xl bg-slate-700/20 border border-slate-600/30">
//                         <p className="text-xs font-medium text-slate-400 mb-1">
//                           MONTHLY EMI
//                         </p>
//                         <p className="text-2xl font-bold text-white">
//                           {formatINR(result.emi)}
//                         </p>
//                       </div>
//                       <div className="p-4 rounded-xl bg-slate-700/20 border border-slate-600/30">
//                         <p className="text-xs font-medium text-slate-400 mb-1">
//                           TENURE
//                         </p>
//                         <p className="text-2xl font-bold text-white">
//                           {inputs.tenureYears} years
//                         </p>
//                       </div>
//                       <div className="p-4 rounded-xl bg-slate-700/20 border border-slate-600/30">
//                         <p className="text-xs font-medium text-slate-400 mb-1">
//                           TOTAL MONTHS
//                         </p>
//                         <p className="text-2xl font-bold text-white">
//                           {Number.isFinite(toNumberOrNaN(inputs.tenureYears)) &&
//                             Math.round(toNumberOrNaN(inputs.tenureYears) * 12)}{" "}
//                         </p>
//                       </div>
//                       <div className="p-4 rounded-xl bg-slate-700/20 border border-slate-600/30">
//                         <p className="text-xs font-medium text-slate-400 mb-1">
//                           INTEREST RATE
//                         </p>
//                         <p className="text-2xl font-bold text-white">
//                           {inputs.interestRate}%
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-6 p-4 rounded-xl bg-slate-700/30 border border-slate-600/30">
//                       <p className="text-sm text-slate-300 leading-relaxed">
//                         You'll pay{" "}
//                         <span className="font-semibold text-white">
//                           {formatINR(result.emi)}
//                         </span>{" "}
//                         each month for{" "}
//                         <span className="font-semibold text-white">
//                           {Number.isFinite(toNumberOrNaN(inputs.tenureYears)) &&
//                             Math.round(toNumberOrNaN(inputs.tenureYears) * 12)}{" "}
//                           months
//                         </span>
//                         . This includes{" "}
//                         <span className="font-semibold text-orange-400">
//                           {formatINR(result.totalInterest)}
//                         </span>{" "}
//                         in interest on your loan.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useMemo, useState } from "react";
import { IndianRupee, Calendar } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-600">
            <IndianRupee className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">
            Loan EMI Calculator
          </h1>
          <p className="text-slate-600 mt-2">
            Calculate EMI instantly and plan your loan smartly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-3xl border p-8 shadow-lg">
            <h2 className="text-lg font-semibold mb-6">Loan Details</h2>

            {/* Loan Amount */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Loan Amount (₹)</label>
              <input
                type="number"
                value={inputs.loanAmount}
                onChange={(e) =>
                  handleInputChange("loanAmount", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="range"
                min={100000}
                max={100000000}
                step={100000}
                value={inputs.loanAmount}
                onChange={(e) =>
                  handleInputChange("loanAmount", e.target.value)
                }
                className="w-full"
              />
              {amountInWords && (
                <p className="text-xs text-slate-600 italic">
                  {amountInWords}
                </p>
              )}
            </div>

            {/* Interest */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) =>
                  handleInputChange("interestRate", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tenure (Years)</label>
              <input
                type="number"
                value={inputs.tenureYears}
                onChange={(e) =>
                  handleInputChange("tenureYears", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border"
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">
              <p className="text-sm uppercase opacity-80">Monthly EMI</p>
              <p className="text-5xl font-bold mt-2">
                {formatINR(result.emi)}
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm opacity-80">
                <Calendar className="w-4 h-4" />
                {inputs.tenureYears} years
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <p className="text-sm text-slate-500">Total Repayment</p>
                <p className="text-3xl font-bold">
                  {formatINR(result.totalPayable)}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <p className="text-sm text-slate-500">Total Interest</p>
                <p className="text-3xl font-bold">
                  {formatINR(result.totalInterest)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



