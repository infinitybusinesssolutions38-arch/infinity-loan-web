"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminCategoryBanner from "@/components/admin/AdminCategoryBanner";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";

type CreditCardApp = {
  _id: string;
  applicationRef?: string;
  firstname?: string;
  lastname?: string;
  personalEmail?: string;
  mobileNumber?: string;
  cardType?: string;
  status?: string;
  createdAt?: string;
};

const LIST_TYPE = "credit-cards";

export default function CreditCardApplicationsPage() {
  const [applications, setApplications] = useState<CreditCardApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rowStatus, setRowStatus] = useState<Record<string, string>>({});
  const [rowSaving, setRowSaving] = useState<Record<string, boolean>>({});
  const [savedFlash, setSavedFlash] = useState<Record<string, boolean>>({});

  const loadApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/credit-card-applications", {
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        const apps = Array.isArray(data.data) ? data.data : [];
        setApplications(apps);
        const next: Record<string, string> = {};
        for (const app of apps) {
          if (app?._id) next[String(app._id)] = app.status || "Pending";
        }
        setRowStatus(next);
      } else {
        setError(data?.message || "Failed to load applications");
        setApplications([]);
      }
    } catch {
      setError("Failed to load applications");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApplications();
  }, []);

  const updateStatus = async (id: string, nextStatus: string) => {
    setRowSaving((m) => ({ ...m, [id]: true }));
    setError(null);

    try {
      const res = await fetch(`/api/admin/credit-card-applications/${id}`, {
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

      const savedStatus = data.data?.status || nextStatus;
      setApplications((prev) =>
        prev.map((x) => (String(x._id) === id ? { ...x, status: savedStatus } : x))
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

  const handleStatusChange = (id: string, value: string) => {
    setRowStatus((m) => ({ ...m, [id]: value }));
    void updateStatus(id, value);
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading credit card applications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Credit Card Applications</div>
        <div className="text-sm text-muted-foreground">
          Manage and review credit card applications (category: credit-cards)
        </div>
        <div className="text-xs text-muted-foreground">
          Total applications: {applications.length}
        </div>
      </div>

      <AdminCategoryBanner
        title="Credit card applications only"
        categoryKey={LIST_TYPE}
      />

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {applications.length === 0 ? (
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="text-sm text-muted-foreground">No credit card applications found</div>
        </div>
      ) : (
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Application ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Card Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Approve / Reject</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-b border-border/30 hover:bg-background/50">
                    <td className="px-4 py-3 font-medium">
                      {app.applicationRef || app._id.slice(-8)}
                    </td>
                    <td className="px-4 py-3">
                      {`${app.firstname || ""} ${app.lastname || ""}`.trim() || "-"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {app.personalEmail || "-"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{app.mobileNumber || "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.cardType || "-"}</td>
                    <td className="px-4 py-3">
                      <AdminStatusBadge status={rowStatus[String(app._id)] || app.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <select
                          className="rounded-xl border border-input bg-background px-2 py-1.5 text-xs font-semibold"
                          value={rowStatus[String(app._id)] || app.status || "Pending"}
                          disabled={!!rowSaving[String(app._id)]}
                          onChange={(e) =>
                            handleStatusChange(String(app._id), e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        {rowSaving[String(app._id)] ? (
                          <span className="text-[10px] text-muted-foreground">Saving…</span>
                        ) : savedFlash[String(app._id)] ? (
                          <span className="text-[10px] font-semibold text-[#16A34A]">
                            Saved to database
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/credit-card-applications/${app._id}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
