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
          // Show all types for salary employee loans
          if (data.data._type === "business") {
            setError("This is a business loan application. Please check business loan applications.");
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

      <div className="mt-6 space-y-6">
        {/* A. Applicant Basic Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">A. Applicant Basic Details</h3>
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

        {/* B. Applicant Contact Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">B. Applicant Contact Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Personal Email</div>
              <div className="mt-1 text-sm font-semibold">{item.personalEmail || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Official Email</div>
              <div className="mt-1 text-sm font-semibold">{item.officialEmail || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Mobile Number</div>
              <div className="mt-1 text-sm font-semibold">{item.mobileNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Alternate Mobile</div>
              <div className="mt-1 text-sm font-semibold">{item.alternateMobile || "-"}</div>
            </div>
          </div>
        </div>

        {/* C. Residential Address Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">C. Residential Address Details</h3>
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

        {/* D. Office Address Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">D. Office Address Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Current Office Address</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficeAddress || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office State</div>
              <div className="mt-1 text-sm font-semibold">{item.officeState || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office City</div>
              <div className="mt-1 text-sm font-semibold">{item.officeCity || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Office Pincode</div>
              <div className="mt-1 text-sm font-semibold">{item.currentOfficePincode || "-"}</div>
            </div>
          </div>
        </div>

        {/* E. Identity Documents */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">E. Identity Documents</h3>
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

        {/* F. Document Uploads */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">F. Document Uploads</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

        {/* G. Employment Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">G. Employment Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Employment Type</div>
              <div className="mt-1 text-sm font-semibold">{item.employmentType || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Company Name</div>
              <div className="mt-1 text-sm font-semibold">{item.companyName || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Work Experience</div>
              <div className="mt-1 text-sm font-semibold">{item.workExperience || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Monthly Salary</div>
              <div className="mt-1 text-sm font-semibold">{item.monthlySalary || "-"}</div>
            </div>
          </div>
        </div>

        {/* H. Bank Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">H. Bank Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Bank Name</div>
              <div className="mt-1 text-sm font-semibold">{item.bankName || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Account Number</div>
              <div className="mt-1 text-sm font-semibold">{item.accountNumber || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">IFSC Code</div>
              <div className="mt-1 text-sm font-semibold">{item.ifscCode || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Branch Name</div>
              <div className="mt-1 text-sm font-semibold">{item.branchName || "-"}</div>
            </div>
          </div>
        </div>

        {/* I. Loan Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">I. Loan Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Service Category</div>
              <div className="mt-1 text-sm font-semibold">{item.serviceCategoryTitle || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Loan Amount</div>
              <div className="mt-1 text-sm font-semibold">{item.loanAmount || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Loan Purpose</div>
              <div className="mt-1 text-sm font-semibold">{item.loanPurpose || "-"}</div>
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

        {/* J. Additional Documents */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">J. Additional Documents</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </div>
        </div>

        {/* K. Verification Status */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">K. Verification Status</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">KYC Status</div>
              <div className="mt-1 text-sm font-semibold">{item.kycStatus || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Document Verification</div>
              <div className="mt-1 text-sm font-semibold">{item.documentVerification || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Bank Verification</div>
              <div className="mt-1 text-sm font-semibold">{item.bankVerification || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Verification Date</div>
              <div className="mt-1 text-sm font-semibold">{item.verificationDate ? new Date(item.verificationDate).toLocaleDateString() : "-"}</div>
            </div>
          </div>
        </div>

        {/* L. Reference Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">L. Reference Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Reference 1 Name</div>
              <div className="mt-1 text-sm font-semibold">{item.reference1Name || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Reference 1 Contact</div>
              <div className="mt-1 text-sm font-semibold">{item.reference1Contact || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Reference 2 Name</div>
              <div className="mt-1 text-sm font-semibold">{item.reference2Name || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Reference 2 Contact</div>
              <div className="mt-1 text-sm font-semibold">{item.reference2Contact || "-"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link className="text-sm font-semibold text-primary hover:underline" href="/admin/salary-loan-applications">
          Back to salary loan applications
        </Link>
      </div>
    </div>
  );
}
