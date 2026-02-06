"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import PersonalLoanFaq from "@/app/components/PersonalLoanFaq";



type FormData = {
    firstname: string;
    lastname: string;
    pan: string;
    panCard: string;
    adharCard: string;
    email: string;
    mobile: string;
    gender: string;
    dateOfBirth: string;
    pincode: string;
    city: string;
    state: string;
    addressProof: string;
    education: string;
    family: string;
    employment: string;
    loanAmount: string;
    businessProof: string;
    businessStartDate: string;
    turnover: string;
};

const SignupForm = () => {

    const router = useRouter();
    useEffect(() => {
        // ✅ Require login to access this page
        const checkUser = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                if (!res.data.user) router.push("/login");
            } catch (err) {
                console.log("Auth check failed:", err);
                router.push("/login");
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
            const formData = new FormData();

            // Append all text fields
            Object.keys(data).forEach((key) => {
                // @ts-ignore
                if (typeof data[key] !== "object") formData.append(key, data[key]);
            });

            // Append file fields (from input type="file")
            const panCardFile = (data.panCard as any)[0];
            const adharCardFile = (data.adharCard as any)[0];
            if (panCardFile) formData.append("panCard", panCardFile);
            if (adharCardFile) formData.append("adharCard", adharCardFile);

            // Send via Axios
            const res = await axios.post(`/api/personal-loan`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Form Data:", res.data);
            alert("Registration successful!");
            reset();
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed!");
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
            {/* Outer container without shadow */}
            <div className="flex flex-col md:flex-row rounded-2xl m-5 overflow-hidden w-full max-w-5xl">
                {/* LEFT SIDE - Text Section */}
                <div className="md:w-1/2 bg-card flex flex-col items-start p-8 border border-border rounded-l-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Get Your Personal Loan Easily
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Apply for a personal loan with flexible repayment options and quick
                        approvals. Manage your finances smarter with Fortune Loans.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li>✅ Instant approval process</li>
                        <li>✅ Low interest rates</li>
                        <li>✅ No hidden charges</li>
                    </ul>
                </div>

                {/* RIGHT SIDE - Form Section with its own shadow */}
                <div className="md:w-1/2 p-8 bg-card mb-5 shadow-xl rounded-2xl border border-border">
                    <h2 className="text-xl sm:text-2xl lg:text-4xl mb-5 font-bold text-foreground">
                        Apply for a Personal Loan
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign up to access your personal loan dashboard.
                    </p>

                    <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    placeholder="Tyler"
                                    type="text"
                                    className="border border-border bg-background"
                                    {...register("firstname", { required: true })}
                                />
                                {errors.firstname && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input
                                    id="lastname"
                                    placeholder="Durden"
                                    type="text"
                                    className="border border-border bg-background"
                                    {...register("lastname", { required: true })}
                                />
                            </LabelInputContainer>
                        </div>

                        {/* PAN */}
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="pan">PAN Number</Label>
                            <Input
                                id="pan"
                                placeholder="ABCDE1234F"
                                type="text"
                                className="border border-border bg-background"
                                {...register("pan", { required: true })}
                            />
                        </LabelInputContainer>

                        {/* File Uploads */}
                        <LabelInputContainer className="mb-4">
                            <Label>Upload PAN</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.png"
                                className="border border-border bg-background"
                                {...register("panCard")}
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>Upload Aadhar</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.png"
                                className="border border-border bg-background"
                                {...register("adharCard")}
                            />
                        </LabelInputContainer>

                        {/* Email + Password */}
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                placeholder="you@example.com"
                                type="email"
                                className="border border-border bg-background"
                                {...register("email", { required: true })}
                            />
                        </LabelInputContainer>

                        {/* Mobile */}
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                                id="mobile"
                                placeholder="1234567890"
                                type="number"
                                className="border border-border bg-background"
                                {...register("mobile", { required: true })}
                            />
                        </LabelInputContainer>

                        {/* Gender + DOB */}
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    className="border border-border bg-background rounded-md p-2"
                                    {...register("gender")}
                                >
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    className="border border-border bg-background"
                                    {...register("dateOfBirth")}
                                />
                            </LabelInputContainer>
                        </div>

                        {/* Address */}
                        <p className="my-6 text-2xl font-semibold">Residential address</p>
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="pincode">Pin Code</Label>
                                <Input
                                    id="pincode"
                                    placeholder="110001"
                                    type="number"
                                    className="border border-border bg-background"
                                    {...register("pincode")}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    className="border border-border bg-background"
                                    {...register("city")}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    className="border border-border bg-background"
                                    {...register("state")}
                                />
                            </LabelInputContainer>
                        </div>

                        {/* Dropdowns */}
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="addressProof">Address Proof</Label>
                            <select
                                id="addressProof"
                                className="border border-border bg-background rounded-md p-2"
                                {...register("addressProof")}
                            >
                                <option value="">Select an option</option>
                                <option value="PAN">PAN Card</option>
                                <option value="Aadhar">Aadhar Card</option>
                            </select>
                        </LabelInputContainer>

                        {/* Education + Family */}
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label>Education Qualification</Label>
                                <select
                                    className="border border-border bg-background rounded-md p-2"
                                    {...register("education")}
                                >
                                    <option value="">Select</option>
                                    <option value="ca">CA</option>
                                    <option value="master">Master</option>
                                    <option value="graduate">Graduate</option>
                                    <option value="non_graduate">Non-Graduate</option>
                                </select>
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label>Family Reference</Label>
                                <select
                                    className="border border-border bg-background rounded-md p-2"
                                    {...register("family")}
                                >
                                    <option value="">Select</option>
                                    <option value="father">Father</option>
                                    <option value="mother">Mother</option>
                                    <option value="wife">Wife</option>
                                </select>
                            </LabelInputContainer>
                        </div>

                        {/* Employment + Loan */}
                        <LabelInputContainer className="mb-4">
                            <Label>Employment Type</Label>
                            <select
                                className="border border-border bg-background rounded-md p-2"
                                {...register("employment")}
                            >
                                <option value="">Select</option>
                                <option value="salaried">Salaried</option>
                                <option value="self_employed">Self Employed</option>
                            </select>
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>Loan Amount</Label>
                            <Input
                                placeholder="Loan amount"
                                type="text"
                                className="border border-border bg-background"
                                {...register("loanAmount")}
                            />
                        </LabelInputContainer>

                        {/* Business Info */}
                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label>Business Proof</Label>
                                <select
                                    className="border border-border bg-background rounded-md p-2"
                                    {...register("businessProof")}
                                >
                                    <option value="">Select</option>
                                    <option>Proprietorship</option>
                                    <option>Partnership Firm</option>
                                    <option>LLP</option>
                                </select>
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label>Business Start Date</Label>
                                <Input
                                    type="date"
                                    className="border border-border bg-background"
                                    {...register("businessStartDate")}
                                />
                            </LabelInputContainer>
                        </div>

                        <LabelInputContainer className="mb-6">
                            <Label>Business Turnover</Label>
                            <select
                                className="border border-border bg-background rounded-md p-2"
                                {...register("turnover")}
                            >
                                <option value="">Select</option>
                                <option>1-10 Crores</option>
                                <option>60 Lacs - 1 Crore</option>
                                <option>30 - 60 Lacs</option>
                                <option>12 - 30 Lacs</option>
                            </select>
                        </LabelInputContainer>

                        {/* Submit */}
                        <button disabled={isSubmitting}
                            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-r from-cta via-cta to-accent font-medium text-white shadow-glow-cta"
                            type="submit"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                            <BottomGradient />
                        </button>
                    </form>
                </div>
            </div>
            <PersonalLoanFaq />
        </div>
    );
};

export default SignupForm;

/* === Components === */
const SocialButton = ({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) => (
    <button
        className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-sm"
        type="button"
    >
        <div className="h-4 w-4 text-neutral-800">{icon}</div>
        <span className="text-sm text-neutral-700">{text}</span>
        <BottomGradient />
    </button>
);

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
}) => <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
