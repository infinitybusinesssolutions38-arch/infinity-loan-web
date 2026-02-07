"use client";

import type React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Upload, User, Mail, MapPin, CreditCard, FileCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [applicantPhoto, setApplicantPhoto] = useState<File | null>(null);
  const [residencePhoto, setResidencePhoto] = useState<File | null>(null);
  const [officeIdPhoto, setOfficeIdPhoto] = useState<File | null>(null);
  const [salarySlips, setSalarySlips] = useState<File | null>(null);
  const [bankStatement, setBankStatement] = useState<File | null>(null);

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
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobileNumber: "",
    whatsappNumber: "",
    personalEmail: "",
    panNumber: "",
    aadhaarNumber: "",
    currentResidentialAddress: "",
    currentResidentialPincode: "",
    city: "",
    state: "",
    residenceType: "",
    stayingSinceYears: "",
    companyName: "",
    companyNature: "",
    industry: "",
    designation: "",
    employmentType: "",
    dateOfJoining: "",
    totalExperienceYears: "",
    officeLocation: "",
    officialEmail: "",
    monthlyNetSalary: "",
    salaryCreditMode: "",
    salaryAccountBankName: "",
    existingLoans: "",
    existingLoanType: "",
    totalMonthlyEmi: "",
    anyDelays: "",
    cibilScore: "",
    loanTypeRequired: "",
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

  const handleSalariedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic required fields validation
    const required = [
      "fullName",
      "dob",
      "mobileNumber",
      "personalEmail",
      "panNumber",
      "aadhaarNumber",
      "currentResidentialAddress",
      "city",
      "state",
      "companyName",
      "designation",
      "employmentType",
      "dateOfJoining",
      "monthlyNetSalary",
      "salaryCreditMode",
      "salaryAccountBankName",
      "loanTypeRequired",
      "requiredLoanAmount",
    ];

    for (const f of required) {
      if (!sForm[f as keyof typeof sForm]) {
        window.alert("Please fill all required salaried fields");
        return;
      }
    }

    // Ensure essential documents
    if (!panPhoto || !aadhaarPhoto || !applicantPhoto) {
      window.alert("Please upload PAN photo, Aadhaar photo and Applicant photo");
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new globalThis.FormData();
      fd.append("loanType", loanTypeKey || loanType);
      Object.entries(sForm).forEach(([k, v]) => fd.append(k, v || ""));

      fd.append("panPhoto", panPhoto);
      fd.append("aadhaarPhoto", aadhaarPhoto);
      fd.append("applicantPhoto", applicantPhoto);
      if (residencePhoto) fd.append("residencePhoto", residencePhoto);
      if (officeIdPhoto) fd.append("officeIdPhoto", officeIdPhoto);
      if (salarySlips) fd.append("salarySlips", salarySlips);
      if (bankStatement) fd.append("bankStatement", bankStatement);

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
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="fullName" placeholder="Full Name (as per PAN)*" value={sForm.fullName} onChange={handleSalariedChange} />
                  <Input name="dob" placeholder="Date of Birth (DD/MM/YYYY)*" value={sForm.dob} onChange={handleSalariedChange} />
                  <Input name="gender" placeholder="Gender" value={sForm.gender} onChange={handleSalariedChange} />
                  <Input name="maritalStatus" placeholder="Marital Status" value={sForm.maritalStatus} onChange={handleSalariedChange} />
                  <Input name="mobileNumber" placeholder="Mobile Number*" value={sForm.mobileNumber} onChange={handleSalariedChange} />
                  <Input name="whatsappNumber" placeholder="WhatsApp Number" value={sForm.whatsappNumber} onChange={handleSalariedChange} />
                  <Input name="personalEmail" type="email" placeholder="Personal Email ID*" value={sForm.personalEmail} onChange={handleSalariedChange} />
                </div>
              </fieldset>

              {/* B. KYC DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">B. KYC Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="panNumber" placeholder="PAN Card Number*" value={sForm.panNumber} onChange={handleSalariedChange} />
                  <Input name="aadhaarNumber" placeholder="Aadhaar Card Number*" value={sForm.aadhaarNumber} onChange={handleSalariedChange} />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PAN Card Photo*</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs mt-1">{panPhoto ? "✓" : "Upload"}</span>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, setPanPhoto)} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Aadhaar Photo*</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs mt-1">{aadhaarPhoto ? "✓" : "Upload"}</span>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, setAadhaarPhoto)} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Applicant Photo*</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs mt-1">{applicantPhoto ? "✓" : "Upload"}</span>
                      <input type="file" accept="image/*,.jpg,.png" className="hidden" onChange={(e) => handleFileChange(e, setApplicantPhoto)} />
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* C. RESIDENTIAL DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">C. Residential Details</legend>
                <Input name="currentResidentialAddress" placeholder="Current Address (with PIN)*" value={sForm.currentResidentialAddress} onChange={handleSalariedChange} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input name="city" placeholder="City" value={sForm.city} onChange={handleSalariedChange} />
                  <Input name="state" placeholder="State" value={sForm.state} onChange={handleSalariedChange} />
                  <Input name="currentResidentialPincode" placeholder="PIN" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="residenceType" placeholder="Owned / Rented / Company Provided" value={sForm.residenceType} onChange={handleSalariedChange} />
                  <Input name="stayingSinceYears" type="number" placeholder="Staying Since (Years)" value={sForm.stayingSinceYears} onChange={handleSalariedChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Residence Photo</Label>
                  <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs mt-1">{residencePhoto ? "✓" : "Upload"}</span>
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, setResidencePhoto)} />
                  </label>
                </div>
              </fieldset>

              {/* D. EMPLOYMENT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">D. Employment Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="companyName" placeholder="Company Name" value={sForm.companyName} onChange={handleSalariedChange} />
                  <Input name="companyNature" placeholder="Nature (Private/MNC/Govt/PSU)" value={sForm.companyNature} onChange={handleSalariedChange} />
                  <Input name="industry" placeholder="Industry / Sector" value={sForm.industry} onChange={handleSalariedChange} />
                  <Input name="designation" placeholder="Designation" value={sForm.designation} onChange={handleSalariedChange} />
                  <Input name="employmentType" placeholder="Employment Type" value={sForm.employmentType} onChange={handleSalariedChange} />
                  <Input name="dateOfJoining" placeholder="Date of Joining" value={sForm.dateOfJoining} onChange={handleSalariedChange} />
                  <Input name="totalExperienceYears" type="number" placeholder="Total Experience (Years)" value={sForm.totalExperienceYears} onChange={handleSalariedChange} />
                  <Input name="officeLocation" placeholder="Office Location / City" value={sForm.officeLocation} onChange={handleSalariedChange} />
                  <Input name="officialEmail" type="email" placeholder="Official Email ID" value={sForm.officialEmail} onChange={handleSalariedChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Office ID Card Photo</Label>
                  <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs mt-1">{officeIdPhoto ? "✓" : "Upload"}</span>
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange(e, setOfficeIdPhoto)} />
                  </label>
                </div>
              </fieldset>

              {/* E. INCOME DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">E. Income Details</legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input name="monthlyNetSalary" type="number" placeholder="Monthly Net Salary (₹)" value={sForm.monthlyNetSalary} onChange={handleSalariedChange} />
                  <Input name="salaryCreditMode" placeholder="Salary Credit Mode" value={sForm.salaryCreditMode} onChange={handleSalariedChange} />
                  <Input name="salaryAccountBankName" placeholder="Salary Account Bank" value={sForm.salaryAccountBankName} onChange={handleSalariedChange} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 3 Months Salary Slips*</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs mt-1">{salarySlips ? "✓" : "Upload"}</span>
                      <input type="file" accept="application/pdf,image/*" className="hidden" onChange={(e) => handleFileChange(e, setSalarySlips)} />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Last 6 Months Bank Statement*</Label>
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded cursor-pointer hover:border-primary">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs mt-1">{bankStatement ? "✓" : "Upload"}</span>
                      <input type="file" accept="application/pdf,image/*" className="hidden" onChange={(e) => handleFileChange(e, setBankStatement)} />
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* F. EXISTING LOAN & CREDIT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">F. Existing Loan & Credit Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="existingLoans" placeholder="Existing Loans (Yes / No)" value={sForm.existingLoans} onChange={handleSalariedChange} />
                  <Input name="existingLoanType" placeholder="If Yes – Loan Type" value={sForm.existingLoanType} onChange={handleSalariedChange} />
                  <Input name="totalMonthlyEmi" type="number" placeholder="Total Monthly EMI (₹)" value={sForm.totalMonthlyEmi} onChange={handleSalariedChange} />
                  <Input name="anyDelays" placeholder="Any EMI Delay in Past?" value={sForm.anyDelays} onChange={handleSalariedChange} />
                </div>
              </fieldset>

              {/* G. CREDIT SCORE */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">G. Credit Score</legend>
                <Input name="cibilScore" type="number" placeholder="CIBIL Score" value={sForm.cibilScore} onChange={handleSalariedChange} />
              </fieldset>

              {/* H. LOAN REQUIREMENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">H. Loan Requirement Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="loanTypeRequired" placeholder="Type of Loan Required" value={sForm.loanTypeRequired} onChange={handleSalariedChange} />
                  <Input name="requiredLoanAmount" type="number" placeholder="Required Loan Amount (₹)" value={sForm.requiredLoanAmount} onChange={handleSalariedChange} />
                  <Input name="preferredTenure" placeholder="Preferred Loan Tenure" value={sForm.preferredTenure} onChange={handleSalariedChange} />
                  <Input name="purpose" placeholder="Purpose of Loan" value={sForm.purpose} onChange={handleSalariedChange} />
                </div>
              </fieldset>

              {/* I. CO-APPLICANT DETAILS */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">I. Co-Applicant Details (If Any)</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="coApplicantName" placeholder="Co-Applicant Name" value={sForm.coApplicantName} onChange={handleSalariedChange} />
                  <Input name="coApplicantRelation" placeholder="Relationship with Applicant" value={sForm.coApplicantRelation} onChange={handleSalariedChange} />
                  <Input name="coApplicantEmploymentType" placeholder="Co-Applicant Employment Type" value={sForm.coApplicantEmploymentType} onChange={handleSalariedChange} />
                </div>
              </fieldset>

              {/* J. DECLARATION & CONSENT */}
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-foreground mb-4">J. Declaration & Consent</legend>
                <div className="flex items-start gap-3">
                  <input id="s_consent" type="checkbox" className="mt-1" required />
                  <label htmlFor="s_consent" className="text-sm">I authorize Infinity Loans & Business Solutions to verify my details and share my application with Banks / NBFCs for loan evaluation.</label>
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
