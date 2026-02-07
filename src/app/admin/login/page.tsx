"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Login failed");
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_circle_at_15%_10%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(900px_circle_at_85%_20%,hsl(var(--accent)/0.12),transparent_55%)]" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-stretch gap-6 px-4 py-10 md:grid-cols-2 md:gap-8 md:px-6">
        <div className="hidden overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-sm md:block">
          <div className="relative h-full p-10 text-primary-foreground">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Infinity Loans</div>
            <div className="mt-3 text-3xl font-bold tracking-tight">Admin Console</div>
            <div className="mt-3 max-w-md text-sm text-primary-foreground/80">
              Sign in to manage users, enquiries, and loan applications.
            </div>

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cta/30 blur-3xl" />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin</div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">Sign in</h1>
              <div className="mt-2 text-sm text-muted-foreground">Use your admin credentials to continue.</div>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none ring-0 transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="admin@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm outline-none ring-0 transition focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cta via-cta to-accent px-4 py-3 text-sm font-semibold text-cta-foreground shadow-glow-cta transition hover:opacity-95 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-xs text-muted-foreground">
              Seed first admin via: <span className="font-mono">POST /api/admin/seed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
