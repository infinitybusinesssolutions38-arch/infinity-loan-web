"use client";

import { Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function normalizePhoneTel(phone: string) {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
}

function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, "");
}

export default function StickyContactButtons() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+919579880841";
  const whatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "919579880841";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "business@infinityloanservices.com";
  const whatsappMessage =
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_MESSAGE ??
    "Hi, I need help with a loan.";

  const telHref = `tel:${normalizePhoneTel(phone)}`;
  const whatsappHref = `https://wa.me/${normalizeWhatsappNumber(whatsapp)}?text=${encodeURIComponent(whatsappMessage)}`;
  const mailHref = `mailto:${email}`;
  const callbackHref = "/contact#contactForm";

  return (
    <div className="fixed right-3 top-1/2 z-[60] -translate-y-1/2">
      <div className="flex flex-col rounded-[20px] border border-[#D6EEF8] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.10)]">
        <a
          href={telHref}
          aria-label="Call us"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-t-[20px] text-[#1A1A1A] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:text-[#00AEEF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-[#D6EEF8] bg-white px-3 py-1.5 text-xs font-medium text-[#1A1A1A] opacity-0 shadow-[0_8px_24px_rgba(15,23,42,0.10)] transition-all duration-300 ease-out group-hover:opacity-100">
            Talk to a Financial Expert
          </span>
          <Phone className="h-5 w-5" />
        </a>
        <div className="h-px w-full bg-[#D6EEF8]" />
        <a
          href={callbackHref}
          aria-label="Request a call back"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#1A1A1A] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:text-[#00AEEF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-[#D6EEF8] bg-white px-3 py-1.5 text-xs font-medium text-[#1A1A1A] opacity-0 shadow-[0_8px_24px_rgba(15,23,42,0.10)] transition-all duration-300 ease-out group-hover:opacity-100">
            Request a Call Back
          </span>
          <PhoneCall className="h-5 w-5" />
        </a>
        <div className="h-px w-full bg-[#D6EEF8]" />
        <a
          href={mailHref}
          aria-label="Email us"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#1A1A1A] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:text-[#00AEEF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-[#D6EEF8] bg-white px-3 py-1.5 text-xs font-medium text-[#1A1A1A] opacity-0 shadow-[0_8px_24px_rgba(15,23,42,0.10)] transition-all duration-300 ease-out group-hover:opacity-100">
            Email Us
          </span>
          <Mail className="h-5 w-5" />
        </a>
        <div className="h-px w-full bg-[#D6EEF8]" />
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-b-[20px] text-[#1A1A1A] transition-all duration-300 ease-out hover:bg-[#E6F7FD] hover:text-[#00AEEF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl border border-[#D6EEF8] bg-white px-3 py-1.5 text-xs font-medium text-[#1A1A1A] opacity-0 shadow-[0_8px_24px_rgba(15,23,42,0.10)] transition-all duration-300 ease-out group-hover:opacity-100">
            Chat with a Loan Expert on WhatsApp
          </span>
          <FaWhatsapp className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
