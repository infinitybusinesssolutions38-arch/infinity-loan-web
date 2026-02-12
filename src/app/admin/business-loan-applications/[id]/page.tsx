"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function AdminBusinessLoanApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
          // Only show if it's a business loan application
          if (data.data._type !== "business") {
            setError("Application not found or not a business loan");
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
          <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/business-loan-applications">
            Back
          </Link>
        </div>
      </div>
    );
  }

  const businessName = item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.fullName || item.businessName || "-";
  const email = item.personalEmail || item.email || "-";
  const mobile = item.mobileNumber || item.mobile || "-";

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Application</div>
          <div className="mt-2 text-xl font-bold tracking-tight">Business Loan Application</div>
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

      {/* Debug Section - Check Available Fields */}
      <div className="mt-4 rounded-2xl border border-blue-300 bg-blue-50 p-4">
        <div className="text-xs text-blue-600 font-semibold">Debug Info - Available Fields:</div>
        <div className="mt-2 text-xs max-h-40 overflow-y-auto">
          <div><strong>First Name:</strong> {item.firstname || "NULL"}</div>
          <div><strong>Last Name:</strong> {item.lastname || "NULL"}</div>
          <div><strong>Middle Name:</strong> {item.middleName || "NULL"}</div>
          <div><strong>Business Name:</strong> {item.businessName || "NULL"}</div>
          <div><strong>Service Category:</strong> {item.serviceCategoryTitle || "NULL"}</div>
          <div><strong>Loan Amount:</strong> {item.loanAmount || "NULL"}</div>
          <div><strong>Required Loan Amount:</strong> {item.requiredLoanAmount || "NULL"}</div>
          <div><strong>All Keys:</strong> {Object.keys(item).join(", ")}</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* A. Applicant Basic Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">A. Applicant Basic Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Business Name</div>
              <div className="mt-1 text-sm font-semibold">{businessName}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="mt-1 text-sm font-semibold">{email}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Mobile</div>
              <div className="mt-1 text-sm font-semibold">{mobile}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Alternate Mobile</div>
              <div className="mt-1 text-sm font-semibold">{item.alternateMobile || item.alternateMobileNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">WhatsApp Number</div>
              <div className="mt-1 text-sm font-semibold">{item.whatsAppNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Business Email</div>
              <div className="mt-1 text-sm font-semibold">{item.businessEmail || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Gender</div>
              <div className="mt-1 text-sm font-semibold">{item.gender || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Marital Status</div>
              <div className="mt-1 text-sm font-semibold">{item.maritalStatus || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Date of Birth</div>
              <div className="mt-1 text-sm font-semibold">{item.dob || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Application Ref</div>
              <div className="mt-1 text-sm font-semibold">{item.applicationRef || "-"}</div>
            </div>
          </div>
        </div>

        {/* B. Residential Address Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">B. Residential Address Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Current Residential Address</div>
              <div className="mt-1 text-sm font-semibold">{item.currentResidentialAddress || "-"}</div>
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
              <div className="text-xs text-muted-foreground">Residential Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.currentResidentialPincode || "-"}</div>
            </div>
          </div>
        </div>

        {/* C. Office/Shop Address Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">C. Office/Shop Address Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Current Office/Shop Address</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficeOrShopAddress || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office/Shop State</div>
              <div className="mt-1 text-sm font-semibold">{item.officeOrShopState || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office/Shop City</div>
              <div className="mt-1 text-sm font-semibold">{item.officeOrShopCity || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office/Shop Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.officeOrShopPincode || "-"}</div>
            </div>
          </div>
        </div>

        {/* D. Identity Documents */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">D. Identity Documents</h3>
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
              <div className="text-xs text-muted-foreground">Voter ID</div>
              <div className="mt-1 text-sm font-semibold">{item.voterId || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Driving License</div>
              <div className="mt-1 text-sm font-semibold">{item.drivingLicense || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Passport Number</div>
              <div className="mt-1 text-sm font-semibold">{item.passportNo || "-"}</div>
            </div>
          </div>
        </div>

        {/* D. Loan Requirement Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">D. Loan Requirement Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Service Category</div>
              <div className="mt-1 text-sm font-semibold">{item.serviceCategoryTitle || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Required Loan Amount</div>
              <div className="mt-1 text-sm font-semibold">{item.requiredLoanAmount || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Type of Loan</div>
              <div className="mt-1 text-sm font-semibold">{item.typeOfLoan || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Purpose</div>
              <div className="mt-1 text-sm font-semibold">{item.purpose || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Preferred Tenure</div>
              <div className="mt-1 text-sm font-semibold">{item.preferredTenure || "-"}</div>
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

        {/* E. ID Proof Documents */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">E. ID Proof Documents</h3>
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
              <div className="text-xs text-muted-foreground">Voter ID</div>
              <div className="mt-1 text-sm font-semibold">{item.voterId || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Driving License</div>
              <div className="mt-1 text-sm font-semibold">{item.drivingLicense || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Passport Number</div>
              <div className="mt-1 text-sm font-semibold">{item.passportNo || "-"}</div>
            </div>
            {item.applicantPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Applicant Photo</div>
                <div className="mt-2">
                  <a 
                    href={item.applicantPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Photo
                  </a>
                </div>
              </div>
            )}
            {item.panPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">PAN Card Photo</div>
                <div className="mt-2">
                  <a 
                    href={item.panPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View PAN
                  </a>
                </div>
              </div>
            )}
            {item.aadhaarPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Aadhaar Card Front</div>
                <div className="mt-2">
                  <a 
                    href={item.aadhaarPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Aadhaar
                  </a>
                </div>
              </div>
            )}
            {item.aadhaarBackPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Aadhaar Card Back</div>
                <div className="mt-2">
                  <a 
                    href={item.aadhaarBackPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Back
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* F. Co-Applicant Details (If Any) */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">F. Co-Applicant Details (If Any)</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Co-Applicant Name</div>
              <div className="mt-1 text-sm font-semibold">{item.coApplicantName || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Relationship with Applicant</div>
              <div className="mt-1 text-sm font-semibold">{item.relationshipWithApplicant || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Co-Applicant Employment Type</div>
              <div className="mt-1 text-sm font-semibold">{item.coApplicantEmploymentType || "-"}</div>
            </div>
            {item.coApplicantPanPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Co-Applicant PAN Photo</div>
                <div className="mt-2">
                  <a 
                    href={item.coApplicantPanPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View PAN
                  </a>
                </div>
              </div>
            )}
            {item.coApplicantAadhaarPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Co-Applicant Aadhaar Front</div>
                <div className="mt-2">
                  <a 
                    href={item.coApplicantAadhaarPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Aadhaar
                  </a>
                </div>
              </div>
            )}
            {item.coApplicantAadhaarBackPhotoUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Co-Applicant Aadhaar Back</div>
                <div className="mt-2">
                  <a 
                    href={item.coApplicantAadhaarBackPhotoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Back
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* G. Address Proof Documents */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">G. Address Proof Documents</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {item.latestHomeElectricityBillUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Home Electricity Bill</div>
                <div className="mt-2">
                  <a 
                    href={item.latestHomeElectricityBillUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Bill
                  </a>
                </div>
              </div>
            )}
            {item.latestOfficeShopElectricityBillUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Office/Shop Electricity Bill</div>
                <div className="mt-2">
                  <a 
                    href={item.latestOfficeShopElectricityBillUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Bill
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* H. Bank Statement */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">H. Bank Statement</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {item.oneYearBankStatementUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">One Year Bank Statement</div>
                <div className="mt-2">
                  <a 
                    href={item.oneYearBankStatementUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Statement
                  </a>
                </div>
              </div>
            )}
            {item.bankStatementUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Bank Statement</div>
                <div className="mt-2">
                  <a 
                    href={item.bankStatementUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Statement
                  </a>
                </div>
              </div>
            )}
            {item.bankAccounts && item.bankAccounts.map((account: any, index: number) => (
              <div key={index} className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">{account.bankName} - {account.accountType}</div>
                <div className="mt-2">
                  {account.oneYearBankStatementUrl && (
                    <a 
                      href={account.oneYearBankStatementUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Statement
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* I. Existing Loan Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">I. Existing Loan Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Number of Existing Loans</div>
              <div className="mt-1 text-sm font-semibold">{item.numberOfExistingLoans || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">CIBIL Issues Details</div>
              <div className="mt-1 text-sm font-semibold">{item.cibilIssuesDetails || "-"}</div>
            </div>
          </div>
        </div>

        {/* J. Income Tax Returns */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">J. Income Tax Returns</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {item.itrFileUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">ITR File</div>
                <div className="mt-2">
                  <a 
                    href={item.itrFileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View ITR
                  </a>
                </div>
              </div>
            )}
            {item.assessmentYear2324Url && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Assessment Year 2023-24</div>
                <div className="mt-2">
                  <a 
                    href={item.assessmentYear2324Url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View ITR
                  </a>
                </div>
              </div>
            )}
            {item.assessmentYear2425Url && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Assessment Year 2024-25</div>
                <div className="mt-2">
                  <a 
                    href={item.assessmentYear2425Url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View ITR
                  </a>
                </div>
              </div>
            )}
            {item.assessmentYear2526Url && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Assessment Year 2025-26</div>
                <div className="mt-2">
                  <a 
                    href={item.assessmentYear2526Url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View ITR
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* K. Business Registration Certificates */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">K. Business Registration Certificates</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Business Registration Type</div>
              <div className="mt-1 text-sm font-semibold">{item.businessRegistrationCertificates || "-"}</div>
            </div>
            {item.gstCertificateUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">GST Certificate</div>
                <div className="mt-2">
                  <a 
                    href={item.gstCertificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Certificate
                  </a>
                </div>
              </div>
            )}
            {item.registrationCertificates && item.registrationCertificates.map((cert: any, index: number) => (
              <div key={index} className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">{cert.certificateType}</div>
                <div className="mt-2">
                  {cert.fileUrl && (
                    <a 
                      href={cert.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* L. Buying Goods */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">L. Buying Goods</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Is Buying Goods</div>
              <div className="mt-1 text-sm font-semibold">{item.isBuyingGoods || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Quotation Amount</div>
              <div className="mt-1 text-sm font-semibold">{item.quotationAmount || "-"}</div>
            </div>
            {item.proformaInvoiceFileUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">Proforma Invoice</div>
                <div className="mt-2">
                  <a 
                    href={item.proformaInvoiceFileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Invoice
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* M. CIBIL Score */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">M. CIBIL Score</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Has CIBIL</div>
              <div className="mt-1 text-sm font-semibold">{item.hasCibil || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">CIBIL Score</div>
              <div className="mt-1 text-sm font-semibold">{item.cibilScore || "-"}</div>
            </div>
            {item.cibilReportUrl && (
              <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                <div className="text-xs text-muted-foreground">CIBIL Report</div>
                <div className="mt-2">
                  <a 
                    href={item.cibilReportUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Report
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">N. Upload Other Supported Documents</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Document Uploads</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {item.documents && item.documents.length > 0
                  ? `${item.documents.length} document(s) uploaded`
                  : "No documents uploaded"
                }
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Complete Application Data</div>
              <button
                onClick={() => console.log("Show complete data:", item)}
                className="mt-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg hover:bg-primary/20 transition"
              >
                View Complete Data
              </button>
            </div>
            {item.documents && item.documents.length > 0 && (
              <div className="col-span-2 space-y-3">
                <h4 className="text-sm font-semibold text-primary">Uploaded Documents:</h4>
                {item.documents.map((doc: any, index: number) => (
                  <div key={index} className="rounded-2xl border border-border/50 bg-background/50 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Document {index + 1}</div>
                        <div className="mt-1">
                          <div className="text-sm font-semibold">{doc.name || doc.fileName || doc.originalName || "Unknown"}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Type: {doc.type || doc.mimeType || doc.documentType || "Unknown"}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Size: {doc.size ? `${(doc.size / 1024).toFixed(2)} KB` : "Unknown"}
                          </div>
                          {doc.uploadedAt && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        {doc.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View
                          </a>
                        )}
                        {doc.secureUrl && (
                          <a
                            href={doc.secureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition ml-2"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-border/70 bg-background/50 p-5">
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
        <div className="text-xs text-muted-foreground">Complete Application Details (JSON)</div>
        <pre className="mt-3 max-h-[420px] overflow-auto rounded-2xl bg-secondary/40 p-4 text-xs">
          {JSON.stringify(item, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/business-loan-applications">
          Back to business loan applications
        </Link>
      </div>
    </div>
  );
}
