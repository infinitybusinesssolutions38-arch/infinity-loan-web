"use client";

import { useEffect, useState, use } from "react";
import AdminApplicationDetailView, {
  type AdminLoanDetail,
} from "@/components/admin/AdminApplicationDetailView";

export default function AdminCreditCardApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [detail, setDetail] = useState<AdminLoanDetail | null>(null);
  const [status, setStatus] = useState("Pending");
  const [adminRemarks, setAdminRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/credit-card-applications/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;

        if (res.ok && data?.success) {
          setDetail(data.detail || null);
          setStatus(data.data?.status || "Pending");
          setAdminRemarks(data.data?.adminRemarks || "");
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
      const res = await fetch(`/api/admin/credit-card-applications/${id}`, {
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
      setDetail(data.detail || null);
      setStatus(data.data?.status || status);
      setAdminRemarks(data.data?.adminRemarks || adminRemarks);
    } catch {
      setError("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm text-muted-foreground">Loading application details...</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold">Application not found</div>
        {error ? <div className="mt-2 text-sm text-destructive">{error}</div> : null}
      </div>
    );
  }

  return (
    <AdminApplicationDetailView
      loan={detail}
      backHref="/admin/credit-card-applications"
      backLabel="Back to credit card applications"
      status={status}
      adminRemarks={adminRemarks}
      saving={saving}
      error={error}
      onStatusChange={setStatus}
      onAdminRemarksChange={setAdminRemarks}
      onSave={() => void save()}
    />
  );
}
