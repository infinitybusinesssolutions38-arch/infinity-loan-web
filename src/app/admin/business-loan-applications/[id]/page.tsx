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

        {/* E. Loan Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">E. Loan Details</h3>
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
              <div className="text-xs text-muted-foreground">Business Type</div>
              <div className="mt-1 text-sm font-semibold">{item.businessType || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Years in Business</div>
              <div className="mt-1 text-sm font-semibold">{item.yearsInBusiness || "-"}</div>
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

        {/* F. Business Financial Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">F. Business Financial Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Annual Turnover</div>
              <div className="mt-1 text-sm font-semibold">{item.annualTurnover || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Monthly Income</div>
              <div className="mt-1 text-sm font-semibold">{item.monthlyIncome || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Existing Loan Amount</div>
              <div className="mt-1 text-sm font-semibold">{item.existingLoanAmount || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Existing Loan EMI</div>
              <div className="mt-1 text-sm font-semibold">{item.existingLoanEmi || "-"}</div>
            </div>
          </div>
        </div>

        {/* G. Bank Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">G. Bank Details</h3>
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

        {/* H. Employment Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">H. Employment Details</h3>
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

        {/* I. Property Details */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">I. Property Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Property Type</div>
              <div className="mt-1 text-sm font-semibold">{item.propertyType || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Property Value</div>
              <div className="mt-1 text-sm font-semibold">{item.propertyValue || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Property Location</div>
              <div className="mt-1 text-sm font-semibold">{item.propertyLocation || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Property Ownership</div>
              <div className="mt-1 text-sm font-semibold">{item.propertyOwnership || "-"}</div>
            </div>
          </div>
        </div>

        {/* J. References */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">J. References</h3>
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

        {/* K. Additional Information */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">K. Additional Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Credit Score</div>
              <div className="mt-1 text-sm font-semibold">{item.creditScore || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Previous Loan History</div>
              <div className="mt-1 text-sm font-semibold">{item.previousLoanHistory || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Collateral Details</div>
              <div className="mt-1 text-sm font-semibold">{item.collateralDetails || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Other Income Sources</div>
              <div className="mt-1 text-sm font-semibold">{item.otherIncomeSources || "-"}</div>
            </div>
          </div>
        </div>

        {/* L. Verification Status */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">L. Verification Status</h3>
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

        {/* M. Admin Actions */}
        <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
          <h3 className="text-lg font-semibold mb-4 text-primary">M. Admin Actions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Reviewed By</div>
              <div className="mt-1 text-sm font-semibold">{item.reviewedBy || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Reviewed At</div>
              <div className="mt-1 text-sm font-semibold">{item.reviewedAt ? new Date(item.reviewedAt).toLocaleDateString() : "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Approved By</div>
              <div className="mt-1 text-sm font-semibold">{item.approvedBy || "-"}</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
              <div className="text-xs text-muted-foreground">Approved At</div>
              <div className="mt-1 text-sm font-semibold">{item.approvedAt ? new Date(item.approvedAt).toLocaleDateString() : "-"}</div>
            </div>
          </div>
        </div>

        {/* N. Upload Other Supported Documents */}
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
              <>
                {item.documents.map((doc: any, index: number) => (
                  <div key={index} className="rounded-2xl border border-border/50 bg-background/50 p-4">
                    <div className="text-xs text-muted-foreground">Document {index + 1}</div>
                    <div className="mt-1 text-sm">
                      <div className="font-semibold">{doc.name || doc.fileName || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Type: {doc.type || doc.mimeType || "Unknown"}
                      </div>
                      {doc.url && (
                        <a 
                          href={doc.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-1 inline-block"
                        >
                          View Document
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </>
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
