"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import {
  Briefcase,
  Banknote,
  Building2,
  CreditCard,
  Users,
} from "lucide-react";

const SERVICES_DROPDOWN_ITEMS = [
  {
    key: "salaried-employees",
    title: "Loan Offers for Salaried Employees",
    icon: Users,
  },
  {
    key: "businesses",
    title: "Smart Loan & Funding Solutions for All Businesses — Proprietorships, Mid-Sized SMEs, Industrial Enterprises, and Corporates",
    icon: Banknote,
  },
  {
    key: "professionals",
    title: "Smart Loan & Funding Solutions for All Professionals — Doctors, Chartered Accountants, Architects, Engineers, Lawyers, Consultants, and Self-Employed Professionals",
    icon: Briefcase,
  },
  {
    key: "govt-employees",
    title: "Smart Loan & Funding Solutions for Central & State Government Employees — Civil Services, Public Sector Staff, Defence Personnel, and Other Government Employees",
    icon: Building2,
  },
  {
    key: "government-schemes",
    title: "End-to-End Financing Support for Central & State Government Schemes",
    icon: Building2,
  },
  {
    key: "builders-developers",
    title: " Smart Loan & Project Funding Solutions for Builders & Developers",
    icon: Building2,
  },
  {
    key: "credit-cards",
    title: "Credits & Cards",
    icon: CreditCard,
  },
] as const;

const Navbar = () => {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isServicesActive = pathname === "/services";

  const getTokenExpiryMs = (token: string): number | null => {
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;

      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
      const json = JSON.parse(atob(padded));
      if (!json || typeof json.exp !== "number") return null;
      return json.exp * 1000;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let logoutTimer: number | null = null;

    const sync = () => {
      if (logoutTimer) {
        window.clearTimeout(logoutTimer);
        logoutTimer = null;
      }

      try {
        const token = localStorage.getItem("token");
        setIsLoggedIn(Boolean(token));

        if (token) {
          const expMs = getTokenExpiryMs(token);
          if (expMs) {
            const msLeft = expMs - Date.now();
            if (msLeft <= 0) {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              return;
            }

            logoutTimer = window.setTimeout(async () => {
              try {
                await fetch("/api/logout", { method: "POST" });
              } catch {
                // ignore
              } finally {
                try {
                  localStorage.removeItem("token");
                } catch {
                  // ignore
                }
                setIsLoggedIn(false);
                window.location.href = "/login";
              }
            }, msLeft);
          }
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    sync();
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("storage", sync);
      if (logoutTimer) {
        window.clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      try {
        localStorage.removeItem("token");
      } catch {
        // ignore
      }
      setIsLoggedIn(false);
      setIsMobileMenuOpen(false);
      window.location.href = "/login";
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    `inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold uppercase no-underline transition-all duration-300 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0099D8]/40 ${
      active
        ? "!bg-[#0099D8]/10 text-[#0099D8] shadow-sm"
        : "bg-transparent text-gray-700 hover:!bg-[#0099D8]/10 hover:text-[#0099D8] hover:shadow-sm"
    }`;

  const navButtonClass = (active: boolean) =>
    `inline-flex cursor-pointer items-center rounded-full border-0 px-4 py-2 text-sm font-semibold uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0099D8]/40 ${
      active
        ? "bg-[#0099D8]/10 text-[#0099D8] shadow-sm"
        : "bg-transparent text-gray-700 hover:bg-[#0099D8]/10 hover:text-[#0099D8] hover:shadow-sm"
    }`;

  const headerSurfaceClass = isScrolled
    ? "bg-white/95 shadow-md border-b border-gray-200 backdrop-blur-xl"
    : "bg-white/90 shadow-sm backdrop-blur-lg";

  const innerBarClass = isScrolled ? "bg-white/80" : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ease-in-out ${headerSurfaceClass}`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:block w-full py-2 px-3">
          <div
            className={`navbar mx-auto w-full max-w-full overflow-visible rounded-xl px-0 py-0 transition-all duration-300 ease-in-out ${innerBarClass}`}
          >
            {/* LOGO */}
            <Link
              href="/"
              className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-12 w-[180px] rounded-lg bg-white/80 shadow-sm backdrop-blur sm:h-20 sm:w-[210px]">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  sizes="(max-width: 640px) 180px, 210px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="flex-1 flex justify-center overflow-visible">
              <ul className="menu menu-horizontal gap-1 uppercase font-semibold text-gray-700 overflow-visible">
                <li>
                  <Link href="/" className={navLinkClass(pathname === "/")}>
                    Home
                  </Link>
                </li>

                <li className="group relative z-[10001]">
                  <button
                    type="button"
                    aria-haspopup="true"
                    className={`${navButtonClass(isServicesActive)} group-hover:bg-[#0099D8]/10 group-hover:text-[#0099D8] group-hover:shadow-sm`}
                  >
                    Our Services
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-full z-[10002] hidden w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 pt-3 group-hover:pointer-events-auto group-hover:block">
                    <div className="services-dropdown-panel w-full rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-2xl shadow-[#0099D8]/10 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="grid grid-cols-1 gap-2 text-sm normal-case">
                        {SERVICES_DROPDOWN_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.key}
                              href={`/services?category=${item.key}`}
                              className="services-dropdown-item group/item flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white px-3 py-2.5 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0099D8]/30 hover:bg-[#0099D8]/5 hover:text-[#0099D8] hover:shadow-sm"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#0099D8]/15 bg-[#0099D8]/10 transition-all duration-300 group-hover/item:scale-105 group-hover/item:border-[#0099D8]/30">
                                <Icon className="h-3.5 w-3.5 text-[#0099D8]" />
                              </span>
                              <span className="leading-snug">{item.title}</span>
                            </Link>
                          );
                        })}

                        <div className="services-dropdown-item pt-1">
                          <Link
                            href="/services"
                            className="inline-flex items-center rounded-lg border border-[#0099D8]/25 bg-[#0099D8]/10 px-3 py-2 text-sm font-semibold text-[#0099D8] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0099D8]/40 hover:bg-[#0099D8]/15 hover:shadow-sm"
                          >
                            View All Services
                          </Link>
                        </div>
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

                <li className="group relative z-[10001]">
                  <span className={`${navButtonClass(false)} group-hover:bg-[#0099D8]/10 group-hover:text-[#0099D8] group-hover:shadow-sm`}>
                    Calculator
                  </span>

                  <div className="pointer-events-none absolute top-full left-1/2 z-[10002] hidden -translate-x-1/2 pt-4 group-hover:pointer-events-auto group-hover:block">
                    <div className="w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="grid grid-cols-1 gap-1 text-sm normal-case">
                        <Link
                          href="/emi-calculator"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-[#0099D8]"
                        >
                          EMI Calculator
                        </Link>
                        <Link
                          href="/obligation-calculator"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-[#0099D8]"
                        >
                          Obligation Calculator
                        </Link>
                        <Link
                          href="/abb-calculator"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-[#0099D8]"
                        >
                          ABB Calculator
                        </Link>
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
            </div>

            {/* DESKTOP RIGHT */}
            <div className="flex shrink-0 items-center gap-2 mx-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="btn btn-md rounded-full border border-[#0099D8]/40 bg-[#0099D8]/10 text-[#0099D8] transition-all duration-300 hover:bg-[#0099D8]/15 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-md rounded-full border-none bg-[#0099D8] text-white transition-all duration-300 hover:bg-[#0099D8]/90 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn btn-md rounded-full border-none bg-[#0099D8] text-white transition-all duration-300 hover:bg-[#0099D8]/90 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn btn-md rounded-full border border-[#0099D8]/40 bg-[#0099D8]/10 text-[#0099D8] transition-all duration-300 hover:bg-[#0099D8]/15 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="relative md:hidden w-full">
          <div
            className={`px-4 py-3 transition-all duration-300 ease-in-out ${
              isScrolled ? "bg-white/95 shadow-md border-b border-gray-200" : "bg-white shadow-sm"
            } backdrop-blur-lg`}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-10 w-[140px] rounded-lg bg-white/80 shadow-sm backdrop-blur">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    fill
                    sizes="140px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:text-[#0099D8] hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu-container absolute left-0 right-0 top-full z-[9999] max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-200 bg-white shadow-xl">
              <div className="px-4 py-6">
                <nav className="space-y-4">
                  <div className="space-y-3">
                    <Link
                      href="/"
                      onClick={closeMobileMenu}
                      className={`block py-3 text-base font-medium text-gray-700 hover:text-[#0099D8] transition-colors ${
                        pathname === "/" ? "text-[#0099D8]" : ""
                      }`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/about-us"
                      onClick={closeMobileMenu}
                      className={`block py-3 text-base font-medium text-gray-700 hover:text-[#0099D8] transition-colors ${
                        pathname === "/about-us" ? "text-[#0099D8]" : ""
                      }`}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className={`block py-3 text-base font-medium text-gray-700 hover:text-[#0099D8] transition-colors ${
                        pathname === "/contact" ? "text-[#0099D8]" : ""
                      }`}
                    >
                      Contact
                    </Link>
                    <Link
                      href="/join-us"
                      onClick={closeMobileMenu}
                      className={`block py-3 text-base font-medium text-gray-700 hover:text-[#0099D8] transition-colors ${
                        pathname === "/join-us" ? "text-[#0099D8]" : ""
                      }`}
                    >
                      Join Us
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Our Services</p>
                    <div className="space-y-2.5">
                      {SERVICES_DROPDOWN_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.key}
                            href={`/services?category=${item.key}`}
                            onClick={closeMobileMenu}
                            className="group flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white px-3 py-2.5 text-gray-700 transition-all duration-300 hover:border-[#0099D8]/30 hover:bg-[#0099D8]/5 hover:text-[#0099D8]"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#0099D8]/15 bg-[#0099D8]/10">
                              <Icon className="h-4 w-4 text-[#0099D8]" />
                            </span>
                            <span className="text-sm leading-snug">{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/services"
                      onClick={closeMobileMenu}
                      className="inline-flex items-center rounded-lg border border-[#0099D8]/30 bg-[#0099D8]/10 px-4 py-3 mt-3 font-semibold text-[#0099D8] transition-all duration-200 hover:bg-[#0099D8]/15"
                    >
                      View All Services
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Calculators</p>
                    <div className="space-y-2">
                      <Link
                        href="/emi-calculator"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#0099D8] transition-all duration-200"
                      >
                        EMI Calculator
                      </Link>
                      <Link
                        href="/obligation-calculator"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#0099D8] transition-all duration-200"
                      >
                        Obligation Calculator
                      </Link>
                      <Link
                        href="/abb-calculator"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#0099D8] transition-all duration-200"
                      >
                        ABB Calculator
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-3">
                      {isLoggedIn ? (
                        <>
                          <Link
                            href="/profile"
                            onClick={closeMobileMenu}
                            className="block w-full btn btn-md rounded-full border border-[#0099D8]/40 bg-[#0099D8]/10 text-[#0099D8] transition-all duration-300 hover:bg-[#0099D8]/15 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Profile
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              handleLogout();
                              closeMobileMenu();
                            }}
                            className="w-full btn btn-md rounded-full border-none bg-[#0099D8] text-white transition-all duration-300 hover:bg-[#0099D8]/90 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            onClick={closeMobileMenu}
                            className="block w-full btn btn-md rounded-full border-none bg-[#0099D8] text-white transition-all duration-300 hover:bg-[#0099D8]/90 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Login
                          </Link>
                          <Link
                            href="/register"
                            onClick={closeMobileMenu}
                            className="block w-full btn btn-md rounded-full border border-[#0099D8]/40 bg-[#0099D8]/10 text-[#0099D8] transition-all duration-300 hover:bg-[#0099D8]/15 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer so page content is never hidden behind the fixed navbar */}
      <div
        className="w-full shrink-0 h-16 md:h-24"
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
