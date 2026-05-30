"use client";

import { Mail, Phone, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function normalizePhoneTel(phone: string) {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
}

function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, "");
}

const iconLinkClass =
  "group relative flex cursor-pointer items-center justify-center text-gray-600 transition-colors hover:bg-[#0099D8]/10 hover:text-[#0099D8]";

const tooltipClass =
  "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 opacity-0 shadow-lg ring-1 ring-gray-100 transition-opacity group-hover:opacity-100";

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
  const callbackHref = "/contact";

  return (
    <>
      {/* Desktop: vertical on right side */}
      <div className="hidden md:flex fixed right-3 top-1/2 z-[60] -translate-y-1/2">
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-xl">
          <a
            href={telHref}
            aria-label="Call us"
            className={`${iconLinkClass} h-12 w-12 rounded-t-2xl`}
          >
            <span className={tooltipClass}>
              Talk to a Financial Expert
            </span>
            <Phone className="h-5 w-5" />
          </a>
          <div className="h-px w-full bg-gray-200" />
          <a
            href={callbackHref}
            aria-label="Request a call back"
            className={`${iconLinkClass} h-12 w-12`}
          >
            <span className={tooltipClass}>
              Request a Call Back
            </span>
            <PhoneCall className="h-5 w-5" />
          </a>
          <div className="h-px w-full bg-gray-200" />
          <a
            href={mailHref}
            aria-label="Email us"
            className={`${iconLinkClass} h-12 w-12`}
          >
            <span className={tooltipClass}>
              Email Us
            </span>
            <Mail className="h-5 w-5" />
          </a>
          <div className="h-px w-full bg-gray-200" />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className={`${iconLinkClass} h-12 w-12 rounded-b-2xl`}
          >
            <span className={tooltipClass}>
              Chat with a Loan Expert on WhatsApp
            </span>
            <FaWhatsapp className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Mobile: horizontal at bottom */}
      <div className="flex md:hidden fixed bottom-4 right-4 z-[60] left-4">
        <div className="flex rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <a
            href={telHref}
            aria-label="Call us"
            className={`${iconLinkClass} h-11 w-11 flex-1`}
          >
            <Phone className="h-5 w-5" />
          </a>
          <div className="w-px bg-gray-200" />
          <a
            href={callbackHref}
            aria-label="Request a call back"
            className={`${iconLinkClass} h-11 w-11 flex-1`}
          >
            <PhoneCall className="h-5 w-5" />
          </a>
          <div className="w-px bg-gray-200" />
          <a
            href={mailHref}
            aria-label="Email us"
            className={`${iconLinkClass} h-11 w-11 flex-1`}
          >
            <Mail className="h-5 w-5" />
          </a>
          <div className="w-px bg-gray-200" />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className={`${iconLinkClass} h-11 w-11 flex-1`}
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </>
  );
}
