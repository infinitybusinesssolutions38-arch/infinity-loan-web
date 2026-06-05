/**
 * @param {string | null | undefined} raw
 * @returns {string | null}
 */
export function normalizeGoogleFormUrl(raw) {
    const input = String(raw || "").trim();
    if (!input) return null;

    const gle = input.match(/https:\/\/forms\.gle\/[a-zA-Z0-9_-]+/i);
    if (gle) return gle[0];

    const viewform = input.match(/https:\/\/docs\.google\.com\/forms\/d\/(?:e\/)?[a-zA-Z0-9_-]+\/viewform(?:\?[^\s#]*)?/i);
    if (viewform) return viewform[0].trim();

    const base = input.match(/https:\/\/docs\.google\.com\/forms\/d\/(?:e\/)?[a-zA-Z0-9_-]+/i);
    if (base) return `${base[0]}/viewform`;

    return null;
}

/** @param {string | null | undefined} raw */
export function isValidGoogleFormUrl(raw) {
    return normalizeGoogleFormUrl(raw) !== null;
}

/** @param {string | null | undefined} raw */
export function sanitizeGoogleFormUrlForOpen(raw) {
    return normalizeGoogleFormUrl(raw) || String(raw || "").trim();
}