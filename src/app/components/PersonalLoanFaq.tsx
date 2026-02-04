"use client";

import React, { useState } from "react";

type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
    {
        id: "item-0",
        question: "Why borrow through Fortune?",
        answer:
            "Fortune offers borrowers lower interest rates and less hassle than traditional financing options. It provides attractive fixed rates, an easy online application, friendly service and no hidden fees.",
    },
    {
        id: "item-1",
        question: "How do I get started?",
        answer:
            "Click Sign Up Now and register through the step-by-step process. After uploading required documents, Fortune's risk team will identity-verify, credit-check and risk-assess your profile. If qualified, you'll be approved as a borrower and can list a loan request.",
    },
    {
        id: "item-2",
        question: "Why do you require documents?",
        answer:
            "Documents help identity-verify, credit-check and risk-assess a borrower. Along with CIBIL score we evaluate ability, stability, past performance and intention using items like salary slips, bank statements, ITRs and balance sheets to take a transparent decision.",
    },
    {
        id: "item-3",
        question: "Why should I pay filing fee?",
        answer:
            "The filing fee covers the time, effort and resources spent by our credit evaluation mechanism to assess borrower profiles. It is non-refundable and payable at disbursal by borrowers funded through the portal.",
    },
    {
        id: "item-4",
        question: "How much can I borrow?",
        answer:
            "For personal needs, loans range from Rs. 50,000 to Rs. 5,00,000. For business purposes borrowers can apply for up to Rs. 10,00,000.",
    },
    {
        id: "item-5",
        question: "Will I be funded by an individual lender or multiple lenders?",
        answer:
            "No single lender can fund an entire loan as per policy. Your loan will be funded by multiple lenders.",
    },
    {
        id: "item-6",
        question: "Can I pre-pay my EMI? Any charges?",
        answer:
            "Pre-closure is allowed after three months from disbursal without additional charges. Prior to three months, pre-closure requires payment of balance interest for three months to lenders. Fortune charges a one-time non-refundable pre-payment fee of Rs. 500.",
    },
    {
        id: "item-7",
        question: "What interest rates can I expect to pay?",
        answer:
            "An automated credit appraisal suggests rates based on 120+ criteria and 400+ data points. Rates typically range from 12% to 28%; unrated borrowers may receive higher rates.",
    },
    {
        id: "item-8",
        question: "On what parameters does Fortune verify my profile?",
        answer:
            "We verify across 120+ criteria using 400+ data points from your documents and personal info. Each borrower is identity-checked, credit-checked and risk-assessed to evaluate intention, stability and ability.",
    },
    {
        id: "item-9",
        question: "Does Fortune undertake physical verification?",
        answer:
            "Yes — physical verification of residential and official addresses is undertaken after prior appointment to verify identity.",
    },
    {
        id: "item-10",
        question: "Does Fortune require references?",
        answer:
            "Yes — we ask for four references (professional or personal) who can verify your identity, intention, ability and stability to repay a loan.",
    },
    {
        id: "item-11",
        question: "How much time before a loan is listed?",
        answer:
            "After signing up, paying the filing fee and uploading documents, the risk team typically evaluates the borrower in 48–72 office hours. If accepted, the loan is made live for lenders.",
    },
    {
        id: "item-12",
        question: "How long to find a lender? How long is a listing available?",
        answer:
            "Loans are listed for 15 days (extendable to 30 under special circumstances). Funding time varies: credit-worthy borrowers can be funded quickly while others may take days.",
    },
    {
        id: "item-13",
        question: "How long is the disbursal process?",
        answer:
            "Once processing fees are paid, loan agreement signed, and PDCs/NACH provided, disbursal can be completed in 24–48 hours. Using our tech-enabled facilities you can reduce time to under 24 hours in some cases.",
    },
    {
        id: "item-14",
        question: "Why was my application declined?",
        answer:
            "Applications may be declined for incomplete or unauthentic documentation, negative physical verification, poor past loan performance, or deliberately misleading information.",
    },
    {
        id: "item-15",
        question: "What happens for delayed or non-payment of EMI?",
        answer:
            "Delayed EMIs attract penal interest payable to lenders plus non-refundable overdue charges payable to Fortune. Legal notices (worst case) incur Rs. 500 per notice payable by the borrower.",
    },
    {
        id: "item-16",
        question: "I have defaulted before — can I borrow on Fortune?",
        answer:
            "If your profile doesn't meet credit and verification standards, listing won't be approved. We encourage improving credit history and reapplying after six months.",
    },
    {
        id: "item-17",
        question: "How are repayments calculated?",
        answer:
            "Repayments use equated monthly installments with the reducing balance method. Monthly EMI remains the same through the tenure; the first installment may vary depending on disbursal date.",
    },
    {
        id: "item-18",
        question: "Will Fortune provide my credit score?",
        answer: "Fortune does not provide your credit score.",
    },
    {
        id: "item-19",
        question: "What information can be viewed about me?",
        answer:
            "Once approved, registered lenders can view your full name, profession, loan purpose, email and financial info to help fund your loan faster. This is not visible to general visitors.",
    },
    {
        id: "item-20",
        question: "Will my address and phone be available online?",
        answer:
            "No — we do not show addresses or phone numbers to prevent harassment. See our Privacy Policy for more details.",
    },
    {
        id: "item-21",
        question: "Can I change loan amount after applying?",
        answer:
            "No — listings cannot be changed after they go live. To increase amount, create a fresh loan request for the difference.",
    },
    {
        id: "item-22",
        question: "Can my loan request be terminated or reviewed?",
        answer:
            "Yes — if information is found incomplete, fraudulent or unverifiable, the request is terminated and any fees paid are non-refundable.",
    },
    {
        id: "item-23",
        question: "How do I cancel my loan application?",
        answer:
            "Email support@Fortune.com requesting cancellation. Cancellation is only possible prior to disbursal.",
    },
    {
        id: "item-24",
        question: "How do I change bank details or set up a new direct debit?",
        answer:
            "Email support@Fortune.com with old and new bank details. A swapping charge of Rs. 500 per swap applies.",
    },
    {
        id: "item-25",
        question: "What is e-mandate? How to verify it?",
        answer:
            "E-mandate allows EMIs to be auto-debited. Fortune emails you an e-mandate link — verify using debit card or net-banking. Once approved, EMIs are auto-collected and disbursed to lenders' escrow accounts.",
    },
    {
        id: "item-26",
        question: "How is e-mandate beneficial to me?",
        answer:
            "Quick and secure: convenient, contactless, stress-free and helps avoid missed EMIs. The whole process takes just a few minutes.",
    },
];

export default function PersonalLoanFaq() {
    const [openId, setOpenId] = useState<string | null>(null);

    function toggle(id: string) {
        setOpenId((prev) => (prev === id ? null : id));
    }

    return (
        <section className="max-w-7xl mx-auto p-6 sm:p-10">
            <div className="mb-8 text-center">
                <h2 className="text-2xl sm:text-4xl font-semibold text-gray-900">You've got questions? We've got the answers.</h2>
                <p className="text-gray-600 mt-5">Frequently Asked Questions by Borrowers</p>
            </div>

            <div className="space-y-3">
                {FAQ_ITEMS.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                        >
                            <button
                                aria-expanded={isOpen}
                                aria-controls={`panel-${item.id}`}
                                id={`tab-${item.id}`}
                                onClick={() => toggle(item.id)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        toggle(item.id);
                                    }
                                }}
                                className="w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                            >
                                <span className="text-md md:text-lg font-medium text-gray-800">{item.question}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div
                                id={`panel-${item.id}`}
                                role="region"
                                aria-labelledby={`tab-${item.id}`}
                                className={`px-5 pb-5 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}
