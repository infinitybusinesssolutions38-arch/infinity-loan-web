"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setIsAuthenticated(!!res.data?.user);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", null, { withCredentials: true });
    } finally {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="navbar bg-white sticky top-0 z-50 shadow-sm px-6 border-b border-gray-100">
      {/* LOGO */}
      <Link href="/" className="flex items-center w-[150px] shrink-0 transition-transform duration-300 hover:scale-105">
        <Image src="/logo2.png" alt="logo" width={150} height={50} />
      </Link>

      {/* MENU */}
      <div className="flex-1 flex justify-center">
        <ul className="menu menu-horizontal gap-6 uppercase font-semibold">

          {/* LOANS – MEGA MENU */}
          <li className="group relative">
            <span className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Loans
            </span>

            <div className="absolute top-full  pt-4 hidden group-hover:block">
              <div className="w-[1000px] rounded-xl bg-white p-6 shadow-2xl border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="grid grid-cols-5 gap-6 text-sm normal-case">

                  <div className="space-y-2">
                    <h4 className="font-bold mb-3 text-blue-600 text-base">Business Loans</h4>
                    <Link href="/business-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">MSME / SME Loan</Link>
                    <Link href="/business-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Working Capital</Link>
                    <Link href="/business-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Overdraft / CC</Link>
                    <Link href="/business-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Invoice Discounting</Link>
                    <Link href="/business-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Machinery Loan</Link>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold mb-3 text-blue-600 text-base">Personal Loans</h4>
                    <Link href="/personal-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Personal Loan</Link>
                    <Link href="/business-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Instant Loan</Link>
                    <Link href="/personal-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Education Loan</Link>
                    <Link href="/personal-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Medical Loan</Link>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold mb-3 text-blue-600 text-base">Home & Property</h4>
                    <Link href="/home-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Home Loan</Link>
                    <Link href="/home-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Loan Against Property</Link>
                    <Link href="/home-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Plot / Construction Loan</Link>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold mb-3 text-blue-600 text-base">Vehicle Loans</h4>
                    <Link href="/vehicle-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Car Loan</Link>
                    <Link href="/vehicle-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Two-Wheeler Loan</Link>
                    <Link href="/vehicle-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Commercial Vehicle</Link>
                    <Link href="/vehicle-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">EV Loan</Link>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold mb-3 text-blue-600 text-base">Gold & Asset</h4>
                    <Link href="/gold-asset-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Gold Loan</Link>
                    <Link href="/gold-asset-loan" className="block py-1.5 px-2 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Loan Against Securities</Link>
                  </div>

                </div>
              </div>
            </div>
          </li>

          {/* CREDIT & CARDS */}
          <li className="dropdown dropdown-hover group">
            <label tabIndex={0} className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Credit & Cards
            </label>
            <ul className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-60 normal-case border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <li><Link href="/credit-cards" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Credit Line / Flexi Loan</Link></li>
              <li><Link href="/credit-cards" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Business Credit Card</Link></li>
              <li><Link href="/credit-cards" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Personal Credit Card</Link></li>
              <li><Link href="/credit-cards" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">BNPL</Link></li>
            </ul>
          </li>

          {/* GOVERNMENT SCHEMES */}
          <li className="dropdown dropdown-hover group">
            <label tabIndex={0} className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Government Schemes
            </label>
            <ul className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-64 normal-case border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <li><Link href="/services/government-schemes" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">PM Mudra Loan</Link></li>
              <li><Link href="/services/government-schemes" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Stand-Up India</Link></li>
              <li><Link href="/services/government-schemes" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">CGTMSE Loan</Link></li>
              <li><Link href="/services/government-schemes" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">PSB Loans in 59 Minutes</Link></li>
              <li><Link href="/services/government-schemes" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Jansamarth</Link></li>
            </ul>
          </li>

          {/* INSURANCE */}
          <li className="dropdown dropdown-hover group">
            <label tabIndex={0} className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Insurance
            </label>
            <ul className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-56 normal-case border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <li><Link href="/services/insurance" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Life Insurance</Link></li>
              <li><Link href="/services/insurance" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Health Insurance</Link></li>
              <li><Link href="/services/insurance" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Motor Insurance</Link></li>
              <li><Link href="/services/insurance" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Home Insurance</Link></li>
              <li><Link href="/services/insurance" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Business Insurance</Link></li>
            </ul>
          </li>

          {/* TOOLS */}
          <li className="dropdown dropdown-hover group">
            <label tabIndex={0} className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Tools
            </label>
            <ul className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-56 normal-case border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <li><Link href="/services/tools" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">EMI Calculator</Link></li>
              <li><Link href="/services/tools" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Eligibility Checker</Link></li>
              {/* <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Credit Score</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Balance Transfer</Link></li> */}
            </ul>
          </li>

          {/* RESOURCES */}
          {/* <li className="dropdown dropdown-hover group">
            <label tabIndex={0} className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Resources
            </label>
            <ul className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-48 normal-case border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Blogs</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Guides</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">FAQs</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Knowledge Center</Link></li>
            </ul>
          </li> */}

          {/* SUPPORT */}
          {/* <li className="dropdown dropdown-hover group">
            <label tabIndex={0} className="cursor-pointer relative py-2 transition-colors duration-200 hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
              Support
            </label>
            <ul className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-56 normal-case border border-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Track Application</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Repayment Options</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Customer Care</Link></li>
              <li><Link href="#" className="py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1">Grievance Redressal</Link></li>
            </ul>
          </li> */}

        </ul>
      </div>

      {/* AUTH */}
      <div className="flex gap-3 shrink-0">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/register"
              className="btn btn-outline btn-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="btn btn-primary btn-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;