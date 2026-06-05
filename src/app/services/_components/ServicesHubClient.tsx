"use client";

import { useEffect, useMemo, useState, type MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Banknote,
    Building2,
    Briefcase,
    CreditCard,
    Shield,
    ArrowRight,
    CheckCircle2,
    Clock,
    FileCheck,
    Users,
    TrendingUp,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ApplyNowCTAButton from "@/components/loans/ApplyNowCTAButton";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BusinessLoanModal from "@/components/loans/BusinessLoanModal";
import PersonalLoanModal from "@/components/loans/PersonalLoanModal";
import SalariedLoanModal from "@/components/loans/SalariedLoanModal";
import CreditCardModal from "@/components/loans/CreditCardModal";
import {
    ServiceSection,
    serviceCategoryGridSpacing,
    serviceCtaSection,
    serviceGridClass,
    serviceGroupBlock,
    serviceGroupDivider,
    serviceGroupHeading,
    serviceGroupHeadingTitle,
    serviceGroupsStack,
    serviceHighlightsStack,
    serviceProductBadgeBase,
    serviceProductBadgeDefault,
    serviceProductBadgeHighlight,
    serviceProductBtnPrimary,
    serviceProductBtnSecondary,
    serviceProductCardActions,
    serviceProductCardContent,
    serviceProductCardDescription,
    serviceProductCardHeader,
    serviceProductCardImage,
    serviceProductCardImageFade,
    serviceProductCardImageWrap,
    serviceProductCardShell,
    serviceProductCardShellHighlight,
    serviceProductCardTitle,
    serviceSectionContainer,
    serviceSectionEyebrow,
    serviceSectionFadeTop,
    serviceSectionHeroFade,
    serviceSectionIntro,
    serviceSectionMajor,
    serviceSectionSubtitle,
    serviceSectionTitle,
    serviceSectionToneAccent,
} from "./service-ui";
import { cn } from "@/lib/utils";
import PrivateInstitutionalHighlight from "@/app/components/PrivateInstitutionalHighlight";
import EmiRestructuringHighlight from "@/app/components/Emirestructuringhighlight";
import PropertyLoanHighlight from "@/app/components/Propertyloanhighlight";
import PoorCibilHighlight from "@/app/components/PoorCibilHighlight";

type HubCategoryKey =
    | "salaried-employees"
    | "businesses"
    | "professionals"
    | "govt-employees"
    | "government-schemes"
    | "builders-developers"
    | "credit-cards";

type ServiceCardItem = {
    key: string;
    title: string;
    description: string;
    imageSrc?: string;
    applyHref: string;
    infoHref: string;
    highlight?: boolean;
    badge?: string;
};

type ServiceGroup = {
    title: string;
    items: ServiceCardItem[];
};

const CATEGORY_FALLBACK_IMAGE: Record<HubCategoryKey, string> = {
    "salaried-employees": "/test.jpeg",
    businesses: "/home/business-1.jpeg",
    professionals: "/home/professionals-1.jpeg",
    "govt-employees": "/home/central-state-govt-emp-1.png",
    "government-schemes": "/home/central-state-govt-schema-1.jpeg",
    "builders-developers": "/home/builder-developers-1.jpeg",
    "credit-cards": "/home-img/home1.jpeg",
};

const getCardImageSrc = (params: {
    service: ServiceCardItem;
    fallbackCategory: HubCategoryKey;
}) => params.service.imageSrc ?? CATEGORY_FALLBACK_IMAGE[params.fallbackCategory];

const SALARIED_TITLE_TO_FILE_NAME: Record<string, string> = {
    "Personal Loan": "personal loan.png",
    "Digital / Paperless Loan": "Digital  Paperless Loan.png",
    "Open Plot / Plot Purchase Loan": "Open Plot  Plot Purchase Loan.png",
    "Salary Advance / Short-Term Loan": "Salary Advance  Short-Term.png",
    "Travel / Holiday Loan": "Travel  Holiday Loan.png",
    "Used / Resale Car Loan": "Used  Resale Car Loan.png",
    "Salary Loan (Private / Government / PSU)": "Salary Loan (Private  Government  PSU).png",
};

const getSalariedCardImageSrc = (title: string) => {
    const fileName = SALARIED_TITLE_TO_FILE_NAME[title] ?? `${title.replace(" / ", "  ")}.png`;
    return `/salaried/${encodeURIComponent(fileName)}`;
};

const BUSINESS_KEY_TO_FILE_NAME: Record<string, string> = {
    "business-audience": "Enterprises _&_Corporates.png",
    "business-working-capital-loan": "working_capital.png",
    "business-cash-credit-cc-facility": "cash_credit.png",
    "business-overdraft-od-facility": "overdraft_od.png",
    "business-short-term-business-loan": "short_term.png",
    "business-msme-business-loan": "msme.png",
    "business-sme-term-loan": "sme.png",
    "business-startup-business-loan": "startup_bussiness.png",
    "business-proprietorship-business-loan": "Proprietorship.png",
    "business-partnership-firm-loan": "partnership_ferm.png",
    "business-huf-entity-loan": "HUF_Entity_Loan.png",
    "business-llp-loan": "LLP Loan.png",
    "business-opc-private-limited-company-loan": "OPC_Private_Limited_Company_Loan.png",
    "business-private-limited-company-loan": "Private Limited Company Loan.png",
    "business-public-limited-company-loan": "Public_Limited_Company_Loan.png",
    "business-section-8-company-loan": "Section_8_Company_Loan.png",
    "business-producer-company-loan": "Producer_Company_Loan.png",
    "business-unsecured-business-loan": "unsecured.png",
    "business-collateral-free-business-loan": "collateral.png",
    "business-loan-against-property-business-lap": "loan_against_property.png",
    "business-machinery-equipment-loan": "machinary_equipment.png",
    "business-commercial-vehicle-loan": "commercial_vechicle.png",
    "business-industrial-term-loan": "industrial.png",
    "business-manufacturing-unit-loan": "manufacturing.png",
    "business-raw-material-procurement-loan": "raw_material.png",
    "business-business-expansion-loan": "business_expansion.png",
    "business-capacity-expansion-loan": "capacity_expansion.png",
    "business-franchise-branch-expansion-loan": "franchise.png",
    "business-trade-finance-loan": "trade_finance.png",
    "business-invoice-bill-discounting": "invoice.png",
    "business-import-finance-loan": "import_finance.png",
    "business-export-finance-loan": "export_finance.png",
    "business-corporate-term-loan": "Corporate_Term.png",
    "business-project-finance": "project_finance.png",
    "business-structured-corporate-finance": "structured_corporate.png",
    "business-syndicated-loan": "Syndicated.png",
    "business-bridge-finance-for-corporates": "bridge_finance.png",
    "business-pre-approved-business-loan": "pre-apporved.png",
    "business-digital-paperless-business-loan": "digital.png",

    "business-balance-sheet-based-loan": "Balance Sheet Based Loan.png",
    "business-capacity-enhancement-loan": "Capacity Enhancement Loan.png",
    "business-channel-partner-finance": "Channel Partner Finance.png",
    "business-co-operative-society-loan": "Co-operative Society Loan.png",
    "business-corporate-overdraft-cash-credit-facility": "Corporate Overdraft  Cash Credit Facility.png",
    "business-corporate-working-capital-loan": "Corporate Working Capital Loan.png",
    "business-factory-setup-expansion-loan": "Factory Setup  Expansion Loan.png",
    "business-gst-based-loan": "GST-bassed.png",
    "business-government-company-psu-loan": "Government Company  PSU Loan.png",
    "business-greenfield-brownfield-project-loan": "Greenfield  Brownfield Project Loan.png",
    "business-holding-subsidiary-associate-company-loan": "Holding  Subsidiary  Associate Company Loan.png",
    "business-industrial-modernization-loan": "Industrial Modernization Loan.png",
    "business-industrial-shed-plot-loan": "Industrial Shed  Plot Loan.png",
    "business-jv-foreign-spv-company-loan": "JV  Foreign  SPV Company Loan.png",
    "business-msme-loan": "MSME Loan.png",
    "business-micro-small-medium-enterprise-loan": "Micro  Small  Medium Enterprise Loan.png",
    "business-nidhi-company-loan": "Nidhi Company Loan.png",
    "business-oem-ancillary-manufacturing-loan": "OEM  Ancillary Manufacturing Loan.png",
    "business-plant-machinery-loan": "Plant & Machinery Loan.png",
    "business-plant-and-machinery-loan": "Plant & Machinery Loan.png",
    "business-pollution-control-equipment-loan": "Pollution Control Equipment Loan.png",

    "business-turnover-based-loan": "Turnover Based Loan.png",
    "business-sme-loan": "SME Loan.png",
    "business-trader-distributor-dealer-loan": "Trader  Distributor  Dealer Loan.png",
    "business-stockist-super-stockist-loan": "Stockist  Super Stockist Loan.png",
    "business-retailer-kirana-supermarket-loan": "Retailer  Kirana  Supermarket Loan.png",
    "business-seasonal-business-funding": "Seasonal Business Funding.png",
    "business-heavy-cnc-textile-printing-machinery-loan": "heavy_CNC.png",
    "business-construction-and-mining-equipment-loan": "machinary_&_mining.png",
    "business-solar-and-renewable-equipment-finance": "solar_and_renewable.png",
    "business-imported-machinery-finance": "imported_machinary.png",
    "business-machinery-refinance": "machinary_refinance.png",
    "business-line-of-credit": "line_of_credit.png",
    "business-trade-finance": "trade_finance.png",
    "business-inventory-finance": "inventory_finance.png",
    "business-po-based-funding": "po_bassed.png",
    "business-bank-statement-based-loan": "bank_statement.png",
    "business-supply-chain-finance": "supply_chain.png",
    "business-it-saas-company-loan": "it_saas.png",
    "business-logistics-company-loan": "logistics.png",
    "business-real-estate-company-loan": "realistate.png",
    "business-hospital-group-loan": "hospital_group.png",
    "business-educational-institution-loan": "education_institution.png",
};

const getBusinessCardImageSrc = (key: string) => {
    const fileName = BUSINESS_KEY_TO_FILE_NAME[key];
    if (!fileName) return undefined;
    return `/all-business/smart_loan_&_funding/${encodeURIComponent(fileName)}`;
};

const PROFESSIONAL_TITLE_TO_FILE_NAME: Record<string, string> = {
    "Clinic / Office Purchase Loan": "Clinic & Office Purchase Loan.png",
    "Clinic / Office Renovation Loan": "Clinic  Office Renovation Loan.png",
    "Lawyer / Advocate Loan": "Lawyer  Advocate Loan.png",
    "CA / CS / CMA Loan": "CA  CS  CMA Loan.png",
};

const getProfessionalCardImageSrc = (title: string) => {
    const folderName = "Smart Loan & Funding Solutions for All Professionals";
    const fileName =
        PROFESSIONAL_TITLE_TO_FILE_NAME[title] ?? `${title.replace(" / ", "  ")}.png`;
    return `/all-prof/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
};

const GOVT_EMPLOYEE_TITLE_TO_FILE_NAME: Record<string, string> = {};

const getGovtEmployeeCardImageSrc = (title: string) => {
    const fileName = GOVT_EMPLOYEE_TITLE_TO_FILE_NAME[title] ?? `${title}.png`;
    return `/government_emp/${encodeURIComponent(fileName)}`;
};

const GOVT_SCHEME_TITLE_TO_FILE_NAME: Record<string, string> = {
    "SC / ST Category Business Loan": "SC _ ST Category Business Loan.png",
    "Dairy / Poultry Loan": "Dairy  Poultry Loan.png",
};

const getGovtSchemeCardImageSrc = (title: string) => {
    const fileName = GOVT_SCHEME_TITLE_TO_FILE_NAME[title] ?? `${title}.png`;
    return `/government_schemes/${encodeURIComponent(fileName)}`;
};

const BUILDER_DEVELOPER_TITLE_TO_FILE_NAME: Record<string, string> = {
    "Project Restructuring / Takeover Loan": "Project Restructuring  Takeover Loan.png",
};

const getBuilderDeveloperCardImageSrc = (title: string) => {
    const folderName = "Smart Loan & Project Funding Solutions for Builders & Developers";
    const fileName = BUILDER_DEVELOPER_TITLE_TO_FILE_NAME[title] ?? `${title}.png`;
    return `/developers/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
};

const CREDIT_CARD_TITLE_TO_FILE_NAME: Record<string, string> = {
    "Credit Line / Flexi Loan": "Credit Line  Flexi Loan.png",
};

const getCreditCardImageSrc = (title: string) => {
    const fileName = CREDIT_CARD_TITLE_TO_FILE_NAME[title] ?? `${title}.png`;
    return `/cards/${encodeURIComponent(fileName)}`;
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\//g, "-")
        .replace(/\(|\)/g, "")
        .replace(/\./g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-+/g, "-");

const makeItems = (params: {
    prefix: string;
    titles: string[];
    infoHref: string;
    applyPrefix?: string;
}) => {
    const applyPrefix = params.applyPrefix ?? "";
    return params.titles.map((title) => {
        const slug = slugify(title);
        return {
            key: `${params.prefix}-${slug}`,
            title,
            description: `Apply for ${title} with tailored eligibility and quick processing.`,
            applyHref: `/apply-now?product=${applyPrefix}${slug}`,
            infoHref: params.infoHref,
        } satisfies ServiceCardItem;
    });
};

const CATEGORY_META: Array<{
    key: HubCategoryKey;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
}> = [
        {
            key: "salaried-employees",
            title: "Loan Offers for Salaried Employees",
            icon: Users,
            gradient: "bg-gradient-loans",
        },
        {
            key: "businesses",
            title: "Smart Loan & Funding Solutions for All Businesses — Proprietorships, Mid-Sized SMEs, Industrial Enterprises, and Corporates",
            icon: Banknote,
            gradient: "bg-gradient-loans",
        },
        {
            key: "professionals",
            title: "Smart Loan & Funding Solutions for All Professionals — Doctors, Chartered Accountants, Architects, Engineers, Lawyers, Consultants, and Self-Employed Professionals",
            icon: Briefcase,
            gradient: "bg-gradient-loans",
        },
        {
            key: "govt-employees",
            title: "Smart Loan & Funding Solutions for Central & State Government Employees — Civil Services, Public Sector Staff, Defence Personnel, and Other Government Employees",
            icon: Building2,
            gradient: "bg-gradient-government",
        },
        {
            key: "government-schemes",
            title: "End-to-End Financing Support for Central & State Government Schemes",
            icon: Building2,
            gradient: "bg-gradient-government",
        },
        {
            key: "builders-developers",
            title: "Smart Loan & Project Funding Solutions for Builders & Developers",
            icon: Building2,
            gradient: "bg-gradient-loans",
        },
        { key: "credit-cards", title: "Credits & Cards", icon: CreditCard, gradient: "bg-gradient-credit" },
    ];

const LOAN_SERVICES: ServiceGroup[] = [
    {
        title: "Business / MSME / Enterprise Loans",
        items: [
            {
                key: "msme-sme-loan",
                title: "MSME / SME Loan",
                description: "Funding for expansion, inventory and day-to-day operations with flexible repayment options.",
                applyHref: "/apply-now?product=msme-sme-loan",
                infoHref: "/business-loan",
                highlight: true,
                badge: "Popular",
            },
            ...makeItems({
                prefix: "biz",
                infoHref: "/business-loan",
                titles: [
                    "Business Loan",
                    "MSME Loan",
                    "SME Loan",
                    "Micro Enterprise Loan",
                    "Startup Loan",
                    "Working Capital Loan",
                    "Short-Term Business Loan",
                    "Long-Term Business Loan",
                    "Term Loan",
                    "Industrial Term Loan",
                    "Enterprise Business Loan",
                    "Unsecured Business Loan",
                    "Private Funding",
                    "Project Loan",
                    "Builder Project Loan",
                    "Developer Project Funding Loan",
                    "Greenfield Project Loan",
                    "Brownfield Expansion Loan",
                    "Cluster Financing Loan",
                    "SIDBI Assisted Loan",
                    "CGTMSE Loan",
                    "PMEGP Loan",
                    "Stand-Up India Loan",
                    "Mudra Shishu Loan",
                    "Mudra Kishor Loan",
                    "Mudra Tarun Loan",
                    "Women Entrepreneur Loan",
                    "Professional Loan (Doctors / CAs / Architects)",
                    "Loan for Professionals",
                    "Teacher Loan",
                    "Shopkeeper / Trader Loan",
                    "Self-Employed Loan",
                    "New to Credit Loan",
                ],
            }),
        ],
    },
    {
        title: "Working Capital / Credit Facilities",
        items: [
            ...makeItems({
                prefix: "wc",
                infoHref: "/business-loan",
                titles: [
                    "Working Capital",
                    "Working Capital Loan for Builders",
                    "Construction Working Capital Finance",
                    "Seasonal Working Capital Loan",
                    "Inventory / Raw Material Funding",
                    "Inventory Funding Loan",
                    "Power & Fuel Cost Funding Loan",
                    "Project Cash-Flow Funding",
                    "Overdraft Facility",
                    "Cash Credit Facility",
                    "OD / CC / Term Loan",
                    "Dropline Overdraft",
                    "Line of Credit (Business)",
                    "Flexi Business Loan",
                ],
            }),
        ],
    },
    {
        title: "Invoice / Trade / Supply Chain Finance",
        items: [
            ...makeItems({
                prefix: "trade",
                infoHref: "/business-loan",
                titles: [
                    "Invoice Discounting",
                    "Bill Discounting",
                    "Receivables Financing",
                    "Receivables Financing (Sold Units Funding)",
                    "Payables Financing",
                    "Supply Chain Finance",
                    "Dealer Finance",
                    "Distributor Finance",
                    "Vendor Financing",
                    "Buyer / Supplier Credit",
                    "Trade Finance",
                    "Export Packing Credit",
                    "Import Finance",
                    "Export-Oriented Unit (EOU) Loan",
                    "Letter of Credit (LC) Facility",
                    "Bank Guarantee (BG) Facility",
                ],
            }),
        ],
    },
    {
        title: "Industrial / Manufacturing / Infrastructure",
        items: [
            ...makeItems({
                prefix: "industrial",
                infoHref: "/business-loan",
                titles: [
                    "Manufacturing Unit Loan",
                    "Factory Setup Loan",
                    "Factory Building Loan",
                    "Industrial Expansion Loan",
                    "Industrial Infrastructure Loan",
                    "Industrial Shed Mortgage Loan",
                    "Industrial Plot Purchase Loan",
                    "MIDC / GIDC Plot + Construction Loan",
                    "Industrial Property Loan",
                    "Loan Against Industrial Property",
                    "Industrial Property Balance Transfer Loan",
                    "Leasehold Industrial Property Loan",
                    "Plant & Machinery Loan",
                    "Machinery Loan",
                    "Equipment Loan",
                    "Heavy Machinery Loan",
                    "CNC / VMC Machine Loan",
                    "Imported Machinery Finance",
                    "Technology Upgrade Loan",
                    "Energy-Efficient Machinery Loan",
                    "Pollution Control Equipment Loan",
                    "Pharma Machinery Loan",
                    "Plastic Injection / Moulding Machine Loan",
                    "Packaging & Printing Machine Loan",
                    "Food Processing Machinery Loan",
                    "Textile Machinery Loan",
                    "Engineering Industry Loan",
                    "Chemical & Pharma Industry Loan",
                    "Textile & Garment Unit Loan",
                    "Auto Ancillary Unit Loan",
                    "Plastic & Polymer Industry Loan",
                    "Food & Agro-Processing Unit Loan",
                    "Solar Plant Loan for Factories",
                    "Rooftop Solar Finance (Industrial)",
                    "Energy Efficiency Loan",
                    "Green Business Loan",
                ],
            }),
        ],
    },
    {
        title: "Real Estate / Builder / Project Finance",
        items: [
            ...makeItems({
                prefix: "re",
                infoHref: "/business-loan",
                titles: [
                    "Secured Construction Finance Loan",
                    "Construction Finance Loan",
                    "Construction Funding",
                    "Real Estate Project Finance",
                    "Residential Project Loan",
                    "Commercial Project Loan",
                    "Mixed-Use Development Loan",
                    "Under-Construction Project Loan",
                    "Land Purchase & Development Loan",
                    "Land Acquisition Loan",
                    "Plot Development Loan",
                    "Asset-Backed Project Loan",
                    "Bridge Finance / Bridge Loan",
                    "Short-Term Project Funding Loan",
                    "Buyer Advance / Escrow-Linked Project Loan",
                    "Sales-Linked Construction Finance",
                    "Structured Real Estate Finance",
                    "Mezzanine Project Loan",
                    "Subordinate Debt for Developers",
                    "Hybrid Debt-Equity Funding",
                    "Project Completion Funding",
                    "Project Refinance Loan",
                    "Take-Out Financing",
                    "Expansion / New Project Funding Loan",
                    "Stressed / Stalled Project Funding",
                    "Balance Sheet Cleanup Loan",
                    "Lease Rental Discounting (LRD)",
                    "Rental Income Backed Loan",
                    "Commercial Asset Monetization Loan",
                    "SPV (Special Purpose Vehicle) Project Loan",
                    "Corporate Real Estate Term Loan",
                    "Capex Loan for Construction Projects",
                ],
            }),
        ],
    },
    {
        title: "Personal / Consumer Loans",
        items: [
            ...makeItems({
                prefix: "personal",
                infoHref: "/personal-loan",
                titles: [
                    "Personal Loan",
                    "Personal Loan for Salaried Individuals",
                    "Instant Loan",
                    "Short-Term Loan",
                    "Long-Term Personal Loan",
                    "Flexi Personal Loan",
                    "Line of Credit (Personal)",
                    "Salary Advance Loan",
                    "Payday Loan",
                    "Emergency Loan",
                    "Wedding Loan",
                    "Travel / Vacation Loan",
                    "Festival Loan",
                    "Lifestyle Loan",
                    "Consumer Loan",
                    "Consumer Durable Loan",
                    "Electronics Loan",
                    "Mobile Phone Loan",
                    "Furniture Loan",
                    "No-Cost EMI Loan",
                ],
            }),
        ],
    },
    {
        title: "Education / Medical / Wellness",
        items: [
            ...makeItems({
                prefix: "edu-med",
                infoHref: "/personal-loan",
                titles: [
                    "Education Loan",
                    "Domestic Education Loan",
                    "Overseas Education Loan",
                    "Skill Development Loan",
                    "Skill Loan",
                    "Coaching / Test Prep Loan",
                    "Apprenticeship Loan",
                    "Medical Loan",
                    "Surgery Loan",
                    "IVF / Fertility Loan",
                    "Dental Loan",
                    "Wellness Loan",
                ],
            }),
        ],
    },
    {
        title: "Home & Property Loans",
        items: [
            {
                key: "home-loan",
                title: "Home Loan",
                description: "Buy a home with competitive rates, transparent terms and end-to-end guidance.",
                applyHref: "/apply-now?product=home-loan",
                infoHref: "/home-property-loan",
                highlight: true,
                badge: "Low Interest",
            },
            ...makeItems({
                prefix: "home-prop",
                infoHref: "/home-property-loan",
                titles: [
                    "Loan Against Property (LAP)",
                    "Residential LAP",
                    "Commercial LAP",
                    "Agreement Property Loan",
                    "Mortgage Loan",
                    "Tin Shed Property Loan",
                ],
            }),
        ],
    },
    {
        title: "Vehicle / Mobility Loans",
        items: [
            ...makeItems({
                prefix: "vehicle",
                infoHref: "/vehicle-loan",
                titles: [
                    "Vehicle Loan",
                    "Car Loan (New)",
                    "Used / Old Car Loan",
                    "Two-Wheeler Loan",
                    "Electric Two-Wheeler Loan",
                    "Electric Car Loan",
                    "EV Loan",
                    "EV Infrastructure Loan",
                    "Commercial Vehicle Loan",
                    "Truck Loan",
                    "Tip-Truck Loan",
                    "Fleet Finance",
                    "Taxi / Cab Loan",
                    "School Bus Loan",
                    "Construction Equipment Loan",
                    "Tractor Loan",
                ],
            }),
        ],
    },
    {
        title: "Gold & Asset-Backed Loans",
        items: [
            ...makeItems({
                prefix: "asset",
                infoHref: "/gold-asset-loan",
                titles: [
                    "Gold Loan",
                    "Gold Overdraft",
                    "Loan Against Securities (LAS)",
                    "Loan Against Shares",
                    "Loan Against Mutual Funds",
                    "Loan Against Bonds",
                    "Loan Against Fixed Deposit",
                    "Loan Against Recurring Deposit",
                    "Loan Against Insurance Policy",
                    "Loan Against NSC / KVP",
                    "Loan Against Warehouse Receipt",
                ],
            }),
        ],
    },
    {
        title: "Credit / Card / BNPL",
        items: [
            ...makeItems({
                prefix: "credit",
                infoHref: "/services/credit-cards",
                titles: [
                    "Personal Credit Card",
                    "Business Credit Card",
                    "Corporate Credit Card",
                    "EMI Card",
                    "Buy Now Pay Later (BNPL)",
                    "Postpaid Credit Line",
                    "Subscription Financing",
                ],
            }),
        ],
    },
    {
        title: "Government / Social / Rural",
        items: [
            ...makeItems({
                prefix: "govt",
                infoHref: "/services/government-schemes",
                titles: [
                    "PM Mudra Loan",
                    "All Central & State Government Scheme Loans",
                    "PM Awas Yojana Loan",
                    "PM SVANidhi Loan",
                    "PSB Loans in 59 Minutes",
                    "Jansamarth Scheme Loans",
                    "Microfinance Loan",
                    "P2P Loan",
                    "SHG Loan",
                    "NRLM / SHG Loan",
                    "Self-Help Group Loan",
                    "Minority Community Loan",
                    "SC / ST Development Loan",
                    "Differently-Abled Loan",
                ],
            }),
        ],
    },
    {
        title: "Agriculture & Allied",
        items: [
            ...makeItems({
                prefix: "agri",
                infoHref: "/services/loans",
                titles: [
                    "Agriculture Loan",
                    "Crop Loan",
                    "Kisan Credit Card (KCC)",
                    "Farm Mechanization Loan",
                    "Irrigation Loan",
                    "Dairy Loan",
                    "Poultry Loan",
                    "Fisheries Loan",
                    "Horticulture Loan",
                    "Cold Storage Loan",
                    "Allied Agriculture Loan",
                ],
            }),
        ],
    },
];

const SERVICES: Record<HubCategoryKey, ServiceCardItem[]> = {
    "salaried-employees": [],
    businesses: [],
    professionals: [
        ...makeItems({
            prefix: "pro",
            infoHref: "/business-loan",
            titles: [
                "Professional Loan (Doctors / CAs / Architects)",
                "Loan for Professionals",
                "Teacher Loan",
                "Shopkeeper / Trader Loan",
                "Self-Employed Loan",
                "New to Credit Loan",
            ],
        }),
    ],
    "govt-employees": [
        ...makeItems({
            prefix: "govt-emp",
            infoHref: "/personal-loan",
            titles: [
                "Personal Loan for Salaried Individuals",
                "Salary Advance Loan",
                "Line of Credit (Personal)",
                "Emergency Loan",
            ],
        }),
    ],
    "builders-developers": [],
    "credit-cards": [
        {
            key: "credit-line-flexi",
            title: "Credit Line / Flexi Loan",
            description: "Revolving limit you can draw from when needed.",
            applyHref: "/apply-now?product=credit-line-flexi",
            infoHref: "/services/credit-cards",
            highlight: true,
            badge: "Flexible",
        },
        {
            key: "business-credit-card",
            title: "Business Credit Card",
            description: "Higher limits and tracking for business spending.",
            applyHref: "/apply-now?product=business-credit-card",
            infoHref: "/services/credit-cards",
        },
        {
            key: "personal-credit-card",
            title: "Personal Credit Card",
            description: "Everyday credit with rewards and EMI options.",
            applyHref: "/apply-now?product=personal-credit-card",
            infoHref: "/services/credit-cards",
            badge: "Rewards",
        },
        {
            key: "corporate-credit-card",
            title: "Corporate Credit Card",
            description: "Corporate cards for company expenses and better spend controls.",
            applyHref: "/apply-now?product=corporate-credit-card",
            infoHref: "/services/credit-cards",
        },
        {
            key: "emi-card",
            title: "EMI Card",
            description: "Pre-approved EMI limit for easy instalment purchases.",
            applyHref: "/apply-now?product=emi-card",
            infoHref: "/services/credit-cards",
            badge: "EMI",
        },
        {
            key: "bnpl",
            title: "Buy Now Pay Later (BNPL)",
            description: "Split purchases into smaller scheduled payments.",
            applyHref: "/apply-now?product=bnpl",
            infoHref: "/services/credit-cards",
            highlight: true,
            badge: "0% EMI",
        },
        {
            key: "postpaid-credit-line",
            title: "Postpaid Credit Line",
            description: "A revolving postpaid line for everyday expenses and bill payments.",
            applyHref: "/apply-now?product=postpaid-credit-line",
            infoHref: "/services/credit-cards",
        },
        {
            key: "subscription-financing",
            title: "Subscription Financing",
            description: "Convert subscriptions into manageable monthly instalments.",
            applyHref: "/apply-now?product=subscription-financing",
            infoHref: "/services/credit-cards",
        },
        {
            key: "overdraft-against-credit-card",
            title: "Overdraft Against Credit Card",
            description: "Get an overdraft limit against your eligible credit card for flexible short-term needs.",
            applyHref: "/apply-now?product=overdraft-against-credit-card",
            infoHref: "/services/credit-cards",
            badge: "OD",
        },
        {
            key: "personal-loan-on-credit-card",
            title: "Personal Loan on Credit Card",
            description: "Convert eligible card offers into a personal loan with structured repayment.",
            applyHref: "/apply-now?product=personal-loan-on-credit-card",
            infoHref: "/services/credit-cards",
        },
        {
            key: "balance-transfer-cards",
            title: "Balance Transfer Cards",
            description: "Transfer outstanding balances to a new card for better rates and repayment convenience.",
            applyHref: "/apply-now?product=balance-transfer-cards",
            infoHref: "/services/credit-cards",
            badge: "BT",
        },
    ].map((item) => ({ ...item, imageSrc: getCreditCardImageSrc(item.title) })),
    "government-schemes": [
        {
            key: "pm-mudra",
            title: "PM Mudra Loan",
            description: "Collateral-free micro and small business loans.",
            applyHref: "/apply-now?product=pm-mudra-loan",
            infoHref: "/services/government-schemes",
            highlight: true,
            badge: "No Collateral",
        },
        {
            key: "mudra-shishu",
            title: "Mudra Shishu Loan",
            description: "Micro loans for early-stage small businesses under Mudra Shishu category.",
            applyHref: "/apply-now?product=mudra-shishu-loan",
            infoHref: "/services/government-schemes",
            badge: "Mudra",
        },
        {
            key: "mudra-kishor",
            title: "Mudra Kishor Loan",
            description: "Working capital loans for growing micro enterprises under Mudra Kishor.",
            applyHref: "/apply-now?product=mudra-kishor-loan",
            infoHref: "/services/government-schemes",
            badge: "Mudra",
        },
        {
            key: "mudra-tarun",
            title: "Mudra Tarun Loan",
            description: "Higher ticket Mudra loans for established micro enterprises under Mudra Tarun.",
            applyHref: "/apply-now?product=mudra-tarun-loan",
            infoHref: "/services/government-schemes",
            badge: "Mudra",
        },
        {
            key: "stand-up-india",
            title: "Stand-Up India",
            description: "Support for SC/ST and women entrepreneurs.",
            applyHref: "/apply-now?product=stand-up-india",
            infoHref: "/services/government-schemes",
            badge: "Women & SC/ST",
        },
        {
            key: "pmegp-loan",
            title: "PMEGP Loan",
            description: "Subsidy-linked credit for micro enterprises under PMEGP.",
            applyHref: "/apply-now?product=pmegp-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "cgtmse",
            title: "CGTMSE Loan",
            description: "Collateral-free MSME loans with credit guarantee support.",
            applyHref: "/apply-now?product=cgtmse-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "jansamarth",
            title: "Jansamarth Scheme Loans",
            description: "Apply for government credit-linked schemes via the Jansamarth portal.",
            applyHref: "/apply-now?product=jansamarth-scheme-loans",
            infoHref: "/services/government-schemes",
            badge: "Portal",
        },
        {
            key: "pm-svanidhi",
            title: "PM SVANidhi Loan",
            description: "Micro credit for street vendors under PM SVANidhi.",
            applyHref: "/apply-now?product=pm-svanidhi-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "pm-awas-yojana",
            title: "PM Awas Yojana Loan",
            description: "Housing-linked support for eligible beneficiaries under PMAY.",
            applyHref: "/apply-now?product=pm-awas-yojana-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "psb-59",
            title: "PSB Loans in 59 Minutes",
            description: "Quick in-principle approval through the PSB platform.",
            applyHref: "/apply-now?product=psb-loans-59-minutes",
            infoHref: "/services/government-schemes",
            highlight: true,
            badge: "59 Min Approval",
        },
    ],
};

const LOAN_GROUP_BY_TITLE = Object.fromEntries(
    LOAN_SERVICES.map((group) => [group.title, group])
) as Record<string, ServiceGroup>;

const SALARIED_EMPLOYEE_LOAN_OFFERS: ServiceGroup = {
    title: "Loan Offers for Salaried Employees",
    items: [
        ...makeItems({
            prefix: "salaried",
            infoHref: "/services/loans",
            titles: [
                "Personal Loan",
                "New Home Loan",
                "Resale Home Loan",
                "Home Extension Loan",
                "Self-Construction Home Loan",
                "Open Plot / Plot Purchase Loan",
                "Plot + Construction Loan",
                "Home Renovation / Improvement Loan",
                "New Car Loan",
                "Used / Resale Car Loan",
                "Education Loan",
                "Medical Emergency Loan",
                "Wedding / Marriage Loan",
                "Travel / Holiday Loan",
                "Consumer Durable Loan",
                "Loan Against Property (LAP)",
                "Salary Advance / Short-Term Loan",
                "Balance Transfer Loan",
                "Top-Up Loan",
                "Balance Transfer & Top-Up Loan",
                "Gold Loan",
                "Credit Card Loan",
                "Overdraft Facility for Salaried Employees",
                "Personal Overdraft Loan",
                "Flexi Personal Loan",
                "Flexi Home Loan",
                "Festival Loan Offers",
                "Instant Cash Loan",
                "Small Ticket Loan",
                "Emergency Cash Loan",
                "Digital / Paperless Loan",
                "Refinance Loan",
                "Pre-Approved Loan",
                "NRI Home Loan (for Salaried NRIs)",
                "Pension Loan",
                "Government Employee Special Loan",
                "Women Salaried Loan",
                "Green Home / EV Vehicle Loan",
                "Solar Panel Installation Loan",
                "Salary Account–Linked Loan",
                "Corporate Salary Package Loan",
                "Joint Home Loan",
                "No-Collateral Personal Loan",
                "Quick Disbursal Loan",
                "Same-Day Approval Loan",
                "Online Instant Approval Loan",
                "Lifestyle Loan",
                "Tax-Saving Home Loan",
                "PMAY-Linked Home Loan (Eligible Salaried Employees)",
            ],
        }).map((item) => ({ ...item, imageSrc: getSalariedCardImageSrc(item.title) })),
        ...makeItems({
            prefix: "salaried",
            infoHref: "/services/loans",
            titles: [
                "Personal & Instant Personal Loan",
                "Digital / Paperless Personal Loan",
                "Salary Loan (Private / Government / PSU)",
                "Senior Citizen Loan",
                "Medical & Personal Emergency Loan",
                "Wedding, Festival & Lifestyle Loan",
                "Debt Consolidation Loan",
                "Credit Card / Personal Loan Balance Transfer",
                "Home Purchase, Construction & Renovation Loan",
                "Ready & Under-Construction Property Loan",
                "Affordable Housing Loan",
                "Loan Against Property (Salaried)",
                "Car, Two-Wheeler & Three-Wheeler Loan",
                "EV Loan",
                "New & Used Vehicle Loan",
                "Education Loan (India & Abroad)",
                "Student Overdraft Loan",
            ],
        }).map((item) => ({ ...item, imageSrc: getSalariedCardImageSrc(item.title) })),
    ],
};

const BUSINESS_LOAN_SERVICES: ServiceGroup = {
    title: "Smart Loan & Funding Solutions for All Businesses — Proprietorships, Mid-Sized SMEs, Industrial Enterprises, and Corporates",
    items: [
        {
            key: "business-audience",
            title: "Proprietorships, SMEs, Industrial Enterprises & Corporates",
            description: "Solutions tailored to different business structures and funding needs.",
            applyHref: "/apply-now?product=business-business-audience",
            infoHref: "/business-loan",
            highlight: true,
            badge: "Business",
        },
        {
            key: "business-working-capital-loan",
            title: "Working Capital Loan",
            description: "Short-term funding to manage day-to-day operations and cash flow gaps.",
            applyHref: "/apply-now?product=business-working-capital-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-cash-credit-cc-facility",
            title: "Cash Credit (CC) Facility",
            description: "Revolving cash credit limit for ongoing working capital needs.",
            applyHref: "/apply-now?product=business-cash-credit-cc-facility",
            infoHref: "/business-loan",
        },
        {
            key: "business-overdraft-od-facility",
            title: "Overdraft (OD) Facility",
            description: "Flexible overdraft limit with interest charged only on utilised amount.",
            applyHref: "/apply-now?product=business-overdraft-od-facility",
            infoHref: "/business-loan",
        },
        {
            key: "business-short-term-business-loan",
            title: "Short-Term Business Loan",
            description: "Quick funding for urgent needs, seasonal demand or short cycles.",
            applyHref: "/apply-now?product=business-short-term-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-msme-business-loan",
            title: "MSME Business Loan",
            description: "Financing for MSMEs to support growth, operations and expansion.",
            applyHref: "/apply-now?product=business-msme-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-sme-term-loan",
            title: "SME Term Loan",
            description: "Structured term loan for SMEs with fixed tenure and repayment plan.",
            applyHref: "/apply-now?product=business-sme-term-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-startup-business-loan",
            title: "Startup Business Loan",
            description: "Funding for early-stage businesses based on profile and cash flows.",
            applyHref: "/apply-now?product=business-startup-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-proprietorship-business-loan",
            title: "Proprietorship Business Loan",
            description: "Loans designed for sole proprietors with simplified documentation.",
            applyHref: "/apply-now?product=business-proprietorship-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-partnership-firm-loan",
            title: "Partnership Firm Loan",
            description: "Business finance for partnership firms aligned to turnover and banking.",
            applyHref: "/apply-now?product=business-partnership-firm-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-unsecured-business-loan",
            title: "Unsecured Business Loan",
            description: "Collateral-free funding based on income, turnover and credit profile.",
            applyHref: "/apply-now?product=business-unsecured-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-collateral-free-business-loan",
            title: "Collateral-Free Business Loan",
            description: "Business loans without collateral, subject to eligibility and policy.",
            applyHref: "/apply-now?product=business-collateral-free-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-loan-against-property-business-lap",
            title: "Loan Against Property (Business LAP)",
            description: "Leverage property value to raise higher business funds at better rates.",
            applyHref: "/apply-now?product=business-loan-against-property-business-lap",
            infoHref: "/business-loan",
        },
        {
            key: "business-machinery-equipment-loan",
            title: "Machinery / Equipment Loan",
            description: "Finance purchase or upgrade of machinery to expand production capacity.",
            applyHref: "/apply-now?product=business-machinery-equipment-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-commercial-vehicle-loan",
            title: "Commercial Vehicle Loan",
            description: "Funding for commercial vehicles to support transport and logistics needs.",
            applyHref: "/apply-now?product=business-commercial-vehicle-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-industrial-term-loan",
            title: "Industrial Term Loan",
            description: "Longer-tenure funding for industrial capex and large business requirements.",
            applyHref: "/apply-now?product=business-industrial-term-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-manufacturing-unit-loan",
            title: "Manufacturing Unit Loan",
            description: "Project/capex support for manufacturing setup, upgrade, or expansion.",
            applyHref: "/apply-now?product=business-manufacturing-unit-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-raw-material-procurement-loan",
            title: "Raw Material Procurement Loan",
            description: "Working capital support to procure inventory and raw materials on time.",
            applyHref: "/apply-now?product=business-raw-material-procurement-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-business-expansion-loan",
            title: "Business Expansion Loan",
            description: "Funding to expand operations, add branches, or scale business capacity.",
            applyHref: "/apply-now?product=business-business-expansion-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-capacity-expansion-loan",
            title: "Capacity Expansion Loan",
            description: "Finance to increase output capacity via capex, machinery or upgrades.",
            applyHref: "/apply-now?product=business-capacity-expansion-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-franchise-branch-expansion-loan",
            title: "Franchise / Branch Expansion Loan",
            description: "Funding to open new outlets, franchises or branches with planned rollout.",
            applyHref: "/apply-now?product=business-franchise-branch-expansion-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-trade-finance-loan",
            title: "Trade Finance Loan",
            description: "Finance to support purchase cycles, trade transactions and working capital.",
            applyHref: "/apply-now?product=business-trade-finance-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-invoice-bill-discounting",
            title: "Invoice / Bill Discounting",
            description: "Unlock cash tied in receivables by discounting invoices and bills.",
            applyHref: "/apply-now?product=business-invoice-bill-discounting",
            infoHref: "/business-loan",
        },
        {
            key: "business-import-finance-loan",
            title: "Import Finance Loan",
            description: "Working capital support for imports including LC/BG-linked finance.",
            applyHref: "/apply-now?product=business-import-finance-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-export-finance-loan",
            title: "Export Finance Loan",
            description: "Finance to support export orders, production and shipment cycles.",
            applyHref: "/apply-now?product=business-export-finance-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-corporate-term-loan",
            title: "Corporate Term Loan",
            description: "Term funding for corporates for capex, growth and structured needs.",
            applyHref: "/apply-now?product=business-corporate-term-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-project-finance",
            title: "Project Finance",
            description: "Structured funding for large projects with milestone-based assessment.",
            applyHref: "/apply-now?product=business-project-finance",
            infoHref: "/business-loan",
        },
        {
            key: "business-structured-corporate-finance",
            title: "Structured Corporate Finance",
            description: "Customised corporate funding solutions based on cashflows and structure.",
            applyHref: "/apply-now?product=business-structured-corporate-finance",
            infoHref: "/business-loan",
        },
        {
            key: "business-syndicated-loan",
            title: "Syndicated Loan",
            description: "Large-ticket funding arranged through multiple lenders for scale.",
            applyHref: "/apply-now?product=business-syndicated-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-bridge-finance-for-corporates",
            title: "Bridge Finance for Corporates",
            description: "Short-term bridge funding to meet immediate corporate requirements.",
            applyHref: "/apply-now?product=business-bridge-finance-for-corporates",
            infoHref: "/business-loan",
        },
        {
            key: "business-pre-approved-business-loan",
            title: "Pre-Approved Business Loan",
            description: "Faster processing offers for eligible profiles with minimal steps.",
            applyHref: "/apply-now?product=business-pre-approved-business-loan",
            infoHref: "/business-loan",
        },
        {
            key: "business-digital-paperless-business-loan",
            title: "Digital / Paperless Business Loan",
            description: "Online-first loan journey with quick document checks and tracking.",
            applyHref: "/apply-now?product=business-digital-paperless-business-loan",
            infoHref: "/business-loan",
        },
        ...makeItems({
            prefix: "business",
            applyPrefix: "business-",
            infoHref: "/business-loan",
            titles: [
                "HUF Entity Loan",
                "LLP Loan",
                "OPC Private Limited Company Loan",
                "Private Limited Company Loan",
                "Public Limited Company Loan",
                "Section 8 Company Loan",
                "Producer Company Loan",
                "Nidhi Company Loan",
                "Co-operative Society Loan",
                "Government Company / PSU Loan",
                "Holding / Subsidiary / Associate Company Loan",
                "JV / Foreign / SPV Company Loan",
                "Corporate Working Capital Loan",
                "Corporate Overdraft / Cash Credit Facility",
                "Balance Sheet Based Loan",
                "Turnover Based Loan",
                "MSME Loan",
                "SME Loan",
                "Micro / Small / Medium Enterprise Loan",
                "Trader / Distributor / Dealer Loan",
                "Channel Partner Finance",
                "Stockist / Super Stockist Loan",
                "Retailer / Kirana / Supermarket Loan",
                "Seasonal Business Funding",
                "Factory Setup / Expansion Loan",
                "Greenfield / Brownfield Project Loan",
                "Industrial Shed / Plot Loan",
                "Capacity Enhancement Loan",
                "OEM / Ancillary Manufacturing Loan",
                "Industrial Modernization Loan",
                "Pollution Control Equipment Loan",
                "Plant & Machinery Loan",
                "Heavy / CNC / Textile / Printing Machinery Loan",
                "Construction & Mining Equipment Loan",
                "Solar & Renewable Equipment Finance",
                "Imported Machinery Finance",
                "Machinery Refinance",
                "Line of Credit",
                "Trade Finance",
                "Inventory Finance",
                "PO-Based Funding",
                "GST-Based Loan",
                "Bank Statement-Based Loan",
                "Supply Chain Finance",
                "IT / SaaS Company Loan",
                "Logistics Company Loan",
                "Real Estate Company Loan",
                "Hospital Group Loan",
                "Educational Institution Loan",
            ],
        }),
    ].map((item) => ({ ...item, imageSrc: getBusinessCardImageSrc(item.key) })),
};

const PROFESSIONAL_LOAN_SERVICES: ServiceGroup = {
    title: "Smart Loan & Funding Solutions for All Professionals — Doctors, Chartered Accountants, Architects, Engineers, Lawyers, Consultants, and Self-Employed Professionals",
    items: [
        {
            key: "professional-audience",
            title: "Doctors, CAs, Architects, Engineers, Lawyers, Consultants, Self-Employed",
            description: "Funding options tailored for working professionals and self-employed profiles.",
            applyHref: "/apply-now?product=professional-professional-audience",
            infoHref: "/personal-loan",
            highlight: true,
            badge: "Professionals",
        },
        {
            key: "professional-professional-personal-loan",
            title: "Professional Personal Loan",
            description: "Unsecured personal loan options designed for professional income profiles.",
            applyHref: "/apply-now?product=professional-professional-personal-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-doctor-loan",
            title: "Doctor Loan",
            description: "Loans for doctors to support practice setup, equipment or working capital.",
            applyHref: "/apply-now?product=professional-doctor-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-chartered-accountant-ca-loan",
            title: "Chartered Accountant (CA) Loan",
            description: "Funding for CA professionals for office setup, expansion and cashflow needs.",
            applyHref: "/apply-now?product=professional-chartered-accountant-ca-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-architect-loan",
            title: "Architect Loan",
            description: "Finance for architects to manage projects, tools, office setup and growth.",
            applyHref: "/apply-now?product=professional-architect-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-engineer-loan",
            title: "Engineer Loan",
            description: "Loan options for engineers for business needs, equipment and working capital.",
            applyHref: "/apply-now?product=professional-engineer-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-lawyer-advocate-loan",
            title: "Lawyer / Advocate Loan",
            description: "Funding support for advocates to set up chambers, manage cases and cashflow.",
            applyHref: "/apply-now?product=professional-lawyer-advocate-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-consultant-loan",
            title: "Consultant Loan",
            description: "Unsecured funding for consultants to support growth, travel and operations.",
            applyHref: "/apply-now?product=professional-consultant-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-self-employed-professional-loan",
            title: "Self-Employed Professional Loan",
            description: "Loans for self-employed professionals based on cashflow and banking history.",
            applyHref: "/apply-now?product=professional-self-employed-professional-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-practice-setup-loan",
            title: "Practice Setup Loan",
            description: "Finance to start or upgrade your clinic/office/practice with planned spend.",
            applyHref: "/apply-now?product=professional-practice-setup-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-clinic-office-purchase-loan",
            title: "Clinic / Office Purchase Loan",
            description: "Funding for purchase of clinic or office premises with structured tenure.",
            applyHref: "/apply-now?product=professional-clinic-office-purchase-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-clinic-office-renovation-loan",
            title: "Clinic / Office Renovation Loan",
            description: "Renovation finance for interiors, upgrades and setup improvements.",
            applyHref: "/apply-now?product=professional-clinic-office-renovation-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-medical-equipment-loan",
            title: "Medical Equipment Loan",
            description: "Equipment financing for diagnostic/medical devices with repayment options.",
            applyHref: "/apply-now?product=professional-medical-equipment-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-office-equipment-loan",
            title: "Office Equipment Loan",
            description: "Finance office equipment purchases like computers, furniture and tools.",
            applyHref: "/apply-now?product=professional-office-equipment-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-working-capital-loan-for-professionals",
            title: "Working Capital Loan for Professionals",
            description: "Manage monthly cashflow, receivables and operating expenses smoothly.",
            applyHref: "/apply-now?product=professional-working-capital-loan-for-professionals",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-unsecured-professional-loan",
            title: "Unsecured Professional Loan",
            description: "Collateral-free loan based on profile, income and credit eligibility.",
            applyHref: "/apply-now?product=professional-unsecured-professional-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-loan-against-property-for-professionals",
            title: "Loan Against Property for Professionals",
            description: "Use property as collateral to access higher ticket funding at better terms.",
            applyHref: "/apply-now?product=professional-loan-against-property-for-professionals",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-overdraft-facility-for-professionals",
            title: "Overdraft Facility for Professionals",
            description: "Flexible overdraft for professionals with interest on utilised amount.",
            applyHref: "/apply-now?product=professional-overdraft-facility-for-professionals",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-balance-transfer-for-professional-loans",
            title: "Balance Transfer for Professional Loans",
            description: "Shift existing loan to better rates/terms and reduce monthly burden.",
            applyHref: "/apply-now?product=professional-balance-transfer-for-professional-loans",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-top-up-loan-for-professionals",
            title: "Top-Up Loan for Professionals",
            description: "Additional funding over an existing loan for expansion or urgent needs.",
            applyHref: "/apply-now?product=professional-top-up-loan-for-professionals",
            infoHref: "/personal-loan",
        },
        {
            key: "professional-tax-saving-loan-for-professionals",
            title: "Tax-Saving Loan for Professionals",
            description: "Loan planning aligned with eligible tax-saving benefits (where applicable).",
            applyHref: "/apply-now?product=professional-tax-saving-loan-for-professionals",
            infoHref: "/personal-loan",
        },
        ...makeItems({
            prefix: "professional",
            applyPrefix: "professional-",
            infoHref: "/personal-loan",
            titles: [
                "CA / CS / CMA Loan",
                "Lawyer & Legal Practice Loan",
                "Engineer / Architect Loan",
                "Doctor / Dentist Loan",
                "IT Professional / Freelancer Loan",
                "Teacher / Education Consultant Loan",
                "Management / HR Consultant Loan",
                "Consultancy Loan",
                "IT / SaaS Business Loan",
                "Digital Marketing Agency Loan",
                "Logistics & Courier Services Loan",
                "BPO / KPO Loan",
                "Staffing Company Loan",
                "Professional Practice Setup Loan",
            ],
        }),
    ].map((item) => ({ ...item, imageSrc: getProfessionalCardImageSrc(item.title) })),
};

const GOVT_EMPLOYEE_LOAN_SERVICES: ServiceGroup = {
    title: "Smart Loan & Funding Solutions for Central & State Government Employees — Civil Services, Public Sector Staff, Defence Personnel, and Other Government Employees",
    items: [
        {
            key: "govt-employee-audience",
            title: "Civil Services, PSU Staff, Defence & Govt Employees",
            description: "Loan options designed for stable income profiles and salaried government employees.",
            applyHref: "/apply-now?product=govt-employee-govt-employee-audience",
            infoHref: "/personal-loan",
            highlight: true,
            badge: "Govt",
        },
        {
            key: "govt-employee-government-employee-personal-loan",
            title: "Government Employee Personal Loan",
            description: "Personal loan options tailored to government salary profiles and eligibility.",
            applyHref: "/apply-now?product=govt-employee-government-employee-personal-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-central-government-employee-loan",
            title: "Central Government Employee Loan",
            description: "Loans for central government staff with structured repayment and support.",
            applyHref: "/apply-now?product=govt-employee-central-government-employee-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-state-government-employee-loan",
            title: "State Government Employee Loan",
            description: "Funding options for state government employees based on salary eligibility.",
            applyHref: "/apply-now?product=govt-employee-state-government-employee-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-psu-employee-loan",
            title: "PSU Employee Loan",
            description: "Loans for PSU employees with quick processing and transparent terms.",
            applyHref: "/apply-now?product=govt-employee-psu-employee-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-defence-personnel-loan",
            title: "Defence Personnel Loan",
            description: "Loan solutions for defence personnel with profile-based eligibility support.",
            applyHref: "/apply-now?product=govt-employee-defence-personnel-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-salary-based-personal-loan",
            title: "Salary-Based Personal Loan",
            description: "Personal loans based on salary credits and banking conduct.",
            applyHref: "/apply-now?product=govt-employee-salary-based-personal-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-pre-approved-salary-loan",
            title: "Pre-Approved Salary Loan",
            description: "Fast-track offers for eligible salary accounts with minimal steps.",
            applyHref: "/apply-now?product=govt-employee-pre-approved-salary-loan",
            infoHref: "/personal-loan",
            badge: "Fast",
        },
        {
            key: "govt-employee-pension-loan",
            title: "Pension Loan",
            description: "Loans for pensioners with eligibility based on pension credits and profile.",
            applyHref: "/apply-now?product=govt-employee-pension-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-home-loan-for-government-employees",
            title: "Home Loan for Government Employees",
            description: "Home loan options with competitive terms for eligible government employees.",
            applyHref: "/apply-now?product=govt-employee-home-loan-for-government-employees",
            infoHref: "/home-property-loan",
        },
        {
            key: "govt-employee-car-loan-for-government-employees",
            title: "Car Loan for Government Employees",
            description: "Vehicle financing options aligned to salary profiles and repayment comfort.",
            applyHref: "/apply-now?product=govt-employee-car-loan-for-government-employees",
            infoHref: "/vehicle-loan",
        },
        {
            key: "govt-employee-education-loan-for-government-employees",
            title: "Education Loan for Government Employees",
            description: "Education funding support for higher studies with guided documentation.",
            applyHref: "/apply-now?product=govt-employee-education-loan-for-government-employees",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-loan-against-property-for-govt-employees",
            title: "Loan Against Property for Govt Employees",
            description: "Leverage property value to access higher ticket funding at better rates.",
            applyHref: "/apply-now?product=govt-employee-loan-against-property-for-govt-employees",
            infoHref: "/home-property-loan",
        },
        {
            key: "govt-employee-salary-overdraft-facility",
            title: "Salary Overdraft Facility",
            description: "Overdraft linked to salary account for flexible short-term liquidity.",
            applyHref: "/apply-now?product=govt-employee-salary-overdraft-facility",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-emergency-loan-for-government-employees",
            title: "Emergency Loan for Government Employees",
            description: "Quick funding for emergencies with simplified checks and support.",
            applyHref: "/apply-now?product=govt-employee-emergency-loan-for-government-employees",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-balance-transfer-for-salary-loans",
            title: "Balance Transfer for Salary Loans",
            description: "Move existing loan to better rates/terms and reduce EMI burden.",
            applyHref: "/apply-now?product=govt-employee-balance-transfer-for-salary-loans",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-top-up-loan-on-existing-loan",
            title: "Top-Up Loan on Existing Loan",
            description: "Additional funding over an existing loan for planned or urgent needs.",
            applyHref: "/apply-now?product=govt-employee-top-up-loan-on-existing-loan",
            infoHref: "/personal-loan",
        },
        {
            key: "govt-employee-special-scheme-loan-for-govt-employees",
            title: "Special Scheme Loan for Govt Employees",
            description: "Special offers/structured products for eligible government employee profiles.",
            applyHref: "/apply-now?product=govt-employee-special-scheme-loan-for-govt-employees",
            infoHref: "/personal-loan",
        },
        ...makeItems({
            prefix: "govt-employee",
            applyPrefix: "govt-employee-",
            infoHref: "/personal-loan",
            titles: [
                "Government Salary Loan",
                "Government Personal Loan",
                "Government Home Loan",
                "Government Vehicle Loan",
                "Loan Against Property (Govt Employees)",
            ],
        }),
    ].map((item) => ({ ...item, imageSrc: getGovtEmployeeCardImageSrc(item.title) })),
};

const GOVT_SCHEME_SERVICES: ServiceGroup = {
    title: "End-to-End Financing Support for Central & State Government Schemes",
    items: [
        {
            key: "govt-scheme-pmegp-loan",
            title: "PMEGP Loan",
            description: "Subsidy-linked credit support for eligible micro enterprises under PMEGP.",
            applyHref: "/apply-now?product=govt-scheme-pmegp-loan",
            infoHref: "/services/government-schemes",
            highlight: true,
            badge: "Subsidy",
        },
        {
            key: "govt-scheme-mudra-loan-shishu-kishor-tarun",
            title: "Mudra Loan (Shishu, Kishor, Tarun)",
            description: "Collateral-free micro & small business loans across Mudra categories.",
            applyHref: "/apply-now?product=govt-scheme-mudra-loan-shishu-kishor-tarun",
            infoHref: "/services/government-schemes",
            badge: "Mudra",
        },
        {
            key: "govt-scheme-stand-up-india-loan",
            title: "Stand-Up India Loan",
            description: "Support for women and SC/ST entrepreneurs to start greenfield enterprises.",
            applyHref: "/apply-now?product=govt-scheme-stand-up-india-loan",
            infoHref: "/services/government-schemes",
            badge: "Scheme",
        },
        {
            key: "govt-scheme-cgtmse-backed-business-loan",
            title: "CGTMSE-Backed Business Loan",
            description: "Collateral-free MSME credit backed by CGTMSE guarantee coverage.",
            applyHref: "/apply-now?product=govt-scheme-cgtmse-backed-business-loan",
            infoHref: "/services/government-schemes",
            badge: "No Collateral",
        },
        {
            key: "govt-scheme-pmay-home-loan-urban-and-rural",
            title: "PMAY Home Loan (Urban & Rural)",
            description: "Housing-linked support for eligible beneficiaries under PMAY schemes.",
            applyHref: "/apply-now?product=govt-scheme-pmay-home-loan-urban-and-rural",
            infoHref: "/services/government-schemes",
            badge: "Housing",
        },
        {
            key: "govt-scheme-credit-linked-subsidy-scheme-clss",
            title: "Credit-Linked Subsidy Scheme (CLSS)",
            description: "Interest subsidy benefits for eligible home loan borrowers under CLSS.",
            applyHref: "/apply-now?product=govt-scheme-credit-linked-subsidy-scheme-clss",
            infoHref: "/services/government-schemes",
        },
        {
            key: "govt-scheme-msme-government-scheme-loan",
            title: "MSME Government Scheme Loan",
            description: "Scheme-aligned MSME loans with guidance on eligibility and documentation.",
            applyHref: "/apply-now?product=govt-scheme-msme-government-scheme-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "govt-scheme-startup-india-scheme-loan",
            title: "Startup India Scheme Loan",
            description: "Funding support for eligible startups with scheme/process guidance.",
            applyHref: "/apply-now?product=govt-scheme-startup-india-scheme-loan",
            infoHref: "/services/government-schemes",
            badge: "Startup",
        },
        {
            key: "govt-scheme-women-entrepreneurship-scheme-loan",
            title: "Women Entrepreneurship Scheme Loan",
            description: "Loan assistance for women entrepreneurs under eligible programs.",
            applyHref: "/apply-now?product=govt-scheme-women-entrepreneurship-scheme-loan",
            infoHref: "/services/government-schemes",
            badge: "Women",
        },
        {
            key: "govt-scheme-sc-st-category-business-loan",
            title: "SC / ST Category Business Loan",
            description: "Business loan guidance for SC/ST category applicants under scheme norms.",
            applyHref: "/apply-now?product=govt-scheme-sc-st-category-business-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "govt-scheme-minority-community-business-loan",
            title: "Minority Community Business Loan",
            description: "Support for minority community applicants under eligible lending programs.",
            applyHref: "/apply-now?product=govt-scheme-minority-community-business-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "govt-scheme-agriculture-and-allied-activity-loan",
            title: "Agriculture & Allied Activity Loan",
            description: "Loans for farming and allied activities with scheme-led guidance.",
            applyHref: "/apply-now?product=govt-scheme-agriculture-and-allied-activity-loan",
            infoHref: "/services/government-schemes",
            badge: "Agri",
        },
        {
            key: "govt-scheme-skill-development-scheme-loan",
            title: "Skill Development Scheme Loan",
            description: "Funding support for skill development and training aligned programs.",
            applyHref: "/apply-now?product=govt-scheme-skill-development-scheme-loan",
            infoHref: "/services/government-schemes",
        },
        {
            key: "govt-scheme-state-government-subsidy-loan",
            title: "State Government Subsidy Loan",
            description: "State subsidy-linked financing support for eligible profiles and purposes.",
            applyHref: "/apply-now?product=govt-scheme-state-government-subsidy-loan",
            infoHref: "/services/government-schemes",
            badge: "Subsidy",
        },
        {
            key: "govt-scheme-central-government-sponsored-scheme-loan",
            title: "Central Government Sponsored Scheme Loan",
            description: "Assistance for central schemes with eligibility checks and documentation.",
            applyHref: "/apply-now?product=govt-scheme-central-government-sponsored-scheme-loan",
            infoHref: "/services/government-schemes",
            badge: "Scheme",
        },
        {
            "key": "venture-capital",
            "title": "Venture Capital",
            "description": "Equity and funding support for startups and high-growth businesses to scale operations and innovation.",
            "applyHref": "/apply-now?product=venture-capital",
            "infoHref": "/services/government-schemes",
            "highlight": false,
            "badge": "Funding"
        },
        {
            "key": "maha-udyog-financing",
            "title": "Maha Udyog",
            "description": "End-to-end financing support for central and state government schemes including subsidies, term loans, and working capital assistance.",
            "applyHref": "/apply-now?product=maha-udyog-financing",
            "infoHref": "/services/government-schemes",
            "highlight": true,
            "badge": "Govt Support"
        }

        ,
        ...makeItems({
            prefix: "govt-scheme",
            applyPrefix: "govt-scheme-",
            infoHref: "/services/government-schemes",
            titles: [
                "PM Vishwakarma Loan",
                "PM SVANidhi Loan",
                "ECLGS Loan",
                "Startup India Seed Fund Scheme",
                "State & Central Subsidy Linked Loans",
                "Agriculture Loan",
                "Crop Loan",
                "Dairy / Poultry Loan",
                "Tractor & Farm Equipment Loan",
                "Irrigation Loan",
                "Cold Storage Loan",
                "FPO Loan",
                "Rural Infrastructure Loan",
            ],
        }),

    ].map((item) => ({ ...item, imageSrc: getGovtSchemeCardImageSrc(item.title) })),
};

const BUILDER_DEVELOPER_SERVICES: ServiceGroup = {
    title: "Smart Loan & Project Funding Solutions for Builders & Developers",
    items: [
        {
            key: "builder-builder-project-loan",
            title: "Builder Project Loan",
            description: "Project funding for builders with structured disbursal and milestone tracking.",
            applyHref: "/apply-now?product=builder-builder-project-loan",
            infoHref: "/business-loan",
            highlight: true,
            badge: "Project",
        },
        {
            key: "builder-real-estate-project-funding",
            title: "Real Estate Project Funding",
            description: "Funding solutions for real estate projects based on cashflows and approvals.",
            applyHref: "/apply-now?product=builder-real-estate-project-funding",
            infoHref: "/business-loan",
        },
        {
            key: "builder-construction-finance-loan",
            title: "Construction Finance Loan",
            description: "Construction finance with planned disbursal tied to project progress.",
            applyHref: "/apply-now?product=builder-construction-finance-loan",
            infoHref: "/business-loan",
        },
        {
            key: "builder-residential-project-funding",
            title: "Residential Project Funding",
            description: "Funding for residential developments to support construction and completion.",
            applyHref: "/apply-now?product=builder-residential-project-funding",
            infoHref: "/business-loan",
        },
        {
            key: "builder-commercial-project-funding",
            title: "Commercial Project Funding",
            description: "Finance for commercial projects aligned to leasing/sales and cashflow.",
            applyHref: "/apply-now?product=builder-commercial-project-funding",
            infoHref: "/business-loan",
        },
        {
            key: "builder-mixed-use-development-loan",
            title: "Mixed-Use Development Loan",
            description: "Funding for mixed-use projects combining residential and commercial assets.",
            applyHref: "/apply-now?product=builder-mixed-use-development-loan",
            infoHref: "/business-loan",
        },
        {
            key: "builder-land-purchase-loan",
            title: "Land Purchase Loan",
            description: "Land acquisition finance for project development and expansion plans.",
            applyHref: "/apply-now?product=builder-land-purchase-loan",
            infoHref: "/business-loan",
        },
        {
            key: "builder-plot-development-loan",
            title: "Plot Development Loan",
            description: "Funding for plot development, approvals, infrastructure and site readiness.",
            applyHref: "/apply-now?product=builder-plot-development-loan",
            infoHref: "/business-loan",
        },
        {
            key: "builder-construction-working-capital-loan",
            title: "Construction Working Capital Loan",
            description: "Working capital support for construction expenses and vendor payments.",
            applyHref: "/apply-now?product=builder-construction-working-capital-loan",
            infoHref: "/business-loan",
        },
        {
            key: "builder-inventory-funding-for-builders",
            title: "Inventory Funding for Builders",
            description: "Funding support to manage inventory cycles and raw material procurement.",
            applyHref: "/apply-now?product=builder-inventory-funding-for-builders",
            infoHref: "/business-loan",
        },
        {
            key: "builder-lease-rental-discounting-lrd",
            title: "Lease Rental Discounting (LRD)",
            description: "Raise funds against lease rentals from commercial properties.",
            applyHref: "/apply-now?product=builder-lease-rental-discounting-lrd",
            infoHref: "/business-loan",
            badge: "LRD",
        },
        {
            key: "builder-loan-against-property-for-builders",
            title: "Loan Against Property for Builders",
            description: "Use property as collateral to access higher ticket builder funding.",
            applyHref: "/apply-now?product=builder-loan-against-property-for-builders",
            infoHref: "/business-loan",
        },
        {
            key: "builder-bridge-loan-for-builders",
            title: "Bridge Loan for Builders",
            description: "Short-term bridge funding to manage project timelines and cash gaps.",
            applyHref: "/apply-now?product=builder-bridge-loan-for-builders",
            infoHref: "/business-loan",
            badge: "Bridge",
        },
        {
            key: "builder-project-expansion-funding",
            title: "Project Expansion Funding",
            description: "Funding to expand project scope, add phases or increase capacity.",
            applyHref: "/apply-now?product=builder-project-expansion-funding",
            infoHref: "/business-loan",
        },
        {
            key: "builder-redevelopment-project-loan",
            title: "Redevelopment Project Loan",
            description: "Finance solutions for redevelopment projects and project completion.",
            applyHref: "/apply-now?product=builder-redevelopment-project-loan",
            infoHref: "/business-loan",
        },
        {
            key: "builder-joint-development-project-funding",
            title: "Joint Development Project Funding",
            description: "Funding support for joint development arrangements and SPV structures.",
            applyHref: "/apply-now?product=builder-joint-development-project-funding",
            infoHref: "/business-loan",
        },
        {
            key: "builder-balance-transfer-for-builder-loans",
            title: "Balance Transfer for Builder Loans",
            description: "Transfer existing builder/project loan to better terms and reduce cost.",
            applyHref: "/apply-now?product=builder-balance-transfer-for-builder-loans",
            infoHref: "/business-loan",
        },
        {
            key: "builder-project-restructuring-takeover-loan",
            title: "Project Restructuring / Takeover Loan",
            description: "Restructure or takeover project finance to improve timelines and liquidity.",
            applyHref: "/apply-now?product=builder-project-restructuring-takeover-loan",
            infoHref: "/business-loan",
        },
        ...makeItems({
            prefix: "builder",
            applyPrefix: "builder-",
            infoHref: "/business-loan",
            titles: [
                "Warehouse & SEZ Project Finance",
                "Rental Income Based Loan",
            ],
        }),
    ].map((item) => ({ ...item, imageSrc: getBuilderDeveloperCardImageSrc(item.title) })),
};

const GROUPED_SERVICES: Partial<Record<HubCategoryKey, ServiceGroup[]>> = {
    "salaried-employees": [SALARIED_EMPLOYEE_LOAN_OFFERS],
    businesses: [BUSINESS_LOAN_SERVICES],
    professionals: [PROFESSIONAL_LOAN_SERVICES],
    "govt-employees": [GOVT_EMPLOYEE_LOAN_SERVICES],
    "government-schemes": [GOVT_SCHEME_SERVICES],
    "builders-developers": [BUILDER_DEVELOPER_SERVICES],
};

const TRUST_INDICATORS = [
    { icon: Users, value: "60,000+", label: "Happy Customers" },
    { icon: TrendingUp, value: "₹600 Cr+", label: "Loans Disbursed" },
    { icon: Clock, value: "48 Hours", label: "Average Approval" },
    { icon: FileCheck, value: "96%", label: "Success Rate" },
];

type ServiceProductCardAction = {
    href: string;
    label: string;
};

type ServiceProductCardData = {
    key: string;
    title: string;
    description: string;
    imageSrc: string;
    applyHref: string;
    badge?: string;
    highlight?: boolean;
};

function ServiceProductCard({
    service,
    categoryKey,
    imageObjectPosition = "object-[50%_5%]",
    animationDelay,
    onCardClick,
    onApplyClick,
    secondaryActions,
}: {
    service: ServiceProductCardData;
    categoryKey: string;
    imageObjectPosition?: string;
    animationDelay?: number;
    onCardClick?: MouseEventHandler<HTMLDivElement>;
    onApplyClick?: MouseEventHandler<HTMLButtonElement>;
    secondaryActions: ServiceProductCardAction[];
}) {
    const loanTypeKey = service.applyHref.split("product=")[1]?.split("&")[0];
    const cardClassName =
        serviceProductCardShell +
        (service.highlight ? " " + serviceProductCardShellHighlight : "");
    const imageClassName = serviceProductCardImage + " " + imageObjectPosition;
    const badgeClassName =
        serviceProductBadgeBase +
        " " +
        (service.highlight ? serviceProductBadgeHighlight : serviceProductBadgeDefault);

    return (
        <Card
            className={cardClassName}
            style={animationDelay !== undefined ? { animationDelay: animationDelay + "ms" } : undefined}
            onClick={onCardClick}
        >
            <div className={serviceProductCardImageWrap}>
                <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={imageClassName}
                />
                <div className={serviceProductCardImageFade} aria-hidden />
                {service.badge ? (
                    <Badge className={badgeClassName}>{service.badge}</Badge>
                ) : null}
            </div>

            <CardHeader className={serviceProductCardHeader}>
                <CardTitle className={serviceProductCardTitle}>{service.title}</CardTitle>
                <CardDescription className={serviceProductCardDescription}>
                    {service.description}
                </CardDescription>
            </CardHeader>

            <CardContent className={serviceProductCardContent}>
                <div className={serviceProductCardActions}>
                    <ApplyNowCTAButton
                        loanType={service.title}
                        loanTypeKey={loanTypeKey}
                        categoryKey={categoryKey}
                        variant="default"
                        className={serviceProductBtnPrimary}
                        size="default"
                        onClick={onApplyClick}
                    >
                        Apply Now
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </ApplyNowCTAButton>
                    {secondaryActions.map((action) => (
                        <Button
                            key={action.href + action.label}
                            asChild
                            variant="outline"
                            className={serviceProductBtnSecondary}
                        >
                            <Link href={action.href}>{action.label}</Link>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default function ServicesHubClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState<HubCategoryKey>("salaried-employees");
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [selectedSalariedOfferKey, setSelectedSalariedOfferKey] = useState<string | null>(null);
    const [selectedSalariedOfferTitle, setSelectedSalariedOfferTitle] = useState<string | null>(null);
    const [selectedBusinessOfferKey, setSelectedBusinessOfferKey] = useState<string | null>(null);
    const [selectedBusinessOfferTitle, setSelectedBusinessOfferTitle] = useState<string | null>(null);
    const [selectedCreditOfferTitle, setSelectedCreditOfferTitle] = useState<string | null>(null);

    useEffect(() => {
        const requested = searchParams.get("category") as HubCategoryKey | null;
        if (requested && requested in SERVICES) {
            setActiveCategory(requested);
        }
    }, [searchParams]);

    const activeCards = useMemo(() => SERVICES[activeCategory], [activeCategory]);
    const activeMeta = CATEGORY_META.find((c) => c.key === activeCategory)!;
    const activeGroups = GROUPED_SERVICES[activeCategory];

    const isSalariedEmployeesCategory = activeCategory === "salaried-employees";

    const openModalWithAuth = async (modalKey: string) => {
        try {
            const res = await fetch("/api/auth/me", {
                credentials: "include",
                cache: "no-store",
            });
            if (res.ok) {
                setActiveModal(modalKey);
                return;
            }
        } catch {
            // Falls through to login redirect below.
        }

        const nextPath =
            typeof window !== "undefined"
                ? `${window.location.pathname}${window.location.search}`
                : "/services";
        router.push(`/login?next=${encodeURIComponent(nextPath)}`);
    };

    const handleOpenModal = (modalKey: string) => (e: React.MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest("button, a")) return;
        void openModalWithAuth(modalKey);
    };

    /** Open category loan modal first; Google Form opens after submit (success modal). */
    const handleApplyClick = (
        fallback?: () => void
    ): MouseEventHandler<HTMLButtonElement> => (e) => {
        if (!fallback) return;
        e.preventDefault();
        fallback();
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC]">
            <section
                className={cn("relative overflow-hidden", serviceSectionToneAccent, serviceSectionMajor)}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#00AEEF]/5 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00AEEF]/5 blur-3xl" />
                </div>

                <div className="absolute inset-0 opacity-30">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, #00AEEF 1px, transparent 0)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className={serviceSectionHeroFade} aria-hidden />

                <div className={cn("relative z-10", serviceSectionContainer)}>
                    <div className="max-w-3xl">
                        <Badge className={serviceSectionEyebrow}>
                            <Sparkles className="mr-1 h-3 w-3" />
                            Trusted Financial Partner
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                            Your Financial Goals,{" "}
                            <span className="text-[#00AEEF]">Simplified</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-[#666666] sm:text-xl">
                            From personal loans to business funding, insurance to credit cards — we help you access the right
                            financial products with complete transparency.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button asChild size="xl" className="bg-[#00AEEF] text-white hover:bg-[#008FCC] shadow-sm">
                                <Link href="#services">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="xl"
                                className="border border-[#D6EEF8] bg-white text-[#00AEEF] hover:border-[#00AEEF] hover:bg-[#E6F7FD]"
                            >
                                <Link href="/contact">Talk to an Expert</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <ServiceSection tone="page">
                <div className={serviceHighlightsStack}>
                    <PrivateInstitutionalHighlight />
                    <PoorCibilHighlight />
                    <EmiRestructuringHighlight />
                    <PropertyLoanHighlight />
                </div>
            </ServiceSection>

            <ServiceSection tone="white">
                    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                        {TRUST_INDICATORS.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex animate-fade-in items-center gap-4 rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,174,239,0.12)]"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F7FD]">
                                    <item.icon className="h-6 w-6 text-[#00AEEF]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#1A1A1A]">{item.value}</p>
                                    <p className="text-sm text-[#666666]">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
            </ServiceSection>

            <ServiceSection tone="page">
                    <header className={serviceSectionIntro}>
                        <h2 className={serviceSectionTitle}>
                            Explore Our <span className="text-[#00AEEF] text-7xl">Loan</span> Services
                        </h2>
                        <p className={serviceSectionSubtitle}>
                            Explore a comprehensive range of financial solutions tailored to your specific needs.
                        </p>
                    </header>

                    <div id="ourAllServices" className={serviceCategoryGridSpacing}>
                        {CATEGORY_META.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = cat.key === activeCategory;

                            const handleCategoryClick = () => {
                                setActiveCategory(cat.key);
                            };

                            return (
                                <Button
                                    key={cat.key}
                                    type="button"
                                    size="lg"
                                    variant="tab-inactive"
                                    onClick={handleCategoryClick}
                                    className={`group h-auto w-full justify-start gap-4 rounded-2xl border px-5 py-5 text-left text-base leading-snug transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,174,239,0.12)] focus-visible:ring-2 focus-visible:ring-[#00AEEF]/40 sm:text-lg whitespace-normal ${isActive
                                        ? "scale-[1.02] border-[#00AEEF] bg-white shadow-[0_8px_24px_rgba(0,174,239,0.12)]"
                                        : "border-[#D6EEF8] bg-white hover:border-[#00AEEF]"
                                        }`}
                                >
                                    <span
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${isActive
                                            ? "border-[#00AEEF]/30 bg-[#00AEEF] text-white"
                                            : "border-[#D6EEF8] bg-[#E6F7FD] text-[#00AEEF] group-hover:bg-[#00AEEF] group-hover:text-white"
                                            }`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="block font-bold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#00AEEF]">
                                            {cat.title}
                                        </span>
                                        <span className="mt-1 block text-xs font-medium text-[#666666]">
                                            Click to view services
                                        </span>
                                    </span>

                                    <span
                                        className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${isActive
                                            ? "bg-[#00AEEF] text-white"
                                            : "bg-[#E6F7FD] text-[#00AEEF] group-hover:bg-[#00AEEF] group-hover:text-white"
                                            }`}
                                    >
                                        View
                                    </span>
                                </Button>
                            );
                        })}
                    </div>

                    {activeGroups ? (
                        <div id="services" className={serviceGroupsStack}>
                            {activeGroups.map((group, groupIndex) => (
                                <div
                                    key={group.title}
                                    className={cn(
                                        serviceGroupBlock,
                                        groupIndex > 0 && serviceGroupDivider
                                    )}
                                >
                                    <div className="flex items-center justify-between">

                                        {/* <div className="w-full py-8 px-6 lg:mx-4 rounded-2xl bg-gray-100 shadow-md border-t-4 border-[#00AEEF]">
                                            <h3 className="text-2xl lg:text-4xl text-center font-bold text-gray-900">
                                                {group.title}
                                            </h3>
                                        </div> */}

                                        <div className={serviceGroupHeading}>
                                            <h3 className={serviceGroupHeadingTitle}>
                                                {group.title}
                                            </h3>
                                        </div>
                                        {/* <Link
                        href="/services/loans"
                        className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1"
                      >
                        View all
                        <ArrowRight className="h-4 w-4" />
                      </Link> */}
                                    </div>

                                    <div className={serviceGridClass}>
                                        {group.items.map((service, idx) => {
                                            const isSalariedOffer =
                                                isSalariedEmployeesCategory && service.key?.startsWith("salaried-");
                                            const isBusinessOffer =
                                                (activeCategory === "businesses" && service.key?.startsWith("business-")) ||
                                                (activeCategory === "builders-developers" && service.key?.startsWith("builder-")) ||
                                                (activeCategory === "professionals" && service.key?.startsWith("professional-")) ||
                                                (activeCategory === "govt-employees" && service.key?.startsWith("govt-employee-")) ||
                                                (activeCategory === "government-schemes" && service.key?.startsWith("govt-scheme-"));

                                            return (
                                                <ServiceProductCard
                                                    key={service.key}
                                                    service={{
                                                        key: service.key,
                                                        title: service.title,
                                                        description: service.description,
                                                        imageSrc: getCardImageSrc({
                                                            service,
                                                            fallbackCategory: activeCategory,
                                                        }),
                                                        applyHref: service.applyHref,
                                                        badge: service.badge,
                                                        highlight: service.highlight,
                                                    }}
                                                    categoryKey={activeCategory}
                                                    animationDelay={groupIndex * 120 + idx * 50}
                                                    onCardClick={
                                                        isSalariedOffer
                                                            ? undefined
                                                            : isBusinessOffer
                                                              ? undefined
                                                              : service.title === "Business Loan"
                                                                ? handleOpenModal("business")
                                                                : service.title === "Personal Loan"
                                                                  ? handleOpenModal("personal")
                                                                  : service.title === "Salaried Loan"
                                                                    ? undefined
                                                                    : service.title === "Credit Card"
                                                                      ? handleOpenModal("credit")
                                                                      : undefined
                                                    }
                                                    onApplyClick={handleApplyClick(() => {
                                                        if (!isSalariedOffer && !isBusinessOffer) return;

                                                        if (isSalariedOffer) {
                                                            setSelectedSalariedOfferKey(service.key);
                                                            setSelectedSalariedOfferTitle(service.title);
                                                            void openModalWithAuth("salaried");
                                                            return;
                                                        }

                                                        if (isBusinessOffer) {
                                                            setSelectedBusinessOfferKey(service.key);
                                                            setSelectedBusinessOfferTitle(service.title);
                                                            void openModalWithAuth("business");
                                                        }
                                                    })}
                                                    secondaryActions={[
                                                        {
                                                            href: isBusinessOffer
                                                                ? "/business-loan#criteria"
                                                                : "/personal-loan#criteria",
                                                            label: "Check Eligibility",
                                                        },
                                                        {
                                                            href: isBusinessOffer
                                                                ? "/business-loan#benefits"
                                                                : "/personal-loan#benefits",
                                                            label: "Key Benefits",
                                                        },
                                                        {
                                                            href: isBusinessOffer
                                                                ? "/business-loan#document"
                                                                : "/personal-loan#document",
                                                            label: "Required Doccuments",
                                                        },
                                                    ]}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={cn(serviceGroupsStack, "pt-2")}>

                            {/* <div className="w-full py-8 px-6 lg:mx-4 rounded-2xl bg-gray-100 shadow-md border-t-4 border-[#00AEEF]">
                                <h3 className="text-2xl lg:text-4xl text-center font-bold text-gray-900">
                                    Credits & Cards
                                </h3>
                            </div> */}
                            <div className={serviceGroupBlock}>
                            <div className={serviceGroupHeading}>
                                <h3 className={serviceGroupHeadingTitle}>
                                    Credits & Cards
                                </h3>
                            </div>

                            <div className={serviceGridClass}>
                                {activeCards.map((service, idx) => (
                                    <ServiceProductCard
                                        key={service.key}
                                        service={{
                                            key: service.key,
                                            title: service.title,
                                            description: service.description,
                                            imageSrc: getCardImageSrc({
                                                service,
                                                fallbackCategory: activeCategory,
                                            }),
                                            applyHref: service.applyHref,
                                            badge: service.badge,
                                            highlight: service.highlight,
                                        }}
                                        categoryKey={activeCategory}
                                        imageObjectPosition="object-[50%_10%]"
                                        animationDelay={idx * 60}
                                        onCardClick={
                                            service.title === "Business Loan"
                                                ? handleOpenModal("business")
                                                : service.title === "Personal Loan"
                                                  ? handleOpenModal("personal")
                                                  : service.title === "Salaried Loan"
                                                    ? handleOpenModal("salaried")
                                                    : service.title === "Credit Card"
                                                      ? handleOpenModal("credit")
                                                      : undefined
                                        }
                                        onApplyClick={handleApplyClick(() => {
                                            setSelectedCreditOfferTitle(service.title);
                                            void openModalWithAuth("credit");
                                        })}
                                        secondaryActions={[
                                            { href: service.infoHref, label: "Learn More" },
                                        ]}
                                    />
                                ))}
                            </div>
                            </div>
                        </div>
                    )}
            </ServiceSection>

            <ServiceSection tone="white">
                    <header className={serviceSectionIntro}>
                        <h2 className={serviceSectionTitle}>Why Choose Us?</h2>
                        <p className={serviceSectionSubtitle}>
                            We make financial products accessible, transparent, and hassle-free
                        </p>
                    </header>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                        {[
                            {
                                icon: Clock,
                                title: "Quick Approvals",
                                description: "Get loan approvals in as little as 48 hours with minimal documentation",
                            },
                            {
                                icon: CheckCircle2,
                                title: "Best Rates Guaranteed",
                                description: "We compare 30+ lenders to find you the lowest interest rates",
                            },
                            {
                                icon: Shield,
                                title: "100% Secure",
                                description: "Your data is encrypted and never shared without consent",
                            },
                        ].map((benefit, idx) => (
                            <div
                                key={idx}
                                className="flex animate-fade-in-up gap-4 rounded-2xl border border-[#D6EEF8] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,174,239,0.12)]"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E6F7FD]">
                                    <benefit.icon className="h-7 w-7 text-[#00AEEF]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1A1A1A]">{benefit.title}</h3>
                                    <p className="mt-2 text-[#666666]">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
            </ServiceSection>

            <section className={serviceCtaSection}>
                <div className={serviceSectionFadeTop} aria-hidden />
                <div className={cn("relative", serviceSectionContainer)}>
                    <div className="relative overflow-hidden rounded-3xl border border-[#D6EEF8] bg-[#E6F7FD] p-8 text-center sm:p-10 lg:p-16">
                        <div className="relative z-10">
                            <h2 className={cn(serviceSectionTitle, "lg:text-5xl")}>
                                Ready to Get Started?
                            </h2>
                            <p className={serviceSectionSubtitle}>
                                Apply now and get a decision within 48 hours. No hidden fees, no surprises.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
                                {/* <ApplyNowCTAButton loanType="Loan" className="shadow-2xl" size="xl">
                  Apply for a Loan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ApplyNowCTAButton> */}

                                <Button asChild size="xl" className="bg-[#00AEEF] text-white hover:bg-[#008FCC] shadow-sm">
                                    <Link href="#services">Get Started Now</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="xl"
                                    className="border border-[#D6EEF8] bg-white text-[#00AEEF] hover:border-[#00AEEF] hover:bg-white hover:text-[#008FCC]"
                                >
                                    <Link href="/emi-calculator">Check Eligibility</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {activeModal === "business" && (
                <BusinessLoanModal
                    isOpen={true}
                    onClose={() => {
                        setActiveModal(null);
                        setSelectedBusinessOfferKey(null);
                        setSelectedBusinessOfferTitle(null);
                    }}
                    categoryKey={selectedBusinessOfferKey ?? activeCategory}
                    categoryTitle={selectedBusinessOfferTitle ?? activeMeta?.title}
                />
            )}
            {activeModal === "personal" && (
                <PersonalLoanModal isOpen={true} onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "salaried" && (
                <SalariedLoanModal
                    isOpen={true}
                    onClose={() => {
                        setActiveModal(null);
                        setSelectedSalariedOfferKey(null);
                        setSelectedSalariedOfferTitle(null);
                    }}
                    categoryKey={selectedSalariedOfferKey ?? activeCategory}
                    categoryTitle={selectedSalariedOfferTitle ?? activeMeta?.title}
                />
            )}
            {activeModal === "credit" && (
                <CreditCardModal
                    isOpen={true}
                    onClose={() => {
                        setActiveModal(null);
                        setSelectedCreditOfferTitle(null);
                    }}
                    productTitle={selectedCreditOfferTitle ?? undefined}
                />
            )}
        </div>
    );
}
