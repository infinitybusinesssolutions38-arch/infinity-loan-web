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
      setIsMobileMenuOpen(false); // Close mobile menu on logout
      window.location.href = "/login";
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    `relative py-2 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F97415] after:transition-all after:duration-300 ${
      active ? "text-[#F97415] after:w-full" : "hover:text-[#F97415] after:w-0 hover:after:w-full"
    }`;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 w-full py-2 px-3">
        <div className="navbar mx-auto max-w-full rounded-xl bg-black/40 px-0 py-0 shadow-lg backdrop-blur-lg supports-[backdrop-filter]:bg-black/40">
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
          <div className="flex-1 flex justify-center">
            <ul className="menu menu-horizontal gap-6 uppercase font-semibold text-white/90">
              <li>
                <Link
                  href="/"
                  className={navLinkClass(pathname === "/")}
                >
                  Home
                </Link>
              </li>

              <li className="group relative">
                <span className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-[#F97415] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#F97415] after:transition-all after:duration-300 hover:after:w-full">
                  Our Services
                </span>

                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block">
                  <div className="w-[min(720px,calc(100vw-2rem))] rounded-2xl bg-black/95 p-5 shadow-2xl border border-white/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-lg">
                    <div className="grid grid-cols-1 gap-2 text-sm normal-case">
                      {SERVICES_DROPDOWN_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.key}
                            href={`/services?category=${item.key}`}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
                          >
                            <Icon className="h-4 w-4 text-[#F97415]" />
                            <span className="leading-snug">{item.title}</span>
                          </Link>
                        );
                      })}

                      <div className="pt-2">
                        <Link
                          href="/services"
                          className="inline-flex items-center rounded-lg border border-[#F97415]/30 bg-[#F97415]/10 px-3 py-2 font-semibold text-[#F97415] transition-all duration-200 hover:bg-[#F97415]/15"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/about-us"
                  className={navLinkClass(pathname === "/about-us")}
                >
                  About-us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className={navLinkClass(pathname === "/contact")}
                >
                  Contact
                </Link>
              </li>
              <li className="group relative">
                <span className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-[#F97415] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#F97415] after:transition-all after:duration-300 hover:after:w-full">
                  Calculator
                </span>

                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block">
                  <div className="w-56 rounded-2xl bg-black/95 p-2 shadow-2xl border border-white/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-lg">
                    <div className="grid grid-cols-1 gap-1 text-sm normal-case">
                      <Link
                        href="/emi-calculator"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
                      >
                        EMI Calculator
                      </Link>
                      <Link
                        href="/obligation-calculator"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
                      >
                        Obligation Calculator
                      </Link>
                      <Link
                        href="/abb-calculator"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
                      >
                        ABB Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/join-us"
                  className={navLinkClass(pathname === "/join-us")}
                >
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
                  className="btn btn-md border border-[#F97415]/40 bg-[#F97415]/10 text-white transition-all duration-300 hover:bg-[#F97415]/15 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-md border-none bg-[#F97415] text-white transition-all duration-300 hover:bg-[#F97415]/90 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-md border-none bg-[#F97415] text-white transition-all duration-300 hover:bg-[#F97415]/90 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-md border border-[#F97415]/40 bg-[#F97415]/10 text-white transition-all duration-300 hover:bg-[#F97415]/15 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 w-full">
        <div className="bg-black/95 backdrop-blur-lg px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* MOBILE LOGO */}
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

            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-container fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg shadow-xl">
            <div className="px-4 py-6">
              <nav className="space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-3">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className={`block py-3 text-base font-medium text-white/90 hover:text-white transition-colors ${
                      pathname === "/" ? "text-[#F97415]" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about-us"
                    onClick={closeMobileMenu}
                    className={`block py-3 text-base font-medium text-white/90 hover:text-white transition-colors ${
                      pathname === "/about-us" ? "text-[#F97415]" : ""
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className={`block py-3 text-base font-medium text-white/90 hover:text-white transition-colors ${
                      pathname === "/contact" ? "text-[#F97415]" : ""
                    }`}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/join-us"
                    onClick={closeMobileMenu}
                    className={`block py-3 text-base font-medium text-white/90 hover:text-white transition-colors ${
                      pathname === "/join-us" ? "text-[#F97415]" : ""
                    }`}
                  >
                    Join Us
                  </Link>
                </div>

                {/* Mobile Services Dropdown */}
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm font-semibold text-white mb-3">Our Services</p>
                  <div className="space-y-2">
                    {SERVICES_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.key}
                          href={`/services?category=${item.key}`}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200"
                        >
                          <Icon className="h-5 w-5 text-[#F97415] flex-shrink-0" />
                          <span className="text-sm leading-snug">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/services"
                    onClick={closeMobileMenu}
                    className="inline-flex items-center rounded-lg border border-[#F97415]/30 bg-[#F97415]/10 px-4 py-3 mt-3 font-semibold text-[#F97415] transition-all duration-200 hover:bg-[#F97415]/15"
                  >
                    View All Services
                  </Link>
                </div>

                {/* Mobile Calculator Links */}
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm font-semibold text-white mb-3">Calculators</p>
                  <div className="space-y-2">
                    <Link
                      href="/emi-calculator"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      EMI Calculator
                    </Link>
                    <Link
                      href="/obligation-calculator"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      Obligation Calculator
                    </Link>
                    <Link
                      href="/abb-calculator"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      ABB Calculator
                    </Link>
                  </div>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="border-t border-white/20 pt-4">
                  <div className="space-y-3">
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/profile"
                          onClick={closeMobileMenu}
                          className="block w-full btn btn-md border border-[#F97415]/40 bg-[#F97415]/10 text-white transition-all duration-300 hover:bg-[#F97415]/15 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                          className="w-full btn btn-md border-none bg-[#F97415] text-white transition-all duration-300 hover:bg-[#F97415]/90 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={closeMobileMenu}
                          className="block w-full btn btn-md border-none bg-[#F97415] text-white transition-all duration-300 hover:bg-[#F97415]/90 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          onClick={closeMobileMenu}
                          className="block w-full btn btn-md border border-[#F97415]/40 bg-[#F97415]/10 text-white transition-all duration-300 hover:bg-[#F97415]/15 hover:shadow-lg hover:-translate-y-0.5"
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
    </>
  );
};

export default Navbar;
