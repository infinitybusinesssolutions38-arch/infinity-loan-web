"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string | number;
  href?: string;
}) {
  const card = (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
          <div className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{value}</div>
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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
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
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Overview</div>
        <div className="text-sm text-muted-foreground">Quick stats across the platform</div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Users" value={stats?.users ?? "-"} href="/admin/users" />
        <StatCard title="Loan Enquiries" value={stats?.enquiries ?? "-"} href="/admin/enquiries" />
        <StatCard title="Loan Applications" value={stats?.loanApplications ?? "-"} href="/admin/loan-applications" />
      </div>

      <div className="mt-6 rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Loan Status Summary</div>
            <div className="mt-1 text-xs text-muted-foreground">Pending vs approved vs rejected</div>
          </div>
          <div className="hidden h-8 w-8 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-transparent ring-1 ring-border/60 md:block" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard title="Pending" value={stats?.statusSummary?.Pending ?? "-"} />
          <StatCard title="Approved" value={stats?.statusSummary?.Approved ?? "-"} />
          <StatCard title="Rejected" value={stats?.statusSummary?.Rejected ?? "-"} />
        </div>
      </div>
    </div>
  );
}
