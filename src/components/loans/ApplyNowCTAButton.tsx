"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import ApplyNowModal from "./ApplyNowModal";

type ApplyNowCTAButtonProps = React.ComponentProps<typeof Button> & {
  loanType?: string;
  loanTypeKey?: string;
  categoryKey?: string;
  label?: string;
  redirectToUnifiedForm?: boolean;
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
  redirectToUnifiedForm = false,
  ...buttonProps
}: ApplyNowCTAButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (e.defaultPrevented) return;
    
    // If redirectToUnifiedForm is true, open the modal with unified form
    if (redirectToUnifiedForm) {
      setOpen(true);
      return;
    }
    
    // Otherwise, open the modal normally
    setOpen(true);
  };

  return (
    <>
      <Button
        {...buttonProps}
        variant={variant}
        size={size}
        type="button"
        onClick={handleClick}
      >
        {children ?? label}
      </Button>
      {!redirectToUnifiedForm && (
        <ApplyNowModal
          isOpen={open}
          onClose={() => setOpen(false)}
          loanType={loanType}
          loanTypeKey={loanTypeKey}
          categoryKey={categoryKey}
        />
      )}
      {redirectToUnifiedForm && (
        <ApplyNowModal
          isOpen={open}
          onClose={() => setOpen(false)}
          loanType={loanType}
          loanTypeKey={loanTypeKey}
          categoryKey={categoryKey}
          forceUnifiedForm={true}
        />
      )}
    </>
  );
}
