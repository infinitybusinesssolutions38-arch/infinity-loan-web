export type LoanStatus = "pending" | "under_review" | "approved" | "rejected";

export function statusBadgeClass(status: string) {
    switch (status) {
        case "approved":
            return "bg-[#DCFCE7] text-[#166534] ring-[#BBF7D0]";
        case "rejected":
            return "bg-[#FEE2E2] text-[#991B1B] ring-[#FECACA]";
        case "under_review":
            return "bg-[#DBEAFE] text-[#1E40AF] ring-[#BFDBFE]";
        case "pending":
        default:
            return "bg-[#FFEDD5] text-[#C2410C] ring-[#FED7AA]";
    }
}

export function documentBadgeClass(status: string) {
    switch (status) {
        case "verified":
            return "bg-[#DCFCE7] text-[#166534] ring-[#BBF7D0]";
        case "uploaded":
            return "bg-[#FEF3C7] text-[#92400E] ring-[#FDE68A]";
        case "pending":
        default:
            return "bg-[#FEF9C3] text-[#854D0E] ring-[#FEF08A]";
    }
}

export function formatAppliedDate(value: string | null | undefined) {
    if (!value) return "—";
    try {
        return new Date(value).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "—";
    }
}

export function formatLoanAmount(value: string | number | null | undefined) {
    if (value == null || value === "") return "—";
    const num = Number(String(value).replace(/[^\d.]/g, ""));
    if (!Number.isFinite(num) || num === 0) return String(value);
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(num);
}

export type DetailField = { label: string; value: string };
