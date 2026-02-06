"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BorrowerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("/api/auth/me").then((res) => {
            if (!res.data.user) router.push("/login");
            else if (!res.data.user.role.startsWith("borrower-personal")) router.push("/unauthorized");
            else setUser(res.data.user);
        });
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl text-center">
                    <p className="text-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cta/20 blur-3xl" />
                </div>
                <div className="container relative z-10 mx-auto px-4">
                    <h1 className="text-center text-3xl font-bold text-primary-foreground">Welcome Borrower {user}</h1>
                </div>
            </section>
        </main>
    );
}
