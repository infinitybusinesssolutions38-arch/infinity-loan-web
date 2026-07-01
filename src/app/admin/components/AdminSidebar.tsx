"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  CreditCard,
  FileSpreadsheet,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Receipt,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  activeBg: string;
  hoverBg: string;
  iconBg: string;
};

const nav: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    accent: "#00AEEF",
    activeBg: "#E6F7FD",
    hoverBg: "#EEF9FE",
    iconBg: "rgba(0, 174, 239, 0.12)",
  },
  {
    href: "/admin/enquiries",
    label: "Loan Enquiries",
    icon: Mail,
    accent: "#33C1F3",
    activeBg: "#E3F2FD",
    hoverBg: "#F0F8FF",
    iconBg: "rgba(0, 174, 239, 0.12)",
  },
  {
    href: "/admin/regular-enquiries",
    label: "Regular Enquiries",
    icon: MessageSquare,
    accent: "#16A34A",
    activeBg: "#DCFCE7",
    hoverBg: "#F0FDF4",
    iconBg: "rgba(22, 163, 74, 0.12)",
  },
  {
    href: "/admin/salary-loan-applications",
    label: "Salary employee Loan application",
    icon: Wallet,
    accent: "#0D9488",
    activeBg: "#CCFBF1",
    hoverBg: "#F0FDFA",
    iconBg: "rgba(13, 148, 136, 0.12)",
  },
  {
    href: "/admin/business-loan-applications",
    label: "Business Loan application",
    icon: BriefcaseBusiness,
    accent: "#00AEEF",
    activeBg: "#FFEDD5",
    hoverBg: "#FFF7ED",
    iconBg: "rgba(249, 115, 22, 0.12)",
  },
  {
    href: "/admin/payment-receipts",
    label: "Payment Receipt",
    icon: Receipt,
    accent: "#0D9488",
    activeBg: "#CCFBF1",
    hoverBg: "#F0FDFA",
    iconBg: "rgba(13, 148, 136, 0.12)",
  },
  {
    href: "/admin/credit-card-applications",
    label: "Credit Card application",
    icon: CreditCard,
    accent: "#8B5CF6",
    activeBg: "#EDE9FE",
    hoverBg: "#F5F3FF",
    iconBg: "rgba(139, 92, 246, 0.12)",
  },
  {
    href: "/admin/google-forms",
    label: "Google Forms",
    icon: FileSpreadsheet,
    accent: "#00AEEF",
    activeBg: "#E6F7FD",
    hoverBg: "#EEF9FE",
    iconBg: "rgba(0, 174, 239, 0.12)",
  },
  {
    href: "/admin/direct-message",
    label: "Direct Message",
    icon: Mail,
    accent: "#14B8A6",
    activeBg: "#D1FAE5",
    hoverBg: "#ECFDF5",
    iconBg: "rgba(20, 184, 166, 0.14)",
  },
  {
    href: "/admin/partner-applications",
    label: "Loan Partner application",
    icon: Handshake,
    accent: "#F59E0B",
    activeBg: "#FEF3C7",
    hoverBg: "#FFFBEB",
    iconBg: "rgba(245, 158, 11, 0.14)",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar-col hidden w-72 shrink-0 md:block">
      <div className="admin-sidebar flex h-[calc(100dvh-3rem)] flex-col overflow-hidden">
        <div className="admin-sidebar-header shrink-0">
          <div className="admin-sidebar-logo-wrap">
            <div className="admin-sidebar-logo">
              <Image
                src="/infinity-logo.png"
                alt="Infinity Loans & Business Solutions"
                width={40}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                Admin Panel
              </div>
              <div className="truncate text-sm font-bold leading-tight text-white">
                Infinity Loans & Business Solutions
              </div>
            </div>
          </div>
        </div>

        <nav className="admin-sidebar-nav mt-2 min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 py-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"admin-nav-link " + (active ? "is-active" : "")}
                style={
                  {
                    "--nav-accent": item.accent,
                    "--nav-active-bg": item.activeBg,
                    "--nav-hover-bg": item.hoverBg,
                    "--nav-icon-bg": item.iconBg,
                  } as CSSProperties
                }
              >
                <span className="admin-nav-icon">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
                <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-[#D6EEF8]/80 px-2 py-3">
          <Link href="/admin/logout" className="admin-logout">
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
