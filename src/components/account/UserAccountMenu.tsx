"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, LogOut, Menu, Upload, User, X } from "lucide-react";

type AuthUser = {
    id: string;
    fullName: string;
    email: string;
    mobile?: string;
    profileImageUrl?: string;
};

export default function UserAccountMenu() {
    const pathname = usePathname();
    const panelRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [hasPendingDocs, setHasPendingDocs] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        try {
            const meRes = await fetch("/api/auth/me", { credentials: "include" });
            const meData = await meRes.json();
            const authUser = meData.user || null;
            setUser(authUser);

            if (authUser) {
                const pendingRes = await fetch("/api/profile/pending-documents", {
                    credentials: "include",
                });
                const pendingData = pendingRes.ok ? await pendingRes.json() : { hasPending: false };
                setHasPendingDocs(Boolean(pendingData.hasPending));
            } else {
                setHasPendingDocs(false);
                localStorage.removeItem("token");
            }
        } catch {
            setUser(null);
            setHasPendingDocs(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        loadUser();
    }, [loadUser]);

    useEffect(() => {
        const onAuthChange = () => {
            setLoading(true);
            loadUser();
        };
        window.addEventListener("storage", onAuthChange);
        window.addEventListener("auth-change", onAuthChange);
        return () => {
            window.removeEventListener("storage", onAuthChange);
            window.removeEventListener("auth-change", onAuthChange);
        };
    }, [loadUser]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
        } catch {}
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("auth-change"));
        setOpen(false);
        window.location.href = "/login";
    };

    const initials = (user?.fullName || user?.email || "U")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

    const menuItems = [
        { href: "/profile", label: "My Profile", icon: User },
        { href: "/applied-loans", label: "Applied Loans", icon: FileText },
        ...(hasPendingDocs
            ? [{ href: "/upload-documents", label: "Upload Remaining Documents", icon: Upload }]
            : []),
    ];

    if (loading) {
        return (
            <div
                className="h-11 w-11 shrink-0 rounded-xl border border-[#D6EEF8] bg-[#F7F9FC]"
                aria-hidden
            />
        );
    }

    if (!user) return null;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] px-2 text-[#00AEEF] transition-all duration-300 hover:border-[#00AEEF]/30 hover:bg-[#F7F9FC] sm:px-3"
                aria-label="Open account menu"
                aria-expanded={open}
            >
                {user.profileImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.profileImageUrl}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                    />
                ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F7FD] text-xs font-bold text-[#00AEEF]">
                        {initials}
                    </span>
                )}
                <Menu className="h-5 w-5 shrink-0" />
            </button>

            <div
                className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
                aria-hidden={!open}
            >
                <div
                    className={`absolute inset-0 bg-[#0F172A]/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setOpen(false)}
                />
                <div
                    ref={panelRef}
                    className={`absolute right-0 top-0 flex h-full w-[min(360px,92vw)] flex-col border-l border-[#D6EEF8] bg-white shadow-[-8px_0_32px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Account menu"
                >
                    <div className="flex items-center justify-between border-b border-[#D6EEF8] px-5 py-4">
                        <p className="text-sm font-semibold text-[#1A1A1A]">My Account</p>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#374151] hover:bg-[#F7F9FC]"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="border-b border-[#D6EEF8] bg-gradient-to-b from-[#E6F7FD] to-white px-5 py-6">
                        <div className="flex items-center gap-4">
                            {user.profileImageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={user.profileImageUrl}
                                    alt=""
                                    className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
                                />
                            ) : (
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00AEEF] text-lg font-bold text-white">
                                    {initials}
                                </span>
                            )}
                            <div className="min-w-0">
                                <p className="truncate text-base font-bold text-[#1A1A1A]">
                                    {user.fullName || "User"}
                                </p>
                                <p className="truncate text-sm text-[#6B7280]">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active =
                                pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                        active
                                            ? "bg-[#E6F7FD] text-[#00AEEF]"
                                            : "text-[#374151] hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-[#D6EEF8] p-4">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00AEEF] bg-[#00AEEF] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#008FCC]"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
