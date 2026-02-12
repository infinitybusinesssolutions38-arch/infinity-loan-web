"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function AdminCreditCardApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
        console.log("Fetching credit card application with ID:", id);
        
        const res = await fetch(`/api/admin/credit-card-applications/${id}`, { credentials: "include" });
        console.log("API Response status:", res.status);
        
        const data = await res.json().catch(() => ({}));
        console.log("API Response data:", data);

        if (!mounted) return;

        if (res.ok && data?.success) {
          console.log("Application found:", data.data);
          setItem(data.data);
          setStatus(data.data.status || "Pending");
          setAdminRemarks(data.data.adminRemarks || "");
        } else {
          console.log("API Error:", data?.message);
          setError(data?.message || "Failed to load application");
          
          // Try to get basic info from the list API as fallback
          try {
            const listRes = await fetch("/api/admin/credit-card-applications", { credentials: "include" });
            const listData = await listRes.json().catch(() => ({}));
            
            if (listRes.ok && listData?.success) {
              const app = listData.data.find((app: any) => app._id === id);
              if (app) {
                console.log("Found application in list:", app);
                setItem(app);
                setStatus(app.status || "Pending");
                setAdminRemarks(app.adminRemarks || "");
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
        <div className="text-sm text-muted-foreground">Loading credit card application...</div>
        <div className="mt-2 text-xs text-muted-foreground">Application ID: {id}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold">Application not found</div>
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
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/credit-card-applications">
            Back to credit card applications
          </Link>
        </div>
      </div>
    );
  }

  const name = `${item.firstname || ""} ${item.lastname || ""}`.trim();
  const email = item.email || "-";
  const mobile = item.mobileNumber || "-";

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Application</div>
          <div className="mt-2 text-xl font-bold tracking-tight">Credit Card Application</div>
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

      <div className="mt-6 space-y-6">
        {/* Personal Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">First Name</div>
              <div className="mt-1 text-sm font-semibold">{item.firstname || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Middle Name</div>
              <div className="mt-1 text-sm font-semibold">{item.middleName || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Last Name</div>
              <div className="mt-1 text-sm font-semibold">{item.lastname || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Mobile Number</div>
              <div className="mt-1 text-sm font-semibold">{item.mobileNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Alternate Mobile</div>
              <div className="mt-1 text-sm font-semibold">{item.alternateMobile || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">WhatsApp Number</div>
              <div className="mt-1 text-sm font-semibold">{item.whatsappNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Personal Email</div>
              <div className="mt-1 text-sm font-semibold">{item.personalEmail || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Official Email</div>
              <div className="mt-1 text-sm font-semibold">{item.officialEmail || "-"}</div>
            </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Identity Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Aadhaar Number</div>
              <div className="mt-1 text-sm font-semibold">{item.aadhaarNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">PAN Number</div>
              <div className="mt-1 text-sm font-semibold">{item.panNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Voter ID Number</div>
              <div className="mt-1 text-sm font-semibold">{item.voterIdNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Driving License</div>
              <div className="mt-1 text-sm font-semibold">{item.drivingLicense || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Passport Number</div>
              <div className="mt-1 text-sm font-semibold">{item.passportNumber || "-"}</div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Address Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Current Residential Address</div>
              <div className="mt-1 text-sm font-semibold">{item.currentResidentialAddress || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Residential Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.currentResidentialPincode || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Residential State</div>
              <div className="mt-1 text-sm font-semibold">{item.residentialState || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Residential City</div>
              <div className="mt-1 text-sm font-semibold">{item.residentialCity || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Current Office Address</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficeAddress || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficePincode || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Residential Status</div>
              <div className="mt-1 text-sm font-semibold">{item.residentialStatus || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Business Premises Status</div>
              <div className="mt-1 text-sm font-semibold">{item.businessPremisesStatus || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Years at Current Residential Address</div>
              <div className="mt-1 text-sm font-semibold">{item.yearsAtCurrentResidentialAddress || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Years at Current Business Address</div>
              <div className="mt-1 text-sm font-semibold">{item.yearsAtCurrentBusinessAddress || "-"}</div>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Employment Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Job/Business</div>
              <div className="mt-1 text-sm font-semibold">{item.jobBusiness || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office Address</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficeAddress || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficePincode || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Business Premises Status</div>
              <div className="mt-1 text-sm font-semibold">{item.businessPremisesStatus || "-"}</div>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Loan Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Bank Name</div>
              <div className="mt-1 text-sm font-semibold">{item.bankName || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Limit Amount</div>
              <div className="mt-1 text-sm font-semibold">{item.limitAmount || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Card Type</div>
              <div className="mt-1 text-sm font-semibold">{item.cardType || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Application Reference</div>
              <div className="mt-1 text-sm font-semibold">{item.applicationRef || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Status</div>
              <div className="mt-1 text-sm font-semibold">{item.status || "Pending"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Application Date</div>
              <div className="mt-1 text-sm font-semibold">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}</div>
            </div>
          </div>
        </div>

        {/* Email Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Email Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Personal Email</div>
              <div className="mt-1 text-sm font-semibold">{item.personalEmail || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Official Email</div>
              <div className="mt-1 text-sm font-semibold">{item.officialEmail || "-"}</div>
            </div>
          </div>
        </div>

        {/* Document Uploads */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Document Uploads</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {item.aadhaarFront && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Aadhaar Card Front</div>
                <div className="mt-2">
                  <a 
                    href={item.aadhaarFront} 
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
            {item.aadhaarBack && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Aadhaar Card Back</div>
                <div className="mt-2">
                  <a 
                    href={item.aadhaarBack} 
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
            {item.panFront && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">PAN Card</div>
                <div className="mt-2">
                  <a 
                    href={item.panFront} 
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
            {item.residentialBill && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Residential Bill</div>
                <div className="mt-2">
                  <a 
                    href={item.residentialBill} 
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
            {item.shopBill && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Shop Bill</div>
                <div className="mt-2">
                  <a 
                    href={item.shopBill} 
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
            {item.uploadRentAgreementOfficeShop && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Rent Agreement Office/Shop</div>
                <div className="mt-2">
                  <a 
                    href={item.uploadRentAgreementOfficeShop} 
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

        {/* CIBIL Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">CIBIL Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">CIBIL Score Known</div>
              <div className="mt-1 text-sm font-semibold">{item.cibilScoreKnown || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">CIBIL Score</div>
              <div className="mt-1 text-sm font-semibold">{item.cibilScore || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">CIBIL Issues</div>
              <div className="mt-1 text-sm font-semibold">{item.cibilIssues || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Consent Given</div>
              <div className="mt-1 text-sm font-semibold">{item.consent ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>

        {/* Admin Remarks */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">Admin Remarks</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Admin Remarks</label>
              <textarea
                className="mt-1 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
                rows={4}
                value={adminRemarks}
                onChange={(e) => setAdminRemarks(e.target.value)}
                placeholder="Add your remarks about this application..."
              />
            </div>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Remarks"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/credit-card-applications">
          Back to credit card applications
        </Link>
      </div>
    </div>
  );
}
