"use client";

import { useEffect, useMemo, useState } from "react";
import { SERVICE_HUB_GOOGLE_FORM_CATEGORIES } from "@/lib/service-hub-categories";

type GoogleFormItem = {
  _id: string;
  categoryKey: string;
  categoryName: string;
  formUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

const CATEGORIES = SERVICE_HUB_GOOGLE_FORM_CATEGORIES;
const PAGE_SIZE = 5;

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminGoogleFormsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<GoogleFormItem[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0].key);
  const [formUrl, setFormUrl] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const categoryMap = useMemo(() => {
    const map = new Map<string, GoogleFormItem>();
    items.forEach((item) => map.set(item.categoryKey, item));
    return map;
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(CATEGORIES.length / PAGE_SIZE));
  const pagedCategories = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return CATEGORIES.slice(start, start + PAGE_SIZE);
  }, [page, totalPages]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const loadItems = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch("/api/admin/google-forms", { credentials: "include", cache: "no-store" });
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to load Google form links");
        setItems([]);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError("Failed to load Google form links");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const resetForm = () => {
    setEditingKey(null);
    setCategoryKey(CATEGORIES[0].key);
    setFormUrl("");
  };

  const startEdit = (item: GoogleFormItem) => {
    setEditingKey(item.categoryKey);
    setCategoryKey(item.categoryKey);
    setFormUrl(item.formUrl || "");
    setMessage("");
    setError("");
  };

  const handleDelete = async (key: string) => {
    const selected = CATEGORIES.find((c) => c.key === key);
    const yes = window.confirm(`Delete Google form link for ${selected?.name || key}?`);
    if (!yes) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/google-forms/${encodeURIComponent(key)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to delete Google form link");
        return;
      }
      setMessage("Google form link deleted successfully.");
      if (editingKey === key) resetForm();
      await loadItems();
    } catch {
      setError("Failed to delete Google form link");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const selected = CATEGORIES.find((c) => c.key === categoryKey);
    if (!selected) {
      setError("Invalid category selected");
      setSaving(false);
      return;
    }
    if (!formUrl.trim()) {
      setError("Google form URL is required");
      setSaving(false);
      return;
    }

    const isEdit = Boolean(editingKey);
    const url = isEdit
      ? `/api/admin/google-forms/${encodeURIComponent(editingKey as string)}`
      : "/api/admin/google-forms";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryKey: selected.key,
          categoryName: selected.name,
          formUrl: formUrl.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.message || "Failed to save Google form link");
        return;
      }

      setMessage(isEdit ? "Google form link updated successfully." : "Google form link added successfully.");
      resetForm();
      await loadItems();
    } catch {
      setError("Failed to save Google form link");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Google Forms</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Assign one Google Form per Services hub category. Use the public link from Google Forms
          → Send → link ending in <strong>/viewform</strong> (not /edit).
        </p>
      </div>

      <div className="rounded-2xl border border-[#D6EEF8] bg-[#FAFCFF] p-4">
        <div className="mb-3 text-sm font-semibold text-[#334155]">
          {editingKey ? "Edit Google Form Link" : "Add Google Form Link"}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[240px_minmax(0,1fr)_auto]">
          <select
            value={categoryKey}
            onChange={(e) => setCategoryKey(e.target.value)}
            disabled={Boolean(editingKey)}
            className="rounded-xl border border-[#D8E3F1] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#00AEEF]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="url"
            value={formUrl}
            onChange={(e) => setFormUrl(e.target.value)}
            placeholder="https://docs.google.com/forms/d/e/.../viewform"
            className="rounded-xl border border-[#D8E3F1] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#00AEEF]"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#008FCC] disabled:opacity-60"
            >
              {saving ? "Saving..." : editingKey ? "Update" : "Add"}
            </button>
            {editingKey ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#D8E3F1] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {error ? (
        <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">{error}</div>
      ) : null}
      {message ? (
        <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm text-[#166534]">{message}</div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[#D6EEF8]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8FAFC] text-left text-xs uppercase tracking-wide text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Category key</th>
                <th className="px-4 py-3">Google Form URL</th>
                <th className="px-4 py-3">Created Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] bg-white">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Loading Google form links...
                  </td>
                </tr>
              ) : (
                pagedCategories.map((cat) => {
                  const item = categoryMap.get(cat.key);
                  return (
                    <tr key={cat.key}>
                      <td className="px-4 py-3 font-medium text-[#1E293B]">{cat.name}</td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-xs">{cat.key}</code>
                      </td>
                      <td className="px-4 py-3">
                        {item?.formUrl ? (
                          <a
                            href={item.formUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00AEEF] hover:underline break-all"
                          >
                            {item.formUrl}
                          </a>
                        ) : (
                          <span className="italic text-[#94A3B8]">Not Configured</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#475569]">{formatDate(item?.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => (item ? startEdit(item) : setCategoryKey(cat.key))}
                            className="text-xs font-semibold text-[#00AEEF] hover:underline"
                          >
                            {item ? "Edit" : "Add"}
                          </button>
                          {item ? (
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => void handleDelete(cat.key)}
                              className="text-xs font-semibold text-[#DC2626] hover:underline disabled:opacity-60"
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && CATEGORIES.length > 0 ? (
          <div className="flex items-center justify-between border-t border-[#EEF2F7] bg-[#F8FAFC] px-4 py-3">
            <div className="text-xs text-muted-foreground">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, CATEGORIES.length)}{" "}
              of {CATEGORIES.length} categories · Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-xl border border-[#D8E3F1] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-xl border border-[#D8E3F1] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
