"use client";



import React, { useState } from "react";

import { useForm } from "react-hook-form";

import axios from "axios";



type Props = {

    isOpen: boolean;

    onClose: () => void;

};



export default function CreditCardModal({ isOpen, onClose }: Props) {

    const {

        register,

        handleSubmit,

        formState: { errors },

    } = useForm();



    const [loading, setLoading] = useState(false);



    if (!isOpen) return null;



    // ================= SUBMIT =================

    const onSubmit = async (data: any) => {

        try {

            setLoading(true);



            const formData = new FormData();

            // =====================================

            // Personal Info

            // =====================================

            formData.append("firstname", data.firstname);

            formData.append("middleName", data.middleName);

            formData.append("lastname", data.lastname);

            formData.append("mobileNumber", data.mobileNumber);

            formData.append("alternateMobile", data.alternateMobile);

            formData.append("personalEmail", data.personalEmail);

            formData.append("officialEmail", data.officialEmail);



            // =====================================

            // Identity

            // =====================================

            formData.append("aadhaarNumber", data.aadhaarNumber);

            formData.append("panNumber", data.panNumber);

            formData.append("voterIdNumber", data.voterIdNumber);

            formData.append("drivingLicense", data.drivingLicense);

            formData.append("passportNumber", data.passportNumber);



            // =====================================

            // Address

            // =====================================

            formData.append(

                "currentResidentialAddress",

                data.currentResidentialAddress

            );

            formData.append(

                "currentResidentialPincode",

                data.currentResidentialPincode

            );

            formData.append("residentialState", data.residentialState);

            formData.append("residentialCity", data.residentialCity);

            formData.append("currentOfficeAddress", data.currentOfficeAddress);

            formData.append("currentOfficePincode", data.currentOfficePincode);

            formData.append("residentialStatus", data.residentialStatus);

            formData.append("businessPremisesStatus", data.businessPremisesStatus);

            formData.append(

                "yearsAtCurrentResidentialAddress",

                data.yearsAtCurrentResidentialAddress

            );

            formData.append(

                "yearsAtCurrentBusinessAddress",

                data.yearsAtCurrentBusinessAddress

            );



            // =====================================

            // Card Details

            // =====================================

            formData.append("bankName", data.bankName);

            formData.append("limitAmount", data.limitAmount);

            formData.append("cardType", data.cardType);



            // =====================================

            // CIBIL

            // =====================================

            formData.append("cibilScoreKnown", data.cibilScoreKnown);

            formData.append("cibilScore", data.cibilScore);

            formData.append("cibilIssues", data.cibilIssues);



            // =====================================

            // Consent (Boolean → string)

            // =====================================

            formData.append("consent", data.consent ? "true" : "false");



            // =====================================

            // Documents (Files)

            // =====================================

            if (data.aadhaarFront)

                formData.append("aadhaarFront", data.aadhaarFront);



            if (data.aadhaarBack)

                formData.append("aadhaarBack", data.aadhaarBack);



            if (data.panFront)

                formData.append("panFront", data.panFront);



            if (data.residentialBill)

                formData.append("residentialBill", data.residentialBill);



            if (data.shopBill)

                formData.append("shopBill", data.shopBill);



            Object.keys(data).forEach((key) => {

                if (data[key] instanceof FileList) {

                    if (data[key][0]) {

                        formData.append(key, data[key][0]);

                    }

                } else {

                    formData.append(key, data[key]);

                }

            });



            await axios.post("/api/credit-card", formData);



            alert("Credit Card application submitted successfully!");

            onClose();

        } catch (error) {

            console.error(error);

            alert("Submission failed");

        } finally {

            setLoading(false);

        }

    };



    return (

        <div

            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 overflow-auto"

            onClick={(e) => {

                if (e.target === e.currentTarget) onClose();

            }}

        >

            <div className="relative bg-white w-full max-w-4xl rounded-xl p-8 max-h-[90vh] overflow-y-auto">

                <button

                    type="button"

                    onClick={onClose}

                    aria-label="Close"

                    className="absolute right-4 top-4 rounded-md p-2 text-gray-600 hover:bg-gray-100"

                >

                    ×

                </button>

                <h2 className="text-2xl font-bold text-center mb-6">

                    Credit Card Application

                </h2>



                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">



                    {/* ================= PERSONAL DETAILS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Personal Details</h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <input {...register("firstName", { required: true })} placeholder="First Name" className="input" />

                            <input {...register("middleName")} placeholder="Middle Name" className="input" />

                            <input {...register("lastName", { required: true })} placeholder="Last Name" className="input" />

                            <input type="date" {...register("dob", { required: true })} className="input" />

                            <select {...register("gender", { required: true })} className="input">

                                <option value="">Select Gender</option>

                                <option>Male</option>

                                <option>Female</option>

                                <option>Other</option>

                            </select>

                            <select {...register("maritalStatus", { required: true })} className="input">

                                <option value="">Marital Status</option>

                                <option>Single</option>

                                <option>Married</option>

                                <option>Divorced</option>

                                <option>Widowed</option>

                            </select>

                        </div>

                    </div>



                    {/* ================= CONTACT DETAILS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Contact Details</h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <input {...register("mobileNumber", { required: true })} placeholder="Mobile Number" className="input" />

                            <input {...register("whatsappNumber")} placeholder="WhatsApp Number" className="input" />

                            <input {...register("personalEmail", { required: true })} placeholder="Personal Email" className="input" />

                            <input {...register("officialEmail")} placeholder="Official Email" className="input" />

                            <input {...register("alternateMobile")} placeholder="Alternate Mobile" className="input" />

                        </div>

                    </div>



                    {/* ================= ID DETAILS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Identification Details</h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <input {...register("panNumber", { required: true })} placeholder="PAN Number" className="input" />

                            <input {...register("aadhaarNumber", { required: true })} placeholder="Aadhaar Number" className="input" />

                            <input type="file" {...register("panPhotoUrl")} className="input" />

                            <input type="file" {...register("aadhaarPhotoUrl")} className="input" />

                            <input type="file" {...register("aadhaarBackPhotoUrl")} className="input" />

                            <input type="file" {...register("applicantPhotoUrl")} className="input" />

                        </div>

                    </div>



                    {/* ================= ADDRESS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Residential Address</h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <input {...register("currentResidentialAddress", { required: true })} placeholder="Address" className="input" />

                            <input {...register("city", { required: true })} placeholder="City" className="input" />

                            <input {...register("state", { required: true })} placeholder="State" className="input" />

                            <input {...register("pincode", { required: true })} placeholder="Pincode" className="input" />

                            <select {...register("residenceType")} className="input">

                                <option value="">Residence Type</option>

                                <option>Owned</option>

                                <option>Rented</option>

                                <option>Company Provided</option>

                            </select>

                        </div>

                    </div>



                    {/* ================= EMPLOYMENT DETAILS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Employment Details</h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <input {...register("companyName")} placeholder="Company Name" className="input" />

                            <input {...register("designation")} placeholder="Designation" className="input" />

                            <select {...register("employmentType")} className="input">

                                <option value="">Employment Type</option>

                                <option>Salaried</option>

                                <option>Self Employed</option>

                                <option>Business</option>

                            </select>

                            <input {...register("monthlyIncome", { required: true })} placeholder="Monthly Income" className="input" />

                        </div>

                    </div>



                    {/* ================= CREDIT CARD DETAILS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Card Requirement</h3>

                        <div className="grid md:grid-cols-2 gap-4">

                            <input {...register("preferredCardType", { required: true })} placeholder="Preferred Card Type" className="input" />

                            <input {...register("existingCardDetails")} placeholder="Existing Card Details (optional)" className="input" />

                        </div>

                        <textarea

                            {...register("cibilIssues")}

                            placeholder="Mention any CIBIL issues (optional)"

                            className="input min-h-[100px]"

                        />

                    </div>



                    {/* ================= DOCUMENT UPLOADS ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Additional Documents</h3>

                        <input type="file" {...register("bankStatementUrl")} className="input" />

                        <input type="file" {...register("salarySlipsUrl")} className="input" />

                        <input type="file" {...register("cibilReportUrl")} className="input" />

                    </div>



                    {/* ================= CONSENT ================= */}

                    <div className="flex items-center gap-2">

                        <input type="checkbox" {...register("consent", { required: true })} />

                        <span>I agree to the terms & conditions</span>

                    </div>



                    {/* ================= ACTION BUTTONS ================= */}

                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-6 py-2 bg-gray-300 rounded-lg"

                        >

                            Cancel

                        </button>



                        <button

                            type="submit"

                            disabled={loading}

                            className="px-6 py-2 bg-blue-600 text-white rounded-lg"

                        >

                            {loading ? "Submitting..." : "Submit Application"}

                        </button>

                    </div>



                </form>

            </div>

        </div>

    );

}

