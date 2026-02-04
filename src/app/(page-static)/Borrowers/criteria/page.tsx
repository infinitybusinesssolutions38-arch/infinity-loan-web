"use client";
import React from 'react'

type DocumentItem = {
    id: string;
    document: string;
    copies: string | string[]; // can be a string or an array of strings
};


const page = () => {
    const documents: DocumentItem[] = [
        { id: "1", document: "Photographs", copies: "2 Copies" },
        { id: "2", document: "Identity Proof (any one of the following)", copies: ["Pan Card", "Aadhar Card", "Voter Id", "Passport"] },
        { id: "2", document: "Date of Birth Proof (any one of the following)", copies: ["Pan Card", "Passport"] },
        { id: "3", document: "Signature Proof (any one of the following)", copies: ["Pan Card", "Signature verification from your bank", "Passport"] },
        { id: "4", document: "Address Proof (any one of the following)", copies: ["Passport", "Voter Id", "Bank Statement", "Electricity Bill (within last 3 months)", "Post paid Telephone Bill "] },
        { id: "5", document: "Contact Proof (any one of the following)", copies: ["Post paid Mobile Bill (last month)", "Post paid Landline Bill (last month)"] },
        { id: "6", document: "(a) Bank Statements", copies: "Last 6 Months" },
        { id: "7", document: "(b) IFSC code", copies: "Scanned/canceled cheque or copy of the front page of pass book of same bank account" },
        { id: "8", document: "Proof of Income ", copies: ["Last 3 months of Salary Slip (For Salaried Professional)", "Last 2 year’s Business/Personal ITR & Take home salary (For Business Professional)"] },
        { id: "9", document: "NACH Mandate ", copies: "Please ensure sign matches bank account signatures" },
        { id: "10", document: "e-Mandate ", copies: "Will be required if loan request is approved. Please keep debit card/net banking details of the bank account whose details were entered at the time of registration ready." },
    ]
    return (
        <section className="w-full pt-5">
            <div className="mx-6 md:mx-auto md:w-[70%] mt-4 md:mt-10 mb-3">
                <div>
                    <h3 className="text-2xl font-bold border-b">Borrower Eligibility Criteria</h3>
                    <p className='text-lg font-semibold my-4'>
                        A Borrower on Fortune must:
                    </p>
                    <ul className='ml-5'>
                        <li className='list-decimal'>
                            Be a resident of India.
                        </li>
                        <li className='list-decimal'>
                            Have a minimum gross income of INR 3 lacs per annum.
                        </li>
                        <li className='list-decimal'>
                            Provide all the documents mentioned in the checklist.
                        </li>
                    </ul>

                    <p className='my-3 font-semibold text-lg'>
                        QUICK CHECK OF DOCUMENTATION REQUIRED
                    </p>
                    <p className='my-2'>
                        Borrowers will be required to provide Fortune with following documentation at the time of verification.
                    </p>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="min-w-full border text-left text-sm md:text-base">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 md:px-4 md:py-2 border">#</th>
                                <th className="px-3 py-2 md:px-4 md:py-2 border">Document</th>
                                <th className="px-3 py-2 md:px-4 md:py-2 border">Copies / Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((docs, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-blue-50"} border hover:bg-gray-50 transition-colors`}
                                >
                                    <td className="px-3 py-2 md:px-4 md:py-2 border">{docs.id}</td>
                                    <td className="px-3 py-2 md:px-4 md:py-2 border">{docs.document}</td>
                                    <td className="px-3 py-2 md:px-4 md:py-2 border">
                                        {Array.isArray(docs.copies) ? (
                                            <ul className="list-disc pl-5">
                                                {docs.copies.map((copy, index) => (
                                                    <li key={index} className="leading-snug">
                                                        {copy}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            docs.copies
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <p className='my-3'>
                        NACH is used to electronically transfer funds from lender&apos;s escrow account to Borrower&apos;s bank account and to make repayments from borrower&apos;s account to lender&apos;s escrow account. Thus, it&apos;s important to ensure that the sign on the NACH mandate matches with the borrower&apos;s bank account signature.
                    </p>
                    <p className='my-3'>
                        Information provided by you will be used strictly for official purposes, and Fortune safeguards client confidentiality. For further information, please read the Fortune Policy and Terms and Conditions mentioned on the website.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default page
