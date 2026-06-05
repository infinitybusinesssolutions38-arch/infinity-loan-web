"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

const titleMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/enquiries": "Loan Enquiries",
  "/admin/regular-enquiries": "Regular Enquiries",
  "/admin/salary-loan-applications": "Salary Employee Loan Applications",
  "/admin/business-loan-applications": "Business Loan Applications",
  "/admin/credit-card-applications": "Credit Card Applications",
  "/admin/google-forms": "Google Forms",
  "/admin/partner-applications": "Loan Partner Applications",
  "/admin/loan-applications": "Loan Applications",
};

export default function AdminTopbar() {
  const pathname = usePathname();

  const title =
    titleMap[pathname] ||
    (pathname.startsWith("/admin/enquiries/")
      ? "Enquiry Details"
      : pathname.startsWith("/admin/salary-loan-applications/")
        ? "Salary Loan Details"
        : pathname.startsWith("/admin/business-loan-applications/")
          ? "Business Loan Details"
          : pathname.startsWith("/admin/loan-applications/")
            ? "Loan Application Details"
            : "Admin");

  return (
    <div className="admin-topbar px-5 pb-4 pt-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold uppercase tracking-wider text-[#00AEEF]/70">
            Infinity Loans & Business Solutions • Admin
          </div>
          <div className="admin-topbar-title mt-1 truncate text-xl font-bold tracking-tight md:text-2xl">
            {title}
          </div>
        </div>

        <div className="shrink-0">
          <div className="admin-badge-protected inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
            <span className="hidden h-1.5 w-1.5 rounded-full bg-[#16A34A] sm:inline-block" />
            Protected
          </div>
        </div>
      </div>
    </div>
  );
}
