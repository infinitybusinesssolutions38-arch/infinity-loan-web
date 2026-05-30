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

            // Personal Info
            formData.append("firstname", data.firstName);
            formData.append("middleName", data.middleName || "");
            formData.append("lastname", data.lastName);
            formData.append("mobileNumber", data.primaryMobileNo);
            formData.append("alternateMobile", data.alternateMobileNo || "");
            formData.append("whatsappNumber", data.whatsappNo || "");
            formData.append("personalEmail", data.personalEmail);
            formData.append("officialEmail", data.businessEmail || "");


            // =====================================

            // Identity

            // =====================================

            // Identity
            formData.append("aadhaarNumber", data.aadhaarNumber);
            formData.append("panNumber", data.panNumber);
            formData.append("voterIdNumber", data.voterIdNumber || "");
            formData.append("drivingLicense", data.drivingLicenseNumber || "");
            formData.append("passportNumber", data.passportNumber || "");


            // =====================================

            // Address

            // =====================================

            // Address
            formData.append("currentResidentialAddress", data.currentResidentialAddress);
            formData.append("currentResidentialPincode", data.currentResidentialAddressPin);
            formData.append("currentOfficeAddress", data.currentOfficeShopAddress || "");
            formData.append("currentOfficePincode", data.currentOfficeShopAddressPin || "");
            formData.append("residentialStatus", data.residentialStatus);
            formData.append(
                "yearsAtCurrentResidentialAddress",
                String(data.yearsAtCurrentResidentialAddress ?? "")
            );

            // Extra (optional)
            formData.append("jobBusiness", data.jobBusiness || "");



            // =====================================

            // Card Details

            // =====================================

            // Card Details
            formData.append("bankName", data.bankNameCreditCard || "");
            formData.append("limitAmount", data.limitAmount || "");
            formData.append("cardType", data.cardType || "");



            // =====================================

            // CIBIL

            // =====================================

            // CIBIL
            formData.append("cibilIssues", data.cibilIssues || "");



            // =====================================

            // Consent (Boolean → string)

            // =====================================

            formData.append("consent", "true");



            // =====================================

            // Documents (Files)

            // =====================================

            // Documents (Files)
            if (data.aadhaarFront) formData.append("aadhaarFront", data.aadhaarFront);
            if (data.aadhaarBack) formData.append("aadhaarBack", data.aadhaarBack);
            if (data.panFront) formData.append("panFront", data.panFront);
            if (data.residentialBill) formData.append("residentialBill", data.residentialBill);
            if (data.shopBill) formData.append("shopBill", data.shopBill);



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

            <div className="relative bg-white w-full max-w-full sm:max-w-4xl rounded-none sm:rounded-xl p-4 sm:p-8 max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto">

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
                        <h3 className="font-semibold mb-3">Personal Information</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
                                <input {...register("firstName", { required: true })} placeholder="First Name" className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Middle Name</label>
                                <input {...register("middleName")} placeholder="Middle Name" className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
                                <input {...register("lastName", { required: true })} placeholder="Last Name" className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Primary Mobile No. <span className="text-destructive">*</span></label>
                                <input type="text" {...register("primaryMobileNo", { required: true })} placeholder="Primary Mobile No." className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Alternate Mobile No.</label>
                                <input type="text" {...register("alternateMobileNo")} placeholder="Alternate Mobile No." className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">WhatsApp No.</label>
                                <input type="text" {...register("whatsappNo")} placeholder="WhatsApp No." className="input" />
                            </div>

                        </div>

                    </div>

                    {/* ================= Employment Informations ================= */}
                    <div>
                        <h3 className="font-semibold mb-3">Employment Information</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <select id="jobBusiness" {...register("jobBusiness")} className="input">
                                <option value="">Select Employment Status</option>
                                <option value="Salaried Employee">Salaried Employee</option>
                                <option value="Self Employed Business">Self Employed Business</option>
                                <option value="Self Employed Professional">Self Employed Professional</option>
                            </select>
                        </div>
                    </div>

                    {/* ================= Employment Informations ================= */}
                    <div>
                        <h3 className="font-semibold mb-3">Loan Details</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Bank Name (Credit Card)</label>
                                <input type="text" {...register("bankNameCreditCard")} placeholder="Bank Name" className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Limit Amount</label>
                                <input type="text" {...register("limitAmount")} placeholder="Limit Amount" className="input" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Card Type</label>
                                <select {...register("cardType")} className="input">
                                    <option value="">Select Card Type</option>
                                    <option value="Domestic">Domestic</option>
                                    <option value="International">International</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Please mention if you have any CIBIL issues or problems in your credit profile. Kindly specify details, if applicable. <span className="text-red-400 text-xs">(optional)</span></label>
                                <input {...register("cibilIssues")} placeholder="CibilIssues" className="input bg-gray-200" />
                            </div>

                            <select
                                id="residentialStatus"
                                {...register("residentialStatus", { required: "This field is required" })}
                                className="input"
                            >
                                <option value="">Select</option>
                                <option value="Owned">Owned</option>
                                <option value="Rented">Rented</option>
                            </select>

                            <input
                                id="yearsAtCurrentResidentialAddress"
                                type="number"
                                min={0}
                                max={99}
                                {...register("yearsAtCurrentResidentialAddress", {
                                    required: "This field is required",
                                })}
                                placeholder="e.g., 3"
                            />
                        </div>
                    </div>


                    {/* ================= Email Information ================= */}
                    <div>
                        <h3 className="font-semibold mb-3">Email Information</h3>
                        <div>
                            <label className="text-sm font-medium">Business Email</label>
                            <input
                                id="businessEmail"
                                type="email"
                                {...register("businessEmail")}

                                placeholder="john@company.com"
                            />
                        </div>

                        <label className="text-sm font-medium">Personal Email <span className="text-destructive">*</span></label>
                        <input
                            id="personalEmail"
                            type="email"
                            {...register("personalEmail", {
                                required: "This field is required",
                            })}
                            placeholder="john.doe@gmail.com"
                        />
                    </div>

                    {/* ================= Address Details ================= */}
                    <div>
                        <h3 className="font-semibold mb-3">Address Details</h3>
                        <div>
                            <input
                                type="text"
                                {...register("currentResidentialAddress", {
                                    required: "This field is required",
                                })}
                                placeholder="Current Residential Address"
                            />

                            <input
                                type="text"
                                {...register("currentOfficeShopAddress")}
                                placeholder="Current Office / Shop Address"
                            />

                            <input
                                type="number"
                                min={0}
                                max={99}
                                {...register("currentResidentialAddressPin", {
                                    required: "This field is required",
                                })}
                                placeholder="Current Residential Address PIN"
                            />
                            <input
                                type="number"
                                min={0}
                                max={99}
                                {...register("currentOfficeShopAddressPin")}
                                placeholder="Current Office / Shop Address PIN"
                            />

                            <label className="text-sm font-medium">Upload Rent Agreement (Office/Shop)</label>
                            <input type="file" {...register("uploadRentAgreementOfficeShop")} />
                        </div>
                    </div>
                    {/* ================= Identity Details ================= */}
                    <div>
                        <h3 className="font-bold text-xl">Identity Details</h3>
                        <div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">PAN Number <span className="text-destructive">*</span></label>
                                <input {...register("panNumber", { required: true })} placeholder="PAN Number" className="input bg-gray-200" />

                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Number <span className="text-destructive">*</span></label>
                                <input {...register("aadhaarNumber", { required: true })} placeholder="Aadhaar Number" className="input bg-gray-200" />

                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">PAN Photo <span className="text-destructive">*</span></label>
                                <input type="file" {...register("panFront")} className="input bg-gray-200" />

                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Voter ID Number (optional) <span className="text-destructive">*</span></label>
                                <input type="text" {...register("voterIdNumber")} className="input bg-gray-200" />

                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Driving License Number (optional)<span className="text-destructive">*</span></label>
                                <input type="text" {...register("drivingLicenseNumber")} className="input bg-gray-200" />

                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Passport Number (optional) <span className="text-destructive">*</span></label>
                                <input type="text" {...register("passportNumber")} className="input bg-gray-200" />

                            </div>
                        </div>
                    </div>


                    {/* ================= Document Uploads ================= */}

                    <div>

                        <h3 className="font-semibold mb-3">Document Uploads</h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Front <span className="text-destructive">*</span></label>
                                <input type="file" {...register("aadhaarFront", { required: true })} className="input" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Aadhaar Back</label>
                                <input type="file" {...register("aadhaarBack")} className="input" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">PAN Card Front <span className="text-destructive">*</span></label>
                                <input type="file" {...register("panFront", { required: true })} className="input" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Latest Residential Electricity Bill</label>
                                <input type="file" {...register("residentialBill")} className="input" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Latest Shop/Office Electricity Bill</label>
                                <input type="file" {...register("shopBill")} className="input" />
                            </div>

                        </div>

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

                            className="px-6 py-2 bg-[#0099D8] text-white rounded-lg"

                        >

                            {loading ? "Submitting..." : "Submit Application"}

                        </button>

                    </div>



                </form>

            </div>

        </div>

    );

}

