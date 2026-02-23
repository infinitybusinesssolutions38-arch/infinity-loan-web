"use client";

import { useEffect, useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getRecentMonths = (count: number) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    return `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`;
  });
};

const toNum = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function ABBCalculatorClient() {
  const [numMonths, setNumMonths] = useState<3 | 6 | 12>(6);
  const [balances, setBalances] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    setBalances((prev) => {
      const next = Array(numMonths).fill("");
      for (let i = 0; i < Math.min(prev.length, numMonths); i += 1) next[i] = prev[i];
      return next;
    });
  }, [numMonths]);

  const months = useMemo(() => getRecentMonths(numMonths), [numMonths]);

  const calc = useMemo(() => {
    const parsed = balances.map((b) => toNum(String(b).trim()));
    const total = parsed.reduce((a, b) => a + b, 0);
    const filledCount = parsed.filter((v) => v > 0).length;
    const abb = numMonths > 0 ? total / numMonths : 0;
    const profile = abb >= 100000 ? "Strong" : abb >= 50000 ? "Moderate" : "Weak";
    return { parsed, total, filledCount, abb, profile };
  }, [balances, numMonths]);

  const profileStyle =
    calc.profile === "Strong"
      ? "text-emerald-300 border-emerald-300/20 bg-emerald-300/10"
      : calc.profile === "Moderate"
        ? "text-amber-300 border-amber-300/20 bg-amber-300/10"
        : "text-rose-300 border-rose-300/20 bg-rose-300/10";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020810] via-[#040c18] to-[#0c1828] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Average Bank Balance (ABB) Calculator
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/60">
            Enter your monthly closing balances and we’ll compute ABB.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <div className="text-xs font-semibold tracking-widest text-white/50 uppercase">Statement Period</div>
                <div className="text-white/80 text-sm">Select months to analyse</div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
                {[3, 6, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setNumMonths(m as 3 | 6 | 12)}
                    className={
                      "px-4 py-2 rounded-xl text-sm font-semibold transition " +
                      (numMonths === m
                        ? "bg-[#63b3ed]/20 text-[#63b3ed]"
                        : "text-white/60 hover:text-white")
                    }
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {months.map((label, idx) => (
                <label key={`${numMonths}-${idx}`} className="block">
                  <div className="mb-1 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                    {label}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-semibold">₹</span>
                    <input
                      type="number"
                      min={0}
                      value={balances[idx] ?? ""}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^0-9.]/g, "");
                        setBalances((prev) => {
                          const next = [...prev];
                          next[idx] = cleaned;
                          return next;
                        });
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-8 py-3 text-white outline-none focus:border-[#63b3ed]/40"
                      placeholder="0"
                    />
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setBalances(Array(numMonths).fill(""))}
                className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-300/15"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="text-xs font-semibold tracking-widest text-white/50 uppercase">Summary</div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Total Balance Sum</span>
                <span className="text-sm font-semibold text-white">₹{fmt(calc.total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Months</span>
                <span className="text-sm font-semibold text-white">{numMonths}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Filled</span>
                <span className="text-sm font-semibold text-white">{calc.filledCount} / {numMonths}</span>
              </div>

              <div className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-semibold tracking-widest text-white/50 uppercase">ABB</div>
                <div className="mt-1 text-2xl font-extrabold text-white">₹{fmt(Math.round(calc.abb))}</div>
                <div className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${profileStyle}`}>
                  {calc.profile} Banking Profile
                </div>
              </div>

              <div className="text-[11px] text-white/40 leading-relaxed">
                ABB = Sum of Monthly Closing Balances ÷ Number of Months
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
