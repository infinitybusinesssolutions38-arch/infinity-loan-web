import mongoose from "mongoose";
import connectDB from "./db";
import SalariedLoanModel from "../models/salaried-loan-schema";
import BusinessLoanModel from "../models/business-loan-schema";
import PersonalLoanModel from "../models/personal-loan-schema";
import CreditCardModel from "../models/credit-card-schema";

const LOAN_MODELS = [
    { key: "salaried", model: SalariedLoanModel, label: "Salaried Loan" },
    { key: "business", model: BusinessLoanModel, label: "Business Loan" },
    { key: "personal", model: PersonalLoanModel, label: "Personal Loan" },
    { key: "credit_card", model: CreditCardModel, label: "Credit Card" },
];

const PENDING_DOCUMENTS_BY_TYPE = {
    salaried: [
        "Latest salary slips (3 months)",
        "Bank statement (6–12 months)",
        "Office ID / employment proof",
        "Rent agreement (if applicable)",
        "CIBIL report (if applicable)",
    ],
    business: [
        "GST returns / registration certificates",
        "Bank statement (12 months)",
        "Business registration documents",
        "ITR documents",
        "CIBIL report (if applicable)",
    ],
    personal: [
        "Aadhaar & PAN copies",
        "Bank statement",
        "Income proof / ITR",
        "Address proof",
    ],
    credit_card: [
        "Aadhaar & PAN copies",
        "Address proof",
        "Income / employment proof",
    ],
};

function escapeRegex(input) {
    return String(input || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizeApplicationStatus(record) {
    const raw = record?.application_status ?? record?.status ?? "pending";
    const normalized = String(raw).trim().toLowerCase().replace(/\s+/g, "_");
    if (normalized === "under_review" || normalized === "underreview") return "under_review";
    if (normalized === "approved") return "approved";
    if (normalized === "rejected") return "rejected";
    return "pending";
}

export function formatStatusLabel(status) {
    const map = {
        pending: "Pending",
        under_review: "Under Review",
        approved: "Approved",
        rejected: "Rejected",
    };
    return map[status] || "Pending";
}

export function formatDocumentStatusLabel(status) {
    const map = {
        pending: "Documents Pending",
        uploaded: "Documents Submitted",
        verified: "Documents Verified",
    };
    return map[status] || "Documents Pending";
}

export function resolveEffectiveDocumentStatus(record) {
    const status = normalizeApplicationStatus(record);
    const raw = String(record?.documentStatus || "pending").trim().toLowerCase();
    if (status === "approved") return "verified";
    if (raw === "uploaded" || raw === "verified") return raw;
    return "pending";
}

export function getDocumentTimelineLabel(documentStatus) {
    if (documentStatus === "verified") return "Documents Verified";
    if (documentStatus === "uploaded") return "Documents Submitted";
    return "Documents Pending";
}

export function isApplicationLocked(status) {
    return status === "approved" || status === "rejected";
}

export function isCreditCardApplication(record, categoryKey) {
    if (categoryKey === "credit_card") return true;
    const loanTypeText = String(record?.loanTypeText || record?.loan_type || "").toLowerCase();
    return loanTypeText.includes("credit-card") || loanTypeText.includes("credit card");
}

export function getApplicationPermissions(record, categoryKey) {
    const status = normalizeApplicationStatus(record);
    const documentStatus = resolveEffectiveDocumentStatus(record);
    const isLocked = isApplicationLocked(status);
    const canEdit = !isLocked && (status === "pending" || status === "under_review");
    const creditCard = isCreditCardApplication(record, categoryKey);
    const canUploadDocuments =
        !creditCard && !isLocked && documentStatus === "pending";
    return { isLocked, canEdit, canUploadDocuments, status, documentStatus };
}

const PROTECTED_UPDATE_KEYS = new Set([
    "_id",
    "__v",
    "applicationRef",
    "userId",
    "application_status",
    "status",
    "documentStatus",
    "documentsConfirmedAt",
    "adminRemarks",
    "reviewedAt",
    "createdAt",
    "updatedAt",
    "role",
    "loan_type",
    "additionalDocuments",
    "paymentReceipts",
]);

export function sanitizeUserUpdatePayload(body) {
    const update = {};
    if (!body || typeof body !== "object") return update;
    for (const [key, value] of Object.entries(body)) {
        if (PROTECTED_UPDATE_KEYS.has(key)) continue;
        if (value === undefined) continue;
        update[key] = value;
    }
    return update;
}

function field(label, value) {
    if (value == null || value === "") return null;
    return { label, value: String(value) };
}

export function buildPersonalDetails(record, categoryKey) {
    const rows = [
        field("Full Name", getApplicantName(record)),
        field("Email", record.personalEmail),
        field("Mobile", record.mobileNumber),
        field("WhatsApp", record.whatsappNumber || record.whatsAppNumber),
        field("Alternate Mobile", record.alternateMobile || record.alternateMobileNumber),
        field("Date of Birth", record.dob),
        field("Gender", record.gender),
        field("Marital Status", record.maritalStatus),
        field("PAN Number", record.panNumber || record.businessPan),
        field("Aadhaar Number", record.aadhaarNumber),
        field("Residential Address", record.currentResidentialAddress),
        field("Pincode", record.currentResidentialPincode || record.currentResidentialPincode),
        field("City", record.city || record.residentialCity),
        field("State", record.state || record.residentialState),
        field("Residence Type", record.residenceType || record.residentialStatus),
    ].filter(Boolean);

    if (categoryKey === "credit_card") {
        rows.push(
            field("Bank Name", record.bankName),
            field("Card Type", record.cardType),
            field("Limit Amount", record.limitAmount)
        );
    }

    return rows;
}

export function buildEmploymentDetails(record, categoryKey) {
    if (categoryKey === "business") {
        return [
            field("Business Name", record.businessName),
            field("Business Type", record.businessType),
            field("Industry", record.industryType || record.natureOfBusiness),
            field("Years in Business", record.yearsInBusiness || record.businessVintageYears),
            field("Annual Turnover", record.annualTurnover),
            field("GST Number", record.gstNumber),
            field("Office Address", record.currentOfficeOrShopAddress || record.businessAddress),
        ].filter(Boolean);
    }

    if (categoryKey === "salaried") {
        return [
            field("Company Name", record.companyName),
            field("Designation", record.designation),
            field("Employment Type", record.employmentType),
            field("Date of Joining", record.dateOfJoining),
            field("Monthly Net Salary", record.monthlyNetSalary),
            field("Office Location", record.officeLocation),
            field("Industry", record.industry),
        ].filter(Boolean);
    }

    if (categoryKey === "personal") {
        return [
            field("Employment Type", record.employmentType),
            field("Company Name", record.companyName),
            field("Monthly Income", record.monthlyIncome),
            field("Office Address", record.currentOfficeAddress),
        ].filter(Boolean);
    }

    if (categoryKey === "credit_card") {
        return [
            field("Job / Business", record.jobBusiness),
            field("Official Email", record.officialEmail),
            field("Office Address", record.currentOfficeAddress),
            field("Office Pincode", record.currentOfficePincode),
            field("Business Premises Status", record.businessPremisesStatus),
        ].filter(Boolean);
    }

    return [];
}

export function buildLoanInformation(record) {
    return [
        field("Loan Amount", record.requiredLoanAmount || record.loanAmountRequired || record.limitAmount),
        field("Preferred Tenure", record.preferredTenure || record.preferredLoanTenureMonths),
        field("Purpose", record.purpose || record.purposeOfLoan || record.typeOfLoan),
        field("Service Category", record.serviceCategoryTitle),
    ].filter(Boolean);
}

export function mapLoanDetail(record, categoryKey, defaultLabel) {
    const status = normalizeApplicationStatus(record);
    const documentStatus = resolveEffectiveDocumentStatus(record);
    const permissions = getApplicationPermissions(record, categoryKey);

    return {
        id: String(record._id),
        applicationRef: record.applicationRef || "",
        loanCategory: categoryKey,
        loanType: getLoanTypeLabel(record, categoryKey, defaultLabel),
        loanAmount: record.requiredLoanAmount || record.limitAmount || record.loanAmountRequired || "",
        appliedDate: record.createdAt || null,
        status,
        statusLabel: formatStatusLabel(status),
        documentStatus,
        documentStatusLabel: formatDocumentStatusLabel(documentStatus),
        documentsConfirmedAt: record.documentsConfirmedAt || null,
        adminRemarks: record.adminRemarks || "",
        reviewedAt: record.reviewedAt || null,
        applicantName: getApplicantName(record),
        applicantEmail: record.personalEmail || "",
        applicantMobile: record.mobileNumber || "",
        timeline: buildTimeline(record),
        pendingDocuments: permissions.canUploadDocuments ? getPendingDocumentsList(categoryKey) : [],
        personalDetails: buildPersonalDetails(record, categoryKey),
        employmentDetails: buildEmploymentDetails(record, categoryKey),
        loanInformation: buildLoanInformation(record),
        formData: record,
        ...permissions,
    };
}

export function getEditableFieldGroups(categoryKey) {
    const common = [
        { key: "firstName", label: "First Name", altKey: "firstname" },
        { key: "middleName", label: "Middle Name" },
        { key: "lastName", label: "Last Name", altKey: "lastname" },
        { key: "mobileNumber", label: "Mobile Number" },
        { key: "personalEmail", label: "Email" },
        { key: "whatsappNumber", label: "WhatsApp Number" },
        { key: "alternateMobile", label: "Alternate Mobile" },
        { key: "dob", label: "Date of Birth" },
        { key: "gender", label: "Gender" },
        { key: "maritalStatus", label: "Marital Status" },
        { key: "panNumber", label: "PAN Number" },
        { key: "aadhaarNumber", label: "Aadhaar Number" },
        { key: "currentResidentialAddress", label: "Residential Address" },
        { key: "currentResidentialPincode", label: "Pincode" },
        { key: "requiredLoanAmount", label: "Loan Amount" },
        { key: "preferredTenure", label: "Preferred Tenure" },
        { key: "purpose", label: "Purpose" },
    ];

    if (categoryKey === "salaried") {
        return [
            ...common,
            { key: "companyName", label: "Company Name" },
            { key: "designation", label: "Designation" },
            { key: "employmentType", label: "Employment Type" },
            { key: "monthlyNetSalary", label: "Monthly Net Salary" },
            { key: "officeLocation", label: "Office Location" },
        ];
    }

    if (categoryKey === "business") {
        return [
            ...common,
            { key: "businessName", label: "Business Name" },
            { key: "businessType", label: "Business Type" },
            { key: "gstNumber", label: "GST Number" },
            { key: "annualTurnover", label: "Annual Turnover" },
            { key: "currentOfficeOrShopAddress", label: "Office / Shop Address" },
        ];
    }

    if (categoryKey === "personal" || categoryKey === "credit_card") {
        return [
            { key: "firstname", label: "First Name" },
            { key: "middleName", label: "Middle Name" },
            { key: "lastname", label: "Last Name" },
            { key: "mobileNumber", label: "Mobile Number" },
            { key: "personalEmail", label: "Email" },
            { key: "whatsappNumber", label: "WhatsApp Number" },
            { key: "alternateMobile", label: "Alternate Mobile" },
            { key: "dob", label: "Date of Birth" },
            { key: "gender", label: "Gender" },
            { key: "maritalStatus", label: "Marital Status" },
            { key: "panNumber", label: "PAN Number" },
            { key: "aadhaarNumber", label: "Aadhaar Number" },
            { key: "currentResidentialAddress", label: "Residential Address" },
            { key: "currentResidentialPincode", label: "Pincode" },
            { key: "requiredLoanAmount", label: "Loan Amount" },
            { key: "preferredTenure", label: "Preferred Tenure" },
            { key: "purpose", label: "Purpose" },
            ...(categoryKey === "credit_card"
                ? [
                      { key: "bankName", label: "Bank Name" },
                      { key: "cardType", label: "Card Type" },
                      { key: "limitAmount", label: "Limit Amount" },
                  ]
                : []),
        ];
    }

    return common;
}

export function buildUserLoanFilter(user) {
    const email = String(user.email || user._raw?.email || "").trim().toLowerCase();
    const userId = user.id || user._id;
    const or = [{ personalEmail: new RegExp(`^${escapeRegex(email)}$`, "i") }];
    if (userId && mongoose.Types.ObjectId.isValid(String(userId))) {
        or.push({ userId: new mongoose.Types.ObjectId(String(userId)) });
    }
    return { $or: or };
}

export function getLoanTypeLabel(record, categoryKey, defaultLabel) {
    return (
        record.serviceCategoryTitle ||
        record.loanTypeText ||
        record.loan_type ||
        defaultLabel
    );
}

export function getApplicantName(record) {
    if (record.firstName) {
        return [record.firstName, record.middleName, record.lastName].filter(Boolean).join(" ");
    }
    return [record.firstname, record.middleName, record.lastname].filter(Boolean).join(" ");
}

export function mapLoanSummary(record, categoryKey, defaultLabel) {
    const status = normalizeApplicationStatus(record);
    const documentStatus = resolveEffectiveDocumentStatus(record);
    return {
        id: String(record._id),
        applicationRef: record.applicationRef || "",
        loanCategory: categoryKey,
        loanType: getLoanTypeLabel(record, categoryKey, defaultLabel),
        loanAmount: record.requiredLoanAmount || record.limitAmount || "",
        appliedDate: record.createdAt || null,
        status,
        statusLabel: formatStatusLabel(status),
        documentStatus,
        documentStatusLabel: formatDocumentStatusLabel(documentStatus),
        applicantName: getApplicantName(record),
    };
}

export async function countUserLoans(user) {
    await connectDB();
    const filter = buildUserLoanFilter(user);
    const counts = await Promise.all(LOAN_MODELS.map(({ model }) => model.countDocuments(filter)));
    return counts.reduce((sum, n) => sum + n, 0);
}

export async function fetchAllUserLoans(user, { summaryOnly = true } = {}) {
    await connectDB();
    const filter = buildUserLoanFilter(user);
    const results = [];

    for (const { key, model, label } of LOAN_MODELS) {
        const records = await model.find(filter).sort({ createdAt: -1 }).lean();
        for (const record of records) {
            if (summaryOnly) {
                results.push(mapLoanSummary(record, key, label));
            } else {
                results.push({ ...record, loanCategory: key, loanTypeLabel: getLoanTypeLabel(record, key, label) });
            }
        }
    }

    results.sort((a, b) => {
        const da = a.appliedDate || a.createdAt ? new Date(a.appliedDate || a.createdAt).getTime() : 0;
        const db = b.appliedDate || b.createdAt ? new Date(b.appliedDate || b.createdAt).getTime() : 0;
        return db - da;
    });

    return results;
}

export async function findUserLoanByRef(user, applicationRef) {
    await connectDB();
    const filter = buildUserLoanFilter(user);
    const refRegex = new RegExp(`^${escapeRegex(applicationRef)}$`, "i");

    for (const { key, model, label } of LOAN_MODELS) {
        const record = await model.findOne({ ...filter, applicationRef: refRegex }).lean();
        if (record) {
            return {
                record,
                categoryKey: key,
                defaultLabel: label,
            };
        }
    }
    return null;
}

export function getModelByCategory(categoryKey) {
    const entry = LOAN_MODELS.find((m) => m.key === categoryKey);
    return entry?.model || null;
}

export function getPendingDocumentsList(categoryKey) {
    return PENDING_DOCUMENTS_BY_TYPE[categoryKey] || PENDING_DOCUMENTS_BY_TYPE.personal;
}

export function buildTimeline(record) {
    const status = normalizeApplicationStatus(record);
    const documentStatus = resolveEffectiveDocumentStatus(record);
    const steps = [
        { key: "submitted", label: "Application Submitted", done: true },
        {
            key: "documents",
            label: getDocumentTimelineLabel(documentStatus),
            done: documentStatus !== "pending",
            active: documentStatus === "pending" && status !== "rejected",
        },
        {
            key: "review",
            label: "Under Review",
            done: status === "under_review" || status === "approved" || status === "rejected",
            active: status === "under_review",
        },
        {
            key: "decision",
            label: status === "rejected" ? "Rejected" : "Approved",
            done: status === "approved" || status === "rejected",
            active: status === "approved" || status === "rejected",
            variant: status === "rejected" ? "rejected" : "approved",
        },
    ];
    return steps;
}

export { LOAN_MODELS };
