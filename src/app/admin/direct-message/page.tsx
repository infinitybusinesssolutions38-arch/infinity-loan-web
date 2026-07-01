"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail as MailIcon, Send, Search } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminDirectMessagePage() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const query = email.trim();
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(
          `/api/admin/users?search=${encodeURIComponent(query)}&limit=10`,
          { credentials: "include" }
        );
        const data = await response.json().catch(() => ({}));
        if (response.ok && data?.success) {
          const uniqueEmails = Array.from(
            new Set(
              (data.data.items || [])
                .map((item) => item?.email)
                .filter(Boolean)
            )
          ).filter((item) => item !== query);
          setSuggestions(uniqueEmails);
        } else {
          setSuggestions([]);
        }
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const trimmedEmail = email.trim();
    const trimmedDescription = description.trim();

    if (!trimmedEmail || !trimmedDescription) {
      setStatus({ type: "error", message: "Email and message are required." });
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/direct-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: trimmedEmail, description: trimmedDescription }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setStatus({ type: "success", message: data.message || "Message sent successfully." });
        setEmail("");
        setDescription("");
        setSuggestions([]);
      } else {
        setStatus({ type: "error", message: data?.message || "Unable to send message." });
      }
    } catch (error) {
      console.error("[Admin Direct Message] request failed", error);
      setStatus({ type: "error", message: "Failed to send the message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setEmail(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-2xl font-bold tracking-tight">Direct Message</div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Send a message directly to a customer email from the admin panel. The email will be delivered from{' '}
          <strong>business@infinityloanservices.com</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-[26px] border border-border/70 bg-card/80 p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
              <MailIcon className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => window.setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full rounded-3xl border border-input bg-background/70 px-11 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background focus:ring-1 focus:ring-primary/10"
              placeholder="Select a customer or type email (e.g. customer@example.com)"
              aria-describedby="email-help"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
              {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-2 max-h-56 overflow-y-auto rounded-3xl border border-border/80 bg-card shadow-xl">
                {suggestions.map((item) => (
                  <li
                    key={item}
                    onMouseDown={() => handleSuggestionClick(item)}
                    className="cursor-pointer px-4 py-3 text-sm text-foreground transition hover:bg-primary/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p id="email-help" className="text-xs text-muted-foreground">
            Search existing customer emails or type any valid address.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-foreground">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-[190px] w-full rounded-3xl border border-input bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:bg-background focus:ring-1 focus:ring-primary/10"
            placeholder="Enter the message you want to send to the customer."
          />
        </div>

        {status ? (
          <div
            className={`rounded-3xl px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-emerald-100 text-emerald-900"
                : "bg-destructive/10 text-destructive"
            }`}
            role="status"
          >
            {status.message}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Message will be delivered to the customer email address you provide.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
