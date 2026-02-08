"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";

type ApplyNowData = {
    product: string;
    mobile: string;
    email: string;
    pan: string;
};

const ApplyNowPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplyNowData>({
        defaultValues: {
            product: "msme-sme-loan",
        },
    });

    const [loading, setLoading] = useState(false);

    const products = [
        { value: "msme-sme-loan", label: "MSME / SME Loan" },
        { value: "working-capital", label: "Working Capital" },
        { value: "overdraft-cc", label: "Overdraft / CC" },
        { value: "invoice-discounting", label: "Invoice Discounting" },
        { value: "machinery-loan", label: "Machinery Loan" },
        { value: "personal-loan", label: "Personal Loan" },
        { value: "instant-loan", label: "Instant Loan" },
        { value: "education-loan", label: "Education Loan" },
        { value: "medical-loan", label: "Medical Loan" },
        { value: "home-loan", label: "Home Loan" },
        { value: "loan-against-property", label: "Loan Against Property" },
        { value: "plot-construction-loan", label: "Plot / Construction Loan" },
        { value: "car-loan", label: "Car Loan" },
        { value: "two-wheeler-loan", label: "Two-Wheeler Loan" },
        { value: "commercial-vehicle-loan", label: "Commercial Vehicle Loan" },
        { value: "ev-loan", label: "EV Loan" },
        { value: "gold-loan", label: "Gold Loan" },
        { value: "loan-against-securities", label: "Loan Against Securities" },
    ];

    const onSubmit = async (data: ApplyNowData) => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/apply-now",
                {
                    product: data.product,
                    mobile: data.mobile,
                    email: data.email,
                    pan: data.pan,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            if (response.data?.success) {
                alert("Application submitted successfully!");
                window.location.href = "/";
            } else {
                alert(response.data?.message || "Application submission failed");
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Application failed, please try again.";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">

            {/* Breadcrumb */}
            <div className="bg-gray-100 px-6 py-4 text-sm text-gray-700">
                <span className="font-semibold">HOME</span> › <span className="font-semibold">APPLY FOR LOAN</span>
            </div>

            {/* Main Content add changes*/}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Content */}
                <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col justify-center items-start p-8 lg:p-16 min-h-[500px] lg:min-h-screen">
                    {/* Background Image Overlay */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    <div className="relative z-10 text-white">
                        <p className="text-lg font-semibold uppercase tracking-wider mb-4 text-blue-400">
                            APPLY FOR A LOAN
                        </p>
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                            TURN YOUR DREAMS <br /> INTO A REALITY
                        </h1>
                        <p className="text-lg text-gray-300 max-w-md">
                            Get quick access to funds with flexible terms and competitive rates. Our simple application process gets you approved faster.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
                    {/* Form */}
                    
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label htmlFor="product" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Product<span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="product"
                                    {...register("product", { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    {products.map((product) => (
                                        <option key={product.value} value={product.value}>
                                            {product.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.product && (
                                    <p className="text-red-500 text-sm mt-1">Product is required</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mobile number<span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="mobile"
                                    type="text"
                                    placeholder="9876543210"
                                    {...register("mobile", { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.mobile && (
                                    <p className="text-red-500 text-sm mt-1">Mobile number is required</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">Email is required</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="pan" className="block text-sm font-semibold text-gray-700 mb-2">
                                    PAN<span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="pan"
                                    type="text"
                                    placeholder="ABCDE1234F"
                                    {...register("pan", { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.pan && (
                                    <p className="text-red-500 text-sm mt-1">PAN is required</p>
                                )}
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-start gap-3 py-4">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 w-5 h-5 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    By proceeding I agree to{" "}
                                    <a href="#" className="text-blue-600 hover:underline font-semibold">
                                        Terms and Conditions
                                    </a>{" "}
                                    and have read/understood approach for gradation of risk.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                            >
                                {loading ? "Processing..." : "NEXT"}
                            </button>
                        </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center text-sm">
                <p>© 2026 Infinity Loans. All rights reserved. | Privacy Policy | Terms & Conditions</p>
            </footer>
        </div>
    );
};

export default ApplyNowPage;
