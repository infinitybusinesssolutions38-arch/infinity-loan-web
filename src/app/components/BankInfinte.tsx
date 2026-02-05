"use client";

import Image, { type StaticImageData } from "next/image";

import axisLogo from "./bank logos/axis-bank-logo-png_seeklogo-14775.png";
import auLogo from "./bank logos/au-small-finance-bank-limited-logo-png_seeklogo-333683.png";
import bobLogo from "./bank logos/bank-of-baroda-logo-png_seeklogo-195534.png";
import hdfcLogo from "./bank logos/hdfc-bank-limited-logo-png_seeklogo-289647.png";
import hsbcLogo from "./bank logos/hsbc-private-bank-logo-png_seeklogo-481153.png";
import iciciLogo from "./bank logos/icici-bank-logo-png_seeklogo-69551.png";
import idfcLogo from "./bank logos/idfc-first-bank-logo-png_seeklogo-556504.png";
import kotakLogo from "./bank logos/kotak-mahindra-bank-logo-png_seeklogo-304220.png";
import pnbLogo from "./bank logos/punjab-national-bank-pnb-logo-png_seeklogo-386963.png";
import sbiLogo from "./bank logos/SBI-logo.svg.png";

interface Bank {
  name: string;
  logo: StaticImageData;
}

const featuredBanks: Bank[] = [
  { name: "State Bank of India", logo: sbiLogo },
  { name: "HDFC Bank", logo: hdfcLogo },
  { name: "ICICI Bank", logo: iciciLogo },
  { name: "Axis Bank", logo: axisLogo },
  { name: "Kotak Mahindra Bank", logo: kotakLogo },
  { name: "Bank of Baroda", logo: bobLogo },
  { name: "Punjab National Bank", logo: pnbLogo },
  { name: "IDFC First Bank", logo: idfcLogo },
  { name: "AU Small Finance Bank", logo: auLogo },
  { name: "HSBC Bank", logo: hsbcLogo },
];

export default function BankLogosSlider() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Partnered with Leading Banks & NBFCs
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Trusted by 100+ RBI-regulated banks & financial institutions
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-10">
          <div className="logo-slider-container">
            <div className="logo-slider-track">
              {[...featuredBanks, ...featuredBanks].map((bank, index) => (
                <div key={index} className="logo-item">
                  <div className="relative h-16 w-36 sm:h-20 sm:w-44">
                    <Image
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      fill
                      className="object-contain opacity-70 hover:opacity-100 transition"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>


      {/* Styles */}
      <style jsx>{`
        .logo-slider-container {
          overflow: hidden;
          width: 100%;
        }

        .logo-slider-track {
          display: flex;
          flex-direction: row; /* ✅ FIX */
          flex-wrap: nowrap; /* ✅ FIX */
          white-space: nowrap; /* ✅ FIX */
          gap: 2rem;
          animation: scroll 40s linear infinite;
          width: max-content; /* ✅ FIX */
        }

        .logo-slider-track:hover {
          animation-play-state: paused;
        }

        .logo-item {
          flex: 0 0 auto; /* ✅ FIX */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: white;
          border: 1px solid #f3f4f6;
          border-radius: 12px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .logo-slider-track {
            gap: 1rem;
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}
