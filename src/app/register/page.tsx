"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type RegisterData = {
    role: string;
    email: string;
    mobile?: string;
    password: string;
};

const RegisterPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        defaultValues: {
            role: "borrower-personal",
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterData) => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/register",
                {
                    role: data.role,
                    email: data.email,
                    mobile: data.mobile || undefined,
                    password: data.password,
                },
                { withCredentials: true }
            );

            if (response.data?.success) {
                localStorage.setItem("token", response.data.token);
                alert("Registration successful!");

                const role = response.data.role;
                switch (role) {
                    case "lender-individual":
                    case "lender-organization":
                    case "lender-nri":
                    case "lender-huf":
                        window.location.href = "/dashboard/lender";
                        break;
                    case "borrower-personal":
                    case "borrower-business":
                        window.location.href = "/dashboard/borrower";
                        break;
                    default:
                        window.location.href = "/dashboard";
                }
            } else {
                alert(response.data?.message || "Registration failed");
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Registration failed, please try again.";
            alert(message);
        } finally {
            setLoading(false);
        }
    };
return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-400/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <div className="relative flex justify-center pt-5 md:pt-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-xl"
                >
                    <motion.div
                        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl mx-4 lg:mx-0 p-8 border border-white/20"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-600 mb-6">Join us and start your journey</p>
                        </motion.div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <LabelInputContainer>
                                    <Label htmlFor="role" className="text-gray-700 font-medium">Register As</Label>
                                    <motion.select
                                        id="role"
                                        {...register("role", { required: true })}
                                        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer"
                                        whileFocus={{ scale: 1.01 }}
                                    >
                                        <option value="borrower-personal">Borrower - Personal</option>
                                        <option value="borrower-business">Borrower - Business</option>
                                        <option value="lender-individual">Lender - Individual</option>
                                        <option value="lender-organization">Lender - Organization</option>
                                        <option value="lender-nri">Lender - NRI</option>
                                        <option value="lender-huf">Lender - HUF</option>
                                    </motion.select>
                                </LabelInputContainer>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <LabelInputContainer>
                                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                                    <motion.div whileFocus={{ scale: 1.01 }}>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            {...register("email", { required: true })}
                                            className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                        />
                                    </motion.div>
                                </LabelInputContainer>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <LabelInputContainer>
                                    <Label htmlFor="mobile" className="text-gray-700 font-medium">Mobile (optional)</Label>
                                    <motion.div whileFocus={{ scale: 1.01 }}>
                                        <Input
                                            id="mobile"
                                            type="text"
                                            placeholder="9876543210"
                                            {...register("mobile")}
                                            className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                        />
                                    </motion.div>
                                </LabelInputContainer>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <LabelInputContainer>
                                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                                    <motion.div whileFocus={{ scale: 1.01 }}>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            {...register("password", { required: true })}
                                            className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                        />
                                    </motion.div>
                                </LabelInputContainer>
                            </motion.div>

                            {(errors.role || errors.email || errors.password) && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm"
                                >
                                    Please fill all required fields.
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="relative block h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 font-semibold text-white mt-6 overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                                <span className="relative z-10">
                                    {loading ? (
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="inline-block"
                                        >
                                            ⟳
                                        </motion.span>
                                    ) : (
                                        "Register →"
                                    )}
                                </span>
                            </motion.button>

                            <motion.div
                                className="text-sm text-gray-600 pt-4 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Already have an account?{" "}
                                <motion.a
                                    href="/login"
                                    className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.a>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default RegisterPage;

const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
);

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => <div className={cn("flex flex-col w-full space-y-2", className)}>{children}</div>;
