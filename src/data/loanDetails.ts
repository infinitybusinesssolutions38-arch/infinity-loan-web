import {
  Clock,
  Shield,
  Percent,
  FileCheck,
  Users,
  Building2,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Zap,
  BadgeCheck,
  CreditCard,
  Home,
  Car,
  Coins,
} from "lucide-react";

export type LoanType =
  | "business-loan"
  | "personal-loan"
  | "home-property-loan"
  | "vehicle-loan"
  | "gold-asset-loan"
  | "insurance"
  | "credit-cards"
  | "government-schemes";

export type EligibilityCriteria = {
  title: string;
  description: string;
  highlight?: boolean;
};

export type Benefit = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export type Document = {
  name: string;
  required: boolean;
  description?: string;
};

export type LoanDetailData = {
  title: string;
  subtitle: string;
  description: string;
  heroIcon: React.ComponentType<{ className?: string }>;
  eligibility: EligibilityCriteria[];
  benefits: Benefit[];
  documents: Document[];
  interestRate?: string;
  maxAmount?: string;
  tenure?: string;
};

export const LOAN_DETAILS: Record<LoanType, LoanDetailData> = {
  "business-loan": {
    title: "Business Loan",
    subtitle: "MSME & SME Funding Solutions",
    description:
      "Comprehensive funding solutions for businesses of all sizes. Get working capital, equipment financing, and expansion loans with competitive rates and flexible repayment options.",
    heroIcon: Building2,
    interestRate: "10.5% - 18%",
    maxAmount: "₹5 Crore",
    tenure: "12 - 84 months",
    eligibility: [
      {
        title: "Business Vintage",
        description: "Minimum 2 years of business operations",
        highlight: true,
      },
      { title: "Annual Turnover", description: "₹25 Lakhs or more annual revenue" },
      { title: "Credit Score", description: "CIBIL score of 650 or above", highlight: true },
      { title: "Profitability", description: "Profitable for last 2 financial years" },
      { title: "GST Registration", description: "Active GST registration required" },
      { title: "Age Criteria", description: "Business owner aged 21-65 years" },
      { title: "Banking Vintage", description: "Active business bank account with regular transactions" },
      { title: "Repayment Capacity", description: "Acceptable cash flows / DSCR as per lender policy" },
      { title: "Existing Liabilities", description: "Existing loans/EMIs considered in eligibility" },
    ],
    benefits: [
      { icon: Clock, title: "Quick Disbursal", description: "Get funds in 48-72 hours after approval" },
      { icon: Percent, title: "Competitive Rates", description: "Interest rates starting from 10.5% p.a." },
      { icon: Shield, title: "Collateral-Free Options", description: "Unsecured loans up to ₹50 Lakhs" },
      { icon: FileCheck, title: "Minimal Documentation", description: "Simple paperwork, digital process" },
      { icon: Users, title: "Dedicated Support", description: "Personal relationship manager assigned" },
      { icon: TrendingUp, title: "Flexible Repayment", description: "EMI options from 12 to 84 months" },
    ],
    documents: [
      {
        name: "Business Registration Certificate",
        required: true,
        description: "GST, Udyam, or Shop Act",
      },
      { name: "Last 2 Years ITR with Computation", required: true },
      { name: "Last 12 Months Bank Statements", required: true },
      { name: "KYC Documents (PAN, Aadhaar)", required: true },
      { name: "Business Address Proof", required: true },
      { name: "Cancelled Cheque", required: true, description: "For disbursal / bank verification" },
      { name: "KYC of Partners/Directors/Proprietor", required: false, description: "As per business constitution" },
      { name: "Existing Loan Statements", required: false, description: "If you have any active business loans" },
      { name: "GST Returns (Last 12 months)", required: false },
      { name: "Audited Financial Statements", required: false },
      {
        name: "Partnership Deed / MOA & AOA",
        required: false,
        description: "Based on business type",
      },
      { name: "Trade License / Udyam Certificate Copy", required: false, description: "If applicable" },
    ],
  },
  "personal-loan": {
    title: "Personal Loan",
    subtitle: "Quick & Hassle-Free Funding",
    description:
      "Fulfill your dreams with instant personal loans. Whether it's a wedding, vacation, medical emergency, or debt consolidation - we've got you covered.",
    heroIcon: Wallet,
    interestRate: "10.49% - 24%",
    maxAmount: "₹40 Lakhs",
    tenure: "12 - 60 months",
    eligibility: [
      { title: "Employment Status", description: "Salaried or Self-employed individuals", highlight: true },
      { title: "Monthly Income", description: "Minimum ₹25,000 net monthly income", highlight: true },
      { title: "Credit Score", description: "CIBIL score of 700 or above" },
      { title: "Work Experience", description: "Minimum 1 year in current job (salaried)" },
      { title: "Age Criteria", description: "21-58 years for salaried, 25-65 for self-employed" },
      { title: "Residential Stability", description: "Stable residence for at least 1 year" },
      { title: "Bank Account", description: "Active savings/salary account for EMI auto-debit" },
      { title: "Repayment Capacity", description: "FOIR/DTI as per lender policy" },
      { title: "Credit History", description: "No recent defaults/settlements improves approval chances" },
    ],
    benefits: [
      { icon: Zap, title: "Instant Approval", description: "Get approved in just 2 minutes online" },
      { icon: BadgeCheck, title: "No Collateral", description: "100% unsecured, no assets required" },
      { icon: Percent, title: "Low Interest Rates", description: "Starting from 10.49% p.a." },
      { icon: Clock, title: "Same-Day Disbursal", description: "Funds in your account within 24 hours" },
      { icon: CreditCard, title: "Flexible Usage", description: "Use for any personal requirement" },
      { icon: FileCheck, title: "Digital Process", description: "Complete application online" },
    ],
    documents: [
      { name: "Identity Proof (PAN Card)", required: true },
      { name: "Address Proof (Aadhaar / Utility Bill)", required: true },
      {
        name: "Last 3 Months Salary Slips",
        required: true,
        description: "For salaried individuals",
      },
      { name: "Last 6 Months Bank Statement", required: true },
      { name: "Employment Proof", required: true, description: "Offer letter or ID card" },
      { name: "Passport Size Photographs", required: true },
      { name: "ECS/NACH Mandate", required: false, description: "Auto-debit setup (if requested by lender)" },
      { name: "ITR (Last 2 Years)", required: false, description: "For self-employed" },
      { name: "Form 16", required: false },
      { name: "Business Proof", required: false, description: "For self-employed (GST/Udyam/Shop Act if applicable)" },
    ],
  },
  "home-property-loan": {
    title: "Home & Property Loan",
    subtitle: "Make Your Dream Home a Reality",
    description:
      "Affordable home loans to buy, construct, or renovate your property. Enjoy low interest rates, long tenure options, and tax benefits.",
    heroIcon: Home,
    interestRate: "8.35% - 12%",
    maxAmount: "₹10 Crore",
    tenure: "Up to 30 years",
    eligibility: [
      { title: "Age Criteria", description: "21-65 years at loan maturity", highlight: true },
      { title: "Income Requirement", description: "Minimum ₹30,000 monthly income" },
      { title: "Employment", description: "3+ years work experience (1 year current)", highlight: true },
      { title: "Credit Score", description: "CIBIL score of 650 or above" },
      { title: "Property Type", description: "Approved property from registered builder" },
      { title: "Co-applicant", description: "Spouse/family member can be co-applicant" },
      { title: "Margin Money", description: "Down payment contribution as per LTV norms" },
      { title: "Property Clearance", description: "Legal & technical verification required" },
    ],
    benefits: [
      { icon: Percent, title: "Lowest Interest Rates", description: "Starting from just 8.35% p.a." },
      { icon: Clock, title: "Long Tenure", description: "Repay comfortably over 30 years" },
      { icon: Shield, title: "Tax Benefits", description: "Save up to ₹5 Lakhs under Section 80C & 24" },
      { icon: CheckCircle2, title: "Balance Transfer", description: "Transfer existing loan at lower rates" },
      { icon: TrendingUp, title: "Top-Up Facility", description: "Additional funds on existing loan" },
      { icon: Users, title: "End-to-End Support", description: "Legal & technical assistance included" },
    ],
    documents: [
      { name: "Identity & Address Proof", required: true },
      { name: "Income Proof (Salary Slips / ITR)", required: true },
      { name: "Property Documents", required: true, description: "Sale deed, NOC, approved plan" },
      { name: "Bank Statements (6 months)", required: true },
      { name: "Passport Size Photographs", required: true },
      { name: "Processing Fee Cheque", required: true },
      { name: "Sale Agreement / Allotment Letter", required: false, description: "If applicable" },
      { name: "Property Tax Receipt", required: false, description: "If applicable" },
      { name: "Encumbrance Certificate", required: false, description: "If requested by lender" },
      { name: "Existing Loan Statement", required: false, description: "For balance transfer" },
      { name: "Builder Agreement", required: false },
    ],
  },
  "vehicle-loan": {
    title: "Vehicle Loan",
    subtitle: "Drive Your Dream Vehicle Today",
    description:
      "Affordable financing for cars, bikes, and commercial vehicles. Get on the road faster with quick approvals and flexible EMI options.",
    heroIcon: Car,
    interestRate: "7.25% - 15%",
    maxAmount: "₹1 Crore",
    tenure: "12 - 84 months",
    eligibility: [
      { title: "Age Criteria", description: "21-65 years at loan maturity", highlight: true },
      { title: "Income", description: "Minimum ₹20,000 monthly income" },
      { title: "Employment", description: "Salaried (1 year exp) or Self-employed (2 years)", highlight: true },
      { title: "Credit Score", description: "CIBIL score of 650 or above" },
      { title: "Down Payment", description: "10-20% of vehicle cost" },
      { title: "Residence", description: "Stable residence for 1+ year" },
      { title: "Vehicle Eligibility", description: "Vehicle make/model & variant as per lender policy" },
    ],
    benefits: [
      { icon: Percent, title: "Low Interest Rates", description: "Starting from 7.25% p.a." },
      { icon: Zap, title: "Instant Approval", description: "Get approved in 30 minutes" },
      { icon: CreditCard, title: "High Financing", description: "Up to 100% on-road price funded" },
      { icon: Clock, title: "Flexible Tenure", description: "EMIs spread over 7 years" },
      { icon: BadgeCheck, title: "Used Car Loans", description: "Financing for pre-owned vehicles" },
      { icon: Shield, title: "Insurance Bundled", description: "Comprehensive coverage included" },
    ],
    documents: [
      { name: "Identity Proof (PAN & Aadhaar)", required: true },
      { name: "Address Proof", required: true },
      { name: "Income Proof", required: true, description: "Salary slips or ITR" },
      { name: "Bank Statements (3 months)", required: true },
      { name: "Passport Photos", required: true },
      { name: "Proforma Invoice", required: true, description: "From dealer" },
      { name: "Insurance Quote/Policy Copy", required: false, description: "If requested" },
      { name: "Driving License", required: false },
      { name: "RC Book Copy", required: false, description: "For used vehicles" },
    ],
  },
  "gold-asset-loan": {
    title: "Gold & Asset Loan",
    subtitle: "Unlock the Value of Your Assets",
    description:
      "Get instant funds against your gold, securities, or other valuable assets. Transparent valuation, quick disbursal, and competitive interest rates.",
    heroIcon: Coins,
    interestRate: "7% - 15%",
    maxAmount: "₹2 Crore",
    tenure: "3 - 36 months",
    eligibility: [
      { title: "Asset Ownership", description: "Own gold jewellery or securities", highlight: true },
      { title: "Age Criteria", description: "18-70 years", highlight: true },
      { title: "Gold Purity", description: "Minimum 18 karat gold accepted" },
      { title: "Identity Proof", description: "Valid KYC documents required" },
      { title: "No Income Proof", description: "Loan sanctioned against asset value" },
      { title: "Repayment Capacity", description: "Flexible - interest only or EMI" },
      { title: "Valuation", description: "Asset valuation & LTV as per RBI/lender norms" },
    ],
    benefits: [
      { icon: Zap, title: "Instant Disbursal", description: "Get cash within 30 minutes" },
      { icon: Percent, title: "Lowest Interest", description: "Starting from just 7% p.a." },
      { icon: Shield, title: "Safe Storage", description: "Bank-grade vault security" },
      { icon: FileCheck, title: "Minimal Documents", description: "Just KYC required" },
      { icon: TrendingUp, title: "High LTV", description: "Up to 75% of gold value" },
      { icon: Clock, title: "Flexible Repayment", description: "Interest-only or EMI options" },
    ],
    documents: [
      { name: "Identity Proof (PAN / Aadhaar)", required: true },
      { name: "Address Proof", required: true },
      { name: "Passport Size Photographs", required: true },
      { name: "Gold Jewellery", required: true, description: "Physical gold for valuation" },
      { name: "Nominee Details", required: false, description: "If requested" },
      { name: "Original Purchase Invoice", required: false, description: "If available" },
      { name: "Demat Statement", required: false, description: "For securities-backed loan" },
    ],
  },
  insurance: {
    title: "Insurance Solutions",
    subtitle: "Protect What Matters Most",
    description:
      "Comprehensive insurance coverage for life, health, vehicle, and property. Get expert guidance to choose the right protection for you and your family.",
    heroIcon: Shield,
    eligibility: [
      { title: "Age Criteria", description: "18-65 years for most policies", highlight: true },
      { title: "Health Disclosure", description: "Medical history declaration required" },
      { title: "Income Proof", description: "For high sum assured policies", highlight: true },
      { title: "KYC Documents", description: "Valid identity and address proof" },
      { title: "Nominee Details", description: "Required for life insurance" },
      { title: "Medical Tests", description: "May be required based on coverage" },
    ],
    benefits: [
      { icon: Shield, title: "Comprehensive Coverage", description: "Protection against all major risks" },
      { icon: Users, title: "Family Protection", description: "Secure your loved ones' future" },
      { icon: Percent, title: "Tax Benefits", description: "Save under Section 80C & 80D" },
      { icon: Clock, title: "Quick Claims", description: "Hassle-free claim settlement" },
      { icon: BadgeCheck, title: "Multiple Options", description: "Compare plans from top insurers" },
      { icon: TrendingUp, title: "Wealth Creation", description: "Investment-linked plans available" },
    ],
    documents: [
      { name: "Identity Proof (PAN / Aadhaar)", required: true },
      { name: "Address Proof", required: true },
      { name: "Age Proof", required: true },
      { name: "Passport Size Photographs", required: true },
      { name: "Income Proof", required: false, description: "For high coverage" },
      { name: "Medical Reports", required: false, description: "If applicable" },
    ],
  },
  "credit-cards": {
    title: "Credit Cards & Credit Lines",
    subtitle: "Smart Credit Solutions for You",
    description:
      "Access flexible credit options including credit cards, personal credit lines, and BNPL solutions. Enjoy rewards, cashback, and convenient EMI options.",
    heroIcon: CreditCard,
    eligibility: [
      { title: "Age Criteria", description: "21-60 years", highlight: true },
      { title: "Income Requirement", description: "Minimum ₹15,000 monthly income", highlight: true },
      { title: "Credit Score", description: "CIBIL score of 700+ preferred" },
      { title: "Employment", description: "Salaried or self-employed" },
      { title: "Bank Account", description: "Active salary/current account" },
      { title: "Credit History", description: "Clean repayment track record" },
      { title: "Serviceability", description: "Residential address should be serviceable by issuer" },
    ],
    benefits: [
      { icon: CreditCard, title: "Rewards & Cashback", description: "Earn on every transaction" },
      { icon: Clock, title: "Interest-Free Period", description: "Up to 50 days credit-free" },
      { icon: Percent, title: "Easy EMI", description: "Convert purchases to EMIs" },
      { icon: Shield, title: "Fraud Protection", description: "Zero liability on unauthorized txns" },
      { icon: Zap, title: "Instant Approval", description: "Get card in 3 working days" },
      { icon: TrendingUp, title: "Credit Building", description: "Improve your credit score" },
    ],
    documents: [
      { name: "Identity Proof (PAN)", required: true },
      { name: "Address Proof (Aadhaar)", required: true },
      { name: "Income Proof", required: true },
      { name: "Bank Statements (3 months)", required: true },
      { name: "Passport Photos", required: true },
      { name: "Employment Proof", required: false },
      { name: "ITR / Form 16", required: false, description: "If requested by issuer" },
    ],
  },
  "government-schemes": {
    title: "Government Schemes",
    subtitle: "Empowering Entrepreneurs & MSMEs",
    description:
      "Access government-backed loan schemes with subsidized interest rates, collateral-free options, and special benefits for women entrepreneurs and SC/ST communities.",
    heroIcon: Building2,
    eligibility: [
      { title: "Business Type", description: "MSMEs, micro-enterprises, startups", highlight: true },
      { title: "Udyam Registration", description: "Valid MSME/Udyam certificate", highlight: true },
      { title: "Age Criteria", description: "18-65 years" },
      { title: "Business Vintage", description: "Varies by scheme (0-3 years)" },
      { title: "No Default History", description: "Clean credit record required" },
      { title: "Special Categories", description: "Priority for women, SC/ST entrepreneurs" },
      { title: "Scheme Conditions", description: "Eligibility may vary by scheme guidelines" },
    ],
    benefits: [
      { icon: Percent, title: "Subsidized Rates", description: "Below-market interest rates" },
      { icon: Shield, title: "Collateral-Free", description: "No security required under CGTMSE" },
      { icon: TrendingUp, title: "Credit Guarantee", description: "Government-backed guarantee" },
      { icon: Zap, title: "Quick Approval", description: "PSB 59 mins in-principle approval" },
      { icon: Users, title: "Women Entrepreneurs", description: "Special schemes & subsidies" },
      { icon: FileCheck, title: "Simple Process", description: "Streamlined application" },
    ],
    documents: [
      { name: "Udyam/MSME Registration", required: true },
      { name: "Identity Proof (PAN & Aadhaar)", required: true },
      { name: "Business Address Proof", required: true },
      { name: "Bank Statements (6-12 months)", required: true },
      { name: "Business Plan", required: false, description: "For new ventures" },
      { name: "Caste Certificate", required: false, description: "For SC/ST category" },
      { name: "Project Report", required: false },
      { name: "Quotation / Proforma Invoice", required: false, description: "For machinery/equipment purchase" },
    ],
  },
};
