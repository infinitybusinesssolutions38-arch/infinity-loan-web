import GoogleFormModel from "../models/google-form-schema";
import { normalizeGoogleFormUrl } from "../lib/google-form-url";
import { isServiceHubGoogleFormCategory } from "../lib/service-hub-categories";

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferHubCategoryKey(record, categoryKey) {
  const loanTypeText = String(
    record?.serviceCategoryTitle || record?.loanTypeText || record?.loan_type || ""
  ).toLowerCase();

  if (categoryKey === "salaried") {
    if (loanTypeText.includes("government") || loanTypeText.includes("govt")) return "govt-employees";
    return "salaried-employees";
  }

  if (categoryKey === "business") {
    if (loanTypeText.includes("professional")) return "professionals";
    if (loanTypeText.includes("builder") || loanTypeText.includes("developer")) return "builders-developers";
    if (loanTypeText.includes("government") || loanTypeText.includes("scheme")) return "government-schemes";
    return "businesses";
  }

  if (categoryKey === "personal") return "personal-loan";

  return null;
}

export function buildGoogleFormLookupKeys(record, categoryKey) {
  const loanTypeText = String(
    record?.loanTypeText || record?.loan_type || ""
  ).toLowerCase();
  if (categoryKey === "credit_card" || loanTypeText.includes("credit-card") || loanTypeText.includes("credit card")) {
    return [];
  }

  const keys = [];
  const add = (value) => {
    const key = slugify(value);
    if (!key || keys.includes(key)) return;
    keys.push(key);
  };

  add(record?.serviceCategoryKey);
  add(record?.serviceCategoryTitle);
  add(record?.loanTypeText);
  add(record?.loan_type);
  add(record?.typeOfLoan);
  add(record?.purpose);

  const title = String(
    record?.serviceCategoryTitle || record?.loanTypeText || record?.loan_type || ""
  ).toLowerCase();

  if (title.includes("personal loan")) add("personal-loan");
  if (title.includes("home loan")) add("home-loan");
  if (title.includes("business loan")) add("business-loan");
  if (title.includes("msme") || title.includes("sme")) add("msme-sme-loan");

  const hubKey = inferHubCategoryKey(record, categoryKey);
  if (hubKey) add(hubKey);
  add(categoryKey);

  return keys.filter((key) => isServiceHubGoogleFormCategory(key));
}

export async function resolveGoogleFormForRecord(record, categoryKey) {
  const lookupKeys = buildGoogleFormLookupKeys(record, categoryKey);
  if (!lookupKeys.length) return null;

  const items = await GoogleFormModel.find({
    isActive: true,
    categoryKey: { $in: lookupKeys },
  })
    .select("categoryKey categoryName formUrl")
    .lean();

  if (!items.length) return null;

  const byKey = new Map(items.map((item) => [String(item.categoryKey).toLowerCase(), item]));

  for (const key of lookupKeys) {
    const match = byKey.get(key);
    if (match?.formUrl) {
      const formUrl = normalizeGoogleFormUrl(match.formUrl) || match.formUrl;
      return {
        formUrl,
        mappingKey: match.categoryKey,
        mappingName: match.categoryName || match.categoryKey,
      };
    }
  }

  return null;
}
