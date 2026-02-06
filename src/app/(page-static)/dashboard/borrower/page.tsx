"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null = loading

    const checkUser = async () => {
        try {
            const res = await axios.get("/api/auth/me", { withCredentials: true });
            const user = res.data.user;

            if (!user) {
                router.push("/login");
                return;
            }

            if (user.role === "borrower-personal") {
                setIsAuthorized(true); // ✅ allow access
            } else {
                setIsAuthorized(false); // 🚫 block
                router.push("/"); // redirect to home (or unauthorized page)
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            router.push("/login");
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // 🌀 While checking user
    if (isAuthorized === null) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl text-center">
                <h3 className="text-2xl font-semibold text-foreground">
                    Checking access...
                </h3>
                </div>
            </div>
        );
    }

    // ✅ Only show if authorized
    if (isAuthorized) {
        return (
            <main className="min-h-screen bg-background">
                <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-10">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cta/20 blur-3xl" />
                    </div>
                    <div className="container relative z-10 mx-auto px-4">
                        <h3 className="text-center font-bold text-3xl text-primary-foreground">
                            Personal Borrower Dashboard
                        </h3>
                    </div>
                </section>

                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                            <p className="text-md font-medium text-foreground">
                                Welcome, Personal Borrower! You can view and manage borrowers here.
                            </p>
                            <p className="mt-3 text-md font-medium text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo debitis
                                ratione excepturi non eos consequuntur hic nemo autem quisquam, qui
                                perferendis magnam ab ex minima officiis sapiente saepe et.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // 🚫 Not authorized (briefly shown before redirect)
    return null;
};

export default Page;
