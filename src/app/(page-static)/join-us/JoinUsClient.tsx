"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Zap, Upload, FileText } from "lucide-react";
import { useState } from "react";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
  "Ladakh", "Lakshadweep", "Andaman & Nicobar Islands"
];

const initialFiles = {
  aadhaarFront: null as File | null,
  aadhaarBack: null as File | null,
  panFront: null as File | null,
  bankPassbook: null as File | null,
  passportPhoto: null as File | null,
};

type PartnerFileKey = keyof typeof initialFiles;

const REQUIRED_FILE_FIELDS: { key: PartnerFileKey; label: string }[] = [
  { key: "aadhaarFront", label: "Aadhaar Card (Front)" },
  { key: "aadhaarBack", label: "Aadhaar Card (Back)" },
  { key: "panFront", label: "PAN Card" },
  { key: "bankPassbook", label: "Bank Passbook / Cancelled Cheque" },
  { key: "passportPhoto", label: "Passport Size Photo" },
];

export default function JoinUsClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    altMobileNumber: "",
    whatsappNumber: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    preferredLoan: "",
    experience: "",
  });

  const [files, setFiles] = useState(initialFiles);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    const field = name as PartnerFileKey;
    if (fileList?.[0]) {
      setFiles((prev) => ({
        ...prev,
        [field]: fileList[0],
      }));
    }
  };

  const FileUpload = ({ name, label, accept, value }: { name: PartnerFileKey; label: string; accept: string; value: File | null }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {label} <span className="text-[#00AEEF]">*</span>
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            name={name}
            onChange={handleFileChange}
            accept={accept}
            className="sr-only"
            tabIndex={-1}
            aria-hidden
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] hover:border-[#00AEEF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors flex items-center justify-between"
          >
            <span className="text-sm text-[#666666]">
              {value ? value.name : "Choose file..."}
            </span>
            <Upload className="h-4 w-4 text-[#00AEEF]" />
          </button>
          {value && (
            <div className="mt-2 text-sm text-[#666666] flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {value.name}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const missingFiles = REQUIRED_FILE_FIELDS.filter(({ key }) => !files[key]);
    if (missingFiles.length > 0) {
      setMessage({
        type: "error",
        text: `Please upload: ${missingFiles.map((f) => f.label).join(", ")}`,
      });
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof typeof formData]);
      });

      // Add all files
      Object.keys(files).forEach(key => {
        const file = files[key as keyof typeof files];
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      const response = await fetch("/api/partner-register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: data.message || "Thank you! Our team will contact you shortly.",
        });
        setFormData({
          fullName: "",
          mobileNumber: "",
          altMobileNumber: "",
          whatsappNumber: "",
          email: "",
          state: "",
          city: "",
          pincode: "",
          preferredLoan: "",
          experience: "",
        });
        setFiles(initialFiles);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to submit form. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#E6F7FD] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 lg:pb-16">
        {/* Soft Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#00AEEF]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00AEEF]/10 blur-3xl" />
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.18]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,174,239,0.75) 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 text-[#666666] transition-colors hover:text-[#00AEEF]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-white px-4 py-2 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
                <div className="w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span className="text-sm font-semibold text-[#00AEEF]">Become a Loan Partner</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
                <span className="relative inline-block text-[#00AEEF]">
                  Become a Loan Partner
                  <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 bg-[#00AEEF]/15" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#1A1A1A] leading-relaxed">Start Your Loan Business and Earn Extra Income</p>

              <p className="text-base text-[#666666] leading-relaxed">
                Join India's trusted loan distribution network and grow your loan business with confidence and efficiency.
                We empower our partners to earn higher commissions with instant payouts on every successful loan disbursement.
              </p>

              <div className="grid gap-4 pt-4">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00AEEF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">No Investment or Joining Fees</p>
                    <p className="text-sm text-[#666666]">Start your loan business without any upfront cost.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00AEEF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Instant Payouts & Support</p>
                    <p className="text-sm text-[#666666]">Fast, reliable payouts after every successful disbursement.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#00AEEF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Comprehensive Partnership Network</p>
                    <p className="text-sm text-[#666666]">Access to 100+ banks and NBFC partnerships.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Registration Form */}
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-[#D6EEF8] shadow-[0_8px_30px_rgba(15,23,42,0.10)] h-fit sticky top-32">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">📝 Partner Registration</h2>
                <p className="text-sm text-[#1A1A1A] font-semibold mb-3">Register to Become a Loan Partner</p>
                <p className="text-sm text-[#666666] leading-relaxed">
                  Complete the form below to join our loan partner network and start earning through successful loan disbursements.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Full Name <span className="text-[#00AEEF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Mobile Number <span className="text-[#00AEEF]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Alt Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Alternate Mobile Number <span className="text-[#666666] font-medium">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="altMobileNumber"
                    value={formData.altMobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit alternate mobile number"
                    pattern="[0-9]{10}"
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    WhatsApp Number <span className="text-[#666666] font-medium">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="10-digit WhatsApp number"
                    pattern="[0-9]{10}"
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Email Address <span className="text-[#00AEEF]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    State <span className="text-[#00AEEF]">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  >
                    <option value="">Select your state</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    City <span className="text-[#00AEEF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Pincode <span className="text-[#00AEEF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    pattern="[0-9]{6}"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Preferred Loan */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Preferred Loan <span className="text-[#00AEEF]">*</span>
                  </label>
                  <input
                    type="text"
                    name="preferredLoan"
                    value={formData.preferredLoan}
                    onChange={handleChange}
                    placeholder="e.g., Personal Loan, Business Loan, Home Loan"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Professional Experience */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Professional Experience <span className="text-[#666666] font-medium">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., DSA, Financial Consultant"
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#D6EEF8] text-[#1A1A1A] placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 transition-colors"
                  />
                </div>

                {/* Document Uploads */}
                <div className="space-y-4 pt-4 border-t border-[#D6EEF8]">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">📎 Required Documents</h3>
                  
                  {/* Aadhaar Front */}
                  <FileUpload
                    name="aadhaarFront"
                    label="Aadhaar Card (Front)"
                    accept="image/*,.pdf"
                    value={files.aadhaarFront}
                  />

                  {/* Aadhaar Back */}
                  <FileUpload
                    name="aadhaarBack"
                    label="Aadhaar Card (Back)"
                    accept="image/*,.pdf"
                    value={files.aadhaarBack}
                  />

                  {/* PAN Front */}
                  <FileUpload
                    name="panFront"
                    label="PAN Card"
                    accept="image/*,.pdf"
                    value={files.panFront}
                  />

                  {/* Bank Passbook */}
                  <FileUpload
                    name="bankPassbook"
                    label="Bank Passbook / Cancelled Cheque"
                    accept="image/*,.pdf"
                    value={files.bankPassbook}
                  />

                  {/* Passport Photo */}
                  <FileUpload
                    name="passportPhoto"
                    label="Passport Size Photo"
                    accept="image/*"
                    value={files.passportPhoto}
                  />
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`p-4 rounded-lg text-sm ${
                      message.type === "success"
                        ? "bg-[#E6F7FD] border border-[#D6EEF8] text-[#1A1A1A]"
                        : "bg-white border border-[#D6EEF8] text-[#1A1A1A]"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00AEEF] hover:bg-[#008FCC] disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-[0_2px_10px_rgba(0,174,239,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
                >
                  {loading ? "Submitting..." : "Become a Loan Partner"}
                </button>

                <p className="text-xs text-[#666666] text-center pt-2">
                  🔒 Your information is secure and will be used only for partner onboarding and communication.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 lg:py-24 bg-[#F7F9FC]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Why Partner With Us */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)] mb-4">
              <Users className="w-4 h-4 text-[#00AEEF]" />
              <span className="text-sm font-semibold text-[#1A1A1A]">Partner Benefits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              💼 Why Partner <span className="text-[#00AEEF]">With Us?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We provide a reliable and transparent platform designed to help our partners grow and succeed in the loan distribution business.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "No Investment or Joining Fees",
                  desc: "Start your loan business without any upfront cost.",
                },
                {
                  title: "Attractive and Transparent Commission Structure",
                  desc: "Clearly defined commissions with complete visibility on earnings.",
                },
                {
                  title: "Instant and Timely Payouts",
                  desc: "Fast and reliable payouts after every successful loan disbursement.",
                },
                {
                  title: "Multiple Banks and NBFC Partnerships",
                  desc: "Access to a wide network of leading banks and NBFCs.",
                },
                {
                  title: "Simple, Fast, and Paperless Process",
                  desc: "Streamlined digital processes to save time and reduce paperwork.",
                },
                {
                  title: "Dedicated Partner Support Team",
                  desc: "Professional assistance to support you at every stage.",
                },
                {
                  title: "Flexible Working Model",
                  desc: "Work part-time or full-time, based on your availability and goals.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="group rounded-[20px] bg-white border border-[#D6EEF8] p-6 shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00AEEF]"
                >
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#666666] leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8 text-sm">
              Our platform supports both experienced DSAs and individuals who are new to the loan business, with complete onboarding and ongoing support.
            </p>
          </div>

          {/* How It Works */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D6EEF8] shadow-[0_2px_10px_rgba(15,23,42,0.06)] mb-4">
              <Zap className="w-4 h-4 text-[#00AEEF]" />
              <span className="text-sm font-semibold text-[#1A1A1A]">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              💰 How It <span className="text-[#00AEEF]">Works</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Our simple and streamlined process helps you earn commissions with ease and transparency.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1️⃣",
                  title: "Submit Loan Lead",
                  desc: "Share your customer's loan requirement through our secure platform.",
                },
                {
                  step: "2️⃣",
                  title: "Processing & Bank Coordination",
                  desc: "Our team manages documentation, follow-ups, and coordination with the respective banks and NBFCs.",
                },
                {
                  step: "3️⃣",
                  title: "Approval & Disbursement",
                  desc: "The loan is reviewed, approved, and disbursed directly by the bank or NBFC.",
                },
                {
                  step: "4️⃣",
                  title: "Instant Commission Payout",
                  desc: "Your commission is credited promptly after successful loan disbursement.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-[20px] bg-white border border-[#D6EEF8] p-6 shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00AEEF]"
                >
                  <p className="text-3xl mb-3 text-[#00AEEF]">{item.step}</p>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#666666] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8 text-sm">
              💸 Earn competitive payouts on every successfully disbursed loan with complete transparency.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
