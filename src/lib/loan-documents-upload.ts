/** Google Drive folder/link for post-application document uploads. Set in .env.local */
import { normalizeGoogleFormUrl } from "@/lib/google-form-url";
import { isServiceHubGoogleFormCategory } from "@/lib/service-hub-categories";

export const LOAN_DOCUMENTS_GOOGLE_DRIVE_URL =
    process.env.NEXT_PUBLIC_LOAN_DOCUMENTS_GOOGLE_DRIVE_URL?.trim() ||
    "https://drive.google.com";

export function isGoogleFormUrl(url: string) {
    const normalized = normalizeGoogleFormUrl(url);
    if (normalized) return true;
    return /^https:\/\/(docs\.google\.com\/forms|forms\.gle)\//i.test(String(url || "").trim());
}

function slugify(value: string) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function inferHubCategoryKey(categoryKey?: string, categoryTitle?: string) {
    const key = slugify(categoryKey);
    const title = String(categoryTitle || "").toLowerCase();

    if (key.includes("salaried") || title.includes("salaried") || key === "govt-employees") {
        if (title.includes("government") || title.includes("govt")) return "govt-employees";
        return "salaried-employees";
    }
    if (
        key === "businesses" ||
        key === "professionals" ||
        key === "builders-developers" ||
        key === "government-schemes" ||
        title.includes("business") ||
        title.includes("professional") ||
        title.includes("builder") ||
        title.includes("developer")
    ) {
        if (title.includes("professional")) return "professionals";
        if (title.includes("builder") || title.includes("developer")) return "builders-developers";
        if (title.includes("government") || title.includes("scheme")) return "government-schemes";
        return "businesses";
    }
    if (key === "personal-loan" || title.includes("personal loan")) return "personal-loan";

    return null;
}

/** Keys used to match admin Google Form categoryKey (Services hub only). */
export function buildCategoryLookupKeys(categoryKey?: string, categoryTitle?: string) {
    const hubKey = inferHubCategoryKey(categoryKey, categoryTitle);
    if (hubKey && isServiceHubGoogleFormCategory(hubKey)) {
        return [hubKey];
    }
    const direct = slugify(categoryKey);
    if (direct && isServiceHubGoogleFormCategory(direct)) {
        return [direct];
    }
    return [];
}

async function fetchGoogleFormsMap(): Promise<Record<string, string>> {
    try {
        const res = await fetch("/api/google-forms", {
            credentials: "include",
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success || !Array.isArray(data?.items)) return {};

        const map: Record<string, string> = {};
        for (const item of data.items) {
            const key = slugify(String(item?.categoryKey || ""));
            const url = normalizeGoogleFormUrl(String(item?.formUrl || "")) || "";
            if (key && url) map[key] = url;
        }
        return map;
    } catch {
        return {};
    }
}

/** Resolve admin Google Form from service category keys (no application ref). */
export async function resolveGoogleFormUrlForCategory(
    categoryKey?: string,
    categoryTitle?: string
): Promise<string | null> {
    const lookupKeys = buildCategoryLookupKeys(categoryKey, categoryTitle);
    if (!lookupKeys.length) return null;

    const map = await fetchGoogleFormsMap();
    for (const key of lookupKeys) {
        if (map[key]) return map[key];
    }
    return null;
}

/** Resolve admin-configured Google Form URL for an application (service-wise). */
export async function resolveApplicationGoogleFormUrl(applicationRef: string): Promise<string | null> {
    try {
        const res = await fetch(
            `/api/profile/google-form-link?applicationRef=${encodeURIComponent(applicationRef)}`,
            { credentials: "include", cache: "no-store" }
        );
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.success && data?.formUrl) {
            const cleaned = normalizeGoogleFormUrl(String(data.formUrl));
            if (cleaned) return cleaned;
        }
    } catch {
        // Fall through to category / Drive fallback.
    }
    return null;
}

export type DocumentsUploadResolveOptions = {
    applicationRef?: string | null;
    categoryKey?: string;
    categoryTitle?: string;
};

/** Credit card applications collect documents in the form; no Google Form upload step. */
export function isCreditCardDocumentUploadContext(
    options: DocumentsUploadResolveOptions
): boolean {
    const key = slugify(options.categoryKey || "");
    const title = String(options.categoryTitle || "").toLowerCase();
    return (
        key === "credit-cards" ||
        key === "credit-card" ||
        key === "credit_card" ||
        title.includes("credit card")
    );
}

/** Google Form when configured; otherwise legacy Drive fallback. */
export async function resolveDocumentsUploadUrl(
    options: DocumentsUploadResolveOptions
): Promise<string> {
    if (isCreditCardDocumentUploadContext(options)) {
        return "";
    }

    const ref = String(options.applicationRef || "").trim();
    if (ref) {
        const byRef = await resolveApplicationGoogleFormUrl(ref);
        if (byRef) return byRef;
    }

    const byCategory = await resolveGoogleFormUrlForCategory(
        options.categoryKey,
        options.categoryTitle
    );
    if (byCategory) return byCategory;

    return LOAN_DOCUMENTS_GOOGLE_DRIVE_URL;
}

/** Open-safe URL for href (never /edit or trailing pasted text). */
export function sanitizeDocumentsUploadHref(url: string): string {
    return normalizeGoogleFormUrl(url) || String(url || "").trim();
}

/** @deprecated Use resolveDocumentsUploadUrl */
export async function resolveApplicationDocumentsUploadUrl(applicationRef: string): Promise<string> {
    return resolveDocumentsUploadUrl({ applicationRef });
}
