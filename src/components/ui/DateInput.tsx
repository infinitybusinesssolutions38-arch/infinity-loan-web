"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
}

export function DateInput({
  label,
  value,
  onChange,
  id,
  name,
  required = false,
  placeholder = "Select date",
}: DateInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#1A1A1A] block"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Calendar className="h-4 w-4 text-[#00AEEF]" />
        </div>

        <input
          id={id}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D6EEF8] bg-white text-sm text-[#1A1A1A] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-300 ease-out placeholder:text-[#666666]/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
        />

        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00AEEF]">
            <span className="text-sm font-medium">✓</span>
          </div>
        )}
      </div>
    </div>
  );
}
