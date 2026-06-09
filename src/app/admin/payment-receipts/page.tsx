"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import AdminListDeleteButton from "@/components/admin/AdminListDeleteButton";

type PaymentReceiptItem = {
  id: string;
  loanId: string;
  loanType: "salaried" | "business";
  loanLabel: string;
  applicationRef: string;
  applicantName: string;
  applicantEmail: string;
  loanStatus: string;
  receiptName: string;
  receiptUrl: string;
  uploadedAt: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function loanDetailHref(item: PaymentReceiptItem) {
  if (item.loanType === "business") {
    return `/admin/business-loan-applications/${item.loanId}`;
  }
  return `/admin/salary-loan-applications/${item.loanId}`;
}

export default function AdminPaymentReceiptsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PaymentReceiptItem[]>([]);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (search.trim()) sp.set("search", search.trim());
    sp.set("page", String(page));
    sp.set("limit", "20");
    return sp.toString();
  }, [search, page]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`/api/admin/payment-receipts?${query}`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;

        if (res.ok && data?.success) {
          setItems(Array.isArray(data.data?.items) ? data.data.items : []);
          setPages(data.data.pages || 1);
          setTotal(data.data.total || 0);
        } else {
          setItems([]);
          setPages(1);
          setTotal(0);
          setError(data?.message || `Request failed (${res.status})`);
        }
      } catch {
        if (mounted) {
          setItems([]);
          setPages(1);
          setTotal(0);
          setError("Request failed");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [query, refreshKey]);

  const deleteReceipt = async (item: PaymentReceiptItem) => {
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/payment-receipts/${encodeURIComponent(item.id)}?loanType=${item.loanType}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to delete payment receipt");
        return false;
      }

      if (items.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        setRefreshKey((key) => key + 1);
      }
      return true;
    } catch {
      setError("Failed to delete payment receipt");
      return false;
    }
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">User Payment Receipts</div>
        <div className="text-sm text-muted-foreground">
          Receipts uploaded from the profile page and stored on each loan application.
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {total} upload{total === 1 ? "" : "s"} from user profile
        </div>
        <input
          className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)] sm:max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search ref, name, email, file..."
        />
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="mt-6">
        {loading ? (
          <div className="rounded-2xl border border-border/50 bg-background/50 px-6 py-16 text-center text-sm text-muted-foreground">
            Loading payment receipts...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-background/50 px-6 py-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" strokeWidth={1.5} />
            <p className="mt-4 text-sm text-muted-foreground">
              {error ? "Unable to load payment receipts" : "No payment receipts uploaded yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Application Ref</th>
                  <th className="px-4 py-3">Applicant</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Loan Type</th>
                  <th className="px-4 py-3">Receipt File</th>
                  <th className="px-4 py-3">Uploaded</th>
                  <th className="px-4 py-3">Delete</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border/30 hover:bg-background/50">
                    <td className="px-4 py-3 font-medium">{item.applicationRef || "—"}</td>
                    <td className="px-4 py-3">{item.applicantName || "—"}</td>
                    <td className="px-4 py-3">{item.applicantEmail || "—"}</td>
                    <td className="px-4 py-3">{item.loanLabel}</td>
                    <td className="px-4 py-3 max-w-[180px] truncate" title={item.receiptName}>
                      {item.receiptName || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.uploadedAt)}</td>
                    <td className="px-4 py-3">
                      <AdminListDeleteButton
                        itemLabel="this payment receipt"
                        onDelete={() => deleteReceipt(item)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.receiptUrl ? (
                          <a
                            href={item.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View
                          </a>
                        ) : null}
                        <Link
                          href={loanDetailHref(item)}
                          className="text-xs font-semibold text-muted-foreground hover:text-primary hover:underline"
                        >
                          Loan
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && items.length > 0 ? (
        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Page {page} of {pages}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-2xl border border-border/70 bg-background/60 px-3 py-2 text-xs font-semibold transition hover:bg-background disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="rounded-2xl border border-border/70 bg-background/60 px-3 py-2 text-xs font-semibold transition hover:bg-background disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
