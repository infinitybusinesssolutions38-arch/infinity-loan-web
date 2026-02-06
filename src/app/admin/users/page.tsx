"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type UserItem = {
  _id: string;
  email: string;
  mobile?: string;
  role: string;
  isDisabled?: boolean;
  createdAt?: string;
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<UserItem[]>([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (search.trim()) sp.set("search", search.trim());
    sp.set("page", String(page));
    sp.set("limit", "10");
    return sp.toString();
  }, [search, page]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`/api/admin/users?${query}`, { credentials: "include" });
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

  const toggleDisable = async (u: UserItem) => {
    const next = !u.isDisabled;
    const res = await fetch(`/api/admin/users/${u._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isDisabled: next }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success) {
      setItems((prev) => prev.map((x) => (x._id === u._id ? data.data : x)));
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Users</div>
        <div className="text-sm text-muted-foreground">Search by email, mobile, or role</div>
      </div>

      <div className="mt-5 rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Directory</div>
          <div className="w-full md:w-80">
            <input
              className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
            />
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
              <th className="py-3">Email</th>
              <th className="py-3">Mobile</th>
              <th className="py-3">Role</th>
              <th className="py-3">Status</th>
              <th className="py-3">Actions</th>
              <th className="py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u._id} className="border-t border-border/70">
                <td className="py-4 font-medium">{u.email}</td>
                <td className="py-4">{u.mobile || "-"}</td>
                <td className="py-4">{u.role}</td>
                <td className="py-4">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold " +
                      (u.isDisabled ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success")
                    }
                  >
                    {u.isDisabled ? "Disabled" : "Active"}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => toggleDisable(u)}
                    className="rounded-2xl bg-secondary/70 px-3 py-2 text-xs font-semibold transition hover:bg-secondary"
                  >
                    {u.isDisabled ? "Enable" : "Disable"}
                  </button>
                </td>
                <td className="py-4">
                  <Link
                    href={`/admin/users/${u._id}`}
                    className="rounded-2xl bg-secondary/70 px-3 py-2 text-xs font-semibold transition hover:bg-secondary"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-muted-foreground">
                  {error ? "Unable to load users" : "No users found"}
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
