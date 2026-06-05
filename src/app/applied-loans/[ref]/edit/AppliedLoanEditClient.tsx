"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, FileEdit, LayoutList, Loader2, Save, Upload } from "lucide-react";

type EditableField = {
    key: string;
    label: string;
    altKey?: string;
};

const NON_EDITABLE_KEYS = new Set([
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
    "additionalDocuments",
    "paymentReceipts",
]);

function labelizeKey(key: string) {
    return key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toEditableString(value: unknown): string {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) return JSON.stringify(value);
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}

function isFileFieldKey(key: string) {
    return /(url|file|photo|image|document|bill|statement|report|certificate|receipt|front|back)/i.test(
        key
    );
}

function extractAllEditableFields(record: Record<string, unknown>): EditableField[] {
    return Object.entries(record)
        .filter(([key, value]) => {
            if (NON_EDITABLE_KEYS.has(key)) return false;
            if (value == null) return false;
            return true;
        })
        .map(([key]) => ({ key, label: labelizeKey(key) }))
        .sort((a, b) => a.label.localeCompare(b.label));
}

type Props = { applicationRef: string };

export default function AppliedLoanEditClient({ applicationRef }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [canEdit, setCanEdit] = useState(false);
    const [loanCategory, setLoanCategory] = useState("");
    const [editableFields, setEditableFields] = useState<EditableField[]>([]);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [fileData, setFileData] = useState<Record<string, File | null>>({});

    const loadApplication = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `/api/profile/applied-loans/${encodeURIComponent(applicationRef)}`,
                { credentials: "include" }
            );
            if (res.status === 401) {
                router.replace(`/login?next=/applied-loans/${encodeURIComponent(applicationRef)}/edit`);
                return;
            }
            const data = await res.json();
            if (!data.success) {
                setError(data.message || "Application not found");
                return;
            }
            const loan = data.loan;
            if (!loan.canEdit) {
                setError("This application is locked and cannot be edited.");
                setCanEdit(false);
                return;
            }
            setCanEdit(true);
            setLoanCategory(loan.loanCategory);
            const record = loan.formData || {};
            const dynamicFields = extractAllEditableFields(record);
            setEditableFields(dynamicFields);
            const initial: Record<string, string> = {};
            const initialFiles: Record<string, File | null> = {};
            for (const field of dynamicFields) {
                const val = record[field.key] ?? (field.altKey ? record[field.altKey] : "");
                initial[field.key] = toEditableString(val);
                initialFiles[field.key] = null;
            }
            setFormData(initial);
            setFileData(initialFiles);
        } catch {
            setError("Failed to load application");
        } finally {
            setLoading(false);
        }
    }, [applicationRef, router]);

    useEffect(() => {
        loadApplication();
    }, [loadApplication]);

    const fieldsBySection = useMemo(() => {
        const personalKeys = new Set([
            "firstName",
            "firstname",
            "middleName",
            "lastName",
            "lastname",
            "mobileNumber",
            "personalEmail",
            "whatsappNumber",
            "alternateMobile",
            "dob",
            "gender",
            "maritalStatus",
            "panNumber",
            "aadhaarNumber",
            "currentResidentialAddress",
            "currentResidentialPincode",
        ]);
        const employmentKeys = new Set([
            "companyName",
            "designation",
            "employmentType",
            "monthlyNetSalary",
            "officeLocation",
            "businessName",
            "businessType",
            "gstNumber",
            "annualTurnover",
            "currentOfficeOrShopAddress",
            "bankName",
            "cardType",
            "limitAmount",
        ]);
        const personal: EditableField[] = [];
        const employment: EditableField[] = [];
        const loanInfo: EditableField[] = [];
        for (const f of editableFields) {
            const baseKey = f.key;
            if (personalKeys.has(baseKey)) personal.push(f);
            else if (employmentKeys.has(baseKey)) employment.push(f);
            else loanInfo.push(f);
        }
        return { personal, employment, loanInfo };
    }, [editableFields]);

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (key: string, file: File | null) => {
        setFileData((prev) => ({ ...prev, [key]: file }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setMessage("");
        try {
            const payload = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                payload.append(key, value ?? "");
            }
            for (const [key, file] of Object.entries(fileData)) {
                if (file) payload.set(key, file);
            }

            const res = await fetch(`/api/profile/applied-loans/${encodeURIComponent(applicationRef)}`, {
                method: "PUT",
                credentials: "include",
                body: payload,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.message || "Failed to save changes");
                return;
            }
            setMessage("Application updated successfully.");
            setTimeout(() => {
                router.push(`/applied-loans/${encodeURIComponent(applicationRef)}`);
            }, 800);
        } catch {
            setError("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const renderFields = (fields: EditableField[]) =>
        fields.map((field) => (
            <label key={field.key} className="block rounded-xl border border-[#EEF2F7] bg-white p-3">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                    {field.label}
                </span>
                <input
                    type="text"
                    value={formData[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full rounded-lg border border-[#D6EEF8] bg-[#F5FCFF] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                />
                {isFileFieldKey(field.key) ? (
                    <div className="mt-2 rounded-lg border border-dashed border-[#CBD5E1] bg-[#F5FCFF] p-3">
                        <label className="mb-1 inline-flex items-center gap-2 text-xs font-semibold text-[#00AEEF]">
                            <Upload className="h-3.5 w-3.5" />
                            Replace file (PDF/JPG)
                        </label>
                        <input
                            type="file"
                            accept="application/pdf,image/jpeg"
                            onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                            className="block w-full text-xs text-[#475569] file:mr-3 file:rounded-lg file:border-0 file:bg-[#00AEEF] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#008FCC]"
                        />
                        {fileData[field.key] ? (
                            <p className="mt-1 text-xs text-[#0F766E]">
                                Selected: {fileData[field.key]?.name}
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </label>
        ));

    return (
        <div className="min-h-screen bg-[#F7F9FC] pt-[96px] pb-16">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <Link
                    href={`/applied-loans/${encodeURIComponent(applicationRef)}`}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#00AEEF] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Details
                </Link>

                <h1 className="text-2xl font-bold text-[#1A1A1A] sm:text-3xl">Edit Application</h1>
                <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
                    Update your submitted information. Changes are saved to your application record.
                </p>

                {loading ? (
                    <div className="mt-8 flex items-center gap-2 text-[#6B7280]">
                        <Loader2 className="h-5 w-5 animate-spin text-[#00AEEF]" />
                        Loading form...
                    </div>
                ) : error && !canEdit ? (
                    <div className="mt-8 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
                        {error}
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="mt-8 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                        {error ? (
                            <div className="xl:col-span-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
                                {error}
                            </div>
                        ) : null}
                        {message ? (
                            <div className="xl:col-span-2 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm text-[#166534]">
                                {message}
                            </div>
                        ) : null}

                        <aside className="xl:sticky xl:top-[110px] h-fit rounded-2xl border border-[#D6EEF8] bg-white p-5 shadow-sm">
                            <h2 className="text-base font-bold text-[#1A1A1A]">Application Overview</h2>
                            <div className="mt-3 space-y-2 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[#64748B]">Application ID</span>
                                    <span className="font-semibold text-[#00AEEF]">{applicationRef}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[#64748B]">Loan Category</span>
                                    <span className="font-medium text-[#1A1A1A]">{loanCategory || "â€”"}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[#64748B]">Total Fields</span>
                                    <span className="font-medium text-[#1A1A1A]">{editableFields.length}</span>
                                </div>
                            </div>
                            <div className="my-4 h-px bg-[#EEF2F7]" />
                            <nav className="space-y-2 text-sm">
                                <a href="#edit-personal" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[#00AEEF] hover:bg-[#F0F7FF]">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Personal Details
                                </a>
                                <a href="#edit-employment" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[#00AEEF] hover:bg-[#F0F7FF]">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Employment Details
                                </a>
                                <a href="#edit-loan" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[#00AEEF] hover:bg-[#F0F7FF]">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Loan Information
                                </a>
                            </nav>
                        </aside>

                        <div className="space-y-6">
                            {fieldsBySection.personal.length > 0 ? (
                                <section id="edit-personal" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-2">
                                        <LayoutList className="h-4 w-4 text-[#00AEEF]" />
                                        <h2 className="text-lg font-bold text-[#1A1A1A]">Personal Details</h2>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">{renderFields(fieldsBySection.personal)}</div>
                                </section>
                            ) : null}

                            {fieldsBySection.employment.length > 0 ? (
                                <section id="edit-employment" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-2">
                                        <LayoutList className="h-4 w-4 text-[#00AEEF]" />
                                        <h2 className="text-lg font-bold text-[#1A1A1A]">Employment Details</h2>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {renderFields(fieldsBySection.employment)}
                                    </div>
                                </section>
                            ) : null}

                            {fieldsBySection.loanInfo.length > 0 ? (
                                <section id="edit-loan" className="rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-2">
                                        <LayoutList className="h-4 w-4 text-[#00AEEF]" />
                                        <h2 className="text-lg font-bold text-[#1A1A1A]">Loan Information</h2>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">{renderFields(fieldsBySection.loanInfo)}</div>
                                </section>
                            ) : null}

                            <input type="hidden" name="loanCategory" value={loanCategory} />

                            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#D6EEF8] bg-white p-4 shadow-sm">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008FCC] disabled:opacity-60"
                                >
                                    <Save className="h-4 w-4" />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <Link
                                    href={`/applied-loans/${encodeURIComponent(applicationRef)}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-5 py-3 text-sm font-semibold text-[#374151] hover:bg-[#F7F9FC]"
                                >
                                    <FileEdit className="h-4 w-4" />
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

