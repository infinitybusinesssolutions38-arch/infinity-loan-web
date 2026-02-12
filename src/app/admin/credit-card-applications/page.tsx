"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreditCardApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/credit-card-applications", { credentials: "include" });
        const data = await res.json().catch(() => ({}));

        if (!mounted) return;

        if (res.ok && data?.success) {
          setApplications(data.data || []);
        } else {
          setError(data?.message || "Failed to load applications");
        }
      } catch {
        if (mounted) setError("Failed to load applications");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading credit card applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold text-destructive">Error</div>
        <div className="mt-2 text-sm text-muted-foreground">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Credit Card Applications</div>
        <div className="text-sm text-muted-foreground">Manage and review credit card applications</div>
        <div className="text-xs text-muted-foreground">Total applications found: {applications.length}</div>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="text-sm text-muted-foreground">No credit card applications found</div>
          <div className="mt-2 text-xs text-muted-foreground">
            This could mean:
            <ul className="mt-1 list-disc list-inside">
              <li>No credit card applications have been submitted yet</li>
              <li>The database collection might be empty</li>
              <li>There could be an API connection issue</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link 
              href="/admin/dashboard" 
              className="text-sm font-semibold text-primary hover:underline"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Application ID</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Card Type</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-b border-border/30 hover:bg-background/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{app.applicationRef || app._id.slice(-8)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{`${app.firstname || ""} ${app.lastname || ""}`.trim() || "-"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-muted-foreground">{app.email || "-"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-muted-foreground">{app.mobileNumber || "-"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-muted-foreground">{app.cardType || "-"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        app.status === "Approved" 
                          ? "bg-green-100 text-green-800"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {app.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-muted-foreground">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/credit-card-applications/${app._id}`}
                        className="text-primary hover:underline"
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
