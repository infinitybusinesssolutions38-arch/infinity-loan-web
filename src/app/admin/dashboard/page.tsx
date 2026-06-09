"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Handshake,
  Mail,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type DashboardStats = {
  users?: number;
  enquiries?: number;
  loanApplications?: number;
  salaryLoanApplications?: number;
  businessLoanApplications?: number;
  creditCardApplications?: number;
  partnerApplications?: number;
  totalApplications?: number;
  approvalRate?: number;
  recentApplications?: number;
  statusSummary?: { Pending?: number; Approved?: number; Rejected?: number };
  applicationTypeSummary?: {
    personal?: number;
    business?: number;
    creditCard?: number;
    partner?: number;
  };
  monthlyTrends?: Array<{
    month: string;
    personal?: number;
    business?: number;
    creditCard?: number;
    partner?: number;
    total?: number;
  }>;
  topServiceCategories?: {
    personal?: Array<{ _id?: string; count?: number }>;
    business?: Array<{ _id?: string; count?: number }>;
    creditCards?: Array<{ _id?: string; count?: number }>;
  };
};

type KpiConfig = {
  title: string;
  subtitle: string;
  value: string | number;
  href?: string;
  icon: LucideIcon;
  accent: string;
  bg: string;
};

function formatMonthLabel(ym: string) {
  const [y, m] = ym.split("-");
  const date = new Date(Number(y), Number(m) - 1, 1);
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function KpiCard({ title, subtitle, value, href, icon: Icon, accent, bg }: KpiConfig) {
  const inner = (
    <div className="admin-kpi-card group h-full">
      <div className="flex items-start justify-between gap-3">
        <div
          className="admin-kpi-icon"
          style={{ background: bg, color: accent }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </div>
        {href && (
          <span className="rounded-lg p-1 text-muted-foreground opacity-0 transition group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
          </span>
        )}
      </div>
      <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="mt-1 text-3xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
    </div>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="block h-full outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#00AEEF]/40 rounded-2xl">
      {inner}
    </Link>
  );
}

function ProgressMetric({
  label,
  value,
  total,
  color,
  barColor,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  barColor: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="admin-metric-row">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="admin-metric-track">
        <div className="admin-metric-bar" style={{ width: `${pct}%`, background: barColor }} />
      </div>
      <div className="text-[11px] text-muted-foreground">{pct}% of total applications</div>
    </div>
  );
}

function RankList({
  title,
  items,
  accent,
  emptyLabel,
}: {
  title: string;
  items: Array<{ _id?: string; count?: number }>;
  accent: string;
  emptyLabel: string;
}) {
  const max = Math.max(...items.map((i) => i.count || 0), 1);

  return (
    <div className="admin-panel h-full">
      <div className="admin-panel-header">
        <h3 className="admin-panel-title">{title}</h3>
      </div>
      <div className="mt-4 space-y-2.5">
        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">{emptyLabel}</p>
        )}
        {items.slice(0, 5).map((item, index) => {
          const count = item.count || 0;
          const width = Math.round((count / max) * 100);
          return (
            <div key={`${item._id}-${index}`} className="admin-rank-item">
              <div className="flex items-center gap-3">
                <span
                  className="admin-rank-badge"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{item._id || "Uncategorized"}</div>
                  <div className="admin-rank-track mt-1.5">
                    <div
                      className="admin-rank-bar"
                      style={{ width: `${width}%`, background: accent }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold tabular-nums" style={{ color: accent }}>
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="admin-welcome-banner h-28 rounded-2xl bg-[#E6F7FD]" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-[#EEF9FE]" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-64 rounded-2xl bg-[#F7F9FC]" />
        <div className="h-64 rounded-2xl bg-[#F7F9FC]" />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refresh = () => setRefreshKey((key) => key + 1);
    window.addEventListener("admin:dashboard-refresh", refresh);
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("admin:dashboard-refresh", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/dashboard", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (res.ok && data?.success) setStats(data.data);
        else setStats(null);
      } catch {
        if (mounted) setStats(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  const kpis: KpiConfig[] = useMemo(
    () => [
      {
        title: "Total Users",
        subtitle: "Registered accounts",
        value: stats?.users ?? "—",
        href: "/admin/users",
        icon: Users,
        accent: "#00AEEF",
        bg: "#E6F7FD",
      },
      {
        title: "Loan Enquiries",
        subtitle: "Contact form submissions",
        value: stats?.enquiries ?? "—",
        href: "/admin/enquiries",
        icon: Mail,
        accent: "#33C1F3",
        bg: "#E3F2FD",
      },
      {
        title: "Salary Loan Apps",
        subtitle: "Salaried employee applications",
        value: stats?.salaryLoanApplications ?? stats?.applicationTypeSummary?.personal ?? "—",
        href: "/admin/salary-loan-applications",
        icon: Wallet,
        accent: "#0D9488",
        bg: "#CCFBF1",
      },
      {
        title: "Business Loan Apps",
        subtitle: "Business loan applications",
        value: stats?.businessLoanApplications ?? stats?.applicationTypeSummary?.business ?? "—",
        href: "/admin/business-loan-applications",
        icon: BriefcaseBusiness,
        accent: "#0284C7",
        bg: "#E0F2FE",
      },
      {
        title: "Credit Card Apps",
        subtitle: "Card applications received",
        value: stats?.creditCardApplications ?? "—",
        href: "/admin/credit-card-applications",
        icon: CreditCard,
        accent: "#8B5CF6",
        bg: "#EDE9FE",
      },
      {
        title: "Partner Applications",
        subtitle: "Loan partner registrations",
        value: stats?.partnerApplications ?? "—",
        href: "/admin/partner-applications",
        icon: Handshake,
        accent: "#F59E0B",
        bg: "#FEF3C7",
      },
      {
        title: "Approval Rate",
        subtitle: "Approved vs total applications",
        value: `${stats?.approvalRate ?? 0}%`,
        icon: TrendingUp,
        accent: "#16A34A",
        bg: "#DCFCE7",
      },
    ],
    [stats]
  );

  const totalApps = stats?.totalApplications || 0;
  const status = stats?.statusSummary || {};
  const statusTotal =
    (status.Pending || 0) + (status.Approved || 0) + (status.Rejected || 0) || 1;
  const trends = stats?.monthlyTrends?.slice(-6) || [];
  const maxTrend = Math.max(...trends.map((t) => t.total || 0), 1);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="admin-welcome-banner">
        <div className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
              Overview
            </p>
            <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
              Welcome back, Admin
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Monitor enquiries, loan applications, and platform performance at a glance.
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur-sm">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
              Today
            </div>
            <div className="mt-0.5 font-medium">{today}</div>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Recent activity + Status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h3 className="admin-panel-title">Recent Activity</h3>
              <p className="admin-panel-subtitle">Applications received in the last 7 days</p>
            </div>
            <div className="admin-panel-badge admin-panel-badge-blue">
              <Clock3 className="h-3.5 w-3.5" />
              7 days
            </div>
          </div>
          <div className="mt-5 flex items-end gap-4">
            <div className="text-5xl font-bold tracking-tight text-[#00AEEF]">
              {stats?.recentApplications ?? 0}
            </div>
            <div className="mb-2 text-sm text-muted-foreground">new submissions</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Salary", value: stats?.applicationTypeSummary?.personal ?? 0, color: "#0D9488" },
              { label: "Business", value: stats?.applicationTypeSummary?.business ?? 0, color: "#00AEEF" },
              { label: "Credit Card", value: stats?.applicationTypeSummary?.creditCard ?? 0, color: "#8B5CF6" },
              { label: "Partner", value: stats?.applicationTypeSummary?.partner ?? 0, color: "#F59E0B" },
            ].map((item) => (
              <div key={item.label} className="admin-mini-stat">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-1 text-lg font-bold" style={{ color: item.color }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h3 className="admin-panel-title">Application Status</h3>
              <p className="admin-panel-subtitle">Current pipeline across all application types</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {[
              {
                label: "Pending review",
                value: status.Pending || 0,
                icon: Clock3,
                color: "#F59E0B",
                bg: "#FEF3C7",
              },
              {
                label: "Approved",
                value: status.Approved || 0,
                icon: CheckCircle2,
                color: "#16A34A",
                bg: "#DCFCE7",
              },
              {
                label: "Rejected",
                value: status.Rejected || 0,
                icon: XCircle,
                color: "#E11D48",
                bg: "#FFE4E6",
              },
            ].map((item) => {
              const pct = Math.round((item.value / statusTotal) * 100);
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: item.bg, color: item.color }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm font-bold tabular-nums" style={{ color: item.color }}>
                        {item.value}
                      </span>
                    </div>
                    <div className="admin-metric-track mt-1.5">
                      <div
                        className="admin-metric-bar"
                        style={{ width: `${pct}%`, background: item.color }}
                      />
                    </div>
                  </div>
                  <span className="w-10 text-right text-xs font-semibold text-muted-foreground">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Application breakdown */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3 className="admin-panel-title">Application Breakdown</h3>
            <p className="admin-panel-subtitle">
              Distribution by product type · {totalApps} total applications
            </p>
          </div>
          <div className="admin-panel-badge admin-panel-badge-blue">
            <FileText className="h-3.5 w-3.5" />
            All types
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProgressMetric
            label="Salary employee loans"
            value={stats?.applicationTypeSummary?.personal || 0}
            total={totalApps || 1}
            color="#0D9488"
            barColor="#0D9488"
          />
          <ProgressMetric
            label="Business loans"
            value={stats?.applicationTypeSummary?.business || 0}
            total={totalApps || 1}
            color="#00AEEF"
            barColor="#00AEEF"
          />
          <ProgressMetric
            label="Credit cards"
            value={stats?.applicationTypeSummary?.creditCard || 0}
            total={totalApps || 1}
            color="#8B5CF6"
            barColor="#8B5CF6"
          />
          <ProgressMetric
            label="Partner applications"
            value={stats?.applicationTypeSummary?.partner || 0}
            total={totalApps || 1}
            color="#F59E0B"
            barColor="#F59E0B"
          />
        </div>
      </div>

      {/* Top categories */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RankList
          title="Top Salary Loan Categories"
          items={stats?.topServiceCategories?.personal || []}
          accent="#00AEEF"
          emptyLabel="No salary loan data yet"
        />
        <RankList
          title="Top Business Loan Categories"
          items={stats?.topServiceCategories?.business || []}
          accent="#00AEEF"
          emptyLabel="No business loan data yet"
        />
        <RankList
          title="Top Credit Card Types"
          items={stats?.topServiceCategories?.creditCards || []}
          accent="#8B5CF6"
          emptyLabel="No credit card data yet"
        />
      </div>

      {/* Monthly trends */}
      {trends.length > 0 && (
        <div className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h3 className="admin-panel-title">Monthly Trends</h3>
              <p className="admin-panel-subtitle">Application volume over the last 6 months</p>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0D9488]" /> Salary
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#00AEEF]" /> Business
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" /> Credit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B]" /> Partner
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {trends.map((trend) => {
              const total = trend.total || 0;
              const barWidth = Math.round((total / maxTrend) * 100);
              const personal = trend.personal || 0;
              const business = trend.business || 0;
              const credit = trend.creditCard || 0;
              const partner = trend.partner || 0;
              const sum = personal + business + credit + partner || 1;

              return (
                <div key={trend.month} className="admin-trend-row">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {formatMonthLabel(trend.month)}
                    </span>
                    <span className="rounded-full bg-[#E6F7FD] px-2.5 py-0.5 text-xs font-bold text-[#00AEEF]">
                      {total} total
                    </span>
                  </div>
                  <div className="admin-trend-bar-wrap" style={{ width: `${Math.max(barWidth, 4)}%` }}>
                    <div
                      className="admin-trend-segment"
                      style={{ width: `${(personal / sum) * 100}%`, background: "#0D9488" }}
                    />
                    <div
                      className="admin-trend-segment"
                      style={{ width: `${(business / sum) * 100}%`, background: "#00AEEF" }}
                    />
                    <div
                      className="admin-trend-segment"
                      style={{ width: `${(credit / sum) * 100}%`, background: "#8B5CF6" }}
                    />
                    <div
                      className="admin-trend-segment"
                      style={{ width: `${(partner / sum) * 100}%`, background: "#F59E0B" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3 className="admin-panel-title">Quick Actions</h3>
            <p className="admin-panel-subtitle">Jump to frequently used admin sections</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { href: "/admin/enquiries", label: "Loan Enquiries", icon: Mail, color: "#33C1F3" },
            { href: "/admin/regular-enquiries", label: "Regular Enquiries", icon: FileText, color: "#16A34A" },
            { href: "/admin/salary-loan-applications", label: "Salary Loans", icon: Wallet, color: "#0D9488" },
            { href: "/admin/business-loan-applications", label: "Business Loans", icon: BriefcaseBusiness, color: "#00AEEF" },
            { href: "/admin/credit-card-applications", label: "Credit Cards", icon: CreditCard, color: "#8B5CF6" },
            { href: "/admin/google-forms", label: "Google Forms", icon: FileText, color: "#00AEEF" },
            { href: "/admin/partner-applications", label: "Partners", icon: Handshake, color: "#F59E0B" },
            { href: "/admin/users", label: "Users", icon: Users, color: "#00AEEF" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="admin-quick-action group"
              >
                <span
                  className="admin-quick-action-icon"
                  style={{ background: `${action.color}14`, color: action.color }}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-xs font-semibold text-foreground group-hover:text-[#00AEEF]">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
