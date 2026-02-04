"use client";
import React from "react";

type Borrower = {
    name: string;
    amount: string;
    rate: string;
    interest: string;
};

const page = () => {
    const borrowers: Borrower[] = [
        { name: "Mr.X", amount: "Rs 50,000", rate: "12% p.a.", interest: "Rs.3,309" },
        { name: "Mr.Y", amount: "Rs.50,000", rate: "10% p.a.", interest: "Rs.2,800" },
        { name: "Mr.Z", amount: "Rs.50,000", rate: "11% p.a.", interest: "Rs.3,400" },
    ];
    return (
        <section className="w-full pt-5 min-h-screen">
            <div className="mx-6 md:mx-auto md:w-[70%] mt-4 md:mt-10 mb-3">
                <div>
                    <h3 className="text-2xl font-bold border-b">Returns</h3>
                    <p className='my-3'>
                        Fortune encourages its lenders to build a diversified portfolio by spreading their lending across various loans and loan products at different interest rates. We recommend that lending should be spread, such that returns are a weighted average of the individual loan parts. This is explained through an illustration below.
                    </p>
                    <p className='my-3'>
                        For example, on a loan of Rs. 150,000 spread across 3 borrowers, for a period of 1 year at various interest rates; the returns can be as follows:
                    </p>
                </div>
                <div className="mx-2 mt-4 md:mt-10 mb-3 overflow-x-auto">
                    <table className="min-w-full md:w-[60vw] border text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-left whitespace-nowrap">Borrower</th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">Amount Lent</th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">Rate</th>
                                <th className="border px-4 py-2 text-left whitespace-nowrap">Interest Earning</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* ✅ Map through borrowers JSON */}
                            {borrowers.map((item, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-50">
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.amount}</td>
                                    <td className="border px-4 py-2">{item.rate}</td>
                                    <td className="border px-4 py-2">{item.interest}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border px-4 py-2 font-bold">Total</td>
                                <td className="border px-4 py-2 font-bold">150,000</td>
                                <td className="border px-4 py-2 font-bold">16% p.a.</td>
                                <td className="border px-4 py-2 font-bold">Rs.9509</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <p className="my-3">
                        So, in the example above the lender is earning on an average 16% interest on total lending. Also, Interest earnings can be more or less depending on loan amount split across interest rates. For egs the lender may decide to lend only Rs. 20,000/- @ 12% and increase the amount to Rs. 60,000/- @ 16% and to Rs. 70,000/- @ 20%. This will increase the lender&apos;s average return. At Fortune, what amount to lend at what interest rate is controlled by the lender depending on his/her judgment.
                    </p>
                    <p className="my-3">
                        Sounds interesting? SIGN UP now and start making  every % counts!
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold border-b">Non-Payment of EMI</h3>
                    <p className="my-3">
                        Though we do our best to manage the risk at every step, defaults may happen. In such a scenario, Fortune will facilitate the collection through our in-house collection mechanism and also send a legal notice on behalf of the lender to the borrower. Expenses incurred for sending legal notices, by recovery agency and towards other legal proceedings are borne by the lender.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold border-b">Registration/ Listing / Subscription Fees</h3>
                    <p className="my-3">
                        A non-refundable, subscription fee up to Rs. 5,000/- is payable by the lender to Fortune.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold border-b">Transaction Fees</h3>
                    <p className="my-3">
                        A non-refundable 1% transaction fee from retail lenders and 2% from institutional lenders is charged on the loan amount disbursed. This is deducted after the first EMI is received.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold border-b">Facilitation Fee</h3>
                    <p className="my-3">
                        The platform will charge a fixed Facilitation Fee for services rendered, which may vary for different sets of lenders, ranging from 0.5% to 1.5% per month on the principal lending amount. This fee will be disclosed upfront ab initio, at the time of lending, as a fixed proportion of the principal involved in the transaction and will not depend on the borrower&apos;s repayment performance.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold border-b">Account Reactivation Fee</h3>
                    <p className="my-3">
                        Access to secure areas of the platform is password-protected and will be granted to lenders only for the duration of the loan tenures they have funded. Once the tenure of all loans funded by a lender concludes, access to these secure areas will be automatically revoked. Should a lender request an extension of access after this period, an account reactivation fee of Rs. 5000/- will be applicable to reinstate access for an extended period.
                    </p>
                </div>
                <div className="border-b pb-5 mb-2">
                    <h3 className="text-2xl font-bold border-b">Other Fees</h3>
                    <p className="my-3">
                        A non-refundable fee of Rs. 100/- will be charged for every recharge of less than Rs. 5,000/- in to the Escrow Account. The fees will be deducted from the Lender&apos;s escrow balance.
                    </p>
                    <p>
                        Lender(s) are obliged to maintain details of their loan including statement of accounts. In case, they need Fortune&apos;s assistance in this regard then a non-refundable fee of Rs. 500/- per statement of accounts will be charged.
                    </p>
                </div>
                <div>
                    <p className="my-3">
                        Fortune.com only facilitates a virtual meeting place between Borrowers and Lenders on its online platform. The decision to lend money to a borrower is entirely at the discretion of the Lenders and Fortune does not guarantee that a borrower will receive any loans from the Lenders. Fortune merely aids and assists Lenders and Borrowers listed on its website to make and receive loans and charges a service fee from Lenders and Borrowers for such assistance. Fortune is only an ‘Intermediary’ under the provisions of the Information Technology Act, 1999.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default page
