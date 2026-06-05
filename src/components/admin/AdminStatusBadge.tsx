export default function AdminStatusBadge({ status }: { status?: string }) {
  const s = status || "Pending";
  const cls =
    s === "Approved"
      ? "bg-[#DCFCE7] text-[#166534] ring-[#BBF7D0]"
      : s === "Rejected"
        ? "bg-[#FEE2E2] text-[#991B1B] ring-[#FECACA]"
        : "bg-[#FEF3C7] text-[#92400E] ring-[#FDE68A]";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}
    >
      {s}
    </span>
  );
}