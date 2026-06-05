"use client";

import { useEffect, useMemo, useState } from "react";

type MonthMeta = {
    label: string;
    fullKey: string;
    month: number;
    year: number;
};

const fmt = (n: number): string =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const MONTH_LABELS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DATE_SLOTS = [5, 15, 25, 30] as const;

const getRecentMonths = (count: number): MonthMeta[] => {
    // For 6 months: Jan–Jun. For 12 months: Jan–Dec of current year.
    const now = new Date();
    const year = now.getFullYear();
    return Array.from({ length: count }, (_, i) => {
        return {
            label: MONTH_LABELS[i],
            fullKey: `${year}-${i}`,
            month: i,
            year: year
        };
    });
};

const toNum = (v: string | number | null | undefined): number => {
    const n = Number(String(v ?? "").trim());
    return Number.isFinite(n) && n >= 0 ? n : 0;
};

const emptyMonth = (): string[] => DATE_SLOTS.map(() => "");

export default function ABBCalculatorClient() {
    const [numMonths, setNumMonths] = useState<6 | 12>(6);
    // data[monthIdx][dateSlotIdx] = string value
    const [data, setData] = useState<string[][]>(() => Array(6).fill(null).map(emptyMonth));
    const [expanded, setExpanded] = useState<string>("");

    useEffect(() => {
        setData((prev) => {
            const next = Array(numMonths).fill(null).map((_, i) => prev[i] ?? emptyMonth());
            return next;
        });
        setExpanded("");
    }, [numMonths]);

    const months = useMemo(() => getRecentMonths(numMonths), [numMonths]);

    const calc = useMemo(() => {
        const monthABBs = data.map((slots) => {
            const vals = slots.map(toNum);
            const filled = vals.filter((v) => v > 0);
            if (filled.length === 0) return null;
            return vals.reduce((a, b) => a + b, 0) / DATE_SLOTS.length;
        });

        const filledMonths = monthABBs.filter((v): v is number => v !== null);
        const abb = filledMonths.length > 0
            ? filledMonths.reduce((a, b) => a + b, 0) / numMonths
            : 0;

        const profile: "Strong" | "Moderate" | "Weak" = abb >= 100000 ? "Strong" : abb >= 50000 ? "Moderate" : "Weak";
        return { monthABBs, abb, profile, filledCount: filledMonths.length };
    }, [data, numMonths]);

    const updateSlot = (mIdx: number, sIdx: number, val: string) => {
        const cleaned = val.replace(/[^0-9.]/g, "");
        setData((prev) => {
            const next = prev.map((m) => [...m]);
            next[mIdx][sIdx] = cleaned;
            return next;
        });
    };


    return (
        <div className="abb-calculator-page" style={{
            minHeight: "100vh",
            background: "#F7F9FC",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            padding: "40px 16px",
            color: "#1A1A1A"
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .abb-calculator-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .abb-calculator-page input[type=number]::-webkit-inner-spin-button,
        .abb-calculator-page input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .abb-calculator-page input[type=number] { -moz-appearance: textfield; }
        .abb-calculator-page .slot-input {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #D6EEF8;
          border-radius: 12px;
          padding: 10px 12px 10px 28px;
          color: #1A1A1A;
          font-size: 14px;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .abb-calculator-page .slot-input:focus {
          border-color: #00AEEF;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(0,174,239,0.1);
        }
        .abb-calculator-page .slot-input::placeholder { color: #666666; }
        .abb-calculator-page .month-card {
          border-radius: 20px;
          border: 1px solid #D6EEF8;
          background: #FFFFFF;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 2px 10px rgba(15,23,42,0.06);
        }
        .abb-calculator-page .month-card:hover { border-color: #00AEEF; box-shadow: 0 4px 14px rgba(0,174,239,0.1); transform: translateY(-2px); }
        .abb-calculator-page .month-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          cursor: pointer;
          user-select: none;
        }
        .abb-calculator-page .month-header:hover { background: #F7F9FC; }
        .abb-calculator-page .month-body {
          border-top: 1px solid #D6EEF8;
          padding: 16px;
        }
        .abb-calculator-page .tab-btn {
          padding: 8px 22px;
          border-radius: 14px;
          border: 1px solid #D6EEF8;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .abb-calculator-page .chevron {
          transition: transform 0.25s;
          display: inline-block;
        }
        .abb-calculator-page .chevron.open { transform: rotate(180deg); }
      `}</style>

            <div style={{ maxWidth: 960, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{
                        display: "inline-block",
                        background: "#E6F7FD",
                        border: "1px solid #D6EEF8",
                        borderRadius: 100,
                        padding: "4px 16px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#00AEEF",
                        textTransform: "uppercase",
                        marginBottom: 14
                    }}>Bank Statement Tool</div>
                    <h1 style={{ fontSize: "clamp(24px,5vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#1A1A1A" }}>
                        Average Bank Balance
                    </h1>
                    <p style={{ marginTop: 10, color: "#666666", fontSize: 15 }}>
                        Enter balances on the 5th, 15th, 25th &amp; 30th of each month
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>

                    {/* Top bar */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 12
                    }}>
                        <div style={{ fontSize: 13, color: "#666666", fontWeight: 500 }}>
                            Select statement period
                        </div>
                        <div style={{
                            display: "flex",
                            gap: 4,
                            background: "#FFFFFF",
                            border: "1px solid #D6EEF8",
                            borderRadius: 16,
                            padding: 4
                        }}>
                            {([6, 12] as const).map((m) => (
                                <button
                                    key={m}
                                    className="tab-btn"
                                    onClick={() => setNumMonths(m)}
                                    style={{
                                        background: numMonths === m ? "#00AEEF" : "#FFFFFF",
                                        color: numMonths === m ? "#FFFFFF" : "#1A1A1A",
                                        borderColor: numMonths === m ? "#00AEEF" : "#D6EEF8",
                                    }}
                                >
                                    {m} Months
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                        {months.map((m, mIdx) => {
                            const isOpen = expanded === m.fullKey;
                            const monthABB = calc.monthABBs[mIdx];
                            const hasData = data[mIdx]?.some((v) => toNum(v) > 0);

                            return (
                                <div key={m.fullKey} className="month-card">
                                    <div
                                        className="month-header"
                                        onClick={() => setExpanded(isOpen ? "" : m.fullKey)}
                                    >
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>{m.label}</div>
                                            {monthABB !== null ? (
                                                <div style={{ fontSize: 12, color: "#00AEEF", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
                                                    ABB: ₹{fmt(Math.round(monthABB))}
                                                </div>
                                            ) : (
                                                <div style={{ fontSize: 12, color: "#666666", marginTop: 2 }}>
                                                    {hasData ? "Partial" : "Not filled"}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            {hasData && (
                                                <div style={{
                                                    width: 8, height: 8, borderRadius: "50%",
                                                    background: monthABB !== null ? "#34d399" : "#fbbf24"
                                                }} />
                                            )}
                                            <span className={`chevron ${isOpen ? "open" : ""}`} style={{ color: "#666666", fontSize: 18 }}>⌄</span>
                                        </div>
                                    </div>

                                    {isOpen && (
                                        <div className="month-body">
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                                {DATE_SLOTS.map((day, sIdx) => (
                                                    <div key={day}>
                                                        <div style={{
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            letterSpacing: "0.1em",
                                                            color: "#666666",
                                                            textTransform: "uppercase",
                                                            marginBottom: 5
                                                        }}>{m.label.slice(0, 3)} {day}th</div>
                                                        <div style={{ position: "relative" }}>
                                                            <span style={{
                                                                position: "absolute",
                                                                left: 10,
                                                                top: "50%",
                                                                transform: "translateY(-50%)",
                                                                color: "#666666",
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                pointerEvents: "none"
                                                            }}>₹</span>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                className="slot-input"
                                                                value={data[mIdx]?.[sIdx] ?? ""}
                                                                onChange={(e) => updateSlot(mIdx, sIdx, e.target.value)}
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {monthABB !== null && (
                                                <div style={{
                                                    marginTop: 12,
                                                    borderRadius: 12,
                                                    background: "#E6F7FD",
                                                    border: "1px solid #D6EEF8",
                                                    padding: "10px 14px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}>
                                                    <span style={{ fontSize: 12, color: "#666666" }}>Monthly Average</span>
                                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 600, color: "#00AEEF" }}>
                                                        ₹{fmt(Math.round(monthABB))}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary panel */}
                    <div style={{
                        borderRadius: 24,
                        border: "1px solid #D6EEF8",
                        background: "#FFFFFF",
                        padding: 24,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: 20,
                        alignItems: "center",
                        boxShadow: "0 2px 10px rgba(15,23,42,0.06)"
                    }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#666666", textTransform: "uppercase", marginBottom: 6 }}>
                                Months Filled
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 800, color: "#1A1A1A" }}>{calc.filledCount}<span style={{ fontSize: 16, color: "#666666", fontWeight: 500 }}>/{numMonths}</span></div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#666666", textTransform: "uppercase", marginBottom: 6 }}>
                                Formula
                            </div>
                            <div style={{ fontSize: 12, color: "#666666", fontFamily: "'DM Mono', monospace" }}>
                                Avg(5th,15th,25th,30th) per month<br />then ÷ {numMonths} months
                            </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#666666", textTransform: "uppercase", marginBottom: 6 }}>
                                Your ABB
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: "#1A1A1A", fontFamily: "'DM Mono', monospace" }}>
                                ₹{fmt(Math.round(calc.abb))}
                            </div>
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                marginTop: 8,
                                borderRadius: 100,
                                border: "1px solid #D6EEF8",
                                background: "#E6F7FD",
                                padding: "4px 12px",
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#00AEEF",
                                letterSpacing: "0.05em"
                            }}>
                                {calc.profile} Banking Profile
                            </div>
                        </div>
                    </div>

                    {/* Reset */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                            onClick={() => { setData(Array(numMonths).fill(null).map(emptyMonth)); setExpanded(""); }}
                            style={{
                                borderRadius: 12,
                                border: "1px solid #00AEEF",
                                background: "#FFFFFF",
                                color: "#00AEEF",
                                padding: "10px 20px",
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif",
                                transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#E6F7FD";
                                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,174,239,0.18)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#FFFFFF";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            Reset All
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}


// "use client";

// import { useEffect, useMemo, useState } from "react";

// const fmt = (n: number) =>
//     new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

// const MONTH_LABELS = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
// ];

// const getRecentMonths = (count: number) => {
//     const now = new Date();
//     return Array.from({ length: count }, (_, i) => {
//         const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
//         return `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`;
//     });
// };

// const toNum = (v: string) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
// };

// export default function ABBCalculatorClient() {
//     const [numMonths, setNumMonths] = useState<3 | 6 | 12>(6);
//     const [balances, setBalances] = useState<string[]>(Array(6).fill(""));

//     useEffect(() => {
//         setBalances((prev) => {
//             const next = Array(numMonths).fill("");
//             for (let i = 0; i < Math.min(prev.length, numMonths); i += 1) next[i] = prev[i];
//             return next;
//         });
//     }, [numMonths]);

//     const months = useMemo(() => getRecentMonths(numMonths), [numMonths]);

//     const calc = useMemo(() => {
//         const parsed = balances.map((b) => toNum(String(b).trim()));
//         const total = parsed.reduce((a, b) => a + b, 0);
//         const filledCount = parsed.filter((v) => v > 0).length;
//         const abb = numMonths > 0 ? total / numMonths : 0;
//         const profile = abb >= 100000 ? "Strong" : abb >= 50000 ? "Moderate" : "Weak";
//         return { parsed, total, filledCount, abb, profile };
//     }, [balances, numMonths]);

//     const profileStyle =
//         calc.profile === "Strong"
//             ? "text-emerald-300 border-emerald-300/20 bg-emerald-300/10"
//             : calc.profile === "Moderate"
//                 ? "text-amber-300 border-amber-300/20 bg-amber-300/10"
//                 : "text-rose-300 border-rose-300/20 bg-rose-300/10";

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#020810] via-[#040c18] to-[#0c1828] px-4 py-10">
//             <div className="mx-auto max-w-5xl">
//                 <div className="mb-8 text-center">
//                     <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
//                         Average Bank Balance (ABB) Calculator
//                     </h1>
//                     <p className="mt-3 text-sm md:text-base text-white/60">
//                         Enter your monthly closing balances and we’ll compute ABB.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//                         <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
//                             <div>
//                                 <div className="text-xs font-semibold tracking-widest text-white/50 uppercase">Statement Period</div>
//                                 <div className="text-white/80 text-sm">Select months to analyse</div>
//                             </div>
//                             <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
//                                 {[3, 6, 12].map((m) => (
//                                     <button
//                                         key={m}
//                                         type="button"
//                                         onClick={() => setNumMonths(m as 3 | 6 | 12)}
//                                         className={
//                                             "px-4 py-2 rounded-xl text-sm font-semibold transition " +
//                                             (numMonths === m
//                                                 ? "bg-[#63b3ed]/20 text-[#63b3ed]"
//                                                 : "text-white/60 hover:text-white")
//                                         }
//                                     >
//                                         {m}M
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             {months.map((label, idx) => (
//                                 <label key={`${numMonths}-${idx}`} className="block">
//                                     <div className="mb-1 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
//                                         {label}
//                                     </div>
//                                     <div className="relative">
//                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-semibold">₹</span>
//                                         <input
//                                             type="number"
//                                             min={0}
//                                             value={balances[idx] ?? ""}
//                                             onChange={(e) => {
//                                                 const cleaned = e.target.value.replace(/[^0-9.]/g, "");
//                                                 setBalances((prev) => {
//                                                     const next = [...prev];
//                                                     next[idx] = cleaned;
//                                                     return next;
//                                                 });
//                                             }}
//                                             className="w-full rounded-2xl border border-white/10 bg-white/5 px-8 py-3 text-white outline-none focus:border-[#63b3ed]/40"
//                                             placeholder="0"
//                                         />
//                                     </div>
//                                 </label>
//                             ))}
//                         </div>

//                         <div className="mt-6 flex justify-end">
//                             <button
//                                 type="button"
//                                 onClick={() => setBalances(Array(numMonths).fill(""))}
//                                 className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-300/15"
//                             >
//                                 Reset
//                             </button>
//                         </div>
//                     </div>

//                     <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//                         <div className="text-xs font-semibold tracking-widest text-white/50 uppercase">Summary</div>

//                         <div className="mt-5 space-y-4">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm text-white/60">Total Balance Sum</span>
//                                 <span className="text-sm font-semibold text-white">₹{fmt(calc.total)}</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm text-white/60">Months</span>
//                                 <span className="text-sm font-semibold text-white">{numMonths}</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm text-white/60">Filled</span>
//                                 <span className="text-sm font-semibold text-white">{calc.filledCount} / {numMonths}</span>
//                             </div>

//                             <div className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-4">
//                                 <div className="text-xs font-semibold tracking-widest text-white/50 uppercase">ABB</div>
//                                 <div className="mt-1 text-2xl font-extrabold text-white">₹{fmt(Math.round(calc.abb))}</div>
//                                 <div className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${profileStyle}`}>
//                                     {calc.profile} Banking Profile
//                                 </div>
//                             </div>

//                             <div className="text-[11px] text-white/40 leading-relaxed">
//                                 ABB = Sum of Monthly Closing Balances ÷ Number of Months
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
