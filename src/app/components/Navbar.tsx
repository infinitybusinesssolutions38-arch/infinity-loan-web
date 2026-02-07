"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Banknote,
  Building2,
  Briefcase,
  Landmark,
  Users,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navLinkClass = (active: boolean) =>
    `relative py-2 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#F97415] after:transition-all after:duration-300 ${
      active ? "text-[#F97415] after:w-full" : "hover:text-[#F97415] after:w-0 hover:after:w-full"
    }`;

  return (
    <div className="sticky top-0 z-50 border-b border-[#F97415]/10 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="flex w-[150px] shrink-0 items-center transition-transform duration-300 hover:scale-105"
        >
          <Image src="/logo2.png" alt="logo" width={150} height={50} />
        </Link>

        {/* MENU  testing changes */}
        <div className="flex-1 flex justify-center">
          <ul className="menu menu-horizontal gap-6 uppercase font-semibold text-gray-800">
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
                Services
              </span>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block">
                <div className="w-[min(720px,calc(100vw-2rem))] rounded-2xl bg-white p-6 shadow-2xl border border-[#F97415]/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="grid grid-cols-1 gap-6 text-sm normal-case">
                    <div className="space-y-2">
                      {/* <h4 className="font-bold mb-3 text-[#F97415] text-base">Services</h4> */}
                      <Link href="/services?category=salaried-employees" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Users className="h-4 w-4 text-[#F97415]" />
                        Loan Offers for Salaried Employees
                      </Link>
                      <Link href="/services?category=businesses" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Banknote className="h-4 w-4 text-[#F97415]" />
                        Smart Loan & Funding Solutions for All Businesses
                      </Link>
                      <Link href="/services?category=professionals" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Briefcase className="h-4 w-4 text-[#F97415]" />
                        Smart Loan & Funding Solutions for All Professionals
                      </Link>
                      <Link href="/services?category=govt-employees" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Building2 className="h-4 w-4 text-[#F97415]" />
                        Smart Loan & Funding Solutions for Central & State Government Employees
                      </Link>
                      <Link href="/services?category=government-schemes" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Landmark className="h-4 w-4 text-[#F97415]" />
                        End-to-End Financing Support for Central & State Government Schemes
                      </Link>
                      <Link href="/services?category=builders-developers" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Building2 className="h-4 w-4 text-[#F97415]" />
                        Smart Loan & Project Funding Solutions for Builders & Developers
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

            <li>
              <Link
                href="/emi-calculator"
                className={navLinkClass(pathname === "/emi-calculator")}
              >
                EMI-Calculator
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0">
          <Link
            href="/login"
            className="btn btn-md border-none bg-[#F97415] text-white transition-all duration-300 hover:bg-[#F97415]/90 hover:shadow-lg hover:-translate-y-0.5"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;