import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[96px] w-full rounded-xl border border-[#D6EEF8] bg-white px-3 py-2 text-sm text-[#1A1A1A] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-300 ease-out placeholder:text-[#666666]/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
