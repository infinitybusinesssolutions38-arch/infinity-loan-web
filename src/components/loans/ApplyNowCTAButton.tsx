"use client";

import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";

import ApplyNowModal from "./ApplyNowModal";

type ApplyNowCTAButtonProps = React.ComponentProps<typeof Button> & {
  loanType?: string;
  loanTypeKey?: string;
  categoryKey?: string;
  label?: string;
};

export default function ApplyNowCTAButton({
  loanType = "Loan",
  loanTypeKey,
  categoryKey,
  label = "Apply Now",
  variant = "cta",
  size = "xl",
  children,
  onClick,
  ...buttonProps
}: ApplyNowCTAButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...buttonProps}
        variant={variant}
        size={size}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
      >
        {children ?? label}
      </Button>
      <ApplyNowModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loanType={loanType}
        loanTypeKey={loanTypeKey}
        categoryKey={categoryKey}
      />
    </>
  );
}
