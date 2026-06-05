"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    message: "",
  });
  const [agreedToContact, setAgreedToContact] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSkip = () => {
    setIsOpen(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToContact) {
      alert("Please agree to be contacted to proceed.");
      return;
    }

    try {
      const res = await fetch("/api/regular-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          agreedToContact,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Enquiry submitted successfully!");
        setIsOpen(false);
        setFormData({ name: "", phone: "", company: "", message: "" });
        setAgreedToContact(false);
      } else {
        alert(data.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Failed to submit enquiry");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/40">
      <div className="relative w-full max-w-[95vw] sm:max-w-[700px] lg:max-w-[760px] rounded-[20px] border border-[#D6EEF8] bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.18)] mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#666666] transition-colors duration-300 ease-out hover:bg-[#F7F9FC] hover:text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-xl font-bold text-[#1A1A1A]">
          Let Us Help You With the Right Solution
        </h2>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-3">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Your Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              rows={2}
              className="w-full"
            />
          </div>

          {/* Terms & Conditions text */}
          <p className="text-xs text-[#666666] leading-relaxed">
            By clicking Sign Up, you confirm that you have read and agree to our{" "}
            <Link href="/terms-of-services" className="text-[#00AEEF] hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-[#00AEEF] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Checkbox for contact consent */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="contact-consent"
              checked={agreedToContact}
              onChange={(e) => setAgreedToContact(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#D6EEF8] text-[#00AEEF] focus:ring-[#00AEEF]"
            />
            <label htmlFor="contact-consent" className="text-xs text-[#666666] leading-relaxed">
              By submitting this form, you agree to be contacted by us on WhatsApp / SMS / Email regarding your enquiry.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={handleSkip}
              variant="secondary"
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
