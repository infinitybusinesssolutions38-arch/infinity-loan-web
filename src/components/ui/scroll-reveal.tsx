"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-in-up" | "fade-in" | "scale-in";

const ANIMATION_CLASSES: Record<AnimationType, string> = {
  "fade-in-up": "animate-fade-in-up",
  "fade-in": "animate-fade-in",
  "scale-in": "animate-scale-in",
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  animation = "fade-in-up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        visible ? ANIMATION_CLASSES[animation] : "opacity-0 translate-y-6",
        className
      )}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}