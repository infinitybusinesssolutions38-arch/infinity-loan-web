"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AdditionalDocument = {
    documentName: string;
    documentUrl: string;
    uploadedAt?: string;
};

type PaymentReceipt = {
    receiptName: string;
    receiptUrl: string;
    uploadedAt?: string;
};

type LoanItem = {
    _id?: string;
    applicationRef?: string;
    serviceCategoryKey?: string;
    serviceCategoryTitle?: string;
    requiredLoanAmount?: string;
    status?: string;
    createdAt?: string;
    additionalDocuments?: AdditionalDocument[];
    paymentReceipts?: PaymentReceipt[];
    loanType?: "Salaried Loan" | "Business Loan";
};

type ProfileResponse = {
    success: boolean;
    message?: string;
    user?: {
        id: string;
        fullName: string;
        email: string;
        mobile?: string;
        role?: string;
        createdAt?: string | null;
    };
    loans?: {
        salaried: LoanItem[];
        business: LoanItem[];
    };
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .profile-root * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .profile-root {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    color: #0a0a0a;
    min-height: 100vh;
  }

  /* Breadcrumb */
  .breadcrumb {
    background: #0a0a0a;
    padding: 14px 32px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    border-bottom: 1px solid #222;
  }
  .breadcrumb .active {
    color: #2796CA;
  }
  .breadcrumb-sep {
    color: #2796CA;
    font-size: 14px;
    line-height: 1;
  }

  /* Container */
  .profile-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* Header */
  .profile-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 48px;
    animation: slideDown 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .profile-header-left h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #0a0a0a;
  }
  .profile-header-left h1 span {
    color: #2796CA;
  }
  .profile-header-left p {
    margin-top: 8px;
    font-size: 14px;
    color: #888;
    font-weight: 400;
  }

  /* Refresh button */
  .btn-refresh {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #0a0a0a;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .btn-refresh::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #2796CA;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 0;
  }
  .btn-refresh:hover::before { transform: scaleX(1); }
  .btn-refresh span { position: relative; z-index: 1; }
  .btn-refresh:active { transform: scale(0.97); }

  /* Card base */
  .card {
    background: #fff;
    border: 1.5px solid #e8e8e8;
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #2796CA;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .card:hover::before { transform: scaleX(1); }
  .card:nth-child(2) { animation-delay: 0.1s; }
  .card:nth-child(3) { animation-delay: 0.2s; }

  /* Section title */
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #0a0a0a;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title-dot {
    width: 8px;
    height: 8px;
    background: #2796CA;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Account grid */
  .account-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 600px) {
    .account-grid { grid-template-columns: 1fr; }
  }

  .account-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .account-field-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #bbb;
  }
  .account-field-value {
    font-size: 16px;
    font-weight: 600;
    color: #0a0a0a;
    padding: 10px 0;
    border-bottom: 1.5px solid #f0f0f0;
    transition: border-color 0.2s;
  }
  .account-field:hover .account-field-value {
    border-color: #2796CA;
  }

  /* Loans header row */
  .loans-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .loans-count-badge {
    background: #2796CA;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.05em;
  }

  /* Loan card */
  .loan-card {
    background: #fafafa;
    border: 1.5px solid #efefef;
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 16px;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .loan-card::after {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #2796CA;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .loan-card:hover {
    border-color: #2796CA;
    box-shadow: 0 8px 32px rgba(249,116,21,0.1);
    transform: translateX(4px);
  }
  .loan-card:hover::after { opacity: 1; }

  .loan-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }
  .loan-type-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #0a0a0a;
  }
  .loan-type-tag-dot {
    width: 6px;
    height: 6px;
    background: #2796CA;
    border-radius: 50%;
    display: inline-block;
  }
  .loan-ref {
    font-size: 12px;
    color: #aaa;
    margin-top: 3px;
    font-weight: 400;
  }
  .loan-ref strong {
    color: #555;
    font-weight: 500;
  }

  /* Status badge */
  .status-badge {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    padding: 5px 12px;
    border-radius: 8px;
    letter-spacing: 0.04em;
    background: #0a0a0a;
    color: #fff;
    flex-shrink: 0;
  }
  .status-badge.pending {
    background: #fff7ed;
    color: #2796CA;
    border: 1px solid rgba(249,116,21,0.3);
  }
  .status-badge.approved {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid rgba(22,163,74,0.3);
  }
  .status-badge.rejected {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid rgba(220,38,38,0.3);
  }

  .loan-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 500px) {
    .loan-meta-grid { grid-template-columns: 1fr; }
  }

  .loan-meta-item {}
  .loan-meta-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #bbb;
    margin-bottom: 4px;
  }
  .loan-meta-value {
    font-size: 14px;
    font-weight: 600;
    color: #0a0a0a;
  }

  .loan-date {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #ececec;
    font-size: 11px;
    color: #bbb;
    font-weight: 400;
  }

  /* Empty */
  .empty-state {
    text-align: center;
    padding: 48px 0;
    color: #bbb;
  }
  .empty-state-icon {
    font-size: 40px;
    margin-bottom: 12px;
    opacity: 0.4;
  }

  /* Loading */
  .loading-card {
    padding: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: #888;
    font-size: 14px;
  }
  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #f0f0f0;
    border-top-color: #2796CA;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Error */
  .error-card {
    padding: 32px;
    background: #fff5f0;
    border: 1.5px solid rgba(249,116,21,0.3);
    border-radius: 20px;
    color: #2796CA;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Keyframes */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function getStatusClass(status?: string) {
    const s = (status || "").toLowerCase();
    if (s === "approved") return "approved";
    if (s === "rejected" || s === "declined") return "rejected";
    return "pending";
}

type UploadRow = {
    documentName: string;
    documentFile: File | null;
};

type ReceiptRow = {
    receiptName: string;
    receiptFile: File | null;
};

const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg"]);

function validateAdditionalDocRow(row: UploadRow, index: number) {
    const name = String(row.documentName || "").trim();
    if (!name) return `Document name is required for item ${index + 1}`;

    const file = row.documentFile;
    if (!file) return `Document file is required for item ${index + 1}`;

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return `Only PDF or JPEG allowed (item ${index + 1})`;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return `Max file size is 1 MB (item ${index + 1})`;
    }

    return null;
}

function validateReceiptRow(row: ReceiptRow, index: number) {
    const name = String(row.receiptName || "").trim();
    if (!name) return `Receipt name is required for item ${index + 1}`;

    const file = row.receiptFile;
    if (!file) return `Receipt file is required for item ${index + 1}`;

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return `Only PDF or JPEG allowed (item ${index + 1})`;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return `Max file size is 1 MB (item ${index + 1})`;
    }

    return null;
}

export default function ProfileClient() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ProfileResponse | null>(null);

    const [uploadLoanRef, setUploadLoanRef] = useState("");
    const [uploadLoanType, setUploadLoanType] = useState<"salaried" | "business" | "">("");
    const [uploadRows, setUploadRows] = useState<UploadRow[]>([
        { documentName: "", documentFile: null },
    ]);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [receiptLoanRef, setReceiptLoanRef] = useState("");
    const [receiptLoanType, setReceiptLoanType] = useState<"salaried" | "business" | "">("");
    const [receiptRows, setReceiptRows] = useState<ReceiptRow[]>([
        { receiptName: "", receiptFile: null },
    ]);
    const [receiptUploading, setReceiptUploading] = useState(false);
    const [receiptMessage, setReceiptMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [editingProfile, setEditingProfile] = useState(false);
    const [editFullName, setEditFullName] = useState("");
    const [editMobile, setEditMobile] = useState("");
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSaveMessage, setProfileSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const loadProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/api/profile", { method: "GET", credentials: "include" });
            if (res.status === 401) {
                router.replace("/login?next=/profile");
                return;
            }
            const json = (await res.json()) as ProfileResponse;
            if (!res.ok || !json?.success) {
                setError(json?.message || "Failed to load profile");
                setData(null);
                return;
            }
            setData(json);
            if (json.user) {
                setEditFullName(json.user.fullName || "");
                setEditMobile(json.user.mobile || "");
            }
        } catch {
            setError("Failed to load profile");
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const allLoans = useMemo((): LoanItem[] => {
        const salaried = data?.loans?.salaried || [];
        const business = data?.loans?.business || [];
        return [
            ...salaried.map((l) => ({ ...l, loanType: "Salaried Loan" as const })),
            ...business.map((l) => ({ ...l, loanType: "Business Loan" as const })),
        ].sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bTime - aTime;
        });
    }, [data]);

    const handleSaveProfile = useCallback(async () => {
        setProfileSaveMessage(null);
        setProfileSaving(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName: editFullName, mobile: editMobile }),
            });
            const json = await res.json();
            if (!res.ok || !json.success) {
                setProfileSaveMessage({ type: "error", text: json.message || "Failed to update profile" });
                return;
            }
            setProfileSaveMessage({ type: "success", text: "Profile updated successfully" });
            setEditingProfile(false);
            await loadProfile();
        } catch {
            setProfileSaveMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setProfileSaving(false);
        }
    }, [editFullName, editMobile, loadProfile]);

    const handleUploadAdditionalDocuments = useCallback(async () => {
        setUploadMessage(null);

        const applicationRef = String(uploadLoanRef || "").trim();
        if (!applicationRef) {
            setUploadMessage({ type: "error", text: "Please select a loan application" });
            return;
        }

        if (uploadLoanType !== "salaried" && uploadLoanType !== "business") {
            setUploadMessage({ type: "error", text: "Please select loan type" });
            return;
        }

        for (let i = 0; i < uploadRows.length; i++) {
            const msg = validateAdditionalDocRow(uploadRows[i], i);
            if (msg) {
                setUploadMessage({ type: "error", text: msg });
                return;
            }
        }

        try {
            setUploading(true);

            const fd = new FormData();
            fd.append("applicationRef", applicationRef);
            fd.append("loanType", uploadLoanType);

            uploadRows.forEach((row) => {
                fd.append("documentName", row.documentName);
                if (row.documentFile) fd.append("documentFile", row.documentFile);
            });

            const res = await fetch("/api/profile/additional-documents", {
                method: "POST",
                body: fd,
                credentials: "include",
            });

            const json = await res.json();
            if (!res.ok || !json?.success) {
                setUploadMessage({ type: "error", text: json?.message || "Upload failed" });
                return;
            }

            const debugInfo =
                json?.loanId
                    ? ` (Loan ID: ${String(json.loanId)})`
                    : "";

            setUploadMessage({
                type: "success",
                text: `Documents uploaded successfully${debugInfo}`,
            });
            setUploadRows([{ documentName: "", documentFile: null }]);
            await loadProfile();
        } catch {
            setUploadMessage({ type: "error", text: "Upload failed" });
        } finally {
            setUploading(false);
        }
    }, [loadProfile, uploadLoanRef, uploadLoanType, uploadRows]);

    const handleUploadPaymentReceipts = useCallback(async () => {
        setReceiptMessage(null);

        const applicationRef = String(receiptLoanRef || "").trim();
        if (!applicationRef) {
            setReceiptMessage({ type: "error", text: "Please select a loan application" });
            return;
        }

        if (receiptLoanType !== "salaried" && receiptLoanType !== "business") {
            setReceiptMessage({ type: "error", text: "Please select loan type" });
            return;
        }

        for (let i = 0; i < receiptRows.length; i++) {
            const msg = validateReceiptRow(receiptRows[i], i);
            if (msg) {
                setReceiptMessage({ type: "error", text: msg });
                return;
            }
        }

        try {
            setReceiptUploading(true);

            const fd = new FormData();
            fd.append("applicationRef", applicationRef);
            fd.append("loanType", receiptLoanType);

            receiptRows.forEach((row) => {
                fd.append("receiptName", row.receiptName);
                if (row.receiptFile) fd.append("receiptFile", row.receiptFile);
            });

            const res = await fetch("/api/profile/payment-receipts", {
                method: "POST",
                body: fd,
                credentials: "include",
            });

            const json = await res.json();
            if (!res.ok || !json?.success) {
                setReceiptMessage({ type: "error", text: json?.message || "Upload failed" });
                return;
            }

            const debugInfo = json?.loanId ? ` (Loan ID: ${String(json.loanId)})` : "";
            setReceiptMessage({
                type: "success",
                text: `Payment receipts uploaded successfully${debugInfo}`,
            });
            setReceiptRows([{ receiptName: "", receiptFile: null }]);
            await loadProfile();
        } catch {
            setReceiptMessage({ type: "error", text: "Upload failed" });
        } finally {
            setReceiptUploading(false);
        }
    }, [loadProfile, receiptLoanRef, receiptLoanType, receiptRows]);

    return (
        <div className="profile-root">
            <style>{styles}</style>

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <span>Home</span>
                <span className="breadcrumb-sep">›</span>
                <span className="active">Profile</span>
            </div>

            <div className="profile-container">
                {/* Header */}
                <div className="profile-header">
                    <div className="profile-header-left">
                        <h1>My <span>Profile</span></h1>
                        <p>Your registered details and loan applications.</p>
                    </div>
                    <button type="button" className="btn-refresh" onClick={() => window.location.reload()}>
                        <span>↻ Refresh</span>
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="card">
                        <div className="loading-card">
                            <div className="spinner" />
                            <span>Loading your profile…</span>
                        </div>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="error-card">
                        <span style={{ fontSize: 20 }}>⚠</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* No user */}
                {!loading && !error && !data?.user && (
                    <div className="card">
                        <div className="empty-state">
                            <div className="empty-state-icon">👤</div>
                            <div>No profile found.</div>
                        </div>
                    </div>
                )}

                {/* Main content */}
                {!loading && !error && data?.user && (
                    <>
                        {/* Account Details */}
                        <div className="card">
                            <div className="section-title" style={{ justifyContent: "space-between" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span className="section-title-dot" />
                                    Account Details
                                </span>
                                {!editingProfile ? (
                                    <button
                                        type="button"
                                        className="btn-refresh"
                                        style={{ padding: "8px 14px", fontSize: 12 }}
                                        onClick={() => setEditingProfile(true)}
                                    >
                                        Edit Profile
                                    </button>
                                ) : null}
                            </div>
                            {profileSaveMessage ? (
                                <div
                                    style={{
                                        marginBottom: 16,
                                        padding: "10px 14px",
                                        borderRadius: 10,
                                        fontSize: 13,
                                        background: profileSaveMessage.type === "success" ? "#ecfdf5" : "#fef2f2",
                                        color: profileSaveMessage.type === "success" ? "#166534" : "#991b1b",
                                    }}
                                >
                                    {profileSaveMessage.text}
                                </div>
                            ) : null}
                            {editingProfile ? (
                                <div className="account-grid">
                                    <div className="account-field">
                                        <div className="account-field-label">Full Name</div>
                                        <input
                                            value={editFullName}
                                            onChange={(e) => setEditFullName(e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px 14px",
                                                borderRadius: 12,
                                                border: "1.5px solid #e8e8e8",
                                            }}
                                        />
                                    </div>
                                    <div className="account-field">
                                        <div className="account-field-label">Mobile</div>
                                        <input
                                            value={editMobile}
                                            onChange={(e) => setEditMobile(e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px 14px",
                                                borderRadius: 12,
                                                border: "1.5px solid #e8e8e8",
                                            }}
                                        />
                                    </div>
                                    <div className="account-field">
                                        <div className="account-field-label">Email</div>
                                        <div className="account-field-value">{data.user.email}</div>
                                    </div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                                        <button
                                            type="button"
                                            className="btn-refresh"
                                            disabled={profileSaving}
                                            onClick={handleSaveProfile}
                                        >
                                            {profileSaving ? "Saving…" : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingProfile(false);
                                                setEditFullName(data.user.fullName || "");
                                                setEditMobile(data.user.mobile || "");
                                                setProfileSaveMessage(null);
                                            }}
                                            style={{
                                                padding: "12px 16px",
                                                borderRadius: 12,
                                                border: "1.5px solid #e8e8e8",
                                                background: "#fff",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                            <div className="account-grid">
                                {[
                                    { label: "Full Name", value: data.user.fullName },
                                    { label: "Email", value: data.user.email },
                                    { label: "Mobile", value: data.user.mobile },
                                    { label: "Role", value: data.user.role },
                                ].map((f) => (
                                    <div className="account-field" key={f.label}>
                                        <div className="account-field-label">{f.label}</div>
                                        <div className="account-field-value">{f.value || "—"}</div>
                                    </div>
                                ))}
                            </div>
                            )}
                            <div style={{ marginTop: 20 }}>
                                <a
                                    href="/applied-loans"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        color: "#2796CA",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    View all applied loans →
                                </a>
                            </div>
                        </div>

                        {/* Upload Additional Documents */}
                        <div className="card">
                            <div className="section-title">
                                <span className="section-title-dot" />
                                Upload Additional Documents
                            </div>

                            <div className="loan-meta-grid" style={{ marginBottom: 16 }}>
                                <div className="loan-meta-item">
                                    <div className="loan-meta-label">Select Loan Application</div>
                                    <select
                                        value={uploadLoanRef}
                                        onChange={(e) => {
                                            const nextRef = e.target.value;
                                            setUploadLoanRef(nextRef);
                                            const found = allLoans.find((l) => l.applicationRef === nextRef);
                                            const inferred = found?.loanType === "Business Loan" ? "business" : found?.loanType === "Salaried Loan" ? "salaried" : "";
                                            setUploadLoanType(inferred);
                                            setUploadMessage(null);
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1.5px solid #e8e8e8",
                                            background: "#fff",
                                            fontSize: 14,
                                        }}
                                    >
                                        <option value="">-- select --</option>
                                        {allLoans.map((loan) => (
                                            <option key={loan.applicationRef} value={loan.applicationRef}>
                                                {loan.applicationRef} ({loan.loanType})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="loan-meta-item">
                                    <div className="loan-meta-label">Loan Type</div>
                                    <select
                                        value={uploadLoanType}
                                        onChange={(e) => setUploadLoanType(e.target.value as any)}
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1.5px solid #e8e8e8",
                                            background: "#fff",
                                            fontSize: 14,
                                        }}
                                    >
                                        <option value="">-- select --</option>
                                        <option value="salaried">Salaried</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div>
                            </div>

                            {uploadRows.map((row, idx) => (
                                <div key={idx} className="loan-card" style={{ marginBottom: 12 }}>
                                    <div className="loan-meta-grid">
                                        <div className="loan-meta-item">
                                            <div className="loan-meta-label">Document Name</div>
                                            <input
                                                value={row.documentName}
                                                onChange={(e) => {
                                                    const next = [...uploadRows];
                                                    next[idx] = { ...next[idx], documentName: e.target.value };
                                                    setUploadRows(next);
                                                }}
                                                placeholder="e.g. Property Papers"
                                                style={{
                                                    width: "100%",
                                                    padding: "12px 14px",
                                                    borderRadius: 12,
                                                    border: "1.5px solid #e8e8e8",
                                                    background: "#fff",
                                                    fontSize: 14,
                                                }}
                                            />
                                        </div>
                                        <div className="loan-meta-item">
                                            <div className="loan-meta-label">Upload File (PDF/JPEG, max 1MB)</div>
                                            <input
                                                type="file"
                                                accept="application/pdf,image/jpeg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    const next = [...uploadRows];
                                                    next[idx] = { ...next[idx], documentFile: file };
                                                    setUploadRows(next);
                                                }}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
                                        <div style={{ fontSize: 12, color: "#888" }}>
                                            {row.documentFile ? row.documentFile.name : "No file selected"}
                                        </div>
                                        {uploadRows.length > 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUploadRows((rows) => rows.filter((_, i) => i !== idx));
                                                    setUploadMessage(null);
                                                }}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#dc2626",
                                                    fontWeight: 700,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Remove
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            ))}

                            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 12 }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUploadRows((rows) => [...rows, { documentName: "", documentFile: null }]);
                                        setUploadMessage(null);
                                    }}
                                    style={{
                                        borderRadius: 12,
                                        padding: "12px 16px",
                                        border: "1.5px solid #e8e8e8",
                                        background: "#fff",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                    }}
                                >
                                    + Add More
                                </button>

                                <button
                                    type="button"
                                    disabled={uploading}
                                    onClick={handleUploadAdditionalDocuments}
                                    style={{
                                        borderRadius: 12,
                                        padding: "12px 18px",
                                        border: "none",
                                        background: uploading ? "#aaa" : "#2796CA",
                                        color: "#fff",
                                        fontWeight: 900,
                                        cursor: uploading ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {uploading ? "Uploading..." : "Upload Documents"}
                                </button>
                            </div>

                            {uploadMessage ? (
                                <div
                                    style={{
                                        marginTop: 14,
                                        padding: "12px 14px",
                                        borderRadius: 14,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        background: uploadMessage.type === "success" ? "#f0fdf4" : "#fff7ed",
                                        color: uploadMessage.type === "success" ? "#16a34a" : "#c44a00",
                                        border:
                                            uploadMessage.type === "success"
                                                ? "1px solid rgba(22,163,74,0.3)"
                                                : "1px solid rgba(249,116,21,0.3)",
                                    }}
                                >
                                    {uploadMessage.text}
                                </div>
                            ) : null}
                        </div>

                        {/* Upload Payment Receipts */}
                        <div className="card">
                            <div className="section-title">
                                <span className="section-title-dot" />
                                Upload Payment Receipt
                            </div>

                            <div className="loan-meta-grid" style={{ marginBottom: 16 }}>
                                <div className="loan-meta-item">
                                    <div className="loan-meta-label">Select Loan Application</div>
                                    <select
                                        value={receiptLoanRef}
                                        onChange={(e) => {
                                            const nextRef = e.target.value;
                                            setReceiptLoanRef(nextRef);
                                            const found = allLoans.find((l) => l.applicationRef === nextRef);
                                            const inferred =
                                                found?.loanType === "Business Loan"
                                                    ? "business"
                                                    : found?.loanType === "Salaried Loan"
                                                        ? "salaried"
                                                        : "";
                                            setReceiptLoanType(inferred);
                                            setReceiptMessage(null);
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1.5px solid #e8e8e8",
                                            background: "#fff",
                                            fontSize: 14,
                                        }}
                                    >
                                        <option value="">-- select --</option>
                                        {allLoans.map((loan) => (
                                            <option key={loan.applicationRef} value={loan.applicationRef}>
                                                {loan.applicationRef} ({loan.loanType})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="loan-meta-item">
                                    <div className="loan-meta-label">Loan Type</div>
                                    <select
                                        value={receiptLoanType}
                                        onChange={(e) => setReceiptLoanType(e.target.value as any)}
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            borderRadius: 12,
                                            border: "1.5px solid #e8e8e8",
                                            background: "#fff",
                                            fontSize: 14,
                                        }}
                                    >
                                        <option value="">-- select --</option>
                                        <option value="salaried">Salaried</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div>
                            </div>

                            {receiptRows.map((row, idx) => (
                                <div key={idx} className="loan-card" style={{ marginBottom: 12 }}>
                                    <div className="loan-meta-grid">
                                        <div className="loan-meta-item">
                                            <div className="loan-meta-label">Receipt Name</div>
                                            <input
                                                value={row.receiptName}
                                                onChange={(e) => {
                                                    const next = [...receiptRows];
                                                    next[idx] = { ...next[idx], receiptName: e.target.value };
                                                    setReceiptRows(next);
                                                }}
                                                placeholder="e.g. Processing Fee Receipt"
                                                style={{
                                                    width: "100%",
                                                    padding: "12px 14px",
                                                    borderRadius: 12,
                                                    border: "1.5px solid #e8e8e8",
                                                    background: "#fff",
                                                    fontSize: 14,
                                                }}
                                            />
                                        </div>
                                        <div className="loan-meta-item">
                                            <div className="loan-meta-label">Upload File (PDF/JPEG, max 1MB)</div>
                                            <input
                                                type="file"
                                                accept="application/pdf,image/jpeg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    const next = [...receiptRows];
                                                    next[idx] = { ...next[idx], receiptFile: file };
                                                    setReceiptRows(next);
                                                }}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
                                        <div style={{ fontSize: 12, color: "#888" }}>
                                            {row.receiptFile ? row.receiptFile.name : "No file selected"}
                                        </div>
                                        {receiptRows.length > 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setReceiptRows((rows) => rows.filter((_, i) => i !== idx));
                                                    setReceiptMessage(null);
                                                }}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#dc2626",
                                                    fontWeight: 700,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Remove
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            ))}

                            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 12 }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReceiptRows((rows) => [...rows, { receiptName: "", receiptFile: null }]);
                                        setReceiptMessage(null);
                                    }}
                                    style={{
                                        borderRadius: 12,
                                        padding: "12px 16px",
                                        border: "1.5px solid #e8e8e8",
                                        background: "#fff",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                    }}
                                >
                                    + Add More
                                </button>

                                <button
                                    type="button"
                                    disabled={receiptUploading}
                                    onClick={handleUploadPaymentReceipts}
                                    style={{
                                        borderRadius: 12,
                                        padding: "12px 18px",
                                        border: "none",
                                        background: receiptUploading ? "#aaa" : "#2796CA",
                                        color: "#fff",
                                        fontWeight: 900,
                                        cursor: receiptUploading ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {receiptUploading ? "Uploading..." : "Upload Receipt"}
                                </button>
                            </div>

                            {receiptMessage ? (
                                <div
                                    style={{
                                        marginTop: 14,
                                        padding: "12px 14px",
                                        borderRadius: 14,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        background: receiptMessage.type === "success" ? "#f0fdf4" : "#fff7ed",
                                        color: receiptMessage.type === "success" ? "#16a34a" : "#c44a00",
                                        border:
                                            receiptMessage.type === "success"
                                                ? "1px solid rgba(22,163,74,0.3)"
                                                : "1px solid rgba(249,116,21,0.3)",
                                    }}
                                >
                                    {receiptMessage.text}
                                </div>
                            ) : null}
                        </div>

                        {/* Loan Applications */}
                        <div className="card">
                            <div className="loans-header">
                                <div className="section-title" style={{ marginBottom: 0 }}>
                                    <span className="section-title-dot" />
                                    Loan Applications
                                </div>
                                <span className="loans-count-badge">{allLoans.length} total</span>
                            </div>

                            {allLoans.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">📋</div>
                                    <div>No loan applications found.</div>
                                </div>
                            ) : (
                                <div>
                                    {allLoans.map((loan, idx) => (
                                        <div
                                            key={loan._id || loan.applicationRef || idx}
                                            className="loan-card"
                                            style={{ animationDelay: `${idx * 0.07}s` }}
                                        >
                                            <div className="loan-card-top">
                                                <div>
                                                    <div className="loan-type-tag">
                                                        <span className="loan-type-tag-dot" />
                                                        {loan.loanType}
                                                    </div>
                                                    <div className="loan-ref">
                                                        Ref: <strong>{loan.applicationRef || "—"}</strong>
                                                    </div>
                                                </div>
                                                <span className={`status-badge ${getStatusClass(loan.status)}`}>
                                                    {loan.status || "Pending"}
                                                </span>
                                            </div>

                                            <div className="loan-meta-grid">
                                                <div className="loan-meta-item">
                                                    <div className="loan-meta-label">Category</div>
                                                    <div className="loan-meta-value">
                                                        {loan.serviceCategoryTitle || loan.serviceCategoryKey || "—"}
                                                    </div>
                                                </div>
                                                <div className="loan-meta-item">
                                                    <div className="loan-meta-label">Loan Amount</div>
                                                    <div className="loan-meta-value">
                                                        {loan.requiredLoanAmount || "—"}
                                                    </div>
                                                </div>
                                            </div>

                                            {Array.isArray(loan.additionalDocuments) && loan.additionalDocuments.length > 0 ? (
                                                <div className="loan-date" style={{ marginTop: 12 }}>
                                                    <div style={{ fontWeight: 700, color: "#555", marginBottom: 8 }}>
                                                        Additional Documents
                                                    </div>
                                                    <div style={{ display: "grid", gap: 6 }}>
                                                        {loan.additionalDocuments.map((d, i) => (
                                                            <a
                                                                key={`${d.documentUrl}_${i}`}
                                                                href={d.documentUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                style={{
                                                                    color: "#0a0a0a",
                                                                    textDecoration: "underline",
                                                                    fontSize: 12,
                                                                }}
                                                            >
                                                                {d.documentName || `Document ${i + 1}`}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {Array.isArray(loan.paymentReceipts) && loan.paymentReceipts.length > 0 ? (
                                                <div className="loan-date" style={{ marginTop: 12 }}>
                                                    <div style={{ fontWeight: 700, color: "#555", marginBottom: 8 }}>
                                                        Payment Receipts
                                                    </div>
                                                    <div style={{ display: "grid", gap: 6 }}>
                                                        {loan.paymentReceipts.map((r, i) => (
                                                            <a
                                                                key={`${r.receiptUrl}_${i}`}
                                                                href={r.receiptUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                style={{
                                                                    color: "#0a0a0a",
                                                                    textDecoration: "underline",
                                                                    fontSize: 12,
                                                                }}
                                                            >
                                                                {r.receiptName || `Receipt ${i + 1}`}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {loan.createdAt && (
                                                <div className="loan-date">
                                                    Applied on: {new Date(loan.createdAt).toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}