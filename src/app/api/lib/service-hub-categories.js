/** Matches /services?category=... hub pages */

export const SERVICE_HUB_GOOGLE_FORM_CATEGORIES = [
  { key: "salaried-employees", name: "Salaried Employees" },
  { key: "businesses", name: "Businesses" },
  { key: "professionals", name: "Professionals" },
  { key: "govt-employees", name: "Government Employees" },
  { key: "government-schemes", name: "Government Schemes" },
  { key: "builders-developers", name: "Builders & Developers" },
];

const KEY_SET = new Set(SERVICE_HUB_GOOGLE_FORM_CATEGORIES.map((c) => c.key));

export function isServiceHubGoogleFormCategory(categoryKey) {
  const key = String(categoryKey || "").trim().toLowerCase();
  return KEY_SET.has(key);
}

export function getServiceHubCategoryLabel(categoryKey) {
  const key = String(categoryKey || "").trim().toLowerCase();
  const found = SERVICE_HUB_GOOGLE_FORM_CATEGORIES.find((c) => c.key === key);
  return found?.name || key || "";
}