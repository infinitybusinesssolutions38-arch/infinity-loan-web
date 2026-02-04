"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        <section className="h-full lg:min-h-screen bg-gray-50">
            <div className="flex justify-center pt-5 md:pt-20">
                <div className="flex flex-col rounded-2xl overflow-hidden w-full max-w-xl">
                    <div className="bg-white shadow-md rounded-2xl mx-4 lg:mx-0 p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-5">Register</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <LabelInputContainer>
                                <Label htmlFor="role">Register As</Label>
                                <select
                                    id="role"
                                    {...register("role", { required: true })}
                                    className={cn(
                                        "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900"
                                    )}
                                >
                                    <option value="borrower-personal">Borrower - Personal</option>
                                    <option value="borrower-business">Borrower - Business</option>
                                    <option value="lender-individual">Lender - Individual</option>
                                    <option value="lender-organization">Lender - Organization</option>
                                    <option value="lender-nri">Lender - NRI</option>
                                    <option value="lender-huf">Lender - HUF</option>
                                </select>
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", { required: true })}
                                    className="border border-gray-300"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="mobile">Mobile (optional)</Label>
                                <Input
                                    id="mobile"
                                    type="text"
                                    placeholder="9876543210"
                                    {...register("mobile")}
                                    className="border border-gray-300"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password", { required: true })}
                                    className="border border-gray-300"
                                />
                            </LabelInputContainer>

                            {(errors.role || errors.email || errors.password) && (
                                <p className="text-red-500 text-sm">
                                    Please fill all required fields.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white mt-4"
                            >
                                {loading ? "Creating account..." : "Register →"}
                                <BottomGradient />
                            </button>

                            <div className="text-sm text-gray-600 pt-2">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
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
