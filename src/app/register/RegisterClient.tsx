"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";

const RegisterClient: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [otpStep, setOtpStep] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (!otpStep) {
            setOtp("");
        }
    }, [otpStep]);

    const handleStartRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedEmail = String(email || "").trim().toLowerCase();

        if (!fullName.trim() || !normalizedEmail || !mobile.trim() || !password || !confirmPassword) {
            setMessage({ type: "error", text: "Please fill all fields" });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "Password and confirm password do not match" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const res = await axios.post("/api/send-otp", { email: normalizedEmail });

            if (res.data?.success) {
                setOtpStep(true);
                setMessage({ type: "success", text: "OTP sent to your email" });
                return;
            }

            setMessage({ type: "error", text: res.data?.message || "Failed to send OTP" });
        } catch (error) {
            const msg = axios.isAxiosError(error)
                ? (error.response?.data as any)?.message || error.message
                : "Failed to send OTP. Please try again.";
            setMessage({ type: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedEmail = String(email || "").trim().toLowerCase();

        if (!otp.trim()) {
            setMessage({ type: "error", text: "Please enter OTP" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const res = await axios.post("/api/register", {
                fullName: fullName.trim(),
                email: normalizedEmail,
                mobile: mobile.trim(),
                password,
                otp: otp.trim(),
            });

            if (res.data?.success) {
                setMessage({ type: "success", text: "Registration successful! Taking you to the home page..." });

                try {
                    const loginRes = await axios.post("/api/login", {
                        email: normalizedEmail,
                        password,
                    });
                    if (loginRes.data?.success && loginRes.data?.token) {
                        localStorage.setItem("token", loginRes.data.token);
                        window.dispatchEvent(new Event("auth-change"));
                    }
                } catch {
                    // Registration succeeded; still send user to home even if auto-login fails.
                }

                setTimeout(() => {
                    window.location.href = "/";
                }, 900);
                return;
            }

            setMessage({ type: "error", text: res.data?.message || "Registration failed" });
        } catch (error) {
            const msg = axios.isAxiosError(error)
                ? (error.response?.data as any)?.message || error.message
                : "Registration failed. Please try again.";
            setMessage({ type: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        const normalizedEmail = String(email || "").trim().toLowerCase();
        if (!normalizedEmail) {
            setMessage({ type: "error", text: "Please enter email" });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const res = await axios.post("/api/send-otp", { email: normalizedEmail });
            if (res.data?.success) {
                setMessage({ type: "success", text: "OTP resent to your email" });
                return;
            }

            setMessage({ type: "error", text: res.data?.message || "Failed to resend OTP" });
        } catch (error) {
            const msg = axios.isAxiosError(error)
                ? (error.response?.data as any)?.message || error.message
                : "Failed to resend OTP. Please try again.";
            setMessage({ type: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-background">
            <div className="bg-secondary/50 px-6 py-4 text-sm text-muted-foreground border-b border-border">
                <span className="font-semibold text-foreground">HOME</span> › <span className="font-semibold text-foreground">REGISTER</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden min-h-[420px] lg:min-h-screen">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80')" }}
                    />
                    <div className="relative z-10 p-8 lg:p-16 text-white">
                        <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-accent">Get started</p>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">Create your account</h2>
                        <p className="max-w-md text-primary-foreground/80">Register with your email, verify OTP, and then login to continue.</p>
                    </div>

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
                        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.01 }}
                        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold mb-1">Create your account</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            {otpStep ? "Enter OTP to verify your email" : "Enter your details to continue"}
                        </p>

                        {message && (
                            <div
                                className={`mb-4 p-3 rounded-lg text-sm ${
                                    message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                            >
                                {message.text}
                            </div>
                        )}

                        {!otpStep ? (
                            <form onSubmit={handleStartRegistration} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

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
                                    <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
                                    <Input
                                        id="mobile"
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-[#00AEEF]  text-white font-semibold disabled:opacity-50 shadow-glow-cta"
                                >
                                    {loading ? "Sending OTP..." : "Submit"}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">OTP</label>
                                    <Input
                                        id="otp"
                                        type="text"
                                        placeholder="6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOtpStep(false);
                                            setMessage(null);
                                        }}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Change Details
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className="text-sm text-primary hover:underline disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-[#00AEEF]  text-white font-semibold disabled:opacity-50 shadow-glow-cta"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>
                            </form>
                        )}

                        <p className="text-center text-sm text-muted-foreground mt-4">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Login
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RegisterClient;
