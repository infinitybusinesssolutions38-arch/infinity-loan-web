"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import {
  type DetailField,
  documentBadgeClass,
  formatAppliedDate,
  formatLoanAmount,
  statusBadgeClass,
} from "@/lib/loan-status-ui";

type TimelineStep = {
  key: string;
  label: string;
  done: boolean;
  active?: boolean;
  variant?: string;
};

export type AdminLoanDetail = {
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
  timeline: TimelineStep[];
  personalDetails: DetailField[];
  employmentDetails: DetailField[];
  loanInformation: DetailField[];
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
    if (!value) return "-";
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

type Props = {
  loan: AdminLoanDetail;
  backHref: string;
  backLabel: string;
  status: string;
  adminRemarks: string;
  saving?: boolean;
  error?: string | null;
  onStatusChange: (value: string) => void;
  onAdminRemarksChange: (value: string) => void;
  onSave: () => void;
};

export default function AdminApplicationDetailView({
  loan,
  backHref,
  backLabel,
  status,
  adminRemarks,
  saving = false,
  error,
  onStatusChange,
  onAdminRemarksChange,
  onSave,
}: Props) {
  const sectionNav = [
    { id: "overview", label: "Overview" },
    { id: "personal", label: "Personal Details" },
    { id: "employment", label: "Employment Details" },
    { id: "loan", label: "Loan Information" },
    { id: "complete", label: "Complete Form" },
    { id: "timeline", label: "Timeline" },
    { id: "remarks", label: "Admin Remarks" },
  ];

  return (
    <div className="space-y-6">
      <Link href={backHref} className="inline-flex text-sm font-semibold text-primary hover:underline">
        Back: {backLabel}
      </Link>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Application Sections
            </p>
            <ol className="mt-3 space-y-4">
              {sectionNav.map((s) => (
                <li key={s.id} className="flex items-start gap-2.5">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-background text-[10px] font-semibold text-primary">
                    *
                  </span>
                  <a href={`#${s.id}`} className="text-xs font-medium hover:text-primary">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="space-y-6">
          <div id="overview" className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Application ID: {loan.applicationRef || "-"}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight">{loan.loanType}</h1>
                <p className="mt-1 text-sm text-muted-foreground">Current Status: {loan.statusLabel}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusBadgeClass(loan.status)}`}>
                  {loan.statusLabel}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${documentBadgeClass(loan.documentStatus)}`}>
                  {loan.documentStatusLabel}
                </span>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-background/60 p-4">
                <dt className="text-xs text-muted-foreground">Loan Amount</dt>
                <dd className="mt-1 font-semibold">{formatLoanAmount(loan.loanAmount)}</dd>
              </div>
              <div className="rounded-xl bg-background/60 p-4">
                <dt className="text-xs text-muted-foreground">Applied Date</dt>
                <dd className="mt-1 font-semibold">{formatAppliedDate(loan.appliedDate)}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                className="rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50"
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
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
            <DetailSection title="Complete Submitted Form" fields={getCompleteFormFields(loan.formData)} />
          </div>

          <div id="timeline" className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-bold tracking-tight">Application Timeline</h2>
            <ol className="mt-6 space-y-0">
              {loan.timeline.map((step, index) => {
                const isLast = index === loan.timeline.length - 1;
                const iconClass =
                  step.variant === "rejected"
                    ? "text-[#DC2626]"
                    : step.done
                      ? "text-[#16A34A]"
                      : step.active
                        ? "text-primary"
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
                        <div className={`my-1 min-h-[24px] w-0.5 flex-1 ${step.done ? "bg-[#16A34A]" : "bg-border"}`} />
                      ) : null}
                    </div>
                    <div className={`pb-6 ${step.active ? "font-semibold text-primary" : ""}`}>
                      {step.label}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div id="remarks" className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-bold tracking-tight">Admin Remarks</h2>
            <textarea
              className="mt-4 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary/50"
              rows={4}
              value={adminRemarks}
              onChange={(e) => onAdminRemarksChange(e.target.value)}
              placeholder="Add remarks about this application..."
            />
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="mt-4 rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-5 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Remarks"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
