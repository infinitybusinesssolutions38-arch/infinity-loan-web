"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Enquiry = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  status?: "New" | "Contacted" | "Closed";
  createdAt?: string;
};

export default function AdminEnquiryDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Enquiry | null>(null);
  const [status, setStatus] = useState<Enquiry["status"]>("New");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/enquiries/${params.id}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));

        if (!mounted) return;

        if (res.ok && data?.success) {
          setItem(data.data);
          setStatus(data.data.status || "New");
        } else {
          setError(data?.message || "Failed to load enquiry");
        }
      } catch {
        if (mounted) setError("Failed to load enquiry");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const updateStatus = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/enquiries/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to update status");
        return;
      }

      setItem(data.data);
    } catch {
      setError("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const deleteEnquiry = async () => {
    const ok = window.confirm("Delete this enquiry? This cannot be undone.");
    if (!ok) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${params.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to delete");
        return;
      }

      window.location.href = "/admin/enquiries";
    } catch {
      setError("Failed to delete");
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
        <div className="text-sm font-semibold">Enquiry not found</div>
        {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
        <div className="mt-6">
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/enquiries">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enquiry</div>
          <div className="mt-2 text-xl font-bold tracking-tight">Enquiry Details</div>
          <div className="mt-1 text-sm text-muted-foreground">{item.email} • {item.mobile}</div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <select
            className="rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            onClick={updateStatus}
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update"}
          </button>

          <button
            onClick={deleteEnquiry}
            disabled={saving}
            className="rounded-2xl border border-border/70 bg-background/60 px-5 py-3 text-sm font-semibold text-destructive transition hover:bg-background disabled:opacity-50"
          >
            Delete
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
          <div className="mt-1 text-sm font-semibold">{item.firstname} {item.lastname}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Subject</div>
          <div className="mt-1 text-sm font-semibold">{item.subject}</div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-border/70 bg-background/50 p-5">
        <div className="text-xs text-muted-foreground">Message</div>
        <div className="mt-2 whitespace-pre-wrap text-sm">{item.message}</div>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/enquiries">
          Back to list
        </Link>
      </div>
    </div>
  );
}
