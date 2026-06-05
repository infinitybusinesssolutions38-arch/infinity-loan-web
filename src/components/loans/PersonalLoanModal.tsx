"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function PersonalLoanModal({ isOpen, onClose }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    // Dynamic Existing Loans
    const [existingLoans, setExistingLoans] = useState<
        { bankName: string; amount: string; emi: string }[]
    >([{ bankName: "", amount: "", emi: "" }]);

    if (!isOpen) return null;

    // ================= SUBMIT =================
    const onSubmit = async (data: any) => {
        try {
            setLoading(true);

            const formData = new FormData();

            // Append normal fields
            // =============================
            // Personal Details
            // =============================
            formData.append("firstName", data.firstName);
            formData.append("middleName", data.middleName);
            formData.append("lastName", data.lastName);
            formData.append("dob", data.dob);
            formData.append("gender", data.gender);
            formData.append("maritalStatus", data.maritalStatus);

            // =============================
            // Contact
            // =============================
            formData.append("mobileNumber", data.mobileNumber);
            formData.append("whatsappNumber", data.whatsappNumber);
            formData.append("alternateMobile", data.alternateMobile);
            formData.append("personalEmail", data.personalEmail);
            formData.append("officialEmail", data.officialEmail);

            // =============================
            // Identification
            // =============================
            formData.append("panNumber", data.panNumber);
            formData.append("aadhaarNumber", data.aadhaarNumber);
            formData.append("voterIdNumber", data.voterIdNumber);
            formData.append("drivingLicense", data.drivingLicense);
            formData.append("passportNumber", data.passportNumber);

            // =============================
            // Address
            // =============================
            formData.append("currentResidentialAddress", data.currentResidentialAddress);
            formData.append("currentResidentialPincode", data.currentResidentialPincode);
            formData.append("state", data.state);
            formData.append("city", data.city);
            formData.append("residenceType", data.residenceType);
            formData.append("permanentAddress", data.permanentAddress);

            // =============================
            // Employment
            // =============================
            formData.append("employmentType", data.employmentType);
            formData.append("companyName", data.companyName);
            formData.append("monthlyIncome", data.monthlyIncome);

            // =============================
            // Loan Details
            // =============================
            formData.append("requiredLoanAmount", data.requiredLoanAmount);
            formData.append("preferredTenure", data.preferredTenure);
            formData.append("purpose", data.purpose);

            // Append existing loans
            formData.append("existingLoans", JSON.stringify(existingLoans));

            await axios.post("/api/personal-loan", formData);

            alert("Your form successfully submitted!");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // ================= UI =================
    return (
        <div
            className="fixed inset-0 bg-[#1A1A1A]/40 flex justify-center items-center z-50 overflow-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative bg-white w-full max-w-4xl rounded-[20px] border border-[#D6EEF8] p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.18)] max-h-[90vh] overflow-y-auto">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#666666] transition-colors duration-300 ease-out hover:bg-[#F7F9FC] hover:text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Personal Loan Application
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* ================= PERSONAL DETAILS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            {...register("firstName", { required: true })}
                            placeholder="First Name"
                            className="input"
                        />
                        <input
                            {...register("middleName")}
                            placeholder="Middle Name"
                            className="input"
                        />
                        <input
                            {...register("lastName", { required: true })}
                            placeholder="Last Name"
                            className="input"
                        />
                        <input
                            type="date"
                            {...register("dob", { required: true })}
                            className="input"
                        />
                        <select {...register("gender")} className="input">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            {...register("mobileNumber", { required: true })}
                            placeholder="Mobile Number"
                            className="input"
                        />
                        <input
                            {...register("personalEmail", { required: true })}
                            placeholder="Personal Email"
                            className="input"
                        />
                        <input
                            {...register("alternateMobile")}
                            placeholder="Alternate Mobile"
                            className="input"
                        />
                    </div>

                    {/* ================= ID DETAILS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            {...register("panNumber", { required: true })}
                            placeholder="PAN Number"
                            className="input"
                        />
                        <input
                            {...register("aadhaarNumber", { required: true })}
                            placeholder="Aadhaar Number"
                            className="input"
                        />
                    </div>

                    {/* ================= ADDRESS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("currentResidentialAddress")}
                            placeholder="Current Address"
                            className="input"
                        />
                        <input
                            {...register("city")}
                            placeholder="City"
                            className="input"
                        />
                        <input
                            {...register("state")}
                            placeholder="State"
                            className="input"
                        />
                        <input
                            {...register("currentResidentialPincode")}
                            placeholder="Pincode"
                            className="input"
                        />
                    </div>

                    {/* ================= EMPLOYMENT DETAILS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            {...register("companyName")}
                            placeholder="Company Name"
                            className="input"
                        />
                        <input
                            {...register("designation")}
                            placeholder="Designation"
                            className="input"
                        />
                        <input
                            {...register("monthlyIncome")}
                            placeholder="Monthly Income"
                            className="input"
                        />
                    </div>

                    {/* ================= LOAN DETAILS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("requiredLoanAmount", { required: true })}
                            placeholder="Required Loan Amount"
                            className="input"
                        />
                        <input
                            {...register("preferredTenure")}
                            placeholder="Preferred Tenure (Months)"
                            className="input"
                        />
                    </div>

                    {/* ================= EXISTING LOANS ================= */}
                    <div>
                        <h3 className="font-semibold mb-2">Existing Loans</h3>

                        {existingLoans.map((loan, index) => (
                            <div key={index} className="grid grid-cols-3 gap-3 mb-3">
                                <input
                                    placeholder="Bank Name"
                                    value={loan.bankName}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].bankName = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input"
                                />
                                <input
                                    placeholder="Loan Amount"
                                    value={loan.amount}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].amount = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input"
                                />
                                <input
                                    placeholder="EMI"
                                    value={loan.emi}
                                    onChange={(e) => {
                                        const updated = [...existingLoans];
                                        updated[index].emi = e.target.value;
                                        setExistingLoans(updated);
                                    }}
                                    className="input"
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                setExistingLoans([
                                    ...existingLoans,
                                    { bankName: "", amount: "", emi: "" },
                                ])
                            }
                            className="text-[#00AEEF]"
                        >
                            + Add More
                        </button>
                    </div>

                    {/* ================= CONSENT ================= */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" {...register("consent", { required: true })} />
                        <span>I agree to terms & conditions</span>
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
                            className="px-6 py-2 bg-[#00AEEF] text-white rounded-lg"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
