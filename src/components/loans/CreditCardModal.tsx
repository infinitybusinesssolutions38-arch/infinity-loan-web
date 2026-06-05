"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
    Briefcase,
    CreditCard,
    FileCheck,
    Mail,
    MapPin,
    Upload,
    User,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    productTitle?: string;
};

type CreditCardFormValues = {
    firstName: string;
    middleName?: string;
    lastName: string;
    primaryMobileNo: string;
    whatsappNo?: string;
    alternateMobileNo?: string;
    jobBusiness?: string;
    bankNameCreditCard?: string;
    limitAmount?: string;
    cardType?: string;
    cibilIssues?: string;
    residentialStatus?: string;
    yearsAtCurrentResidentialAddress?: string;
    businessEmail?: string;
    personalEmail: string;
    currentResidentialAddress: string;
    currentResidentialAddressPin: string;
    currentOfficeShopAddress?: string;
    currentOfficeShopAddressPin?: string;
    aadhaarNumber: string;
    panNumber: string;
    voterIdNumber?: string;
    drivingLicenseNumber?: string;
    passportNumber?: string;
};

function SectionLegend({
    number,
    icon: Icon,
    title,
}: {
    number: number;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
}) {
    return (
        <legend className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F7FD] text-sm font-bold text-[#00AEEF]">
                {number}
            </span>
            <Icon className="h-5 w-5 text-[#00AEEF]" />
            {title}
        </legend>
    );
}

function FileUploadBox({
    label,
    required,
    file,
    onChange,
    hint = "Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)",
    error,
}: {
    label: string;
    required?: boolean;
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hint?: string;
    error?: string | null;
}) {
    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium">
                {label} {required ? <span className="text-destructive">*</span> : null}
            </Label>
            <label className="group flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CBD5E1] transition-all duration-300 hover:border-[#00AEEF] hover:bg-[#F5FCFF]">
                <Upload className="h-6 w-6 text-[#64748B] transition-colors group-hover:text-[#00AEEF]" />
                <span className="mt-1 px-2 text-center text-xs text-[#64748B] group-hover:text-[#00AEEF]">
                    {file ? `${file.name.slice(0, 22)}${file.name.length > 22 ? "..." : ""}` : "Upload"}
                </span>
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={onChange} />
            </label>
            <p className="text-xs text-[#64748B]">{hint}</p>
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
    );
}

export default function CreditCardModal({
    isOpen,
    onClose,
    productTitle,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreditCardFormValues>();

    const [loading, setLoading] = useState(false);
    const [rentAgreement, setRentAgreement] = useState<File | null>(null);
    const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
    const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
    const [panFront, setPanFront] = useState<File | null>(null);
    const [residentialBill, setResidentialBill] = useState<File | null>(null);
    const [shopBill, setShopBill] = useState<File | null>(null);
    const [fileErrors, setFileErrors] = useState<Record<string, string | null>>({});

    if (!isOpen) return null;

    const modalTitle = productTitle ? `Apply for ${productTitle}` : "Apply for Credit Card";

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<File | null>>,
        fieldKey: string,
        options?: { imageMaxMB?: number; pdfMaxMB?: number }
    ) => {
        const imageMaxMB = options?.imageMaxMB ?? 2;
        const pdfMaxMB = options?.pdfMaxMB ?? 10;
        const file = e.target.files?.[0];
        if (!file) {
            setter(null);
            setFileErrors((prev) => ({ ...prev, [fieldKey]: null }));
            return;
        }

        if (file.type.startsWith("image/")) {
            if (file.size > imageMaxMB * 1024 * 1024) {
                setFileErrors((prev) => ({
                    ...prev,
                    [fieldKey]: `Image must be <= ${imageMaxMB}MB`,
                }));
                setter(null);
                return;
            }
        } else if (file.type === "application/pdf") {
            if (file.size > pdfMaxMB * 1024 * 1024) {
                setFileErrors((prev) => ({
                    ...prev,
                    [fieldKey]: `PDF must be <= ${pdfMaxMB}MB`,
                }));
                setter(null);
                return;
            }
        } else {
            setFileErrors((prev) => ({
                ...prev,
                [fieldKey]: "Please upload JPG, PNG, or PDF",
            }));
            setter(null);
            return;
        }

        setFileErrors((prev) => ({ ...prev, [fieldKey]: null }));
        setter(file);
    };

    const onSubmit = async (data: CreditCardFormValues) => {
        if (!aadhaarFront) {
            setFileErrors((prev) => ({ ...prev, aadhaarFront: "Aadhaar front is required" }));
            return;
        }
        if (!aadhaarBack) {
            setFileErrors((prev) => ({ ...prev, aadhaarBack: "Aadhaar back is required" }));
            return;
        }
        if (!panFront) {
            setFileErrors((prev) => ({ ...prev, panFront: "PAN card front is required" }));
            return;
        }
        if (!residentialBill) {
            setFileErrors((prev) => ({
                ...prev,
                residentialBill: "Latest residential electricity bill is required",
            }));
            return;
        }
        if (!shopBill) {
            setFileErrors((prev) => ({
                ...prev,
                shopBill: "Latest shop/office electricity bill is required",
            }));
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("firstname", data.firstName);
            formData.append("middleName", data.middleName || "");
            formData.append("lastname", data.lastName);
            formData.append("mobileNumber", data.primaryMobileNo);
            formData.append("alternateMobile", data.alternateMobileNo || "");
            formData.append("whatsappNumber", data.whatsappNo || "");
            formData.append("personalEmail", data.personalEmail);
            formData.append("officialEmail", data.businessEmail || "");

            formData.append("aadhaarNumber", data.aadhaarNumber);
            formData.append("panNumber", data.panNumber);
            formData.append("voterIdNumber", data.voterIdNumber || "");
            formData.append("drivingLicense", data.drivingLicenseNumber || "");
            formData.append("passportNumber", data.passportNumber || "");

            formData.append("currentResidentialAddress", data.currentResidentialAddress);
            formData.append("currentResidentialPincode", data.currentResidentialAddressPin);
            formData.append("currentOfficeAddress", data.currentOfficeShopAddress || "");
            formData.append("currentOfficePincode", data.currentOfficeShopAddressPin || "");
            formData.append("residentialStatus", data.residentialStatus || "");
            formData.append(
                "yearsAtCurrentResidentialAddress",
                String(data.yearsAtCurrentResidentialAddress ?? "")
            );

            formData.append("jobBusiness", data.jobBusiness || "");
            formData.append("bankName", data.bankNameCreditCard || "");
            formData.append("limitAmount", data.limitAmount || "");
            formData.append("cardType", data.cardType || "");
            formData.append("cibilIssues", data.cibilIssues || "");
            formData.append("consent", "true");

            formData.append("aadhaarFront", aadhaarFront);
            formData.append("aadhaarBack", aadhaarBack);
            formData.append("panFront", panFront);
            formData.append("residentialBill", residentialBill);
            formData.append("shopBill", shopBill);
            if (rentAgreement) {
                formData.append("uploadRentAgreementOfficeShop", rentAgreement);
            }

            const res = await axios.post("/api/credit-card", formData);
            if (!res?.data?.success) {
                throw new Error(res?.data?.message || "Submission failed");
            }

            alert("Credit Card application submitted successfully!");
            onClose();
        } catch (error) {
            console.error(error);
            const message =
                (axios.isAxiosError(error) && (error.response?.data as { message?: string })?.message) ||
                (error instanceof Error ? error.message : "Submission failed");
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field?: keyof CreditCardFormValues) =>
        `w-full transition-all duration-300 ${field && errors[field] ? "border-destructive" : ""}`;

    const selectClass =
        "mt-1 block h-11 w-full rounded-xl border border-[#D6EEF8] bg-white px-3 py-2 text-sm outline-none transition focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20";

    return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-[#0F172A]/40 p-4 sm:p-6"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] lg:max-w-6xl">
                    <div className="sticky top-0 z-10 border-b border-[#D6EEF8] bg-[#F5FCFF] px-6 pb-5 pt-6 sm:px-8">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#666666] transition-colors hover:bg-[#F7F9FC] hover:text-[#1A1A1A]"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
                            {modalTitle}
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex min-h-0 flex-1 flex-col"
                    >
                        <div className="space-y-8 overflow-y-auto px-6 py-6 sm:px-8 lg:px-10">
                            <fieldset className="space-y-4">
                                <SectionLegend number={1} icon={User} title="Personal Information" />
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-firstName">First Name <span className="text-destructive">*</span></Label>
                                        <Input id="cc-firstName" {...register("firstName", { required: true })} placeholder="John" className={inputClass("firstName")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-middleName">Middle Name</Label>
                                        <Input id="cc-middleName" {...register("middleName")} placeholder="Optional" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-lastName">Last Name <span className="text-destructive">*</span></Label>
                                        <Input id="cc-lastName" {...register("lastName", { required: true })} placeholder="Doe" className={inputClass("lastName")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-mobile">Primary Mobile Number <span className="text-destructive">*</span></Label>
                                        <Input id="cc-mobile" type="tel" maxLength={10} {...register("primaryMobileNo", { required: true })} placeholder="9876543210" className={inputClass("primaryMobileNo")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-whatsapp">WhatsApp Number</Label>
                                        <Input id="cc-whatsapp" type="tel" maxLength={10} {...register("whatsappNo")} placeholder="Optional" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-alt-mobile">Alternate Mobile</Label>
                                        <Input id="cc-alt-mobile" type="tel" maxLength={10} {...register("alternateMobileNo")} placeholder="Optional" className={inputClass()} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4">
                                <SectionLegend number={2} icon={Briefcase} title="Employment Information" />
                                <div className="max-w-xl space-y-2">
                                    <Label htmlFor="cc-jobBusiness">Current Employment Status</Label>
                                    <select id="cc-jobBusiness" {...register("jobBusiness")} className={selectClass}>
                                        <option value="">Select Employment Status</option>
                                        <option value="Salaried Employee">Salaried Employee</option>
                                        <option value="Self Employed Business">Self Employed Business</option>
                                        <option value="Self Employed Professional">Self Employed Professional</option>
                                    </select>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4">
                                <SectionLegend number={3} icon={CreditCard} title="Loan Details" />
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-bank">Bank Name (Credit Card)</Label>
                                        <Input id="cc-bank" {...register("bankNameCreditCard")} placeholder="e.g., HDFC Bank, ICICI Bank" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-limit">Limit Amount (Credit Card)</Label>
                                        <Input id="cc-limit" type="number" min={0} {...register("limitAmount")} placeholder="e.g., 500000" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-cardType">Card Type</Label>
                                        <select id="cc-cardType" {...register("cardType")} className={selectClass}>
                                            <option value="">Select Card Type</option>
                                            <option value="Domestic">Domestic</option>
                                            <option value="International">International</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cc-cibil">
                                        Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable. (optional)
                                    </Label>
                                    <Textarea
                                        id="cc-cibil"
                                        {...register("cibilIssues")}
                                        placeholder="Example: Late payment history, low credit score, settled loans, written-off accounts, etc."
                                        maxLength={1000}
                                        className="min-h-[100px] w-full"
                                    />
                                    <p className="text-xs text-[#64748B]">Maximum 1000 characters</p>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:max-w-3xl">
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-residentialStatus">Residential Status <span className="text-destructive">*</span></Label>
                                        <select id="cc-residentialStatus" {...register("residentialStatus", { required: true })} className={selectClass}>
                                            <option value="">Select</option>
                                            <option value="Owned">Owned</option>
                                            <option value="Rented">Rented</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-years">Years at Current Residential Address <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="cc-years"
                                            type="number"
                                            min={0}
                                            max={99}
                                            {...register("yearsAtCurrentResidentialAddress", { required: true })}
                                            placeholder="e.g., 3"
                                            className={inputClass("yearsAtCurrentResidentialAddress")}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4">
                                <SectionLegend number={4} icon={Mail} title="Email Information" />
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-businessEmail">Business Email</Label>
                                        <Input id="cc-businessEmail" type="email" {...register("businessEmail")} placeholder="john@company.com" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-personalEmail">Personal Email <span className="text-destructive">*</span></Label>
                                        <Input id="cc-personalEmail" type="email" {...register("personalEmail", { required: true })} placeholder="john.doe@gmail.com" className={inputClass("personalEmail")} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4">
                                <SectionLegend number={5} icon={MapPin} title="Address Details" />
                                <div className="grid gap-4 lg:grid-cols-3">
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label htmlFor="cc-res-address">Current Residential Address <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="cc-res-address"
                                            {...register("currentResidentialAddress", { required: true })}
                                            placeholder="House No, Street, Area, City, State"
                                            className={inputClass("currentResidentialAddress")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-res-pin">Current Residential Address PIN Code <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="cc-res-pin"
                                            maxLength={6}
                                            {...register("currentResidentialAddressPin", { required: true })}
                                            placeholder="400001"
                                            className={inputClass("currentResidentialAddressPin")}
                                        />
                                    </div>
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label htmlFor="cc-office-address">Current Office / Shop Address</Label>
                                        <Input
                                            id="cc-office-address"
                                            {...register("currentOfficeShopAddress")}
                                            placeholder="Office/Shop, Street, Area, City, State"
                                            className={inputClass()}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-office-pin">Current Office / Shop Address PIN Code</Label>
                                        <Input
                                            id="cc-office-pin"
                                            maxLength={6}
                                            {...register("currentOfficeShopAddressPin")}
                                            placeholder="400001"
                                            className={inputClass()}
                                        />
                                    </div>
                                </div>
                                <div className="max-w-md">
                                <FileUploadBox
                                    label="Upload Rent Agreement (Office / Shop)"
                                    file={rentAgreement}
                                    onChange={(e) => handleFileChange(e, setRentAgreement, "rentAgreement")}
                                    error={fileErrors.rentAgreement}
                                    hint="Upload (Image JPG/PNG max 2MB or PDF max 10MB)"
                                />
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4">
                                <SectionLegend number={6} icon={CreditCard} title="Identity Details" />
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-aadhaar">Aadhaar Number <span className="text-destructive">*</span></Label>
                                        <Input id="cc-aadhaar" maxLength={12} {...register("aadhaarNumber", { required: true })} placeholder="1234 5678 9012" className={inputClass("aadhaarNumber")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-pan">PAN Card Number <span className="text-destructive">*</span></Label>
                                        <Input id="cc-pan" maxLength={10} {...register("panNumber", { required: true })} placeholder="ABCDE1234F" className={`uppercase ${inputClass("panNumber")}`} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-voter">Voter ID Number (optional)</Label>
                                        <Input id="cc-voter" {...register("voterIdNumber")} placeholder="Optional" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cc-dl">Driving License Number (optional)</Label>
                                        <Input id="cc-dl" {...register("drivingLicenseNumber")} placeholder="Optional" className={inputClass()} />
                                    </div>
                                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                        <Label htmlFor="cc-passport">Passport Number (optional)</Label>
                                        <Input id="cc-passport" {...register("passportNumber")} placeholder="Optional" className={inputClass()} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-4">
                                <SectionLegend number={7} icon={FileCheck} title="Document Upload" />
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <FileUploadBox
                                        label="Aadhaar Front"
                                        required
                                        file={aadhaarFront}
                                        onChange={(e) => handleFileChange(e, setAadhaarFront, "aadhaarFront")}
                                        error={fileErrors.aadhaarFront}
                                    />
                                    <FileUploadBox
                                        label="Aadhaar Back"
                                        required
                                        file={aadhaarBack}
                                        onChange={(e) => handleFileChange(e, setAadhaarBack, "aadhaarBack")}
                                        error={fileErrors.aadhaarBack}
                                    />
                                    <FileUploadBox
                                        label="PAN Card Front"
                                        required
                                        file={panFront}
                                        onChange={(e) => handleFileChange(e, setPanFront, "panFront")}
                                        error={fileErrors.panFront}
                                    />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FileUploadBox
                                        label="Latest Residential Electricity Bill"
                                        required
                                        file={residentialBill}
                                        onChange={(e) =>
                                            handleFileChange(e, setResidentialBill, "residentialBill", {
                                                imageMaxMB: 1,
                                                pdfMaxMB: 2,
                                            })
                                        }
                                        error={fileErrors.residentialBill}
                                        hint="Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)"
                                    />
                                    <FileUploadBox
                                        label="Latest Shop/Office Electricity Bill"
                                        required
                                        file={shopBill}
                                        onChange={(e) =>
                                            handleFileChange(e, setShopBill, "shopBill", {
                                                imageMaxMB: 1,
                                                pdfMaxMB: 2,
                                            })
                                        }
                                        error={fileErrors.shopBill}
                                        hint="Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)"
                                    />
                                </div>
                            </fieldset>
                        </div>

                        <div className="sticky bottom-0 border-t border-[#D6EEF8] bg-white px-6 py-4 sm:px-8 lg:px-10">
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <Button type="button" variant="outline" className="w-full sm:w-auto sm:min-w-[140px]" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#00AEEF] text-white hover:bg-[#008FCC] sm:min-w-[240px] sm:flex-1 sm:max-w-md"
                                >
                                    {loading ? "Submitting..." : "Submit Application"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    );
}
