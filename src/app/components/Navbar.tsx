"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
    title: "Smart Loan & Funding Solutions for All Businesses",
    icon: Banknote,
  },
  {
    key: "professionals",
    title: "Smart Loan & Funding Solutions for All Professionals",
    icon: Briefcase,
  },
  {
    key: "govt-employees",
    title: "Smart Loan & Funding Solutions for Central & State Government Employees",
    icon: Building2,
  },
  {
    key: "government-schemes",
    title: "End-to-End Financing Support for Central & State Government Schemes",
    icon: Building2,
  },
  {
    key: "builders-developers",
    title: "Smart Loan & Project Funding Solutions for Builders & Developers",
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
                <div className="w-[min(720px,calc(100vw-2rem))] rounded-2xl bg-white p-5 shadow-2xl border border-[#F97415]/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="grid grid-cols-1 gap-2 text-sm normal-case sm:grid-cols-2">
                    {SERVICES_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.key}
                          href={`/services?category=${item.key}`}
                          className="flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 hover:bg-orange-50 hover:text-[#F97415]"
                        >
                          <Icon className="h-4 w-4 text-[#F97415]" />
                          <span className="leading-snug">{item.title}</span>
                        </Link>
                      );
                    })}

                    <div className="sm:col-span-2 pt-2">
                      <Link
                        href="/services"
                        className="inline-flex items-center rounded-lg border border-[#F97415]/20 bg-orange-50 px-3 py-2 font-semibold text-[#F97415] transition-all duration-200 hover:bg-orange-100"
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
            <li>
              <Link
                href="/emi-calculator"
                className={navLinkClass(pathname === "/emi-calculator")}
              >
                EMI Calculator
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