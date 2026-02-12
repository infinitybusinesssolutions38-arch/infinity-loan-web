"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function AdminSalaryLoanApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [item, setItem] = useState<any>(null);
  const [status, setStatus] = useState<string>("Pending");
  const [adminRemarks, setAdminRemarks] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/loan-applications/${id}`, { credentials: "include" });
        const data = await res.json().catch(() => ({}));

        if (!mounted) return;

        if (res.ok && data?.success) {
          // Only show if it's a personal/salaried loan application
          if (data.data._type !== "personal") {
            setError("Application not found or not a salary employee loan");
            return;
          }
          setItem(data.data);
          setStatus(data.data.status || "Pending");
          setAdminRemarks(data.data.adminRemarks || "");
        } else {
          setError(data?.message || "Failed to load application");
        }
      } catch {
        if (mounted) setError("Failed to load application");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const save = async () => {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/loan-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status, adminRemarks }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to update");
        return;
      }

      setItem(data.data);
    } catch {
      setError("Failed to update");
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
        <div className="text-sm font-semibold">Application not found</div>
        {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
        <div className="mt-6">
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/salary-loan-applications">
            Back
          </Link>
        </div>
      </div>
    );
  }

  const name = `${item.firstname || ""} ${item.lastname || ""}`.trim();
  const email = item.personalEmail || item.email || "-";
  const mobile = item.mobileNumber || item.mobile || "-";

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Application</div>
          <div className="mt-2 text-xl font-bold tracking-tight">Salary Employee Loan Application</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Ref: {item.applicationRef || "-"}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <select
            className="rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={save}
            disabled={saving}
            className="rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Employee Name</div>
          <div className="mt-1 text-sm font-semibold">{name}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Email</div>
          <div className="mt-1 text-sm font-semibold">{email}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Mobile</div>
          <div className="mt-1 text-sm font-semibold">{mobile}</div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="mt-1 text-sm font-semibold">{item.status || "Pending"}</div>
        </div>
        {item.loanAmount && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Loan Amount</div>
            <div className="mt-1 text-sm font-semibold">{item.loanAmount}</div>
          </div>
        )}
        {item.loanPurpose && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Loan Purpose</div>
            <div className="mt-1 text-sm font-semibold">{item.loanPurpose}</div>
          </div>
        )}
        {item.aadhaarNumber && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Aadhaar Number</div>
            <div className="mt-1 text-sm font-semibold">{item.aadhaarNumber}</div>
          </div>
        )}
        {item.panNumber && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">PAN Number</div>
            <div className="mt-1 text-sm font-semibold">{item.panNumber}</div>
          </div>
        )}
        {item.currentResidentialAddress && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Residential Address</div>
            <div className="mt-1 text-sm font-semibold">{item.currentResidentialAddress}</div>
          </div>
        )}
        {item.gender && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Gender</div>
            <div className="mt-1 text-sm font-semibold">{item.gender}</div>
          </div>
        )}
        {item.maritalStatus && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Marital Status</div>
            <div className="mt-1 text-sm font-semibold">{item.maritalStatus}</div>
          </div>
        )}
        {item.dob && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Date of Birth</div>
            <div className="mt-1 text-sm font-semibold">{item.dob}</div>
          </div>
        )}
        {item.serviceCategoryTitle && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Service Category</div>
            <div className="mt-1 text-sm font-semibold">{item.serviceCategoryTitle}</div>
          </div>
        )}
        {item.createdAt && (
          <div className="rounded-3xl border border-border/70 bg-background/50 p-5">
            <div className="text-xs text-muted-foreground">Application Date</div>
            <div className="mt-1 text-sm font-semibold">{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-3xl border border-border/70 bg-background/50 p-5">
        <div className="text-xs text-muted-foreground">Admin Remarks</div>
        <textarea
          className="mt-3 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
          rows={4}
          value={adminRemarks}
          onChange={(e) => setAdminRemarks(e.target.value)}
          placeholder="Add remarks..."
        />
      </div>

      <div className="mt-4 rounded-3xl border border-border/70 bg-background/50 p-5">
        <div className="text-xs text-muted-foreground">Complete Application Details</div>
        <pre className="mt-3 max-h-[420px] overflow-auto rounded-2xl bg-secondary/40 p-4 text-xs">
          {JSON.stringify(item, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/salary-loan-applications">
          Back to salary loan applications
        </Link>
      </div>
    </div>
  );
}
