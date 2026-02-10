"use client";

import React from "react";

const SuccessBadge: React.FC = () => {
  return (
    <div className="fixed top-32 left-0 z-[40] flex justify-start px-4 success-badge-slide" suppressHydrationWarning={true}>
      <div className="relative z-0 overflow-hidden flex items-center gap-4 rounded-2xl px-5 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border border-slate-700" suppressHydrationWarning={true}>
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 success-badge-bg" suppressHydrationWarning={true} />

        {/* Golden Circle */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-white font-bold text-lg shadow-inner badge-wobble-3d will-change-transform" suppressHydrationWarning={true}>
          17th
        </div>

        {/* Text */}
        <div className="flex flex-col" suppressHydrationWarning={true}>
          <h2 className="text-white font-semibold text-xl tracking-wide" suppressHydrationWarning={true}>
            Successful Year
          </h2>
          <p className="text-gray-400 text-sm" suppressHydrationWarning={true}>
            Celebrating Excellence Since 2009
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessBadge;
