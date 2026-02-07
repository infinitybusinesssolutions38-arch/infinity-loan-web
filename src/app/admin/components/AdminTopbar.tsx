"use client";

import { usePathname } from "next/navigation";

const titleMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/enquiries": "Loan Enquiries",
  "/admin/loan-applications": "Loan Applications",
};

export default function AdminTopbar() {
  const pathname = usePathname();

  const title =
    titleMap[pathname] ||
    (pathname.startsWith("/admin/enquiries/")
      ? "Enquiry Details"
      : pathname.startsWith("/admin/loan-applications/")
        ? "Loan Application Details"
        : "Admin");

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 px-5 py-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-muted-foreground">Infinity Loans • Admin</div>
          <div className="mt-1 truncate text-xl font-bold tracking-tight">{title}</div>
        </div>

        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Protected
          </div>
        </div>
      </div>
    </div>
  );
}
