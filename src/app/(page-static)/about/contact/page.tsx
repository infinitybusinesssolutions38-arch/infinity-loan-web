"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import axios from "axios";

type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    mobile: string;
    message: string;
};

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post('/api/contact', data);
            console.log(res.data);
            if (res.data.success === true) {
                alert("Registration successful!");
                reset();
            }
        } catch (error) {
            console.log(error);
        }

    };

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Eligibility",
            answer: `
Individuals applying should:
• Resident of India
• At least 21 years old
• Earning member
• Have an identity proof
• Have income proof
• Have a valid bank account
    `,
        },
        {
            question: "Privacy & Security",
            answer: `
* All information is kept at a secure Data Center
* Session on Fortune Loans is encrypted from Sign in to Sign out
* Keeping your personal & private information secure is our first priority
    `,
        },
        {
            question: "Documents Required",
            answer: `
For a successful registration as a borrower you need to submit the following documents for verification:
Click Here to check the list
    `,
        },
        {
            question: "Contact Us",
            answer: `
For any queries or onboarding support, please contact our support team at support@fortuneloans.com or through our contact page.
    `,
        },
    ];



    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl">
                {/* LEFT SIDE - Info Section (with shadow) */}
                <div className="md:w-1/2 bg-card shadow-xl rounded-l-2xl p-8 flex flex-col justify-start border border-border">
                    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-10">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-1">
                            {/* Header */}
                            <div className="mb-5">
                                <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-left md:text-5xl">
                                    Frequently Asked Questions
                                </h2>
                            </div>

                            {/* FAQ List */}
                            <div className="divide-y divide-border">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="py-4 cursor-pointer"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 text-accent flex-shrink-0">
                                                {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-medium text-foreground">
                                                    {faq.question}
                                                </h3>

                                                <AnimatePresence>
                                                    {openIndex === index && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {/* Handle multiline text */}
                                                            <p className="mt-2 text-muted-foreground whitespace-pre-line leading-relaxed">
                                                                {faq.answer.split("\n").map((line, i) => {
                                                                    if (line.includes("Individuals applying should:")) {
                                                                        return (
                                                                            <span key={i} className="font-semibold text-foreground">
                                                                                {line.trim()}
                                                                                {"\n"}
                                                                            </span>
                                                                        );
                                                                    }
                                                                    return <span key={i}>{line.trim() + "\n"}</span>;
                                                                })}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Divider Line */}
                <div className="w-px h-[80%] my-4 bg-border" />

                {/* RIGHT SIDE - Form Section (with shadow) */}
                <div className="md:w-1/2 bg-card shadow-xl rounded-r-2xl p-8 border border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        Contact Us
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        Sign up to access your loan dashboard.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* First & Last Name */}
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder="John"
                                    className="border border-border bg-background"
                                    {...register("firstname", { required: true })}
                                />
                                {errors.firstname && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder="Doe"
                                    className="border border-border bg-background"
                                    {...register("lastname", { required: true })}
                                />
                                {errors.lastname && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>
                        </div>

                        {/* subject */}
                        <LabelInputContainer>
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                type="text"
                                placeholder="Subject..."
                                className="border border-border bg-background"
                                {...register("subject", { required: true })}
                            />
                            {errors.subject && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Email */}
                        <LabelInputContainer>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="border border-border bg-background"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>



                        {/* Mobile */}
                        <LabelInputContainer>
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                                id="mobile"
                                type="number"
                                placeholder="9876543210"
                                className="border border-border bg-background"
                                {...register("mobile", { required: true })}
                            />
                            {errors.mobile && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* message */}
                        <LabelInputContainer>
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                id="message"
                                rows={4}
                                cols={3}
                                className="p-2 border border-border bg-background rounded-md focus:border-primary hover:ring-2 focus:ring-primary/20 outline-none "
                                {...register("message", { required: true })}
                            />
                            {errors.message && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-r from-cta via-cta to-accent font-medium text-white mt-4 shadow-glow-cta"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                            <BottomGradient />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;

/* === Utility Components === */
const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
);

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
