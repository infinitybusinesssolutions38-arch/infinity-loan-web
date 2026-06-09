"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText, Receipt } from "lucide-react";

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
  const [loanType, setLoanType] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PaymentReceiptItem[]>([]);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (search.trim()) sp.set("search", search.trim());
    if (loanType) sp.set("loanType", loanType);
    sp.set("page", String(page));
    sp.set("limit", "20");
    return sp.toString();
  }, [search, loanType, page]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`/api/admin/payment-receipts?${query}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;

        if (res.ok && data?.success) {
          const list = Array.isArray(data.data?.items) ? data.data.items : [];
          setItems(list);
          setPages(data.data.pages || 1);
          setTotal(data.data.total || 0);
          setSelectedId((prev) => {
            if (prev && list.some((x: PaymentReceiptItem) => x.id === prev)) return prev;
            return list[0]?.id || null;
          });
        } else {
          setItems([]);
          setPages(1);
          setTotal(0);
          setSelectedId(null);
          setError(data?.message || `Request failed (${res.status})`);
        }
      } catch {
        if (mounted) {
          setItems([]);
          setPages(1);
          setTotal(0);
          setSelectedId(null);
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

  const selected = items.find((item) => item.id === selectedId) || null;

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Payment Receipts</div>
        <div className="text-sm text-muted-foreground">
          Review user-uploaded payment receipts from loan applications.
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {total} receipt{total === 1 ? "" : "s"} found
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <select
            className="rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50"
            value={loanType}
            onChange={(e) => {
              setLoanType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All loan types</option>
            <option value="salaried">Salaried</option>
            <option value="business">Business</option>
          </select>
          <input
            className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 sm:min-w-[240px]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search receipt, application, name, email..."
          />
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-border/70 bg-card/70 shadow-sm backdrop-blur">
          <div className="border-b border-border/70 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Receipt List
            </div>
          </div>

          <div className="max-h-[68vh] overflow-y-auto p-2">
            {loading ? (
              <div className="px-3 py-6 text-sm text-muted-foreground">Loading receipts...</div>
            ) : items.length === 0 ? (
              <div className="px-3 py-6 text-sm text-muted-foreground">No payment receipts found.</div>
            ) : (
              <ul className="space-y-1">
                {items.map((item) => {
                  const active = item.id === selectedId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={
                          "w-full rounded-2xl border px-3 py-3 text-left transition " +
                          (active
                            ? "border-primary/40 bg-primary/10"
                            : "border-transparent bg-background/40 hover:border-border/70 hover:bg-background/70")
                        }
                      >
                        <div className="flex items-start gap-2">
                          <Receipt className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">
                              {item.receiptName || "Untitled Receipt"}
                            </div>
                            <div className="mt-0.5 truncate text-xs text-muted-foreground">
                              {item.applicationRef || "—"}
                            </div>
                            <div className="mt-1 text-[11px] text-muted-foreground">
                              {formatDate(item.uploadedAt)}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        <section className="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur md:p-6">
          {!selected ? (
            <div className="flex min-h-[320px] items-center justify-center text-sm text-muted-foreground">
              Select a receipt from the list to view details.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Receipt Details
                  </div>
                  <h2 className="mt-1 text-xl font-bold tracking-tight">
                    {selected.receiptName || "Untitled Receipt"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{selected.loanLabel}</p>
                </div>
                {selected.receiptUrl ? (
                  <a
                    href={selected.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-4 py-2.5 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Receipt
                  </a>
                ) : null}
              </div>

              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <dt className="text-xs text-muted-foreground">Application ID</dt>
                  <dd className="mt-1 text-sm font-semibold">{selected.applicationRef || "—"}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <dt className="text-xs text-muted-foreground">Loan Type</dt>
                  <dd className="mt-1 text-sm font-semibold">{selected.loanLabel}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <dt className="text-xs text-muted-foreground">Applicant Name</dt>
                  <dd className="mt-1 text-sm font-semibold">{selected.applicantName || "—"}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <dt className="text-xs text-muted-foreground">Applicant Email</dt>
                  <dd className="mt-1 break-all text-sm font-semibold">{selected.applicantEmail || "—"}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <dt className="text-xs text-muted-foreground">Loan Status</dt>
                  <dd className="mt-1 text-sm font-semibold capitalize">{selected.loanStatus || "—"}</dd>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <dt className="text-xs text-muted-foreground">Uploaded On</dt>
                  <dd className="mt-1 text-sm font-semibold">{formatDate(selected.uploadedAt)}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={loanDetailHref(selected)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-input bg-background/60 px-4 py-2.5 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  Open Loan Application
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Page {page} of {pages}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-2xl bg-secondary/70 px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= pages || loading}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-2xl bg-secondary/70 px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
