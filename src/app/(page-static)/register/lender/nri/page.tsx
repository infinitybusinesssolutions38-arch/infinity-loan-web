"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import img1 from "@/app/components/images/farmar.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    otp: string;
    password: string;
    country: string;
    mobile: string;
    agree: boolean;
};



const NriSignupForm = () => {
    const [countries, setCountries] = useState([]);

    const router = useRouter();
    useEffect(() => {
        // ✅ Check if the user is already logged in
        const checkUser = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                if (res.data.user) {
                    console.log("User found:", res.data.user);
                    router.push("/dashboard/lender"); // Redirect logged-in user
                } else {
                    console.log("No user logged in");
                    // setLoading(false);
                }
            } catch (err) {
                console.log("Auth check failed:", err);
                // setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post('/api/nri-loan', data);
            console.log(res.data);
            if (res.data.success === true) {
                alert("Registration successful!");
                reset();
            }
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await fetch("/data/countries.json");
            const data = await res.json();
            setCountries(data.countries);
        };

        fetchCountries();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl">
                {/* LEFT SIDE - Info Section */}
                <div className="md:w-1/2 bg-white shadow-md rounded-l-2xl p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Register as an NRI Lender
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Join our international community of lenders and invest securely in
                        India’s growing financial market with Fortune Loans.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                        <li>✅ Invest from anywhere in the world</li>
                        <li>✅ Secure transactions and high transparency</li>
                        <li>✅ Flexible loan options for global investors</li>
                    </ul>
                    <div className="flex mt-6">
                        <Image
                            src={img1}
                            alt="NRI Lender"
                            className="w-full h-60 rounded-md object-cover"
                        />
                    </div>
                </div>

                {/* Divider Line */}
                <div className="w-px h-[80%] my-4 bg-gray-300" />

                {/* RIGHT SIDE - Form Section */}
                <div className="md:w-1/2 bg-white shadow-md rounded-r-2xl p-8">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                        NRI Lender Registration
                    </h2>
                    <p className="text-sm text-neutral-600 mb-6">
                        Sign up to start lending and managing investments online.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* First & Last Name */}
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder="John"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("firstname", { required: true })}
                                />
                                {errors.firstname && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder="Doe"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("lastname", { required: true })}
                                />
                                {errors.lastname && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>
                        </div>

                        {/* Email */}
                        <LabelInputContainer>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="border border-gray-300 bg-gray-100"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* OTP */}
                        <LabelInputContainer>
                            <Label htmlFor="otp">Enter OTP (sent via email)</Label>
                            <Input
                                id="otp"
                                type="text"
                                placeholder="123456"
                                className="border border-gray-300 bg-gray-100"
                                {...register("otp", { required: true })}
                            />
                            {errors.otp && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Password */}
                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="border border-gray-300 bg-gray-100"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Country */}
                        <LabelInputContainer>
                            <Label htmlFor="country">Country</Label>
                            <select
                                id="country"
                                className="border border-gray-300 bg-gray-100 rounded-md p-2"
                                {...register("country", { required: true })}
                            >
                                <option value="">Select your country</option>
                                {
                                    countries.map((country, idx) => (
                                        <option value={country} key={idx}>{country}</option>
                                    ))
                                }
                            </select>
                            {errors.country && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Mobile */}
                        <LabelInputContainer>
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                                id="mobile"
                                type="number"
                                placeholder="9876543210"
                                className="border border-gray-300 bg-gray-100"
                                {...register("mobile", { required: true })}
                            />
                            {errors.mobile && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Terms & Conditions */}
                        <div className="flex items-start space-x-2 mb-4">
                            <input
                                id="agree"
                                type="checkbox"
                                className="bg-white mt-1 accent-blue-600"
                                {...register("agree", { required: true })}
                            />
                            <label htmlFor="agree" className="text-sm text-gray-700 select-none">
                                I agree to the{" "}
                                <a href="#" className="text-blue-600 underline">
                                    Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-blue-600 underline">
                                    Privacy Policy
                                </a>.
                            </label>
                        </div>
                        {errors.agree && (
                            <span className="text-red-500 text-xs mb-2 block">
                                You must agree before submitting
                            </span>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white mt-4"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                            <BottomGradient />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NriSignupForm;

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
}) => (
    <div className={cn("flex flex-col w-full space-y-2", className)}>
        {children}
    </div>
);
