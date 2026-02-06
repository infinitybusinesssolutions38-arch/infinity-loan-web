"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UserItem = {
  _id: string;
  email: string;
  mobile?: string;
  role: string;
  isDisabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/users/${params.id}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));

        if (!mounted) return;

        if (res.ok && data?.success) {
          setItem(data.data);
        } else {
          setError(data?.message || "Failed to load user");
        }
      } catch {
        if (mounted) setError("Failed to load user");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const toggleDisable = async () => {
    if (!item) return;

    const next = !item.isDisabled;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isDisabled: next }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to update user");
        return;
      }

      setItem(data.data);
    } catch {
      setError("Failed to update user");
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
        <div className="text-sm font-semibold">User not found</div>
        {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
        <div className="mt-6">
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/users">
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
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</div>
          <div className="mt-2 text-xl font-bold tracking-tight">User Details</div>
          <div className="mt-1 text-sm text-muted-foreground">{item.email}</div>
        </div>

        <button
          onClick={toggleDisable}
          disabled={saving}
          className={
            "rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:opacity-50 " +
            (item.isDisabled
              ? "bg-success/10 text-success border border-success/20 hover:bg-success/15"
              : "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/15")
          }
        >
          {saving ? "Saving..." : item.isDisabled ? "Enable User" : "Disable User"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Email</div>
          <div className="mt-1 text-sm font-semibold">{item.email}</div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Mobile</div>
          <div className="mt-1 text-sm font-semibold">{item.mobile || "-"}</div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Role</div>
          <div className="mt-1 text-sm font-semibold">{item.role}</div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="mt-1 text-sm font-semibold">{item.isDisabled ? "Disabled" : "Active"}</div>
        </div>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/users">
          Back to list
        </Link>
      </div>
    </div>
  );
}
