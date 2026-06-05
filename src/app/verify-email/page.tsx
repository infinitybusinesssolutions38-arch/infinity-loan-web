"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link");
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await axios.get(`/api/verify-email?token=${token}`);
                if (res.data?.success) {
                    setStatus("success");
                    setMessage(res.data.message || "Email verified successfully. Your account is now active.");
                } else {
                    setStatus("error");
                    setMessage(res.data?.message || "Verification failed");
                }
            } catch (error) {
                const msg = axios.isAxiosError(error)
                    ? (error.response?.data as any)?.message || error.message
                    : "Verification failed. Please try again.";
                setStatus("error");
                setMessage(msg);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 text-center"
        >
            {status === "loading" && (
                <>
                    <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <h3 className="text-2xl font-bold mb-2">Verifying your email...</h3>
                    <p className="text-sm text-muted-foreground">Please wait while we verify your email address.</p>
                </>
            )}

            {status === "success" && (
                <>
                    <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Email Verified Successfully</h3>
                    <p className="text-sm text-muted-foreground mb-6">{message}</p>
                    <Link
                        href="/login"
                        className="inline-block py-3 px-8 rounded-xl bg-[#00AEEF] text-white font-semibold shadow-glow-cta hover:opacity-90 transition-opacity"
                    >
                        Go to Login
                    </Link>
                </>
            )}

            {status === "error" && (
                <>
                    <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Verification Failed</h3>
                    <p className="text-sm text-muted-foreground mb-6">{message}</p>
                    <div className="space-y-3">
                        <Link
                            href="/register"
                            className="inline-block py-3 px-8 rounded-xl bg-[#00AEEF] text-white font-semibold shadow-glow-cta hover:opacity-90 transition-opacity"
                        >
                            Register Again
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            or{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Login to your account
                            </Link>
                        </p>
                    </div>
                </>
            )}
        </motion.div>
    );
}

const VerifyEmailPage: React.FC = () => {
    return (
        <section className="min-h-screen bg-background">
            <div className="bg-secondary/50 px-6 py-4 text-sm text-muted-foreground border-b border-border">
                <span className="font-semibold text-foreground">HOME</span> › <span className="font-semibold text-foreground">VERIFY EMAIL</span>
            </div>

            <div className="flex items-center justify-center p-8 min-h-[calc(100vh-60px)]">
                <Suspense fallback={
                    <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <h3 className="text-2xl font-bold mb-2">Loading...</h3>
                    </div>
                }>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </section>
    );
};

export default VerifyEmailPage;
