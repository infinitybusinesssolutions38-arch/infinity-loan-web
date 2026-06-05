"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  Banknote,
  Building2,
  CreditCard,
  Users,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import UserAccountMenu from "@/components/account/UserAccountMenu";

const SERVICES_DROPDOWN_ITEMS = [
  { key: "salaried-employees", title: "Loan Offers for Salaried Employees", icon: Users },
  { key: "businesses", title: "Smart Loan & Funding Solutions for All Businesses", icon: Banknote },
  { key: "professionals", title: "Smart Loan & Funding Solutions for All Professionals", icon: Briefcase },
  { key: "govt-employees", title: "Smart Loan & Funding Solutions for Government Employees", icon: Building2 },
  { key: "government-schemes", title: "End-to-End Financing Support for Government Schemes", icon: Building2 },
  { key: "builders-developers", title: "Smart Loan & Project Funding Solutions for Builders", icon: Building2 },
  { key: "credit-cards", title: "Credits & Cards", icon: CreditCard },
] as const;

const CALCULATORS_DROPDOWN_ITEMS = [
  { href: "/emi-calculator", title: "EMI Calculator" },
  { href: "/obligation-calculator", title: "Obligation Calculator" },
  { href: "/abb-calculator", title: "ABB Calculator" },
] as const;

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isCalculatorsDropdownOpen, setIsCalculatorsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const syncAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setIsLoggedIn(Boolean(data?.user));
    } catch {
      const token = localStorage.getItem("token");
      setIsLoggedIn(Boolean(token));
    }
  }, []);

  useEffect(() => {
    syncAuth();

    const onAuthChange = () => syncAuth();
    window.addEventListener("storage", onAuthChange);
    window.addEventListener("auth-change", onAuthChange);
    return () => {
      window.removeEventListener("storage", onAuthChange);
      window.removeEventListener("auth-change", onAuthChange);
    };
  }, [syncAuth]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsCalculatorsDropdownOpen(false);
  };

  const navLinkClass = (active: boolean) =>
    `relative px-1 py-2 text-[15px] font-medium tracking-wide transition-all duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:bg-[#00AEEF] after:transition-all after:duration-300 after:ease-out ${
      active
        ? "text-[#00AEEF] after:w-full"
        : "text-[#374151] hover:text-[#00AEEF] after:w-0 hover:after:w-full"
    }`;

  const dropdownTriggerClass =
    "relative flex cursor-pointer items-center gap-1 px-1 py-2 text-[15px] font-medium tracking-wide text-[#374151] transition-all duration-300 ease-out hover:text-[#00AEEF]";

  const ctaOutlineClass =
    "inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#00AEEF] bg-transparent px-5 text-sm font-semibold text-[#00AEEF] transition-all duration-300 ease-out hover:bg-[#00AEEF] hover:text-white";

  const ctaPrimaryClass =
    "inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#00AEEF] bg-[#00AEEF] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#008FCC] hover:border-[#008FCC] hover:shadow-md";

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ease-out ${
          isScrolled
            ? "border-[#D6EEF8] bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.08)]"
            : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-6 lg:px-8 xl:px-10">
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-all duration-300 ease-out hover:opacity-95"
            aria-label="Infinity Loans & Business Solutions — Home"
          >
            <Image
              src="/infinity-logo.png"
              alt="Infinity Loans & Business Solutions"
              width={88}
              height={104}
              className="h-12 w-auto object-contain object-left sm:h-[3.25rem]"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-7 xl:gap-9">
              <li>
                <Link href="/" className={navLinkClass(pathname === "/")}>
                  Home
                </Link>
              </li>
              <li className="group relative">
                <span 
                  className={dropdownTriggerClass}
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                >
                  Our Services
                  <ChevronDown className="h-4 w-4 opacity-60 transition-all duration-300 ease-out group-hover:rotate-180" />
                </span>
                <div 
                  className={`absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 transition-all duration-300 ease-out ${
                    isServicesDropdownOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <div className="w-[min(720px,calc(100vw-2rem))] rounded-2xl border border-[#D6EEF8] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {SERVICES_DROPDOWN_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.key}
                            href={`/services?category=${item.key}`}
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[#374151] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                          >
                            <Icon className="h-4 w-4 shrink-0 text-[#00AEEF]" />
                            <span className="leading-snug">{item.title}</span>
                          </Link>
                        );
                      })}
                      <Link
                        href="/services"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="mt-1 inline-flex items-center rounded-xl border border-[#00AEEF]/20 bg-[#E6F7FD] px-3 py-2.5 font-semibold text-[#00AEEF] transition-colors duration-200 hover:bg-[#B3E8FA]"
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/about-us" className={navLinkClass(pathname === "/about-us")}>
                  About-us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={navLinkClass(pathname === "/contact")}>
                  Contact
                </Link>
              </li>
              <li className="group relative">
                <span className={dropdownTriggerClass}>
                  Calculators
                  <ChevronDown className="h-4 w-4 opacity-60 transition-all duration-300 ease-out group-hover:rotate-180" />
                </span>
                <div className="pointer-events-none absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-[#D6EEF8] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {CALCULATORS_DROPDOWN_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[#374151] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                        >
                          <span className="leading-snug">{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/join-us" className={navLinkClass(pathname === "/join-us")}>
                  Join Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {isLoggedIn ? (
              <UserAccountMenu />
            ) : (
              <>
                <Link href="/login" className={ctaOutlineClass}>
                  Login
                </Link>
                <Link href="/register" className={ctaPrimaryClass}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            {isLoggedIn ? <UserAccountMenu /> : null}
            <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6EEF8] text-[#00AEEF] transition-all duration-300 ease-out hover:border-[#00AEEF]/30 hover:bg-[#F7F9FC] lg:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`fixed inset-0 bg-[#1A1A1A]/32 transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />
        <div
          className={`fixed right-0 top-0 flex h-full w-[min(340px,92vw)] flex-col overflow-hidden border-l border-[#D6EEF8] bg-white shadow-[-8px_0_32px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#D6EEF8] px-5">
            <h2 className="text-base font-semibold text-[#1A1A1A]">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#374151] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-5">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                  pathname === "/"
                    ? "bg-[#E6F7FD] text-[#00AEEF]"
                    : "text-[#374151] hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                }`}
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#374151] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                >
                  <span>Our Services</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isServicesDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isServicesDropdownOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-1 space-y-1 border-l-2 border-[#E6F7FD] pl-3">
                    {SERVICES_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.key}
                          href={`/services?category=${item.key}`}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#666666] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                        >
                          <Icon className="h-4 w-4 shrink-0 text-[#00AEEF]" />
                          <span className="leading-snug">{item.title}</span>
                        </Link>
                      );
                    })}
                    <Link
                      href="/services"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2.5 text-sm font-semibold text-[#00AEEF]"
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/about-us"
                onClick={closeMobileMenu}
                className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                  pathname === "/about-us"
                    ? "bg-[#E6F7FD] text-[#00AEEF]"
                    : "text-[#374151] hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                  pathname === "/contact"
                    ? "bg-[#E6F7FD] text-[#00AEEF]"
                    : "text-[#374151] hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                }`}
              >
                Contact
              </Link>

              <div>
                <button
                  onClick={() => setIsCalculatorsDropdownOpen(!isCalculatorsDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#374151] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                >
                  <span>Calculators</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isCalculatorsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isCalculatorsDropdownOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-1 space-y-1 border-l-2 border-[#E6F7FD] pl-3">
                    {CALCULATORS_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl px-3 py-2.5 text-sm text-[#666666] transition-colors duration-200 hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/join-us"
                onClick={closeMobileMenu}
                className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                  pathname === "/join-us"
                    ? "bg-[#E6F7FD] text-[#00AEEF]"
                    : "text-[#374151] hover:bg-[#F7F9FC] hover:text-[#00AEEF]"
                }`}
              >
                Join Us
              </Link>
            </nav>

            <div className="mt-auto space-y-3 border-t border-[#D6EEF8] pt-6">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className={`block w-full text-center ${ctaOutlineClass}`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className={`block w-full text-center ${ctaPrimaryClass}`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
