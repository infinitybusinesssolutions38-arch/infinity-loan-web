"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";


type FormData = {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    mobile: string;
    email: string;
    residentialAddress: string;
    city: string;
    state: string;
    pincode: string;
    panNumber: string;
    aadhaarNumber: string;

    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    branchName: string;
    monthlyAvgBankBalance: string;

    businessName: string;
    businessType: string;
    businessAddress: string;
    businessVintageYears: string;
    natureOfBusiness: string;
    annualTurnover: string;
    gstNumber: string;
    businessPan: string;
    otherBusinessLicenseNumber: string;
    tradeLicense: string;
    msmeUdyam: string;
    shopActLicense: string;

    loanAmountRequired: string;
    purposeOfLoan: string;
    preferredLoanTenureMonths: string;
    existingLoanDetails: string;

    // password: string;

    panCardUpload: any;
    aadhaarCardUpload: any;
    passportCopy: any;
    gstCertificate: any;
    otherBusinessLicenseDocuments: any;
    bankStatementLast6Months: any;
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
                if (typeof data[key] !== "object") formData.append(key, data[key] ?? "");
            });

            // Append file fields (from input type="file")
            const panCardFile = data.panCardUpload?.[0];
            const aadhaarCardFile = data.aadhaarCardUpload?.[0];
            const passportCopyFile = data.passportCopy?.[0];
            const gstCertificateFile = data.gstCertificate?.[0];
            const otherBusinessLicenseDocumentsFile = data.otherBusinessLicenseDocuments?.[0];
            const bankStatementLast6MonthsFile = data.bankStatementLast6Months?.[0];

            if (panCardFile) formData.append("panCardUpload", panCardFile);
            if (aadhaarCardFile) formData.append("aadhaarCardUpload", aadhaarCardFile);
            if (passportCopyFile) formData.append("passportCopy", passportCopyFile);
            if (gstCertificateFile) formData.append("gstCertificate", gstCertificateFile);
            if (otherBusinessLicenseDocumentsFile) formData.append("otherBusinessLicenseDocuments", otherBusinessLicenseDocumentsFile);
            if (bankStatementLast6MonthsFile) formData.append("bankStatementLast6Months", bankStatementLast6MonthsFile);

            const res = await axios.post(`/api/business-loan`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(res.data);
            alert("Registration successful!");
            reset();
        } catch (error) {
            console.log("internal server error...", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            {/* Outer container without shadow */}
            <div className="flex flex-col md:flex-row  rounded-2xl overflow-hidden w-full max-w-5xl">
                {/* LEFT SIDE - Text Section */}
                <div className="md:w-1/2 bg-gray-50 flex flex-col  items-start p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Get Your Business Loan Easily
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Apply for a business loan with flexible repayment options and quick
                        approvals. Manage your finances smarter with Fortune Loans.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                        <li>✅ Instant approval process</li>
                        <li>✅ Low interest rates</li>
                        <li>✅ No hidden charges</li>
                    </ul>
                </div>

                {/* RIGHT SIDE - Form Section with its own shadow */}
                <div className="md:w-1/2 p-8 bg-white mb-5 shadow-md shadow-blue-400 rounded-2xl">
                    <h2 className="text-xl sm:text-2xl lg:text-4xl mb-5 font-bold text-neutral-800 dark:text-neutral-200">
                        Apply for a Business Loan
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                        Sign up to access your business loan dashboard.
                    </p>

                    <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                        <p className="my-6 text-2xl font-semibold">Applicant Personal Details</p>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="fullName">Full Name (as per PAN Card)</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("fullName", { required: true })}
                            />
                            {errors.fullName && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    className="border border-gray-300 bg-gray-100 rounded-md p-2"
                                    {...register("dateOfBirth", { required: true })}
                                />
                                {errors.dateOfBirth && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    className="border border-gray-300 bg-gray-100 rounded-md p-2"
                                    {...register("gender")}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </LabelInputContainer>
                        </div>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input
                                    id="mobile"
                                    placeholder="9876543210"
                                    type="number"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("mobile", { required: true })}
                                />
                                {errors.mobile && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    placeholder="you@example.com"
                                    type="email"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                        </div>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="residentialAddress">Residential Address</Label>
                            <Input
                                id="residentialAddress"
                                placeholder="House no, Street, Area"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("residentialAddress", { required: true })}
                            />
                            {errors.residentialAddress && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("city", { required: true })}
                                />
                                {errors.city && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("state", { required: true })}
                                />
                                {errors.state && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input
                                    id="pincode"
                                    placeholder="110001"
                                    type="number"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("pincode", { required: true })}
                                />
                                {errors.pincode && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                        </div>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="panNumber">PAN Card Number</Label>
                                <Input
                                    id="panNumber"
                                    placeholder="ABCDE1234F"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("panNumber", { required: true })}
                                />
                                {errors.panNumber && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="aadhaarNumber">Aadhaar Card Number</Label>
                                <Input
                                    id="aadhaarNumber"
                                    placeholder="123412341234"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("aadhaarNumber", { required: true })}
                                />
                                {errors.aadhaarNumber && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                        </div>

                        <p className="my-6 text-2xl font-semibold">Bank Details</p>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="bankName">Bank Name</Label>
                            <Input
                                id="bankName"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("bankName", { required: true })}
                            />
                            {errors.bankName && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="accountHolderName">Account Holder Name</Label>
                            <Input
                                id="accountHolderName"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("accountHolderName", { required: true })}
                            />
                            {errors.accountHolderName && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Input
                                    id="accountNumber"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("accountNumber", { required: true })}
                                />
                                {errors.accountNumber && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="ifscCode">IFSC Code</Label>
                                <Input
                                    id="ifscCode"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("ifscCode", { required: true })}
                                />
                                {errors.ifscCode && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                        </div>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="accountType">Account Type</Label>
                                <select
                                    id="accountType"
                                    className="border border-gray-300 bg-gray-100 rounded-md p-2"
                                    {...register("accountType", { required: true })}
                                >
                                    <option value="">Select</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Current">Current</option>
                                </select>
                                {errors.accountType && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="branchName">Branch Name</Label>
                                <Input
                                    id="branchName"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("branchName")}
                                />
                            </LabelInputContainer>
                        </div>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="monthlyAvgBankBalance">Monthly Average Bank Balance</Label>
                            <Input
                                id="monthlyAvgBankBalance"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("monthlyAvgBankBalance")}
                            />
                        </LabelInputContainer>

                        <p className="my-6 text-2xl font-semibold">Business Details</p>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("businessName", { required: true })}
                            />
                            {errors.businessName && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="businessType">Type of Business</Label>
                            <select
                                id="businessType"
                                className="border border-gray-300 bg-gray-100 rounded-md p-2"
                                {...register("businessType")}
                            >
                                <option value="">Select</option>
                                <option value="Proprietorship">Proprietorship</option>
                                <option value="Partnership">Partnership</option>
                                <option value="LLP">LLP</option>
                                <option value="Private Limited">Private Limited</option>
                                <option value="OPC">OPC</option>
                            </select>
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="businessAddress">Business Address</Label>
                            <Input
                                id="businessAddress"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("businessAddress", { required: true })}
                            />
                            {errors.businessAddress && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="businessVintageYears">Business Vintage (Years in Operation)</Label>
                                <Input
                                    id="businessVintageYears"
                                    type="number"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("businessVintageYears", { required: true })}
                                />
                                {errors.businessVintageYears && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="natureOfBusiness">Nature of Business</Label>
                                <Input
                                    id="natureOfBusiness"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("natureOfBusiness", { required: true })}
                                />
                                {errors.natureOfBusiness && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                        </div>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="annualTurnover">Annual Turnover</Label>
                            <Input
                                id="annualTurnover"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("annualTurnover", { required: true })}
                            />
                            {errors.annualTurnover && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                                <Input
                                    id="gstNumber"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("gstNumber")}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="businessPan">Business PAN (Optional)</Label>
                                <Input
                                    id="businessPan"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("businessPan")}
                                />
                            </LabelInputContainer>
                        </div>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="otherBusinessLicenseNumber">Other Business License Number (Optional)</Label>
                            <Input
                                id="otherBusinessLicenseNumber"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("otherBusinessLicenseNumber")}
                            />
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="tradeLicense">Trade License</Label>
                                <Input
                                    id="tradeLicense"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("tradeLicense")}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="msmeUdyam">MSME / Udyam</Label>
                                <Input
                                    id="msmeUdyam"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("msmeUdyam")}
                                />
                            </LabelInputContainer>
                        </div>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="shopActLicense">Shop Act License</Label>
                            <Input
                                id="shopActLicense"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("shopActLicense")}
                            />
                        </LabelInputContainer>

                        <p className="my-6 text-2xl font-semibold">Loan Requirement Details</p>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="loanAmountRequired">Loan Amount Required (₹)</Label>
                            <Input
                                id="loanAmountRequired"
                                type="text"
                                className="border border-gray-300 bg-gray-100"
                                {...register("loanAmountRequired", { required: true })}
                            />
                            {errors.loanAmountRequired && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="purposeOfLoan">Purpose of Loan</Label>
                            <select
                                id="purposeOfLoan"
                                className="border border-gray-300 bg-gray-100 rounded-md p-2"
                                {...register("purposeOfLoan", { required: true })}
                            >
                                <option value="">Select</option>
                                <option value="Working Capital">Working Capital</option>
                                <option value="Business Expansion">Business Expansion</option>
                                <option value="Machinery Purchase">Machinery Purchase</option>
                                <option value="Inventory">Inventory</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.purposeOfLoan && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="preferredLoanTenureMonths">Preferred Loan Tenure (Months)</Label>
                                <Input
                                    id="preferredLoanTenureMonths"
                                    type="number"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("preferredLoanTenureMonths", { required: true })}
                                />
                                {errors.preferredLoanTenureMonths && <span className="text-red-500 text-xs">Required</span>}
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="existingLoanDetails">Existing Loan Details (Optional)</Label>
                                <Input
                                    id="existingLoanDetails"
                                    type="text"
                                    className="border border-gray-300 bg-gray-100"
                                    {...register("existingLoanDetails")}
                                />
                            </LabelInputContainer>
                        </div>

                        <p className="my-6 text-2xl font-semibold">Document Upload</p>

                        <LabelInputContainer className="mb-4">
                            <Label>PAN Card Upload</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                {...register("panCardUpload", { required: true })}
                                className="border border-gray-300 bg-gray-100"
                            />
                            {errors.panCardUpload && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>Aadhaar Card Upload</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                {...register("aadhaarCardUpload", { required: true })}
                                className="border border-gray-300 bg-gray-100"
                            />
                            {errors.aadhaarCardUpload && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>Passport Copy (Optional)</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                {...register("passportCopy")}
                                className="border border-gray-300 bg-gray-100"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>GST Certificate (Optional)</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                {...register("gstCertificate")}
                                className="border border-gray-300 bg-gray-100"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>Other Business License Documents (Optional)</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                {...register("otherBusinessLicenseDocuments")}
                                className="border border-gray-300 bg-gray-100"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label>Last 3 Years Bank Statement</Label>
                            <Input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                {...register("bankStatementLast6Months")}
                                className="border border-gray-300 bg-gray-100"
                            />
                        </LabelInputContainer>

                        {/* <LabelInputContainer className="mb-6">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                className="border border-gray-300 bg-gray-100"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500 text-xs">Required</span>}
                        </LabelInputContainer> */}

                        {/* Submit */}
                        <button
                            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
                            type="submit"
                            disabled={isSubmitting}
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
