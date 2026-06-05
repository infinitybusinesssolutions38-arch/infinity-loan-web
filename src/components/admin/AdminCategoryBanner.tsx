import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  categoryKey: string;
};

export default function AdminCategoryBanner({ title, categoryKey }: Props) {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-2.5 text-sm text-[#166534]">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A]" aria-hidden />
      <span>
        <strong className="font-semibold">{title}</strong> — category filter active (
        <code className="text-xs">{categoryKey}</code>). Only matching applications are shown.
      </span>
    </div>
  );
}