"use client";

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

  const [files, setFiles] = useState<{
    aadhaarFront: File | null;
    aadhaarBack: File | null;
    panFront: File | null;
    bankPassbook: File | null;
    passportPhoto: File | null;
  }>({
    aadhaarFront: null,
    aadhaarBack: null,
    panFront: null,
    bankPassbook: null,
    passportPhoto: null,
  });

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
    if (fileList && fileList[0]) {
      setFiles({
        ...files,
        [name as keyof typeof files]: fileList[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

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
          text: "Thank you! Our team will contact you shortly.",
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
        setFiles({
          aadhaarFront: null,
          aadhaarBack: null,
          panFront: null,
          bankPassbook: null,
          passportPhoto: null,
        });
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40 py-20 lg:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#0099D8]/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#0099D8]/5 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#0099D8]/5 blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0099D8] transition-all mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 text-[#0099D8] transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0099D8]/10 border border-[#0099D8]/20">
                <div className="w-2 h-2 bg-[#0099D8] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-900">Become a Loan Partner</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#0099D8]">Become a Loan Partner</span>
                  <span className="absolute bottom-3 left-0 w-full h-4 bg-[#0099D8]/20 -rotate-2" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">Start Your Loan Business and Earn Extra Income</p>

              <p className="text-base text-gray-600 leading-relaxed">
                Join India's trusted loan distribution network and grow your loan business with confidence and efficiency.
                We empower our partners to earn higher commissions with instant payouts on every successful loan disbursement.
              </p>

              <div className="grid gap-4 pt-4">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#0099D8] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">No Investment or Joining Fees</p>
                    <p className="text-sm text-gray-600">Start your loan business without any upfront cost.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#0099D8] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Instant Payouts & Support</p>
                    <p className="text-sm text-gray-600">Fast, reliable payouts after every successful disbursement.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#0099D8] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Comprehensive Partnership Network</p>
                    <p className="text-sm text-gray-600">Access to 100+ banks and NBFC partnerships.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Registration Form */}
            <div className="rounded-3xl bg-white p-8 border border-gray-200 shadow-xl h-fit sticky top-32">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Partner Registration</h2>
                <p className="text-sm text-gray-700 font-semibold mb-3">Register to Become a Loan Partner</p>
                <p className="text-sm text-gray-600">
                  Complete the form below to join our loan partner network and start earning through successful loan disbursements.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-[#0099D8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-[#0099D8]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Alt Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Mobile Number <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="altMobileNumber"
                    value={formData.altMobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit alternate mobile number"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="10-digit WhatsApp number"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-[#0099D8]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-[#0099D8]">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-[#0099D8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode <span className="text-[#0099D8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    pattern="[0-9]{6}"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Loan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Loan <span className="text-[#0099D8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="preferredLoan"
                    value={formData.preferredLoan}
                    onChange={handleChange}
                    placeholder="e.g., Personal Loan, Business Loan, Home Loan"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Professional Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Experience <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., DSA, Financial Consultant"
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                  />
                </div>

                {/* Document Uploads */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📎 Required Documents</h3>
                  
                  {/* Aadhaar Front */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Card (Front) <span className="text-[#0099D8]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="aadhaarFront"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0099D8] file:text-white hover:file:bg-[#007BB0] placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                      />
                      {files.aadhaarFront && (
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {files.aadhaarFront.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Aadhaar Back */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Card (Back) <span className="text-[#0099D8]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="aadhaarBack"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0099D8] file:text-white hover:file:bg-[#007BB0] placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                      />
                      {files.aadhaarBack && (
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {files.aadhaarBack.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PAN Front */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Card <span className="text-[#0099D8]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="panFront"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0099D8] file:text-white hover:file:bg-[#007BB0] placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                      />
                      {files.panFront && (
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {files.panFront.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bank Passbook */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Passbook / Cancelled Cheque <span className="text-[#0099D8]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="bankPassbook"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0099D8] file:text-white hover:file:bg-[#007BB0] placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                      />
                      {files.bankPassbook && (
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {files.bankPassbook.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Passport Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Size Photo <span className="text-[#0099D8]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="passportPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0099D8] file:text-white hover:file:bg-[#007BB0] placeholder-gray-400 focus:border-[#0099D8] focus:ring-1 focus:ring-[#0099D8]/30 focus:outline-none transition-colors"
                      />
                      {files.passportPhoto && (
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {files.passportPhoto.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`p-4 rounded-lg text-sm ${
                      message.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0099D8] hover:bg-[#007BB0] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? "Submitting..." : "Become a Loan Partner"}
                </button>

                <p className="text-xs text-gray-500 text-center pt-2">
                  🔒 Your information is secure and will be used only for partner onboarding and communication.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Why Partner With Us */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-4">
              <Users className="w-4 h-4 text-[#0099D8]" />
              <span className="text-sm font-medium text-gray-700">Partner Benefits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              💼 Why Partner <span className="text-[#0099D8]">With Us?</span>
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
                  className="group rounded-2xl bg-white border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#0099D8]/50"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8 text-sm">
              Our platform supports both experienced DSAs and individuals who are new to the loan business, with complete onboarding and ongoing support.
            </p>
          </div>

          {/* How It Works */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-4">
              <Zap className="w-4 h-4 text-[#0099D8]" />
              <span className="text-sm font-medium text-gray-700">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              💰 How It <span className="text-[#0099D8]">Works</span>
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
                  className="group rounded-2xl bg-white border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#0099D8]/50"
                >
                  <p className="text-3xl mb-3 text-[#0099D8]">{item.step}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
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
