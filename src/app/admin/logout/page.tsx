"use client";

import { useEffect } from "react";

export default function AdminLogoutPage() {
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          credentials: "include",
        });
      } finally {
        window.location.href = "/admin/login";
      }
    })();
  }, []);

  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
      <div className="text-sm text-muted-foreground">Logging out...</div>
    </div>
  );
}
