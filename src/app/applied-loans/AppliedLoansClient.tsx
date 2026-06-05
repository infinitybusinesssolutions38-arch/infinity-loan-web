"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Eye,
    FileText,
    Loader2,
    Lock,
    Pencil,
    Search,
    Upload,
    X,
} from "lucide-react";
import {
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

type LoanSummary = {
    id: string;
    applicationRef: string;
    loanCategory: string;
    loanType: string;
    applicantName?: string;
    loanAmount: string;
    appliedDate: string | null;
    status: string;
    statusLabel: string;
    documentStatus: string;
    documentStatusLabel: string;
};

type DisplayStatusKey = "pending" | "under_review" | "documents_pending" | "approved" | "rejected";

const STATUS_FILTER_OPTIONS: Array<{ key: "all" | DisplayStatusKey; label: string }> = [
    { key: "all", label: "All Status" },
    { key: "pending", label: "Pending" },
    { key: "under_review", label: "Under Review" },
    { key: "documents_pending", label: "Documents Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
];

// Must use the existing services hub categories
const SERVICE_FILTER_OPTIONS: Array<{ key: string; label: string }> = [
    { key: "salaried-employees", label: "Salaried Employees" },
    { key: "businesses", label: "Businesses" },
    { key: "professionals", label: "Professionals" },
    { key: "govt-employees", label: "Government Employees" },
    { key: "government-schemes", label: "Government Schemes" },
    { key: "builders-developers", label: "Builders & Developers" },
    { key: "credit-cards", label: "Credit Cards" },
];

function getDisplayStatus(loan: LoanSummary): { key: DisplayStatusKey; label: string; badgeClass: string } {
    if (loan.status === "approved") {
        return { key: "approved", label: "Approved", badgeClass: statusBadgeClass("approved") };
    }
    if (loan.status === "rejected") {
        return { key: "rejected", label: "Rejected", badgeClass: statusBadgeClass("rejected") };
    }

    // Documents Pending: computed state on top of application status
    if (loan.documentStatus === "pending") {
        return { key: "documents_pending", label: "Documents Pending", badgeClass: documentBadgeClass("pending") };
    }

    if (loan.status === "under_review") {
        return { key: "under_review", label: "Under Review", badgeClass: statusBadgeClass("under_review") };
    }

    return { key: "pending", label: "Pending", badgeClass: statusBadgeClass("pending") };
}

function inferServiceKeyFromLoan(loan: LoanSummary): string | null {
    const loanTypeText = String(loan.loanType || "").toLowerCase();

    if (loan.loanCategory === "credit_card" || loanTypeText.includes("credit")) return "credit-cards";

    if (loan.loanCategory === "salaried") {
        if (loanTypeText.includes("government") || loanTypeText.includes("govt")) return "govt-employees";
        return "salaried-employees";
    }

    if (loan.loanCategory === "business") {
        if (loanTypeText.includes("professional")) return "professionals";
        if (loanTypeText.includes("builder") || loanTypeText.includes("developer")) return "builders-developers";
        if (loanTypeText.includes("government")) return "government-schemes";
        return "businesses";
    }

    // personal loans are not part of the services hub categories in this UI filter
    return null;
}

function getServiceLabelFromKey(serviceKey: string | null): string | null {
    if (!serviceKey) return null;
    const opt = SERVICE_FILTER_OPTIONS.find((s) => s.key === serviceKey);
    return opt?.label || null;
}

function formatLoanServiceDisplay(loan: LoanSummary): string {
    const serviceKey = inferServiceKeyFromLoan(loan);
    const serviceLabel = getServiceLabelFromKey(serviceKey);
    // Prefer the "real" service name coming from the existing services routes.
    if (serviceLabel) return serviceLabel;
    // Fallback to whatever specific loan type we already have from DB.
    return loan.loanType || "—";
}

function statusSortValue(key: DisplayStatusKey) {
    // Controls sorting by "Status" dropdown/header
    switch (key) {
        case "pending":
            return 1;
        case "under_review":
            return 2;
        case "documents_pending":
            return 3;
        case "approved":
            return 4;
        case "rejected":
            return 5;
        default:
            return 1;
    }
}

export default function AppliedLoansClient() {
    const router = useRouter();
    const [loans, setLoans] = useState<LoanSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadLoans = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/profile/applied-loans", { credentials: "include" });
            if (res.status === 401) {
                router.replace("/login?next=/applied-loans");
                return;
            }
            const data = await res.json();
            if (!data.success) {
                setError(data.message || "Failed to load applications");
                return;
            }
            setLoans(data.loans || []);
        } catch {
            setError("Failed to load applications");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        loadLoans();
        const onAuthChange = () => loadLoans();
        window.addEventListener("auth-change", onAuthChange);
        return () => window.removeEventListener("auth-change", onAuthChange);
    }, [loadLoans]);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | DisplayStatusKey>("all");
    const [serviceFilter, setServiceFilter] = useState<"all" | string>("all");
    const [pageSize, setPageSize] = useState(8);
    const [page, setPage] = useState(1);

    const [sortKey, setSortKey] = useState<"applicationRef" | "appliedDate" | "status">("appliedDate");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const availableServiceKeys = useMemo(() => {
        const set = new Set<string>();
        for (const loan of loans) {
            const key = inferServiceKeyFromLoan(loan);
            if (key) set.add(key);
        }
        return set;
    }, [loans]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, statusFilter, serviceFilter, pageSize, sortKey, sortDir]);

    const filteredSortedLoans = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const tokens = q ? q.split(/\s+/g).filter(Boolean) : [];

        const withComputed = loans.map((loan) => {
            const displayStatus = getDisplayStatus(loan);
            const serviceKey = inferServiceKeyFromLoan(loan);
            const serviceLabel = formatLoanServiceDisplay(loan);
            return { loan, displayStatus, serviceKey, serviceLabel };
        });

        const filtered = withComputed.filter(({ loan, displayStatus, serviceKey, serviceLabel }) => {
            if (statusFilter !== "all" && displayStatus.key !== statusFilter) return false;
            if (serviceFilter !== "all" && serviceKey !== serviceFilter) return false;

            if (!tokens.length) return true;
            const idText = String(loan.applicationRef || "").toLowerCase();
            const nameText = String(loan.applicantName || "").toLowerCase();
            const serviceText = String(serviceLabel || "").toLowerCase();
            return tokens.every((t) => idText.includes(t) || nameText.includes(t) || serviceText.includes(t));
        });

        const sorted = filtered.sort((a, b) => {
            let va: number | string = 0;
            let vb: number | string = 0;

            if (sortKey === "applicationRef") {
                va = String(a.loan.applicationRef || "");
                vb = String(b.loan.applicationRef || "");
                return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
            }

            if (sortKey === "appliedDate") {
                const da = a.loan.appliedDate ? new Date(a.loan.appliedDate).getTime() : 0;
                const db = b.loan.appliedDate ? new Date(b.loan.appliedDate).getTime() : 0;
                if (da === db) return 0;
                return sortDir === "asc" ? da - db : db - da;
            }

            // status
            va = statusSortValue(a.displayStatus.key);
            vb = statusSortValue(b.displayStatus.key);
            return sortDir === "asc" ? Number(va) - Number(vb) : Number(vb) - Number(va);
        });

        return sorted;
    }, [loans, searchQuery, serviceFilter, statusFilter, sortDir, sortKey]);

    const totalPages = Math.max(1, Math.ceil(filteredSortedLoans.length / pageSize));
    const pagedLoans = filteredSortedLoans.slice((page - 1) * pageSize, page * pageSize);

    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [uploadTarget, setUploadTarget] = useState<LoanSummary | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState<string>("");
    const [uploadFormUrl, setUploadFormUrl] = useState<string>("");
    const [uploadFormLoading, setUploadFormLoading] = useState(false);

    const openUploadModal = (loan: LoanSummary) => {
        setUploadTarget(loan);
        setUploadMessage("");
        setUploadFormUrl("");
        setUploadModalOpen(true);
        setUploadFormLoading(true);
        void resolveDocumentsUploadUrl({
            applicationRef: loan.applicationRef,
            categoryKey: loan.loanCategory,
            categoryTitle: loan.loanType,
        }).then((url) => {
            setUploadFormUrl(url);
            setUploadFormLoading(false);
        });
    };

    const closeUploadModal = () => {
        setUploadModalOpen(false);
        setUploadTarget(null);
        setUploading(false);
        setUploadMessage("");
        setUploadFormUrl("");
        setUploadFormLoading(false);
    };

    const confirmUpload = async () => {
        if (!uploadTarget) return;
        setUploading(true);
        setUploadMessage("");
        try {
            const res = await fetch("/api/profile/document-confirmation", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationRef: uploadTarget.applicationRef,
                    loanCategory: uploadTarget.loanCategory,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                setUploadMessage(data.message || "Failed to upload documents");
                return;
            }
            setUploadMessage("Documents uploaded successfully and sent for verification.");
            await loadLoans();
            setTimeout(() => closeUploadModal(), 900);
        } catch {
            setUploadMessage("Failed to upload documents");
        } finally {
            setUploading(false);
        }
    };

    const renderStatusBadge = (loan: LoanSummary) => {
        const { key, label, badgeClass } = getDisplayStatus(loan);
        const isLocked = key === "approved" || key === "rejected";
        return (
            <div className="flex flex-wrap items-center gap-2">
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}
                    aria-label={`Status: ${label}`}
                >
                    {label}
                </span>
                {isLocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#D6EEF8] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#64748B]">
                        <Lock className="h-3.5 w-3.5" />
                        Locked
                    </span>
                ) : null}
            </div>
        );
    };

    const renderEditButton = (loan: LoanSummary) => {
        const displayStatus = getDisplayStatus(loan);
        const canEdit = displayStatus.key === "pending" || displayStatus.key === "under_review" || displayStatus.key === "documents_pending";
        if (!canEdit) return null;
        return (
            <Link
                href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}/edit`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#00AEEF] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#E6F7FD]"
            >
                <Pencil className="h-4 w-4" />
                Edit Application
            </Link>
        );
    };

    const renderUploadButton = (loan: LoanSummary) => {
        const displayStatus = getDisplayStatus(loan);
        const isApprovedOrRejected = displayStatus.key === "approved" || displayStatus.key === "rejected";
        const canConfirmDocs = loan.documentStatus === "pending";
        if (isApprovedOrRejected) return null;
        if (!canConfirmDocs) return (
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${documentBadgeClass("uploaded")}`}>
                {loan.documentStatusLabel || "Documents Submitted"}
            </span>
        );
        return (
            <button
                type="button"
                onClick={() => openUploadModal(loan)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#F7F9FC]"
            >
                <Upload className="h-4 w-4" />
                Upload Documents
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] pt-[96px] pb-16">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#00AEEF] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
                            Applied Loans
                        </h1>
                        <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
                            Track all your loan applications and document status in one place.
                        </p>
                    </div>
                    {!loading && loans.length > 0 ? (
                        <button
                            type="button"
                            onClick={() => loadLoans()}
                            className="rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#F7F9FC]"
                        >
                            Refresh
                        </button>
                    ) : null}
                </div>

                {/* Search / Filter Bar */}
                <section className="mb-6 rounded-2xl border border-[#D6EEF8] bg-white p-4 sm:p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:items-end">
                        <div className="xl:col-span-5">
                            <label className="mb-2 block text-sm font-semibold text-[#374151]">
                                Search (Application ID / Full Name / Loan Service)
                            </label>
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Type to search…"
                                    className="w-full rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-10 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 xl:col-span-7">
                            <div className="min-w-0">
                                <label className="mb-2 block text-sm font-semibold text-[#374151]">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as any)}
                                    className="w-full rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                                >
                                    {STATUS_FILTER_OPTIONS.map((opt) => (
                                        <option key={opt.key} value={opt.key}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="min-w-0">
                                <label className="mb-2 block text-sm font-semibold text-[#374151]">Loan Service</label>
                                <select
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                    className="w-full rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                                >
                                    <option value="all">All Services</option>
                                    {SERVICE_FILTER_OPTIONS.map((opt) => (
                                        <option key={opt.key} value={opt.key}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="min-w-0">
                                <label className="mb-2 block text-sm font-semibold text-[#374151]">Sort</label>
                                <div className="flex gap-2">
                                    <select
                                        value={sortKey}
                                        onChange={(e) => setSortKey(e.target.value as any)}
                                        className="min-w-0 flex-1 rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                                    >
                                        <option value="applicationRef">Application ID</option>
                                        <option value="appliedDate">Applied Date</option>
                                        <option value="status">Status</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                                        className="rounded-xl border border-[#D6EEF8] bg-white px-3 py-2.5 text-sm font-semibold text-[#00AEEF] hover:bg-[#F7F9FC]"
                                    >
                                        {sortDir === "asc" ? "Asc" : "Desc"}
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-0">
                                <label className="mb-2 block text-sm font-semibold text-[#374151]">Rows</label>
                                <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                    className="w-full rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                                >
                                    {[5, 8, 10, 15].map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#D6EEF8] bg-white py-20 text-[#6B7280]">
                        <Loader2 className="h-5 w-5 animate-spin text-[#00AEEF]" />
                        Loading applications...
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-6 py-8 text-center text-[#991B1B]">
                        {error}
                    </div>
                ) : loans.length === 0 ? (
                    <div className="rounded-2xl border border-[#D6EEF8] bg-white px-6 py-16 text-center shadow-sm">
                        <FileText className="mx-auto h-12 w-12 text-[#CBD5E1]" />
                        <h2 className="mt-4 text-lg font-semibold text-[#1A1A1A]">No applications yet</h2>
                        <p className="mt-2 text-sm text-[#6B7280]">
                            Apply for a loan from our services page to see your applications here.
                        </p>
                        <Link
                            href="/services"
                            className="mt-6 inline-flex rounded-xl bg-[#00AEEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008FCC]"
                        >
                            Browse Services
                        </Link>
                    </div>
                ) : filteredSortedLoans.length === 0 ? (
                    <div className="rounded-2xl border border-[#D6EEF8] bg-white px-6 py-16 text-center shadow-sm">
                        <FileText className="mx-auto h-12 w-12 text-[#CBD5E1]" />
                        <h2 className="mt-4 text-lg font-semibold text-[#1A1A1A]">No matching applications</h2>
                        <p className="mt-2 text-sm text-[#6B7280]">
                            Try adjusting your search or filters.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setStatusFilter("all");
                                    setServiceFilter("all");
                                }}
                                className="rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#F7F9FC]"
                            >
                                Clear Filters
                            </button>
                            <button
                                type="button"
                                onClick={() => loadLoans()}
                                className="rounded-xl bg-[#00AEEF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#008FCC]"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <div className="overflow-x-auto rounded-2xl border border-[#D6EEF8] bg-white shadow-sm">
                                <table className="min-w-[980px] w-full border-collapse">
                                    <thead className="sticky top-0 z-10 bg-white">
                                        <tr className="border-b border-[#D6EEF8] text-left">
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                Application ID
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                Full Name
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                Loan Service
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                View
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                Edit Application
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                                Upload Documents
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedLoans.map(({ loan }) => {
                                            const displayStatus = getDisplayStatus(loan);
                                            const canEdit =
                                                displayStatus.key === "pending" ||
                                                displayStatus.key === "under_review" ||
                                                displayStatus.key === "documents_pending";
                                            const canUpload =
                                                (displayStatus.key !== "approved" && displayStatus.key !== "rejected") &&
                                                loan.documentStatus === "pending";

                                            return (
                                                    <tr key={loan.id} className="border-b border-[#F1F5F9] transition-colors hover:bg-[#F7F9FC]">
                                                    <td className="px-4 py-4 align-top">
                                                        <Link
                                                            href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}`}
                                                            className="inline-flex items-center gap-2 font-semibold text-[#00AEEF] hover:underline"
                                                        >
                                                            {loan.applicationRef}
                                                        </Link>
                                                        <div className="mt-1 text-xs text-[#94A3B8]">
                                                            {formatAppliedDate(loan.appliedDate)}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 align-top">
                                                        <div className="font-medium text-[#1A1A1A]">{loan.applicantName || "—"}</div>
                                                    </td>
                                                    <td className="px-4 py-4 align-top">
                                                        <div className="font-medium text-[#1A1A1A]">
                                                        {formatLoanServiceDisplay(loan)}
                                                        </div>
                                                    <div className="mt-0.5 text-xs text-[#9CA3AF]">Loan Service</div>
                                                    </td>
                                                    <td className="px-4 py-4 align-top">{renderStatusBadge(loan)}</td>
                                                    <td className="px-4 py-4 align-top">
                                                        <Link
                                                            href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}`}
                                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#008FCC]"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-4 align-top">
                                                        {canEdit ? (
                                                            <Link
                                                                href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}/edit`}
                                                                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#00AEEF] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#E6F7FD]"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        ) : (
                                                            <span className="text-xs font-semibold text-[#94A3B8]">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 align-top">
                                                        {displayStatus.key === "approved" || displayStatus.key === "rejected" ? (
                                                            <span className="text-xs font-semibold text-[#94A3B8]">—</span>
                                                        ) : canUpload ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => openUploadModal(loan)}
                                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#F7F9FC]"
                                                            >
                                                                <Upload className="h-4 w-4" />
                                                                Upload
                                                            </button>
                                                        ) : (
                                                            <span
                                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${documentBadgeClass("uploaded")}`}
                                                            >
                                                                {loan.documentStatusLabel || "Documents Submitted"}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                                <div className="text-sm text-[#6B7280]">
                                    Page <span className="font-semibold text-[#1A1A1A]">{page}</span> of{" "}
                                    <span className="font-semibold text-[#1A1A1A]">{totalPages}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={page <= 1}
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className="rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] disabled:opacity-50"
                                    >
                                        Prev
                                    </button>
                                    <button
                                        type="button"
                                        disabled={page >= totalPages}
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        className="rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile List */}
                        <div className="md:hidden space-y-4">
                            {pagedLoans.map(({ loan }) => {
                                const displayStatus = getDisplayStatus(loan);
                                const canEdit =
                                    displayStatus.key === "pending" ||
                                    displayStatus.key === "under_review" ||
                                    displayStatus.key === "documents_pending";
                                const canUpload =
                                    displayStatus.key !== "approved" &&
                                    displayStatus.key !== "rejected" &&
                                    loan.documentStatus === "pending";

                                return (
                                    <article key={loan.id} className="rounded-2xl border border-[#D6EEF8] bg-white p-4 shadow-sm">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-xs font-semibold uppercase tracking-wide text-[#00AEEF]">
                                                    {loan.applicationRef}
                                                </p>
                                                <div className="mt-1 text-sm font-semibold text-[#1A1A1A]">
                                                    {loan.applicantName || "—"}
                                                </div>
                                                <div className="mt-0.5 text-xs text-[#6B7280]">
                                                    {formatLoanServiceDisplay(loan)}
                                                </div>
                                                <div className="mt-0.5 text-[11px] font-semibold tracking-wide text-[#94A3B8]">
                                                    Loan Service
                                                </div>
                                            </div>
                                            {renderStatusBadge(loan)}
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-3">
                                            <Link
                                                href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}`}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#008FCC]"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Details
                                            </Link>

                                            {canEdit ? (
                                                <Link
                                                    href={`/applied-loans/${encodeURIComponent(loan.applicationRef)}/edit`}
                                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00AEEF] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#E6F7FD]"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit Application
                                                </Link>
                                            ) : (
                                                <div className="rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-4 py-2 text-center text-xs font-semibold text-[#94A3B8]">
                                                    Edit locked
                                                </div>
                                            )}

                                            {displayStatus.key === "approved" || displayStatus.key === "rejected" ? (
                                                <div className="rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] px-4 py-2 text-center text-xs font-semibold text-[#94A3B8]">
                                                    Upload locked
                                                </div>
                                            ) : canUpload ? (
                                                <button
                                                    type="button"
                                                    onClick={() => openUploadModal(loan)}
                                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] hover:bg-[#F7F9FC]"
                                                >
                                                    <Upload className="h-4 w-4" />
                                                    Upload Documents
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-4 py-2">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${documentBadgeClass("uploaded")}`}
                                                    >
                                                        {loan.documentStatusLabel || "Documents Submitted"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}

                            {/* Pagination */}
                            <div className="flex items-center justify-between gap-3 pt-2">
                                <button
                                    type="button"
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <div className="text-sm text-[#6B7280]">
                                    Page <span className="font-semibold text-[#1A1A1A]">{page}</span> of{" "}
                                    <span className="font-semibold text-[#1A1A1A]">{totalPages}</span>
                                </div>
                                <button
                                    type="button"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="rounded-xl border border-[#D6EEF8] bg-white px-4 py-2 text-sm font-semibold text-[#00AEEF] disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Upload Documents Modal */}
            {uploadModalOpen && uploadTarget ? (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0F172A]/50"
                        onClick={closeUploadModal}
                        aria-hidden
                    />
                    <div className="relative w-full max-w-lg animate-modal-in rounded-2xl border border-[#D6EEF8] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.2)]">
                        <div className="flex items-start justify-between gap-3 border-b border-[#D6EEF8] px-6 py-4">
                            <div>
                                <h2 className="text-lg font-bold text-[#1A1A1A]">Required Documents Upload</h2>
                                <p className="mt-1 text-sm text-[#6B7280]">
                                    Upload pending documents for{" "}
                                    <span className="font-semibold text-[#1A1A1A]">{uploadTarget.loanType}</span>{" "}
                                    using the service-specific Google Form link below.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeUploadModal}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#374151] hover:bg-[#F7F9FC]"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-6 py-5">
                            {uploadFormLoading ? (
                                <div className="flex items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-[#F5FCFF] px-4 py-3 text-sm text-[#6B7280]">
                                    <Loader2 className="h-4 w-4 animate-spin text-[#00AEEF]" />
                                    Loading upload link...
                                </div>
                            ) : uploadFormUrl ? (
                                <>
                                    {isGoogleFormUrl(uploadFormUrl) ? (
                                        <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2.5 text-sm font-medium text-[#166534]">
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A]" aria-hidden />
                                            Official admin Google Form link
                                        </div>
                                    ) : null}
                                    <a
                                        href={sanitizeDocumentsUploadHref(uploadFormUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008FCC]"
                                    >
                                        {isGoogleFormUrl(uploadFormUrl) ? "Open Google Form" : "Upload Documents"}
                                        <Upload className="h-4 w-4" />
                                    </a>
                                </>
                            ) : (
                                <p className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
                                    Upload link is not configured for this service. Please contact support.
                                </p>
                            )}

                            <div className="mt-4 rounded-xl border border-[#D6EEF8] bg-[#F5FCFF] p-4">
                                <p className="text-sm font-semibold text-[#1A1A1A]">Documents Checklist</p>
                                <p className="mt-1 text-sm text-[#6B7280]">
                                    After submitting documents in the Google Form, return here and click below to confirm.
                                </p>
                            </div>

                            {uploadMessage ? (
                                <div
                                    className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                                        uploadMessage.includes("success")
                                            ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]"
                                            : "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]"
                                    }`}
                                >
                                    {uploadMessage}
                                </div>
                            ) : null}

                            <button
                                type="button"
                                disabled={uploading || uploadFormLoading || !uploadFormUrl}
                                onClick={confirmUpload}
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00AEEF] bg-[#E6F7FD] px-5 py-3 text-sm font-semibold text-[#00AEEF] transition-all hover:bg-[#B3E8FA] disabled:opacity-60"
                            >
                                {uploading ? "Confirming…" : "I Have Uploaded Documents"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
