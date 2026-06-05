"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import {
    isGoogleFormUrl,
    resolveDocumentsUploadUrl,
    sanitizeDocumentsUploadHref,
} from "@/lib/loan-documents-upload";

type PendingApplication = {
    applicationRef: string;
    loanType: string;
    loanCategory: string;
    missingDocuments: string[];
};

export default function UploadDocumentsClient() {
    const router = useRouter();
    const [applications, setApplications] = useState<PendingApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState<string | null>(null);
    const [formUrls, setFormUrls] = useState<Record<string, string>>({});
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const loadPending = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/profile/pending-documents", { credentials: "include" });
            if (res.status === 401) {
                router.replace("/login?next=/upload-documents");
                return;
            }
            const data = await res.json();
            if (!data.success) {
                setError(data.message || "Failed to load pending documents");
                return;
            }
            const apps = data.applications || [];
            setApplications(apps);
            const urlEntries = await Promise.all(
                apps.map(async (app: PendingApplication) => {
                    const url = await resolveDocumentsUploadUrl({
                        applicationRef: app.applicationRef,
                        categoryKey: app.loanCategory,
                        categoryTitle: app.loanType,
                    });
                    return [app.applicationRef, url] as const;
                })
            );
            setFormUrls(Object.fromEntries(urlEntries));
        } catch {
            setError("Failed to load pending documents");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.replace("/login?next=/upload-documents");
            return;
        }
        loadPending();
    }, [loadPending, router]);

    const confirmUpload = async (app: PendingApplication) => {
        setConfirming(app.applicationRef);
        setMessage("");
        setError("");
        try {
            const res = await fetch("/api/profile/document-confirmation", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationRef: app.applicationRef,
                    loanCategory: app.loanCategory,
                }),
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.message || "Failed to confirm upload");
                return;
            }
            setMessage(`Documents confirmed for ${app.applicationRef}`);
            await loadPending();
        } catch {
            setError("Failed to confirm upload");
        } finally {
            setConfirming(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] pt-[96px] pb-16">
            <div className="mx-auto max-w-3xl px-5 sm:px-6">
                <Link
                    href="/applied-loans"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#00AEEF] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Applied Loans
                </Link>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
                        Upload Remaining Documents
                    </h1>
                    <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
                        Open the service-specific Google Form for each application, submit documents, then confirm below.
                    </p>
                </div>

                <div className="mb-6 rounded-2xl border border-[#D6EEF8] bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-[#1A1A1A]">Upload Instructions</h2>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[#4B5563]">
                        <li>Open the Google Form for your loan service and upload all required documents.</li>
                        <li>Name files clearly (e.g. SalarySlip_March2025.pdf).</li>
                        <li>Return here and click &quot;Documents Uploaded&quot; for each application.</li>
                    </ol>
                </div>

                {message ? (
                    <div className="mb-4 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm text-[#166534]">
                        {message}
                    </div>
                ) : null}
                {error ? (
                    <div className="mb-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
                        {error}
                    </div>
                ) : null}

                {loading ? (
                    <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#D6EEF8] bg-white py-16 text-[#6B7280]">
                        <Loader2 className="h-5 w-5 animate-spin text-[#00AEEF]" />
                        Loading...
                    </div>
                ) : applications.length === 0 ? (
                    <div className="rounded-2xl border border-[#D6EEF8] bg-white px-6 py-12 text-center shadow-sm">
                        <p className="text-[#6B7280]">No pending document uploads at this time.</p>
                        <Link
                            href="/applied-loans"
                            className="mt-4 inline-block text-sm font-semibold text-[#00AEEF] hover:underline"
                        >
                            View applied loans
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app.applicationRef}
                                className="rounded-2xl border border-[#D6EEF8] bg-white p-5 shadow-sm"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-[#00AEEF]">
                                            {app.applicationRef}
                                        </p>
                                        <h3 className="mt-1 font-bold text-[#1A1A1A]">{app.loanType}</h3>
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {app.missingDocuments.map((doc) => (
                                        <li
                                            key={doc}
                                            className="flex items-center gap-2 text-sm text-[#4B5563]"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                                {formUrls[app.applicationRef] ? (
                                    <a
                                        href={sanitizeDocumentsUploadHref(formUrls[app.applicationRef])}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008FCC]"
                                    >
                                        {isGoogleFormUrl(formUrls[app.applicationRef])
                                            ? "Open Google Form"
                                            : "Upload Documents"}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : null}
                                <button
                                    type="button"
                                    disabled={confirming === app.applicationRef || !formUrls[app.applicationRef]}
                                    onClick={() => confirmUpload(app)}
                                    className="mt-4 w-full rounded-xl border-2 border-[#00AEEF] bg-[#E6F7FD] px-4 py-3 text-sm font-semibold text-[#00AEEF] transition-all hover:bg-[#B3E8FA] disabled:opacity-60 sm:w-auto"
                                >
                                    {confirming === app.applicationRef ? "Saving..." : "I Have Uploaded Documents"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
