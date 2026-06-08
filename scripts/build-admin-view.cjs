const fs = require("fs");
const srcPath = "src/app/applied-loans/[ref]/LoanDetailClient.tsx";
const dstPath = "src/components/admin/AdminApplicationDetailView.tsx";
const lines = fs.readFileSync(srcPath, "utf8").split(/\r?\n/);
const helpers = lines.slice(58, 212).join("\n").replace(/return "\u2014";/g, 'return "-";');
const header = `"use client";

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

`;
const footer = `type Props = {
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
                  <a href={\`#\${s.id}\`} className="text-xs font-medium hover:text-primary">
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
                <span className={\`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset \${statusBadgeClass(loan.status)}\`}>
                  {loan.statusLabel}
                </span>
                <span className={\`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset \${documentBadgeClass(loan.documentStatus)}\`}>
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
                        <CheckCircle2 className={\`h-5 w-5 \${iconClass}\`} />
                      ) : (
                        <Circle className={\`h-5 w-5 \${iconClass}\`} />
                      )}
                      {!isLast ? (
                        <div className={\`my-1 min-h-[24px] w-0.5 flex-1 \${step.done ? "bg-[#16A34A]" : "bg-border"}\`} />
                      ) : null}
                    </div>
                    <div className={\`pb-6 \${step.active ? "font-semibold text-primary" : ""}\`}>
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
`;
const out = header + helpers + "\n\n" + footer;
fs.writeFileSync(dstPath, out, "utf8");
const b = fs.readFileSync(dstPath);
console.log("ok", b.length, "nulls", [...b].filter((x) => x === 0).length);

const deleteBtn = `"use client";

import { useState } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";

type Props = {
  itemLabel?: string;
  onDelete: () => Promise<boolean>;
};

export default function AdminListDeleteButton({ itemLabel = "this application", onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const ok = await onDelete();
      if (ok) {
        setDeleted(true);
        setConfirming(false);
        setTimeout(() => setDeleted(false), 2500);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (deleted) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#16A34A]">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Deleted
      </span>
    );
  }

  if (confirming) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-muted-foreground">Delete {itemLabel}?</span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={deleting}
            onClick={() => void handleDelete()}
            className="rounded-lg bg-destructive px-2 py-1 text-[10px] font-semibold text-destructive-foreground disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Yes"}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-border px-2 py-1 text-[10px] font-semibold"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-[10px] font-semibold text-destructive transition hover:bg-destructive/20"
      title="Delete application"
    >
      <Trash2 className="h-3 w-3" />
      Delete
    </button>
  );
}
`;
fs.writeFileSync("src/components/admin/AdminListDeleteButton.tsx", deleteBtn, "utf8");
const db = fs.readFileSync("src/components/admin/AdminListDeleteButton.tsx");
console.log("delete btn nulls", [...db].filter((x) => x === 0).length);
