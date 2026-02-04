"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type LoginData = {
    identifier: string; // email or mobile
    password: string;
};

const LoginClient = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const [loading, setLoading] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const toggleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const onSubmit = async (data: LoginData) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/login", data);
            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                alert("Login successful!");
                console.log(response.data.token);

                // MANUAL REDIRECTS BASED ON USER ROLE
                const role = response.data.role;

                const next = searchParams?.get("next");
                if (next && next.startsWith("/")) {
                    window.location.href = next;
                    return;
                }

                switch (role) {
                    case "lender-individual":
                        window.location.href = "/dashboard/lender";
                        break;
                    case "lender-organization":
                        window.location.href = "/dashboard/lender";
                        break;
                    case "lender-nri":
                        window.location.href = "/dashboard/lender";
                        break;
                    case "lender-huf":
                        window.location.href = "/dashboard/lender";
                        break;
                    case "borrower-personal":
                        window.location.href = "/dashboard/borrower";
                        break;
                    case "borrower-business":
                        window.location.href = "/dashboard/borrower";
                        break;
                    default:
                        window.location.href = "/dashboard";
                }
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
        <section className="h-full lg:min-h-screen bg-gray-50">
            <div className="flex justify-center pt-5 md:pt-20">
                <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-6xl">
                    {/* LEFT SIDE */}
                    <div className="md:w-1/2 bg-white shadow-md lg:rounded-l-2xl h-full mx-4 lg:mx-0 p-8 overflow-y-auto">
                        <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-5">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email or Mobile */}
                            <LabelInputContainer>
                                <Label htmlFor="identifier">Email or Mobile Number</Label>
                                <Input
                                    id="identifier"
                                    type="text"
                                    placeholder="you@example.com or 9876543210"
                                    {...register("identifier", { required: true })}
                                    className="border border-gray-300"
                                />
                                {errors.identifier?.message && (
                                    <p className="text-red-500 text-md mt-2">{errors.identifier.message}</p>
                                )}
                            </LabelInputContainer>

                            {/* Password */}
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

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white mt-4"
                            >
                                {loading ? "Logging in..." : "Login →"}
                                <BottomGradient />
                            </button>
                        </form>
                    </div>

                    {/* DIVIDER */}
                    <div className="w-px hidden lg:h-[80%] my-4 bg-gray-300" />

                    {/* RIGHT SIDE */}
                    <div className="md:w-1/2 bg-white mb-4 lg:mb-0 shadow-md lg:rounded-r-2xl mx-4 lg:mx-0 p-8 flex flex-col justify-start">
                        <h2 className="text-3xl lg:block hidden font-bold text-gray-800 mb-4">
                            Welcome to Fortune Loans
                        </h2>
                        <p className="lg:block hidden text-gray-600 mb-6">
                            Choose your role below and start your journey with us.
                        </p>

                        {/* Role Buttons */}
                        <div className="flex md:flex-row flex-col gap-4">
                            <div className="relative w-full">
                                <button
                                    onClick={() => toggleDropdown("lender")}
                                    className="px-4 py-3 text-center w-full font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                                >
                                    Register as a Lender
                                </button>

                                {openDropdown === "lender" && (
                                    <div className="absolute left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10">
                                        <Link
                                            href="/register/lender/individual"
                                            className="px-4 py-2 hover:bg-blue-50"
                                        >
                                            Individual
                                        </Link>
                                        <Link
                                            href="/register/lender/organization"
                                            className="px-4 py-2 hover:bg-blue-50"
                                        >
                                            Organization
                                        </Link>
                                        <Link href="/register/lender/nri" className="px-4 py-2 hover:bg-blue-50">
                                            NRI
                                        </Link>
                                        <Link href="/register/lender/huf" className="px-4 py-2 hover:bg-blue-50">
                                            HUF
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="relative w-full">
                                <button
                                    onClick={() => toggleDropdown("borrower")}
                                    className="px-4 py-3 text-center w-full font-semibold text-white bg-green-600 rounded-md hover:bg-green-800 transition-all"
                                >
                                    Register as a Borrower
                                </button>

                                {openDropdown === "borrower" && (
                                    <div className="absolute left-0 right-0 flex flex-col bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10">
                                        <Link
                                            href="/register/borrower/personal"
                                            className="px-4 py-2 hover:bg-green-50"
                                        >
                                            Personal
                                        </Link>
                                        <Link
                                            href="/register/borrower/business"
                                            className="px-4 py-2 hover:bg-green-50"
                                        >
                                            Business
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginClient;

/* === Utility Components === */
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
