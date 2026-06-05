/** Admin UI uses Pending | Approved | Rejected */

export function toAdminDisplayStatus(record) {
  const raw = record?.application_status ?? record?.status ?? "pending";
  const n = String(raw).trim().toLowerCase().replace(/\s+/g, "_");
  if (n === "approved") return "Approved";
  if (n === "rejected") return "Rejected";
  if (n === "under_review" || n === "underreview") return "Pending";
  if (n === "pending") return "Pending";
  const titled = String(raw).trim();
  if (["Pending", "Approved", "Rejected"].includes(titled)) return titled;
  return "Pending";
}

export function adminStatusToDbFields(loanType, adminStatus) {
  const s = String(adminStatus || "").trim();
  if (!["Pending", "Approved", "Rejected"].includes(s)) {
    return null;
  }
  if (loanType === "business") {
    return { status: s };
  }
  return { application_status: s.toLowerCase() };
}

export function buildStatusFilter(loanType, adminStatus) {
  const fields = adminStatusToDbFields(loanType, adminStatus);
  return fields || {};
}

export function normalizeAdminListItem(item, loanType) {
  return {
    ...item,
    _type: loanType,
    status: toAdminDisplayStatus(item),
    serviceCategory:
      item?.serviceCategoryTitle ||
      item?.serviceCategoryKey ||
      (loanType === "salaried" ? "Salaried" : loanType === "business" ? "Business" : "Personal"),
  };
}