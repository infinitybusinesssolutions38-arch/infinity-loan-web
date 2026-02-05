"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type LoginData = {
    email: string;
    otp: string;
};

const LoginClient = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    useEffect(() => {
        const next = searchParams?.get("next");
        if (next && next.startsWith("/")) {
            setNextUrl(next);
        }
    }, [searchParams]);

    const onSubmit = async (data: LoginData) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/login", data);
            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                alert("Login successful!");
                console.log(response.data.token);

                if (nextUrl) {
                    window.location.href = nextUrl;
                    return;
                }

                window.location.href = "/";
            } else {
                alert(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed, please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-white">
            {/* breadcrumb area (layout already provides navbar) */}
            <div className="bg-gray-50 px-6 py-4 text-sm text-gray-700">
                <span className="font-semibold">HOME</span> › <span className="font-semibold">LOGIN</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left visual area */}
                <div className="relative overflow-hidden min-h-[420px] lg:min-h-screen">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80')" }}
                    />
                    <div className="relative z-10 p-8 lg:p-16 text-white">
                        <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-blue-400">Welcome back</p>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">Access your account</h2>
                        <p className="max-w-md text-gray-200">Manage your loans, check application status, and more.</p>
                    </div>

                    {/* floating animated blobs */}
                    <motion.div
                        className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
                        animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-24 left-10 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl"
                        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 0.9, 1] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Right - Card form */}
                <div className="flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.01 }}
                        className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold mb-1">Login to your account</h3>
                        <p className="text-sm text-gray-600 mb-6">Enter email and OTP to continue</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <Input id="email" type="email" placeholder="you@example.com" {...register("email", { required: true })} className="w-full" />
                                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                                <Input id="otp" type="text" placeholder="6-digit OTP" {...register("otp", { required: true })} className="w-full" />
                                {errors.otp && <p className="text-red-500 text-sm mt-1">OTP is required</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input type="checkbox" className="w-4 h-4" /> Remember me
                                </label>
                                <a href="#" className="text-sm text-blue-600">Forgot OTP?</a>
                            </div>

                            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-4">Don't have an account? <a href="/apply-now" target="_blank" rel="noopener noreferrer" className="text-blue-600">Apply Now</a></p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LoginClient;
