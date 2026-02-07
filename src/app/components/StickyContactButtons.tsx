"use client";

import { Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";

function normalizePhoneTel(phone: string) {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
}

function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, "");
}

export default function StickyContactButtons() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+919999999999";
  const whatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "919999999999";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "business@infinityloanservices.com";
  const whatsappMessage =
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_MESSAGE ??
    "Hi, I need help with a loan.";

  const telHref = `tel:${normalizePhoneTel(phone)}`;
  const whatsappHref = `https://wa.me/${normalizeWhatsappNumber(whatsapp)}?text=${encodeURIComponent(whatsappMessage)}`;
  const mailHref = `mailto:${email}`;
  const callbackHref = "/contact";

  return (
    <div className="fixed right-3 top-1/2 z-[60] -translate-y-1/2">
      <div className="flex flex-col rounded-2xl border border-white/10 bg-gray-950/90 shadow-2xl backdrop-blur">
        <a
          href={telHref}
          aria-label="Call us"
          className="group relative flex cursor-pointer h-12 w-12 items-center justify-center rounded-t-2xl text-white/90 transition-colors hover:bg-white/10 hover:text-[#f97415]"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
            Talk to a Financial Expert
          </span>
          <Phone className="h-5 w-5" />
        </a>
        <div className="h-px w-full bg-white/10" />
        <a
          href={callbackHref}
          aria-label="Request a call back"
          className="group relative flex cursor-pointer h-12 w-12 items-center justify-center text-white/90 transition-colors hover:bg-white/10 hover:text-[#f97415]"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
            Request a Call Back
          </span>
          <PhoneCall className="h-5 w-5" />
        </a>
        <div className="h-px w-full bg-white/10" />
        <a
          href={mailHref}
          aria-label="Email us"
          className="group relative flex cursor-pointer h-12 w-12 items-center justify-center text-white/90 transition-colors hover:bg-white/10 hover:text-[#f97415]"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
            Email Us
          </span>
          <Mail className="h-5 w-5" />
        </a>
        <div className="h-px w-full bg-white/10" />
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex cursor-pointer h-12 w-12 items-center justify-center rounded-b-2xl text-white/90 transition-colors hover:bg-white/10 hover:text-[#f97415]"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
            Chat with a Loan Expert on WhatsApp
          </span>
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
