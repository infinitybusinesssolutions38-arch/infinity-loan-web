"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#D6EEF8] bg-white px-3 text-sm text-[#1A1A1A] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 ease-out placeholder:text-[#666666]/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
