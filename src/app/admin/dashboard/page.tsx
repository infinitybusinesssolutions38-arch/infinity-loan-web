"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function StatCard({
  title,
  value,
  href,
  subtitle,
  trend,
}: {
  title: string;
  value: string | number;
  href?: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}) {
  const card = (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
          <div className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{value}</div>
          {subtitle && (
            <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
          )}
          {trend && (
            <div className={`mt-2 text-xs font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
        <div className="mt-1 h-10 w-10 rounded-2xl bg-gradient-to-br from-cta/25 via-accent/15 to-transparent ring-1 ring-border/60" />
      </div>
    </div>
  );

  if (!href) return card;

  return (
    <Link
      href={href}
      className="block rounded-3xl outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {card}
    </Link>
  );
}

function MetricCard({
  title,
  value,
  total,
  color = "primary",
}: {
  title: string;
  value: number;
  total: number;
  color?: "primary" | "green" | "red" | "yellow";
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <div className={`rounded-2xl border p-3 ${colorClasses[color]}`}>
      <div className="text-xs font-medium">{title}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
      <div className="text-xs opacity-75">{percentage}% of total</div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/dashboard", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (res.ok && data?.success) {
          setStats(data.data);
        } else {
          setStats(null);
        }
      } catch {
        if (mounted) setStats(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Admin Dashboard</div>
        <div className="text-sm text-muted-foreground">Comprehensive overview of loan applications and platform metrics</div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <StatCard 
          title="Total Users" 
          value={stats?.users ?? "-"} 
          href="/admin/users"
          subtitle="Registered accounts"
        />
        <StatCard 
          title="Loan Enquiries" 
          value={stats?.enquiries ?? "-"} 
          href="/admin/enquiries"
          subtitle="Contact requests"
        />
        <StatCard 
          title="Loan Applications" 
          value={stats?.loanApplications ?? "-"} 
          href="/admin/loan-applications"
          subtitle="Total submitted"
        />
        <StatCard 
          title="Credit Card Apps" 
          value={stats?.creditCardApplications ?? "-"} 
          href="/admin/credit-card-applications"
          subtitle="Card applications"
        />
        <StatCard 
          title="Partner Apps" 
          value={stats?.partnerApplications ?? "-"} 
          href="/admin/partner-applications"
          subtitle="Join us forms"
        />
        <StatCard 
          title="Approval Rate" 
          value={`${stats?.approvalRate ?? 0}%`}
          subtitle="Overall performance"
        />
      </div>

      {/* Recent Activity */}
      <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Recent Activity</div>
            <div className="mt-1 text-xs text-muted-foreground">Applications received in the last 7 days</div>
          </div>
        </div>
        <div className="mt-4">
          <StatCard 
            title="Recent Applications" 
            value={stats?.recentApplications ?? "-"}
            subtitle="Last 7 days"
          />
        </div>
      </div>

      {/* Application Type Breakdown */}
      <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Application Type Breakdown</div>
            <div className="mt-1 text-xs text-muted-foreground">Personal vs Business vs Credit Card vs Partner applications</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
          <MetricCard
            title="Personal Loans"
            value={stats?.applicationTypeSummary?.personal || 0}
            total={stats?.totalApplications || 1}
            color="primary"
          />
          <MetricCard
            title="Business Loans"
            value={stats?.applicationTypeSummary?.business || 0}
            total={stats?.totalApplications || 1}
            color="green"
          />
          <MetricCard
            title="Credit Cards"
            value={stats?.applicationTypeSummary?.creditCard || 0}
            total={stats?.totalApplications || 1}
            color="yellow"
          />
          <MetricCard
            title="Partner Apps"
            value={stats?.applicationTypeSummary?.partner || 0}
            total={stats?.totalApplications || 1}
            color="primary"
          />
        </div>
      </div>

      {/* Application Status Summary */}
      <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Application Status Summary</div>
            <div className="mt-1 text-xs text-muted-foreground">Current status of all applications</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            title="Pending"
            value={stats?.statusSummary?.Pending || 0}
            total={stats?.loanApplications || 1}
            color="yellow"
          />
          <MetricCard
            title="Approved"
            value={stats?.statusSummary?.Approved || 0}
            total={stats?.loanApplications || 1}
            color="green"
          />
          <MetricCard
            title="Rejected"
            value={stats?.statusSummary?.Rejected || 0}
            total={stats?.loanApplications || 1}
            color="red"
          />
        </div>
      </div>

      {/* Top Service Categories */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold">Top Personal Loan Categories</div>
          <div className="mt-4 space-y-2">
            {stats?.topServiceCategories?.personal?.slice(0, 3).map((category: any, index: number) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-sm font-medium">{category._id || "Unknown"}</div>
                <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {category.count}
                </div>
              </div>
            ))}
            {(!stats?.topServiceCategories?.personal || stats.topServiceCategories.personal.length === 0) && (
              <div className="text-sm text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold">Top Business Loan Categories</div>
          <div className="mt-4 space-y-2">
            {stats?.topServiceCategories?.business?.slice(0, 3).map((category: any, index: number) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-sm font-medium">{category._id || "Unknown"}</div>
                <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-700">
                  {category.count}
                </div>
              </div>
            ))}
            {(!stats?.topServiceCategories?.business || stats.topServiceCategories.business.length === 0) && (
              <div className="text-sm text-muted-foreground">No data available</div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold">Top Credit Card Types</div>
          <div className="mt-4 space-y-2">
            {stats?.topServiceCategories?.creditCards?.slice(0, 3).map((category: any, index: number) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-sm font-medium">{category._id || "Unknown"}</div>
                <div className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-semibold text-yellow-700">
                  {category.count}
                </div>
              </div>
            ))}
            {(!stats?.topServiceCategories?.creditCards || stats.topServiceCategories.creditCards.length === 0) && (
              <div className="text-sm text-muted-foreground">No data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      {stats?.monthlyTrends && stats.monthlyTrends.length > 0 && (
        <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold">Monthly Application Trends (Last 6 Months)</div>
          <div className="mt-4 space-y-3">
            {stats.monthlyTrends.slice(-6).map((trend: any, index: number) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-sm font-medium">{trend.month}</div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground">
                    Personal: {trend.personal || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Business: {trend.business || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Credit Card: {trend.creditCard || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Partner: {trend.partner || 0}
                  </div>
                  <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    Total: {trend.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
