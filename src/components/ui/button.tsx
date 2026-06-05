import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[#00AEEF]/25 focus-visible:ring-[4px] focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#008FCC]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[#D6EEF8] bg-white text-[#00AEEF] hover:bg-[#E6F7FD] hover:border-[#00AEEF]/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#B3E8FA]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-[#00AEEF] text-white hover:bg-[#008FCC] shadow-[0_2px_10px_rgba(0,174,239,0.18)] hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)] active:translate-y-0",
        accent: "bg-[#E6F7FD] text-[#00AEEF] hover:bg-[#B3E8FA] border border-[#D6EEF8]",
        hero: "bg-[#00AEEF] text-white hover:bg-[#008FCC] shadow-[0_2px_10px_rgba(0,174,239,0.18)] hover:shadow-[0_8px_24px_rgba(0,174,239,0.18)]",
        "hero-outline": "border border-[#D6EEF8] bg-white text-[#00AEEF] hover:bg-[#E6F7FD] hover:border-[#00AEEF]/40",
        loans: "bg-loans text-primary-foreground hover:bg-loans/90 shadow-md",
        insurance: "bg-insurance text-accent-foreground hover:bg-insurance/90 shadow-md",
        credit: "bg-credit text-primary-foreground hover:bg-credit/90 shadow-md",
        government: "bg-government text-cta-foreground hover:bg-government/90 shadow-md",
        "tab-active": "bg-primary text-primary-foreground shadow-md",
        "tab-inactive": "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 gap-1.5 px-4 text-sm",
        lg: "h-11 px-7 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        xl: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
