"use client";

import type React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Upload, User, Mail, MapPin, CreditCard, FileCheck, Loader2 } from "lucide-react";

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

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ApplyNowModal({ isOpen, onClose, loanType, loanTypeKey, categoryKey }: ApplyNowModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormState>({
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
  });
  const [errors, setErrors] = useState<FormErrors>({});
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormState)[] = [
      "firstName",
      "lastName",
      "mobileNumber",
      "personalEmail",
      "currentResidentialAddress",
      "currentResidentialPincode",
      "currentOfficeAddress",
      "currentOfficePincode",
      "requiredLoanAmount",
      "residentialStatus",
      "businessPremisesStatus",
      "yearsAtCurrentResidentialAddress",
      "yearsAtCurrentBusinessAddress",
      "aadhaarNumber",
      "panNumber",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error || !formData[field]) {
        newErrors[field] = error || "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.alert("Please fill in all required fields correctly");
      return;
    }

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
      submissionFormData.append("firstName", formData.firstName);
      submissionFormData.append("middleName", formData.middleName || "");
      submissionFormData.append("lastName", formData.lastName);
      submissionFormData.append("mobileNumber", formData.mobileNumber);
      submissionFormData.append("alternateMobile", formData.alternateMobile || "");
      submissionFormData.append("businessEmail", formData.businessEmail || "");
      submissionFormData.append("personalEmail", formData.personalEmail);
      submissionFormData.append("currentResidentialAddress", formData.currentResidentialAddress);
      submissionFormData.append("currentResidentialPincode", formData.currentResidentialPincode);
      submissionFormData.append("currentOfficeAddress", formData.currentOfficeAddress);
      submissionFormData.append("currentOfficePincode", formData.currentOfficePincode);
      submissionFormData.append("requiredLoanAmount", formData.requiredLoanAmount as string);
      submissionFormData.append("residentialStatus", formData.residentialStatus as string);
      submissionFormData.append("businessPremisesStatus", formData.businessPremisesStatus as string);
      submissionFormData.append("yearsAtCurrentResidentialAddress", formData.yearsAtCurrentResidentialAddress as string);
      submissionFormData.append("yearsAtCurrentBusinessAddress", formData.yearsAtCurrentBusinessAddress as string);
      submissionFormData.append("aadhaarNumber", formData.aadhaarNumber);
      submissionFormData.append("panNumber", formData.panNumber);
      submissionFormData.append("voterIdNumber", formData.voterIdNumber || "");
      submissionFormData.append("drivingLicense", formData.drivingLicense || "");
      submissionFormData.append("passportNumber", formData.passportNumber || "");
      submissionFormData.append("loanType", loanTypeKey || loanType);

      // Add files
      if (aadhaarFront) submissionFormData.append("aadhaarFront", aadhaarFront);
      if (aadhaarBack) submissionFormData.append("aadhaarBack", aadhaarBack);
      if (panFront) submissionFormData.append("panCardFront", panFront);
      if (residentialBill) submissionFormData.append("residentialBill", residentialBill);
      if (shopBill) submissionFormData.append("shopBill", shopBill);

      const response = await fetch("/api/apply-now", {
        method: "POST",
        body: submissionFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Application submission failed");
      }

      setIsSubmitting(false);
      window.alert(`Application submitted successfully!\nApplication Reference: ${result.applicationRef}`);
      onClose();
    } catch (error) {
      setIsSubmitting(false);
      window.alert(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  const isSalaried =
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
    const required = [
      "firstName",
      "lastName",
      "dob",
      "gender",
      "maritalStatus",
      "mobileNumber",
      "personalEmail",
      "panNumber",
      "aadhaarNumber",
      "currentResidentialAddress",
      "state",
      "city",
      "companyName",
      "designation",
      "employmentType",
      "dateOfJoining",
      "monthlyNetSalary",
      "salaryCreditMode",
      "salaryAccountBankName",
      "requiredLoanAmount",
    ];

    for (const f of required) {
      if (!sForm[f as keyof typeof sForm]) {
        window.alert("Please fill all required salaried fields");
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

    setIsSubmitting(true);

    try {
      const fd = new globalThis.FormData();
      fd.append("loanType", loanTypeKey || loanType);
      
      const { existingLoansData, ...formDataRest } = sForm;
      Object.entries(formDataRest).forEach(([k, v]) => {
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

      const response = await fetch("/api/apply-now", { method: "POST", body: fd });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");

      setIsSubmitting(false);
      window.alert(`Application submitted successfully!\nReference: ${result.applicationRef}`);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      window.alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

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

        <form onSubmit={isSalaried ? handleSalariedSubmit : handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-8">

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
                              <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
                              <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPanPhoto, "image1MB")} />
                            </label>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Aadhaar Photo (Front)* (Max 1MB)</Label>
                            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                              <Upload className="h-5 w-5" />
                              <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
                              <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setAadhaarPhoto, "image1MB")} />
                            </label>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Aadhaar Photo (Back)* (Max 1MB)</Label>
                            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                              <Upload className="h-5 w-5" />
                              <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
                              <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setAadhaarBackPhoto, "image1MB")} />
                            </label>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Applicant Photo* (Max 1MB)</Label>
                            <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                              <Upload className="h-5 w-5" />
                              <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
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
                    <Label htmlFor="s_state" className="text-sm font-medium">State</Label>
                    <Input id="s_state" name="state" placeholder="State" value={sForm.state} onChange={handleSalariedChange} className="border-gray-300" />
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
                    <Input id="s_stayingSinceYears" name="stayingSinceYears" type="number" placeholder="Staying Since (Years)" value={sForm.stayingSinceYears} onChange={handleSalariedChange} className="border-gray-300" />
                  </div>
                </div>
                {/* Conditional optional residential uploads based on Residence Type */}
                {sForm.residenceType === "Owned" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="s_lastElectricityBill" className="text-sm font-medium">Upload latest electricity bill (optional) <span className="text-xs text-muted-foreground">(Max 1MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
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
                        <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPermElectricityBill, "image1MB")} />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rent Agreement (optional) <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">Upload PDF, Max 2MB</span>
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
                        <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
                        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleSalariedFileChange(e, setPermElectricityBill, "image1MB")} />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Company Allotment Letter (optional) <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-xs text-muted-foreground mt-1">Upload PDF, Max 2MB</span>
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
                    <option value="IT">IT / Software</option>
                    <option value="BFSI">BFSI</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
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
                    <span className="text-xs text-muted-foreground mt-1">Upload JPG/PNG, Max 1MB</span>
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
                      <span className="text-xs text-muted-foreground mt-1">Upload PDF, Max 2MB</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setSalarySlips, "pdf2MB")} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 6 Months Bank Statement* <span className="text-xs text-muted-foreground">(PDF, Max 2MB)</span></Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground mt-1">Upload PDF, Max 2MB</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSalariedFileChange(e, setBankStatement, "pdf2MB")} />
                    </label>
                  </div>
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
                            <span className="text-xs mt-1">{cibilReportFile ? "✓" : "Upload"}</span>
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "firstName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.firstName ? "border-destructive animate-shake" : ""}`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-xs text-destructive animate-fade-in">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName" className="text-sm font-medium">
                  Middle Name
                </Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName as string}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("middleName")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "middleName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.middleName ? "border-destructive animate-shake" : ""}`}
                  placeholder="Optional"
                />
                {errors.middleName && <p className="text-xs text-destructive animate-fade-in">{errors.middleName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "lastName" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.lastName ? "border-destructive animate-shake" : ""}`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-xs text-destructive animate-fade-in">{errors.lastName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-sm font-medium">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("mobileNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "mobileNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.mobileNumber ? "border-destructive animate-shake" : ""}`}
                  placeholder="9876543210"
                />
                {errors.mobileNumber && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternateMobile" className="text-sm font-medium">
                  Alternate Mobile
                </Label>
                <Input
                  id="alternateMobile"
                  name="alternateMobile"
                  type="tel"
                  maxLength={10}
                  value={formData.alternateMobile}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("alternateMobile")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "alternateMobile" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.alternateMobile ? "border-destructive animate-shake" : ""}`}
                  placeholder="Optional"
                />
                {errors.alternateMobile && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.alternateMobile}</p>
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
                  name="requiredLoanAmount"
                  type="number"
                  min={0}
                  value={formData.requiredLoanAmount as string}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("requiredLoanAmount")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "requiredLoanAmount" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.requiredLoanAmount ? "border-destructive animate-shake" : ""}`}
                  placeholder="e.g., 500000"
                />
                {errors.requiredLoanAmount && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.requiredLoanAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="residentialStatus" className="text-sm font-medium">
                  Residential Status <span className="text-destructive">*</span>
                </Label>
                <select
                  id="residentialStatus"
                  name="residentialStatus"
                  value={formData.residentialStatus as string}
                  onChange={handleChange}
                  className={`mt-2 block w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 ${
                    errors.residentialStatus ? "border-destructive" : ""
                  }`}
                >
                  <option value="">Select</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
                {errors.residentialStatus && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.residentialStatus}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPremisesStatus" className="text-sm font-medium">
                  Business Premises Status <span className="text-destructive">*</span>
                </Label>
                <select
                  id="businessPremisesStatus"
                  name="businessPremisesStatus"
                  value={formData.businessPremisesStatus as string}
                  onChange={handleChange}
                  className={`mt-2 block w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 ${
                    errors.businessPremisesStatus ? "border-destructive" : ""
                  }`}
                >
                  <option value="">Select</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
                {errors.businessPremisesStatus && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.businessPremisesStatus}</p>
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
                  name="yearsAtCurrentResidentialAddress"
                  type="number"
                  min={0}
                  max={99}
                  value={formData.yearsAtCurrentResidentialAddress as string}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("yearsAtCurrentResidentialAddress")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "yearsAtCurrentResidentialAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.yearsAtCurrentResidentialAddress ? "border-destructive animate-shake" : ""}`}
                  placeholder="e.g., 3"
                />
                {errors.yearsAtCurrentResidentialAddress && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.yearsAtCurrentResidentialAddress}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsAtCurrentBusinessAddress" className="text-sm font-medium">
                  Years at Current Business Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="yearsAtCurrentBusinessAddress"
                  name="yearsAtCurrentBusinessAddress"
                  type="number"
                  min={0}
                  max={99}
                  value={formData.yearsAtCurrentBusinessAddress as string}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("yearsAtCurrentBusinessAddress")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "yearsAtCurrentBusinessAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.yearsAtCurrentBusinessAddress ? "border-destructive animate-shake" : ""}`}
                  placeholder="e.g., 5"
                />
                {errors.yearsAtCurrentBusinessAddress && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.yearsAtCurrentBusinessAddress}</p>
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
                  name="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("businessEmail")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "businessEmail" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.businessEmail ? "border-destructive animate-shake" : ""}`}
                  placeholder="john@company.com"
                />
                {errors.businessEmail && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.businessEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalEmail" className="text-sm font-medium">
                  Personal Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="personalEmail"
                  name="personalEmail"
                  type="email"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("personalEmail")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "personalEmail" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.personalEmail ? "border-destructive animate-shake" : ""}`}
                  placeholder="john.doe@gmail.com"
                />
                {errors.personalEmail && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.personalEmail}</p>
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
                    name="currentResidentialAddress"
                    value={formData.currentResidentialAddress}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("currentResidentialAddress")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${
                      focusedField === "currentResidentialAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                    } ${errors.currentResidentialAddress ? "border-destructive animate-shake" : ""}`}
                    placeholder="House No, Street, Area, City, State"
                  />
                  {errors.currentResidentialAddress && (
                    <p className="text-xs text-destructive animate-fade-in">{errors.currentResidentialAddress}</p>
                  )}
                </div>

                <div className="w-full sm:w-1/3">
                  <Label htmlFor="currentResidentialPincode" className="text-sm font-medium">
                    Current Residential Address PIN Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="currentResidentialPincode"
                    name="currentResidentialPincode"
                    maxLength={6}
                    value={formData.currentResidentialPincode}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("currentResidentialPincode")}
                    onBlur={() => setFocusedField(null)}
                    className={`mt-2 transition-all duration-300 ${
                      focusedField === "currentResidentialPincode" ? "ring-2 ring-primary shadow-glow-primary" : ""
                    } ${errors.currentResidentialPincode ? "border-destructive animate-shake" : ""}`}
                    placeholder="400001"
                  />
                  {errors.currentResidentialPincode && (
                    <p className="text-xs text-destructive animate-fade-in">{errors.currentResidentialPincode}</p>
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
                    name="currentOfficeAddress"
                    value={formData.currentOfficeAddress}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("currentOfficeAddress")}
                    onBlur={() => setFocusedField(null)}
                    className={`transition-all duration-300 ${
                      focusedField === "currentOfficeAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                    } ${errors.currentOfficeAddress ? "border-destructive animate-shake" : ""}`}
                    placeholder="Office/Shop, Street, Area, City, State"
                  />
                  {errors.currentOfficeAddress && (
                    <p className="text-xs text-destructive animate-fade-in">{errors.currentOfficeAddress}</p>
                  )}
                </div>

                <div className="w-full sm:w-1/3">
                  <Label htmlFor="currentOfficePincode" className="text-sm font-medium">
                    Current Office / Shop Address PIN Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="currentOfficePincode"
                    name="currentOfficePincode"
                    maxLength={6}
                    value={formData.currentOfficePincode}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("currentOfficePincode")}
                    onBlur={() => setFocusedField(null)}
                    className={`mt-2 transition-all duration-300 ${
                      focusedField === "currentOfficePincode" ? "ring-2 ring-primary shadow-glow-primary" : ""
                    } ${errors.currentOfficePincode ? "border-destructive animate-shake" : ""}`}
                    placeholder="400001"
                  />
                  {errors.currentOfficePincode && (
                    <p className="text-xs text-destructive animate-fade-in">{errors.currentOfficePincode}</p>
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
                  name="aadhaarNumber"
                  maxLength={12}
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("aadhaarNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "aadhaarNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.aadhaarNumber ? "border-destructive animate-shake" : ""}`}
                  placeholder="1234 5678 9012"
                />
                {errors.aadhaarNumber && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.aadhaarNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber" className="text-sm font-medium">
                  PAN Card Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="panNumber"
                  name="panNumber"
                  maxLength={10}
                  value={formData.panNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("panNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`uppercase transition-all duration-300 ${
                    focusedField === "panNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.panNumber ? "border-destructive animate-shake" : ""}`}
                  placeholder="ABCDE1234F"
                />
                {errors.panNumber && <p className="text-xs text-destructive animate-fade-in">{errors.panNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="voterIdNumber" className="text-sm font-medium">
                  Voter ID Number
                </Label>
                <Input
                  id="voterIdNumber"
                  name="voterIdNumber"
                  value={formData.voterIdNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("voterIdNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "voterIdNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
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
                  name="drivingLicense"
                  value={formData.drivingLicense}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("drivingLicense")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "drivingLicense" ? "ring-2 ring-primary shadow-glow-primary" : ""
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
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("passportNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "passportNumber" ? "ring-2 ring-primary shadow-glow-primary" : ""
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
            <Button type="submit" variant="cta" disabled={isSubmitting} className="flex-1 animate-pulse-subtle">
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
