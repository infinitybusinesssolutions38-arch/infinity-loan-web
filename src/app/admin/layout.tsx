"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import "./admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell text-foreground">
      <div className="admin-layout mx-auto flex h-full w-full max-w-7xl gap-4 px-4 py-5 md:gap-6 md:px-6 md:py-6">
        <AdminSidebar />

        <div className="admin-main min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain pb-6">
          <div className="mb-4 md:mb-6">
            <AdminTopbar />
          </div>

          <main>
            <div className="admin-content-card p-4 md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
