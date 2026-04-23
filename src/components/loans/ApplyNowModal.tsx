"use client";

import type React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Upload, User, Mail, MapPin, CreditCard, FileCheck, Loader2 } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateInput } from "@/components/ui/DateInput";

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanType: string;
  loanTypeKey?: string;
  categoryKey?: string;
  forceUnifiedForm?: boolean;
}

type FormState = {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  alternateMobile: string;
  businessEmail: string;
  personalEmail: string;
  currentResidentialAddress: string;
  currentResidentialPincode: string;
  currentOfficeAddress: string;
  currentOfficePincode: string;
  requiredLoanAmount?: string;
  residentialStatus?: string;
  businessPremisesStatus?: string;
  yearsAtCurrentResidentialAddress?: string;
  yearsAtCurrentBusinessAddress?: string;
  aadhaarNumber: string;
  panNumber: string;
  voterIdNumber: string;
  drivingLicense: string;
  passportNumber: string;
  loanType?: string;
  jobBusiness?: string;
  bankName?: string;
  limitAmount?: string;
  cardType?: string;
  cibilIssues?:string;
};

export default function ApplyNowModal({ isOpen, onClose, loanType, loanTypeKey, categoryKey, forceUnifiedForm = false }: ApplyNowModalProps) {
  // Employment type selector for determining which form to show
  const [employmentType, setEmploymentType] = useState<"" | "salaried" | "self-employed">("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    watch,
    handleSubmit: handleNonSalariedSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      whatsappNumber: "",
      alternateMobile: "",
      businessEmail: "",
      personalEmail: "",
      currentResidentialAddress: "",
      currentResidentialPincode: "",
      currentOfficeAddress: "",
      currentOfficePincode: "",
      requiredLoanAmount: "",
      residentialStatus: "",
      businessPremisesStatus: "",
      yearsAtCurrentResidentialAddress: "",
      yearsAtCurrentBusinessAddress: "",
      aadhaarNumber: "",
      panNumber: "",
      voterIdNumber: "",
      drivingLicense: "",
      passportNumber: "",
      loanType: "",
      jobBusiness: "",
      cibilIssues: "",
    },
    mode: "onBlur",
  });
  // normalize watched form values to strict types
  const jobBusinessValue: string = String(watch("jobBusiness") || "");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
  const [panFront, setPanFront] = useState<File | null>(null);
  const [residentialBill, setResidentialBill] = useState<File | null>(null);
  const [shopBill, setShopBill] = useState<File | null>(null);
  const [aadhaarFrontError, setAadhaarFrontError] = useState<string | null>(null);
  const [aadhaarBackError, setAadhaarBackError] = useState<string | null>(null);
  const [panFrontError, setPanFrontError] = useState<string | null>(null);
  const [residentialBillError, setResidentialBillError] = useState<string | null>(null);
  const [shopBillError, setShopBillError] = useState<string | null>(null);

  // Unified form-specific files
  const [bankStatementFile, setBankStatementFile] = useState<File | null>(null);
  const [incomeTax2023_24File, setIncomeTax2023_24File] = useState<File | null>(null);
  const [incomeTax2024_25File, setIncomeTax2024_25File] = useState<File | null>(null);
  const [incomeTax2025_26File, setIncomeTax2025_26File] = useState<File | null>(null);
  const [cibilReportFile, setCibilReportFile] = useState<File | null>(null);
  const [businessCertificatesFiles, setBusinessCertificatesFiles] = useState<File[]>([]);
  const [existingLoanStatementFiles, setExistingLoanStatementFiles] = useState<File[]>([]);
  const [applicantPhotoFile, setApplicantPhotoFile] = useState<File | null>(null);
  const [otherSupportedDocuments, setOtherSupportedDocuments] = useState<File[]>([]);

  // Salaried-specific files
  const [panPhoto, setPanPhoto] = useState<File | null>(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState<File | null>(null);
  const [aadhaarBackPhoto, setAadhaarBackPhoto] = useState<File | null>(null);
  const [applicantPhoto, setApplicantPhoto] = useState<File | null>(null);
  const [residencePhoto, setResidencePhoto] = useState<File | null>(null);
  const [officeIdPhoto, setOfficeIdPhoto] = useState<File | null>(null);
  const [salarySlips, setSalarySlips] = useState<File | null>(null);
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [lastElectricityBill, setLastElectricityBill] = useState<File | null>(null);
  const [permElectricityBill, setPermElectricityBill] = useState<File | null>(null);
  const [rentAgreement, setRentAgreement] = useState<File | null>(null);
  const [rentAgreementShop, setRentAgreementShop] = useState<File | null>(null);
  const [companyAllotmentLetter, setCompanyAllotmentLetter] = useState<File | null>(null);
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [proformaInvoiceFile, setProformaInvoiceFile] = useState<File | null>(null);
  const [existingLoanSanctionLetters, setExistingLoanSanctionLetters] = useState<File[]>([]);

  // helper for salaried file validation
  const handleSalariedFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    kind: "image1MB" | "image2MB" | "pdf2MB" | "pdf10MB"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return setter(null);

    const isImage = file.type.startsWith("image/");
    if (kind === "image1MB" || kind === "image2MB") {
      if (!isImage) return window.alert("Please upload an image (JPG/PNG)");
      if (file.size > 2 * 1024 * 1024) return window.alert("Image must be <= 2MB");
    }

    if (kind === "pdf2MB" || kind === "pdf10MB") {
      if (file.type !== "application/pdf") return window.alert("Please upload a PDF file");
      if (file.size > 10 * 1024 * 1024) return window.alert("PDF must be <= 10MB");
    }

    setter(file);
  };

  // handler for existing loan sanction letters
  const handleExistingLoanSanctionLetterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    loanIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      // Remove file if none selected
      setExistingLoanSanctionLetters(prev => {
        const updated = [...prev];
        updated[loanIndex] = null as any;
        return updated;
      });
      return;
    }

    // Validate file
    if (file.type !== "application/pdf") {
      window.alert("Please upload a PDF file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      window.alert("PDF must be <= 10MB");
      return;
    }

    // Update the file at the specific index
    setExistingLoanSanctionLetters(prev => {
      const updated = [...prev];
      updated[loanIndex] = file;
      return updated;
    });
  };

  const validateField = (name: keyof FormState, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim().length < 2 ? "Minimum 2 characters required" : "";
      case "middleName":
        return "";
      case "mobileNumber":
        return !/^[6-9]\d{9}$/.test(value) ? "Enter valid 10-digit mobile number" : "";
      case "alternateMobile":
        return value && !/^[6-9]\d{9}$/.test(value) ? "Enter valid 10-digit mobile number" : "";
      case "businessEmail":
      case "personalEmail":
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Enter valid email address" : "";
      case "currentResidentialPincode":
      case "currentOfficePincode":
        return !/^\d{6}$/.test(value) ? "Enter valid 6-digit pincode" : "";
      case "aadhaarNumber":
        return !/^\d{12}$/.test(value) ? "Enter valid 12-digit Aadhaar number" : "";
      case "requiredLoanAmount":
        return !value || isNaN(Number(value)) || Number(value) <= 0 ? "Enter valid loan amount" : "";
      case "residentialStatus":
      case "businessPremisesStatus":
        return value && !["Owned", "Rented"].includes(value) ? "Select a valid status" : "";
      case "yearsAtCurrentResidentialAddress":
      case "yearsAtCurrentBusinessAddress":
        return value && !/^\d{1,2}$/.test(value) ? "Enter valid years (0-99)" : "";
      case "panNumber":
        return !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())
          ? "Enter valid PAN (e.g., ABCDE1234F)"
          : "";
      default:
        return "";
    }
  };

  const onSubmitNonSalaried = async (data: FormState) => {
    // Ensure required documents are uploaded
    if (!aadhaarFront || !aadhaarBack || !panFront || !residentialBill || !shopBill) {
      window.alert(
        "Please upload Aadhaar front, Aadhaar back, PAN card front, latest residential electricity bill and latest shop/office electricity bill."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionFormData = new globalThis.FormData();

      // Add form fields
      submissionFormData.append("firstName", data.firstName);
      submissionFormData.append("middleName", data.middleName || "");
      submissionFormData.append("lastName", data.lastName);
      submissionFormData.append("mobileNumber", data.mobileNumber);
      submissionFormData.append("whatsappNumber", data.whatsappNumber || "");
      submissionFormData.append("alternateMobile", data.alternateMobile || "");
      submissionFormData.append("businessEmail", data.businessEmail || "");
      submissionFormData.append("personalEmail", data.personalEmail);
      submissionFormData.append("currentResidentialAddress", data.currentResidentialAddress);
      submissionFormData.append("currentResidentialPincode", data.currentResidentialPincode);
      submissionFormData.append("currentOfficeAddress", data.currentOfficeAddress);
      submissionFormData.append("currentOfficePincode", data.currentOfficePincode);
      submissionFormData.append("requiredLoanAmount", data.requiredLoanAmount as string);
      submissionFormData.append("residentialStatus", data.residentialStatus as string);
      submissionFormData.append("businessPremisesStatus", data.businessPremisesStatus as string);
      submissionFormData.append("yearsAtCurrentResidentialAddress", data.yearsAtCurrentResidentialAddress as string);
      submissionFormData.append("yearsAtCurrentBusinessAddress", data.yearsAtCurrentBusinessAddress as string);
      submissionFormData.append("aadhaarNumber", data.aadhaarNumber);
      submissionFormData.append("panNumber", (data.panNumber || "").toUpperCase());
      submissionFormData.append("voterIdNumber", data.voterIdNumber || "");
      submissionFormData.append("drivingLicense", data.drivingLicense || "");
      submissionFormData.append("passportNumber", data.passportNumber || "");
      submissionFormData.append("loanType", isCreditCard ? "credit-card" : "personal");
      submissionFormData.append("jobBusiness", data.jobBusiness || "");

      // Add credit card specific fields if applicable
      if (isCreditCard) {
        submissionFormData.append("officialEmail", data.officialEmail || "");
        submissionFormData.append("bankName", data.bankName || "");
        submissionFormData.append("limitAmount", data.limitAmount || "");
        submissionFormData.append("cardType", data.cardType || "");
        submissionFormData.append("residentialState", data.residentialState || "");
        submissionFormData.append("residentialCity", data.residentialCity || "");
        submissionFormData.append("officePincode", data.officePincode || "");
        submissionFormData.append("loanTypeText", data.loanType || "");
        submissionFormData.append("cibilScoreKnown", data.cibilScoreKnown || "");
        submissionFormData.append("cibilScore", data.cibilScore || "");
        submissionFormData.append("consent", data.consent ? "true" : "false");
      }

      // Add files
      submissionFormData.append("aadhaarFront", aadhaarFront);
      submissionFormData.append("aadhaarBack", aadhaarBack);
      submissionFormData.append("panCardFront", panFront);
      submissionFormData.append("residentialBill", residentialBill);
      submissionFormData.append("shopBill", shopBill);

      const response = await axios.post("/api/apply-now", submissionFormData);
      console.log("click was button");
      console.log(response.data);

      setIsSubmitting(false);
      window.alert(`Application submitted successfully!`);
      reset();
      onClose();
    } catch (error) {
      setIsSubmitting(false);
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data as any)?.message || error.message
          : error instanceof Error
            ? error.message
            : "Unknown error occurred";
      window.alert(`Error: ${message}`);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    type: "image" | "pdf" | "auto" = "auto",
    errSetter?: React.Dispatch<React.SetStateAction<string | null>>,
    formFieldName?: string,
    additionalFormFields?: string[]
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      if (errSetter) errSetter(null);
      return setter(null);
    }

    // clear previous error
    if (errSetter) errSetter(null);

    const setError = (msg: string) => {
      if (errSetter) errSetter(msg);
      else window.alert(msg);
    };

    if (type === "image") {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        setError("Please upload an image (JPG/JPEG/PNG)");
        return setter(null);
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Image must be <= 2MB");
        return setter(null);
      }
    } else if (type === "pdf") {
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return setter(null);
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("PDF must be <= 10MB");
        return setter(null);
      }
    } else if (type === "auto") {
      if (file.type.startsWith("image/")) {
        if (file.size > 2 * 1024 * 1024) {
          setError("Image must be <= 2MB");
          return setter(null);
        }
      } else if (file.type === "application/pdf") {
        if (file.size > 10 * 1024 * 1024) {
          setError("PDF must be <= 10MB");
          return setter(null);
        }
      } else {
        setError("Please upload an image (JPG/JPEG/PNG) or a PDF file");
        return setter(null);
      }
    }

    // success
    if (errSetter) errSetter(null);
    setter(file);
    
    // Also update uForm state if formFieldName is provided (for unified form validation)
    if (formFieldName && isUnifiedForm) {
      const updates: Record<string, string> = { [formFieldName]: file.name };
      
      // Add additional form fields if provided
      if (additionalFormFields) {
        additionalFormFields.forEach(field => {
          updates[field] = file.name;
        });
      }
      
      setUForm(prev => ({ ...prev, ...updates }));
    }
  };

  const isSalaried =
    employmentType === "salaried" ||
    (typeof categoryKey !== "undefined" && categoryKey === "salaried-employees") ||
    (loanTypeKey && loanTypeKey.toLowerCase().includes("salaried")) ||
    loanType.toLowerCase().includes("salaried");

  const isCreditCard =
    (typeof categoryKey !== "undefined" && categoryKey === "credit-cards") ||
    loanType.toLowerCase().includes("credit");

  // Check if this is one of the 5 categories that need the unified form
  const isUnifiedForm = forceUnifiedForm || (!isSalaried && !isCreditCard);

  const [sForm, setSForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobileNumber: "",
    whatsappNumber: "",
    alternateMobile: "",
    personalEmail: "",
    panNumber: "",
    aadhaarNumber: "",
    voterIdNumber: "",
    drivingLicense: "",
    passportNumber: "",
    currentResidentialAddress: "",
    currentResidentialPincode: "",
    state: "",
    city: "",
    permanentAddress: "",
    residenceType: "",
    stayingSinceDate: "",
    companyName: "",
    organizationType: "",
    industry: "",
    industryOther: "",
    designation: "",
    employmentType: "",
    dateOfJoining: "",
    totalExperienceYears: "",
    officeLocation: "",
    officePincode: "",
    officialEmail: "",
    monthlyNetSalary: "",
    salaryCreditMode: "",
    salaryAccountBankName: "",
    numberOfExistingLoans: "",
    existingLoansData: [
      { totalLoanAmount: "", totalMonthlyEmi: "", loanType: "", bankName: "", emiDelayPast3Months: "" },
    ],
    hasCibil: "",
    cibilScore: "",
    requiredLoanAmount: "",
    preferredTenure: "",
    purpose: "",
    loanType: "",
    jobBusiness: "Job",
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantEmploymentType: "",
    isBuyingGoods: "",
    quotationAmount: "",
    cibilIssues: "",
  });

  // Unified form state for the 5 categories
  const [uForm, setUForm] = useState<Record<string, any>>({
    firstName: "",
    middleName: "",
    lastName: "",
    aadhaarLinkedMobile: "",
    alternateMobile: "",
    whatsappNumber: "",
    gender: "",
    maritalStatus: "",
    dob: "",
    personalEmail: "",
    officialEmail: "",
    voterId: "",
    drivingLicense: "",
    passport: "",
    currentResidentialAddress: "",
    residentialPincode: "",
    residentialState: "",
    residentialCity: "",
    currentOfficeAddress: "",
    officePincode: "",
    officeState: "",
    officeCity: "",
    requiredLoanAmount: "",
    loanType: "",
    cibilIssues: "",
    aadhaarCardType: "Aadhaar Card",
    panCardType: "PAN Card",
    bankStatementType: [],
    bankStatementDetails: [],
    existingLoansCount: "",
    existingLoanDetails: [],
    businessCertificates: [],
    businessCertificateFiles: {},
    isBuyingGoods: "",
    goodsDescription: "",
    proformaInvoice: "",
    cibilScoreKnown: "",
    cibilScore: "",
    cibilReport: "",
    otherSupportedDocsCount: "",
    otherSupportedDocuments: [],
    consent: false,
    authorizationConsent: false,
    // Coapplicant fields
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantEmploymentType: "",
  });

  const handleUnifiedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setUForm((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setUForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleUnifiedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = [
      "firstName", "lastName", "aadhaarLinkedMobile", "currentResidentialAddress",
      "residentialPincode", "residentialState", "residentialCity", "currentOfficeAddress",
      "officePincode", "officeState", "officeCity", "requiredLoanAmount", "loanType",
      "gender", "maritalStatus", "dob", "personalEmail", "aadhaarCardType", "panCardType",
      "residentialBill", "officeElectricityBill", "consent"
    ];

    for (const field of requiredFields) {
      if (!(uForm as Record<string, any>)[field] || (Array.isArray((uForm as Record<string, any>)[field]) && (uForm as Record<string, any>)[field].length === 0)) {
        window.alert(`Please fill ${field}`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new globalThis.FormData();
      
      // Add all form fields except loanType (will be set separately)
      Object.entries(uForm).forEach(([key, value]) => {
        if (key === "loanType") return; // Skip loanType as it will be set separately
        
        // Map unified form field names to expected API field names
        let apiFieldName = key;
        if (key === "aadhaarLinkedMobile") {
          apiFieldName = "mobileNumber";
        } else if (key === "personalEmail") {
          apiFieldName = "personalEmail"; // Keep as is
        }
        
        if (Array.isArray(value)) {
          formData.append(apiFieldName, JSON.stringify(value));
        } else if (typeof value === "boolean") {
          formData.append(apiFieldName, value ? "true" : "false");
        } else {
          formData.append(apiFieldName, String(value || ""));
        }
      });

      // Add files
      if (aadhaarFront) formData.append("aadhaarFront", aadhaarFront);
      if (aadhaarBack) formData.append("aadhaarBack", aadhaarBack);
      if (panFront) formData.append("panFront", panFront);
      if (residentialBill) formData.append("residentialBill", residentialBill);
      if (shopBill) formData.append("shopBill", shopBill);
      if (bankStatementFile) formData.append("bankStatementFile", bankStatementFile);
      if (incomeTax2023_24File) formData.append("incomeTax2023_24File", incomeTax2023_24File);
      if (incomeTax2024_25File) formData.append("incomeTax2024_25File", incomeTax2024_25File);
      if (incomeTax2025_26File) formData.append("incomeTax2025_26File", incomeTax2025_26File);
      if (proformaInvoiceFile) formData.append("proformaInvoiceFile", proformaInvoiceFile);
      if (cibilReportFile) formData.append("cibilReportFile", cibilReportFile);
      
      // Add multiple files
      businessCertificatesFiles.forEach((file, index) => {
        formData.append(`businessCertificatesFiles_${index}`, file);
      });
      existingLoanStatementFiles.forEach((file, index) => {
        formData.append(`existingLoanStatementFiles_${index}`, file);
      });

      // Send correct loan type based on form category
      const loanTypeValue = isCreditCard ? "credit-card" : "unified";
      formData.append("loanType", loanTypeValue);

      const response = await axios.post("/api/apply-now", formData);
      
      setIsSubmitting(false);
      window.alert(`Application submitted successfully!`);
      onClose();
    } catch (error) {
      setIsSubmitting(false);
      const message = axios.isAxiosError(error) 
        ? (error.response?.data as any)?.message || error.message
        : error instanceof Error ? error.message : "Unknown error occurred";
      window.alert(`Error: ${message}`);
    }
  };

  const handleSalariedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSForm((p) => ({ ...p, [name]: value }));
  };

  const handleExistingLoanChange = (index: number, field: string, value: string) => {
    setSForm((p) => {
      const updated = [...p.existingLoansData];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...p, existingLoansData: updated };
    });
  };

  const handleNumberOfLoansChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(e.target.value, 10);
    setSForm((p) => {
      const loansData = Array.from({ length: num }, (_, i) => p.existingLoansData[i] || { totalLoanAmount: "", totalMonthlyEmi: "", loanType: "", bankName: "", emiDelayPast3Months: "" });
      return { ...p, numberOfExistingLoans: String(num), existingLoansData: loansData };
    });
    // Reset loan sanction letters array
    setExistingLoanSanctionLetters(Array(num).fill(null));
  };

  const handleSalariedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic required fields validation
    const requiredFields: Array<{ key: keyof typeof sForm; label: string }> = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "dob", label: "Date of Birth" },
      { key: "gender", label: "Gender" },
      { key: "maritalStatus", label: "Marital Status" },
      { key: "mobileNumber", label: "Mobile Number" },
      { key: "personalEmail", label: "Personal Email" },
      { key: "panNumber", label: "PAN Number" },
      { key: "aadhaarNumber", label: "Aadhaar Number" },
      { key: "currentResidentialAddress", label: "Current Residential Address" },
      { key: "currentResidentialPincode", label: "Current Residential Pincode" },
      { key: "state", label: "State" },
      { key: "city", label: "City" },
      { key: "residenceType", label: "Residence Type" },
      { key: "companyName", label: "Company Name" },
      { key: "designation", label: "Designation" },
      { key: "employmentType", label: "Employment Type" },
      { key: "dateOfJoining", label: "Date of Joining" },
      { key: "monthlyNetSalary", label: "Monthly Net Salary" },
      { key: "salaryCreditMode", label: "Salary Credit Mode" },
      { key: "salaryAccountBankName", label: "Salary Account Bank Name" },
      { key: "requiredLoanAmount", label: "Required Loan Amount" },
    ];

    for (const f of requiredFields) {
      const raw = sForm[f.key];
      const value = typeof raw === "string" ? raw.trim() : String(raw || "").trim();
      if (!value) {
        window.alert(`Please fill ${f.label}`);
        return;
      }
    }

    // Ensure essential documents
    if (!panPhoto || !aadhaarPhoto || !aadhaarBackPhoto || !applicantPhoto) {
      window.alert("Please upload PAN photo, Aadhaar front & back photos and Applicant photo");
      return;
    }

    // Consent checkbox
    const consent = (document.getElementById("s_consent") as HTMLInputElement | null)?.checked;
    if (!consent) {
      window.alert("Please provide consent to proceed");
      return;
    }
    const termsChecked = (document.getElementById("s_terms") as HTMLInputElement | null)?.checked;
    if (!termsChecked) {
      window.alert("Please agree to the Terms & Conditions and Privacy Policy to proceed");
      return;
    }

    // Validate file types & sizes
    const validateImage = (f: File | null, name: string) => {
      if (!f) return false;
      if (!f.type.startsWith("image/")) {
        window.alert(`${name} must be an image (JPG/PNG)`);
        return false;
      }
      if (f.size > 2 * 1024 * 1024) {
        window.alert(`${name} must be <= 2MB`);
        return false;
      }
      return true;
    };

    const validatePdf = (f: File | null, name: string) => {
      if (!f) return false;
      if (f.type !== "application/pdf") {
        window.alert(`${name} must be a PDF`);
        return false;
      }
      if (f.size > 10 * 1024 * 1024) {
        window.alert(`${name} must be <= 10MB`);
        return false;
      }
      return true;
    };

    if (!validateImage(panPhoto, "PAN photo") || !validateImage(aadhaarPhoto, "Aadhaar photo") || !validateImage(applicantPhoto, "Applicant photo")) {
      return;
    }
    if (officeIdPhoto && !validateImage(officeIdPhoto, "Office ID photo")) return;
    if (salarySlips && !validatePdf(salarySlips, "Salary slips")) return;
    if (bankStatement && !validatePdf(bankStatement, "Bank statement")) return;

    setIsSubmitting(true);

    try {
      const fd = new globalThis.FormData();
      fd.append("loanType", "salaried");

      const { existingLoansData, ...formDataRest } = sForm;

      const normalizedMaritalStatus =
        String(formDataRest.maritalStatus || "") === "Yes"
          ? "Married"
          : String(formDataRest.maritalStatus || "") === "No"
            ? "Single"
            : String(formDataRest.maritalStatus || "");

      const normalizedSalaryCreditMode = (() => {
        const raw = String(formDataRest.salaryCreditMode || "");
        if (!raw) return "";
        if (raw === "BankTransfer" || raw === "NEFT_IMPS") return "NEFT";
        return raw;
      })();

      const normalizedStayingSinceDate = (() => {
        const raw = String(formDataRest.stayingSinceDate || "").trim();
        if (!raw) return "";

        // Return date as-is since we're now using date input
        return raw;
      })();

      Object.entries(formDataRest).forEach(([k, v]) => {
        if (k === "maritalStatus") {
          fd.append(k, normalizedMaritalStatus);
          return;
        }
        if (k === "salaryCreditMode") {
          fd.append(k, normalizedSalaryCreditMode);
          return;
        }
        if (k === "stayingSinceDate") {
          fd.append(k, normalizedStayingSinceDate);
          return;
        }
        fd.append(k, String(v || ""));
      });
      fd.append("existingLoansData", JSON.stringify(existingLoansData));

      fd.append("panPhoto", panPhoto);
      fd.append("aadhaarPhoto", aadhaarPhoto);
      if (aadhaarBackPhoto) fd.append("aadhaarBackPhoto", aadhaarBackPhoto);
      fd.append("applicantPhoto", applicantPhoto);
      if (residencePhoto) fd.append("residencePhoto", residencePhoto);
      if (officeIdPhoto) fd.append("officeIdPhoto", officeIdPhoto);
      if (salarySlips) fd.append("salarySlips", salarySlips);
      if (bankStatement) fd.append("bankStatement", bankStatement);
      if (lastElectricityBill) fd.append("lastElectricityBill", lastElectricityBill);
      if (permElectricityBill) fd.append("permElectricityBill", permElectricityBill);
      if (rentAgreement) fd.append("rentAgreement", rentAgreement);
      if (companyAllotmentLetter) fd.append("companyAllotmentLetter", companyAllotmentLetter);
      if (cibilReportFile) fd.append("cibilReport", cibilReportFile);
      if (quotationFile) fd.append("quotationFile", quotationFile);
      if (proformaInvoiceFile) fd.append("proformaInvoiceFile", proformaInvoiceFile);
      
      // Add existing loan sanction letters
      existingLoanSanctionLetters.forEach((file, index) => {
        if (file) {
          fd.append(`existingLoanSanctionLetter_${index}`, file);
        }
      });

      const response = await axios.post("/api/apply-now", fd);

      setIsSubmitting(false);
      window.alert(`Application submitted successfully!`);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      const message =
        axios.isAxiosError(err)
          ? (err.response?.data as any)?.message || err.message
          : err instanceof Error
            ? err.message
            : "Unknown error";
      window.alert(`Error: ${message}`);
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
  { "id": 25, "name": "Mining & Metals" }
]


  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative z-10 w-full max-w-full max-h-[90vh] m-0 sm:m-4 overflow-hidden rounded-none sm:rounded-2xl bg-card shadow-2xl animate-modal-in">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Apply for {loanType}</h2>
            <p className="text-sm text-muted-foreground">Fill in your details to proceed</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form
          id="applyNowModalForm"
          onSubmit={isSalaried ? handleSalariedSubmit : isUnifiedForm ? handleUnifiedSubmit : handleNonSalariedSubmit(onSubmitNonSalaried)}
          className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-8"
        >

          {isSalaried && (
            <>
              {/* A. APPLICANT BASIC DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">A. Applicant Basic Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_firstName" className="text-sm font-medium">First Name <span className="text-destructive">*</span></Label>
                    <Input id="s_firstName" name="firstName" placeholder="First Name (as per PAN)*" value={sForm.firstName} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_middleName" className="text-sm font-medium">Middle Name (optional)</Label>
                    <Input id="s_middleName" name="middleName" placeholder="Middle Name" value={sForm.middleName} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_lastName" className="text-sm font-medium">Last Name <span className="text-destructive">*</span></Label>
                    <Input id="s_lastName" name="lastName" placeholder="Last Name (as per PAN)*" value={sForm.lastName} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <DateInput
                    id="s_dob"
                    name="dob"
                    label="Date of Birth"
                    value={sForm.dob}
                    onChange={handleSalariedChange}
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="s_gender" className="text-sm font-medium">Gender <span className="text-destructive">*</span></Label>
                    <select id="s_gender" name="gender" value={sForm.gender} onChange={handleSalariedChange} required className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_maritalStatus" className="text-sm font-medium">Marital Status <span className="text-destructive">*</span></Label>
                    <select id="s_maritalStatus" name="maritalStatus" value={sForm.maritalStatus} onChange={handleSalariedChange} required className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Marital Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_mobileNumber" className="text-sm font-medium">Adhaar Linked Primary Mobile Number <span className="text-destructive">*</span></Label>
                    <Input id="s_mobileNumber" name="mobileNumber" placeholder="Mobile Number*" value={sForm.mobileNumber} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_whatsappNumber" className="text-sm font-medium">WhatsApp Number (optional)</Label>
                    <Input id="s_whatsappNumber" name="whatsappNumber" placeholder="WhatsApp Number" value={sForm.whatsappNumber} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_alternateMobile" className="text-sm font-medium">Alternate Mobile Number (optional)</Label>
                    <Input id="s_alternateMobile" name="alternateMobile" placeholder="Alternate Mobile Number" value={sForm.alternateMobile} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_personalEmail" className="text-sm font-medium">Personal Email ID <span className="text-destructive">*</span></Label>
                    <Input id="s_personalEmail" name="personalEmail" type="email" placeholder="Personal Email ID*" value={sForm.personalEmail} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_voterId" className="text-sm font-medium">Voter ID (optional)</Label>
                    <Input id="s_voterId" name="voterIdNumber" placeholder="Voter ID (optional)" value={sForm.voterIdNumber} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_drivingLicense" className="text-sm font-medium">Driving License (optional)</Label>
                    <Input id="s_drivingLicense" name="drivingLicense" placeholder="Driving License (optional)" value={sForm.drivingLicense} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_passportNumber" className="text-sm font-medium">Passport No. (optional)</Label>
                    <Input id="s_passportNumber" name="passportNumber" placeholder="Passport No. (optional)" value={sForm.passportNumber} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
              </fieldset>

              {/* B. KYC DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">B. KYC Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_panNumber" className="text-sm font-medium">PAN Card Number <span className="text-destructive">*</span></Label>
                    <Input id="s_panNumber" name="panNumber" placeholder="PAN Card Number*" value={sForm.panNumber} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_aadhaarNumber" className="text-sm font-medium">Aadhaar Card Number <span className="text-destructive">*</span></Label>
                    <Input id="s_aadhaarNumber" name="aadhaarNumber" placeholder="Aadhaar Card Number*" value={sForm.aadhaarNumber} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PAN Card Photo (Front)* <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{panPhoto ? `${panPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPanPhoto, "image2MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Photo (Front)* <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{aadhaarPhoto ? `${aadhaarPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setAadhaarPhoto, "image2MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Photo (Back)* <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{aadhaarBackPhoto ? `${aadhaarBackPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setAadhaarBackPhoto, "image2MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Applicant Photo* <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{applicantPhoto ? `${applicantPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setApplicantPhoto, "image2MB")} />
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* C. RESIDENTIAL DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">C. Residential Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="s_currentResidentialAddress" className="text-sm font-medium">Current Address <span className="text-destructive">*</span></Label>
                  <Input id="s_currentResidentialAddress" name="currentResidentialAddress" placeholder="Current Address*" value={sForm.currentResidentialAddress} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_state" className="text-sm font-medium">State <span className="text-destructive">*</span></Label>
                    <select id="s_state" name="state" value={sForm.state} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_city" className="text-sm font-medium">City <span className="text-destructive">*</span></Label>
                    <Input id="s_city" name="city" placeholder="City" value={sForm.city} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_currentResidentialPincode" className="text-sm font-medium">PIN <span className="text-destructive">*</span></Label>
                    <Input id="s_currentResidentialPincode" name="currentResidentialPincode" placeholder="PIN" value={sForm.currentResidentialPincode} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_residenceType" className="text-sm font-medium">Residence Type <span className="text-destructive">*</span></Label>
                    <select id="s_residenceType" name="residenceType" value={sForm.residenceType} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select Residence Type</option>
                      <option value="Owned">Owned</option>
                      <option value="Rented">Rented</option>
                      <option value="Company Provided">Company Provided</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_stayingSinceDate" className="text-sm font-medium">Staying Since (Date)</Label>
                    <DateInput
                      id="s_stayingSinceDate"
                      name="stayingSinceDate"
                      label="Staying Since"
                      value={sForm.stayingSinceDate}
                      onChange={handleSalariedChange}
                      required
                    />
                  </div>
                </div>

                                {/* Conditional optional residential uploads based on Residence Type */}
                {sForm.residenceType === "Owned" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_lastElectricityBill" className="text-sm font-medium">Upload latest electricity bill (optional) <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{lastElectricityBill ? `${lastElectricityBill.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setLastElectricityBill, "image2MB")} />
                      </label>
                    </div>
                  </div>
                )}

                {sForm.residenceType === "Rented" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_permanentAddress" className="text-sm font-medium">Permanent Address (optional)</Label>
                      <Input id="s_permanentAddress" name="permanentAddress" placeholder="Permanent Address" value={sForm.permanentAddress} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Permanent Address Electricity Bill (optional) <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{permElectricityBill ? `${permElectricityBill.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPermElectricityBill, "image2MB")} />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rent Agreement (optional) <span className="text-xs text-muted-foreground">(PDF, Max 10MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{rentAgreement ? `${rentAgreement.name.slice(0, 18)}...` : "Upload PDF, Max 10MB"}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setRentAgreement, "pdf10MB")} />
                      </label>
                    </div>
                  </div>
                )}

                {sForm.residenceType === "Company Provided" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_permanentAddress" className="text-sm font-medium">Permanent Address (optional)</Label>
                      <Input id="s_permanentAddress" name="permanentAddress" placeholder="Permanent Address" value={sForm.permanentAddress} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Permanent Address Electricity Bill (optional) <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{permElectricityBill ? `${permElectricityBill.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPermElectricityBill, "image2MB")} />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Company Allotment Letter (optional) <span className="text-xs text-muted-foreground">(PDF, Max 10MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{companyAllotmentLetter ? `${companyAllotmentLetter.name.slice(0, 18)}...` : "Upload PDF, Max 10MB"}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setCompanyAllotmentLetter, "pdf10MB")} />
                      </label>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* D. EMPLOYMENT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">D. Employment Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_companyName" className="text-sm font-medium">Company Name <span className="text-destructive">*</span></Label>
                    <Input id="s_companyName" name="companyName" placeholder="Company Name" value={sForm.companyName} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_organizationType" className="text-sm font-medium">Organization Type <span className="text-destructive">*</span></Label>
                    <select id="s_organizationType" name="organizationType" value={sForm.organizationType} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
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
                  <div className="space-y-2">
                    <Label htmlFor="s_industry" className="text-sm font-medium">Industry / Sector <span className="text-destructive">*</span></Label>
                    <select id="s_industry" name="industry" value={sForm.industry} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Industry / Sector</option>
                      {sector.map((sector)=>(
                          <option key={sector.id} value={sector.name}>{sector.name}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {sForm.industry === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="s_industryCustom" className="text-sm font-medium">Please specify your Industry / Sector <span className="text-destructive">*</span></Label>
                      <Input id="s_industryCustom" name="industryOther" placeholder="Enter your industry sector" value={sForm.industryOther} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="s_designation" className="text-sm font-medium">Designation <span className="text-destructive">*</span></Label>
                    <Input id="s_designation" name="designation" placeholder="Designation" value={sForm.designation} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_employmentType" className="text-sm font-medium">Employment Type <span className="text-destructive">*</span></Label>
                    <select id="s_employmentType" name="employmentType" value={sForm.employmentType} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Employment Type</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                      <option value="Probation">Probation</option>
                      <option value="PartTime">Part Time</option>
                    </select>
                  </div>
                  <DateInput
                    id="s_dateOfJoining"
                    name="dateOfJoining"
                    label="Date of Joining"
                    value={sForm.dateOfJoining}
                    onChange={handleSalariedChange}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="s_totalExperienceYears" className="text-sm font-medium">Total Work Experience (Years) <span className="text-destructive">*</span></Label>
                    <Input id="s_totalExperienceYears" name="totalExperienceYears" type="number" placeholder="Total Experience (Years)" value={sForm.totalExperienceYears} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleSalariedChange(e);
                      }
                    }} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_officeLocation" className="text-sm font-medium">Current Office full address <span className="text-destructive">*</span></Label>
                    <Input id="s_officeLocation" name="officeLocation" placeholder="Office Location / City" value={sForm.officeLocation} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_officePincode" className="text-sm font-medium">Office PIN <span className="text-destructive">*</span></Label>
                    <Input id="s_officePincode" name="officePincode" placeholder="Office PIN" value={sForm.officePincode} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_officialEmail" className="text-sm font-medium">Official Email ID (optional)</Label>
                    <Input id="s_officialEmail" name="officialEmail" type="email" placeholder="Official Email ID" value={sForm.officialEmail} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Office ID Card Photo <span className="text-xs text-muted-foreground">(Max 2MB)</span></Label>
                  <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs text-muted-foreground mt-1">{officeIdPhoto ? `${officeIdPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 2MB"}</span>
                    <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setOfficeIdPhoto, "image2MB")} />
                  </label>
                </div>
              </fieldset>

              {/* E. INCOME DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">E. Income Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_monthlyNetSalary" className="text-sm font-medium">Monthly Net Salary (₹) <span className="text-destructive">*</span></Label>
                    <Input id="s_monthlyNetSalary" name="monthlyNetSalary" type="number" placeholder="Monthly Net Salary (₹)" value={sForm.monthlyNetSalary} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleSalariedChange(e);
                      }
                    }} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_salaryCreditMode" className="text-sm font-medium">Salary Credit Mode <span className="text-destructive">*</span></Label>
                    <select id="s_salaryCreditMode" name="salaryCreditMode" value={sForm.salaryCreditMode} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Salary Credit Mode</option>
                      <option value="BankTransfer">Bank Transfer</option>
                      <option value="NEFT_IMPS">NEFT / IMPS</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_salaryAccountBankName" className="text-sm font-medium">Salary Credit Account Bank Name <span className="text-destructive">*</span></Label>
                    <Input id="s_salaryAccountBankName" name="salaryAccountBankName" placeholder="Salary Account Bank" value={sForm.salaryAccountBankName} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 3 Months Salary Slips* <span className="text-xs text-muted-foreground">(PDF, Max 10MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{salarySlips ? `${salarySlips.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setSalarySlips, "pdf10MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 6 Months Bank Statement* <span className="text-xs text-muted-foreground">(PDF, Max 10MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{bankStatement ? `${bankStatement.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setBankStatement, "pdf10MB")} />
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* F. EXISTING LOAN & CREDIT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">F. Existing Loan & Credit Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="s_numberOfExistingLoans" className="text-sm font-medium">Number of Existing Loans</Label>
                  <select id="s_numberOfExistingLoans" value={sForm.numberOfExistingLoans} onChange={handleNumberOfLoansChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                    <option value="">Select Number of Loans</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                {sForm.numberOfExistingLoans && parseInt(sForm.numberOfExistingLoans) > 0 && (
                  <div className="space-y-6">
                    {Array.from({ length: parseInt(sForm.numberOfExistingLoans) }).map((_, index) => (
                      <div key={index} className="border border-blue-300 rounded-lg p-4 space-y-4">
                        <h4 className="text-md font-semibold text-foreground">Loan {index + 1}</h4>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`s_loanAmount_${index}`} className="text-sm font-medium">Total Loan Amount (₹)</Label>
                            <Input
                              id={`s_loanAmount_${index}`}
                              type="number"
                              placeholder="Total Loan Amount"
                              value={sForm.existingLoansData[index]?.totalLoanAmount || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || parseFloat(value) >= 0) {
                                  handleExistingLoanChange(index, "totalLoanAmount", value);
                                }
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`s_loanEmi_${index}`} className="text-sm font-medium">Total Monthly EMI (₹)</Label>
                            <Input
                              id={`s_loanEmi_${index}`}
                              type="number"
                              placeholder="Total Monthly EMI"
                              value={sForm.existingLoansData[index]?.totalMonthlyEmi || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || parseFloat(value) >= 0) {
                                  handleExistingLoanChange(index, "totalMonthlyEmi", value);
                                }
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`s_loanType_${index}`} className="text-sm font-medium">Loan Type</Label>
                            <Input
                              id={`s_loanType_${index}`}
                              placeholder="e.g., Home Loan, Car Loan"
                              value={sForm.existingLoansData[index]?.loanType || ""}
                              onChange={(e) => handleExistingLoanChange(index, "loanType", e.target.value)}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`s_bankName_${index}`} className="text-sm font-medium">Bank Name</Label>
                            <Input
                              id={`s_bankName_${index}`}
                              placeholder="Bank Name"
                              value={sForm.existingLoansData[index]?.bankName || ""}
                              onChange={(e) => handleExistingLoanChange(index, "bankName", e.target.value)}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`s_emiDelay_${index}`} className="text-sm font-medium">Any EMI Delay in Past 3 Months?</Label>
                            <Input
                              id={`s_emiDelay_${index}`}
                              placeholder="No / Yes (specify details)"
                              value={sForm.existingLoansData[index]?.emiDelayPast3Months || ""}
                              onChange={(e) => handleExistingLoanChange(index, "emiDelayPast3Months", e.target.value)}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-sm font-medium">Upload Loan Account Statement (PDF, Max 10MB)</Label>
                            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                              <Upload className="h-5 w-5" />
                              <span className="text-xs text-muted-foreground mt-1">
                                {existingLoanSanctionLetters[index] ? `${existingLoanSanctionLetters[index].name.slice(0, 18)}...` : "Upload PDF, Max 10MB"}
                              </span>
                              <input 
                                type="file" 
                                accept="application/pdf" 
                                className="hidden" 
                                onChange={(e) => handleExistingLoanSanctionLetterChange(e, index)} 
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </fieldset>

              {/* G. CREDIT SCORE */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">G. Credit Score</legend>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">CIBIL (Credit Score)</Label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        <input id="s_hasCibil_yes" type="radio" name="hasCibil" value="Yes" checked={sForm.hasCibil === "Yes"} onChange={handleSalariedChange} />
                        <span className="ml-1">I have a CIBIL score</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input id="s_hasCibil_no" type="radio" name="hasCibil" value="No" checked={sForm.hasCibil === "No"} onChange={handleSalariedChange} />
                        <span className="ml-1">I don't have a CIBIL score</span>
                      </label>
                    </div>
                  </div>
                  {sForm.hasCibil === "Yes" && (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="s_cibilScore" className="text-sm font-medium">CIBIL Score</Label>
                        <Input id="s_cibilScore" name="cibilScore" type="number" placeholder="CIBIL Score" value={sForm.cibilScore} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleSalariedChange(e);
                      }
                    }} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">CIBIL Report (PDF) (optional)</Label>
                        <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                          <Upload className="h-5 w-5" />
                          <span className="text-xs mt-1">{cibilReportFile ? `${cibilReportFile.name.slice(0, 18)}...` : "Upload"}</span>
                          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setCibilReportFile, "pdf10MB")} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </fieldset>

              {/* H. LOAN REQUIREMENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">H. Loan Requirement Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_requiredLoanAmount" className="text-sm font-medium">Required Loan Amount (₹)</Label>
                    <Input id="s_requiredLoanAmount" name="requiredLoanAmount" type="number" placeholder="Required Loan Amount (₹)" value={sForm.requiredLoanAmount} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleSalariedChange(e);
                      }
                    }} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${sForm.requiredLoanAmount ? 'border-gray-400 bg-gray-50' : ''}`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_preferredTenure" className="text-sm font-medium">Preferred Loan Tenure <span className="text-destructive">*</span></Label>
                    <Input id="s_preferredTenure" name="preferredTenure" placeholder="Preferred Loan Tenure" value={sForm.preferredTenure} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_purpose" className="text-sm font-medium">Purpose of Loan <span className="text-destructive">*</span></Label>
                    <Input id="s_purpose" name="purpose" placeholder="Purpose of Loan" value={sForm.purpose} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="s_cibilIssues" className="text-sm font-medium">Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable. (optional)</Label>
                    <Textarea 
                      id="s_cibilIssues" 
                      name="cibilIssues" 
                      placeholder="Example: Late payment history, low credit score, settled loans, written-off accounts, etc."
                      maxLength={1000}
                      value={sForm.cibilIssues || ''} 
                      onChange={handleSalariedChange} 
                      className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 min-h-[100px]" 
                    />
                    <p className="text-xs text-gray-500">Maximum 1000 characters</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_isBuyingGoods" className="text-sm font-medium">Are you buying any goods?</Label>
                    <select id="s_isBuyingGoods" name="isBuyingGoods" value={sForm.isBuyingGoods} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {sForm.isBuyingGoods === "Yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="s_quotationAmount" className="text-sm font-medium">Quotation Amount (₹)</Label>
                      <Input id="s_quotationAmount" name="quotationAmount" type="number" placeholder="Quotation Amount (₹)" value={sForm.quotationAmount} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleSalariedChange(e);
                      }
                    }} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                    </div>
                  )}
                  {sForm.isBuyingGoods === "Yes" && (
                    <div className="space-y-2 sm:col-span-2">
                      <Label className="text-sm font-medium">Upload Proforma Invoice (PDF, Max 10MB)</Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{proformaInvoiceFile ? `${proformaInvoiceFile.name.slice(0, 18)}...` : "Upload PDF, Max 10MB"}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setProformaInvoiceFile, "pdf10MB")} />
                      </label>
                    </div>
                  )}
                </div>
              </fieldset>
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">I. Co-Applicant Details (If Any)</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_coApplicantName" className="text-sm font-medium">Co-Applicant Name (optional)</Label>
                    <Input id="s_coApplicantName" name="coApplicantName" placeholder="Co-Applicant Name" value={sForm.coApplicantName} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_coApplicantRelation" className="text-sm font-medium">Relationship with Applicant (optional)</Label>
                    <Input id="s_coApplicantRelation" name="coApplicantRelation" placeholder="Relationship with Applicant" value={sForm.coApplicantRelation} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_coApplicantEmploymentType" className="text-sm font-medium">Co-Applicant Employment Type (optional)</Label>
                    <Input id="s_coApplicantEmploymentType" name="coApplicantEmploymentType" placeholder="Co-Applicant Employment Type" value={sForm.coApplicantEmploymentType} onChange={handleSalariedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
              </fieldset>

              {/* J. DECLARATION & CONSENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">J. Declaration & Consent</legend>
                <div className="flex items-start gap-3">
                  <input id="s_consent" type="checkbox" className="mt-1" required />
                  <label htmlFor="s_consent" className="text-sm">I authorize Infinity Loans & Business Solutions to verify my details and share my application with Banks / NBFCs for loan evaluation.</label>
                </div>
                <div className="flex items-start gap-3">
                  <input id="s_terms" type="checkbox" className="mt-1" required />
                  <label htmlFor="s_terms" className="text-sm">I agree to the Terms & Conditions and Privacy Policy.</label>
                </div>
              </fieldset>
            </>
          )}

          {!isSalaried && isCreditCard && <>
            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </legend>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName", {
                      required: "This field is required",
                      validate: (v) => validateField("firstName", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "firstName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.firstName ? "border-destructive animate-shake" : ""}`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.firstName.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middleName" className="text-sm font-medium">
                    Middle Name
                  </Label>
                  <Input
                    id="middleName"
                    {...register("middleName")}
                    onFocus={() => setFocusedField("middleName")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "middleName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.middleName ? "border-destructive animate-shake" : ""}`}
                    placeholder="Optional"
                  />
                  {errors.middleName && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.middleName.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName", {
                      required: "This field is required",
                      validate: (v) => validateField("lastName", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "lastName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.lastName ? "border-destructive animate-shake" : ""}`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.lastName.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber" className="text-sm font-medium">
                    Primary Mobile Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    maxLength={10}
                    {...register("mobileNumber", {
                      required: "This field is required",
                      validate: (v) => validateField("mobileNumber", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("mobileNumber")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "mobileNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.mobileNumber ? "border-destructive animate-shake" : ""}`}
                    placeholder="9876543210"
                  />
                  {errors.mobileNumber && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.mobileNumber.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber" className="text-sm font-medium">
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    maxLength={10}
                    {...register("whatsappNumber")}
                    onFocus={() => setFocusedField("whatsappNumber")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "whatsappNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""}`}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateMobile" className="text-sm font-medium">
                    Alternate Mobile
                  </Label>
                  <Input
                    id="alternateMobile"
                    type="tel"
                    maxLength={10}
                    {...register("alternateMobile", {
                      validate: (v) => validateField("alternateMobile", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("alternateMobile")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "alternateMobile" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.alternateMobile ? "border-destructive animate-shake" : ""}`}
                    placeholder="Optional"
                  />
                  {errors.alternateMobile && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.alternateMobile.message || "")}</p>
                  )}
                </div>
              </div>
              
            </fieldset>

            {/* Job/Business field for Credit Card category */}
            {(categoryKey === "credit-cards" || loanType.toLowerCase().includes("credit")) && (
              <fieldset className="space-y-4">
                <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                  <User className="h-5 w-5 text-primary" />
                  Employment Information
                </legend>
                <div className="space-y-2">
                  <Label htmlFor="jobBusiness" className="text-sm font-medium">Current Employment Status</Label>
                  <select id="jobBusiness" {...register("jobBusiness")} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                    <option value="">Select Employment Status</option>
                    <option value="Salaried Employee">Salaried Employee</option>
                    <option value="Self Employed Business">Self Employed Business</option>
                    <option value="Self Employed Professional">Self Employed Professional</option>
                    
                  </select>
                </div>
              </fieldset>
            )}

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                Loan Details
              </legend>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="text-sm font-medium">
                    Bank Name (Credit Card) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="bankName"
                    type="text"
                    {...register("bankName", {
                      required: "This field is required",
                      validate: (v) => validateField("bankName", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("bankName")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "bankName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.bankName ? "border-destructive animate-shake" : ""}`}
                    placeholder="e.g., HDFC Bank, ICICI Bank"
                  />
                  {errors.bankName && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.bankName.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="limitAmount" className="text-sm font-medium">
                    Limit Amount (Credit Card) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="limitAmount"
                    type="number"
                    min={0}
                    {...register("limitAmount", {
                      required: "This field is required",
                      validate: (v) => validateField("limitAmount", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("limitAmount")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "limitAmount" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.limitAmount ? "border-destructive animate-shake" : ""} ${watch("limitAmount") ? 'border-gray-400 bg-gray-50' : ''}`}
                    placeholder="e.g., 500000"
                  />
                  {errors.limitAmount && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.limitAmount.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardType" className="text-sm font-medium">
                    Card Type <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="cardType"
                    {...register("cardType", { required: "This field is required" })}
                    className={`mt-2 block w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 ${errors.cardType ? "border-destructive" : ""
                      }`}
                  >
                    <option value="">Select Card Type</option>
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                  {errors.cardType && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.cardType.message || "")}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cibilIssues" className="text-sm font-medium">Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable. (optional)</Label>
                <Textarea 
                  id="cibilIssues" 
                  {...register("cibilIssues")}
                  placeholder="Example: Late payment history, low credit score, settled loans, written-off accounts, etc."
                  maxLength={1000}
                  className={`mt-2 block w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 ${errors.cibilIssues ? "border-destructive" : ""} min-h-[100px]`}
                />
                <p className="text-xs text-gray-500">Maximum 1000 characters</p>
                {errors.cibilIssues && (
                  <p className="text-xs text-destructive animate-fade-in">{String(errors.cibilIssues.message || "")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="residentialStatus" className="text-sm font-medium">
                  Residential Status <span className="text-destructive">*</span>
                </Label>
                <select
                  id="residentialStatus"
                  {...register("residentialStatus", { required: "This field is required" })}
                  className={`mt-2 block w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 ${errors.residentialStatus ? "border-destructive" : ""
                    }`}
                >
                  <option value="">Select</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
                {errors.residentialStatus && (
                  <p className="text-xs text-destructive animate-fade-in">{String(errors.residentialStatus.message || "")}</p>
                )}
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="yearsAtCurrentResidentialAddress" className="text-sm font-medium">
                    Years at Current Residential Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="yearsAtCurrentResidentialAddress"
                    type="number"
                    min={0}
                    max={99}
                    {...register("yearsAtCurrentResidentialAddress", {
                      required: "This field is required",
                      validate: (v) => validateField("yearsAtCurrentResidentialAddress", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("yearsAtCurrentResidentialAddress")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "yearsAtCurrentResidentialAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.yearsAtCurrentResidentialAddress ? "border-destructive animate-shake" : ""}`}
                    placeholder="e.g., 3"
                  />
                  {errors.yearsAtCurrentResidentialAddress && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.yearsAtCurrentResidentialAddress.message || "")}</p>
                  )}
                </div>

                {/* Show Business Address Years only for employed individuals */}
                {jobBusinessValue && (
                  <div className="space-y-2">
                    <Label htmlFor="yearsAtCurrentBusinessAddress" className="text-sm font-medium">
                      Years at Current Business Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="yearsAtCurrentBusinessAddress"
                      type="number"
                      min={0}
                      max={99}
                      {...register("yearsAtCurrentBusinessAddress", {
                        required: "This field is required",
                        validate: (v) => validateField("yearsAtCurrentBusinessAddress", String(v || "")) || true,
                      })}
                      onFocus={() => setFocusedField("yearsAtCurrentBusinessAddress")}
                      onBlur={() => setFocusedField(null)}
                      className={`transition-all duration-300 ${focusedField === "yearsAtCurrentBusinessAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                        } ${errors.yearsAtCurrentBusinessAddress ? "border-destructive animate-shake" : ""}`}
                      placeholder="e.g., 5"
                    />
                    {errors.yearsAtCurrentBusinessAddress && (
                      <p className="text-xs text-destructive animate-fade-in">{String(errors.yearsAtCurrentBusinessAddress.message || "")}</p>
                    )}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Show Office/Shop Address only for employed individuals */}
            {jobBusinessValue && (
              <fieldset className="space-y-4">
                <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  Office/Shop Address Details
                </legend>
                <div className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentOfficeAddress" className="text-sm font-medium">
                        Current Office / Shop Address <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="currentOfficeAddress"
                        {...register("currentOfficeAddress", { required: "This field is required" })}
                        onFocus={() => setFocusedField("currentOfficeAddress")}
                        onBlur={() => setFocusedField(null)}
                        className={`transition-all duration-300 ${focusedField === "currentOfficeAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                          } ${errors.currentOfficeAddress ? "border-destructive animate-shake" : ""}`}
                        placeholder="Office/Shop, Street, Area, City, State"
                      />
                      {errors.currentOfficeAddress && (
                        <p className="text-xs text-destructive animate-fade-in">{String(errors.currentOfficeAddress.message || "")}</p>
                      )}
                    </div>

                    <div className="w-full sm:w-1/3">
                      <Label htmlFor="currentOfficePincode" className="text-sm font-medium">
                        Current Office / Shop Address PIN Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="currentOfficePincode"
                        maxLength={6}
                        {...register("currentOfficePincode", {
                          required: "This field is required",
                          validate: (v) => validateField("currentOfficePincode", String(v || "")) || true,
                        })}
                        onFocus={() => setFocusedField("currentOfficePincode")}
                        onBlur={() => setFocusedField(null)}
                        className={`mt-2 transition-all duration-300 ${focusedField === "currentOfficePincode" ? "ring-2 ring-primary shadow-glow-primary" : ""
                          } ${errors.currentOfficePincode ? "border-destructive animate-shake" : ""}`}
                        placeholder="400001"
                      />
                      {errors.currentOfficePincode && (
                        <p className="text-xs text-destructive animate-fade-in">{String(errors.currentOfficePincode.message || "")}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rentAgreementShop" className="text-sm font-medium">Upload Rent Agreement (Office / Shop)</Label>
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                        <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                          {rentAgreementShop ? `${rentAgreementShop.name.slice(0, 20)}...` : "Upload (Image JPG/PNG max 2MB or PDF max 10MB)"}
                        </span>
                        <input
                          id="rentAgreementShop"
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setRentAgreementShop, "auto")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            )}

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <Mail className="h-5 w-5 text-primary" />
                Email Information
              </legend>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessEmail" className="text-sm font-medium">
                    Business Email
                  </Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    {...register("businessEmail", {
                      validate: (v) => validateField("businessEmail", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("businessEmail")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "businessEmail" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.businessEmail ? "border-destructive animate-shake" : ""}`}
                    placeholder="john@company.com"
                  />
                  {errors.businessEmail && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.businessEmail.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personalEmail" className="text-sm font-medium">
                    Personal Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="personalEmail"
                    type="email"
                    {...register("personalEmail", {
                      required: "This field is required",
                      validate: (v) => validateField("personalEmail", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("personalEmail")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "personalEmail" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.personalEmail ? "border-destructive animate-shake" : ""}`}
                    placeholder="john.doe@gmail.com"
                  />
                  {errors.personalEmail && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.personalEmail.message || "")}</p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                Address Details
              </legend>

              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentResidentialAddress" className="text-sm font-medium">
                      Current Residential Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="currentResidentialAddress"
                      {...register("currentResidentialAddress", { required: "This field is required" })}
                      onFocus={() => setFocusedField("currentResidentialAddress")}
                      onBlur={() => setFocusedField(null)}
                      className={`transition-all duration-300 ${focusedField === "currentResidentialAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                        } ${errors.currentResidentialAddress ? "border-destructive animate-shake" : ""}`}
                      placeholder="House No, Street, Area, City, State"
                    />
                    {errors.currentResidentialAddress && (
                      <p className="text-xs text-destructive animate-fade-in">{String(errors.currentResidentialAddress.message || "")}</p>
                    )}
                  </div>

                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="currentResidentialPincode" className="text-sm font-medium">
                      Current Residential Address PIN Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="currentResidentialPincode"
                      maxLength={6}
                      {...register("currentResidentialPincode", {
                        required: "This field is required",
                        validate: (v) => validateField("currentResidentialPincode", String(v || "")) || true,
                      })}
                      onFocus={() => setFocusedField("currentResidentialPincode")}
                      onBlur={() => setFocusedField(null)}
                      className={`mt-2 transition-all duration-300 ${focusedField === "currentResidentialPincode" ? "ring-2 ring-primary shadow-glow-primary" : ""
                        } ${errors.currentResidentialPincode ? "border-destructive animate-shake" : ""}`}
                      placeholder="400001"
                    />
                    {errors.currentResidentialPincode && (
                      <p className="text-xs text-destructive animate-fade-in">{String(errors.currentResidentialPincode.message || "")}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentOfficeAddress" className="text-sm font-medium">
                      Current Office / Shop Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="currentOfficeAddress"
                      {...register("currentOfficeAddress", { required: "This field is required" })}
                      onFocus={() => setFocusedField("currentOfficeAddress")}
                      onBlur={() => setFocusedField(null)}
                      className={`transition-all duration-300 ${focusedField === "currentOfficeAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                        } ${errors.currentOfficeAddress ? "border-destructive animate-shake" : ""}`}
                      placeholder="Office/Shop, Street, Area, City, State"
                    />
                    {errors.currentOfficeAddress && (
                      <p className="text-xs text-destructive animate-fade-in">{String(errors.currentOfficeAddress.message || "")}</p>
                    )}
                  </div>

                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="currentOfficePincode" className="text-sm font-medium">
                      Current Office / Shop Address PIN Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="currentOfficePincode"
                      maxLength={6}
                      {...register("currentOfficePincode", {
                        required: "This field is required",
                        validate: (v) => validateField("currentOfficePincode", String(v || "")) || true,
                      })}
                      onFocus={() => setFocusedField("currentOfficePincode")}
                      onBlur={() => setFocusedField(null)}
                      className={`mt-2 transition-all duration-300 ${focusedField === "currentOfficePincode" ? "ring-2 ring-primary shadow-glow-primary" : ""
                        } ${errors.currentOfficePincode ? "border-destructive animate-shake" : ""}`}
                      placeholder="400001"
                    />
                    {errors.currentOfficePincode && (
                      <p className="text-xs text-destructive animate-fade-in">{String(errors.currentOfficePincode.message || "")}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rentAgreementShop" className="text-sm font-medium">Upload Rent Agreement (Office / Shop)</Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {rentAgreementShop ? `${rentAgreementShop.name.slice(0, 20)}...` : "Upload (Image JPG/PNG max 1MB or PDF max 2MB)"}
                      </span>
                      <input
                        id="rentAgreementShop"
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setRentAgreementShop, "auto")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                Identity Details
              </legend>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aadhaarNumber" className="text-sm font-medium">
                    Aadhaar Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="aadhaarNumber"
                    maxLength={12}
                    {...register("aadhaarNumber", {
                      required: "This field is required",
                      validate: (v) => validateField("aadhaarNumber", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("aadhaarNumber")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "aadhaarNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.aadhaarNumber ? "border-destructive animate-shake" : ""}`}
                    placeholder="1234 5678 9012"
                  />
                  {errors.aadhaarNumber && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.aadhaarNumber.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panNumber" className="text-sm font-medium">
                    PAN Card Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="panNumber"
                    maxLength={10}
                    {...register("panNumber", {
                      required: "This field is required",
                      setValueAs: (v) => String(v || "").toUpperCase(),
                      validate: (v) => validateField("panNumber", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("panNumber")}
                    onBlur={() => setFocusedField(null)}
                    className={`uppercase transition-all duration-300 ${focusedField === "panNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.panNumber ? "border-destructive animate-shake" : ""}`}
                    placeholder="ABCDE1234F"
                  />
                  {errors.panNumber && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.panNumber.message || "")}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voterIdNumber" className="text-sm font-medium">
                    Voter ID Number (optional)
                  </Label>
                  <Input
                    id="voterIdNumber"
                    {...register("voterIdNumber")}
                    onFocus={() => setFocusedField("voterIdNumber")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "voterIdNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      }`}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drivingLicense" className="text-sm font-medium">
                    Driving License Number (optional)
                  </Label>
                  <Input
                    id="drivingLicense"
                    {...register("drivingLicense")}
                    onFocus={() => setFocusedField("drivingLicense")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "drivingLicense" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      }`}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2 sm:w-1/2">
                  <Label htmlFor="passportNumber" className="text-sm font-medium">
                    Passport Number (optional)
                  </Label>
                  <Input
                    id="passportNumber"
                    {...register("passportNumber")}
                    onFocus={() => setFocusedField("passportNumber")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "passportNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      }`}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <FileCheck className="h-5 w-5 text-primary" />
                Document Uploads
              </legend>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Aadhaar Front <span className="text-destructive">*</span></Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                      {aadhaarFront ? `${aadhaarFront.name.slice(0, 15)}...` : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setAadhaarFront, "auto", setAadhaarFrontError, "aadhaarCardType")}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                  {aadhaarFrontError && <p className="text-xs text-destructive">{aadhaarFrontError}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Aadhaar Back <span className="text-destructive">*</span></Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                      {aadhaarBack ? `${aadhaarBack.name.slice(0, 15)}...` : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setAadhaarBack, "auto", setAadhaarBackError, "aadhaarCardType")}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                  {aadhaarBackError && <p className="text-xs text-destructive">{aadhaarBackError}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">PAN Card Front <span className="text-destructive">*</span></Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                      {panFront ? `${panFront.name.slice(0, 15)}...` : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setPanFront, "auto", setPanFrontError, "panCardType")}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                  {panFrontError && <p className="text-xs text-destructive">{panFrontError}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Latest Residential Electricity Bill <span className="text-destructive">*</span></Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                      {residentialBill ? `${residentialBill.name.slice(0, 15)}...` : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setResidentialBill, "auto", setResidentialBillError, "residentialBill")}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                  {residentialBillError && <p className="text-xs text-destructive">{residentialBillError}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Latest Shop/Office Electricity Bill <span className="text-destructive">*</span></Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                      {shopBill ? `${shopBill.name.slice(0, 15)}...` : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setShopBill, "auto", setShopBillError, "residentialBill", ["officeElectricityBill"])}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                  {shopBillError && <p className="text-xs text-destructive">{shopBillError}</p>}
                </div>
              </div>
            </fieldset>
          </>}

          {!isSalaried && isUnifiedForm && (
            <>
              {/* A. APPLICANT BASIC DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">A. Applicant Basic Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="u_firstName" className="text-sm font-medium">First Name <span className="text-destructive">*</span></Label>
                    <Input id="u_firstName" name="firstName" placeholder="First Name (as per PAN)*" value={uForm.firstName} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_middleName" className="text-sm font-medium">Middle Name</Label>
                    <Input id="u_middleName" name="middleName" placeholder="Middle Name" value={uForm.middleName} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_lastName" className="text-sm font-medium">Last Name <span className="text-destructive">*</span></Label>
                    <Input id="u_lastName" name="lastName" placeholder="Last Name (as per PAN)*" value={uForm.lastName} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_aadhaarLinkedMobile" className="text-sm font-medium">Aadhaar Linked Primary Mobile Number <span className="text-destructive">*</span></Label>
                    <Input id="u_aadhaarLinkedMobile" name="aadhaarLinkedMobile" placeholder="Mobile Number*" value={uForm.aadhaarLinkedMobile} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_alternateMobile" className="text-sm font-medium">Alternate Mobile Number (optional)</Label>
                    <Input id="u_alternateMobile" name="alternateMobile" placeholder="Alternate Mobile Number" value={uForm.alternateMobile} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_whatsappNumber" className="text-sm font-medium">WhatsApp Number (optional)</Label>
                    <Input id="u_whatsappNumber" name="whatsappNumber" placeholder="WhatsApp Number" value={uForm.whatsappNumber} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_gender" className="text-sm font-medium">Gender <span className="text-destructive">*</span></Label>
                    <select id="u_gender" name="gender" value={uForm.gender} onChange={handleUnifiedChange} required className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_maritalStatus" className="text-sm font-medium">Marital Status <span className="text-destructive">*</span></Label>
                    <select id="u_maritalStatus" name="maritalStatus" value={uForm.maritalStatus} onChange={handleUnifiedChange} required className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Marital Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_dob" className="text-sm font-medium">Date of Birth <span className="text-destructive">*</span></Label>
                    <Input id="u_dob" name="dob" type="date" value={uForm.dob} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_personalEmail" className="text-sm font-medium">Personal Email ID <span className="text-destructive">*</span></Label>
                    <Input id="u_personalEmail" name="personalEmail" type="email" placeholder="Personal Email ID*" value={uForm.personalEmail} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="u_officialEmail" className="text-sm font-medium">Official Email ID (optional)</Label>
                    <Input id="u_officialEmail" name="officialEmail" type="email" placeholder="Official Email ID" value={uForm.officialEmail} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="u_voterId" className="text-sm font-medium">Voter ID (optional)</Label>
                    <Input id="u_voterId" name="voterId" placeholder="Voter ID (optional)" value={uForm.voterId} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_passport" className="text-sm font-medium">Passport (optional)</Label>
                    <Input id="u_passport" name="passport" placeholder="Passport (optional)" value={uForm.passport} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_drivingLicense" className="text-sm font-medium">Driving License (optional)</Label>
                    <Input id="u_drivingLicense" name="drivingLicense" placeholder="Driving License (optional)" value={uForm.drivingLicense} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
              </fieldset>

              {/* B. RESIDENTIAL ADDRESS DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">B. Residential Address Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="u_currentResidentialAddress" className="text-sm font-medium">Current Residential Address <span className="text-destructive">*</span></Label>
                  <Input id="u_currentResidentialAddress" name="currentResidentialAddress" placeholder="Current Residential Address*" value={uForm.currentResidentialAddress} onChange={handleUnifiedChange} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.currentResidentialAddress ? 'border-gray-400 bg-gray-50' : ''}`} />
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="u_residentialPincode" className="text-sm font-medium">Pincode <span className="text-destructive">*</span></Label>
                    <Input id="u_residentialPincode" name="residentialPincode" placeholder="Pincode*" value={uForm.residentialPincode} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_residentialState" className="text-sm font-medium">State <span className="text-destructive">*</span></Label>
                    <Input id="u_residentialState" name="residentialState" placeholder="State*" value={uForm.residentialState} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_residentialCity" className="text-sm font-medium">City <span className="text-destructive">*</span></Label>
                    <Input id="u_residentialCity" name="residentialCity" placeholder="City*" value={uForm.residentialCity} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
              </fieldset>

              {/* C. OFFICE/SHOP ADDRESS DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">C. Office/Shop Address Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="u_currentOfficeAddress" className="text-sm font-medium">Current Shop/Office Address <span className="text-destructive">*</span></Label>
                  <Input id="u_currentOfficeAddress" name="currentOfficeAddress" placeholder="Current Shop/Office Address*" value={uForm.currentOfficeAddress} onChange={handleUnifiedChange} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.currentOfficeAddress ? 'border-gray-400 bg-gray-50' : ''}`} />
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="u_officePincode" className="text-sm font-medium">Pincode <span className="text-destructive">*</span></Label>
                    <Input id="u_officePincode" name="officePincode" placeholder="Pincode*" value={uForm.officePincode} onChange={handleUnifiedChange} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.officePincode ? 'border-gray-400 bg-gray-50' : ''}`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_officeState" className="text-sm font-medium">State <span className="text-destructive">*</span></Label>
                    <Input id="u_officeState" name="officeState" placeholder="State*" value={uForm.officeState} onChange={handleUnifiedChange} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.officeState ? 'border-gray-400 bg-gray-50' : ''}`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_officeCity" className="text-sm font-medium">City <span className="text-destructive">*</span></Label>
                    <Input id="u_officeCity" name="officeCity" placeholder="City*" value={uForm.officeCity} onChange={handleUnifiedChange} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.officeCity ? 'border-gray-400 bg-gray-50' : ''}`} />
                  </div>
                </div>
              </fieldset>

              {/* D. LOAN REQUIREMENT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">D. Loan Requirement Details</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="u_requiredLoanAmount" className="text-sm font-medium">Required Loan Amount <span className="text-destructive">*</span></Label>
                    <Input id="u_requiredLoanAmount" name="requiredLoanAmount" type="number" placeholder="Required Loan Amount*" value={uForm.requiredLoanAmount} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleUnifiedChange(e);
                      }
                    }} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.requiredLoanAmount ? 'border-gray-400 bg-gray-50' : ''}`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_loanType" className="text-sm font-medium">Type of Loan <span className="text-destructive">*</span></Label>
                    <Input id="u_loanType" name="loanType" placeholder="Type of Loan*" value={uForm.loanType} onChange={handleUnifiedChange} className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 ${uForm.loanType ? 'border-gray-400 bg-gray-50' : ''}`} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="u_cibilIssues" className="text-sm font-medium">Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable. (optional)</Label>
                  <Textarea 
                    id="u_cibilIssues" 
                    name="cibilIssues" 
                    placeholder="Example: Late payment history, low credit score, settled loans, written-off accounts, etc."
                    maxLength={1000}
                    value={uForm.cibilIssues || ''} 
                    onChange={handleUnifiedChange} 
                    className={`border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50 min-h-[100px] ${uForm.cibilIssues ? 'border-gray-400 bg-gray-50' : ''}`} 
                  />
                  <p className="text-xs text-gray-500">Maximum 1000 characters</p>
                </div>
              </fieldset>

              {/* E. ID PROOF DOCUMENTS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">E. ID Proof Documents</legend>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Card Upload <span className="text-destructive">*</span></Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {aadhaarFront ? `${aadhaarFront.name.slice(0, 15)}...` : "Upload Aadhaar Front"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setAadhaarFront, "auto", setAadhaarFrontError, "aadhaarCardType")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 2MB) or PDF (Max 10MB)</p>
                    {aadhaarFrontError && <p className="text-xs text-destructive">{aadhaarFrontError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Card Back Upload <span className="text-destructive">*</span></Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {aadhaarBack ? `${aadhaarBack.name.slice(0, 15)}...` : "Upload Aadhaar Back"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setAadhaarBack, "auto", setAadhaarBackError, "aadhaarCardType")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 2MB) or PDF (Max 10MB)</p>
                    {aadhaarBackError && <p className="text-xs text-destructive">{aadhaarBackError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PAN Card Upload <span className="text-destructive">*</span></Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {panFront ? `${panFront.name.slice(0, 15)}...` : "Upload PAN Card"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setPanFront, "auto", setPanFrontError, "panCardType")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 2MB) or PDF (Max 10MB)</p>
                    {panFrontError && <p className="text-xs text-destructive">{panFrontError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Applicant Photo <span className="text-destructive">*</span></Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {applicantPhotoFile ? `${applicantPhotoFile.name.slice(0, 15)}...` : "Upload Applicant Photo"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setApplicantPhotoFile, "image", undefined, "applicantPhoto")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 2MB)</p>
                  </div>
                </div>
              </fieldset>

              {/* F. CO-APPLICANT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">F. Co-Applicant Details (If Any)</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="u_coApplicantName" className="text-sm font-medium">Co-Applicant Name (optional)</Label>
                    <Input id="u_coApplicantName" name="coApplicantName" placeholder="Co-Applicant Name" value={uForm.coApplicantName} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_coApplicantRelation" className="text-sm font-medium">Relationship with Applicant (optional)</Label>
                    <Input id="u_coApplicantRelation" name="coApplicantRelation" placeholder="Relationship with Applicant" value={uForm.coApplicantRelation} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="u_coApplicantEmploymentType" className="text-sm font-medium">Co-Applicant Employment Type (optional)</Label>
                    <Input id="u_coApplicantEmploymentType" name="coApplicantEmploymentType" placeholder="Co-Applicant Employment Type" value={uForm.coApplicantEmploymentType} onChange={handleUnifiedChange} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                  </div>
                </div>
              </fieldset>

              {/* G. ADDRESS PROOF DOCUMENTS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">G. Address Proof Documents</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Latest Home Electricity Bill <span className="text-destructive">*</span></Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {residentialBill ? `${residentialBill.name.slice(0, 15)}...` : "Upload Home Electricity Bill"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setResidentialBill, "auto", setResidentialBillError, "residentialBill")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                    {residentialBillError && <p className="text-xs text-destructive">{residentialBillError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Latest Office/Shop Electricity Bill <span className="text-destructive">*</span></Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {shopBill ? `${shopBill.name.slice(0, 15)}...` : "Upload Office/Shop Electricity Bill"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setShopBill, "auto", setShopBillError, "residentialBill", ["officeElectricityBill"])}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 1MB) or PDF (Max 2MB)</p>
                    {shopBillError && <p className="text-xs text-destructive">{shopBillError}</p>}
                  </div>
                </div>
              </fieldset>

              {/* H. BANK STATEMENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">H. Bank Statement</legend>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Account Type <span className="text-destructive">*</span></Label>
                  <div className="space-y-2">
                    {["saving account", "current account", "company account", "joint account with family person", "OD account", "cc account", "partnership account"].map((type) => (
                      <div key={type} className="border border-gray-200 rounded-lg p-3">
                        <label className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            name="bankStatementType"
                            value={type}
                            checked={uForm.bankStatementType.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUForm((p) => ({ 
                                  ...p, 
                                  bankStatementType: [...p.bankStatementType, type],
                                  bankStatementDetails: [...p.bankStatementDetails, { accountType: type, bankName: '', file: null }]
                                }));
                              } else {
                                setUForm((p) => ({ 
                                  ...p, 
                                  bankStatementType: p.bankStatementType.filter((t: string) => t !== type),
                                  bankStatementDetails: p.bankStatementDetails.filter((d: any) => d.accountType !== type)
                                }));
                              }
                            }}
                          />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                        
                        {uForm.bankStatementType.includes(type) && (
                          <div className="ml-6 space-y-2">
                            <div className="space-y-1">
                              <Label className="text-xs font-medium">Bank Name</Label>
                              <Input
                                placeholder="Enter bank name"
                                value={uForm.bankStatementDetails.find((d: any) => d.accountType === type)?.bankName || ''}
                                onChange={(e) => {
                                  setUForm((p) => ({
                                    ...p,
                                    bankStatementDetails: p.bankStatementDetails.map((d: any) => 
                                      d.accountType === type ? { ...d, bankName: e.target.value } : d
                                    )
                                  }));
                                }}
                                className="border-blue-300 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs font-medium">Upload One Year Bank Statement</Label>
                              <label className="flex flex-col items-center justify-center h-16 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                                <Upload className="h-4 w-4" />
                                <span className="text-xs text-muted-foreground mt-1">
                                  {uForm.bankStatementDetails.find((d: any) => d.accountType === type)?.file?.name 
                                    ? `${uForm.bankStatementDetails.find((d: any) => d.accountType === type)?.file?.name.slice(0, 15)}...` 
                                    : "Upload PDF (Max 10MB)"}
                                </span>
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      if (file.size > 10 * 1024 * 1024) {
                                        window.alert("PDF must be <= 10MB");
                                        return;
                                      }
                                      setUForm((p) => ({
                                        ...p,
                                        bankStatementDetails: p.bankStatementDetails.map((d: any) => 
                                          d.accountType === type ? { ...d, file } : d
                                        )
                                      }));
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* I. EXISTING LOAN DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">I. Existing Loan Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="u_existingLoansCount" className="text-sm font-medium">Number of Existing Running Loans (optional)</Label>
                  <select 
                    id="u_existingLoansCount" 
                    name="existingLoansCount" 
                    value={uForm.existingLoansCount} 
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      setUForm((p) => ({
                        ...p,
                        existingLoansCount: e.target.value,
                        existingLoanDetails: Array.from({ length: count }, (_, i) => 
                          p.existingLoanDetails[i] || { 
                            totalLoanAmount: "", 
                            totalMonthlyEmi: "", 
                            loanType: "", 
                            bankName: "", 
                            emiDelayPast3Months: "",
                            statementFile: null
                          }
                        )
                      }));
                    }} 
                    className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm"
                  >
                    <option value="">Select Number of Loans</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {uForm.existingLoansCount && parseInt(uForm.existingLoansCount) > 0 && (
                  <div className="space-y-6">
                    {Array.from({ length: parseInt(uForm.existingLoansCount) }).map((_, index) => (
                      <div key={index} className="border border-blue-300 rounded-lg p-4 space-y-4">
                        <h4 className="text-md font-semibold text-foreground">Loan {index + 1}</h4>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`u_loanAmount_${index}`} className="text-sm font-medium">Total Loan Amount (₹) <span className="text-destructive">*</span></Label>
                            <Input
                              id={`u_loanAmount_${index}`}
                              type="number"
                              placeholder="Total Loan Amount"
                              value={uForm.existingLoanDetails[index]?.totalLoanAmount || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || parseFloat(value) >= 0) {
                                  setUForm((p) => {
                                    const updated = [...p.existingLoanDetails];
                                    updated[index] = { ...updated[index], totalLoanAmount: value };
                                    return { ...p, existingLoanDetails: updated };
                                  });
                                }
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`u_loanEmi_${index}`} className="text-sm font-medium">Total Monthly EMI (₹) <span className="text-destructive">*</span></Label>
                            <Input
                              id={`u_loanEmi_${index}`}
                              type="number"
                              placeholder="Total Monthly EMI"
                              value={uForm.existingLoanDetails[index]?.totalMonthlyEmi || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || parseFloat(value) >= 0) {
                                  setUForm((p) => {
                                    const updated = [...p.existingLoanDetails];
                                    updated[index] = { ...updated[index], totalMonthlyEmi: value };
                                    return { ...p, existingLoanDetails: updated };
                                  });
                                }
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`u_loanType_${index}`} className="text-sm font-medium">Loan Type <span className="text-destructive">*</span></Label>
                            <Input
                              id={`u_loanType_${index}`}
                              placeholder="Loan Type"
                              value={uForm.existingLoanDetails[index]?.loanType || ""}
                              onChange={(e) => {
                                setUForm((p) => {
                                  const updated = [...p.existingLoanDetails];
                                  updated[index] = { ...updated[index], loanType: e.target.value };
                                  return { ...p, existingLoanDetails: updated };
                                });
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`u_bankName_${index}`} className="text-sm font-medium">Bank Name <span className="text-destructive">*</span></Label>
                            <Input
                              id={`u_bankName_${index}`}
                              placeholder="Bank Name"
                              value={uForm.existingLoanDetails[index]?.bankName || ""}
                              onChange={(e) => {
                                setUForm((p) => {
                                  const updated = [...p.existingLoanDetails];
                                  updated[index] = { ...updated[index], bankName: e.target.value };
                                  return { ...p, existingLoanDetails: updated };
                                });
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`u_emiDelay_${index}`} className="text-sm font-medium">Any Delay or Bounce EMI in Past 3 Months <span className="text-destructive">*</span></Label>
                            <select
                              id={`u_emiDelay_${index}`}
                              value={uForm.existingLoanDetails[index]?.emiDelayPast3Months || ""}
                              onChange={(e) => {
                                setUForm((p) => {
                                  const updated = [...p.existingLoanDetails];
                                  updated[index] = { ...updated[index], emiDelayPast3Months: e.target.value };
                                  return { ...p, existingLoanDetails: updated };
                                });
                              }}
                              className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="text-sm font-medium">Upload Loan Account Statement (PDF format) (optional)</Label>
                            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                              <Upload className="h-5 w-5" />
                              <span className="text-xs text-muted-foreground mt-1">
                                {uForm.existingLoanDetails[index]?.statementFile?.name 
                                  ? `${uForm.existingLoanDetails[index]?.statementFile.name.slice(0, 15)}...` 
                                  : "Upload Loan Statement (Max 10MB)"}
                              </span>
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 10 * 1024 * 1024) {
                                      window.alert("PDF must be <= 10MB");
                                      return;
                                    }
                                    setUForm((p) => {
                                      const updated = [...p.existingLoanDetails];
                                      updated[index] = { ...updated[index], statementFile: file };
                                      return { ...p, existingLoanDetails: updated };
                                    });
                                  }
                                }}
                              />
                            </label>
                            <p className="text-xs text-muted-foreground">Allowed: PDF (Max 10MB)</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </fieldset>

              {/* J. INCOME TAX RETURNS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">J. Income Tax Returns</legend>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Assessment Year 2023-24 (optional)</Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {incomeTax2023_24File ? `${incomeTax2023_24File.name.slice(0, 15)}...` : "Upload ITR 2023-24"}
                      </span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setIncomeTax2023_24File, "pdf", undefined, "incomeTax2023_24")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: PDF (Max 2MB)</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Assessment Year 2024-25 (optional)</Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {incomeTax2024_25File ? `${incomeTax2024_25File.name.slice(0, 15)}...` : "Upload ITR 2024-25"}
                      </span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setIncomeTax2024_25File, "pdf", undefined, "incomeTax2024_25")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: PDF (Max 2MB)</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Assessment Year 2025-26 (optional)</Label>
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                        {incomeTax2025_26File ? `${incomeTax2025_26File.name.slice(0, 15)}...` : "Upload ITR 2025-26"}
                      </span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setIncomeTax2025_26File, "pdf", undefined, "incomeTax2025_26")}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">Allowed: PDF (Max 2MB)</p>
                  </div>
                </div>
              </fieldset>

              {/* K. BUSINESS REGISTRATION CERTIFICATES */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">K. Business Registration Certificates</legend>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Business Registration Certificates (optional)</Label>
                  <div className="space-y-3">
                    {["GST Registration", "MSME Udyam Aadhar", "Shop Act (Ghumsta Licence)", "Trade Licence", "Local Gram Panchayat Business Certificate Licence"].map((cert) => (
                      <div key={cert} className="border border-gray-200 rounded-lg p-3">
                        <label className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            name="businessCertificates"
                            value={cert}
                            checked={uForm.businessCertificates.includes(cert)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUForm((p) => ({ 
                                  ...p, 
                                  businessCertificates: [...p.businessCertificates, cert],
                                  businessCertificateFiles: { ...p.businessCertificateFiles, [cert]: null }
                                }));
                              } else {
                                setUForm((p) => { 
                                  const newFiles = { ...p.businessCertificateFiles };
                                  delete newFiles[cert];
                                  return { 
                                    ...p, 
                                    businessCertificates: p.businessCertificates.filter((c: string) => c !== cert),
                                    businessCertificateFiles: newFiles
                                  };
                                });
                              }
                            }}
                          />
                          <span className="text-sm font-medium">{cert}</span>
                        </label>
                        
                        {uForm.businessCertificates.includes(cert) && (
                          <div className="ml-6 space-y-2">
                            <div className="space-y-1">
                              <Label className="text-xs font-medium">Upload {cert} Document</Label>
                              <label className="flex flex-col items-center justify-center h-16 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                                <Upload className="h-4 w-4" />
                                <span className="text-xs text-muted-foreground mt-1">
                                  {uForm.businessCertificateFiles[cert]?.name 
                                    ? `${uForm.businessCertificateFiles[cert]?.name.slice(0, 15)}...` 
                                    : `Upload ${cert} (Max 10MB)`}
                                </span>
                                <input
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      if (file.type.startsWith("image/") && file.size > 2 * 1024 * 1024) {
                                        window.alert("Image must be <= 2MB");
                                        return;
                                      }
                                      if (file.type === "application/pdf" && file.size > 10 * 1024 * 1024) {
                                        window.alert("PDF must be <= 10MB");
                                        return;
                                      }
                                      setUForm((p) => ({
                                        ...p,
                                        businessCertificateFiles: { ...p.businessCertificateFiles, [cert]: file }
                                      }));
                                    }
                                  }}
                                />
                              </label>
                              <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 2MB) or PDF (Max 10MB)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* L. BUYING GOODS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">L. Buying Goods</legend>
                <div className="space-y-2">
                  <Label htmlFor="u_isBuyingGoods" className="text-sm font-medium">If Buying Goods</Label>
                  <select id="u_isBuyingGoods" name="isBuyingGoods" value={uForm.isBuyingGoods} onChange={handleUnifiedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {uForm.isBuyingGoods === "Yes" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="u_goodsDescription" className="text-sm font-medium">Describe what goods you are buying</Label>
                      <Input 
                        id="u_goodsDescription" 
                        name="goodsDescription" 
                        placeholder="Please describe the goods you intend to purchase" 
                        value={uForm.goodsDescription} 
                        onChange={handleUnifiedChange} 
                        className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Upload Proforma Invoice</Label>
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                        <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                          {proformaInvoiceFile ? `${proformaInvoiceFile.name.slice(0, 15)}...` : "Upload Proforma Invoice"}
                        </span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setProformaInvoiceFile, "pdf", undefined, "proformaInvoice")}
                        />
                      </label>
                      <p className="text-xs text-muted-foreground">Allowed: PDF (Max 10MB)</p>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* M. CIBIL SCORE */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">M. CIBIL Score</legend>
                <div className="space-y-2">
                  <Label htmlFor="u_cibilScoreKnown" className="text-sm font-medium">CIBIL Score Known</Label>
                  <select id="u_cibilScoreKnown" name="cibilScoreKnown" value={uForm.cibilScoreKnown} onChange={handleUnifiedChange} className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm">
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {uForm.cibilScoreKnown === "Yes" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="u_cibilScore" className="text-sm font-medium">CIBIL Score</Label>
                      <Input id="u_cibilScore" name="cibilScore" type="number" placeholder="Enter CIBIL Score" value={uForm.cibilScore} onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        handleUnifiedChange(e);
                      }
                    }} className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Upload CIBIL Report (PDF)</Label>
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group">
                        <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">
                          {cibilReportFile ? `${cibilReportFile.name.slice(0, 15)}...` : "Upload CIBIL Report"}
                        </span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setCibilReportFile, "pdf", undefined, "cibilReport")}
                        />
                      </label>
                      <p className="text-xs text-muted-foreground">Allowed: PDF (Max 2MB)</p>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* N. UPLOAD OTHER SUPPORTED DOCUMENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">N. Upload Other Supported Document</legend>
                <div className="space-y-2">
                  <Label htmlFor="u_otherSupportedDocsCount" className="text-sm font-medium">Number of Other Documents</Label>
                  <select 
                    id="u_otherSupportedDocsCount" 
                    name="otherSupportedDocsCount" 
                    value={uForm.otherSupportedDocsCount} 
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      setUForm((p) => ({
                        ...p,
                        otherSupportedDocsCount: e.target.value,
                        otherSupportedDocuments: Array.from({ length: count }, (_, i) => 
                          p.otherSupportedDocuments[i] || { documentName: '', file: null }
                        )
                      }));
                    }} 
                    className="mt-2 block w-full rounded-md border border-blue-300 bg-transparent px-3 py-2 text-sm"
                  >
                    <option value="">Select Number of Documents</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>

                {uForm.otherSupportedDocsCount && parseInt(uForm.otherSupportedDocsCount) > 0 && (
                  <div className="space-y-4">
                    {Array.from({ length: parseInt(uForm.otherSupportedDocsCount) }).map((_, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <h4 className="text-md font-semibold text-foreground">Document {index + 1}</h4>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`u_docName_${index}`} className="text-sm font-medium">Document Name</Label>
                            <Input
                              id={`u_docName_${index}`}
                              placeholder="Enter document name"
                              value={uForm.otherSupportedDocuments[index]?.documentName || ""}
                              onChange={(e) => {
                                setUForm((p) => {
                                  const updated = [...p.otherSupportedDocuments];
                                  updated[index] = { ...updated[index], documentName: e.target.value };
                                  return { ...p, otherSupportedDocuments: updated };
                                });
                              }}
                              className="border-blue-300 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`u_docFile_${index}`} className="text-sm font-medium">Upload Document</Label>
                            <label className="flex flex-col items-center justify-center h-16 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                              <Upload className="h-4 w-4" />
                              <span className="text-xs text-muted-foreground mt-1">
                                {uForm.otherSupportedDocuments[index]?.file?.name 
                                  ? `${uForm.otherSupportedDocuments[index]?.file?.name.slice(0, 15)}...` 
                                  : "Upload file (Max 10MB)"}
                              </span>
                              <input
                                id={`u_docFile_${index}`}
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.type.startsWith("image/") && file.size > 2 * 1024 * 1024) {
                                      window.alert("Image must be <= 2MB");
                                      return;
                                    }
                                    if (file.type === "application/pdf" && file.size > 10 * 1024 * 1024) {
                                      window.alert("PDF must be <= 10MB");
                                      return;
                                    }
                                    setUForm((p) => {
                                      const updated = [...p.otherSupportedDocuments];
                                      updated[index] = { ...updated[index], file };
                                      return { ...p, otherSupportedDocuments: updated };
                                    });
                                  }
                                }}
                              />
                            </label>
                            <p className="text-xs text-muted-foreground">Allowed: JPG, JPEG, PNG (Max 2MB) or PDF (Max 10MB)</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </fieldset>

              {/* O. CONSENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">O. Consent</legend>
                <div className="flex items-start gap-3">
                  <input id="u_consent" type="checkbox" name="consent" checked={uForm.consent} onChange={handleUnifiedChange} className="mt-1" required />
                  <label htmlFor="u_consent" className="text-sm">I agree to Terms & Conditions and Privacy Policy.</label>
                </div>
                <div className="flex items-start gap-3">
                  <input id="u_authorizationConsent" type="checkbox" name="authorizationConsent" checked={uForm.authorizationConsent} onChange={handleUnifiedChange} className="mt-1" required />
                  <label htmlFor="u_authorizationConsent" className="text-sm">I authorize Infinity Loans & Business Solutions to verify my details and share my application with Banks / NBFCs for loan evaluation.</label>
                </div>
              </fieldset>
            </>
          )}
        </form>

        <div className="sticky bottom-0 border-t bg-card px-6 py-4">
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button form="applyNowModalForm" type="submit" variant="cta" disabled={isSubmitting} className="flex-1 animate-pulse-subtle">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
