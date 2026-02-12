

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    categoryKey?: string;
    categoryTitle?: string;
};

type LoanFormData = Record<string, any>;

export default function SalariedLoanModal({ isOpen, onClose, categoryKey, categoryTitle }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoanFormData>();

    const MAX_FILE_BYTES = 2 * 1024 * 1024;
    const getFileFromValue = (value: any): File | null => {
        if (value instanceof File) return value;
        if (value?.[0] instanceof File) return value[0];
        return null;
    };
    const validateMax2MB = (value: any) => {
        const file = getFileFromValue(value);
        if (!file) return true;

        const isAllowedMime =
            file.type === "application/pdf" ||
            file.type === "image/jpeg" ||
            file.type === "image/jpg";

        const fileName = typeof file.name === "string" ? file.name.toLowerCase() : "";
        const isAllowedExt =
            fileName.endsWith(".pdf") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg");

        if (!isAllowedMime && !isAllowedExt) return "Please pdf or jpg maximum 2mb";
        if (file.size > MAX_FILE_BYTES) return "Please pdf or jpg maximum 2mb";
        return true;
    };

    const getCloudinarySignature = async (folder: string) => {
        const res = await axios.post("/api/cloudinary-signature", { folder }, { timeout: 15000 });
        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Failed to get upload signature");
        }
        return res.data as {
            cloudName: string;
            apiKey: string;
            timestamp: number;
            folder: string;
            signature: string;
        };
    };

    const uploadToCloudinary = async (file: File, folder: string) => {
        const sig = await getCloudinarySignature(folder);
        const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;

        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", sig.apiKey);
        fd.append("timestamp", String(sig.timestamp));
        fd.append("folder", sig.folder);
        fd.append("signature", sig.signature);

        const uploadRes = await axios.post(uploadUrl, fd, {
            timeout: 60000,
            headers: { "Content-Type": "multipart/form-data" },
        });

        const secureUrl = uploadRes?.data?.secure_url;
        if (!secureUrl || typeof secureUrl !== "string") {
            throw new Error("Cloud upload failed");
        }
        return secureUrl;
    };

    const getError = (key: string) => {
        const err = (errors as any)?.[key];
        if (!err) return null;
        const msg = typeof err.message === "string" ? err.message : "";
        return msg || "This field is required";
    };

    const [loading, setLoading] = useState(false);

    const [referenceCount, setReferenceCount] = useState(1);

    // Dynamic Existing Loans
    const [existingLoans, setExistingLoans] = useState<
        {
            totalLoanAmount: string;
            totalMonthlyEmi: string;
            loanType: string;
            bankName: string;
        }[]
    >([
        {
            totalLoanAmount: "",
            totalMonthlyEmi: "",
            loanType: "",
            bankName: "",
        },
    ]);

    if (!isOpen) return null;

    const residenceType = watch("residenceType");
    const hasCibil = watch("hasCibil");
    const isBuyingGoods = watch("isBuyingGoods");
    const otherDocumentsCount = (() => {
        const v = watch("NumberofOtherDocuments");
        const n = Number.isFinite(Number(v)) ? parseInt(String(v), 10) : 0;
        return Math.max(0, n || 0);
    })();

    // ================= SUBMIT =================
    const onSubmit = async (data: any) => {
        try {
            setLoading(true);

            const formData = new FormData();

            const pickFirstFile = (value: any): File | null => {
                if (!value) return null;
                if (value instanceof File) return value;
                if (typeof FileList !== "undefined" && value instanceof FileList) {
                    return value.length > 0 ? value[0] : null;
                }
                if (Array.isArray(value) && value[0] instanceof File) return value[0];
                if (value?.[0] instanceof File) return value[0];
                return null;
            };

            const appendIfPresent = (key: string, value: unknown) => {
                if (value === undefined || value === null) return;
                const str = String(value);
                if (!str || str === "undefined" || str === "null") return;
                formData.append(key, str);
            };

            // Append text fields
            appendIfPresent("serviceCategoryKey", categoryKey);
            appendIfPresent("serviceCategoryTitle", categoryTitle);

            // =====================================
            // Personal Details
            // =====================================
            appendIfPresent("firstName", data.firstName);
            appendIfPresent("middleName", data.middleName);
            appendIfPresent("lastName", data.lastName);
            appendIfPresent("dob", data.dob);
            appendIfPresent("gender", data.gender);
            appendIfPresent("maritalStatus", data.maritalStatus);

            // =====================================
            // Contact
            // =====================================
            appendIfPresent("mobileNumber", data.mobileNumber);
            appendIfPresent("whatsappNumber", data.whatsappNumber);
            appendIfPresent("alternateMobile", data.alternateMobile);
            appendIfPresent("personalEmail", data.personalEmail);
            appendIfPresent("officialEmail", data.officialEmail);
            appendIfPresent("officeEmailId", data.officelEmailID);

            // =====================================
            // Identification
            // =====================================
            appendIfPresent("panNumber", data.panNumber);
            appendIfPresent("aadhaarNumber", data.aadhaarNumber);
            appendIfPresent("voterIdNumber", data.voterIdNumber);
            appendIfPresent("drivingLicense", data.drivingLicense);
            appendIfPresent("passportNumber", data.passportNumber);

            appendIfPresent("voterIdNumber", data.VoterID);
            appendIfPresent("drivingLicense", data.DrivingLicense);
            appendIfPresent("passportNumber", data.PasswordNo);

            // =====================================
            // Address
            // =====================================
            appendIfPresent("currentResidentialAddress", data.currentResidentialAddress);
            appendIfPresent("currentResidentialPincode", data.currentResidentialPincode);
            appendIfPresent("state", data.state);
            appendIfPresent("city", data.city);
            appendIfPresent("residenceType", data.residenceType);
            appendIfPresent("stayingSinceDate", data.stayingSinceDate);
            appendIfPresent("jobBusiness", data.jobBusiness);
            appendIfPresent("permanentAddress", data.permanentAddress);

            // =====================================
            // Employment Details
            // =====================================
            appendIfPresent("companyName", data.companyName);
            appendIfPresent("organizationType", data.organizationType);
            appendIfPresent("industry", data.industry);
            appendIfPresent("industryOther", data.industryOther);
            appendIfPresent("designation", data.designation);
            appendIfPresent("employmentType", data.employmentType);
            appendIfPresent("dateOfJoining", data.dateOfJoining);
            if (data.totalExperienceYears !== undefined && data.totalExperienceYears !== null && String(data.totalExperienceYears).trim() !== "") {
                appendIfPresent("totalExperienceYears", data.totalExperienceYears);
            }

            appendIfPresent("organizationType", data.OrganizationType);
            appendIfPresent("industry", data.IndustrySector);
            if (data.totalWorkExperience !== undefined && data.totalWorkExperience !== null && String(data.totalWorkExperience).trim() !== "") {
                appendIfPresent("totalExperienceYears", data.totalWorkExperience);
            }

            // =====================================
            // Office Details
            // =====================================
            appendIfPresent("officeLocation", data.officeLocation);
            appendIfPresent("officePincode", data.officePincode);

            appendIfPresent("officeLocation", data.currectOfficeAddress);
            appendIfPresent("officePincode", data.officePIN);

            // =====================================
            // Salary Details
            // =====================================
            appendIfPresent("monthlyNetSalary", data.monthlyNetSalary);
            appendIfPresent("salaryCreditMode", data.salaryCreditMode);
            appendIfPresent("salaryAccountBankName", data.salaryAccountBankName);

            // =====================================
            // Industry (Other)
            // =====================================
            appendIfPresent("otherSector", data.otherSector);

            // =====================================
            // Existing Loans
            // =====================================
            const selectedExistingLoansCount =
                data.NumberOfExistingLoans !== undefined &&
                    data.NumberOfExistingLoans !== null &&
                    String(data.NumberOfExistingLoans).trim() !== ""
                    ? String(data.NumberOfExistingLoans)
                    : String(existingLoans.length || 0);
            formData.append("numberOfExistingLoans", selectedExistingLoansCount);
            formData.append("existingLoansData", JSON.stringify(existingLoans));

            // =====================================
            // CIBIL
            // =====================================
            appendIfPresent("hasCibil", data.hasCibil);
            appendIfPresent("cibilScore", data.cibilScore);

            // =====================================
            // Loan Details
            // =====================================
            appendIfPresent("requiredLoanAmount", data.requiredLoanAmount);
            appendIfPresent("preferredTenure", data.preferredTenure);
            appendIfPresent("purpose", data.purpose);
            appendIfPresent("isBuyingGoods", data.isBuyingGoods);
            appendIfPresent("quotationAmount", data.quotationAmount);
            appendIfPresent("productName", data.productName);

            appendIfPresent("purpose", data.purposeOfLoan);
            appendIfPresent("cibilIssues", data.cibilIssues);

            // =====================================
            // Co-Applicant
            // =====================================
            appendIfPresent("coApplicantName", data.coApplicantName);
            appendIfPresent("coApplicantRelation", data.coApplicantRelation);
            appendIfPresent("coApplicantEmploymentType", data.coApplicantEmploymentType);

            appendIfPresent("coApplicantRelation", data.relationshipWithApplicant);
            appendIfPresent("coApplicantEmploymentType", data.CoApplicantEmploymentType);

            appendIfPresent("coApplicantEmail", data.CoApplicantEmailID);
            appendIfPresent("coApplicantMobile", data.CoApplicantMobileNO);

            // =====================================
            // References (Dynamic)
            // =====================================
            formData.append("referenceCount", String(Math.max(1, referenceCount || 1)));

            for (let i = 0; i < Math.max(1, referenceCount || 1); i += 1) {
                const suffix = i === 0 ? "" : `_${i}`;
                appendIfPresent(`referenceFullName${suffix}`, (data as any)[`FirstReferenceFullName${suffix}`]);
                appendIfPresent(`referenceMobile${suffix}`, (data as any)[`ReferenceMobileNumber${suffix}`]);
                appendIfPresent(`referenceRelation${suffix}`, (data as any)[`RelationWithAplicant${suffix}`]);
                appendIfPresent(`referenceEmail${suffix}`, (data as any)[`ReferenceEmailId${suffix}`]);
                appendIfPresent(`referenceAddress${suffix}`, (data as any)[`ReferenceAddress${suffix}`]);
                appendIfPresent(`referenceState${suffix}`, (data as any)[`ReferenceState${suffix}`]);
                appendIfPresent(`referenceCity${suffix}`, (data as any)[`ReferenceCity${suffix}`]);
                appendIfPresent(`referencePincode${suffix}`, (data as any)[`ReferencePincode${suffix}`]);
            }

            // =====================================
            // Documents (Files)
            // =====================================
            const applicantPhoto = pickFirstFile(data.applicantPhoto);
            if (applicantPhoto) {
                formData.append(
                    "applicantPhoto",
                    await uploadToCloudinary(applicantPhoto, "loan_applications")
                );
            }

            const panPhoto = pickFirstFile(data.panPhoto);
            if (panPhoto) {
                formData.append(
                    "panPhoto",
                    await uploadToCloudinary(panPhoto, "loan_applications")
                );
            }

            const aadhaarPhoto = pickFirstFile(data.aadhaarPhoto);
            if (aadhaarPhoto) {
                formData.append(
                    "aadhaarPhoto",
                    await uploadToCloudinary(aadhaarPhoto, "loan_applications")
                );
            }

            const aadhaarBackPhoto = pickFirstFile(data.aadhaarBackPhoto);
            if (aadhaarBackPhoto) {
                formData.append(
                    "aadhaarBackPhoto",
                    await uploadToCloudinary(aadhaarBackPhoto, "loan_applications")
                );
            }

            const residencePhoto = pickFirstFile(data.residencePhoto);
            if (residencePhoto) {
                formData.append(
                    "residencePhoto",
                    await uploadToCloudinary(residencePhoto, "loan_applications")
                );
            }

            const lastElectricityBill = pickFirstFile(data.latestElectricityBill);
            if (lastElectricityBill)
                formData.append(
                    "lastElectricityBill",
                    await uploadToCloudinary(lastElectricityBill, "loan_applications")
                );

            const permElectricityBill = pickFirstFile(data.permanentAddressElectricityBill);
            if (permElectricityBill)
                formData.append(
                    "permElectricityBill",
                    await uploadToCloudinary(permElectricityBill, "loan_applications")
                );

            const rentAgreement = pickFirstFile(data.rentAgreement);
            if (rentAgreement)
                formData.append(
                    "rentAgreement",
                    await uploadToCloudinary(rentAgreement, "loan_applications")
                );

            const companyAllotmentLetter = pickFirstFile(data.companyAllotmentLetter);
            if (companyAllotmentLetter)
                formData.append(
                    "companyAllotmentLetter",
                    await uploadToCloudinary(companyAllotmentLetter, "loan_applications")
                );

            const officeIdPhoto = pickFirstFile(data.officeIdPhoto);
            if (officeIdPhoto)
                formData.append(
                    "officeIdPhoto",
                    await uploadToCloudinary(officeIdPhoto, "loan_applications")
                );

            const officeIDCardPhoto = pickFirstFile(data.officeIDCardPhoto);
            if (officeIDCardPhoto)
                formData.append(
                    "officeIdPhoto",
                    await uploadToCloudinary(officeIDCardPhoto, "loan_applications")
                );

            const salarySlips = pickFirstFile(data.salarySlips);
            if (salarySlips)
                formData.append(
                    "salarySlips",
                    await uploadToCloudinary(salarySlips, "loan_applications")
                );

            const lastThreeMonthsSalarySlips = pickFirstFile(data.LastThreeMonthsSalarySlips);
            if (lastThreeMonthsSalarySlips)
                formData.append(
                    "salarySlips",
                    await uploadToCloudinary(
                        lastThreeMonthsSalarySlips,
                        "loan_applications"
                    )
                );

            const bankStatement = pickFirstFile(data.bankStatement);
            if (bankStatement)
                formData.append(
                    "bankStatement",
                    await uploadToCloudinary(bankStatement, "loan_applications")
                );

            const cibilReport = pickFirstFile(data.cibilReport);
            if (cibilReport)
                formData.append(
                    "cibilReport",
                    await uploadToCloudinary(cibilReport, "loan_applications")
                );

            const lastSixMonthsBankStatement = pickFirstFile(data.lastSixMonthsBankStatement);
            if (lastSixMonthsBankStatement)
                formData.append(
                    "bankStatement",
                    await uploadToCloudinary(
                        lastSixMonthsBankStatement,
                        "loan_applications"
                    )
                );

            const quotationFile = pickFirstFile(data.quotationFile);
            if (quotationFile)
                formData.append(
                    "quotationFile",
                    await uploadToCloudinary(quotationFile, "loan_applications")
                );

            const proformaInvoiceFile = pickFirstFile(data.proformaInvoiceFile);
            if (proformaInvoiceFile)
                formData.append(
                    "proformaInvoiceFile",
                    await uploadToCloudinary(proformaInvoiceFile, "loan_applications")
                );

            const coApplicantPanPhoto = pickFirstFile(data.CoApplicantpanPhoto);
            if (coApplicantPanPhoto)
                formData.append(
                    "CoApplicantpanPhoto",
                    await uploadToCloudinary(coApplicantPanPhoto, "loan_applications")
                );

            const coApplicantAadhaarPhoto = pickFirstFile(data.CoApplicantAadhaarPhoto);
            if (coApplicantAadhaarPhoto)
                formData.append(
                    "CoApplicantAadhaarPhoto",
                    await uploadToCloudinary(coApplicantAadhaarPhoto, "loan_applications")
                );

            const coApplicantAadhaarBackPhoto = pickFirstFile(
                data.CoApplicantAadhaarBackPhoto
            );
            if (coApplicantAadhaarBackPhoto)
                formData.append(
                    "CoApplicantAadhaarBackPhoto",
                    await uploadToCloudinary(
                        coApplicantAadhaarBackPhoto,
                        "loan_applications"
                    )
                );

            const coApplicantPhoto = pickFirstFile(data.CoApplicantPhont);
            if (coApplicantPhoto)
                formData.append(
                    "CoApplicantPhoto",
                    await uploadToCloudinary(coApplicantPhoto, "loan_applications")
                );

            // =====================================
            // Other Supported Documents (Count Based)
            // =====================================
            const otherDocumentsCountRaw =
                data.NumberofOtherDocuments !== undefined &&
                    data.NumberofOtherDocuments !== null &&
                    String(data.NumberofOtherDocuments).trim() !== ""
                    ? String(data.NumberofOtherDocuments)
                    : "0";
            const otherDocumentsCount = Number.isFinite(Number(otherDocumentsCountRaw))
                ? parseInt(String(otherDocumentsCountRaw), 10)
                : 0;
            formData.append("numberOfOtherDocuments", String(Math.max(0, otherDocumentsCount || 0)));

            for (let i = 0; i < Math.max(0, otherDocumentsCount); i += 1) {
                appendIfPresent(`otherSupportedDocumentName_${i}`, (data as any)?.[`otherSupportedDocumentName_${i}`]);
                const key = `otherSupportedDocument_${i}`;
                const f = pickFirstFile((data as any)?.[key]);
                if (f) {
                    formData.append(
                        key,
                        await uploadToCloudinary(f, "loan_applications")
                    );
                }
            }

            const res = await axios.post("/api/salaried-loan", formData, {
                timeout: 45000,
            });
            console.log(res.data);

            if (!res?.data?.success) {
                throw new Error(res?.data?.message || "Submission failed");
            }

            alert("Your form successfully submitted!");
            onClose();
        } catch (error) {
            console.error(error);
            const message =
                (axios.isAxiosError(error) &&
                    (error.response?.data as any)?.message) ||
                (error instanceof Error ? error.message : "Submission failed");
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const sector = [
        { "id": 1, "name": "Information Technology (IT) & Software" },
        { "id": 2, "name": "Healthcare & Medical" },
        { "id": 3, "name": "Pharmaceuticals" },
        { "id": 4, "name": "Banking & Financial Services" },
        { "id": 5, "name": "Insurance" },
        { "id": 6, "name": "Non-Banking Financial Companies (NBFC)" },
        { "id": 7, "name": "Education & Training" },
        { "id": 8, "name": "Real Estate & Construction" },
        { "id": 9, "name": "Infrastructure" },
        { "id": 10, "name": "Manufacturing" },
        { "id": 11, "name": "Automobile & Auto Components" },
        { "id": 12, "name": "Logistics & Transportation" },
        { "id": 13, "name": "Retail & Wholesale Trade" },
        { "id": 14, "name": "E-Commerce" },
        { "id": 15, "name": "Telecommunications" },
        { "id": 16, "name": "Media & Entertainment" },
        { "id": 17, "name": "Hospitality & Tourism" },
        { "id": 18, "name": "Agriculture & Agribusiness" },
        { "id": 19, "name": "Food Processing" },
        { "id": 20, "name": "Energy & Power" },
        { "id": 21, "name": "Oil & Gas" },
        { "id": 22, "name": "Renewable Energy" },
        { "id": 23, "name": "Chemicals & Petrochemicals" },
        { "id": 24, "name": "Textiles & Garments" },
        { "id": 25, "name": "Mining & Metals" },
        { "id": 26, "name": "Other" }
    ]

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6 overflow-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 max-h-[92vh] flex flex-col">
                <div className="sticky top-0 z-10 border-b bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 px-6 pt-6 pb-5 text-white sm:px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-3 top-3 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        ×
                    </button>
                    <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                        Salaried employee loan application form
                    </h2>
                    {/* {categoryTitle ? (
                        <p className="mt-1 text-center text-sm text-white/70">{categoryTitle}</p>
                    ) : null} */}
                </div>

                <form id="salariedLoanForm" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 sm:px-8 sm:py-8 bg-gray-50">

                    {/* ================= PERSONAL DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">A. Applicant basic details</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
                                <input {...register("firstName", { required: true })} placeholder="First Name" className="input bg-gray-200" />
                                {getError("firstName") ? (
                                    <p className="text-sm text-red-600">{getError("firstName")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Middle Name <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("middleName")} placeholder="Middle Name" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
                                <input {...register("lastName", { required: true })} placeholder="Last Name" className="input bg-gray-200" />
                                {getError("lastName") ? (
                                    <p className="text-sm text-red-600">{getError("lastName")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Date of Birth <span className="text-destructive">*</span></label>
                                <input type="date" {...register("dob", { required: true })} className="input bg-gray-200" />
                                {getError("dob") ? (
                                    <p className="text-sm text-red-600">{getError("dob")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Gender <span className="text-destructive">*</span></label>
                                <select {...register("gender", { required: true })} className="input bg-gray-200">
                                    <option value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                {getError("gender") ? (
                                    <p className="text-sm text-red-600">{getError("gender")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Marital Status <span className="text-destructive">*</span></label>
                                <select {...register("maritalStatus", { required: true })} className="input bg-gray-200">
                                    <option value="">Marital Status</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>
                                    <option>Widowed</option>
                                </select>
                                {getError("maritalStatus") ? (
                                    <p className="text-sm text-red-600">{getError("maritalStatus")}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* ================= CONTACT ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">B.Applicant Contact Details</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Adhaar Linked Primary Mobile Number <span className="text-destructive">*</span></label>
                                <input {...register("mobileNumber", { required: true })} placeholder="Mobile Number" className="input bg-gray-200" />
                                {getError("mobileNumber") ? (
                                    <p className="text-sm text-red-600">{getError("mobileNumber")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">WhatsApp Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("whatsappNumber")} placeholder="WhatsApp Number" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Alternate Mobile <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("alternateMobile")} placeholder="Alternate Mobile" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Personal Email ID <span className="text-destructive">*</span></label>
                                <input {...register("personalEmail", { required: true })} placeholder="Personal Email" className="input bg-gray-200" />
                                {getError("personalEmail") ? (
                                    <p className="text-sm text-red-600">{getError("personalEmail")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Official Email ID<span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("officialEmail")} placeholder="Official Email" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Voter ID<span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("VoterID")} placeholder="Voter ID" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Driving License <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("DrivingLicense")} placeholder="Driving License" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Passport No.<span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("PasswordNo")} placeholder="Passport No." className="input bg-gray-200" />
                            </div>

                        </div>
                    </div>

                    {/* ================= ID DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">C. Applicant KYC Details</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">PAN Number <span className="text-destructive">*</span></label>
                                <input {...register("panNumber", { required: true })} placeholder="PAN Number" className="input bg-gray-200" />
                                {getError("panNumber") ? (
                                    <p className="text-sm text-red-600">{getError("panNumber")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Number <span className="text-destructive">*</span></label>
                                <input {...register("aadhaarNumber", { required: true })} placeholder="Aadhaar Number" className="input bg-gray-200" />
                                {getError("aadhaarNumber") ? (
                                    <p className="text-sm text-red-600">{getError("aadhaarNumber")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">PAN Photo <span className="text-destructive">*</span></label>
                                <input type="file" {...register("panPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("panPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("panPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Front Photo <span className="text-destructive">*</span></label>
                                <input type="file" {...register("aadhaarPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("aadhaarPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("aadhaarPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Back Photo <span className="text-destructive">*</span></label>
                                <input type="file" {...register("aadhaarBackPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("aadhaarBackPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("aadhaarBackPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Applicant Photo <span className="text-destructive">*</span></label>
                                <input type="file" {...register("applicantPhoto", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("applicantPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("applicantPhoto")}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* ================= ADDRESS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">D. Applicant Current Residential Address Details</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Current Address <span className="text-destructive">*</span></label>
                                <textarea {...register("currentResidentialAddress", { required: true })} cols={5} rows={10} placeholder="Current Address" className="input bg-gray-200" />
                                {getError("currentResidentialAddress") ? (
                                    <p className="text-sm text-red-600">{getError("currentResidentialAddress")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">State <span className="text-destructive">*</span></label>
                                <input {...register("state", { required: true })} placeholder="State" className="input bg-gray-200" />
                                {getError("state") ? (
                                    <p className="text-sm text-red-600">{getError("state")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
                                <input {...register("city", { required: true })} placeholder="City" className="input bg-gray-200" />
                                {getError("city") ? (
                                    <p className="text-sm text-red-600">{getError("city")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Pincode <span className="text-destructive">*</span></label>
                                <input {...register("currentResidentialPincode", { required: true })} placeholder="Pincode" className="input bg-gray-200" />
                                {getError("currentResidentialPincode") ? (
                                    <p className="text-sm text-red-600">{getError("currentResidentialPincode")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Residence Type <span className="text-destructive">*</span></label>
                                <select {...register("residenceType", { required: true })} className="input bg-gray-200">
                                    <option value="">Residence Type</option>
                                    <option>Owned</option>
                                    <option>Rented</option>
                                    <option>Company Provided</option>
                                </select>
                                {getError("residenceType") ? (
                                    <p className="text-sm text-red-600">{getError("residenceType")}</p>
                                ) : null}
                            </div>

                            {residenceType === "Owned" && (
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Upload latest electricity bill <span className="text-red-400 text-xs">(optional)</span></label>
                                    <input type="file" {...register("latestElectricityBill", { validate: validateMax2MB })} className="input bg-gray-200" />
                                    {getError("latestElectricityBill") ? (
                                        <p className="text-sm text-red-600">{getError("latestElectricityBill")}</p>
                                    ) : null}
                                </div>
                            )}

                            {residenceType === "Rented" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Permanent Address <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input {...register("permanentAddress")} placeholder="Permanent Address" className="input bg-gray-200" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Permanent Address Electricity Bill <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("permanentAddressElectricityBill", { validate: validateMax2MB })} className="input bg-gray-200" />
                                        {getError("permanentAddressElectricityBill") ? (
                                            <p className="text-sm text-red-600">{getError("permanentAddressElectricityBill")}</p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Rent Agreement <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("rentAgreement", { validate: validateMax2MB })} className="input bg-gray-200" />
                                        {getError("rentAgreement") ? (
                                            <p className="text-sm text-red-600">{getError("rentAgreement")}</p>
                                        ) : null}
                                    </div>
                                </>
                            )}

                            {residenceType === "Company Provided" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Permanent Address <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input {...register("permanentAddress")} placeholder="Permanent Address" className="input bg-gray-200" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Permanent Address Electricity Bill <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("permanentAddressElectricityBill", { validate: validateMax2MB })} className="input bg-gray-200" />
                                        {getError("permanentAddressElectricityBill") ? (
                                            <p className="text-sm text-red-600">{getError("permanentAddressElectricityBill")}</p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Company Allotment Letter <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("companyAllotmentLetter", { validate: validateMax2MB })} className="input bg-gray-200" />
                                        {getError("companyAllotmentLetter") ? (
                                            <p className="text-sm text-red-600">{getError("companyAllotmentLetter")}</p>
                                        ) : null}
                                    </div>
                                </>
                            )}

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Staying Since (Date) <span className="text-destructive">*</span></label>
                                <input type="date" {...register("stayingSinceDate", { required: true })} placeholder="City" className="input bg-gray-200" />
                                {getError("stayingSinceDate") ? (
                                    <p className="text-sm text-red-600">{getError("stayingSinceDate")}</p>
                                ) : null}
                            </div>
                        </div>

                    </div>

                    {/* ================= EMPLOYMENT ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">E.Applicant Employment Details</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Current working company name <span className="text-destructive">*</span></label>
                                <input {...register("companyName", { required: true })} placeholder="Current working company name" className="input bg-gray-200" />
                                {getError("companyName") ? (
                                    <p className="text-sm text-red-600">{getError("companyName")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Organization Type <span className="text-destructive">*</span></label>
                                <select {...register("OrganizationType", { required: true })} className="input bg-gray-200">
                                    <option value="">--Organization Type--</option>
                                    <option value="">Organization Type</option>
                                    <option value="Proprietorship">Proprietorship</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="HUF">HUF Unregistered</option>
                                    <option value="CooperativeSociety">Co-operative Society</option>
                                    <option value="LLP">LLP Registered</option>
                                    <option value="OPC">OPC Registered</option>
                                    <option value="PrivateLimited">Private Limited Company</option>
                                    <option value="PublicLimited">Public Limited Company</option>
                                    <option value="Section8">Section 8 Company</option>
                                    <option value="ProducerCompany">Producer Company</option>
                                    <option value="Nidhi">Nidhi Company</option>
                                    <option value="Government">Government Company</option>
                                    <option value="HoldingCompany">Holding Company</option>
                                    <option value="SubsidiaryCompany">Subsidiary Company</option>
                                    <option value="AssociateCompany">Associate Company</option>
                                    <option value="ForeignCompany">Foreign Company</option>
                                    <option value="JointVenture">Joint Venture</option>
                                    <option value="NBFC">NBFC</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Industry/ Sector <span className="text-destructive">*</span></label>
                                <select {...register("IndustrySector", { required: true })} className="input bg-gray-200">
                                    <option value="">--Sector--</option>
                                    {
                                        sector.map((s) => (
                                            <option key={s.id} value={s.name}>{s.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Specify in others<span className="text-destructive">(optional)</span></label>
                                <input {...register("otherSector")} placeholder="Please Specify" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Designation <span className="text-destructive">*</span></label>
                                <input {...register("designation", { required: true })} placeholder="Designation" className="input bg-gray-200" />
                                {getError("designation") ? (
                                    <p className="text-sm text-red-600">{getError("designation")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Employment Type <span className="text-destructive">*</span></label>
                                <select {...register("employmentType", { required: true })} className="input bg-gray-200">
                                    <option value="">Employment Type</option>
                                    <option>Permanent</option>
                                    <option>Contract</option>
                                    <option>Temporary</option>
                                    <option>Probation</option>
                                    <option>PartTime</option>
                                </select>
                                {getError("employmentType") ? (
                                    <p className="text-sm text-red-600">{getError("employmentType")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Date of Joining <span className="text-destructive">*</span></label>
                                <input type="date" {...register("dateOfJoining", { required: true })} className="input bg-gray-200" />
                                {getError("dateOfJoining") ? (
                                    <p className="text-sm text-red-600">{getError("dateOfJoining")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Total Work Experience (Years) <span className="text-destructive">*</span></label>
                                <input {...register("totalWorkExperience", { required: true })} placeholder="Total Work Experience (Years)" className="input bg-gray-200" />
                                {getError("totalWorkExperience") ? (
                                    <p className="text-sm text-red-600">{getError("totalWorkExperience")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Current Office Full Address <span className="text-destructive">*</span></label>
                                <input {...register("currectOfficeAddress", { required: true })} placeholder="Current Office Full Address" className="input bg-gray-200" />
                                {getError("currectOfficeAddress") ? (
                                    <p className="text-sm text-red-600">{getError("currectOfficeAddress")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Office PIN<span className="text-destructive">*</span></label>
                                <input {...register("officePIN", { required: true })} placeholder="Office PIN" className="input bg-gray-200" />
                                {getError("officePIN") ? (
                                    <p className="text-sm text-red-600">{getError("officePIN")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Office Email ID <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("officelEmailID")} placeholder="Official Email" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Office ID Card Photo (pdf, jpg allowed )   <span className="text-destructive">*</span></label>
                                <input type="file" {...register("officeIDCardPhoto", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("officeIDCardPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("officeIDCardPhoto")}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* ================= Income Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">F. Applicant income details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Monthly Net Salary <span className="text-destructive">*</span></label>
                                </div>
                                <input {...register("monthlyNetSalary", { required: true })} placeholder="Monthly Net Salary" className="input bg-gray-200" />
                                {getError("monthlyNetSalary") ? (
                                    <p className="text-sm text-red-600">{getError("monthlyNetSalary")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Salary Credit Mode <span className="text-destructive">*</span></label>
                                </div>
                                <select {...register("salaryCreditMode", { required: true })} className="input bg-gray-200">
                                    <option value="">Salary Credit Mode</option>
                                    <option value="NEFT">NEFT</option>
                                    <option value="RTGS">RTGS</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Cash">Cash</option>
                                </select>
                                {getError("salaryCreditMode") ? (
                                    <p className="text-sm text-red-600">{getError("salaryCreditMode")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Salary Credit Account  Bank Name <span className="text-destructive">*</span></label>
                                </div>
                                <input {...register("salaryAccountBankName", { required: true })} placeholder="Salary Bank Name" className="input bg-gray-200" />
                                {getError("salaryAccountBankName") ? (
                                    <p className="text-sm text-red-600">{getError("salaryAccountBankName")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Last 6 Months Salary Slips (pdf, jpg allowed ) <span className="text-destructive">*</span></label>
                                <input type="file" {...register("LastThreeMonthsSalarySlips", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("LastThreeMonthsSalarySlips") ? (
                                    <p className="text-sm text-red-600">{getError("LastThreeMonthsSalarySlips")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Last 6 Months Bank Statement (pdf, jpg allowed ) <span className="text-destructive">*</span></label>
                                <input type="file" {...register("lastSixMonthsBankStatement", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("lastSixMonthsBankStatement") ? (
                                    <p className="text-sm text-red-600">{getError("lastSixMonthsBankStatement")}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* ================= EXISTING LOANS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">G. Applicant existing loans details</h3>
                        <div className="flex flex-col mb-2">
                            <label className="text-sm font-medium">Number Of Existing Loans<span className="text-red-400 text-xs">(optional)</span></label>
                            <select {...register("NumberOfExistingLoans")} className="input bg-gray-200" >
                                <option value="">Select Options</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>

                            </select>
                        </div>
                        {existingLoans.map((loan, index) => (
                            <div key={index} className="grid md:grid-cols-4 gap-3 mb-3">
                                <input
                                    placeholder="Loan Amount"
                                    value={loan.totalLoanAmount}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].totalLoanAmount = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input bg-gray-200"
                                />
                                <input
                                    placeholder="Monthly EMI"
                                    value={loan.totalMonthlyEmi}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].totalMonthlyEmi = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input bg-gray-200"
                                />
                                <input
                                    placeholder="Loan Type"
                                    value={loan.loanType}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].loanType = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input bg-gray-200"
                                />
                                <input
                                    placeholder="Bank Name"
                                    value={loan.bankName}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].bankName = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input bg-gray-200"
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                setExistingLoans([
                                    ...existingLoans,
                                    {
                                        totalLoanAmount: "",
                                        totalMonthlyEmi: "",
                                        loanType: "",
                                        bankName: "",
                                    },
                                ])
                            }
                            className="mt-2 inline-flex w-fit items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                        >
                            + Add More
                        </button>
                    </div>
                    {/* ================= G.Credit Score ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">H. Applicant CIBIL  Score Details</h3>
                        <div className="space-y-1">
                            <div>
                                <label className="text-sm font-medium">CIBIL Available <span className="text-destructive">*</span></label>
                            </div>
                            <select {...register("hasCibil", { required: true })} className="input bg-gray-200">
                                <option value="">Do you have CIBIL?</option>
                                <option value="Yes">I have a CIBIL score</option>
                                <option value="No">I don't have a CIBIL score</option>
                            </select>
                            {getError("hasCibil") ? (
                                <p className="text-sm text-red-600">{getError("hasCibil")}</p>
                            ) : null}
                        </div>

                        {hasCibil === "Yes" && (
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">CIBIL Score <span className="text-destructive">*</span></label>
                                    <input
                                        {...register("cibilScore", {
                                            validate: (value) =>
                                                hasCibil !== "Yes" ||
                                                (value !== undefined &&
                                                    value !== null &&
                                                    String(value).trim() !== "") ||
                                                "CIBIL Score is required",
                                        })}
                                        placeholder="CIBIL Score"
                                        className="input bg-gray-200"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium">CIBIL Report (PDF) <span className="text-red-400 text-xs">(optional)</span></label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        {...register("cibilReport", { validate: validateMax2MB })}
                                        className="input bg-gray-200"
                                    />
                                    {getError("cibilReport") ? (
                                        <p className="text-sm text-red-600">{getError("cibilReport")}</p>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* ================= LOAN DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">I. Loan Requirement Details</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Required Loan Amount <span className="text-destructive">*</span></label>
                                <input {...register("requiredLoanAmount", { required: true })} placeholder="Required Loan Amount" className="input bg-gray-200" />
                                {getError("requiredLoanAmount") ? (
                                    <p className="text-sm text-red-600">{getError("requiredLoanAmount")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Preferred Loan Tenure <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("preferredTenure")} placeholder="Preferred Tenure" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Purpose of Loan <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("purposeOfLoan")} placeholder="Preferred Tenure" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable. <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("cibilIssues")} placeholder="CibilIssues" className="input bg-gray-200" />
                            </div>



                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Are you buying any goods <span className="text-destructive">*</span></label>
                                </div>
                                <select {...register("isBuyingGoods", { required: true })} className="input bg-gray-200">
                                    <option value="">Buying Goods?</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {getError("isBuyingGoods") ? (
                                    <p className="text-sm text-red-600">{getError("isBuyingGoods")}</p>
                                ) : null}
                            </div>

                            {isBuyingGoods === "Yes" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Product Name <span className="text-destructive">*</span></label>
                                        <input
                                            type="text"
                                            {...register("productName", {
                                                validate: (value) =>
                                                    isBuyingGoods !== "Yes" ||
                                                    (value !== undefined &&
                                                        value !== null &&
                                                        String(value).trim() !== "") ||
                                                    "Product Name is required",
                                            })}
                                            placeholder="Product Name"
                                            className="input bg-gray-200"
                                        />
                                        {getError("productName") ? (
                                            <p className="text-sm text-red-600">{getError("productName")}</p>
                                        ) : null}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Quotation Amount (₹) <span className="text-destructive">*</span></label>
                                        <input
                                            type="number"
                                            {...register("quotationAmount", {
                                                validate: (value) =>
                                                    isBuyingGoods !== "Yes" ||
                                                    (value !== undefined &&
                                                        value !== null &&
                                                        String(value).trim() !== "") ||
                                                    "Quotation Amount is required",
                                            })}
                                            placeholder="Quotation Amount"
                                            className="input bg-gray-200"
                                        />
                                        {getError("quotationAmount") ? (
                                            <p className="text-sm text-red-600">{getError("quotationAmount")}</p>
                                        ) : null}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Upload Proforma Invoice (PDF, Max 10MB) <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            {...register("proformaInvoiceFile", {
                                                validate: (value) => {
                                                    return validateMax2MB(value);
                                                },
                                            })}
                                            className="input bg-gray-200"
                                        />
                                    </div>
                                </>
                            )}

                        </div>
                    </div>



                    {/* ================= DOCUMENTS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">J. Co-Applicant Details (If Any)</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Name <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("coApplicantName")} placeholder="Co-Applicant Name" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Relationship with Applicant <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("relationshipWithApplicant")} placeholder="Co-Applicant Name" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Employment Type <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantEmploymentType")} placeholder="Co-Applicant Name" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Photo  <span className="text-red-400 text-xs">*</span></label>
                                <input type="file" {...register("CoApplicantPhont", { required: true })} className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Email ID <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantEmailID")} placeholder="Co-Applicant Email ID" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Mobile Number <span className="text-red-400 text-xs">*</span></label>
                                <input {...register("CoApplicantMobileNO", { required: true })} placeholder="Co-Applicant Mobile Number" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant PAN Card Photo <span className="text-destructive">(optional)</span></label>
                                <input type="file" {...register("CoApplicantpanPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("CoApplicantpanPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("CoApplicantpanPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Aadhaar Front Photo <span className="text-destructive">(optional)</span></label>
                                <input type="file" {...register("CoApplicantAadhaarPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("CoApplicantAadhaarPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("CoApplicantAadhaarPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Aadhaar Back Photo <span className="text-destructive">(optional)</span></label>
                                <input type="file" {...register("CoApplicantAadhaarBackPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("CoApplicantAadhaarBackPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("CoApplicantAadhaarBackPhoto")}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* ================= J. Upload Other Supported Document================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">K. Upload Other Supported Document</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Number of Other Documents</label>
                                <select {...register("NumberofOtherDocuments")} className="input bg-gray-200">
                                    <option value="">0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>

                                </select>
                            </div>
                            {otherDocumentsCount > 0 ? (
                                <div className="space-y-3">
                                    {Array.from({ length: otherDocumentsCount }).map((_, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <label className="text-sm font-medium">Upload Document {idx + 1} (PDF)</label>
                                            <input
                                                type="text"
                                                {...register(`otherSupportedDocumentName_${idx}`)}
                                                placeholder={`Document ${idx + 1} Name`}
                                                className="input bg-gray-200"
                                            />
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                {...register(`otherSupportedDocument_${idx}`, {
                                                    validate: (value) => {
                                                        if (otherDocumentsCount <= 0) return true;
                                                        const requiredCheck = !!getFileFromValue(value) || `Document ${idx + 1} is required`;
                                                        if (requiredCheck !== true) return requiredCheck;
                                                        return validateMax2MB(value);
                                                    },
                                                })}
                                                className="input bg-gray-200"
                                            />
                                            {getError(`otherSupportedDocument_${idx}`) ? (
                                                <p className="text-sm text-red-600">{getError(`otherSupportedDocument_${idx}`)}</p>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>


                    {/* ================= reference name details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">L. Reference name details</h3>

                        {Array.from({ length: Math.max(1, referenceCount || 1) }).map((_, idx) => {
                            const suffix = idx === 0 ? "" : `_${idx}`;
                            return (
                                <div key={idx} className="grid md:grid-cols-2 gap-4">
                                    <div className="flex flex-col items-start gap-3">
                                        <label className="text-sm font-medium">First Reference Full Name<span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`FirstReferenceFullName${suffix}`)} placeholder="First Reference Full Name" className="input bg-gray-200 " />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Reference Mobile Number<span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceMobileNumber${suffix}`)} placeholder="Reference Mobile Number" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Relation With Aplicant<span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`RelationWithAplicant${suffix}`)} placeholder="Relation With Aplicant" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex  flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Email ID <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceEmailId${suffix}`)} placeholder="Email ID" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Address <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceAddress${suffix}`)} placeholder="Address" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">State <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceState${suffix}`)} placeholder="State" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">City <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceCity${suffix}`)} placeholder="City" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Pincode <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferencePincode${suffix}`)} placeholder="Pincode" className="input bg-gray-200" />
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setReferenceCount((c) => Math.max(1, (c || 1) + 1))}
                        >
                            Add More Reference Details
                        </button>
                    </div>

                    {/* ================= CONSENT ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">M. Declaration & Consent</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <input type="checkbox" {...register("consent", { required: true })} className="mt-1 h-4 w-4" />
                                <span className="text-sm text-gray-700">I agree to Terms & Conditions and Privacy Policy.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <input type="checkbox" {...register("consent", { required: true })} className="mt-1 h-4 w-4" />
                                <span className="text-sm text-gray-700">I authorize Infinity Loans & Business Solutions to verify my details and share my application with Banks / NBFCs for loan evaluation.</span>
                            </div>
                            {getError("consent") ? (
                                <p className="text-sm text-red-600">{getError("consent")}</p>
                            ) : null}
                        </div>
                    </div>

                </form>

                <div className="sticky bottom-0 z-10 border-t bg-white/90 px-6 py-4 backdrop-blur sm:px-8">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
                        <button type="button" onClick={onClose} className="w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto">
                            Cancel
                        </button>
                        <button type="submit" form="salariedLoanForm" disabled={loading} className="w-full rounded-xl bg-[#F97415] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110 disabled:opacity-60 sm:w-auto">
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
