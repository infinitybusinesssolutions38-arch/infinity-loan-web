
"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const LoginClient: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const searchParams = useSearchParams();
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    useEffect(() => {
        const next = searchParams?.get("next");
        if (next && next.startsWith("/")) {
            setNextUrl(next);
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage({ type: "error", text: "Please enter email and password" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);
            const response = await axios.post("/api/login", { email, password });

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                window.dispatchEvent(new Event("auth-change"));
                setMessage({ type: "success", text: "Login successfully!" });

                setTimeout(() => {
                    if (nextUrl) {
                        window.location.href = nextUrl;
                        return;
                    }
                    window.location.href = "/";
                }, 1000);
                return;
            }

            setMessage({ type: "error", text: response.data.message || "Login failed" });
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                setMessage({ type: "error", text: "Login failed. Please try again." });
                return;
            }

            const data = error.response?.data as { message?: string; code?: string } | undefined;
            const msg =
                data?.message ||
                (error.response?.status === 401
                    ? "Invalid email or password."
                    : error.response?.status === 500
                      ? "Server error. Please try again later."
                      : "Login failed. Please try again.");

            setMessage({ type: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-background">
            {/* breadcrumb area (layout already provides navbar) */}
            <div className="bg-secondary/50 px-6 py-4 text-sm text-muted-foreground border-b border-border">
                <span className="font-semibold text-foreground">HOME</span> › <span className="font-semibold text-foreground">LOGIN</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left visual area */}
                <div className="relative overflow-hidden min-h-[420px] lg:min-h-screen">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80')" }}
                    />
                    <div className="relative z-10 p-8 lg:p-16 text-white">
                        <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-accent">Welcome back</p>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">Access your account</h2>
                        <p className="max-w-md text-primary-foreground/80">Manage your loans, check application status, and more.</p>
                    </div>

                    {/* floating animated blobs */}
                    <motion.div
                        className="absolute -top-20 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
                        animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-24 left-10 w-56 h-56 bg-cta/20 rounded-full blur-3xl"
                        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 0.9, 1] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-60 h-60 bg-primary-foreground/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Right - Card form */}
                <div className="flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.01 }}
                        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold mb-1">Login to your account</h3>
                        <p className="text-sm text-muted-foreground mb-6">Enter email and password to continue</p>

                        {message && (
                            <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-[#00AEEF] text-white font-semibold disabled:opacity-50 shadow-glow-cta"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-muted-foreground mt-4">
                          Create New Account?{" "}
                          <Link href="/register" className="text-primary hover:underline">
                            Register
                          </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LoginClient;
