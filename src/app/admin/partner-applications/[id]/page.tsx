"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function AdminPartnerApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [item, setItem] = useState<any>(null);
  const [status, setStatus] = useState<string>("New");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        console.log("Fetching partner application with ID:", id);
        
        const res = await fetch(`/api/admin/partner-applications/${id}`, { credentials: "include" });
        console.log("API Response status:", res.status);
        
        const data = await res.json().catch(() => ({}));
        console.log("API Response data:", data);

        if (!mounted) return;

        if (res.ok && data?.success) {
          console.log("Application found:", data.data);
          setItem(data.data);
          setStatus(data.data.status || "New");
          setNotes(data.data.notes || "");
        } else {
          console.log("API Error:", data?.message);
          setError(data?.message || "Failed to load application");
          
          // Try to get basic info from the list API as fallback
          try {
            const listRes = await fetch("/api/admin/partner-applications", { credentials: "include" });
            const listData = await listRes.json().catch(() => ({}));
            
            if (listRes.ok && listData?.success) {
              const app = listData.data.find((app: any) => app._id === id);
              if (app) {
                console.log("Found application in list:", app);
                setItem(app);
                setStatus(app.status || "New");
                setNotes(app.notes || "");
                setError(null);
              }
            }
          } catch (fallbackError) {
            console.log("Fallback failed:", fallbackError);
          }
        }
      } catch (error) {
        console.error("Request error:", error);
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
      const res = await fetch(`/api/admin/partner-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status, notes }),
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
        <div className="text-sm text-muted-foreground">Loading partner application...</div>
        <div className="mt-2 text-xs text-muted-foreground">Application ID: {id}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold">Partner application not found</div>
        <div className="mt-2 text-xs text-muted-foreground">Application ID: {id}</div>
        {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
        
        {/* Basic info fallback */}
        <div className="mt-4 p-4 border border-border/50 rounded-lg bg-background/50">
          <div className="text-xs font-medium text-muted-foreground mb-2">Basic Information (if available)</div>
          <div className="space-y-2 text-sm">
            <div><strong>ID:</strong> {id}</div>
            <div><strong>Status:</strong> {status || "Unknown"}</div>
            {error && <div className="text-xs text-muted-foreground mt-2">Note: {error}</div>}
          </div>
        </div>
        
        <div className="mt-4">
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/partner-applications">
            Back to partner applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Partner Application</div>
          <div className="mt-2 text-xl font-bold tracking-tight">{item.fullName}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Applied: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <select
            className="rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Onboarded">Onboarded</option>
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

      <div className="mt-6 space-y-6">
        {/* Personal Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Full Name</div>
              <div className="mt-1 text-sm font-semibold">{item.fullName || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="mt-1 text-sm font-semibold">{item.email || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Mobile Number</div>
              <div className="mt-1 text-sm font-semibold">{item.mobileNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Alternate Mobile</div>
              <div className="mt-1 text-sm font-semibold">{item.altMobileNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">WhatsApp Number</div>
              <div className="mt-1 text-sm font-semibold">{item.whatsappNumber || "-"}</div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Address Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">State</div>
              <div className="mt-1 text-sm font-semibold">{item.state || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">City</div>
              <div className="mt-1 text-sm font-semibold">{item.city || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.pincode || "-"}</div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Professional Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Preferred Loan Type</div>
              <div className="mt-1 text-sm font-semibold">{item.preferredLoan || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Experience</div>
              <div className="mt-1 text-sm font-semibold">{item.experience || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Preferred Category</div>
              <div className="mt-1 text-sm font-semibold">{item.preferredCategory || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Current Status</div>
              <div className="mt-1 text-sm font-semibold">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  item.status === "New" ? "bg-blue-50 text-blue-700" :
                  item.status === "Contacted" ? "bg-yellow-50 text-yellow-700" :
                  item.status === "Approved" ? "bg-green-50 text-green-700" :
                  item.status === "Rejected" ? "bg-red-50 text-red-700" :
                  "bg-purple-50 text-purple-700"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Document Uploads */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Document Uploads</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {item.aadhaarFrontUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Aadhaar Card Front</div>
                <div className="mt-2">
                  <a 
                    href={item.aadhaarFrontUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Document
                  </a>
                </div>
              </div>
            )}
            {item.aadhaarBackUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Aadhaar Card Back</div>
                <div className="mt-2">
                  <a 
                    href={item.aadhaarBackUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Document
                  </a>
                </div>
              </div>
            )}
            {item.panFrontUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">PAN Card</div>
                <div className="mt-2">
                  <a 
                    href={item.panFrontUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Document
                  </a>
                </div>
              </div>
            )}
            {item.bankPassbookUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Bank Passbook</div>
                <div className="mt-2">
                  <a 
                    href={item.bankPassbookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Document
                  </a>
                </div>
              </div>
            )}
            {item.passportPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Passport Photo</div>
                <div className="mt-2">
                  <a 
                    href={item.passportPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Document
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Admin Notes */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Admin Notes</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Notes</label>
              <textarea
                className="mt-1 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes about this partner application..."
              />
            </div>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Notes"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/partner-applications">
          Back to partner applications
        </Link>
      </div>
    </div>
  );
}
