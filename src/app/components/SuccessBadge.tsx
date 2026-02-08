"use client";

import React from "react";

const SuccessBadge: React.FC = () => {
  return (
    <div className="fixed top-22 left-0 z-[1000] flex justify-start px-4 animate-[successBadgeSlide_10s_ease-in-out_infinite]">
      <div className="relative z-0 overflow-hidden flex items-center gap-4 rounded-2xl px-5 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border border-slate-700">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 animate-[successBadgeBg_6s_ease-in-out_infinite]" />

        {/* Golden Circle */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700  text-white font-bold text-lg shadow-inner animate-[badgeWobble3d_3s_ease-in-out_infinite] will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden]">
          17th
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <h2 className="text-white font-semibold text-xl tracking-wide">
            Successful Year
          </h2>
          <p className="text-gray-400 text-sm">
            Celebrating Excellence Since 2009
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes successBadgeSlide {
          0% {
            opacity: 0;
            transform: translateX(-120%) translateY(-10px);
          }
          15% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
          55% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-120%) translateY(0);
          }
        }

        @keyframes badgeWobble3d {
          0%, 50%, 100% {
            transform: perspective(700px) rotateY(-25deg);
          }
          75% {
            transform: perspective(700px) rotateY(25deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessBadge;
