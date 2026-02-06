"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Banknote,
  Building2,
  Car,
  CreditCard,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  PiggyBank,
  Shield,
  Calculator,
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
                <div className="w-[min(1100px,calc(100vw-2rem))] rounded-2xl bg-white p-6 shadow-2xl border border-[#F97415]/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="grid grid-cols-5 gap-6 text-sm normal-case">
                    <div className="space-y-2">
                      <h4 className="font-bold mb-3 text-[#F97415] text-base">Loans</h4>
                      <Link href="/business-loan" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Building2 className="h-4 w-4 text-[#F97415]" />
                        Business Loan
                      </Link>
                      <Link href="/personal-loan" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Banknote className="h-4 w-4 text-[#F97415]" />
                        Personal Loan
                      </Link>
                      <Link href="/home-property-loan" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Home className="h-4 w-4 text-[#F97415]" />
                        Home & Property Loans
                      </Link>
                      <Link href="/vehicle-loan" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Car className="h-4 w-4 text-[#F97415]" />
                        Vehicle Loans
                      </Link>
                      <Link href="/gold-asset-loan" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <PiggyBank className="h-4 w-4 text-[#F97415]" />
                        Gold & Asset-Backed Loans
                      </Link>

                      <div className="pt-2">
                        <Link href="/services" className="inline-flex items-center rounded-lg border border-[#F97415]/20 bg-orange-50 px-3 py-2 font-semibold text-[#F97415] transition-all duration-200 hover:bg-orange-100">
                          View All Services
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold mb-3 text-[#F97415] text-base">Insurance</h4>
                      <Link href="/services/insurance" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Shield className="h-4 w-4 text-[#F97415]" />
                        Life Insurance
                      </Link>
                      <Link href="/services/insurance" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <HeartPulse className="h-4 w-4 text-[#F97415]" />
                        Health Insurance
                      </Link>
                      <Link href="/services/insurance" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Car className="h-4 w-4 text-[#F97415]" />
                        Motor Insurance
                      </Link>
                      <Link href="/services/insurance" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Home className="h-4 w-4 text-[#F97415]" />
                        Home Insurance
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold mb-3 text-[#F97415] text-base">Credit & Cards</h4>
                      <Link href="/services/credit-cards" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <CreditCard className="h-4 w-4 text-[#F97415]" />
                        Credit Line / Flexi Loan
                      </Link>
                      <Link href="/services/credit-cards" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Building2 className="h-4 w-4 text-[#F97415]" />
                        Business Credit Card
                      </Link>
                      <Link href="/services/credit-cards" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <CreditCard className="h-4 w-4 text-[#F97415]" />
                        Personal Credit Card
                      </Link>
                      <Link href="/services/credit-cards" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <GraduationCap className="h-4 w-4 text-[#F97415]" />
                        BNPL
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold mb-3 text-[#F97415] text-base">Government Schemes</h4>
                      <Link href="/services/government-schemes" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Landmark className="h-4 w-4 text-[#F97415]" />
                        PM Mudra Loan
                      </Link>
                      <Link href="/services/government-schemes" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Landmark className="h-4 w-4 text-[#F97415]" />
                        Stand-Up India
                      </Link>
                      <Link href="/services/government-schemes" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Shield className="h-4 w-4 text-[#F97415]" />
                        CGTMSE Loan
                      </Link>
                      <Link href="/services/government-schemes" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Landmark className="h-4 w-4 text-[#F97415]" />
                        Jansamarth
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold mb-3 text-[#F97415] text-base">Tools</h4>
                      <Link href="/services/tools" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Calculator className="h-4 w-4 text-[#F97415]" />
                        EMI Calculator
                      </Link>
                      <Link href="/services/tools" className="flex items-center gap-2 py-2 px-2 rounded-md transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415] hover:translate-x-1">
                        <Banknote className="h-4 w-4 text-[#F97415]" />
                        Eligibility Checker
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