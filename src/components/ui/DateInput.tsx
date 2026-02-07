"use client";

import React from "react";
import { motion } from "framer-motion";
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
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground block"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <motion.div
        className="relative w-full"
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Calendar className="h-4 w-4 text-primary" />
        </div>

        <input
          id={id}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-10 pr-4 py-2 rounded-md border-2 transition-all duration-200 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none ${
            isFocused
              ? "border-primary shadow-lg shadow-primary/20"
              : "border-gray-300 hover:border-primary/50"
          }`}
        />

        {value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
          >
            <span className="text-sm font-medium">✓</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
