"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";


type OrgFormData = {
    amount: string;
    firmName: string;
    panTan: string;
    cin: string;
    incorporationDate: string;
    title: string;
    directorFirstName: string;
    directorLastName: string;
    userFirstName: string;
    userLastName: string;
    email: string;
    password: string;
    mobile: string;
    regAddress1: string;
    regAddress2: string;
    state: string;
    city: string;
    pin: string;
    commAddress: string;
    agree: boolean;
    agree2: boolean;
};


const OrganizationSignupForm = () => {

    const router = useRouter();
   

    useEffect(() => {
        // ✅ Check if the user is already logged in
        const checkUser = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                if (res.data.user) {
                    console.log("User found:", res.data.user);
                    router.push("/dashboard/lender"); // Redirect logged-in user
                } else {
                    console.log("No user logged in");
                    // setLoading(false);
                }
            } catch (err) {
                console.log("Auth check failed:", err);
                // setLoading(false);
            }
        };

        checkUser();
    }, [router]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<OrgFormData>();

    const onSubmit = async (data: OrgFormData) => {
        try {
            const res = await axios.post('/api/organization-loan', data);
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
            answer:
                "Institutional lenders such as banks, NBFCs, and registered financial institutions are eligible to join. Entities must comply with applicable regulatory guidelines and have valid registration documents.",
        },
        {
            question: "Privacy & Security",
            answer:
                "All institutional data is stored securely and handled in compliance with industry standards. We prioritize encryption and secure access to protect your financial and personal information.",
        },
        {
            question: "Documents Required",
            answer:
                "You will need to provide your certificate of incorporation, PAN, GST registration, and any regulatory licenses as applicable. Additional verification documents may be requested during onboarding.",
        },
        {
            question: "Contact Us",
            answer:
                "For any queries or onboarding support, please contact our institutional partnership team at institutional@fortuneloans.com or through our contact page.",
        },
    ];

    

   

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-6xl">


                {/* LEFT SIDE */}
                <div className="md:w-1/2 bg-card shadow-xl rounded-l-2xl p-8 overflow-y-auto border border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        Organization Registration Form
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        Fill in your organization details to register.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Amount */}
                        <LabelInputContainer>
                            <Label htmlFor="amount">Enter The Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="100000"
                                {...register("amount", { required: true })}
                                className="border border-border bg-background"
                            />
                            {errors.amount && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Firm Name */}
                        <LabelInputContainer>
                            <Label htmlFor="firmName">Name of the Firm</Label>
                            <Input
                                id="firmName"
                                type="text"
                                placeholder="Fortune Pvt Ltd"
                                {...register("firmName", { required: true })}
                                className="border border-border bg-background"
                            />
                            {errors.firmName && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* PAN/TAN and CIN */}
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="panTan">PAN / TAN</Label>
                                <Input
                                    id="panTan"
                                    type="text"
                                    placeholder="ABCDE1234F"
                                    {...register("panTan", { required: true })}
                                    className="border border-border bg-background"
                                />
                                {errors.panTan && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="cin">CIN</Label>
                                <Input
                                    id="cin"
                                    type="text"
                                    placeholder="L12345MH2020PLC123456"
                                    {...register("cin", { required: true })}
                                    className="border border-border bg-background"
                                />
                                {errors.cin && (
                                    <span className="text-red-500 text-xs">Required</span>
                                )}
                            </LabelInputContainer>
                        </div>

                        {/* Incorporation Date */}
                        <LabelInputContainer>
                            <Label htmlFor="incorporationDate">Incorporation Date</Label>
                            <Input
                                id="incorporationDate"
                                type="date"
                                {...register("incorporationDate", { required: true })}
                                className="border border-border bg-background"
                            />
                            {errors.incorporationDate && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </LabelInputContainer>

                        {/* Director Details */}
                        <div>
                            <Label className="block mb-1 font-semibold">
                                Director’s Title
                            </Label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="Mr"
                                        {...register("title", { required: true })}
                                        className="accent-primary"
                                    />
                                    Mr.
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="Ms"
                                        {...register("title", { required: true })}
                                        className="accent-primary"
                                    />
                                    Ms.
                                </label>
                            </div>
                            {errors.title && (
                                <span className="text-red-500 text-xs">Select one</span>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="directorFirstName">Director First Name</Label>
                                <Input
                                    id="directorFirstName"
                                    type="text"
                                    placeholder="John"
                                    {...register("directorFirstName", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="directorLastName">Director Last Name</Label>
                                <Input
                                    id="directorLastName"
                                    type="text"
                                    placeholder="Doe"
                                    {...register("directorLastName", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>
                        </div>

                        {/* User Info */}
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="userFirstName">User First Name</Label>
                                <Input
                                    id="userFirstName"
                                    type="text"
                                    placeholder="Ramesh"
                                    {...register("userFirstName", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="userLastName">User Last Name</Label>
                                <Input
                                    id="userLastName"
                                    type="text"
                                    placeholder="Sharma"
                                    {...register("userLastName", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>
                        </div>

                        {/* Email, Password, Mobile */}
                        <LabelInputContainer>
                            <Label htmlFor="email">Email ID</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", { required: true })}
                                className="border border-border bg-background"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", { required: true })}
                                className="border border-border bg-background"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="mobile">Mobile No</Label>
                            <Input
                                id="mobile"
                                type="number"
                                placeholder="9876543210"
                                {...register("mobile", { required: true })}
                                className="border border-border bg-background"
                            />
                        </LabelInputContainer>

                        {/* Registered Address */}
                        <LabelInputContainer>
                            <Label htmlFor="regAddress1">Registered Address - Line 1</Label>
                            <Input
                                id="regAddress1"
                                type="text"
                                placeholder="123 Business Park"
                                {...register("regAddress1", { required: true })}
                                className="border border-border bg-background"
                            />
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="regAddress2">Registered Address - Line 2</Label>
                            <Input
                                id="regAddress2"
                                type="text"
                                placeholder="Main Street"
                                {...register("regAddress2")}
                                className="border border-border bg-background"
                            />
                        </LabelInputContainer>

                        {/* State, City, PIN */}
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <LabelInputContainer>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    placeholder="Maharashtra"
                                    {...register("state", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder="Mumbai"
                                    {...register("city", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="pin">PIN</Label>
                                <Input
                                    id="pin"
                                    type="number"
                                    placeholder="400001"
                                    {...register("pin", { required: true })}
                                    className="border border-border bg-background"
                                />
                            </LabelInputContainer>
                        </div>

                        {/* Communication Address */}
                        <LabelInputContainer>
                            <Label htmlFor="commAddress">Address for Communication</Label>
                            <Input
                                id="commAddress"
                                type="text"
                                placeholder="Corporate Office Address"
                                {...register("commAddress", { required: true })}
                                className="border border-border bg-background"
                            />
                        </LabelInputContainer>

                        {/* Checkboxes */}
                        <div className="flex items-start space-x-2 mb-4">
                            <input
                                id="agree"
                                type="checkbox"
                                className="mt-1 accent-primary"
                                {...register("agree", { required: true })}
                            />
                            <label htmlFor="agree" className="text-sm text-muted-foreground">
                                I agree to the{" "}
                                <a href="#" className="text-primary underline">
                                    Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary underline">
                                    Privacy Policy
                                </a>
                                .
                            </label>
                        </div>
                        {errors.agree && (
                            <span className="text-red-500 text-xs mb-2 block">
                                You must agree before submitting
                            </span>
                        )}

                        <div className="flex items-start space-x-2 mb-4">
                            <input
                                id="agree2"
                                type="checkbox"
                                className="mt-1 accent-primary"
                                {...register("agree2", { required: true })}
                            />
                            <label htmlFor="agree2" className="text-sm text-muted-foreground">
                                I acknowledge that lending carries risk and returns are not
                                guaranteed.
                            </label>
                        </div>
                        {errors.agree2 && (
                            <span className="text-red-500 text-xs mb-2 block">
                                You must acknowledge before submitting
                            </span>
                        )}

                        {/* Submit */}
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

                {/* DIVIDER */}
                <div className="w-px h-[80%] my-4 bg-border" />

                {/* RIGHT SIDE */}
                <div className="md:w-1/2 bg-card shadow-xl rounded-r-2xl p-8 flex flex-col justify-start border border-border">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Register Your Organization
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Join Fortune Loans as a corporate lender and start growing your
                        investments smartly.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li>✅ Secure P2P Lending Platform</li>
                        <li>✅ Verified Borrowers</li>
                        <li>✅ Transparent Process</li>
                    </ul>


                    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-10">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-1">
                            {/* Right Side: FAQ List */}
                            <div className="mb-5">
                                <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-left md:text-5xl">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                            <div className="divide-y divide-border">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="py-4  cursor-pointer" onClick={() => toggleFAQ(index)}>
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
                                                        <motion.p
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="mt-2 text-muted-foreground"
                                                        >
                                                            {faq.answer}
                                                        </motion.p>
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
            </div>
        </div>
    );
};

export default OrganizationSignupForm;

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
}) => <div className={cn("flex flex-col w-full space-y-2", className)}>{children}</div>;
