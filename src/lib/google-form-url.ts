/**
 * Extract and normalize Google Form URLs for public submission (viewform).
 * Handles admin paste mistakes: trailing labels, /edit links, URL-encoded junk.
 */

const FORMS_GLE_RE = /https:\/\/forms\.gle\/[a-zA-Z0-9_-]+/i;
const DOCS_VIEWFORM_RE = /https:\/\/docs\.google\.com\/forms\/d\/(?:e\/)?[a-zA-Z0-9_-]+\/viewform(?:\?[^\s#]*)?/i;
const DOCS_FORM_BASE_RE = /https:\/\/docs\.google\.com\/forms\/d\/(?:e\/)?[a-zA-Z0-9_-]+/i;

/** User-facing fill URL (viewform or forms.gle). */
export function normalizeGoogleFormUrl(raw: string | null | undefined): string | null {
    const input = String(raw || "").trim();
    if (!input) return null;

    const gle = input.match(FORMS_GLE_RE);
    if (gle) return gle[0];

    const viewform = input.match(DOCS_VIEWFORM_RE);
    if (viewform) return viewform[0].trim();

    const base = input.match(DOCS_FORM_BASE_RE);
    if (base) {
        return `${base[0]}/viewform`;
    }

    return null;
}

export function isValidGoogleFormUrl(raw: string | null | undefined): boolean {
    return normalizeGoogleFormUrl(raw) !== null;
}

/** Prefer viewform; never return /edit or text pasted after the URL. */
export function sanitizeGoogleFormUrlForOpen(raw: string | null | undefined): string {
    return normalizeGoogleFormUrl(raw) || String(raw || "").trim();
}