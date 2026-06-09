"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Mail, Phone, MapPin, Send, CheckCircle2, FileText } from "lucide-react";
import PrivateInstitutionalHighlight from "@/app/components/PrivateInstitutionalHighlight";
import PoorCibilHighlight from "@/app/components/PoorCibilHighlight";
import EmiRestructuringHighlight from "@/app/components/Emirestructuringhighlight";
import PropertyLoanHighlight from "@/app/components/Propertyloanhighlight";

type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    mobile: string;
    message: string;
};

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const onSubmit = async (data: FormData) => {
        try {
            setSubmitError("");
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitSuccess(true);
                reset();
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                setSubmitError(result.message || "Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.log(error);
            setSubmitError("Something went wrong. Please try again.");
        }
    };

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "🔐 Privacy & Data Security Policy",
            answer: [
                "The Company places the highest importance on safeguarding the privacy, confidentiality, and security of its users’ personal and financial information. In accordance with applicable laws and industry best practices, the following measures are implemented to ensure data protection:",
                "",
                "🗄️ Secure Data Storage",
                "All user data is stored in secure, access-controlled, and encrypted data centers, designed to prevent unauthorized access, loss, or misuse of information.",
                "",
                "🔑 End-to-End Encryption",
                "The Company employs end-to-end encryption protocols to protect user data throughout the entire session, including login, usage, and logout.",
                "",
                "⚖️ Regulatory Compliance",
                "Data processing and storage practices strictly comply with applicable data protection laws, regulatory guidelines, and statutory requirements in force from time to time.",
                "",
                "🛡️ Security Audits & Monitoring",
                "Periodic security audits, vulnerability assessments, and continuous system monitoring are conducted to identify, assess, and mitigate potential risks.",
                "",
                "🤝 Data Sharing & Confidentiality",
                "User information shall not be disclosed, shared, or transferred to any third party without the user’s prior consent, except where such disclosure is required under applicable law, regulation, court order, or by a competent authority.",
            ],
        },
        {
            question: "✅ Eligibility Criteria for Loan Application",
            answer: [
                "To be eligible to apply for a loan, the applicant must fulfill the following criteria:",
                "",
                "🇮🇳 Indian Residency",
                "The applicant must be a resident of India.",
                "",
                "🎂 Minimum Age Requirement",
                "The applicant should be 21 years of age or above at the time of application.",
                "",
                "💼 Income Eligibility",
                "Must be an earning individual with a stable and verifiable source of income.",
                "",
                "🪪 Valid Identity Proof",
                "Should possess valid government-issued identity proof.",
                "",
                "📄 Income Documentation",
                "Must submit required income documents as per the lender’s policy.",
                "",
                "🏦 Active Bank Account",
                "Should maintain an active bank account in the applicant’s name for loan transactions and disbursement.",
            ],
        },
        {
            question: "📑 Required Documents",
            answer: [
                "For the purpose of successful registration, identity verification, and loan processing, the applicant shall be required to submit the following documents, as applicable and as may be prescribed by the Company and/or the Lender from time to time:",
                "",
                "🪪 Government-Issued Photo Identity Proof",
                "Valid Aadhaar Card, Permanent Account Number (PAN) Card, Passport, or any other identity document recognized under applicable law.",
                "",
                "🏠 Proof of Address",
                "Valid utility bill, rent/lease agreement, or any other address proof acceptable as per regulatory or lender requirements.",
                "",
                "💼 Proof of Income",
                "Recent salary slips, Income Tax Returns (ITR), bank statements, or such other income documents as may be required under the lender’s credit policy.",
                "",
                "📸 Photographs",
                "Recent passport-size photographs of the applicant, as specified by the Company and/or the Lender.",
                "",
                "🏦 Bank Account Details",
                "Details of an active bank account held in the applicant’s name, along with recent bank statements for verification and disbursement purposes.",
                "",
                "👉 The applicant is advised to refer to the link provided below for the complete and updated document checklist, as requirements may vary based on the loan product, applicant profile, and applicable regulatory guidelines.",
            ],
        },
        // {
        //     question: "Get Support",
        //     answer: [
        //         "We're here to help you every step of the way:",
        //         "• Email: business@infinityloanservices.com",
        //         "• Phone: +91 1800-XXX-XXXX",
        //         "• Live chat available on our website",
        //         "• Response time: Within 24 hours",
        //         "• Office hours: Mon-Sat, 9 AM - 6 PM IST"
        //     ],
        // },
    ];

    return (
        <div className="min-h-screen bg-[#F7F9FC] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
                    >
                        Get in <span className="text-[#00AEEF]">Touch</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#666666] text-lg max-w-2xl mx-auto"
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </div>

                <div className="mb-12">
                    <PrivateInstitutionalHighlight />
                </div>
                <div className="mb-12">
                    <PoorCibilHighlight />
                </div>
                <div className="mb-12">
                    <EmiRestructuringHighlight />
                </div>
                <div className="mb-12">
                    <PropertyLoanHighlight />
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* LEFT SIDE - FAQ Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[20px] border border-[#D6EEF8] p-8 shadow-sm transition-all duration-300 ease-out hover:border-[#00AEEF]"
                    >
                        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">
                            Frequently Asked <span className="text-[#00AEEF]">Questions</span>
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-[#D6EEF8] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#00AEEF]"
                                >
                                    <div
                                        className="flex items-center justify-between p-5 cursor-pointer bg-[#F7F9FC] hover:bg-[#E6F7FD] transition-colors"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <h3 className="text-lg font-semibold text-[#1A1A1A]">
                                            {faq.question}
                                        </h3>
                                        <div className="flex-shrink-0 text-[#00AEEF]">
                                            {openIndex === index ? (
                                                <Minus size={20} className="transition-transform" />
                                            ) : (
                                                <Plus size={20} className="transition-transform" />
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-5 bg-white border-t border-[#D6EEF8]">
                                                    {faq.answer.map((line, i) => (
                                                        <p
                                                            key={i}
                                                            className={cn(
                                                                "text-[#666666] leading-relaxed",
                                                                i === 0 ? "font-medium text-[#00AEEF] mb-3" : "mb-1",
                                                                line.startsWith("•") && "ml-2"
                                                            )}
                                                        >
                                                            {line}
                                                        </p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info Cards */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-[#F7F9FC] rounded-lg border border-[#D6EEF8] transition-all duration-300 ease-out hover:border-[#00AEEF]">
                                <div className="w-12 h-12 bg-[#E6F7FD] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-[#00AEEF]" size={20} />
                                </div>
                                <div>
                                    <p className="text-[#666666] text-sm">Email Us</p>
                                    <a
                                        href="mailto:business@infinityloanservices.com"
                                        className="text-[#1A1A1A] font-medium hover:text-[#00AEEF] transition-colors break-all"
                                    >
                                        business@infinityloanservices.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-[#F7F9FC] rounded-lg border border-[#D6EEF8] transition-all duration-300 ease-out hover:border-[#00AEEF]">
                                <div className="w-12 h-12 bg-[#E6F7FD] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-[#00AEEF]" size={20} />
                                </div>
                                <div>
                                    <p className="text-[#666666] text-sm">Call Us</p>
                                    <a
                                        href="tel:+919579880841"
                                        className="text-[#1A1A1A] font-medium hover:text-[#00AEEF] transition-colors"
                                    >
                                        +91 9579880841
                                    </a>
                                    <a
                                        href="tel:+919766616960"
                                        className="mt-1 block text-[#1A1A1A] font-medium hover:text-[#00AEEF] transition-colors"
                                    >
                                        +91 9766616960
                                    </a>
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-4 p-4 bg-[#F7F9FC] rounded-lg border border-[#D6EEF8] transition-all duration-300 ease-out hover:border-[#00AEEF]">
                                <div className="w-12 h-12 bg-[#E6F7FD] rounded-full flex items-center justify-center flex-shrink-0">
                                    <FileText className="text-[#00AEEF]" size={20} />
                                </div>
                                <div>
                                    <p className="text-[#666666] text-sm">Registration</p>
                                    <p className="text-[#1A1A1A] font-medium text-sm">
                                        GST : 27APVPA2430A3ZB
                                    </p>
                                    <p className="text-[#1A1A1A] font-medium text-sm mt-1">
                                        UDYAM : UDYAM-MH-17-0163163
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-[20px] border border-[#D6EEF8] p-8 shadow-sm transition-all duration-300 ease-out hover:border-[#00AEEF]"
                        id="contact-form"
                    >
                        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
                            Send us a <span className="text-[#00AEEF]">Message</span>
                        </h2>
                        <p className="text-[#666666] mb-8">
                            Fill out the form below and our team will get back to you within 24 hours.
                        </p>

                        {/* Success Message */}
                        <AnimatePresence>
                            {submitSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-[#E6F7FD] border border-[#D6EEF8] rounded-lg flex items-center gap-3"
                                >
                                    <CheckCircle2 className="text-[#00AEEF]" size={20} />
                                    <p className="text-[#1A1A1A] font-medium">
                                        Message sent successfully! We'll be in touch soon.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Message */}
                        <AnimatePresence>
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-white border border-[#D6EEF8] rounded-lg flex items-center gap-3"
                                >
                                    <svg className="text-[#00AEEF] flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-[#1A1A1A] font-medium">{submitError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" id="contactForm" >
                            {/* First & Last Name */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <LabelInputContainer>
                                    <Label htmlFor="firstname" className="text-[#1A1A1A] font-medium">
                                        First Name <span className="text-[#00AEEF]">*</span>
                                    </Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        placeholder="John"
                                        className={cn(
                                            "h-11 bg-white border-[#D6EEF8] focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all",
                                            errors.firstname && "border-red-500"
                                        )}
                                        {...register("firstname", { required: "First name is required" })}
                                    />
                                    {errors.firstname && (
                                        <span className="text-red-500 text-sm flex items-center gap-1">
                                            {errors.firstname.message}
                                        </span>
                                    )}
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="lastname" className="text-[#1A1A1A] font-medium">
                                        Last Name <span className="text-[#00AEEF]">*</span>
                                    </Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        placeholder="Doe"
                                        className={cn(
                                            "h-11 bg-white border-[#D6EEF8] focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all",
                                            errors.lastname && "border-red-500"
                                        )}
                                        {...register("lastname", { required: "Last name is required" })}
                                    />
                                    {errors.lastname && (
                                        <span className="text-red-500 text-sm">
                                            {errors.lastname.message}
                                        </span>
                                    )}
                                </LabelInputContainer>
                            </div>

                            {/* Email */}
                            <LabelInputContainer>
                                <Label htmlFor="email" className="text-[#1A1A1A] font-medium">
                                    Email Address <span className="text-[#00AEEF]">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className={cn(
                                        "h-11 bg-white border-[#D6EEF8] focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all",
                                        errors.email && "border-red-500"
                                    )}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </LabelInputContainer>

                            {/* Mobile */}
                            <LabelInputContainer>
                                <Label htmlFor="mobile" className="text-[#1A1A1A] font-medium">
                                    Mobile Number <span className="text-[#00AEEF]">*</span>
                                </Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    placeholder="9876543210"
                                    className={cn(
                                        "h-11 bg-white border-[#D6EEF8] focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all",
                                        errors.mobile && "border-red-500"
                                    )}
                                    {...register("mobile", {
                                        required: "Mobile number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Please enter a valid 10-digit mobile number"
                                        }
                                    })}
                                />
                                {errors.mobile && (
                                    <span className="text-red-500 text-sm">{errors.mobile.message}</span>
                                )}
                            </LabelInputContainer>

                            {/* Subject */}
                            <LabelInputContainer>
                                <Label htmlFor="subject" className="text-[#1A1A1A] font-medium">
                                    Subject <span className="text-[#00AEEF]">*</span>
                                </Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="How can we help you?"
                                    className={cn(
                                        "h-11 bg-white border-[#D6EEF8] focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all",
                                        errors.subject && "border-red-500"
                                    )}
                                    {...register("subject", { required: "Subject is required" })}
                                />
                                {errors.subject && (
                                    <span className="text-red-500 text-sm">{errors.subject.message}</span>
                                )}
                            </LabelInputContainer>

                            {/* Message */}
                            <LabelInputContainer>
                                <Label htmlFor="message" className="text-[#1A1A1A] font-medium">
                                    Message <span className="text-[#00AEEF]">*</span>
                                </Label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Tell us more about your inquiry..."
                                    className={cn(
                                        "w-full p-3 bg-white border-2 border-[#D6EEF8] rounded-xl focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 outline-none transition-all resize-none",
                                        errors.message && "border-red-500"
                                    )}
                                    {...register("message", { required: "Message is required" })}
                                />
                                {errors.message && (
                                    <span className="text-red-500 text-sm">{errors.message.message}</span>
                                )}
                            </LabelInputContainer>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full h-12 bg-[#00AEEF] hover:bg-[#008FCC] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_2px_10px_rgba(0,174,239,0.18)] hover:shadow-[0_4px_14px_rgba(0,174,239,0.25)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </span>
                            </button>

                            <p className="text-center text-sm text-[#666666] mt-4">
                                By submitting this form, you agree to our privacy policy and terms of service.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

/* === Utility Components === */
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn("flex flex-col w-full space-y-2", className)}>
        {children}
    </div>
);