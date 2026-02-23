"use client";

import { useState, useMemo, useEffect, useRef } from "react";

/* ─── constants ─────────────────────────────────────────────── */
const THRESHOLD = 60;
const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
const num = (v: string) => parseFloat(v) || 0;

/* ─── animated counter hook ─────────────────────────────────── */
function useAnimatedValue(target: number, duration = 700) {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    if (Math.abs(from - to) < 0.001) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    startRef.current = null;

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setDisplay(from + (to - from) * ease);
      if (p < 1) raf.current = requestAnimationFrame(animate);
      else {
        fromRef.current = to;
        setDisplay(to);
      }
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return display;
}

/* ─── particle canvas background ───────────────────────────── */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
    }[] = [];
    let animId = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,179,237,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,179,237,${0.055 * (1 - d / 95)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ─── glowing input field ───────────────────────────────────── */
function GlowInput({
  label,
  icon,
  value,
  onChange,
  id,
}: {
  label: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasVal = !!value && num(value) > 0;

  return (
    <div
      style={{
        transition: "transform 0.18s ease",
        transform: focused ? "scale(1.015)" : "scale(1)",
      }}
    >
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "6px",
          color: focused ? "#63b3ed" : hasVal ? "#5a7fa0" : "#3d5570",
          transition: "color 0.25s",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "14px",
            background: focused
              ? "linear-gradient(135deg, #63b3ed33, #9f7aea22)"
              : "transparent",
            transition: "background 0.3s ease",
            zIndex: 0,
            boxShadow: focused ? "0 0 20px rgba(99,179,237,0.15)" : "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "13px",
            fontWeight: 700,
            zIndex: 2,
            color: focused ? "#63b3ed" : hasVal ? "#4a7090" : "#2d4560",
            transition: "color 0.25s",
            pointerEvents: "none",
          }}
        >
          {icon}
        </span>
        <input
          id={id}
          type="number"
          min="0"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            paddingLeft: "36px",
            paddingRight: "12px",
            paddingTop: "13px",
            paddingBottom: "13px",
            borderRadius: "13px",
            background: focused
              ? "rgba(99,179,237,0.06)"
              : hasVal
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.02)",
            border: `1px solid ${
              focused
                ? "rgba(99,179,237,0.4)"
                : hasVal
                  ? "rgba(99,179,237,0.15)"
                  : "rgba(255,255,255,0.06)"
            }`,
            color: "#ddeeff",
            fontSize: "14px",
            fontWeight: 500,
            outline: "none",
            transition: "all 0.25s ease",
            fontFamily: "'Sora', sans-serif",
          }}
        />
      </div>
    </div>
  );
}

/* ─── arc gauge ─────────────────────────────────────────────── */
function ArcGauge({ foir }: { foir: number }) {
  const animFoir = useAnimatedValue(foir, 900);
  const clamped = Math.min(animFoir, 100);
  const angle = (clamped / 100) * 180;

  const polar = (deg: number, r: number) => {
    const rad = ((180 - deg) * Math.PI) / 180;
    return [90 + r * Math.cos(rad), 90 - r * Math.sin(rad)] as const;
  };

  const arc = (a1: number, a2: number, r: number) => {
    const [sx, sy] = polar(a1, r);
    const [ex, ey] = polar(a2, r);
    return `M ${sx} ${sy} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${ex} ${ey}`;
  };

  const [nx, ny] = polar(angle, 52);
  const gaugeColor =
    foir === 0
      ? "#2d4560"
      : foir <= 40
        ? "#48bb78"
        : foir <= 60
          ? "#f6ad55"
          : "#fc5c5c";

  return (
    <svg viewBox="0 0 180 105" style={{ width: "100%", overflow: "visible" }}>
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#48bb78" />
          <stop offset="55%" stopColor="#f6ad55" />
          <stop offset="100%" stopColor="#fc5c5c" />
        </linearGradient>
      </defs>

      <path
        d={arc(0, 65, 68)}
        fill="none"
        stroke="rgba(72,187,120,0.10)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d={arc(65, 112, 68)}
        fill="none"
        stroke="rgba(246,173,85,0.10)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d={arc(112, 180, 68)}
        fill="none"
        stroke="rgba(252,92,92,0.10)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {(() => {
        const [x1, y1] = polar(108, 60);
        const [x2, y2] = polar(108, 78);
        return (
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f6ad55"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })()}

      {clamped > 0.5 && (
        <path
          d={arc(0, Math.max(angle, 1), 68)}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#glow2)"
        />
      )}

      {[0, 25, 50, 75, 100].map((v) => {
        const [x1, y1] = polar((v / 100) * 180, 61);
        const [x2, y2] = polar((v / 100) * 180, 56);
        return (
          <line
            key={v}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
        );
      })}

      <line
        x1="90"
        y1="90"
        x2={nx}
        y2={ny}
        stroke={gaugeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow2)"
        style={{ transition: "stroke 0.5s ease" }}
      />
      <circle
        cx="90"
        cy="90"
        r="5.5"
        fill={gaugeColor}
        filter="url(#glow2)"
        style={{ transition: "fill 0.5s ease" }}
      />
      <circle cx="90" cy="90" r="2.8" fill="#080e1a" />

      <text
        x="8"
        y="102"
        fontSize="7.5"
        fill="#2d4560"
        textAnchor="middle"
        fontFamily="Sora"
      >
        0
      </text>
      <text
        x="90"
        y="18"
        fontSize="7.5"
        fill="#2d4560"
        textAnchor="middle"
        fontFamily="Sora"
      >
        50%
      </text>
      <text
        x="172"
        y="102"
        fontSize="7.5"
        fill="#2d4560"
        textAnchor="middle"
        fontFamily="Sora"
      >
        100
      </text>
    </svg>
  );
}

/* ─── obligation bar ─────────────────────────────────────────── */
function ObligationBar({
  label,
  value,
  total,
  color,
  icon,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  icon: string;
}) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  const animPct = useAnimatedValue(pct, 800);
  if (!value) return null;

  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#3d5570",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>{icon}</span>
          {label}
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#7a9ab8",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          ₹{fmt(value)} <span style={{ color: "#2d4560" }}>({pct.toFixed(1)}%)</span>
        </span>
      </div>
      <div
        style={{
          height: "6px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${animPct}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            borderRadius: "10px",
            boxShadow: `0 0 10px ${color}55`,
            transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── other EMI row ─────────────────────────────────────────── */
function OtherRow({
  index,
  item,
  onUpdate,
  onRemove,
}: {
  index: number;
  item: { label: string; amount: string };
  onUpdate: (index: number, key: "label" | "amount", value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        animation: "slideIn 0.28s cubic-bezier(0.4,0,0.2,1) both",
      }}
    >
      <input
        type="text"
        placeholder="Label (e.g. Education Loan)"
        value={item.label}
        onChange={(e) => onUpdate(index, "label", e.target.value)}
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "#c8daf0",
          fontSize: "13px",
          outline: "none",
          fontFamily: "'Sora',sans-serif",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(99,179,237,0.35)";
          e.currentTarget.style.background = "rgba(99,179,237,0.05)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        }}
      />
      <div style={{ flex: 1, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: "11px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#2d4560",
            fontSize: "13px",
            fontWeight: 700,
            pointerEvents: "none",
          }}
        >
          ₹
        </span>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={item.amount}
          onChange={(e) => onUpdate(index, "amount", e.target.value)}
          style={{
            width: "100%",
            paddingLeft: "28px",
            paddingRight: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#c8daf0",
            fontSize: "13px",
            outline: "none",
            fontFamily: "'Sora',sans-serif",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(99,179,237,0.35)";
            e.currentTarget.style.background = "rgba(99,179,237,0.05)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          }}
        />
      </div>
      <button
        onClick={() => onRemove(index)}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          flexShrink: 0,
          background: "rgba(252,92,92,0.07)",
          border: "1px solid rgba(252,92,92,0.18)",
          color: "#fc5c5c",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(252,92,92,0.18)";
          e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(252,92,92,0.07)";
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
        }}
      >
        ×
      </button>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────── */
export default function FOIRCalculator() {
  const [income, setIncome] = useState("");
  const [homeLoan, setHomeLoan] = useState("");
  const [carLoan, setCarLoan] = useState("");
  const [personalLoan, setPersonalLoan] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [otherEMIs, setOtherEMIs] = useState<{ label: string; amount: string }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const addOther = () => setOtherEMIs((p) => [...p, { label: "", amount: "" }]);
  const updateOther = (i: number, k: "label" | "amount", v: string) =>
    setOtherEMIs((p) => p.map((e, idx) => (idx === i ? { ...e, [k]: v } : e)));
  const removeOther = (i: number) => setOtherEMIs((p) => p.filter((_, idx) => idx !== i));

  const calc = useMemo(() => {
    const inc = num(income);
    const emiMap: Record<string, number> = {
      "Home Loan": num(homeLoan),
      "Car Loan": num(carLoan),
      "Personal Loan": num(personalLoan),
      "Credit Card": num(creditCard),
    };
    otherEMIs.forEach((e) => {
      const k = e.label || "Other";
      emiMap[k] = (emiMap[k] || 0) + num(e.amount);
    });
    const total = Object.values(emiMap).reduce((a, b) => a + b, 0);
    const foir = inc > 0 ? (total / inc) * 100 : 0;
    return {
      inc,
      total,
      foir,
      emiMap,
      eligible: foir <= THRESHOLD,
      hasData: inc > 0 || total > 0,
    };
  }, [income, homeLoan, carLoan, personalLoan, creditCard, otherEMIs]);

  const animFoir = useAnimatedValue(calc.foir, 900);

  const statusColor = !calc.hasData ? "#3d5570" : calc.eligible ? "#48bb78" : "#fc5c5c";
  const statusBg =
    !calc.hasData
      ? "rgba(61,85,112,0.08)"
      : calc.eligible
        ? "rgba(72,187,120,0.08)"
        : "rgba(252,92,92,0.08)";
  const statusBorder =
    !calc.hasData
      ? "rgba(61,85,112,0.2)"
      : calc.eligible
        ? "rgba(72,187,120,0.22)"
        : "rgba(252,92,92,0.22)";

  const emiColors: Record<string, string> = {
    "Home Loan": "#63b3ed",
    "Car Loan": "#9f7aea",
    "Personal Loan": "#f6ad55",
    "Credit Card": "#fc5c5c",
  };
  const emiIcons: Record<string, string> = {
    "Home Loan": "🏠",
    "Car Loan": "🚗",
    "Personal Loan": "💼",
    "Credit Card": "💳",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 25% 15%, #0c1828 0%, #040c18 45%, #020810 100%)",
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.96); opacity: 0.5; }
          70%  { transform: scale(1.1); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderBreath {
          0%, 100% { box-shadow: 0 0 24px rgba(99,179,237,0.06), inset 0 1px 0 rgba(255,255,255,0.04); }
          50%       { box-shadow: 0 0 48px rgba(99,179,237,0.12), inset 0 1px 0 rgba(255,255,255,0.06); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.7; }
        }

        .card { animation: fadeUp 0.65s cubic-bezier(0.4,0,0.2,1) both; }
        .glass {
          background: rgba(255,255,255,0.022);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.065);
          animation: borderBreath 5s ease-in-out infinite;
        }
        .shimmer-txt {
          background: linear-gradient(90deg, #63b3ed 0%, #e2eeff 35%, #9f7aea 65%, #63b3ed 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }
        .add-btn:hover {
          background: rgba(99,179,237,0.12) !important;
          border-style: solid !important;
          box-shadow: 0 0 20px rgba(99,179,237,0.2);
          transform: translateY(-1px);
        }
        .add-btn { transition: all 0.22s ease !important; }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(99,179,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .orb { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }

        @media (max-width: 768px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .emi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="grid-bg" />
      <div
        className="orb"
        style={{
          width: 450,
          height: 450,
          top: "-12%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          bottom: "-15%",
          right: "-8%",
          background: "radial-gradient(circle, rgba(159,122,234,0.065) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          right: "30%",
          background: "radial-gradient(circle, rgba(72,187,120,0.04) 0%, transparent 70%)",
        }}
      />
      <ParticleBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "44px 20px 70px",
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "52px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-22px)",
            transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div
            style={{
              animation: "floatBadge 3.2s ease-in-out infinite",
              display: "inline-block",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "7px 18px",
                borderRadius: "100px",
                background: "rgba(99,179,237,0.07)",
                border: "1px solid rgba(99,179,237,0.18)",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#63b3ed",
                  display: "inline-block",
                  boxShadow: "0 0 10px #63b3ed",
                  animation: "dotPulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#63b3ed",
                  textTransform: "uppercase",
                }}
              >
                Financial Health Tool
              </span>
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: "14px",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#ddeeff" }}>Obligation &amp; </span>
            <span className="shimmer-txt">FOIR Calculator</span>
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#2d4560",
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Calculate your Fixed Obligation to Income Ratio — the primary metric banks use to
            evaluate your loan eligibility.
          </p>
        </div>

        <div
          className="main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,400px)",
            gap: "18px",
            alignItems: "start",
          }}
        >
          <div
            className="card glass"
            style={{ borderRadius: "26px", padding: "30px", animationDelay: "0.08s" }}
          >
            <div style={{ marginBottom: "26px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "11px",
                    background:
                      "linear-gradient(135deg, rgba(99,179,237,0.15), rgba(99,179,237,0.05))",
                    border: "1px solid rgba(99,179,237,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  💰
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#3d5570",
                  }}
                >
                  Monthly Income
                </span>
              </div>
              <GlowInput id="income" label="Net Monthly Income" icon="₹" value={income} onChange={setIncome} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(99,179,237,0.12))",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "11px",
                    background:
                      "linear-gradient(135deg, rgba(246,173,85,0.15), rgba(252,92,92,0.08))",
                    border: "1px solid rgba(246,173,85,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                  }}
                >
                  📋
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#3d5570",
                    whiteSpace: "nowrap",
                  }}
                >
                  EMI Obligations
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(99,179,237,0.12), transparent)",
                }}
              />
            </div>

            <div
              className="emi-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <GlowInput id="home" label="Home Loan EMI" icon="₹" value={homeLoan} onChange={setHomeLoan} />
              <GlowInput id="car" label="Car Loan EMI" icon="₹" value={carLoan} onChange={setCarLoan} />
              <GlowInput
                id="personal"
                label="Personal Loan EMI"
                icon="₹"
                value={personalLoan}
                onChange={setPersonalLoan}
              />
              <GlowInput
                id="credit"
                label="Credit Card EMI"
                icon="₹"
                value={creditCard}
                onChange={setCreditCard}
              />
            </div>

            {otherEMIs.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                {otherEMIs.map((item, i) => (
                  <OtherRow key={i} index={i} item={item} onUpdate={updateOther} onRemove={removeOther} />
                ))}
              </div>
            )}

            <button
              className="add-btn"
              onClick={addOther}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "14px",
                background: "rgba(99,179,237,0.04)",
                border: "1px dashed rgba(99,179,237,0.22)",
                color: "#4a8aaa",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "'Sora', sans-serif",
                boxShadow: "none",
              }}
            >
              <span style={{ fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>+</span>
              Add Other EMI
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              className="card glass"
              style={{
                borderRadius: "26px",
                padding: "26px",
                animationDelay: "0.18s",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  border: "1px solid rgba(99,179,237,0.05)",
                  animation: "rotateSlow 25s linear infinite",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "50%",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "rgba(99,179,237,0.3)",
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "-30px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "1px solid rgba(159,122,234,0.05)",
                  animation: "rotateSlow 18s linear infinite reverse",
                }}
              />

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#2d4560",
                  marginBottom: "14px",
                }}
              >
                FOIR Score
              </div>

              <div style={{ padding: "0 6px" }}>
                <ArcGauge foir={calc.foir} />
              </div>

              <div style={{ marginTop: "6px" }}>
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: 800,
                    lineHeight: 1,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "-0.02em",
                    color: !calc.hasData
                      ? "#1e3048"
                      : calc.foir <= 40
                        ? "#48bb78"
                        : calc.foir <= 60
                          ? "#f6ad55"
                          : "#fc5c5c",
                    transition: "color 0.5s ease",
                    textShadow: calc.hasData
                      ? `0 0 30px ${
                          !calc.hasData
                            ? "#1e3048"
                            : calc.foir <= 40
                              ? "rgba(72,187,120,0.4)"
                              : calc.foir <= 60
                                ? "rgba(246,173,85,0.4)"
                                : "rgba(252,92,92,0.4)"
                        }`
                      : "none",
                  }}
                >
                  {animFoir.toFixed(1)}
                  <span style={{ fontSize: "22px", fontWeight: 400, opacity: 0.7 }}>%</span>
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#1e3048",
                    marginTop: "6px",
                    letterSpacing: "0.1em",
                  }}
                >
                  THRESHOLD: 60%
                </div>
              </div>

              <div style={{ marginTop: "18px", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 22px",
                    borderRadius: "100px",
                    background: statusBg,
                    border: `1px solid ${statusBorder}`,
                    position: "relative",
                    transition: "all 0.5s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: "-2px",
                      borderRadius: "100px",
                      border: `1px solid ${statusColor}33`,
                      animation: "pulseRing 2.2s ease-out infinite",
                    }}
                  />
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: statusColor,
                      boxShadow: `0 0 10px ${statusColor}`,
                      animation: "dotPulse 2s ease-in-out infinite",
                      flexShrink: 0,
                      transition: "background 0.5s ease, box-shadow 0.5s ease",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: statusColor,
                      letterSpacing: "0.04em",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {!calc.hasData
                      ? "Enter values to calculate"
                      : calc.eligible
                        ? "✓ Loan Eligible"
                        : "⚠ High Risk — Review Required"}
                  </span>
                </div>
              </div>
            </div>

            <div className="card glass" style={{ borderRadius: "26px", padding: "22px", animationDelay: "0.26s" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#2d4560",
                  marginBottom: "16px",
                }}
              >
                Summary
              </div>
              {[
                {
                  label: "Monthly Income",
                  val: income ? `₹${fmt(calc.inc)}` : "—",
                  color: "#63b3ed",
                },
                {
                  label: "Total Obligation",
                  val: calc.total > 0 ? `₹${fmt(calc.total)}` : "—",
                  color: "#f6ad55",
                },
                {
                  label: "FOIR Ratio",
                  val: calc.hasData ? `${calc.foir.toFixed(2)}%` : "—",
                  color: !calc.hasData
                    ? "#2d4560"
                    : calc.foir <= 40
                      ? "#48bb78"
                      : calc.foir <= 60
                        ? "#f6ad55"
                        : "#fc5c5c",
                  mono: true,
                },
                {
                  label: "Disposable Income",
                  val: income ? `₹${fmt(Math.max(0, calc.inc - calc.total))}` : "—",
                  color: !income ? "#2d4560" : calc.inc > calc.total ? "#48bb78" : "#fc5c5c",
                },
              ].map(({ label, val, color, mono }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.035)" : "none",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#2d4560" }}>{label}</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color,
                      transition: "color 0.5s ease",
                      fontFamily: mono ? "'Space Mono',monospace" : "'Sora',sans-serif",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {calc.total > 0 && (
              <div className="card glass" style={{ borderRadius: "26px", padding: "22px", animationDelay: "0.3s" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#2d4560",
                    marginBottom: "16px",
                  }}
                >
                  Obligation Breakdown
                </div>
                {Object.entries(calc.emiMap).map(([k, v], i) => (
                  <ObligationBar
                    key={k}
                    label={k}
                    value={v}
                    total={calc.total}
                    color={emiColors[k] || `hsl(${190 + i * 35}, 65%, 62%)`}
                    icon={emiIcons[k] || "📌"}
                  />
                ))}
              </div>
            )}

            <div className="card glass" style={{ borderRadius: "26px", padding: "22px", animationDelay: "0.34s" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#2d4560",
                  marginBottom: "14px",
                }}
              >
                FOIR Benchmark
              </div>
              {[
                { range: "0 – 40%", label: "Excellent", color: "#48bb78", note: "Easily approved" },
                { range: "41 – 60%", label: "Acceptable", color: "#f6ad55", note: "Conditional" },
                { range: "61 – 100%", label: "High Risk", color: "#fc5c5c", note: "Likely rejected" },
              ].map(({ range, label, color, note }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 8px ${color}88`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#2d4560",
                      flex: 1,
                      fontFamily: "'Space Mono',monospace",
                    }}
                  >
                    {range}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color }}>{label}</span>
                  <span style={{ fontSize: "10px", color: "#1e3048" }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "36px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.2s ease 1s",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#1e3048",
              fontFamily: "'Space Mono',monospace",
              letterSpacing: "0.05em",
            }}
          >
            FOIR = (Total Monthly EMIs ÷ Gross Monthly Income) × 100
          </span>
        </div>
      </div>
    </div>
  );
}
