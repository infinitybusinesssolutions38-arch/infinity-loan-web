import React from 'react'

const page = () => {
    return (
        <section className="w-full pt-5">
            <div className="mx-6 md:mx-auto md:w-[70%] mt-4 md:mt-10 mb-3">
                <div>
                    <h3 className="text-2xl font-bold border-b">Lender eligibility criteria</h3>
                    <p className='my-3'>
                        Fortune is a mature, new-age financial instrument for discerning investors. It is for those who can go beyond conventional wisdom and traditional routes of investment to make independent and well-judged risk assessments. It allows Lenders to have greater control over their money and provides an investment route where they do not have to share their interest incomes with intermediaries.
                    </p>
                    <p className='my-3'>
                        We, at Fortune, seek to facilitate convenient lending opportunities for everyone. The platform provides the simplest and fastest method of registering as a lender, to anyone who is willing to lend. Our criterions are most basic and simple.
                    </p>
                    <p className='my-3'>
                        Any ‘Person’ can become a lender on the platform and ‘person’ shall include
                    </p>
                </div>
                <div>
                    <ol className='ml-6'>
                        <li className='list-decimal '>an individual,</li>
                        <li className='list-decimal'>a body of individuals,</li>
                        <li className='list-decimal'>a HUF,</li>
                        <li className='list-decimal'>a firm,</li>
                        <li className='list-decimal'>a society,</li>
                        <li className='list-decimal'>orany artificial body,</li>
                        <li className='list-decimal'>whether incorporated or not</li>
                    </ol>
                    <p className='my-3 font-semibold text-xl'>A Lender has to:</p>
                    <ul className='ml-6'>
                        <li className='list-disc'>Have a valid bank account in India.</li>
                        <li className='list-disc'> Have a PAN card.</li>
                        <li className='list-disc'>Agree to abide byFortune Policies.</li>
                        <li className='list-disc'>Adhere to Lender Code of conduct</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default page
