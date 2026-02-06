"use client";

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
}

type FormData = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  alternateMobile: string;
  businessEmail: string;
  personalEmail: string;
  fullAddress: string;
  pincode: string;
  aadhaarNumber: string;
  panNumber: string;
  voterIdNumber: string;
  drivingLicense: string;
  passportNumber: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ApplyNowModal({ isOpen, onClose, loanType }: ApplyNowModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    alternateMobile: "",
    businessEmail: "",
    personalEmail: "",
    fullAddress: "",
    pincode: "",
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

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim().length < 2 ? "Minimum 2 characters required" : "";
      case "mobileNumber":
        return !/^[6-9]\d{9}$/.test(value) ? "Enter valid 10-digit mobile number" : "";
      case "alternateMobile":
        return value && !/^[6-9]\d{9}$/.test(value) ? "Enter valid 10-digit mobile number" : "";
      case "businessEmail":
      case "personalEmail":
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Enter valid email address" : "";
      case "pincode":
        return !/^\d{6}$/.test(value) ? "Enter valid 6-digit pincode" : "";
      case "aadhaarNumber":
        return !/^\d{12}$/.test(value) ? "Enter valid 12-digit Aadhaar number" : "";
      case "panNumber":
        return !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())
          ? "Enter valid PAN (e.g., ABCDE1234F)"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "mobileNumber",
      "personalEmail",
      "fullAddress",
      "pincode",
      "aadhaarNumber",
      "panNumber",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error || !formData[field]) {
        newErrors[field] = error || "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.alert("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    window.alert("Application submitted. We'll contact you within 24 hours.");
    onClose();
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

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] m-4 overflow-hidden rounded-2xl bg-card shadow-2xl animate-modal-in">
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

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-8">
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
              <div className="space-y-2">
                <Label htmlFor="fullAddress" className="text-sm font-medium">
                  Full Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fullAddress")}
                  onBlur={() => setFocusedField(null)}
                  className={`transition-all duration-300 ${
                    focusedField === "fullAddress" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.fullAddress ? "border-destructive animate-shake" : ""}`}
                  placeholder="House No, Street, Area, City, State"
                />
                {errors.fullAddress && (
                  <p className="text-xs text-destructive animate-fade-in">{errors.fullAddress}</p>
                )}
              </div>

              <div className="w-full sm:w-1/3">
                <Label htmlFor="pincode" className="text-sm font-medium">
                  Pincode <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pincode"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("pincode")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 transition-all duration-300 ${
                    focusedField === "pincode" ? "ring-2 ring-primary shadow-glow-primary" : ""
                  } ${errors.pincode ? "border-destructive animate-shake" : ""}`}
                  placeholder="400001"
                />
                {errors.pincode && <p className="text-xs text-destructive animate-fade-in">{errors.pincode}</p>}
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
                <Label className="text-sm font-medium">Aadhaar Front</Label>
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
                <Label className="text-sm font-medium">Aadhaar Back</Label>
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
                <Label className="text-sm font-medium">PAN Card Front</Label>
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
            </div>
          </fieldset>
        </form>

        <div className="sticky bottom-0 border-t bg-card px-6 py-4">
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="cta"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 animate-pulse-subtle"
            >
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
