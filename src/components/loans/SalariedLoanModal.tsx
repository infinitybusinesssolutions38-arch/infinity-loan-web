

"use client";

import React, { useEffect, useState } from "react";
import LoanApplicationSuccessModal from "./LoanApplicationSuccessModal";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
    resetCloudinarySignatureCache,
    uploadFileToCloudinary,
} from "@/lib/cloudinary-client-upload";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    categoryKey?: string;
    categoryTitle?: string;
};

type LoanFormData = Record<string, any>;

export default function SalariedLoanModal({ isOpen, onClose, categoryKey, categoryTitle }: Props) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedApplicationRef, setSubmittedApplicationRef] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoanFormData>();

    useEffect(() => {
        if (!isOpen) setShowSuccessModal(false);
    }, [isOpen]);

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        setSubmittedApplicationRef(null);
        onClose();
    };

    const toAccountKey = (value: any) => {
        return String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");
    };

    const SUBMIT_TIMEOUT_MS = 120000;

    const isPdfPasswordProtected = async (file: File) => {
        try {
            const isPdf =
                file.type === "application/pdf" ||
                (typeof file.name === "string" && file.name.toLowerCase().endsWith(".pdf"));
            if (!isPdf) return false;

            const buf = await file.arrayBuffer();
            const slice = buf.slice(0, Math.min(buf.byteLength, 512 * 1024));
            const text = new TextDecoder("latin1").decode(new Uint8Array(slice));

            // Heuristic: encrypted PDFs usually include an /Encrypt entry in the trailer/catalog.
            // This catches most password-protected PDFs without changing UI.
            return text.includes("/Encrypt");
        } catch {
            return false;
        }
    };

    const getFileFromValue = (value: any): File | null => {
        if (value instanceof File) return value;
        if (value?.[0] instanceof File) return value[0];
        return null;
    };
    const validateMax2MB = async (value: any) => {
        const file = getFileFromValue(value);
        if (!file) return true;

        const isAllowedMime =
            file.type === "application/pdf" ||
            file.type === "image/jpeg" ||
            file.type === "image/jpg";

        const fileName = typeof file.name === "string" ? file.name.toLowerCase() : "";
        const isAllowedExt =
            fileName.endsWith(".pdf") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg");

        if (!isAllowedMime && !isAllowedExt) return "Please pdf or jpg";

        if (await isPdfPasswordProtected(file)) {
            return "Password-protected PDFs are not supported";
        }

        if (file.size > 5 * 1024 * 1024) return "Max size is 5 MB";
        return true;
    };

    const uploadToCloudinary = uploadFileToCloudinary;

    const getError = (key: string) => {
        const err = (errors as any)?.[key];
        if (!err) return null;
        const msg = typeof err.message === "string" ? err.message : "";
        return msg || "This field is required";
    };

    const [loading, setLoading] = useState(false);

    const [referenceCount, setReferenceCount] = useState(1);

    const [applicantAssetsCount, setApplicantAssetsCount] = useState(1);

    // Dynamic Existing Loans
    const [existingLoans, setExistingLoans] = useState<
        {
            totalLoanAmount: string;
            totalMonthlyEmi: string;
            loanType: string;
            bankName: string;
            loanTenure: string;
            loanEmi: string;
            closingDate: string;
        }[]
    >([
        {
            totalLoanAmount: "",
            totalMonthlyEmi: "",
            loanType: "",
            bankName: "",
            loanTenure: "",
            loanEmi: "",
            closingDate: "",
        },
    ]);

    if (!isOpen) return null;

    const residenceType = watch("residenceType");
    const hasCibil = watch("hasCibil");
    const isBuyingGoods = watch("isBuyingGoods");
    const medicalHistory = watch("medicalHistory");
    const habbit = watch("habbit");
    const caseHistory = watch("caseHistory");
    const accountTypes = watch("accountTypes");
    const hasSelectedAccountTypes =
        (Array.isArray(accountTypes) && accountTypes.length > 0) ||
        (typeof accountTypes === "string" && String(accountTypes).trim() !== "");
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
            appendIfPresent("age", data.age);
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

            // =====================================
            // Bank statement (account type)
            // =====================================
            const accountTypesArray: string[] = Array.isArray(data.accountTypes)
                ? data.accountTypes
                : typeof data.accountTypes === "string" && data.accountTypes
                    ? [data.accountTypes]
                    : [];

            accountTypesArray.forEach((v) => {
                if (typeof v === "string" && v.trim()) formData.append("accountTypes", v);
            });
            appendIfPresent("accountType", accountTypesArray.join(", "));

            const bankAccountsPayload: Array<{ accountType: string; bankName: string }> = [];
            for (const t of accountTypesArray) {
                const key = toAccountKey(t);
                const bankNameKey = `bankName_${key}`;
                const statementKey = `oneYearBankStatement_${key}`;
                const passwordKey = `accountPassword_${key}`;

                const bankNameValueRaw = (data as any)?.[bankNameKey];
                const bankNameValue =
                    typeof bankNameValueRaw === "string" ? bankNameValueRaw.trim() : "";
                if (bankNameValue) {
                    formData.append(bankNameKey, bankNameValue);
                }

                const statementFile = pickFirstFile((data as any)?.[statementKey]);
                if (statementFile) {
                    formData.append(
                        statementKey,
                        await uploadToCloudinary(statementFile, "loan_applications")
                    );
                }

                appendIfPresent(passwordKey, (data as any)?.[passwordKey]);

                bankAccountsPayload.push({ accountType: String(t || ""), bankName: bankNameValue });
            }
            formData.append("bankAccounts", JSON.stringify(bankAccountsPayload));

            appendIfPresent("purpose", data.purposeOfLoan);
            appendIfPresent("cibilIssues", data.cibilIssues);

            // =====================================
            // Medical History / Habits / Case History
            // =====================================
            appendIfPresent("medicalHistory", data.medicalHistory);
            appendIfPresent("medicalHistoryDetails", data.medicalHistoryDetails);
            appendIfPresent("habbit", data.habbit);
            appendIfPresent("habbitDetails", data.habbitDetails);
            appendIfPresent("caseHistory", data.caseHistory);
            appendIfPresent("caseHistoryDetails", data.caseHistoryDetails);

            // =====================================
            // Applicant Assets (Dynamic)
            // =====================================
            appendIfPresent("applicantAssetType", data.applicantAssetType);
            appendIfPresent("applicantAssetMarketPrice", data.applicantAssetMarketPrice);
            appendIfPresent("applicantAssetOngoingLoan", data.applicantAssetOngoingLoan);

            const applicantAssetsPayload: Array<{
                applicantAssetType?: string;
                applicantAssetMarketPrice?: string;
                applicantAssetOngoingLoan?: string;
            }> = [];

            for (let i = 0; i < applicantAssetsCount; i += 1) {
                const typeKey = i === 0 ? "applicantAssetType" : `applicantAssetType_${i}`;
                const priceKey = i === 0 ? "applicantAssetMarketPrice" : `applicantAssetMarketPrice_${i}`;
                const ongoingLoanKey = i === 0 ? "applicantAssetOngoingLoan" : `applicantAssetOngoingLoan_${i}`;

                const applicantAssetType = (data as any)?.[typeKey];
                const applicantAssetMarketPrice = (data as any)?.[priceKey];
                const applicantAssetOngoingLoan = (data as any)?.[ongoingLoanKey];

                const t = applicantAssetType !== undefined && applicantAssetType !== null ? String(applicantAssetType).trim() : "";
                const p = applicantAssetMarketPrice !== undefined && applicantAssetMarketPrice !== null ? String(applicantAssetMarketPrice).trim() : "";
                const o = applicantAssetOngoingLoan !== undefined && applicantAssetOngoingLoan !== null ? String(applicantAssetOngoingLoan).trim() : "";

                if (!t && !p && !o) continue;
                applicantAssetsPayload.push({
                    applicantAssetType: t,
                    applicantAssetMarketPrice: p,
                    applicantAssetOngoingLoan: o,
                });
            }

            formData.append("applicantAssetsPayload", JSON.stringify(applicantAssetsPayload));

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

            const cibilReport = pickFirstFile(data.cibilReport);
            if (cibilReport)
                formData.append(
                    "cibilReport",
                    await uploadToCloudinary(cibilReport, "loan_applications")
                );

            const quotationFile = pickFirstFile(data.quotationFile);
            if (quotationFile)
                formData.append(
                    "quotationFile",
                    await uploadToCloudinary(quotationFile, "loan_applications")
                );

            const medicalDocument = pickFirstFile(data.medicalDocument);
            if (medicalDocument) {
                formData.append(
                    "medicalDocument",
                    await uploadToCloudinary(medicalDocument, "loan_applications")
                );
            }

            const proformaInvoiceFile = pickFirstFile(data.proformaInvoiceFile);
            if (proformaInvoiceFile)
                formData.append(
                    "proformaInvoiceFile",
                    await uploadToCloudinary(proformaInvoiceFile, "loan_applications")
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
                timeout: SUBMIT_TIMEOUT_MS,
            });
            console.log(res.data);

            if (!res?.data?.success) {
                throw new Error(res?.data?.message || "Submission failed");
            }

            const ref =
                res?.data?.applicationRef ||
                res?.data?.data?.applicationRef ||
                null;
            setSubmittedApplicationRef(ref ? String(ref) : null);
            setShowSuccessModal(true);
        } catch (error) {
            console.error(error);
            const message =
                (axios.isAxiosError(error) &&
                    (error.response?.data as any)?.message) ||
                (error instanceof Error ? error.message : "Submission failed");
            alert(message);
        } finally {
            resetCloudinarySignatureCache();
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
        <>
        <LoanApplicationSuccessModal
            isOpen={showSuccessModal}
            onClose={handleSuccessClose}
            applicationRef={submittedApplicationRef}
            categoryKey={categoryKey}
            categoryTitle={categoryTitle}
        />
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-[#0F172A]/28 p-4 sm:p-6 ${showSuccessModal ? "pointer-events-none" : ""}`}
            aria-hidden={showSuccessModal}
            onClick={(e) => {
                if (e.target === e.currentTarget && !showSuccessModal) onClose();
            }}
        >
            <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_14px_30px_rgba(15,23,42,0.12)] ring-1 ring-[#D6EEF8]">
                <div className="sticky top-0 z-10 border-b border-[#D6EEF8] bg-[#F5FCFF] px-6 pb-5 pt-6 text-[#1A1A1A] sm:px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-3 top-3 rounded-full p-2 text-[#6B7280] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:text-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/25"
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

                <form id="salariedLoanForm" onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6 overflow-y-auto bg-[#F7F9FC] px-6 py-6 sm:px-8 sm:py-8">

                    {/* ================= PERSONAL DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">1. Applicant Basic Details</h3>
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
                                <label className="text-sm font-medium">Age <span className="text-destructive">*</span></label>
                                <input type="text" {...register("age", { required: true })} placeholder="Age" className="input bg-gray-200" />
                                {getError("age") ? (
                                    <p className="text-sm text-red-600">{getError("age")}</p>
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

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Adhaar Linked Primary Mobile Number <span className="text-destructive">*</span></label>
                                <input {...register("mobileNumber", { required: true })} placeholder="Mobile Number" className="input bg-gray-200" />
                                {getError("mobileNumber") ? (
                                    <p className="text-sm text-red-600">{getError("mobileNumber")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Alternate Mobile Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("alternateMobile")} placeholder="Mobile Number" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">WhatsApp Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("whatsappNumber")} placeholder="Mobile Number" className="input bg-gray-200" />
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
                                <input {...register("officialEmail")} placeholder="Business Email" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Voter ID<span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("VoterID")} placeholder="Official Email" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Driving License <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("DrivingLicense")} placeholder="Official Email" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Passport No.<span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("PasswordNo")} placeholder="Official Email" className="input bg-gray-200" />
                            </div>
                        </div>
                    </div>

                    {/* ================= ID DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">2. Applicant KYC Details</h3>
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
                        </div>
                    </div>

                    {/* ================= ADDRESS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">3. Applicant Current Residential Address Details</h3>
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

                            {residenceType === "Rented" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Permanent Address <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input {...register("permanentAddress")} placeholder="Permanent Address" className="input bg-gray-200" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Permanent Address Electricity Bill <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("permanentAddressElectricityBill")} className="input bg-gray-200" />
                                        {getError("permanentAddressElectricityBill") ? (
                                            <p className="text-sm text-red-600">{getError("permanentAddressElectricityBill")}</p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Rent Agreement <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("rentAgreement")} className="input bg-gray-200" />
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
                                        <input type="file" {...register("permanentAddressElectricityBill")} className="input bg-gray-200" />
                                        {getError("permanentAddressElectricityBill") ? (
                                            <p className="text-sm text-red-600">{getError("permanentAddressElectricityBill")}</p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Company Allotment Letter <span className="text-red-400 text-xs">(optional)</span></label>
                                        <input type="file" {...register("companyAllotmentLetter")} className="input bg-gray-200" />
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
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">4. Applicant Employment Details</h3>
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
                        </div>
                    </div>

                    {/* ================= Income Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">5. Applicant Income Details</h3>
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
                        </div>
                    </div>

                    {/* ================= EXISTING LOANS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">6. Applicant Existing Loans Details</h3>
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

                                <select
                                    value={loan.loanTenure}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].loanTenure = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input bg-gray-200"
                                >
                                    <option value="">Loan Tenure (Years)</option>
                                    {Array.from({ length: 50 }).map((_, i) => (
                                        <option key={i + 1} value={String(i + 1)}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    placeholder="Loan EMI"
                                    value={loan.loanEmi}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].loanEmi = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input bg-gray-200"
                                />

                                <input
                                    type="date"
                                    value={loan.closingDate}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].closingDate = e.target.value;
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
                                        loanTenure: "",
                                        loanEmi: "",
                                        closingDate: "",
                                    },
                                ])
                            }
                            className="mt-2 inline-flex w-fit items-center justify-center rounded-lg border border-[#D6EEF8] bg-[#E6F7FD] px-3 py-2 text-sm font-medium text-[#008FCC] transition hover:bg-[#E6F7FD]"
                        >
                            + Add More
                        </button>
                    </div>

                    {/* ================= Bank Statement Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-1 text-base font-semibold text-[#00AEEF]">7. Applicant Bank Statement Details</h3>
                        <span className="text-sm">(pdf should not be protected with password else write down the password)</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Account Type <span className="text-destructive">*</span></label>
                                <div className="space-y-3">
                                    {["Saving Account", "Joint Account with family person", "OD Account", "CC Account"].map(
                                        (label) => (
                                            <label
                                                key={label}
                                                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
                                            >
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {label.toLowerCase()}
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    value={label}
                                                    {...register("accountTypes", {
                                                        validate: (value) => {
                                                            const arr: string[] = Array.isArray(value)
                                                                ? value
                                                                : typeof value === "string" && value
                                                                    ? [value]
                                                                    : [];
                                                            return arr.length > 0 || "Select at least one account type";
                                                        },
                                                    })}
                                                    className="h-4 w-4"
                                                />
                                            </label>
                                        )
                                    )}
                                </div>
                                {getError("accountTypes") ? (
                                    <p className="text-sm text-red-600">{getError("accountTypes")}</p>
                                ) : null}
                            </div>

                            {hasSelectedAccountTypes ? (
                                <div className="space-y-4">
                                    {(Array.isArray(accountTypes)
                                        ? accountTypes
                                        : typeof accountTypes === "string" && accountTypes
                                            ? [accountTypes]
                                            : []).map((t) => {
                                                const key = toAccountKey(t);
                                                const bankNameKey = `bankName_${key}`;
                                                const statementKey = `oneYearBankStatement_${key}`;
                                                const passwordKey = `accountPassword_${key}`;

                                                return (
                                                    <div key={key} className="rounded-xl border border-gray-200 bg-white p-4">
                                                        <div className="text-sm font-semibold text-gray-900 mb-3">
                                                            {String(t).toLowerCase()}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-sm font-medium">Bank Name <span className="text-destructive">*</span></label>
                                                                <input
                                                                    {...register(bankNameKey, {
                                                                        validate: (value) => {
                                                                            if (!hasSelectedAccountTypes) return true;
                                                                            const v = typeof value === "string" ? value.trim() : "";
                                                                            return v !== "" || "Bank Name is required";
                                                                        },
                                                                    })}
                                                                    placeholder="Bank Name"
                                                                    className="input bg-gray-200"
                                                                />
                                                                {getError(bankNameKey) ? (
                                                                    <p className="text-sm text-red-600">{getError(bankNameKey)}</p>
                                                                ) : null}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-sm font-medium">Upload One Year Bank Statement <span className="text-destructive">*</span></label>
                                                                <input
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    {...register(statementKey, {
                                                                        validate: (value) => {
                                                                            if (!hasSelectedAccountTypes) return true;
                                                                            const requiredCheck =
                                                                                !!getFileFromValue(value) ||
                                                                                "One Year Bank Statement is required";
                                                                            if (requiredCheck !== true) return requiredCheck;
                                                                            return validateMax2MB(value);
                                                                        },
                                                                    })}
                                                                    className="input bg-gray-200"
                                                                />
                                                                {getError(statementKey) ? (
                                                                    <p className="text-sm text-red-600">{getError(statementKey)}</p>
                                                                ) : null}
                                                            </div>
                                                            <div className="space-y-1 md:col-span-2">
                                                                <label className="text-sm font-medium">Password <span className="text-red-400 text-xs">(optional)</span></label>
                                                                <input
                                                                    {...register(passwordKey)}
                                                                    placeholder="Password"
                                                                    className="input bg-gray-200"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {/* ================= G.Credit Score ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">8. Applicant CIBIL  Score Details</h3>
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
                                        {...register("cibilReport")}
                                        className="input bg-gray-200"
                                    />
                                    {getError("cibilReport") ? (
                                        <p className="text-sm text-red-600">{getError("cibilReport")}</p>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ================= Q. Applicant Assets details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">9. Applicant Assets Details Digital or physical</h3>
                        {Array.from({ length: applicantAssetsCount }).map((_, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Assets (Digital or Physical) <span className="text-destructive">(optional)</span></label>
                                    <input
                                        type="text"
                                        {...register(idx === 0 ? "applicantAssetType" : `applicantAssetType_${idx}`)}
                                        className="input bg-gray-200"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Market Price <span className="text-destructive">(optional)</span></label>
                                    <input
                                        type="number"
                                        {...register(idx === 0 ? "applicantAssetMarketPrice" : `applicantAssetMarketPrice_${idx}`)}
                                        placeholder="Enter market price"
                                        className="input bg-gray-200"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium">On Going Loan <span className="text-destructive">(optional)</span></label>
                                    <select
                                        {...register(idx === 0 ? "applicantAssetOngoingLoan" : `applicantAssetOngoingLoan_${idx}`)}
                                        className="input bg-gray-200"
                                    >
                                        <option value="">--select option--</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="mt-3 inline-flex w-fit items-center justify-center rounded-lg border border-[#D6EEF8] bg-[#E6F7FD] px-3 py-2 text-sm font-medium text-[#008FCC] transition hover:bg-[#E6F7FD]"
                            onClick={() => setApplicantAssetsCount((c) => Math.max(1, (c || 1) + 1))}
                        >
                            Add More
                        </button>
                    </div>

                    {/* ================= Medical History ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">10. Applicant Medical History</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Medical History <span className="text-destructive">*</span></label>
                                </div>
                                <select {...register("medicalHistory", { required: true })} className="input bg-gray-200">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {getError("medicalHistory") ? (
                                    <p className="text-sm text-red-600">{getError("medicalHistory")}</p>
                                ) : null}
                            </div>

                            {medicalHistory === "Yes" ? (
                                <div className="space-y-1">
                                    <div>
                                        <label className="text-sm font-medium">Specify <span className="text-destructive">*</span></label>
                                    </div>
                                    <input
                                        type="text"
                                        {...register("medicalHistoryDetails", {
                                            validate: (value) =>
                                                medicalHistory !== "Yes" ||
                                                (value !== undefined &&
                                                    value !== null &&
                                                    String(value).trim() !== "") ||
                                                "Please specify medical history",
                                        })}
                                        placeholder="Specify"
                                        className="input bg-gray-200"
                                    />
                                    {getError("medicalHistoryDetails") ? (
                                        <p className="text-sm text-red-600">{getError("medicalHistoryDetails")}</p>
                                    ) : null}
                                </div>
                            ) : null}

                            {medicalHistory === "Yes" ? (
                                <div className="space-y-1">
                                    <div>
                                        <label className="text-sm font-medium">Upload Medical Document <span className="text-destructive">(optional)</span></label>
                                    </div>
                                    <input
                                        type="file"
                                        {...register("medicalDocument", { validate: validateMax2MB })}
                                        className="input bg-gray-200"
                                    />
                                    {getError("medicalDocument") ? (
                                        <p className="text-sm text-red-600">{getError("medicalDocument")}</p>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* ================= Habbit ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">11. Applicant Addictive Habits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Addictive Habits<span className="text-destructive">*</span></label>
                                </div>
                                <select {...register("habbit", { required: true })} className="input bg-gray-200">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {getError("habbit") ? (
                                    <p className="text-sm text-red-600">{getError("habbit")}</p>
                                ) : null}
                            </div>

                            {habbit === "Yes" ? (
                                <div className="space-y-1">
                                    <div>
                                        <label className="text-sm font-medium">Specify <span className="text-destructive">*</span></label>
                                    </div>
                                    <input
                                        type="text"
                                        {...register("habbitDetails", {
                                            validate: (value) =>
                                                habbit !== "Yes" ||
                                                (value !== undefined &&
                                                    value !== null &&
                                                    String(value).trim() !== "") ||
                                                "Please specify habbit",
                                        })}
                                        placeholder="Specify"
                                        className="input bg-gray-200"
                                    />
                                    {getError("habbitDetails") ? (
                                        <p className="text-sm text-red-600">{getError("habbitDetails")}</p>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* ================= Civil or Criminal Case history ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">12. Applicant Civil or Criminal Case history</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Civil or Criminal Case history <span className="text-destructive">*</span></label>
                                </div>
                                <select {...register("caseHistory", { required: true })} className="input bg-gray-200">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {getError("caseHistory") ? (
                                    <p className="text-sm text-red-600">{getError("caseHistory")}</p>
                                ) : null}
                            </div>

                            {caseHistory === "Yes" ? (
                                <div className="space-y-1">
                                    <div>
                                        <label className="text-sm font-medium">Specify <span className="text-destructive">*</span></label>
                                    </div>
                                    <input
                                        type="text"
                                        {...register("caseHistoryDetails", {
                                            validate: (value) =>
                                                caseHistory !== "Yes" ||
                                                (value !== undefined &&
                                                    value !== null &&
                                                    String(value).trim() !== "") ||
                                                "Please specify case history",
                                        })}
                                        placeholder="Specify"
                                        className="input bg-gray-200"
                                    />
                                    {getError("caseHistoryDetails") ? (
                                        <p className="text-sm text-red-600">{getError("caseHistoryDetails")}</p>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* ================= LOAN DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">13. Loan Requirement Details</h3>
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
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">14. Co-Applicant Details (If Any)</h3>
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
                                <label className="text-sm font-medium">Co-Applicant Email ID <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantEmailID")} placeholder="Co-Applicant Email ID" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Mobile Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantMobileNO")} placeholder="Co-Applicant Mobile Number" className="input bg-gray-200" />
                            </div>

                        </div>
                    </div>

                    {/* ================= J. Upload Other Supported Document================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">15. Upload Other Supported Document</h3>
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
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">16. Reference name details</h3>

                        {Array.from({ length: Math.max(1, referenceCount || 1) }).map((_, idx) => {
                            const suffix = idx === 0 ? "" : `_${idx}`;
                            return (
                                <div key={idx} className="grid md:grid-cols-2 gap-4">
                                    <div className="flex flex-col items-start gap-3">
                                        <label className="text-sm font-medium">First Reference Full Name<span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`FirstReferenceFullName${suffix}`, { required: true })} placeholder="First Reference Full Name" className="input bg-gray-200 " />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Reference Mobile Number<span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`ReferenceMobileNumber${suffix}`, { required: true })} placeholder="Reference Mobile Number" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Relation With Aplicant<span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`RelationWithAplicant${suffix}`, { required: true })} placeholder="Relation With Aplicant" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex  flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Email ID <span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`ReferenceEmailId${suffix}`, { required: true })} placeholder="Email ID" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Address <span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`ReferenceAddress${suffix}`, { required: true })} placeholder="Address" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">State <span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`ReferenceState${suffix}`, { required: true })} placeholder="State" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`ReferenceCity${suffix}`, { required: true })} placeholder="City" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">Pincode <span className="text-destructive">*</span></label>
                                        <input type="text" {...register(`ReferencePincode${suffix}`, { required: true })} placeholder="Pincode" className="input bg-gray-200" />
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
                        <h3 className="mb-4 text-base font-semibold text-[#00AEEF]">17. Declaration & Consent</h3>
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

                <div className="sticky bottom-0 z-10 border-t border-[#D6EEF8] bg-white px-6 py-4 sm:px-8">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
                        <button type="button" onClick={onClose} className="w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto">
                            Cancel
                        </button>
                        <button type="submit" form="salariedLoanForm" disabled={loading} className="w-full rounded-xl bg-[#00AEEF] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110 disabled:opacity-60 sm:w-auto">
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
