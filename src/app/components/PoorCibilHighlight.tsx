"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { 
  BadgeAlert, 
  Shield, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileQuestion,
  Sparkles,
  FileText,
  Building2,
  Users,
  TrendingDown,
  Zap,
  Search,
  Star,
  MessageSquare,
  Flame,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import axios from "axios";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PrivateApplyFormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  primaryMobileNumber: string;
  alternateMobileNumber: string;
  whatsappNumber: string;
  homeAddress: string;
  homeAddressPincode: string;
  officeAddress: string;
  officeAddressPincode: string;
  loanType: string;
  requiredLoanAmount: string;
};

export default function PoorCibilHighlight() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrivateApplyFormValues>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      primaryMobileNumber: "",
      alternateMobileNumber: "",
      whatsappNumber: "",
      homeAddress: "",
      homeAddressPincode: "",
      officeAddress: "",
      officeAddressPincode: "",
      loanType: "",
      requiredLoanAmount: "",
    },
  });

  const closeApply = () => {
    setIsApplyOpen(false);
    reset();
  };

  const onSubmit = async (values: PrivateApplyFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/private-apply", values);
      if (res?.data?.success) {
        window.alert(res.data.message || "Submitted");
        closeApply();
        return;
      }
      console.log(res.data);
      window.alert(res?.data?.message || "Submission failed");
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message;
      const serverErrors = err?.response?.data?.errors;
      if (serverErrors && typeof serverErrors === "object") {
        const firstError = Object.values(serverErrors).find(Boolean);
        window.alert(String(firstError || serverMessage || "Validation failed"));
      } else {
        const message = serverMessage || err?.message || "Submission failed";
        window.alert(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#F97415]/20 bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-6 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#F97415]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#F97415]/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                  <BadgeAlert className="h-4 w-4 text-[#F97415]" />
                  Our Strength – Genuine Solutions for Poor CIBIL Profiles
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <FileQuestion className="h-6 w-6 text-[#F97415]" />
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    What type of cases do we consider?
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  We consider loan applications with poor CIBIL scores, EMI bounces, and past credit issues, only when there is a genuine and valid reason.
                </p>

                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F97415] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                  >
                    Read More
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {isExpanded && (
                  <>
                <div className="flex items-center gap-2 mt-6">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">
                    Cases we accept:
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Low / Poor CIBIL Score</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">EMI Bounces or Late Payments</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Settled or Closed Loan Accounts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Credit issues due to COVID-19 impact</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Business loss followed by income stability</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Medical or family emergencies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Temporary financial setbacks (currently resolved)</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-semibold text-red-200">
                      Important: We do not accept cases involving fraud, fake documents, or intentional defaults.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Our Core Strength
                  </h3>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <TrendingUp className="h-5 w-5 text-[#F97415] mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed text-gray-200 sm:text-base font-semibold">
                    We evaluate repayment capability, not just the CIBIL score
                  </p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                  Each profile is assessed based on:
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-sm text-gray-300">• Current income stability</p>
                  <p className="text-sm text-gray-300">• Bank statement cash flow</p>
                  <p className="text-sm text-gray-300">• Available security (if any)</p>
                  <p className="text-sm text-gray-300">• Genuine reason explanation</p>
                  <p className="text-sm text-gray-300 sm:col-span-2">• Future repayment capacity</p>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <FileText className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Genuine Reason is Mandatory
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-200 sm:text-base">
                  To process any poor CIBIL case, a clear and genuine explanation is required, such as:
                </p>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-300">• Medical emergency</p>
                  <p className="text-sm text-gray-300">• COVID-related income loss</p>
                  <p className="text-sm text-gray-300">• Temporary business slowdown</p>
                  <p className="text-sm text-gray-300">• Job change or salary delay</p>
                  <p className="text-sm text-gray-300">• Family emergency</p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-red-200 font-semibold">
                  Applications without a genuine reason are not processed.
                </p>

                <div className="flex items-center gap-2 mt-6">
                  <Building2 className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Available Loan Solutions
                  </h3>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97415]/20 text-[#F97415] font-bold">1</div>
                      <p className="text-base font-bold text-white">Secured Loan Options</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-300">• Loan Against Property</p>
                      <p className="text-sm text-gray-300">• Gold Loan</p>
                      <p className="text-sm text-gray-300">• Loan Against Fixed Deposit / Insurance</p>
                      <p className="text-sm text-green-300 font-semibold mt-2">✔️ Higher approval chances even with poor CIBIL</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97415]/20 text-[#F97415] font-bold">2</div>
                      <p className="text-base font-bold text-white">Co-Applicant / Guarantor Based Loans</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-300">• Family member with good CIBIL score</p>
                      <p className="text-sm text-gray-300">• Combined income strength</p>
                      <p className="text-sm text-green-300 font-semibold mt-2">✔️ Reduced risk for lenders</p>
                      <p className="text-sm text-green-300 font-semibold">✔️ Improved approval possibility</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97415]/20 text-[#F97415] font-bold">3</div>
                      <p className="text-base font-bold text-white">Step-by-Step Loan Strategy</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-300">• Start with a small loan amount</p>
                      <p className="text-sm text-gray-300">• Maintain regular EMIs for 6–9 months</p>
                      <p className="text-sm text-gray-300">• Become eligible for higher loan amounts or top-ups</p>
                      <p className="text-sm text-green-300 font-semibold mt-2">✔️ Helps rebuild credit profile over time</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Search className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Our Process (Transparent & Legal)
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-gray-200">Profile assessment (CIBIL & income)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-gray-200">Verification of genuine reason</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-gray-200">Recommendation of the most suitable solution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <p className="text-sm text-gray-200">Proper documentation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F97415]/20 text-[#F97415] text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                    <p className="text-sm text-gray-200">Transparent lender-based approval process</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-200">No fake documentation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-200">No false promises</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-200">No approval guarantees</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <MessageSquare className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Clear Message for Clients
                  </h3>
                </div>

                <div className="mt-3 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                  <p className="text-sm leading-relaxed text-white font-semibold">
                    "If your CIBIL profile is weak but your current income is stable and your intent to repay is genuine, we help you find the most suitable and legal loan solution."
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Star className="h-6 w-6 text-[#F97415]" />
                  <h3 className="text-xl font-bold text-white">
                    Why Choose Us?
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Honest and ethical guidance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Risk-based lending solutions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Client-focused approach</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Long-term relationship building</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-200">Complete transparency</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </button>
                </>
                )}
              </div>

              <div className="w-full max-w-xl lg:max-w-sm lg:sticky lg:top-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97415]/15">
                      <Shield className="h-5 w-5 text-[#F97415]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Important Disclaimer</p>
                      <p className="text-xs text-gray-300">Please read carefully</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-black/30 px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">Approval Notice</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-200">
                      Loan approval depends entirely on the lender's policies and the applicant's profile strength. We assist only in identifying the best possible genuine options—approval is not guaranteed.
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#F97415]/30 bg-[#F97415]/10 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-[#F97415]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-white">Brand Power Line</p>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-white">
                      "We don't judge your past credit score. We evaluate your present strength."
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Talk to an Expert
                    </a>
                    <a
                      href="/services?category=poor-cibil"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Explore Our Loan Services
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsApplyOpen(true)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isApplyOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeApply} />

            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-6 py-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Apply Now</h2>
                  <p className="text-sm text-muted-foreground">Fill in your details to proceed</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeApply} className="rounded-full">
                  <span className="sr-only">Close</span>
                  ✕
                </Button>
              </div>

              <form
                className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="pc_firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="pc_firstName"
                      {...register("firstName", { required: "First Name is required" })}
                    />
                    {errors.firstName?.message && (
                      <p className="text-xs text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pc_middleName" className="text-sm font-medium">Middle Name</Label>
                    <Input id="pc_middleName" {...register("middleName")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pc_lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="pc_lastName"
                      {...register("lastName", { required: "Last Name is required" })}
                    />
                    {errors.lastName?.message && (
                      <p className="text-xs text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="pc_primaryMobileNumber" className="text-sm font-medium">Primary Mobile Number</Label>
                    <Input
                      id="pc_primaryMobileNumber"
                      {...register("primaryMobileNumber", {
                        required: "Primary Mobile Number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter valid 10-digit mobile number",
                        },
                      })}
                    />
                    {errors.primaryMobileNumber?.message && (
                      <p className="text-xs text-destructive">{errors.primaryMobileNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pc_alternateMobileNumber" className="text-sm font-medium">Alternate Mobile Number</Label>
                    <Input
                      id="pc_alternateMobileNumber"
                      {...register("alternateMobileNumber", {
                        validate: (v) =>
                          !v || /^[6-9]\d{9}$/.test(v) || "Enter valid 10-digit mobile number",
                      })}
                    />
                    {errors.alternateMobileNumber?.message && (
                      <p className="text-xs text-destructive">{errors.alternateMobileNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pc_whatsappNumber" className="text-sm font-medium">WhatsApp Number</Label>
                    <Input
                      id="pc_whatsappNumber"
                      {...register("whatsappNumber", {
                        validate: (v) =>
                          !v || /^[6-9]\d{9}$/.test(v) || "Enter valid 10-digit mobile number",
                      })}
                    />
                    {errors.whatsappNumber?.message && (
                      <p className="text-xs text-destructive">{errors.whatsappNumber.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pc_homeAddress" className="text-sm font-medium">Home Address</Label>
                  <Input
                    id="pc_homeAddress"
                    {...register("homeAddress", { required: "Home Address is required" })}
                  />
                  {errors.homeAddress?.message && (
                    <p className="text-xs text-destructive">{errors.homeAddress.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pc_officeAddress" className="text-sm font-medium">Office Address</Label>
                  <Input
                    id="pc_officeAddress"
                    {...register("officeAddress", { required: "Office Address is required" })}
                  />
                  {errors.officeAddress?.message && (
                    <p className="text-xs text-destructive">{errors.officeAddress.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pc_homeAddressPincode" className="text-sm font-medium">Home Address Pincode</Label>
                    <Input
                      id="pc_homeAddressPincode"
                      {...register("homeAddressPincode", {
                        required: "Home Address Pincode is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Enter valid 6-digit pincode",
                        },
                      })}
                    />
                    {errors.homeAddressPincode?.message && (
                      <p className="text-xs text-destructive">{errors.homeAddressPincode.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pc_officeAddressPincode" className="text-sm font-medium">Office Address Pincode</Label>
                    <Input
                      id="pc_officeAddressPincode"
                      {...register("officeAddressPincode", {
                        required: "Office Address Pincode is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Enter valid 6-digit pincode",
                        },
                      })}
                    />
                    {errors.officeAddressPincode?.message && (
                      <p className="text-xs text-destructive">{errors.officeAddressPincode.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pc_requiredLoanAmount" className="text-sm font-medium">Required Loan Amount</Label>
                    <Input
                      id="pc_requiredLoanAmount"
                      {...register("requiredLoanAmount", {
                        required: "Required Loan Amount is required",
                        validate: (v) => {
                          const n = Number(v);
                          return (Number.isFinite(n) && n > 0) || "Enter valid loan amount";
                        },
                      })}
                    />
                    {errors.requiredLoanAmount?.message && (
                      <p className="text-xs text-destructive">{errors.requiredLoanAmount.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pc_loanType" className="text-sm font-medium">Loan Type</Label>
                    <select
                      id="pc_loanType"
                      {...register("loanType", { required: "Loan Type is required" })}
                      className="mt-2 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    >
                      <option value="">Select Loan Type</option>
                      <option value="Home">Home</option>
                      <option value="Personal">Personal</option>
                      <option value="Mortgage">Mortgage</option>
                    </select>
                    {errors.loanType?.message && (
                      <p className="text-xs text-destructive">{errors.loanType.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button type="button" className="w-[50%]" variant="outline" onClick={closeApply} disabled={isSubmitting}>Cancel</Button>
                  <Button type="submit" className="w-[50%] bg-[#F97415]" disabled={isSubmitting}>Submit</Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}