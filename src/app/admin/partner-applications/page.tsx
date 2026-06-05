"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PartnerStatus = "New" | "Contacted" | "Approved" | "Rejected" | "Onboarded";

type PartnerApplication = {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  preferredLoan: string;
  status?: PartnerStatus;
  createdAt?: string;
};

const STATUS_OPTIONS: PartnerStatus[] = [
  "New",
  "Contacted",
  "Approved",
  "Rejected",
  "Onboarded",
];

function normalizeStatus(value: unknown): PartnerStatus {
  const raw = String(value || "").trim();
  if (STATUS_OPTIONS.includes(raw as PartnerStatus)) return raw as PartnerStatus;
  return "New";
}

export default function PartnerApplicationsPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rowSaving, setRowSaving] = useState<Record<string, boolean>>({});
  const [rowStatus, setRowStatus] = useState<Record<string, PartnerStatus>>({});
  const getId = (x: PartnerApplication | { _id?: unknown }) => {
    const raw = x?._id;
    if (!raw) return "";
    if (typeof raw === "string") return raw;
    if (typeof raw?.$oid === "string") return raw.$oid;
    if (typeof raw?.toString === "function") return raw.toString();
    return String(raw);
  };

  const [savedFlash, setSavedFlash] = useState<Record<string, boolean>>({});

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/partner-applications", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        const list = Array.isArray(data.data) ? data.data : [];
        setApplications(
          list.map((app: PartnerApplication & { _id?: unknown }) => ({
            ...app,
            _id: getId(app),
            status: normalizeStatus(app.status),
          }))
        );
      } else {
        setApplications([]);
        setError(data?.message || "Failed to load partner applications");
      }
    } catch {
      setApplications([]);
      setError("Failed to load partner applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApplications();
  }, []);

  useEffect(() => {
    const next: Record<string, PartnerStatus> = {};
    for (const app of applications) {
      const id = getId(app);
      if (!id) continue;
      next[id] = normalizeStatus(app.status);
    }
    setRowStatus(next);
  }, [applications]);

  const updateRowStatus = async (id: string, nextStatus: PartnerStatus) => {
    if (!id) {
      setError("Invalid application id — refresh the page and try again.");
      return;
    }

    setRowSaving((m) => ({ ...m, [id]: true }));
    setError(null);

    try {
      const res = await fetch(`/api/admin/partner-applications/${encodeURIComponent(id)}`, {
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

      const savedStatus = normalizeStatus(data.data?.status || nextStatus);
      setApplications((prev) =>
        prev.map((app) => (getId(app) === id ? { ...app, status: savedStatus } : app))
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

  const handleStatusChange = (id: string, value: PartnerStatus) => {
    setRowStatus((m) => ({ ...m, [id]: value }));
    void updateRowStatus(id, value);
  };

  const badgeClass = (status: PartnerStatus) => {
    if (status === "Approved" || status === "Onboarded") return "bg-green-50 text-green-700";
    if (status === "Contacted") return "bg-yellow-50 text-yellow-700";
    if (status === "Rejected") return "bg-red-50 text-red-700";
    return "bg-[#E6F7FD] text-[#008FCC]";
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading partner applications...</div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-bold tracking-tight">Loan Partner Applications</div>
          <div className="text-sm text-muted-foreground">Manage partner registration applications</div>
        </div>
        <button
          type="button"
          onClick={() => void loadApplications()}
          disabled={loading}
          className="rounded-2xl border border-input bg-background/60 px-4 py-2 text-xs font-semibold transition hover:bg-background disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-6">
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-background/50 p-8 text-center">
            <div className="text-sm text-muted-foreground">
              {error ? "Unable to load applications" : "No partner applications found"}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Preferred Loan</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Change status</th>
                  <th className="px-4 py-3">Applied</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const id = getId(app);
                  const status = normalizeStatus(app.status);
                  return (
                    <tr key={id || app.fullName} className="border-b border-border/30 hover:bg-background/50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/partner-applications/${id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {app.fullName}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{app.email}</td>
                      <td className="px-4 py-3">{app.mobileNumber}</td>
                      <td className="px-4 py-3">{app.city}</td>
                      <td className="px-4 py-3">{app.preferredLoan}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(status)}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex min-w-[9rem] flex-col gap-1">
                          <select
                            className="w-full rounded-2xl border border-input bg-background/60 px-3 py-2 text-xs font-semibold outline-none transition focus:border-primary/50 focus:bg-background"
                            value={rowStatus[id] || status}
                            disabled={!id || !!rowSaving[id]}
                            onChange={(ev) =>
                              handleStatusChange(id, ev.target.value as PartnerStatus)
                            }
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {rowSaving[id] ? (
                            <span className="text-[10px] text-muted-foreground">Saving…</span>
                          ) : savedFlash[id] ? (
                            <span className="text-[10px] font-semibold text-[#16A34A]">Saved</span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/partner-applications/${id}`}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
