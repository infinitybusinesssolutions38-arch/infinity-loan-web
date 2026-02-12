"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PartnerApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/partner-applications", { credentials: "include" });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data?.success) {
          setApplications(data.data);
        } else {
          setError(data?.message || "Failed to load partner applications");
        }
      } catch {
        setError("Failed to load partner applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading partner applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold tracking-tight">Loan Partner Applications</div>
        <div className="text-sm text-muted-foreground">Manage partner registration applications</div>
      </div>

      <div className="mt-6">
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-background/50 p-8 text-center">
            <div className="text-sm text-muted-foreground">No partner applications found</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Mobile</th>
                  <th className="px-4 py-3 text-left font-medium">City</th>
                  <th className="px-4 py-3 text-left font-medium">Preferred Loan</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Applied</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id} className="border-b border-border/30 hover:bg-background/50">
                    <td className="px-4 py-3">
                      <Link 
                        href={`/admin/partner-applications/${app._id}`}
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
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        app.status === "New" ? "bg-blue-50 text-blue-700" :
                        app.status === "Contacted" ? "bg-yellow-50 text-yellow-700" :
                        app.status === "Approved" ? "bg-green-50 text-green-700" :
                        app.status === "Rejected" ? "bg-red-50 text-red-700" :
                        "bg-purple-50 text-purple-700"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/partner-applications/${app._id}`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
