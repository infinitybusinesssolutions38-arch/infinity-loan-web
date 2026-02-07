"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type EnquiryItem = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  subject: string;
  status?: "New" | "Contacted" | "Closed";
  createdAt?: string;
};

export default function AdminEnquiriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [rowSaving, setRowSaving] = useState<Record<string, boolean>>({});
  const [rowStatus, setRowStatus] = useState<Record<string, EnquiryItem["status"]>>({});

  const getId = (x: any) => {
    const raw = x?._id;
    if (!raw) return "";
    if (typeof raw === "string") return raw;
    if (typeof raw?.$oid === "string") return raw.$oid;
    if (typeof raw?.toString === "function") return raw.toString();
    return String(raw);
  };

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (search.trim()) sp.set("search", search.trim());
    if (status) sp.set("status", status);
    sp.set("page", String(page));
    sp.set("limit", "10");
    return sp.toString();
  }, [search, status, page]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`/api/admin/enquiries?${query}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;

        if (res.ok && data?.success) {
          setItems(data.data.items || []);
          setPages(data.data.pages || 1);
        } else {
          setItems([]);
          setPages(1);
          setError(data?.message || `Request failed (${res.status})`);
        }
      } catch {
        if (mounted) {
          setItems([]);
          setPages(1);
          setError("Request failed");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [query]);

  useEffect(() => {
    const next: Record<string, EnquiryItem["status"]> = {};
    for (const x of items) {
      const id = getId(x);
      if (!id) continue;
      next[id] = x.status || "New";
    }
    setRowStatus(next);
  }, [items]);

  const updateRowStatus = async (id: string) => {
    const nextStatus = rowStatus[id] || "New";
    setRowSaving((m) => ({ ...m, [id]: true }));
    setError(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to update status");
        return;
      }

      setItems((prev) =>
        prev.map((x) =>
          getId(x) === id ? { ...x, status: data.data?.status || nextStatus } : x
        )
      );
    } catch {
      setError("Failed to update status");
    } finally {
      setRowSaving((m) => ({ ...m, [id]: false }));
    }
  };

  const badge = (s: string | undefined) => {
    if (s === "Closed") return "bg-success/10 text-success";
    if (s === "Contacted") return "bg-warning/10 text-warning";
    return "bg-secondary text-foreground";
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Loan Enquiries</div>
        <div className="text-sm text-muted-foreground">Contact form submissions</div>
      </div>

      <div className="mt-5 rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Inbox</div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
            <input
              className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)] md:w-72"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search enquiries..."
            />

            <select
              className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)] md:w-44"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Mobile</th>
              <th className="py-3">Subject</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
              <th className="py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => {
              const id = getId(e);
              return (
              <tr key={id || String((e as any)?._id)} className="border-t border-border/70">
                <td className="py-4 font-medium">{e.firstname} {e.lastname}</td>
                <td className="py-4">{e.email}</td>
                <td className="py-4">{e.mobile}</td>
                <td className="py-4">{e.subject}</td>
                <td className="py-4">
                  <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-semibold " + badge(e.status)}>
                    {e.status || "New"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <select
                      className="w-full rounded-2xl border border-input bg-background/60 px-3 py-2 text-xs font-semibold outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)] md:w-36"
                      value={rowStatus[id] || e.status || "New"}
                      onChange={(ev) => setRowStatus((m) => ({ ...m, [id]: ev.target.value as any }))}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <button
                      onClick={() => updateRowStatus(id)}
                      disabled={!id || !!rowSaving[id]}
                      className="w-full rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-3 py-2 text-xs font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50 md:w-auto"
                    >
                      {rowSaving[id] ? "Saving..." : "Update"}
                    </button>
                  </div>
                </td>
                <td className="py-4">
                  <Link
                    href={`/admin/enquiries/${id}`}
                    className="rounded-2xl bg-secondary/70 px-3 py-2 text-xs font-semibold transition hover:bg-secondary"
                  >
                    Details
                  </Link>
                </td>
              </tr>
              );
            })}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-muted-foreground">
                  {error ? "Unable to load enquiries" : "No enquiries found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">Page {page} of {pages}</div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-2xl border border-border/70 bg-background/60 px-3 py-2 text-xs font-semibold transition hover:bg-background disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="rounded-2xl border border-border/70 bg-background/60 px-3 py-2 text-xs font-semibold transition hover:bg-background disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
