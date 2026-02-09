"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BriefcaseBusiness, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
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

export default function PrivateInstitutionalHighlight() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

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

  const loanCategories = ["Personal Loan",
    "Business Loan",
    "Home Loan",
    "Mortgage Loan",
    "Loan Against Property",
    "Vehicle Loan",
    "Two-Wheeler Loan",
    "Commercial Vehicle Loan",
    "MSME / SME Loan",
    "Working Capital Loan",
    "Startup Loan",
    "Education Loan",
    "Gold Loan"]

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
                  <BriefcaseBusiness className="h-4 w-4 text-[#F97415]" />
                  Private & Institutional Lending Services
                </p>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  🏦 Structured Private Lending for Complex Capital Requirements
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  <p>
                    💼 Comprehensive secured and unsecured private lending solutions designed for businesses with diverse and complex capital needs.
                    <br />
                    We facilitate lending through Private Lenders, Venture Capital (VC) Networks, Strategic Investors, and HNI & UHNI channels, supported by structured deal frameworks and strong governance standards.
                  </p>

                  <p className="font-semibold text-white">🔍 Our Lending Capabilities</p>
                  <div className="space-y-1">
                    <p>🏛️ Institutional & Professional Lending</p>
                    <p>🤝 Private Lender–Led Funding Structures</p>
                    <p>🧩 Customized Deal Structuring based on detailed eligibility assessment</p>
                  </div>

                  {!isReadMoreOpen && (
                    <button
                      type="button"
                      onClick={() => setIsReadMoreOpen(true)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F97415] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Read more
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  )}

                  {isReadMoreOpen && (
                    <>
                      <p className="mt-2">All lending structures are developed through:</p>
                      <div className="space-y-1">
                        <p>✔️ Credit Evaluation</p>
                        <p>✔️ Due Diligence</p>
                        <p>✔️ Risk & Compliance Review</p>
                      </div>

                      <p className="font-semibold text-white">🚀 Capital Solutions We Support</p>
                      <div className="space-y-1">
                        <p>📈 Growth Capital</p>
                        <p>🏗️ Expansion & Scale-Up Lending</p>
                        <p>🎯 Strategic & Special Situation Funding</p>
                      </div>

                      <p>
                        All solutions are aligned with long-term business objectives and sustainable growth.
                      </p>

                      <p className="font-semibold text-white">🏭 Who We Serve</p>
                      <div className="space-y-1">
                        <p>🏢 Small & Large Businesses</p>
                        <p>🏭 SMEs & Corporates</p>
                        <p>🏗️ Factory Owners & Industrialists</p>
                      </div>

                      <p className="text-white/90">📌 All lending solutions are subject to profile evaluation and due diligence.</p>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-white/90 font-semibold">💡 Optional Short Version (for cards / sections)</p>
                        <p className="mt-2">🔒 Structured Private Lending</p>
                        <p className="mt-2 text-white/70">
                          Tailored secured and unsecured funding solutions for businesses with complex capital requirements—powered by private lenders, strategic investors, and strong governance.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsReadMoreOpen(false)}
                        className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Show less
                        <ChevronUp className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full max-w-xl lg:max-w-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97415]/15">
                      <TrendingUp className="h-5 w-5 text-[#F97415]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Lending Ticket Size</p>
                      <p className="text-xs text-gray-300">Subject to eligibility & due diligence</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-black/30 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">Range</p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                      INR 10 Lakhs to INR 1,000 Crores
                    </p>
                  </div>

                  <p className="mt-4 text-md font-bold leading-relaxed text-gray-300">
                    Based on borrower profile strength, legal & financial documentation, credit history, repayment track record, and overall risk assessment.
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Talk to an Expert
                    </a>
                    <a
                      href="/services?category=businesses"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
                    >
                      Explore Our Loan  Services
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsApplyOpen(true)}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#F97415] px-5 text-sm font-semibold text-white transition hover:bg-[#F97415]/90"
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
                    <Label htmlFor="pi_firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="pi_firstName"
                      {...register("firstName", { required: "First Name is required" })}
                    />
                    {errors.firstName?.message && (
                      <p className="text-xs text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pi_middleName" className="text-sm font-medium">Middle Name</Label>
                    <Input id="pi_middleName" {...register("middleName")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pi_lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="pi_lastName"
                      {...register("lastName", { required: "Last Name is required" })}
                    />
                    {errors.lastName?.message && (
                      <p className="text-xs text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="pi_primaryMobileNumber" className="text-sm font-medium">Primary Mobile Number</Label>
                    <Input
                      id="pi_primaryMobileNumber"
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
                    <Label htmlFor="pi_alternateMobileNumber" className="text-sm font-medium">Alternate Mobile Number</Label>
                    <Input
                      id="pi_alternateMobileNumber"
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
                    <Label htmlFor="pi_whatsappNumber" className="text-sm font-medium">WhatsApp Number</Label>
                    <Input
                      id="pi_whatsappNumber"
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
                  <Label htmlFor="pi_homeAddress" className="text-sm font-medium">Home Address</Label>
                  <Input
                    id="pi_homeAddress"
                    {...register("homeAddress", { required: "Home Address is required" })}
                  />
                  {errors.homeAddress?.message && (
                    <p className="text-xs text-destructive">{errors.homeAddress.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pi_officeAddress" className="text-sm font-medium">Office Address</Label>
                  <Input
                    id="pi_officeAddress"
                    {...register("officeAddress", { required: "Office Address is required" })}
                  />
                  {errors.officeAddress?.message && (
                    <p className="text-xs text-destructive">{errors.officeAddress.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pi_homeAddressPincode" className="text-sm font-medium">Home Address Pincode</Label>
                    <Input
                      id="pi_homeAddressPincode"
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
                    <Label htmlFor="pi_officeAddressPincode" className="text-sm font-medium">Office Address Pincode</Label>
                    <Input
                      id="pi_officeAddressPincode"
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
                    <Label htmlFor="pi_requiredLoanAmount" className="text-sm font-medium">Required Loan Amount</Label>
                    <Input
                      id="pi_requiredLoanAmount"
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
                    <Label htmlFor="pi_loanType" className="text-sm font-medium">Loan Type</Label>
                    <select
                      id="pi_loanType"
                      {...register("loanType", { required: "Loan Type is required" })}
                      className="mt-2 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    >
                      <option value="">Select Loan Type</option>
                      {
                        loanCategories.map((loan,idx)=>(
                            <option key={idx} value={loan}>{loan}</option>
                        ))
                      }
                    </select>
                    {errors.loanType?.message && (
                      <p className="text-xs text-destructive">{errors.loanType.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center  gap-3">
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