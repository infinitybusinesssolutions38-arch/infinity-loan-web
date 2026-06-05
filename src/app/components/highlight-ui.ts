// Shared design tokens for highlight cards (services + homepage) — Infinity logo colors
export const hl = {
  card: "overflow-hidden rounded-[20px] border border-[#D6EEF8] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]",

  layout:
    "flex flex-col gap-8 p-6 sm:gap-10 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:p-10",

  content: "min-w-0 w-full max-w-3xl",

  badge:
    "inline-flex items-center gap-2 rounded-full border border-[#D6EEF8] bg-[#E6F7FD] px-3 py-1.5 text-sm font-semibold text-[#00AEEF]",
  badgeIcon: "flex-shrink-0",

  title: "text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl",
  body: "text-sm leading-relaxed text-[#666666] sm:text-base",
  bodyStrong: "text-sm font-semibold text-[#1A1A1A] sm:text-base",
  listItem: "text-sm leading-relaxed text-[#666666] sm:text-base",

  btnPrimary:
    "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(0,174,239,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#008FCC] hover:shadow-[0_8px_24px_rgba(0,174,239,0.22)] sm:w-auto",
  btnSecondary:
    "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-6 py-3 text-sm font-semibold text-[#00AEEF] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#00AEEF]/40 hover:bg-[#E6F7FD] sm:w-auto",

  sidebar: "w-full rounded-[20px] border border-[#D6EEF8] bg-[#F7F9FC] p-6 sm:p-7",
  iconBox:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6F7FD] text-[#00AEEF]",
  sidebarTitle: "text-sm font-semibold text-[#1A1A1A]",
  sidebarSub: "text-xs text-[#666666]",

  innerBox: "mt-4 rounded-xl border border-[#D6EEF8] bg-white p-4 sm:p-5",
  innerLabel: "text-xs font-medium uppercase tracking-wide text-[#666666]",
  innerValue: "mt-1 text-lg font-bold text-[#1A1A1A] sm:text-xl",

  infoBox: "rounded-xl border border-[#D6EEF8] bg-[#F7F9FC] p-4 sm:p-5",
  alertBox: "rounded-xl border border-[#D6EEF8] bg-white p-4 sm:p-5",
  accentBox: "rounded-xl border border-[#D6EEF8] bg-[#E6F7FD] p-4 sm:p-5",
  accentLabel: "text-sm font-semibold text-[#00AEEF]",

  footerContainer:
    "relative rounded-[20px] border border-[#D6EEF8] bg-white p-6 text-[#1A1A1A] shadow-[0_8px_22px_rgba(15,23,42,0.06)] sm:p-8",
  footerTitle: "mb-4 text-base font-semibold text-[#1A1A1A]",
  footerLink: "text-sm text-[#1A1A1A] transition-colors hover:text-[#00AEEF]",
  footerIconBox:
    "flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F7FD] text-[#00AEEF]",
  footerSection: "space-y-6",
};
