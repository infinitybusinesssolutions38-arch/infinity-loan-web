"use client";

import { useEffect, useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const MONTH_LABELS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DATE_SLOTS = [5, 15, 25, 30];

const getRecentMonths = (count: number) => {
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

const toNum = (v: string | number) => {
  const n = Number(String(v).trim());
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const emptyMonth = () => DATE_SLOTS.map(() => "");

export default function ABBCalculatorClient() {
  const [numMonths, setNumMonths] = useState(6);
  // data[monthIdx][dateSlotIdx] = string value
  const [data, setData] = useState(() => Array(6).fill(null).map(emptyMonth));
  const [expanded, setExpanded] = useState("");

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

    const filledMonths = monthABBs.filter((v) => v !== null);
    const abb = filledMonths.length > 0
      ? filledMonths.reduce((a, b) => a + b, 0) / numMonths
      : 0;

    const profile = abb >= 100000 ? "Strong" : abb >= 50000 ? "Moderate" : "Weak";
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

  const profileStyle =
    calc.profile === "Strong"
      ? { text: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)" }
      : calc.profile === "Moderate"
      ? { text: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" }
      : { text: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" };

  return (
    <div className="abb-calculator-wrapper" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020810 0%, #040c18 50%, #0c1828 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "40px 16px",
      color: "#fff"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .abb-calculator-wrapper * { box-sizing: border-box; margin: 0; padding: 0; }
        .abb-calculator-wrapper input[type=number]::-webkit-inner-spin-button,
        .abb-calculator-wrapper input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .abb-calculator-wrapper input[type=number] { -moz-appearance: textfield; }
        .slot-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 12px 10px 28px;
          color: #fff;
          font-size: 14px;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .slot-input:focus {
          border-color: rgba(99,179,237,0.5);
          background: rgba(99,179,237,0.05);
        }
        .slot-input::placeholder { color: rgba(255,255,255,0.25); }
        .month-card {
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .month-card:hover { border-color: rgba(99,179,237,0.2); }
        .month-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          cursor: pointer;
          user-select: none;
        }
        .month-header:hover { background: rgba(255,255,255,0.03); }
        .month-body {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 16px;
        }
        .tab-btn {
          padding: 8px 22px;
          border-radius: 14px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .chevron {
          transition: transform 0.25s;
          display: inline-block;
        }
        .chevron.open { transform: rotate(180deg); }
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(99,179,237,0.1)",
            border: "1px solid rgba(99,179,237,0.2)",
            borderRadius: 100,
            padding: "4px 16px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#63b3ed",
            textTransform: "uppercase",
            marginBottom: 14
          }}>Bank Statement Tool</div>
          <h1 style={{ fontSize: "clamp(24px,5vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Average Bank Balance
          </h1>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
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
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
              Select statement period
            </div>
            <div style={{
              display: "flex",
              gap: 4,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 4
            }}>
              {[6, 12].map((m) => (
                <button
                  key={m}
                  className="tab-btn"
                  onClick={() => setNumMonths(m)}
                  style={{
                    background: numMonths === m ? "rgba(99,179,237,0.2)" : "transparent",
                    color: numMonths === m ? "#63b3ed" : "rgba(255,255,255,0.5)",
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
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{m.label}</div>
                      {monthABB !== null ? (
                        <div style={{ fontSize: 12, color: "#63b3ed", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
                          ABB: ₹{fmt(Math.round(monthABB))}
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
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
                      <span className={`chevron ${isOpen ? "open" : ""}`} style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>⌄</span>
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
                              color: "rgba(255,255,255,0.35)",
                              textTransform: "uppercase",
                              marginBottom: 5
                            }}>{m.label.slice(0, 3)} {day}th</div>
                            <div style={{ position: "relative" }}>
                              <span style={{
                                position: "absolute",
                                left: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "rgba(255,255,255,0.35)",
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
                          background: "rgba(99,179,237,0.08)",
                          border: "1px solid rgba(99,179,237,0.15)",
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Monthly Average</span>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 600, color: "#63b3ed" }}>
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
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            padding: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            alignItems: "center"
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 6 }}>
                Months Filled
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{calc.filledCount}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/{numMonths}</span></div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 6 }}>
                Formula
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace" }}>
                Avg(5th,15th,25th,30th) per month<br />then ÷ {numMonths} months
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 6 }}>
                Your ABB
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'DM Mono', monospace" }}>
                ₹{fmt(Math.round(calc.abb))}
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: 8,
                borderRadius: 100,
                border: `1px solid ${profileStyle.border}`,
                background: profileStyle.bg,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 700,
                color: profileStyle.text,
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
                border: "1px solid rgba(248,113,113,0.2)",
                background: "rgba(248,113,113,0.08)",
                color: "#fca5a5",
                padding: "10px 20px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif"
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