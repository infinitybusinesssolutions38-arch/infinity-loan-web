"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_circle_at_10%_0%,hsl(var(--primary)/0.10),transparent_55%),radial-gradient(900px_circle_at_90%_10%,hsl(var(--accent)/0.10),transparent_55%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl gap-4 px-4 py-5 md:gap-6 md:px-6 md:py-8">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <div className="sticky top-4 z-10">
            <AdminTopbar />
          </div>

          <main className="mt-4 md:mt-6">
            <div className="rounded-3xl border border-border/70 bg-card/60 p-4 shadow-sm backdrop-blur md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
