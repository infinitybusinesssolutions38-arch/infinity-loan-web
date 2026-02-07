"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminLoanApplicationDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<any>(null);
  const [status, setStatus] = useState<string>("Pending");
  const [adminRemarks, setAdminRemarks] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/loan-applications/${params.id}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));

        if (!mounted) return;

        if (res.ok && data?.success) {
          setItem(data.data);
          setStatus(data.data.status || "Pending");
          setAdminRemarks(data.data.adminRemarks || "");
        } else {
          setError(data?.message || "Failed to load application");
        }
      } catch {
        if (mounted) setError("Failed to load application");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const save = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/loan-applications/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status, adminRemarks }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to update");
        return;
      }

      setItem(data.data);
    } catch {
      setError("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold">Application not found</div>
        {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
        <div className="mt-6">
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/loan-applications">
            Back
          </Link>
        </div>
      </div>
    );
  }

  const name = item._type === "business" ? item.fullName : `${item.firstname || ""} ${item.lastname || ""}`.trim();

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Application</div>
          <div className="mt-2 text-xl font-bold tracking-tight">Loan Application</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {item._type} • Ref: {item.applicationRef || "-"}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <select
            className="rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={save}
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Name</div>
          <div className="mt-1 text-sm font-semibold">{name || "-"}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Email</div>
          <div className="mt-1 text-sm font-semibold">{item.email || "-"}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Mobile</div>
          <div className="mt-1 text-sm font-semibold">{item.mobile || "-"}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="mt-1 text-sm font-semibold">{item.status || "Pending"}</div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-border/70 bg-background/50 p-5">
        <div className="text-xs text-muted-foreground">Admin Remarks</div>
        <textarea
          className="mt-3 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
          rows={4}
          value={adminRemarks}
          onChange={(e) => setAdminRemarks(e.target.value)}
          placeholder="Add remarks..."
        />
      </div>

      <div className="mt-4 rounded-3xl border border-border/70 bg-background/50 p-5">
        <div className="text-xs text-muted-foreground">Raw Details</div>
        <pre className="mt-3 max-h-[420px] overflow-auto rounded-2xl bg-secondary/40 p-4 text-xs">
          {JSON.stringify(item, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/loan-applications">
          Back to list
        </Link>
      </div>
    </div>
  );
}
