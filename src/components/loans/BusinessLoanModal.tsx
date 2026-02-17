"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    categoryKey?: string;
    categoryTitle?: string;
};

export default function BusinessLoanModal({ isOpen, onClose, categoryKey, categoryTitle }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const MAX_FILE_BYTES = 2 * 1024 * 1024;
    const getFileFromValue = (value: any): File | null => {
        if (value instanceof File) return value;
        if (value?.[0] instanceof File) return value[0];
        return null;
    };
    const validateMax2MB = (value: any) => {
        const file = getFileFromValue(value);
        if (!file) return true;
        return file.size <= MAX_FILE_BYTES || "Max file size is 2MB";
    };
    const [referenceCount, setReferenceCount] = useState(1);
    const [applicantAssetsCount, setApplicantAssetsCount] = useState(1);

    const getCloudinarySignature = async (folder: string) => {
        const res = await axios.post("/api/cloudinary-signature", { folder }, { timeout: 60000 });
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
            timeout: 15000,
            headers: { "Content-Type": "multipart/form-data" },
        });

        const secureUrl = await uploadRes?.data?.secure_url;
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

    // Dynamic sections
    const [bankStatements, setBankStatements] = useState<
        { month: string; file: File | null }[]
    >([{ month: "", file: null }]);

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

    const [businessCertificates, setBusinessCertificates] = useState<
        { name: string; file: File | null }[]
    >([{ name: "", file: null }]);

    const [otherDocuments, setOtherDocuments] = useState<File[]>([]);

    const [selectedGstReturnTypes, setSelectedGstReturnTypes] = useState<string[]>([]);
    const gstReturnFileRefs = useRef<Record<string, HTMLInputElement | null>>({});

    if (!isOpen) return null;

    const hasCibil = watch("hasCibil");
    const isBuyingGoods = watch("isBuyingGoods");
    const medicalHistory = watch("medicalHistory");
    const habbit = watch("habbit");
    const caseHistory = watch("caseHistory");
    const accountTypes = watch("accountTypes");

    const hasSelectedAccountTypes = Array.isArray(accountTypes)
        ? accountTypes.length > 0
        : typeof accountTypes === "string"
            ? accountTypes.trim() !== ""
            : false;

    const businessRegistrationCertificates = watch("businessRegistrationCertificates");
    const hasSelectedBusinessRegistrationCertificates = Array.isArray(
        businessRegistrationCertificates
    )
        ? businessRegistrationCertificates.length > 0
        : typeof businessRegistrationCertificates === "string"
            ? businessRegistrationCertificates.trim() !== ""
            : false;

    const numberOfOtherDocumentsSelected = watch("NumberofOtherDocuments");
    const otherDocumentsCount = Number.isFinite(
        Number(numberOfOtherDocumentsSelected)
    )
        ? parseInt(String(numberOfOtherDocumentsSelected), 10)
        : 0;

    const toAccountKey = (value: string) =>
        String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");

    // ------------------ SUBMIT ------------------

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);

            const formData = new FormData();

            const appendIfPresent = (key: string, value: any) => {
                if (typeof value === "undefined" || value === null) return;
                const asString = typeof value === "string" ? value : String(value);
                if (asString.trim() === "") return;
                formData.append(key, asString);
            };

            const pickFirstFile = (value: any): File | null => {
                if (!value) return null;
                if (value instanceof File) return value;
                if (value?.[0] instanceof File) return value[0];
                return null;
            };

            if (categoryKey) formData.append("serviceCategoryKey", categoryKey);
            if (categoryTitle) formData.append("serviceCategoryTitle", categoryTitle);

            // =============================
            // Personal Details
            // =============================
            appendIfPresent("firstName", data.firstName);
            appendIfPresent("middleName", data.middleName);
            appendIfPresent("lastName", data.lastName);
            appendIfPresent("mobileNumber", data.mobileNumber);
            appendIfPresent("alternateMobileNumber", data.alternateMobileNumber);
            appendIfPresent("whatsAppNumber", data.whatsAppNumber);
            appendIfPresent("gender", data.gender);
            appendIfPresent("maritalStatus", data.maritalStatus);
            appendIfPresent("dob", data.dob);
            appendIfPresent("age", data.age);
            appendIfPresent("personalEmail", data.personalEmail);
            appendIfPresent("businessEmail", data.businessEmail);
            appendIfPresent("voterId", data.VoterID);
            appendIfPresent("drivingLicense", data.DrivingLicense);
            appendIfPresent("passportNo", data.PasswordNo);

            // =============================
            // Business Details
            // =============================
            appendIfPresent("businessName", data.businessName);
            appendIfPresent("businessType", data.businessType);
            appendIfPresent("industryType", data.industryType);
            appendIfPresent("businessAddress", data.businessAddress);
            appendIfPresent("businessPincode", data.businessPincode);
            appendIfPresent("yearsInBusiness", data.yearsInBusiness);
            appendIfPresent("annualTurnover", data.annualTurnover);

            // =============================
            // Loan Details
            // =============================
            appendIfPresent("requiredLoanAmount", data.requiredLoanAmount);
            appendIfPresent("typeOfLoan", data.typeOfLoan);
            appendIfPresent("cibilIssuesDetails", data.cibile);
            appendIfPresent("preferredTenure", data.preferredTenure);
            appendIfPresent("purpose", data.purpose);

            // =============================
            // Identification
            // =============================
            appendIfPresent("panNumber", data.panNumber);
            appendIfPresent("aadhaarNumber", data.aadhaarNumber);
            appendIfPresent("gstNumber", data.gstNumber);

            // =============================
            // File Uploads
            // =============================
            const applicantPhoto = pickFirstFile(data.applicantPhoto);
            if (applicantPhoto) {
                formData.append(
                    "applicantPhoto",
                    await uploadToCloudinary(applicantPhoto, "loan_applications/business")
                );
            }

            const panPhoto = pickFirstFile(data.panPhoto);
            if (panPhoto) {
                formData.append(
                    "panPhoto",
                    await uploadToCloudinary(panPhoto, "loan_applications/business")
                );
            }

            const aadhaarPhoto = pickFirstFile(data.aadhaarPhoto);
            if (aadhaarPhoto) {
                formData.append(
                    "aadhaarPhoto",
                    await uploadToCloudinary(aadhaarPhoto, "loan_applications/business")
                );
            }

            const aadhaarBackPhoto = pickFirstFile(data.aadhaarBackPhoto);
            if (aadhaarBackPhoto) {
                formData.append(
                    "aadhaarBackPhoto",
                    await uploadToCloudinary(aadhaarBackPhoto, "loan_applications/business")
                );
            }

            const gstCertificate = pickFirstFile(data.gstCertificate);
            if (gstCertificate) {
                formData.append(
                    "gstCertificate",
                    await uploadToCloudinary(gstCertificate, "loan_applications/business")
                );
            }

            const bankStatement = pickFirstFile(data.bankStatement);
            if (bankStatement) {
                formData.append(
                    "bankStatement",
                    await uploadToCloudinary(bankStatement, "loan_applications/business")
                );
            }

            const itrFile = pickFirstFile(data.itrFile);
            if (itrFile) {
                formData.append(
                    "itrFile",
                    await uploadToCloudinary(itrFile, "loan_applications/business")
                );
            }

            const ay2324 = pickFirstFile(data.AssessmentYear2324);
            if (ay2324) {
                formData.append(
                    "assessmentYear2324",
                    await uploadToCloudinary(ay2324, "loan_applications/business")
                );
            }
            const ay2425 = pickFirstFile(data.AssessmentYear2425);
            if (ay2425) {
                formData.append(
                    "assessmentYear2425",
                    await uploadToCloudinary(ay2425, "loan_applications/business")
                );
            }
            const ay2526 = pickFirstFile(data.AssessmentYear2526);
            if (ay2526) {
                formData.append(
                    "assessmentYear2526",
                    await uploadToCloudinary(ay2526, "loan_applications/business")
                );
            }

            const proformaInvoiceFile = pickFirstFile(data.proformaInvoiceFile);
            if (proformaInvoiceFile) {
                formData.append(
                    "proformaInvoiceFile",
                    await uploadToCloudinary(
                        proformaInvoiceFile,
                        "loan_applications/business"
                    )
                );
            }

            const cibilReport = pickFirstFile(data.cibilReport);
            if (cibilReport) {
                formData.append(
                    "cibilReport",
                    await uploadToCloudinary(cibilReport, "loan_applications/business")
                );
            }

            if (Array.isArray(selectedGstReturnTypes) && selectedGstReturnTypes.length > 0) {
                for (const t of selectedGstReturnTypes) {
                    formData.append("yearlyGstReturnTypes", t);
                    const key = toAccountKey(t);
                    const fileKey = `yearlyGstReturnFile_${key}`;
                    const f = pickFirstFile((data as any)?.[fileKey]);
                    if (f) {
                        formData.append(
                            fileKey,
                            await uploadToCloudinary(f, "loan_applications/business")
                        );
                    }
                }

                appendIfPresent("yearlyGstReturnType", selectedGstReturnTypes.join(", "));
                const firstKey = toAccountKey(selectedGstReturnTypes[0]);
                const firstFile = pickFirstFile((data as any)?.[`yearlyGstReturnFile_${firstKey}`]);
                if (firstFile) {
                    formData.append(
                        "yearlyGstReturnFile",
                        await uploadToCloudinary(firstFile, "loan_applications/business")
                    );
                }
            } else {
                const yearlyGstReturnFile = pickFirstFile(data.yearlyGstReturnFile);
                if (yearlyGstReturnFile) {
                    formData.append(
                        "yearlyGstReturnFile",
                        await uploadToCloudinary(yearlyGstReturnFile, "loan_applications/business")
                    );
                }
            }

            // append bank statements
            for (let i = 0; i < bankStatements.length; i += 1) {
                const f = bankStatements[i]?.file;
                if (f) {
                    formData.append(
                        `bankStatement_${i}`,
                        await uploadToCloudinary(f, "loan_applications/business")
                    );
                }
            }

            // append existing loans
            formData.append("existingLoanDetails", JSON.stringify(existingLoans));

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

            // Addresses
            appendIfPresent("currentResidentialAddress", data.currentResidentialAddress);
            appendIfPresent("residentialState", data.state);
            appendIfPresent("residentialCity", data.city);
            appendIfPresent("currentResidentialPincode", data.currentResidentialPincode);

            appendIfPresent("currentOfficeOrShopAddress", data.currentOfficeorShopAddress);
            appendIfPresent("officeOrShopState", data.officeOrShopState);
            appendIfPresent("officeCity", data.officeCity);
            appendIfPresent("currentOfficePincode", data.currentOfficePincode);

            // Bank statement (account type)
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

                const bankNameValueRaw = data?.[bankNameKey];
                const bankNameValue =
                    typeof bankNameValueRaw === "string" ? bankNameValueRaw.trim() : "";
                if (bankNameValue) {
                    formData.append(bankNameKey, bankNameValue);
                }

                const statementFile = pickFirstFile(data?.[statementKey]);
                if (statementFile) {
                    formData.append(
                        statementKey,
                        await uploadToCloudinary(statementFile, "loan_applications/business")
                    );
                }

                appendIfPresent(passwordKey, (data as any)?.[passwordKey]);

                bankAccountsPayload.push({ accountType: String(t || ""), bankName: bankNameValue });
            }
            formData.append("bankAccounts", JSON.stringify(bankAccountsPayload));

            // Co-applicant
            appendIfPresent("coApplicantName", data.coApplicantName);
            appendIfPresent("relationshipWithApplicant", data.relationshipWithApplicant);
            appendIfPresent("coApplicantEmploymentType", data.CoApplicantEmploymentType);
            appendIfPresent("coApplicantMobileNumber", data.CoApplicantMobileNumber);
            appendIfPresent("coApplicantEmailId", data.CoApplicantEmailID);
            appendIfPresent("coApplicantAddress", data.CoApplicantAddress);
            appendIfPresent("coApplicantState", data.CoApplicantState);
            appendIfPresent("coApplicantCity", data.CoApplicantCity);
            appendIfPresent("coApplicantPincode", data.CoApplicantPincode);

            const coApplicantPanPhoto = pickFirstFile(data.CoApplicantpanPhoto);
            if (coApplicantPanPhoto) {
                formData.append(
                    "CoApplicantpanPhoto",
                    await uploadToCloudinary(coApplicantPanPhoto, "loan_applications/business")
                );
            }

            const coApplicantAadhaarPhoto = pickFirstFile(data.CoApplicantAadhaarPhoto);
            if (coApplicantAadhaarPhoto) {
                formData.append(
                    "CoApplicantAadhaarPhoto",
                    await uploadToCloudinary(
                        coApplicantAadhaarPhoto,
                        "loan_applications/business"
                    )
                );
            }

            const coApplicantAadhaarBackPhoto = pickFirstFile(
                data.CoApplicantAadhaarBackPhoto
            );
            if (coApplicantAadhaarBackPhoto) {
                formData.append(
                    "CoApplicantAadhaarBackPhoto",
                    await uploadToCloudinary(
                        coApplicantAadhaarBackPhoto,
                        "loan_applications/business"
                    )
                );
            }

            // Address proof (these inputs are currently plain text)
            const latestHomeElectricityBillFile = pickFirstFile(
                data.LatestHomeElectricityBill
            );
            if (latestHomeElectricityBillFile) {
                formData.append(
                    "latestHomeElectricityBill",
                    await uploadToCloudinary(
                        latestHomeElectricityBillFile,
                        "loan_applications/business"
                    )
                );
            }

            const latestOfficeShopElectricityBillFile = pickFirstFile(
                data["LatestOfficeShopElectricityBill "]
            );
            if (latestOfficeShopElectricityBillFile) {
                formData.append(
                    "latestOfficeShopElectricityBill",
                    await uploadToCloudinary(
                        latestOfficeShopElectricityBillFile,
                        "loan_applications/business"
                    )
                );
            }

            // Registration certificate selection
            const businessRegistrationCertificatesArray: string[] = Array.isArray(
                data.businessRegistrationCertificates
            )
                ? data.businessRegistrationCertificates
                : typeof data.businessRegistrationCertificates === "string" &&
                    data.businessRegistrationCertificates
                    ? [data.businessRegistrationCertificates]
                    : [];

            businessRegistrationCertificatesArray.forEach((v) => {
                if (typeof v === "string" && v.trim()) {
                    formData.append("businessRegistrationCertificates", v);
                }
            });

            const businessRegistrationCertificatesPayload: Array<{
                certificateType: string;
            }> = [];

            for (const t of businessRegistrationCertificatesArray) {
                const key = toAccountKey(t);
                const fileKey = `businessRegistrationCertificateFile_${key}`;
                const file = pickFirstFile(data?.[fileKey]);
                if (file) {
                    formData.append(
                        fileKey,
                        await uploadToCloudinary(file, "loan_applications/business")
                    );
                }

                businessRegistrationCertificatesPayload.push({
                    certificateType: String(t || ""),
                });
            }

            formData.append(
                "businessRegistrationCertificatesPayload",
                JSON.stringify(businessRegistrationCertificatesPayload)
            );

            // Buying goods
            appendIfPresent("isBuyingGoods", data.isBuyingGoods);
            appendIfPresent("quotationAmount", data.quotationAmount);
            appendIfPresent("goodsName", data.goodsName);

            // Medical history
            appendIfPresent("medicalHistory", data.medicalHistory);
            appendIfPresent("medicalHistoryDetails", data.medicalHistoryDetails);

            const medicalDocument = pickFirstFile(data.medicalDocument);
            if (medicalDocument) {
                formData.append(
                    "medicalDocument",
                    await uploadToCloudinary(medicalDocument, "loan_applications/business")
                );
            }

            // Habbit
            appendIfPresent("habbit", data.habbit);
            appendIfPresent("habbitDetails", data.habbitDetails);

            // Civil/Criminal case history
            appendIfPresent("caseHistory", data.caseHistory);
            appendIfPresent("caseHistoryDetails", data.caseHistoryDetails);

            // Applicant assets
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

            formData.append(
                "applicantAssetsPayload",
                JSON.stringify(applicantAssetsPayload)
            );

            // CIBIL
            appendIfPresent("hasCibil", data.hasCibil);
            appendIfPresent("cibilScore", data.cibilScore);

            // Other counts
            appendIfPresent("numberOfExistingLoans", data.NumberOfExistingLoans);
            appendIfPresent("numberOfOtherDocuments", data.NumberofOtherDocuments);

            for (let i = 0; i < otherDocumentsCount; i += 1) {
                appendIfPresent(
                    `otherSupportedDocumentName_${i}`,
                    (data as any)?.[`otherSupportedDocumentName_${i}`]
                );
                const key = `otherSupportedDocument_${i}`;
                const file = pickFirstFile(data?.[key]);
                if (file) {
                    formData.append(
                        key,
                        await uploadToCloudinary(file, "loan_applications/business")
                    );
                }
            }

            // append business certificates
            businessCertificates.forEach((item, index) => {
                if (item.file) {
                    // Note: businessCertificates are component-state files; upload them too
                    formData.append(
                        `businessCertificate_${index}`,
                        item.file
                    );
                }
            });

            // append other documents
            otherDocuments.forEach((file, index) => {
                formData.append(`otherDocument_${index}`, file);
            });

            // Upload any remaining component-state files (legacy dynamic sections)
            for (let i = 0; i < businessCertificates.length; i += 1) {
                const f = businessCertificates[i]?.file;
                if (f) {
                    formData.set(
                        `businessCertificate_${i}`,
                        await uploadToCloudinary(f, "loan_applications/business")
                    );
                }
            }
            for (let i = 0; i < otherDocuments.length; i += 1) {
                const f = otherDocuments[i];
                if (f) {
                    formData.set(
                        `otherDocument_${i}`,
                        await uploadToCloudinary(f, "loan_applications/business")
                    );
                }
            }

            const res = await axios.post("/api/business-loan", formData, {
                timeout: 180000,
            });
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
                (error instanceof Error ? error.message : "Something went wrong");
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const businessTypes = [
        { label: "Proprietorship", value: "proprietorship" },
        { label: "Partnership Firm", value: "partnership_firm" },
        { label: "HUF (Hindu Undivided Family)", value: "huf" },
        { label: "Co-operative Society", value: "cooperative_society" },
        { label: "LLP (Limited Liability Partnership)", value: "llp" },
        { label: "OPC (One Person Company)", value: "opc" },
        { label: "Private Limited Company", value: "private_limited_company" },
        { label: "Public Limited Company", value: "public_limited_company" },
        { label: "Section 8 Company (Non-Profit)", value: "section_8_company" },
        { label: "Producer Company", value: "producer_company" },
        { label: "Nidhi Company", value: "nidhi_company" },
        { label: "Government Company", value: "government_company" },
        { label: "Holding Company", value: "holding_company" },
        { label: "Subsidiary Company", value: "subsidiary_company" },
        { label: "Associate Company", value: "associate_company" },
        { label: "Foreign Company", value: "foreign_company" },
        { label: "Joint Venture (JV)", value: "joint_venture" },
        { label: "NBFC (RBI Regulated)", value: "nbfc_rbi_regulated" }
    ];



    // ------------------ UI ------------------

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6 overflow-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 max-h-[92vh] flex flex-col">
                <div className="sticky top-0 z-10 border-b bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 px-6 pt-6 pb-5 text-white sm:px-8">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-3 top-3 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        >
                            ×
                        </button>
                        {/* <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                            Business Loan Application
                        </h2> */}
                        {categoryTitle ? (
                            <p className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                                Loan Application form for  {categoryTitle}
                            </p>
                        ) : null}
                    </div>
                </div>

                <form id="businessLoanForm" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 sm:px-8 sm:py-8 bg-gray-50">

                    {/* =================A. BASIC DETAILS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">A. Applicant Basic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="space-y-1">
                                <label className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
                                <input
                                    {...register("firstName", { required: true })}
                                    placeholder="First Name"
                                    className="input bg-gray-200"
                                />
                                {getError("firstName") ? (
                                    <p className="text-sm text-red-600">{getError("firstName")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Middle Name <span className="text-red-400 text-xs">(optional)</span></label>
                                <input
                                    {...register("middleName")}
                                    placeholder="Middle Name"
                                    className="input bg-gray-200"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
                                <input
                                    {...register("lastName", { required: true })}
                                    placeholder="Last Name"
                                    className="input bg-gray-200"
                                />
                                {getError("lastName") ? (
                                    <p className="text-sm text-red-600">{getError("lastName")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Adhaar Linked Primary  Mobile Number <span className="text-destructive">*</span></label>
                                <input
                                    {...register("mobileNumber", { required: true })}
                                    placeholder="Mobile Number"
                                    className="input bg-gray-200"
                                />
                                {getError("mobileNumber") ? (
                                    <p className="text-sm text-red-600">{getError("mobileNumber")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Alternate Mobile Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input
                                    {...register("alternateMobileNumber")}
                                    placeholder="Mobile Number"
                                    className="input bg-gray-200"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">WhatsApp Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input
                                    {...register("whatsAppNumber")}
                                    placeholder="Mobile Number"
                                    className="input bg-gray-200"
                                />
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
                                <label className="text-sm font-medium">Personal Email ID <span className="text-destructive">*</span></label>
                                <input
                                    {...register("personalEmail", { required: true })}
                                    placeholder="Personal Email"
                                    className="input bg-gray-200"
                                />
                                {getError("personalEmail") ? (
                                    <p className="text-sm text-red-600">{getError("personalEmail")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Official Email ID <span className="text-red-400 text-xs">(optional)</span></label>
                                <input
                                    {...register("businessEmail")}
                                    placeholder="Business Email"
                                    className="input bg-gray-200"
                                />
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

                    {/* ================= B. Residential Address Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">B.Applicant Current Residential Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Current Residential Address <span className="text-destructive">*</span></label>
                                <textarea {...register("currentResidentialAddress", { required: true })} cols={5} rows={10} placeholder="Address" className="input bg-gray-200" />
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
                        </div>
                    </div>


                    {/* ================= C. Office/Shop Address Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">C.Applicant Current Office/Shop Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Current Office/Shop Address <span className="text-destructive">*</span></label>
                                <textarea {...register("currentOfficeorShopAddress", { required: true })} cols={5} rows={10} placeholder="Address" className="input bg-gray-200" />
                                {getError("currentOfficeorShopAddress") ? (
                                    <p className="text-sm text-red-600">{getError("currentOfficeorShopAddress")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">State <span className="text-destructive">*</span></label>
                                <input {...register("officeOrShopState", { required: true })} placeholder="State" className="input bg-gray-200" />
                                {getError("officeOrShopState") ? (
                                    <p className="text-sm text-red-600">{getError("officeOrShopState")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
                                <input {...register("officeCity", { required: true })} placeholder="City" className="input bg-gray-200" />
                                {getError("officeCity") ? (
                                    <p className="text-sm text-red-600">{getError("officeCity")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Pincode <span className="text-destructive">*</span></label>
                                <input {...register("currentOfficePincode", { required: true })} placeholder="Pincode" className="input bg-gray-200" />
                                {getError("currentOfficePincode") ? (
                                    <p className="text-sm text-red-600">{getError("currentOfficePincode")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Shop/office photo  <span className="text-destructive">(Optional (JPEG only, Max size: 2 MB))</span></label>
                                <input type="file" {...register("Shopofficephoto")} placeholder="Pincode" className="py-2 px-2 mx-2 w-[80%] rounded-md bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium"> Additional photo  upload option <span className="text-destructive">(Optional (JPEG only, Max size: 2 MB))</span></label>
                                <input type="file" {...register("Additionalphotouploadoption")} placeholder="Pincode" className="py-2 mx-2 w-[80%] px-2 rounded-md bg-gray-200" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Type of Company <span className="text-destructive">(optional)</span></label>
                                <select  {...register("typeofcompany")} className="py-2 px-1 rounded-md bg-gray-200" >
                                    <option value="">Select your business type</option>
                                    {businessTypes.map((l, idx) => (
                                        <option key={idx} value={l.value}>{l.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ================= D. Loan Requirement Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">D. Applicant Loan Requirement Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Required Loan Amount <span className="text-destructive">*</span></label>
                                <input {...register("requiredLoanAmount", { required: true })} placeholder="Required Loan Amount" className="input bg-gray-200" />
                                {getError("requiredLoanAmount") ? (
                                    <p className="text-sm text-red-600">{getError("requiredLoanAmount")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Type Of Loan <span className="text-destructive">*</span></label>
                                <input {...register("typeOfLoan", { required: true })} placeholder="Type Of Loan" className="input bg-gray-200" />
                                {getError("typeOfLoan") ? (
                                    <p className="text-sm text-red-600">{getError("typeOfLoan")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Purpose of loan<span className="text-destructive">(optional)</span></label>
                                <textarea {...register("Purposeofloan")} placeholder="Purpose of loan" cols={5} rows={20} className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable.  <span className="text-destructive">(optional)</span></label>
                                <textarea {...register("cibile")} placeholder="cibil" cols={5} rows={20} className="input bg-gray-200" />
                            </div>

                        </div>
                    </div>

                    {/* ================= E. ID PROOF ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">E. Applicant KYC Document Details</h3>
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
                                <label className="text-sm font-medium">PAN Card Photo <span className="text-destructive">JPEG or PDF allowed (Max size: 2 MB)*</span></label>
                                <input type="file" {...register("panPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("panPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("panPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Card Front Photo <span className="text-destructive">JPEG or PDF allowed (Max size: 2 MB)*</span></label>
                                <input type="file" {...register("aadhaarPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("aadhaarPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("aadhaarPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Card Back Photo <span className="text-destructive">JPEG or PDF allowed (Max size: 2 MB)*</span></label>
                                <input type="file" {...register("aadhaarBackPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("aadhaarBackPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("aadhaarBackPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Applicant Photo <span className="text-destructive">JPEG only (Max size: 2 MB)*</span></label>
                                <input type="file" {...register("applicantPhoto", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("applicantPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("applicantPhoto")}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* ================= F Co-Applicant Details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">F. Co-Applicant Details (If Any)</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Name <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("coApplicantName")} placeholder="Co-Applicant Name" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Relationship with Applicant <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("relationshipWithApplicant")} placeholder="Relationship with Applicant" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Employment Type <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantEmploymentType")} placeholder="Co-Applicant Employment Type" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant PAN Card Photo <span className="text-destructive">(optional, JPEG or PDF allowed (Max size: 2 MB))</span></label>
                                <input type="file" {...register("CoApplicantpanPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("CoApplicantpanPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("CoApplicantpanPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Aadhaar Front Photo <span className="text-destructive">(optional, JPEG or PDF allowed (Max size: 2 MB))</span></label>
                                <input type="file" {...register("CoApplicantAadhaarPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("CoApplicantAadhaarPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("CoApplicantAadhaarPhoto")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Aadhaar Back Photo <span className="text-destructive">(optional,JPEG or PDF allowed (Max size: 2 MB))</span></label>
                                <input type="file" {...register("CoApplicantAadhaarBackPhoto", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("CoApplicantAadhaarBackPhoto") ? (
                                    <p className="text-sm text-red-600">{getError("CoApplicantAadhaarBackPhoto")}</p>
                                ) : null}
                            </div>

                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Mobile Number <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantMobileNumber")} placeholder="Co-Applicant Mobile Number" className="input bg-gray-200" />
                            </div>

                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Email ID <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantEmailID")} placeholder="Co-Applicant Email ID " className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Address<span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantAddress")} placeholder="Co-Applicant Address" className="input bg-gray-200" />
                            </div>
                            {/* <div className="space-y-1">
                                <label className="text-sm font-medium">Co-Applicant Employment Type <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantEmploymentType")} placeholder="Co-Applicant Employment Type" className="input bg-gray-200" />
                            </div> */}
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant State <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantState")} placeholder="Co-Applicant State" className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant City <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantCity")} placeholder="Co-Applicant City " className="input bg-gray-200" />
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-sm font-medium">Co-Applicant Pincode <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("CoApplicantPincode")} placeholder="Co-Applicant Pincode" className="input bg-gray-200" />
                            </div>

                        </div>
                    </div>

                    {/* ================= G Address Proof Documents ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">G. Applicant Address Proof Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Latest Home Electricity Bill (Only PDF Allowed) <span className="text-destructive">*</span></label>
                                <input type="file" accept="application/pdf" {...register("LatestHomeElectricityBill", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("LatestHomeElectricityBill") ? (
                                    <p className="text-sm text-red-600">{getError("LatestHomeElectricityBill")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Latest Office/Shop Electricity Bill (Only PDF Allowed)  <span className="text-destructive">*</span></label>
                                <input type="file" accept="application/pdf" {...register("LatestOfficeShopElectricityBill ", { required: true, validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("LatestOfficeShopElectricityBill ") ? (
                                    <p className="text-sm text-red-600">{getError("LatestOfficeShopElectricityBill ")}</p>
                                ) : null}
                            </div>

                        </div>
                    </div>



                    {/* ================= H. BANK STATEMENTS ================= */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-1 text-base font-bold text-blue-500">H. Applicant Bank Statement Details</h3>
                        <span className="text-sm">(pdf should not be protected with password  else write down the password)</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Account Type <span className="text-destructive">*</span></label>
                                <div className="space-y-3">
                                    {["Saving Account", "Current Account", "Company Account", "Joint Account with family person", "OD Account", "CC Account", "Partnership Account"].map(
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
                                                                    {...register(statementKey, {
                                                                        validate: (value) => {
                                                                            if (!hasSelectedAccountTypes) return true;
                                                                            const requiredCheck = !!getFileFromValue(value) || "One Year Bank Statement is required";
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
                                                        </div>

                                                        <div className="space-y-1 mt-4">
                                                            <label className="text-sm font-medium">Password (optional)</label>
                                                            <input
                                                                type="text"
                                                                {...register(passwordKey)}
                                                                placeholder="Password"
                                                                className="input bg-gray-200"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* =================I. EXISTING LOANS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">I. Applicant Existing Loan Details</h3>
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
                            className="mt-2 inline-flex w-fit items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                        >
                            + Add More
                        </button>
                    </div>

                    {/* ================= J ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">J.Applicant Income Tax Return</h3>
                        <div className="grid grid-col-2 gap-3">
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Assessment Year 2023-24 <span className="text-destructive">(Optional - PDF only (Max 2 MB))</span></label>
                                </div>
                                <input type="file" {...register("AssessmentYear2324", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("AssessmentYear2324") ? (
                                    <p className="text-sm text-red-600">{getError("AssessmentYear2324")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Assessment Year 2024-25 <span className="text-destructive">(Optional - PDF only (Max 2 MB))</span></label>
                                </div>
                                <input type="file" {...register("AssessmentYear2425", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("AssessmentYear2425") ? (
                                    <p className="text-sm text-red-600">{getError("AssessmentYear2425")}</p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Assessment Year 2025-26 <span className="text-destructive">(Optional - PDF only (Max 2 MB))</span></label>
                                </div>
                                <input type="file" {...register("AssessmentYear2526", { validate: validateMax2MB })} className="input bg-gray-200" />
                                {getError("AssessmentYear2526") ? (
                                    <p className="text-sm text-red-600">{getError("AssessmentYear2526")}</p>
                                ) : null}
                            </div>

                        </div>
                    </div>

                    {/* =================K Applicant  GST Return ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">K. Applicant   GST Return </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Yearly  GST Return <span className="text-destructive">(optional)</span></label>
                                <input type="hidden" {...register("yearlyGstReturnType")} />
                                <div className="space-y-3">
                                    {[{ label: "GSTR1", value: "GSTR-1" }, { label: "GSTR-2", value: "GSTR-2" }, { label: "GSTR-3B", value: "GSTR-3B" }, { label: "GSTR-2A/2B", value: "GSTR-2A/2B" }, { label: "GSTR-4", value: "GSTR-4" }, { label: "GSTR-9", value: "GSTR-9" }].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedGstReturnTypes.includes(opt.value)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    const nextSelected = checked
                                                        ? Array.from(new Set([...selectedGstReturnTypes, opt.value]))
                                                        : selectedGstReturnTypes.filter((v) => v !== opt.value);

                                                    setSelectedGstReturnTypes(nextSelected);
                                                    setValue("yearlyGstReturnType", nextSelected.join(", "));

                                                    const key = toAccountKey(opt.value);
                                                    const fileKey = `yearlyGstReturnFile_${key}`;

                                                    if (checked) {
                                                        setTimeout(() => {
                                                            gstReturnFileRefs.current[key]?.click();
                                                        }, 0);
                                                    } else {
                                                        setValue(fileKey, null);
                                                        if (gstReturnFileRefs.current[key]) {
                                                            gstReturnFileRefs.current[key]!.value = "";
                                                        }
                                                    }
                                                }}
                                                className="h-4 w-4"
                                            />
                                            <span className="text-sm font-semibold text-gray-900">
                                                {opt.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1">
                                {selectedGstReturnTypes.length === 0 ? (
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        {...register("yearlyGstReturnFile", { validate: validateMax2MB })}
                                        className="input bg-gray-200"
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        {selectedGstReturnTypes.map((t) => {
                                            const key = toAccountKey(t);
                                            const fileKey = `yearlyGstReturnFile_${key}`;
                                            const file = getFileFromValue(watch(fileKey));
                                            const gstRegister = register(fileKey, { validate: validateMax2MB });

                                            return (
                                                <div key={fileKey} className="space-y-1">
                                                    <div className="text-sm font-semibold text-gray-900">{t}</div>
                                                    <input
                                                        type="file"
                                                        accept="application/pdf"
                                                        {...gstRegister}
                                                        ref={(el) => {
                                                            gstRegister.ref(el);
                                                            gstReturnFileRefs.current[key] = el;
                                                        }}
                                                        className="input bg-gray-200"
                                                    />
                                                    {file ? (
                                                        <div className="text-sm text-gray-700">{file.name}</div>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>


                    {/* ================= L. Business Registration Certificates================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">L. Business Registration Certificates(one document mandatory)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Business Registration Certificates <span className="text-red-400">*</span></label>
                                <div className="space-y-3">
                                    {["GST Registration", "MSME Udyam Aadhar", "Shop Act (Ghumsta Licence)", "Trade Licence", "Local Gram Panchayat Business Certificate Licence",
                                        "food licence", "ISO certificate", "startup India certificate", "import export licence / certificate", "company incorporation certificate", "Company PAN Card"].map(
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
                                                        {...register("businessRegistrationCertificates")}
                                                        className="h-4 w-4"
                                                    />
                                                </label>
                                            )
                                        )}
                                </div>
                            </div>

                            {hasSelectedBusinessRegistrationCertificates ? (
                                <div className="space-y-4">
                                    {(Array.isArray(businessRegistrationCertificates)
                                        ? businessRegistrationCertificates
                                        : typeof businessRegistrationCertificates === "string" &&
                                            businessRegistrationCertificates
                                            ? [businessRegistrationCertificates]
                                            : []).map((t) => {
                                                const key = toAccountKey(t);
                                                const fileKey = `businessRegistrationCertificateFile_${key}`;

                                                return (
                                                    <div key={key} className="rounded-xl border border-gray-200 bg-white p-4">
                                                        <div className="text-sm font-semibold text-gray-900 mb-3">
                                                            {String(t).toLowerCase()}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium">Upload Certificate (Only PDF)</label>
                                                            <input
                                                                type="file"
                                                                accept=".pdf"
                                                                {...register(fileKey, { validate: validateMax2MB })}
                                                                className="input bg-gray-200"
                                                            />
                                                            {getError(fileKey) ? (
                                                                <p className="text-sm text-red-600">{getError(fileKey)}</p>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {/* ================= M. Buying Goods ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">M. Buying Goods</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div>
                                    <label className="text-sm font-medium">Are you buying any goods <span className="text-destructive">*</span></label>
                                </div>
                                <select {...register("isBuyingGoods", { required: true })} className="input bg-gray-200">
                                    <option value="">Buying Goods?</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            {isBuyingGoods === "Yes" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Goods Name <span className="text-destructive">*</span></label>
                                        <input
                                            type="text"
                                            {...register("goodsName", {
                                                validate: (value) =>
                                                    isBuyingGoods !== "Yes" ||
                                                    (value !== undefined &&
                                                        value !== null &&
                                                        String(value).trim() !== "") ||
                                                    "Goods Name is required",
                                            })}
                                            placeholder="Goods Name"
                                            className="input bg-gray-200"
                                        />
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
                                    </div>



                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Upload Proforma Invoice (PDF, Max 2MB) <span className="text-red-400 text-xs">(optional)</span></label>
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

                    {/* ================= N. CIBIL Score ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-blue-500">N. Applicant CIBIL Score </h3>
                        <div className="space-y-1">
                            <div>
                                <label className="text-sm font-medium">CIBIL Available <span className="text-destructive">*</span></label>
                            </div>
                            <select {...register("hasCibil", { required: true })} className="input bg-gray-200">
                                <option value="">Do you have CIBIL?</option>
                                <option value="Yes">I have a CIBIL score</option>
                                <option value="No">I don't have a CIBIL score</option>
                            </select>
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

                    {/* ================= O. Upload Other Supported Document================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">O. Upload Other Supported Document</h3>
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
                                            <label className="text-sm font-medium">Upload Document {idx + 1} <span className="text-destructive">(Only PDF, Max:2mb)</span>  </label>
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







                    {/* =================P. reference name details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-semibold text-blue-500">P. Reference name details</h3>
                        <span>(Give 4 Reference Details)</span>
                        {Array.from({ length: Math.max(1, referenceCount || 1) }).map((_, idx) => {
                            const suffix = idx === 0 ? "" : `_${idx}`;
                            return (
                                <div key={idx} className="grid md:grid-cols-2 gap-4">

                                    <div className="flex flex-col items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} Reference Full Name<span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`FirstReferenceFullName${suffix}`)} placeholder={`${idx + 1} Reference Full Name`} className="input bg-gray-200 " />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} Reference Mobile Number<span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceMobileNumber${suffix}`)} placeholder="Reference Mobile Number" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} Relation With Aplicant<span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`RelationWithAplicant${suffix}`)} placeholder="Relation With Aplicant" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex  flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} Email ID <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceEmailId${suffix}`)} placeholder="Email ID" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} Address <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceAddress${suffix}`)} placeholder="Address" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} State <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceState${suffix}`)} placeholder="State" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} City <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferenceCity${suffix}`)} placeholder="City" className="input bg-gray-200" />
                                    </div>
                                    <div className="flex flex flex-col  items-start gap-3">
                                        <label className="text-sm font-medium">{idx + 1} Pincode <span className="text-destructive">(optional)</span></label>
                                        <input type="text" {...register(`ReferencePincode${suffix}`)} placeholder="Pincode" className="input bg-gray-200" />
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            type="button"
                            className="mt-3 inline-flex w-fit items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                            onClick={() => setReferenceCount((c) => Math.max(1, (c || 1) + 1))}
                        >
                            Add More Reference Details
                        </button>
                    </div>

                    {/* ================= Q. Applicant Assets details ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">Q. Applicant  Assets details digital or physical</h3>
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
                                    <select {...register(idx === 0 ? "applicantAssetOngoingLoan" : `applicantAssetOngoingLoan_${idx}`)} className="input bg-gray-200" >
                                        <option value="">--select option--</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        <button
                                type="button"
                                className="mt-3 inline-flex w-fit items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                                onClick={() => setApplicantAssetsCount((c) => Math.max(1, (c || 1) + 1))}
                            >
                                Add More 
                            </button>
                    </div>

                    {/* ================= Medical History ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">R.Applicant Medical History</h3>
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
                        <h3 className="mb-4 text-base font-bold text-blue-500">S.Applicant Addictive Habits</h3>
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
                        <h3 className="mb-4 text-base font-bold text-blue-500">T.Applicant Civil or Criminal Case history</h3>
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


                    {/* ================= CONSENT ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="mb-4 text-base font-bold text-blue-500">U.Consent</h3>
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
                    <div className="flex flex-col-reverse  gap-3 sm:flex-row sm:justify-end sm:gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="businessLoanForm"
                            disabled={loading}
                            className="w-full rounded-xl px-6 py-2.5 text-sm bg-[#F97415] font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60 sm:w-auto "
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
