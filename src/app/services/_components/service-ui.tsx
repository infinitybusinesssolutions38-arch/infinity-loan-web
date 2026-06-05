import type { ReactNode } from "react";
import type React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const serviceProductCardShell =
  "group relative flex h-full flex-col gap-0 overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-white p-0 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#00AEEF]/45 hover:shadow-[0_10px_28px_rgba(0,174,239,0.1)]";

export const serviceProductCardShellHighlight =
  "border-[#00AEEF]/35 shadow-[0_4px_16px_rgba(0,174,239,0.08)]";

export const serviceProductCardImageWrap =
  "relative h-36 w-full shrink-0 overflow-hidden bg-[#E6F7FD] sm:h-40";

export const serviceProductCardImage =
  "object-cover transition-all duration-300 ease-out group-hover:scale-[1.01]";

export const serviceProductCardImageFade =
  "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/70 to-transparent";

export const serviceProductCardHeader =
  "grid auto-rows-min gap-0 px-4 pb-0 pt-4 sm:px-5 sm:pt-5";

export const serviceProductCardTitle =
  "text-base font-semibold leading-snug tracking-tight text-[#1A1A1A] sm:text-[1.05rem]";

export const serviceProductCardDescription =
  "mt-2 line-clamp-2 text-sm leading-relaxed text-[#666666]";

export const serviceProductCardContent = "px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4";

export const serviceProductCardActions = "flex flex-col gap-2";

export const serviceProductBtnPrimary =
  "h-10 w-full rounded-xl border-0 bg-[#00AEEF] text-sm font-medium text-white shadow-none transition-all duration-300 ease-out hover:bg-[#1256C2]";

export const serviceProductBtnSecondary =
  "h-9 w-full rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] text-sm font-medium text-[#666666] shadow-none transition-all duration-300 ease-out hover:border-[#00AEEF]/35 hover:bg-[#E6F7FD] hover:text-[#00AEEF]";

export const serviceProductBadgeBase =
  "absolute top-3 right-3 z-10 rounded-full border px-2.5 py-0.5 text-[11px] font-medium shadow-none";

export const serviceProductBadgeDefault =
  "border-[#D6EEF8] bg-[#E6F7FD] text-[#00AEEF]";

export const serviceProductBadgeHighlight =
  "border-[#00AEEF]/20 bg-[#00AEEF] text-white";

export const serviceGridClass =
  "grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4";

export const serviceGroupCardShell =
  "flex h-full flex-col gap-0 overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#00AEEF]/45 hover:shadow-[0_10px_28px_rgba(0,174,239,0.1)]";

export const serviceNestedItemShell =
  "flex h-full flex-col gap-3 rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] p-4 transition-all duration-300 ease-out hover:border-[#00AEEF]/30 hover:bg-white";

export const serviceNestedItemTitle = "text-sm font-semibold leading-snug text-[#1A1A1A]";

export const serviceNestedItemDescription =
  "text-sm leading-relaxed text-[#666666]";

export const serviceSectionMajor = "py-16 sm:py-20 lg:py-24";

export const serviceSectionContainer = "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8";

export const serviceSectionTonePage = "bg-[#F7F9FC]";
export const serviceSectionToneWhite = "bg-white";
export const serviceSectionToneAccent = "bg-[#E6F7FD]";

export const serviceSectionHeroFade =
  "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#F7F9FC] sm:h-16";

export const serviceSectionFadeTop =
  "pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white to-transparent sm:h-16 lg:h-20";

export const serviceSectionIntro = "mb-10 text-center sm:mb-12 lg:mb-14";

export const serviceSectionEyebrow =
  "mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-[#E6F7FD] px-4 py-1.5 text-sm font-semibold text-[#00AEEF]";

export const serviceSectionTitle =
  "text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-[2.5rem] lg:leading-tight";

export const serviceSectionSubtitle =
  "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#666666] sm:mt-5 sm:text-lg";

export const serviceCategoryGridSpacing =
  "mb-12 grid grid-cols-1 gap-3 sm:mb-14 sm:grid-cols-2 sm:gap-4 lg:mb-16 lg:grid-cols-3";

export const serviceGroupsStack = "space-y-16 sm:space-y-[4.5rem] lg:space-y-20";

export const serviceGroupBlock = "space-y-8 lg:space-y-10";

export const serviceGroupDivider =
  "border-t border-[#D6EEF8]/70 pt-14 sm:pt-16 lg:pt-20";

export const serviceGroupHeading =
  "w-full rounded-[20px] border border-[#D6EEF8]/80 bg-[#E6F7FD]/50 px-6 py-6 text-center sm:py-7 lg:py-8";

export const serviceGroupHeadingTitle =
  "text-2xl font-bold tracking-tight text-[#00AEEF] sm:text-3xl lg:text-4xl";

export const serviceHighlightsStack = "flex flex-col gap-8 sm:gap-10 lg:gap-12";

export const serviceCtaSection = "relative bg-[#F7F9FC] py-16 lg:py-24";

type ServiceSectionProps = {
  id?: string;
  tone?: "page" | "white" | "accent";
  fadeTop?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function ServiceSection({
  id,
  tone = "page",
  fadeTop = false,
  className,
  containerClassName,
  children,
}: ServiceSectionProps) {
  const toneClass =
    tone === "white"
      ? serviceSectionToneWhite
      : tone === "accent"
        ? serviceSectionToneAccent
        : serviceSectionTonePage;

  return (
    <section id={id} className={cn(serviceSectionMajor, toneClass, fadeTop && "relative", className)}>
      {fadeTop ? <div className={serviceSectionFadeTop} aria-hidden /> : null}
      <div className={cn(serviceSectionContainer, fadeTop && "relative", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export type CtaVariant = "apply" | "eligibility";

export type ServiceItem = {
  key: string;
  title: string;
  description: string;
  popular?: boolean;
  cta: CtaVariant;
  href: string;
};

export type ServiceGroup = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ServiceItem[];
};

export function ServiceCtaButton({
  variant,
  href,
}: {
  variant: CtaVariant;
  href: string;
}) {
  const label = variant === "eligibility" ? "Check Eligibility" : "Apply Now";

  if (variant === "eligibility") {
    return (
      <Button asChild size="default" className={serviceProductBtnPrimary}>
        <Link href={href}>{label}</Link>
      </Button>
    );
  }

  return (
    <ApplyNowCTAButton variant="default" size="default" className={serviceProductBtnPrimary}>
      {label}
    </ApplyNowCTAButton>
  );
}

export function PopularBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-[#D6EEF8] bg-[#E6F7FD] px-2 py-0.5 text-[11px] font-medium text-[#00AEEF]">
      Popular
    </span>
  );
}

export function ServiceItemRow({ item }: { item: ServiceItem }) {
  return (
    <div className={serviceNestedItemShell}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6F7FD]">
          {/* Placeholder for future icon; maintaining layout */}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className={serviceNestedItemTitle}>{item.title}</h4>
            {item.popular ? <PopularBadge /> : null}
          </div>
          <p className={serviceNestedItemDescription}>{item.description}</p>
        </div>
      </div>
      <div className="flex justify-end pt-1">
        <ServiceCtaButton variant={item.cta} href={item.href} />
      </div>
    </div>
  );
}

export function ServiceGroupCard({ group }: { group: ServiceGroup }) {
  const Icon = group.icon;

  return (
    <Card className={serviceGroupCardShell}>
      <CardHeader className="flex items-center gap-3 px-5 pb-0 pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F7FD]">
          <Icon className="h-5 w-5 text-[#00AEEF]" />
        </div>
        <CardTitle className="text-base font-semibold leading-snug text-[#1A1A1A]">
          {group.title}
        </CardTitle>
      </CardHeader>
      <CardDescription className="px-5 pt-2 text-sm leading-relaxed text-[#666666]">
        Review options, check eligibility and apply with a clear next step.
      </CardDescription>
      <CardContent className="space-y-3 px-5 pb-2 pt-4">
        {group.items.map((item) => (
          <ServiceItemRow key={item.key} item={item} />
        ))}
      </CardContent>
      <CardFooter className="flex justify-center border-t border-[#D6EEF8] px-5 py-4">
        <Button asChild variant="outline" className={serviceProductBtnSecondary}>
          <Link href="/contact">Need help choosing? Talk to us</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ServicesPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F7F9FC]">
      <header className={cn("relative overflow-hidden", serviceSectionToneAccent, serviceSectionMajor)}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#00AEEF]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00AEEF]/5 blur-3xl" />
        </div>

        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #00AEEF 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className={serviceSectionHeroFade} aria-hidden />
        <div className={cn("relative z-10", serviceSectionContainer)}>
          <div className="space-y-4 sm:space-y-5">
            <p className={serviceSectionEyebrow}>{eyebrow}</p>
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[#666666] sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="outline" className={serviceProductBtnSecondary}>
              <Link href="/services">View all categories</Link>
            </Button>
            <Button asChild className={serviceProductBtnPrimary}>
              <Link href="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </header>

      <div>{children}</div>

      <footer
        className={cn(
          serviceSectionContainer,
          "border-t border-[#D6EEF8]/60 py-10 sm:py-12 lg:py-14"
        )}
      >
        <p className="text-xs leading-relaxed text-[#666666] sm:text-sm">
          Disclaimer: Product availability and eligibility depend on your profile and partner lending policies.
        </p>
      </footer>
    </main>
  );
}
