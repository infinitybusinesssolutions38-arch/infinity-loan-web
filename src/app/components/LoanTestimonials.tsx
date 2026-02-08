"use client";

import React from "react";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ravi Kumar",
    role: "Home Loan",
    message:
      "Got my home loan approved within 48 hours. The process was smooth and very transparent. Highly recommended service.",
  },
  {
    name: "Priya Sharma",
    role: "Personal Loan",
    message:
      "Quick approval and zero hidden charges. The team guided me step by step. Very professional support.",
  },
  {
    name: "Imran Khan",
    role: "Business Loan",
    message:
      "They helped me expand my business with fast funding. Documentation was minimal and easy.",
  },
  {
    name: "Sneha Reddy",
    role: "Gold Loan",
    message:
      "Best interest rates compared to others. Money was credited instantly. Excellent experience.",
  },
  {
    name: "Amit Verma",
    role: "Vehicle Loan",
    message:
      "Bought my first car with their loan assistance. Very quick approval and friendly staff.",
  },
  {
    name: "Pooja Mehta",
    role: "Mortgage Loan",
    message:
      "Clear explanation of EMI and terms. No confusion at all. Very trustworthy service.",
  },
  {
    name: "Suresh Patel",
    role: "Home Loan",
    message:
      "From application to disbursement everything was handled professionally. Great customer care.",
  },
  {
    name: "Neha Gupta",
    role: "Personal Loan",
    message:
      "Needed urgent funds for medical emergency and they processed my loan within a day. Lifesaver!",
  },
  {
    name: "Rahul Singh",
    role: "Business Loan",
    message:
      "Transparent policies and fast approval. Perfect for small business owners like me.",
  },
  {
    name: "Anjali Nair",
    role: "Education Loan",
    message:
      "Helped me finance my higher studies easily. Very supportive and cooperative team.",
  },
  {
    name: "Manoj Das",
    role: "Gold Loan",
    message:
      "Safe process and immediate payout. The interest rate was very reasonable.",
  },
  {
    name: "Kiran Joshi",
    role: "Vehicle Loan",
    message:
      "Smooth documentation and instant sanction. Definitely the best loan service I’ve used.",
  },
];

const LoanTestimonials: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Customers Say
          </h2>

          <div className="w-20 h-1 bg-[#F97415] mx-auto mt-4 rounded-full" />

          <p className="text-gray-500 mt-4">
            Trusted by thousands of happy loan customers across India
          </p>
        </div>

        {/* Grid */}
        <div className="relative overflow-hidden">
          <div className="flex w-max gap-6 py-1 loan-testimonials-marquee">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={`${t.name}-${t.role}-${index}`}
                className="bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-700/50 hover:border-[#F97415]/50 flex flex-col shrink-0 w-96 h-auto hover:-translate-y-2"
              >
                {/* Stars */}
                <div className="flex mb-4 text-[#F97415]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#F97415" />
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-200 text-base leading-relaxed flex-grow mb-6 font-medium">
                  “{t.message}”
                </p>

                {/* User Section */}
                <div className="border-t border-gray-700 pt-6 flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F97415] to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-lg">{t.name.split(" ").map((word) => word[0]).join("").toUpperCase()}</span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                    <span className="text-sm text-[#F97415] font-semibold">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loanTestimonialsMarqueeLTR {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .loan-testimonials-marquee {
          animation: loanTestimonialsMarqueeLTR 80s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default LoanTestimonials;
