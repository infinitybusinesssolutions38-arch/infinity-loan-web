"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Zap, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    city: "",
    experience: "",
    preferredCategory: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/partner-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          email: "",
          city: "",
          experience: "",
          preferredCategory: "",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 lg:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F97415]/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gray-700/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gray-800/10 blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#F97415] transition-all mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 text-[#F97415] transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#F97415] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">
                  Become a Loan Partner
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                {" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#F97415]">
                    Become a Loan Partner
                  </span>
                  <span className="absolute bottom-3 left-0 w-full h-4 bg-[#F97415]/20 -rotate-2" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Start Your Loan Business and Earn Extra Income
              </p>

              <p className="text-base text-gray-400 leading-relaxed">
                Join India's trusted loan distribution network and grow your
                loan business with confidence and efficiency. We empower our
                partners to earn higher commissions with instant payouts on
                every successful loan disbursement.
              </p>

              <div className="grid gap-4 pt-4">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#F97415] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">
                      No Investment or Joining Fees
                    </p>
                    <p className="text-sm text-gray-400">
                      Start your loan business without any upfront cost.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#F97415] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">
                      Instant Payouts & Support
                    </p>
                    <p className="text-sm text-gray-400">
                      Fast, reliable payouts after every successful disbursement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#F97415] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">
                      Comprehensive Partnership Network
                    </p>
                    <p className="text-sm text-gray-400">
                      Access to 100+ banks and NBFC partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Registration Form */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-8 border border-white/10 shadow-2xl h-fit sticky top-32">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Partner Registration
                </h2>
                <p className="text-sm text-gray-400">
                  Complete the form to join our network
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-[#F97415]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-[#F97415] focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mobile Number <span className="text-[#F97415]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-[#F97415] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-[#F97415]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-[#F97415] focus:outline-none transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City <span className="text-[#F97415]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-[#F97415] focus:outline-none transition-colors"
                  />
                </div>

                {/* Professional Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Professional Experience <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., DSA, Financial Consultant"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-[#F97415] focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Loan Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Loan Category{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </label>
                  <select
                    name="preferredCategory"
                    value={formData.preferredCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:border-[#F97415] focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-gray-900">
                      Select a category
                    </option>
                    <option value="personal" className="bg-gray-900">
                      Personal Loan
                    </option>
                    <option value="business" className="bg-gray-900">
                      Business Loan
                    </option>
                    <option value="home" className="bg-gray-900">
                      Home Loan
                    </option>
                    <option value="vehicle" className="bg-gray-900">
                      Vehicle Loan
                    </option>
                    <option value="credit-card" className="bg-gray-900">
                      Credit Card
                    </option>
                    <option value="gold" className="bg-gray-900">
                      Gold Asset Loan
                    </option>
                    <option value="all" className="bg-gray-900">
                      All of the Above
                    </option>
                  </select>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`p-4 rounded-lg text-sm ${
                      message.type === "success"
                        ? "bg-green-500/20 border border-green-500/50 text-green-300"
                        : "bg-red-500/20 border border-red-500/50 text-red-300"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F97415] hover:bg-[#E06410] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? "Submitting..." : "Become a Loan Partner"}
                </button>

                <p className="text-xs text-gray-400 text-center pt-2">
                  🔒 Your information is secure and will be used only for partner
                  onboarding and communication.
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
              <Users className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-gray-700">
                Partner Benefits
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              💼 Why Partner{" "}
              <span className="text-[#F97415]">With Us?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We provide a reliable and transparent platform designed to help
              our partners grow and succeed in the loan distribution business.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "No Investment or Joining Fees",
                  desc: "Start your loan business without any upfront cost.",
                },
                {
                  title: "Attractive Commission Structure",
                  desc: "Clearly defined commissions with complete visibility on earnings.",
                },
                {
                  title: "Instant Payouts",
                  desc: "Fast and reliable payouts after every successful loan disbursement.",
                },
                {
                  title: "Multiple Bank Partnerships",
                  desc: "Access to a wide network of leading banks and NBFCs.",
                },
                {
                  title: "Paperless Process",
                  desc: "Streamlined digital processes to save time and reduce paperwork.",
                },
                {
                  title: "Dedicated Support",
                  desc: "Professional assistance to support you at every stage.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl bg-gradient-to-br from-black via-neutral-900 to-neutral-700 border border-[#F97415]/20 p-6 hover:shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#F97415]/50"
                >
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-200">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-4">
              <Zap className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-gray-700">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              💰 How It{" "}
              <span className="text-[#F97415]">Works</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Our simple and streamlined process helps you earn commissions with
              ease and transparency.
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
                  title: "Processing & Coordination",
                  desc: "Our team manages documentation, follow-ups, and coordination with banks.",
                },
                {
                  step: "3️⃣",
                  title: "Approval & Disbursement",
                  desc: "The loan is reviewed, approved, and disbursed by the bank or NBFC.",
                },
                {
                  step: "4️⃣",
                  title: "Instant Commission",
                  desc: "Your commission is credited promptly after successful disbursement.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl bg-gradient-to-br from-black via-neutral-900 to-neutral-700 border border-[#F97415]/20 p-6 hover:shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#F97415]/50"
                >
                  <p className="text-3xl mb-3 text-[#F97415]">{item.step}</p>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who Can Partner */}
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-4">
              <Users className="w-4 h-4 text-[#F97415]" />
              <span className="text-sm font-medium text-gray-700">Eligibility</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              👥 Who Can Become a{" "}
              <span className="text-[#F97415]">Loan Partner?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              We welcome all professionals and entrepreneurs from diverse
              backgrounds.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Loan DSAs / Channel Partners",
                "Financial Consultants and Advisors",
                "Insurance Advisors and POS Agents",
                "Real Estate Brokers and Property Consultants",
                "Chartered Accountants and Tax Consultants",
                "Business Owners and Entrepreneurs",
                "Working Professionals (Any Industry)",
                "Sales and Marketing Professionals",
                "Self-Employed Individuals and Freelancers",
                "Digital Marketers and Lead Generators",
                "Telecallers and Field Executives",
                "Students (Part-Time Opportunity)",
                "Homemakers Looking for Flexible Income",
                "Retired Professionals",
                "Anyone Looking to Generate Additional Income",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-4 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-neutral-700 border border-[#F97415]/20 hover:shadow-lg transition-all hover:border-[#F97415]/50"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#F97415] flex-shrink-0 mt-1" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8 text-sm">
              📌 No prior experience in loan processing is mandatory. Training
              and partner support are provided.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Support Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Security */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  🔒 Secure & Transparent
                </h2>
                <div className="space-y-4">
                  {[
                    "Advanced Data Privacy and Security",
                    "Clear and Fair Commission Policy",
                    "Zero Hidden Charges",
                    "Dedicated Relationship Manager",
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#F97415] flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  📞 Partner Support
                </h2>
                <p className="text-gray-400 mb-6">
                  Our dedicated partner support team is here to assist you at
                  every stage of your journey.
                </p>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <span className="font-semibold">📲 Call / WhatsApp:</span>{" "}
                    {process.env.NEXT_PUBLIC_PARTNER_SUPPORT_PHONE || "+91-9579880841"}
                  </p>
                  <p>
                    <span className="font-semibold">📧 Email:</span>{" "}
                    {process.env.NEXT_PUBLIC_PARTNER_SUPPORT_EMAIL || "partners@infinityloanservices.com"}
                  </p>
                  <p>
                    <span className="font-semibold">⏰ Support Hours:</span>{" "}
                    {process.env.NEXT_PUBLIC_PARTNER_SUPPORT_HOURS || "Monday to Saturday | 10:00 AM – 7:00 PM"}
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Disclaimer */}
            <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold mb-4">✅ Compliance Disclaimer</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We are a loan distribution and facilitation platform and do not
                provide loans directly. We are not a bank or a Non-Banking
                Financial Company (NBFC). All loan products, approvals, interest
                rates, fees, and disbursements are offered solely at the
                discretion of the respective banks or NBFCs and are subject to
                their policies, eligibility criteria, terms, and conditions. We
                do not guarantee loan approval, interest rates, or disbursement
                timelines. Final decisions rest entirely with the respective
                lending institutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}