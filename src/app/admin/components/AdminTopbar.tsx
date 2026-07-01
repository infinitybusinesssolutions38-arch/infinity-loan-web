"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const titleMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/enquiries": "Loan Enquiries",
  "/admin/regular-enquiries": "Regular Enquiries",
  "/admin/salary-loan-applications": "Salary Employee Loan Applications",
  "/admin/business-loan-applications": "Business Loan Applications",
  "/admin/credit-card-applications": "Credit Card Applications",
  "/admin/google-forms": "Google Forms",
  "/admin/direct-message": "Direct Message",
  "/admin/partner-applications": "Loan Partner Applications",
  "/admin/payment-receipts": "Payment Receipts",
  "/admin/loan-applications": "Loan Applications",
  "/admin/debug": "Debug",
};

const listRoutes: Record<string, { href: string; label: string }> = {
  "/admin/users": { href: "/admin/users", label: "Users" },
  "/admin/enquiries": { href: "/admin/enquiries", label: "Loan Enquiries" },
  "/admin/regular-enquiries": { href: "/admin/regular-enquiries", label: "Regular Enquiries" },
  "/admin/salary-loan-applications": {
    href: "/admin/salary-loan-applications",
    label: "Salary Employee Loan Applications",
  },
  "/admin/business-loan-applications": {
    href: "/admin/business-loan-applications",
    label: "Business Loan Applications",
  },
  "/admin/credit-card-applications": {
    href: "/admin/credit-card-applications",
    label: "Credit Card Applications",
  },
  "/admin/google-forms": { href: "/admin/google-forms", label: "Google Forms" },
  "/admin/direct-message": { href: "/admin/direct-message", label: "Direct Message" },
  "/admin/partner-applications": {
    href: "/admin/partner-applications",
    label: "Loan Partner Applications",
  },
  "/admin/payment-receipts": {
    href: "/admin/payment-receipts",
    label: "Payment Receipts",
  },
  "/admin/loan-applications": { href: "/admin/loan-applications", label: "Loan Applications" },
};

function getPageTitle(pathname: string) {
  if (titleMap[pathname]) return titleMap[pathname];

  if (pathname.startsWith("/admin/users/")) return "User Details";
  if (pathname.startsWith("/admin/enquiries/")) return "Enquiry Details";
  if (pathname.startsWith("/admin/salary-loan-applications/")) return "Salary Loan Details";
  if (pathname.startsWith("/admin/business-loan-applications/")) return "Business Loan Details";
  if (pathname.startsWith("/admin/credit-card-applications/")) return "Credit Card Details";
  if (pathname.startsWith("/admin/partner-applications/")) return "Partner Application Details";
  if (pathname.startsWith("/admin/loan-applications/")) return "Loan Application Details";

  return "Admin";
}

function getBackNavigation(pathname: string) {
  if (pathname === "/admin/dashboard") return null;

  for (const [listPath, meta] of Object.entries(listRoutes)) {
    if (pathname.startsWith(`${listPath}/`) && pathname !== listPath) {
      return { href: listPath, label: `Back to ${meta.label}` };
    }
  }

  if (pathname.startsWith("/admin/") && pathname !== "/admin/dashboard") {
    return { href: "/admin/dashboard", label: "Back to Dashboard" };
  }

  return null;
}

export default function AdminTopbar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const back = getBackNavigation(pathname);

  return (
    <div className="admin-topbar px-5 pb-4 pt-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {back ? (
            <Link
              href={back.href}
              className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00AEEF] transition hover:text-[#008FCC] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              {back.label}
            </Link>
          ) : null}
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
