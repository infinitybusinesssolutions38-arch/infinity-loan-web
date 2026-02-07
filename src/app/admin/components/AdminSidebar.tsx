"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/enquiries", label: "Loan Enquiries" },
  { href: "/admin/loan-applications", label: "Loan Applications" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 md:block">
      <div className="rounded-3xl border border-border/70 bg-card/70 p-4 shadow-sm backdrop-blur">
        <div className="px-2 py-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Panel</div>
          <div className="mt-1 text-lg font-bold leading-none">Infinity Loans</div>
          <div className="mt-2 h-px bg-border/70" />
        </div>

        <nav className="mt-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "group flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition " +
                  (active
                    ? "bg-gradient-to-r from-cta/20 via-accent/10 to-transparent text-foreground ring-1 ring-border/70"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground")
                }
              >
                <span>{item.label}</span>
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full transition " +
                    (active ? "bg-cta" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50")
                  }
                />
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-border/70 pt-4">
          <Link
            href={"/admin/logout"}
            className="block rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
          >
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
}
