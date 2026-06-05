"use client";

import { useEffect, useMemo, useState } from "react";

type RegularEnquiryItem = {
  _id: string;
  name: string;
  phone: string;
  company: string;
  message: string;
  agreedToContact: boolean;
  status?: "New" | "Contacted" | "Closed";
  createdAt?: string;
};

export default function RegularEnquiriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<RegularEnquiryItem[]>([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [rowSaving, setRowSaving] = useState<Record<string, boolean>>({});
  const [rowStatus, setRowStatus] = useState<Record<string, RegularEnquiryItem["status"]>>({});
  const [savedFlash, setSavedFlash] = useState<Record<string, boolean>>({});

  const getId = (x: RegularEnquiryItem | { _id?: unknown }) => {
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
        const res = await fetch(`/api/admin/regular-enquiries?${query}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;

        if (res.ok && data?.success) {
          const list = Array.isArray(data.data?.items) ? data.data.items : [];
          setItems(
            list.map((x: RegularEnquiryItem & { _id?: unknown }) => ({
              ...x,
              _id: getId(x),
              status: (x.status === "Contacted" || x.status === "Closed" ? x.status : "New") as RegularEnquiryItem["status"],
            }))
          );
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
    const next: Record<string, RegularEnquiryItem["status"]> = {};
    for (const x of items) {
      const id = getId(x);
      if (!id) continue;
      next[id] = x.status || "New";
    }
    setRowStatus(next);
  }, [items]);

  const updateRowStatus = async (id: string, nextStatus: RegularEnquiryItem["status"]) => {
    if (!id) {
      setError("Invalid enquiry id — refresh the page and try again.");
      return;
    }

    setRowSaving((m) => ({ ...m, [id]: true }));
    setError(null);

    try {
      const res = await fetch(`/api/admin/regular-enquiries/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || `Failed to update status (${res.status})`);
        return;
      }

      const savedStatus = (data.data?.status || nextStatus) as RegularEnquiryItem["status"];
      setItems((prev) =>
        prev.map((x) => (getId(x) === id ? { ...x, status: savedStatus } : x))
      );
      setRowStatus((m) => ({ ...m, [id]: savedStatus }));
      setSavedFlash((m) => ({ ...m, [id]: true }));
      setTimeout(() => {
        setSavedFlash((m) => {
          const next = { ...m };
          delete next[id];
          return next;
        });
      }, 2000);
    } catch {
      setError("Failed to update status");
    } finally {
      setRowSaving((m) => ({ ...m, [id]: false }));
    }
  };

  const handleStatusChange = (id: string, value: RegularEnquiryItem["status"]) => {
    setRowStatus((m) => ({ ...m, [id]: value }));
    void updateRowStatus(id, value);
  };

  const badge = (s: string | undefined) => {
    if (s === "Closed") return "bg-success/10 text-success";
    if (s === "Contacted") return "bg-warning/10 text-warning";
    return "bg-secondary text-foreground";
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Regular Enquiries</div>
        <div className="text-sm text-muted-foreground">Popup form submissions from home page</div>
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
              <th className="py-3">Phone</th>
              <th className="py-3">Company</th>
              <th className="py-3">Message</th>
              <th className="py-3">Status</th>
              <th className="py-3">Change status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => {
              const id = getId(e);
              return (
              <tr key={id || String((e as any)?._id)} className="border-t border-border/70">
                <td className="py-4 font-medium">{e.name}</td>
                <td className="py-4">{e.phone}</td>
                <td className="py-4">{e.company || "-"}</td>
                <td className="py-4 max-w-xs truncate">{e.message || "-"}</td>
                <td className="py-4">
                  <span className={"inline-flex rounded-full px-2.5 py-1 text-xs font-semibold " + badge(e.status)}>
                    {e.status || "New"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-col gap-1">
                    <select
                      className="w-full rounded-2xl border border-input bg-background/60 px-3 py-2 text-xs font-semibold outline-none transition focus:border-primary/50 focus:bg-background md:w-36"
                      value={rowStatus[id] || e.status || "New"}
                      disabled={!id || !!rowSaving[id]}
                      onChange={(ev) =>
                        handleStatusChange(id, ev.target.value as RegularEnquiryItem["status"])
                      }
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                    {rowSaving[id] ? (
                      <span className="text-[10px] text-muted-foreground">Saving…</span>
                    ) : savedFlash[id] ? (
                      <span className="text-[10px] font-semibold text-[#16A34A]">Saved</span>
                    ) : null}
                  </div>
                </td>
              </tr>
              );
            })}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-muted-foreground">
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
