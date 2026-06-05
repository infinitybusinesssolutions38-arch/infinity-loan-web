"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Circle,
    ExternalLink,
    Loader2,
    Lock,
    Pencil,
} from "lucide-react";
import {
    type DetailField,
    documentBadgeClass,
    formatAppliedDate,
    formatLoanAmount,
    statusBadgeClass,
} from "@/lib/loan-status-ui";
import {
    isGoogleFormUrl,
    resolveDocumentsUploadUrl,
    sanitizeDocumentsUploadHref,
} from "@/lib/loan-documents-upload";

type TimelineStep = {
    key: string;
    label: string;
    done: boolean;
    active?: boolean;
    variant?: string;
};

type LoanDetail = {
    applicationRef: string;
    loanType: string;
    loanCategory: string;
    loanAmount: string;
    appliedDate: string | null;
    status: string;
    statusLabel: string;
    documentStatus: string;
    documentStatusLabel: string;
    adminRemarks: string;
    applicantName: string;
    timeline: TimelineStep[];
    personalDetails: DetailField[];
    employmentDetails: DetailField[];
    loanInformation: DetailField[];
    isLocked: boolean;
    canEdit: boolean;
    canUploadDocuments: boolean;
    pendingDocuments: string[];
    formData?: Record<string, unknown>;
};

function DetailSection({ title, fields }: { title: string; fields: DetailField[] }) {
    if (!fields.length) return null;
    return (
        <div className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1A1A1A]">{title}</h2>
            <dl className="mt-4 space-y-3 text-sm">
                {fields.map((f) => (
                    <div
                        key={f.label}
                        className="flex flex-col gap-1 border-b border-[#F1F5F9] pb-3 last:border-0 sm:flex-row sm:justify-between sm:gap-4"
                    >
                        <dt className="text-[#6B7280]">{f.label}</dt>
                        <dd className="font-medium text-[#1A1A1A] break-all sm:max-w-[60%] sm:text-right">
                            {renderFieldValue(f.value)}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

const HIDE_FORM_KEYS = new Set([
    "_id",
    "__v",
    "userId",
    "createdAt",
    "updatedAt",
    "applicationRef",
    "application_status",
    "status",
    "documentStatus",
    "documentsConfirmedAt",
    "reviewedAt",
    "adminRemarks",
    "role",
    "loan_type",
]);

function labelizeKey(key: string) {
    return key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function scalarToString(value: unknown): string {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return "";
}

function parseMaybeStructuredString(value: unknown): unknown {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;

    if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
        try {
            return JSON.parse(trimmed);
        } catch {
            return value;
        }
    }
    return value;
}

function isLikelyUrl(value: string) {
    return /^https?:\/\//i.test(value.trim());
}

function isPdfUrl(value: string) {
    return /\.pdf(?:$|[?#])/i.test(value.trim());
}

function renderFieldValue(value: string) {
    if (!value) return "—";
    if (!isLikelyUrl(value)) return value;

    return (
        <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[#D6E4FF] bg-[#F3F8FF] px-2.5 py-1 text-xs font-semibold text-[#00AEEF] hover:bg-[#E6F0FF]"
            title={value}
        >
            {isPdfUrl(value) ? "Open PDF" : "Open Document"}
        </a>
    );
}

function flattenFormField(
    keyPrefix: string,
    value: unknown,
    out: DetailField[],
    depth = 0
) {
    if (depth > 4) return;
    if (value == null) return;
    const normalizedValue = parseMaybeStructuredString(value);

    const scalar = scalarToString(normalizedValue);
    if (scalar) {
        out.push({ label: labelizeKey(keyPrefix), value: scalar });
        return;
    }

    if (Array.isArray(normalizedValue)) {
        if (!normalizedValue.length) return;
        normalizedValue.forEach((item, idx) => {
            const itemPrefix = `${keyPrefix} ${idx + 1}`;
            const normalizedItem = parseMaybeStructuredString(item);
            const itemScalar = scalarToString(normalizedItem);
            if (itemScalar) {
                out.push({ label: labelizeKey(itemPrefix), value: itemScalar });
                return;
            }
            if (normalizedItem && typeof normalizedItem === "object") {
                Object.entries(normalizedItem as Record<string, unknown>).forEach(([k, v]) => {
                    flattenFormField(`${itemPrefix} ${k}`, v, out, depth + 1);
                });
            }
        });
        return;
    }

    if (typeof normalizedValue === "object") {
        Object.entries(normalizedValue as Record<string, unknown>).forEach(([k, v]) => {
            flattenFormField(`${keyPrefix} ${k}`, v, out, depth + 1);
        });
    }
}

function getCompleteFormFields(formData?: Record<string, unknown>): DetailField[] {
    if (!formData || typeof formData !== "object") return [];
    const entries: DetailField[] = [];
    Object.entries(formData)
        .filter(([k]) => !HIDE_FORM_KEYS.has(k))
        .forEach(([k, v]) => flattenFormField(k, v, entries, 0));

    const deduped = entries.filter((f, idx, arr) => {
        const same = arr.findIndex((x) => x.label === f.label && x.value === f.value);
        return same === idx;
    });
    deduped.sort((a, b) => a.label.localeCompare(b.label));
    return deduped;
}

type Props = { applicationRef: string };

export default function LoanDetailClient({ applicationRef }: Props) {
    const router = useRouter();
    const [loan, setLoan] = useState<LoanDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [documentsUploadUrl, setDocumentsUploadUrl] = useState("");
    const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const loadLoan = useCallback(async () => {
        setError("");
        try {
            const res = await fetch(
                `/api/profile/applied-loans/${encodeURIComponent(applicationRef)}`,
                { credentials: "include" }
            );
            if (res.status === 401) {
                router.replace(`/login?next=/applied-loans/${encodeURIComponent(applicationRef)}`);
                return;
            }
            const data = await res.json();
            if (!data.success) {
                setError(data.message || "Application not found");
                setLoan(null);
                return;
            }
            setLoan(data.loan);
        } catch {
            setError("Failed to load application details");
            setLoan(null);
        } finally {
            setLoading(false);
        }
    }, [applicationRef, router]);

    useEffect(() => {
        setLoading(true);
        loadLoan();
    }, [loadLoan]);

    useEffect(() => {
        if (!loan?.canUploadDocuments) {
            setDocumentsUploadUrl("");
            return;
        }
        let mounted = true;
        void resolveDocumentsUploadUrl({
            applicationRef: loan.applicationRef,
            categoryKey: loan.loanCategory,
            categoryTitle: loan.loanType,
        }).then((url) => {
            if (mounted) setDocumentsUploadUrl(url);
        });
        return () => {
            mounted = false;
        };
    }, [loan?.applicationRef, loan?.loanCategory, loan?.loanType, loan?.canUploadDocuments]);

    const confirmUpload = async () => {
        if (!loan) return;
        setUploading(true);
        setToast(null);
        try {
            const res = await fetch("/api/profile/document-confirmation", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationRef: loan.applicationRef,
                    loanCategory: loan.loanCategory,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                setToast({ type: "error", text: data.message || "Failed to confirm upload" });
                return;
            }
            setToast({
                type: "success",
                text: "Documents uploaded successfully and sent for verification.",
            });
            await loadLoan();
        } catch {
            setToast({ type: "error", text: "Failed to confirm upload" });
        } finally {
            setUploading(false);
        }
    };

    const sectionNav = [
        { id: "overview", label: "Overview" },
        { id: "personal", label: "Personal Details" },
        { id: "employment", label: "Employment Details" },
        { id: "loan", label: "Loan Information" },
        { id: "complete", label: "Complete Form" },
        { id: "timeline", label: "Timeline" },
        { id: "remarks", label: "Admin Remarks" },
        { id: "documents", label: "Documents Upload" },
    ];

    return (
        <div className="min-h-screen bg-[#F7F9FC] pt-[96px] pb-16">
            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <Link
                    href="/applied-loans"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#00AEEF] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Applied Loans
                </Link>

                {toast ? (
                    <div
                        className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                            toast.type === "success"
                                ? "border border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]"
                                : "border border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]"
                        }`}
                    >
                        {toast.text}
                    </div>
                ) : null}

                {loading ? (
                    <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#D6EEF8] bg-white py-20 text-[#6B7280]">
                        <Loader2 className="h-5 w-5 animate-spin text-[#00AEEF]" />
                        Loading details...
                    </div>
                ) : error || !loan ? (
                    <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-6 py-8 text-center text-[#991B1B]">
                        {error || "Application not found"}
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                        <aside className="hidden lg:block">
                            <div className="sticky top-[110px] rounded-2xl border border-[#D6EEF8] bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                    Application Sections
                                </p>
                                <ol className="mt-3 space-y-4">
                                    {sectionNav.map((s) => (
                                        <li key={s.id} className="flex items-start gap-2.5">
                                            <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#00AEEF] bg-white text-[10px] font-semibold text-[#00AEEF]">
                                                •
                                            </span>
                                            <a
                                                href={`#${s.id}`}
                                                className="text-xs font-medium text-[#334155] hover:text-[#00AEEF]"
                                            >
                                                {s.label}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </aside>

                        <div className="space-y-6">
                        {loan.isLocked ? (
                            <div className="flex items-start gap-3 rounded-2xl border border-[#D6EEF8] bg-[#F8FAFC] p-4">
                                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#64748B]" />
                                <div>
                                    <p className="text-sm font-semibold text-[#475569]">Application Locked</p>
                                    <p className="mt-1 text-sm text-[#64748B]">
                                        Further modifications are not allowed once the application has been processed.
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {loan.status === "approved" ? (
                            <div className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-5 text-sm text-[#166534]">
                                Your loan application has been approved by our team.
                            </div>
                        ) : null}

                        {loan.status === "rejected" ? (
                            <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-5 text-sm text-[#991B1B]">
                                Your loan application has been rejected by our team.
                            </div>
                        ) : null}

                        <div id="overview" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#00AEEF]">
                                        Application ID: {loan.applicationRef}
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold text-[#1A1A1A]">{loan.loanType}</h1>
                                    <p className="mt-1 text-sm text-[#6B7280]">Current Status: {loan.statusLabel}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusBadgeClass(loan.status)}`}
                                    >
                                        {loan.statusLabel}
                                    </span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${documentBadgeClass(loan.documentStatus)}`}
                                    >
                                        {loan.documentStatusLabel}
                                    </span>
                                </div>
                            </div>

                            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-[#F5FCFF] p-4">
                                    <dt className="text-xs text-[#9CA3AF]">Loan Amount</dt>
                                    <dd className="mt-1 font-semibold text-[#1A1A1A]">
                                        {formatLoanAmount(loan.loanAmount)}
                                    </dd>
                                </div>
                                <div className="rounded-xl bg-[#F5FCFF] p-4">
                                    <dt className="text-xs text-[#9CA3AF]">Applied Date</dt>
                                    <dd className="mt-1 font-semibold text-[#1A1A1A]">
                                        {formatAppliedDate(loan.appliedDate)}
                                    </dd>
                                </div>
                            </dl>

                            {loan.canEdit ? (
                                <Link
                                    href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}/edit`}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-[#00AEEF] bg-white px-5 py-2.5 text-sm font-semibold text-[#00AEEF] hover:bg-[#E6F7FD]"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Edit Application
                                </Link>
                            ) : null}
                        </div>

                        <div id="personal">
                            <DetailSection title="Personal Details" fields={loan.personalDetails} />
                        </div>
                        <div id="employment">
                            <DetailSection title="Employment Details" fields={loan.employmentDetails} />
                        </div>
                        <div id="loan">
                            <DetailSection title="Loan Information" fields={loan.loanInformation} />
                        </div>
                        <div id="complete">
                            <DetailSection
                                title="Complete Submitted Form"
                                fields={getCompleteFormFields(loan.formData)}
                            />
                        </div>

                        <div id="timeline" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-[#1A1A1A]">Application Timeline</h2>
                            <ol className="mt-6 space-y-0">
                                {loan.timeline.map((step, index) => {
                                    const isLast = index === loan.timeline.length - 1;
                                    const iconClass =
                                        step.variant === "rejected"
                                            ? "text-[#DC2626]"
                                            : step.done
                                              ? "text-[#16A34A]"
                                              : step.active
                                                ? "text-[#00AEEF]"
                                                : "text-[#CBD5E1]";
                                    return (
                                        <li key={step.key} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                {step.done ? (
                                                    <CheckCircle2 className={`h-5 w-5 ${iconClass}`} />
                                                ) : (
                                                    <Circle className={`h-5 w-5 ${iconClass}`} />
                                                )}
                                                {!isLast ? (
                                                    <div
                                                        className={`my-1 min-h-[24px] w-0.5 flex-1 ${step.done ? "bg-[#16A34A]" : "bg-[#D6EEF8]"}`}
                                                    />
                                                ) : null}
                                            </div>
                                            <div
                                                className={`pb-6 ${step.active ? "font-semibold text-[#00AEEF]" : "text-[#374151]"}`}
                                            >
                                                {step.label}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        {loan.adminRemarks ? (
                            <div id="remarks" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Admin Remarks</h2>
                                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{loan.adminRemarks}</p>
                            </div>
                        ) : null}

                        {loan.canUploadDocuments ? (
                            <div id="documents" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Required Documents Upload</h2>
                                <p className="mt-2 text-sm text-[#6B7280]">
                                    Upload the following documents using the service-specific Google Form link, then confirm below.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    {loan.pendingDocuments.map((doc) => (
                                        <li key={doc} className="flex items-center gap-2 text-sm text-[#374151]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                                {documentsUploadUrl ? (
                                    <a
                                        href={sanitizeDocumentsUploadHref(documentsUploadUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008FCC]"
                                    >
                                        {isGoogleFormUrl(documentsUploadUrl)
                                            ? "Open Google Form"
                                            : "Upload Documents"}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : null}
                                <button
                                    type="button"
                                    disabled={uploading || !documentsUploadUrl}
                                    onClick={confirmUpload}
                                    className="mt-4 block w-full rounded-xl border-2 border-[#00AEEF] bg-[#E6F7FD] px-5 py-3 text-sm font-semibold text-[#00AEEF] hover:bg-[#B3E8FA] disabled:opacity-60 sm:w-auto"
                                >
                                    {uploading ? "Saving..." : "I Have Uploaded Documents"}
                                </button>
                            </div>
                        ) : null}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
