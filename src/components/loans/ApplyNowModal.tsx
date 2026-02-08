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
import { DateInput } from "@/components/ui/DateInput";

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanType: string;
  loanTypeKey?: string;
  categoryKey?: string;
}

type FormState = {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber: string;
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
};

export default function ApplyNowModal({ isOpen, onClose, loanType, loanTypeKey, categoryKey }: ApplyNowModalProps) {
  // Employment type selector for determining which form to show
  const [employmentType, setEmploymentType] = useState<"" | "salaried" | "self-employed">("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: handleNonSalariedSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
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
    },
    mode: "onBlur",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
  const [panFront, setPanFront] = useState<File | null>(null);
  const [residentialBill, setResidentialBill] = useState<File | null>(null);
  const [shopBill, setShopBill] = useState<File | null>(null);

  // Salaried-specific files
  const [panPhoto, setPanPhoto] = useState<File | null>(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState<File | null>(null);
  const [aadhaarBackPhoto, setAadhaarBackPhoto] = useState<File | null>(null);
  const [applicantPhoto, setApplicantPhoto] = useState<File | null>(null);
  const [residencePhoto, setResidencePhoto] = useState<File | null>(null);
  const [officeIdPhoto, setOfficeIdPhoto] = useState<File | null>(null);
  const [salarySlips, setSalarySlips] = useState<File | null>(null);
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [loanSanctionLetter, setLoanSanctionLetter] = useState<File | null>(null);
  const [cibilReportFile, setCibilReportFile] = useState<File | null>(null);
  const [lastElectricityBill, setLastElectricityBill] = useState<File | null>(null);
  const [permElectricityBill, setPermElectricityBill] = useState<File | null>(null);
  const [rentAgreement, setRentAgreement] = useState<File | null>(null);
  const [companyAllotmentLetter, setCompanyAllotmentLetter] = useState<File | null>(null);

  // helper for salaried file validation
  const handleSalariedFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    kind: "image1MB" | "pdf2MB"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return setter(null);

    const isImage = file.type.startsWith("image/");
    if (kind === "image1MB") {
      if (!isImage) return window.alert("Please upload an image (JPG/PNG)");
      if (file.size > 1 * 1024 * 1024) return window.alert("Image must be <= 1MB");
    }

    if (kind === "pdf2MB") {
      if (file.type !== "application/pdf") return window.alert("Please upload a PDF file");
      if (file.size > 2 * 1024 * 1024) return window.alert("PDF must be <= 2MB");
    }

    setter(file);
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
      submissionFormData.append("loanType", "personal");

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
      window.alert(`Application submitted successfully!\nApplication Reference: ${response.data?.applicationRef}`);
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
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return setter(null);

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      window.alert("Please upload an image (JPG/PNG)");
      return setter(null);
    }
    if (file.size > 1 * 1024 * 1024) {
      window.alert("Image must be <= 1MB");
      return setter(null);
    }

    setter(file);
  };

  const isSalaried =
    employmentType === "salaried" ||
    (typeof categoryKey !== "undefined" && categoryKey === "salaried-employees") ||
    (loanTypeKey && loanTypeKey.toLowerCase().includes("salaried")) ||
    loanType.toLowerCase().includes("salaried");

  // Salaried form state
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
    stayingSinceYears: "",
    companyName: "",
    organizationType: "",
    industry: "",
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
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantEmploymentType: "",
  });

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
      if (f.size > 1 * 1024 * 1024) {
        window.alert(`${name} must be <= 1MB`);
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
      if (f.size > 2 * 1024 * 1024) {
        window.alert(`${name} must be <= 2MB`);
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
    if (loanSanctionLetter && !validatePdf(loanSanctionLetter, "Loan sanction letter")) return;

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

      const normalizedStayingSinceYears = (() => {
        const raw = String(formDataRest.stayingSinceYears || "").trim();
        if (!raw) return "";

        // If UI provides a date (YYYY-MM-DD), convert to years since that date.
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
          const dt = new Date(raw);
          if (Number.isNaN(dt.getTime())) return "";

          const now = new Date();
          let years = now.getFullYear() - dt.getFullYear();

          const m = now.getMonth() - dt.getMonth();
          if (m < 0 || (m === 0 && now.getDate() < dt.getDate())) years -= 1;

          if (years < 0) years = 0;
          return String(years);
        }

        // Otherwise, pass through numeric input as-is.
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
        if (k === "stayingSinceYears") {
          fd.append(k, normalizedStayingSinceYears);
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
      if (loanSanctionLetter) fd.append("loanSanctionLetter", loanSanctionLetter);
      if (lastElectricityBill) fd.append("lastElectricityBill", lastElectricityBill);
      if (permElectricityBill) fd.append("permElectricityBill", permElectricityBill);
      if (rentAgreement) fd.append("rentAgreement", rentAgreement);
      if (companyAllotmentLetter) fd.append("companyAllotmentLetter", companyAllotmentLetter);
      if (cibilReportFile) fd.append("cibilReport", cibilReportFile);

      const response = await axios.post("/api/apply-now", fd);

      setIsSubmitting(false);
      window.alert(`Application submitted successfully!\nReference: ${response.data?.applicationRef}`);
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
          onSubmit={isSalaried ? handleSalariedSubmit : handleNonSalariedSubmit(onSubmitNonSalaried)}
          className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-8"
        >

          {isSalaried && (
            <>
              {/* A. APPLICANT BASIC DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">A. Applicant Basic Details</legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_firstName" className="text-sm font-medium">First Name <span className="text-destructive">*</span></Label>
                    <Input id="s_firstName" name="firstName" placeholder="First Name (as per PAN)*" value={sForm.firstName} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_middleName" className="text-sm font-medium">Middle Name</Label>
                    <Input id="s_middleName" name="middleName" placeholder="Middle Name" value={sForm.middleName} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_lastName" className="text-sm font-medium">Last Name <span className="text-destructive">*</span></Label>
                    <Input id="s_lastName" name="lastName" placeholder="Last Name (as per PAN)*" value={sForm.lastName} onChange={handleSalariedChange} className="border-gray-300" />
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
                    <select id="s_gender" name="gender" value={sForm.gender} onChange={handleSalariedChange} required className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_maritalStatus" className="text-sm font-medium">Marital Status <span className="text-destructive">*</span></Label>
                    <select id="s_maritalStatus" name="maritalStatus" value={sForm.maritalStatus} onChange={handleSalariedChange} required className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Marital Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_mobileNumber" className="text-sm font-medium">Adhaar Linked Primary Mobile Number <span className="text-destructive">*</span></Label>
                    <Input id="s_mobileNumber" name="mobileNumber" placeholder="Mobile Number*" value={sForm.mobileNumber} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_whatsappNumber" className="text-sm font-medium">WhatsApp Number</Label>
                    <Input id="s_whatsappNumber" name="whatsappNumber" placeholder="WhatsApp Number" value={sForm.whatsappNumber} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_alternateMobile" className="text-sm font-medium">Alternate Mobile Number (optional)</Label>
                    <Input id="s_alternateMobile" name="alternateMobile" placeholder="Alternate Mobile Number" value={sForm.alternateMobile} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="s_personalEmail" className="text-sm font-medium">Personal Email ID <span className="text-destructive">*</span></Label>
                    <Input id="s_personalEmail" name="personalEmail" type="email" placeholder="Personal Email ID*" value={sForm.personalEmail} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_voterId" className="text-sm font-medium">Voter ID (optional)</Label>
                    <Input id="s_voterId" name="voterIdNumber" placeholder="Voter ID (optional)" value={sForm.voterIdNumber} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_drivingLicense" className="text-sm font-medium">Driving License (optional)</Label>
                    <Input id="s_drivingLicense" name="drivingLicense" placeholder="Driving License (optional)" value={sForm.drivingLicense} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_passportNumber" className="text-sm font-medium">Passport No. (optional)</Label>
                    <Input id="s_passportNumber" name="passportNumber" placeholder="Passport No. (optional)" value={sForm.passportNumber} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
              </fieldset>

              {/* B. KYC DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">B. KYC Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_panNumber" className="text-sm font-medium">PAN Card Number <span className="text-destructive">*</span></Label>
                    <Input id="s_panNumber" name="panNumber" placeholder="PAN Card Number*" value={sForm.panNumber} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_aadhaarNumber" className="text-sm font-medium">Aadhaar Card Number <span className="text-destructive">*</span></Label>
                    <Input id="s_aadhaarNumber" name="aadhaarNumber" placeholder="Aadhaar Card Number*" value={sForm.aadhaarNumber} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PAN Card Photo (Front)* (Max 1MB)</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{panPhoto ? `${panPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPanPhoto, "image1MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Photo (Front)* (Max 1MB)</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{aadhaarPhoto ? `${aadhaarPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setAadhaarPhoto, "image1MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Photo (Back)* (Max 1MB)</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{aadhaarBackPhoto ? `${aadhaarBackPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setAadhaarBackPhoto, "image1MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Applicant Photo* (Max 1MB)</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{applicantPhoto ? `${applicantPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setApplicantPhoto, "image1MB")} />
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* C. RESIDENTIAL DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">C. Residential Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="s_currentResidentialAddress" className="text-sm font-medium">Current Address <span className="text-destructive">*</span></Label>
                  <Input id="s_currentResidentialAddress" name="currentResidentialAddress" placeholder="Current Address*" value={sForm.currentResidentialAddress} onChange={handleSalariedChange} className="border-gray-300" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_state" className="text-sm font-medium">State <span className="text-destructive">*</span></Label>
                    <select id="s_state" name="state" value={sForm.state} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
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
                    <Label htmlFor="s_city" className="text-sm font-medium">City</Label>
                    <Input id="s_city" name="city" placeholder="City" value={sForm.city} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_currentResidentialPincode" className="text-sm font-medium">PIN</Label>
                    <Input id="s_currentResidentialPincode" name="currentResidentialPincode" placeholder="PIN" value={sForm.currentResidentialPincode} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_residenceType" className="text-sm font-medium">Residence Type</Label>
                    <select id="s_residenceType" name="residenceType" value={sForm.residenceType} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Select Residence Type</option>
                      <option value="Owned">Owned</option>
                      <option value="Rented">Rented</option>
                      <option value="Company Provided">Company Provided</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_stayingSinceYears" className="text-sm font-medium">Staying Since (Years)</Label>
                    <Input id="s_stayingSinceYears" name="stayingSinceYears" type="date" placeholder="Staying Since (Years)" value={sForm.stayingSinceYears} onChange={handleSalariedChange} className="border-gray-300 date-gray-icon" />
                  </div>
                </div>
                {/* Conditional optional residential uploads based on Residence Type */}
                {sForm.residenceType === "Owned" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_lastElectricityBill" className="text-sm font-medium">Upload latest electricity bill (optional) <span className="text-xs text-muted-foreground">(Max 1MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{lastElectricityBill ? `${lastElectricityBill.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setLastElectricityBill, "image1MB")} />
                      </label>
                    </div>
                  </div>
                )}

                {sForm.residenceType === "Rented" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_permanentAddress" className="text-sm font-medium">Permanent Address (optional)</Label>
                      <Input id="s_permanentAddress" name="permanentAddress" placeholder="Permanent Address" value={sForm.permanentAddress} onChange={handleSalariedChange} className="border-gray-300" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Permanent Address Electricity Bill (optional) <span className="text-xs text-muted-foreground">(Max 1MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{permElectricityBill ? `${permElectricityBill.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPermElectricityBill, "image1MB")} />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rent Agreement (optional) <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{rentAgreement ? `${rentAgreement.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setRentAgreement, "pdf2MB")} />
                      </label>
                    </div>
                  </div>
                )}

                {sForm.residenceType === "Company Provided" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_permanentAddress" className="text-sm font-medium">Permanent Address (optional)</Label>
                      <Input id="s_permanentAddress" name="permanentAddress" placeholder="Permanent Address" value={sForm.permanentAddress} onChange={handleSalariedChange} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Permanent Address Electricity Bill (optional) <span className="text-xs text-muted-foreground">(Max 1MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{permElectricityBill ? `${permElectricityBill.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPermElectricityBill, "image1MB")} />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Company Allotment Letter (optional) <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">{companyAllotmentLetter ? `${companyAllotmentLetter.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setCompanyAllotmentLetter, "pdf2MB")} />
                      </label>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* D. EMPLOYMENT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">D. Employment Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_companyName" className="text-sm font-medium">Company Name</Label>
                    <Input id="s_companyName" name="companyName" placeholder="Company Name" value={sForm.companyName} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_organizationType" className="text-sm font-medium">Organization Type</Label>
                    <select id="s_organizationType" name="organizationType" value={sForm.organizationType} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Organization Type</option>
                      <option value="Private">Private Limited</option>
                      <option value="MNC">MNC</option>
                      <option value="Govt">Government</option>
                      <option value="PSU">PSU</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_industry" className="text-sm font-medium">Industry / Sector</Label>
                    <select id="s_industry" name="industry" value={sForm.industry} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Industry / Sector</option>
                      {sector.map((sector)=>(
                          <option key={sector.id} value={sector.name}>{sector.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_designation" className="text-sm font-medium">Designation</Label>
                    <Input id="s_designation" name="designation" placeholder="Designation" value={sForm.designation} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_employmentType" className="text-sm font-medium">Employment Type</Label>
                    <select id="s_employmentType" name="employmentType" value={sForm.employmentType} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
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
                    <Label htmlFor="s_totalExperienceYears" className="text-sm font-medium">Total Experience (Years)</Label>
                    <Input id="s_totalExperienceYears" name="totalExperienceYears" type="number" placeholder="Total Experience (Years)" value={sForm.totalExperienceYears} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_officeLocation" className="text-sm font-medium">Office Location / City</Label>
                    <Input id="s_officeLocation" name="officeLocation" placeholder="Office Location / City" value={sForm.officeLocation} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_officePincode" className="text-sm font-medium">Office PIN</Label>
                    <Input id="s_officePincode" name="officePincode" placeholder="Office PIN" value={sForm.officePincode} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_officialEmail" className="text-sm font-medium">Official Email ID</Label>
                    <Input id="s_officialEmail" name="officialEmail" type="email" placeholder="Official Email ID" value={sForm.officialEmail} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Office ID Card Photo <span className="text-xs text-muted-foreground">(Max 1MB)</span></Label>
                  <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs text-muted-foreground mt-1">{officeIdPhoto ? `${officeIdPhoto.name.slice(0, 18)}...` : "Upload JPG/PNG, Max 1MB"}</span>
                    <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setOfficeIdPhoto, "image1MB")} />
                  </label>
                </div>
              </fieldset>

              {/* E. INCOME DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">E. Income Details</legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="s_monthlyNetSalary" className="text-sm font-medium">Monthly Net Salary (₹)</Label>
                    <Input id="s_monthlyNetSalary" name="monthlyNetSalary" type="number" placeholder="Monthly Net Salary (₹)" value={sForm.monthlyNetSalary} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_salaryCreditMode" className="text-sm font-medium">Salary Credit Mode</Label>
                    <select id="s_salaryCreditMode" name="salaryCreditMode" value={sForm.salaryCreditMode} onChange={handleSalariedChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                      <option value="">Salary Credit Mode</option>
                      <option value="BankTransfer">Bank Transfer</option>
                      <option value="NEFT_IMPS">NEFT / IMPS</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_salaryAccountBankName" className="text-sm font-medium">Salary Account Bank</Label>
                    <Input id="s_salaryAccountBankName" name="salaryAccountBankName" placeholder="Salary Account Bank" value={sForm.salaryAccountBankName} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 3 Months Salary Slips* <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{salarySlips ? `${salarySlips.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setSalarySlips, "pdf2MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 6 Months Bank Statement* <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">{bankStatement ? `${bankStatement.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setBankStatement, "pdf2MB")} />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Upload Loan Sanction Letter <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                  <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs text-muted-foreground mt-1">{loanSanctionLetter ? `${loanSanctionLetter.name.slice(0, 18)}...` : "Upload PDF, Max 2MB"}</span>
                    <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setLoanSanctionLetter, "pdf2MB")} />
                  </label>
                </div>
              </fieldset>

              {/* F. EXISTING LOAN & CREDIT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">F. Existing Loan & Credit Details</legend>
                <div className="space-y-2">
                  <Label htmlFor="s_numberOfExistingLoans" className="text-sm font-medium">Number of Existing Loans</Label>
                  <select id="s_numberOfExistingLoans" value={sForm.numberOfExistingLoans} onChange={handleNumberOfLoansChange} className="mt-2 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm">
                    <option value="">Select Number of Loans</option>
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
                      <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-4">
                        <h4 className="text-md font-semibold text-foreground">Loan {index + 1}</h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`s_loanAmount_${index}`} className="text-sm font-medium">Total Loan Amount (₹)</Label>
                            <Input
                              id={`s_loanAmount_${index}`}
                              type="number"
                              placeholder="Total Loan Amount"
                              value={sForm.existingLoansData[index]?.totalLoanAmount || ""}
                              onChange={(e) => handleExistingLoanChange(index, "totalLoanAmount", e.target.value)}
                              className="border-gray-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`s_loanEmi_${index}`} className="text-sm font-medium">Total Monthly EMI (₹)</Label>
                            <Input
                              id={`s_loanEmi_${index}`}
                              type="number"
                              placeholder="Total Monthly EMI"
                              value={sForm.existingLoansData[index]?.totalMonthlyEmi || ""}
                              onChange={(e) => handleExistingLoanChange(index, "totalMonthlyEmi", e.target.value)}
                              className="border-gray-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`s_loanType_${index}`} className="text-sm font-medium">Loan Type</Label>
                            <Input
                              id={`s_loanType_${index}`}
                              placeholder="e.g., Home Loan, Car Loan"
                              value={sForm.existingLoansData[index]?.loanType || ""}
                              onChange={(e) => handleExistingLoanChange(index, "loanType", e.target.value)}
                              className="border-gray-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`s_bankName_${index}`} className="text-sm font-medium">Bank Name</Label>
                            <Input
                              id={`s_bankName_${index}`}
                              placeholder="Bank Name"
                              value={sForm.existingLoansData[index]?.bankName || ""}
                              onChange={(e) => handleExistingLoanChange(index, "bankName", e.target.value)}
                              className="border-gray-300"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`s_emiDelay_${index}`} className="text-sm font-medium">Any EMI Delay in Past 3 Months?</Label>
                            <Input
                              id={`s_emiDelay_${index}`}
                              placeholder="No / Yes (specify details)"
                              value={sForm.existingLoansData[index]?.emiDelayPast3Months || ""}
                              onChange={(e) => handleExistingLoanChange(index, "emiDelayPast3Months", e.target.value)}
                              className="border-gray-300"
                            />
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
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="s_cibilScore" className="text-sm font-medium">CIBIL Score</Label>
                        <Input id="s_cibilScore" name="cibilScore" type="number" placeholder="CIBIL Score" value={sForm.cibilScore} onChange={handleSalariedChange} className="border-gray-300" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">CIBIL Report (PDF)</Label>
                        <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                          <Upload className="h-5 w-5" />
                          <span className="text-xs mt-1">{cibilReportFile ? `${cibilReportFile.name.slice(0, 18)}...` : "Upload"}</span>
                          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setCibilReportFile, "pdf2MB")} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </fieldset>

              {/* H. LOAN REQUIREMENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">H. Loan Requirement Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_requiredLoanAmount" className="text-sm font-medium">Required Loan Amount (₹)</Label>
                    <Input id="s_requiredLoanAmount" name="requiredLoanAmount" type="number" placeholder="Required Loan Amount (₹)" value={sForm.requiredLoanAmount} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_preferredTenure" className="text-sm font-medium">Preferred Loan Tenure</Label>
                    <Input id="s_preferredTenure" name="preferredTenure" placeholder="Preferred Loan Tenure" value={sForm.preferredTenure} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_purpose" className="text-sm font-medium">Purpose of Loan</Label>
                    <Input id="s_purpose" name="purpose" placeholder="Purpose of Loan" value={sForm.purpose} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
              </fieldset>

              {/* I. CO-APPLICANT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">I. Co-Applicant Details (If Any)</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="s_coApplicantName" className="text-sm font-medium">Co-Applicant Name</Label>
                    <Input id="s_coApplicantName" name="coApplicantName" placeholder="Co-Applicant Name" value={sForm.coApplicantName} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_coApplicantRelation" className="text-sm font-medium">Relationship with Applicant</Label>
                    <Input id="s_coApplicantRelation" name="coApplicantRelation" placeholder="Relationship with Applicant" value={sForm.coApplicantRelation} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s_coApplicantEmploymentType" className="text-sm font-medium">Co-Applicant Employment Type</Label>
                    <Input id="s_coApplicantEmploymentType" name="coApplicantEmploymentType" placeholder="Co-Applicant Employment Type" value={sForm.coApplicantEmploymentType} onChange={handleSalariedChange} className="border-gray-300" />
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

          {!isSalaried && <>
            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
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
                    Mobile Number <span className="text-destructive">*</span>
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

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                Loan & Tenure Details
              </legend>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="requiredLoanAmount" className="text-sm font-medium">
                    Required Loan Amount <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="requiredLoanAmount"
                    type="number"
                    min={0}
                    {...register("requiredLoanAmount", {
                      required: "This field is required",
                      validate: (v) => validateField("requiredLoanAmount", String(v || "")) || true,
                    })}
                    onFocus={() => setFocusedField("requiredLoanAmount")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${focusedField === "requiredLoanAmount" ? "ring-2 ring-primary shadow-glow-primary" : ""
                      } ${errors.requiredLoanAmount ? "border-destructive animate-shake" : ""}`}
                    placeholder="e.g., 500000"
                  />
                  {errors.requiredLoanAmount && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.requiredLoanAmount.message || "")}</p>
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

                <div className="space-y-2">
                  <Label htmlFor="businessPremisesStatus" className="text-sm font-medium">
                    Business Premises Status <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="businessPremisesStatus"
                    {...register("businessPremisesStatus", { required: "This field is required" })}
                    className={`mt-2 block w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 ${errors.businessPremisesStatus ? "border-destructive" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="Owned">Owned</option>
                    <option value="Rented">Rented</option>
                  </select>
                  {errors.businessPremisesStatus && (
                    <p className="text-xs text-destructive animate-fade-in">{String(errors.businessPremisesStatus.message || "")}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <Mail className="h-5 w-5 text-primary" />
                Email Information
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="grid gap-4 sm:grid-cols-2">
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

                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                Identity Details
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
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
                    Voter ID Number
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
                    Driving License Number
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
                    Passport Number
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

              <div className="grid gap-4 sm:grid-cols-3">
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
                      onChange={(e) => handleFileChange(e, setAadhaarFront)}
                    />
                  </label>
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
                      onChange={(e) => handleFileChange(e, setAadhaarBack)}
                    />
                  </label>
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
                      onChange={(e) => handleFileChange(e, setPanFront)}
                    />
                  </label>
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
                      onChange={(e) => handleFileChange(e, setResidentialBill)}
                    />
                  </label>
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
                      onChange={(e) => handleFileChange(e, setShopBill)}
                    />
                  </label>
                </div>
              </div>
            </fieldset>
          </>}
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
