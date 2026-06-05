"use client";



import React from "react";

import { Star, User } from "lucide-react";



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

    <section className="w-full py-16 lg:py-24 bg-[#F7F9FC]">

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">



        {/* Heading */}

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">

            What Our Customers Say

          </h2>



          <div className="w-20 h-1 bg-[#00AEEF] mx-auto mt-4 rounded-full" />



          <p className="text-[#666666] mt-4">

            Trusted by thousands of happy loan customers across India

          </p>

        </div>



        {/* Grid */}
        <div className="relative overflow-hidden">
          <div className="flex w-max gap-6 py-1 loan-testimonials-marquee">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={`${t.name}-${t.role}-${index}`}
                className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 ease-out border border-[#D6EEF8] hover:border-[#00AEEF] flex flex-col shrink-0 w-80"
              >
                {/* Stars */}
                <div className="flex mb-4 text-[#00AEEF]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#00AEEF" />
                  ))}
                </div>

                {/* Message */}
                <p className="text-[#666666] text-sm flex-grow leading-relaxed mb-4">
                  "{t.message}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 border-t border-[#D6EEF8] pt-4">
                  <div className="w-10 h-10 bg-[#E6F7FD] rounded-full flex items-center justify-center">
                    <User size={20} className="text-[#00AEEF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A] text-sm">{t.name}</h4>
                    <span className="text-xs text-[#00AEEF] font-medium">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>

      </div>

    </section>

  );

};



export default LoanTestimonials;

