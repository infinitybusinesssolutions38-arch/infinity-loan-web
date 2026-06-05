/** Matches /services?category=... hub pages (Google Form admin + upload links). */

export const SERVICE_HUB_GOOGLE_FORM_CATEGORIES = [
  { key: "salaried-employees", name: "Salaried Employees", servicesPath: "/services?category=salaried-employees" },
  { key: "businesses", name: "Businesses", servicesPath: "/services?category=businesses" },
  { key: "professionals", name: "Professionals", servicesPath: "/services?category=professionals" },
  { key: "govt-employees", name: "Government Employees", servicesPath: "/services?category=govt-employees" },
  { key: "government-schemes", name: "Government Schemes", servicesPath: "/services?category=government-schemes" },
  { key: "builders-developers", name: "Builders & Developers", servicesPath: "/services?category=builders-developers" },
] as const;

export type ServiceHubCategoryKey = (typeof SERVICE_HUB_GOOGLE_FORM_CATEGORIES)[number]["key"];

const KEY_SET = new Set(SERVICE_HUB_GOOGLE_FORM_CATEGORIES.map((c) => c.key));

export function isServiceHubGoogleFormCategory(
  categoryKey?: string | null
): categoryKey is ServiceHubCategoryKey {
  const key = String(categoryKey || "").trim().toLowerCase();
  return KEY_SET.has(key as ServiceHubCategoryKey);
}

export function getServiceHubCategoryLabel(categoryKey?: string | null): string {
  const key = String(categoryKey || "").trim().toLowerCase();
  return SERVICE_HUB_GOOGLE_FORM_CATEGORIES.find((c) => c.key === key)?.name || key || "";
}