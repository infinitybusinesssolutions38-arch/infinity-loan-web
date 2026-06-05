"use client";

import { useState } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";

type Props = {
  itemLabel?: string;
  onDelete: () => Promise<boolean>;
};

export default function AdminListDeleteButton({ itemLabel = "this application", onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const ok = await onDelete();
      if (ok) {
        setDeleted(true);
        setConfirming(false);
        setTimeout(() => setDeleted(false), 2500);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (deleted) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#16A34A]">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Deleted
      </span>
    );
  }

  if (confirming) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-muted-foreground">Delete {itemLabel}?</span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={deleting}
            onClick={() => void handleDelete()}
            className="rounded-lg bg-destructive px-2 py-1 text-[10px] font-semibold text-destructive-foreground disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Yes"}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-border px-2 py-1 text-[10px] font-semibold"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-[10px] font-semibold text-destructive transition hover:bg-destructive/20"
      title="Delete application"
    >
      <Trash2 className="h-3 w-3" />
      Delete
    </button>
  );
}
