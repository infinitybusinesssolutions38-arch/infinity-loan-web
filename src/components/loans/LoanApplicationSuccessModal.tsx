"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    isGoogleFormUrl,
    resolveDocumentsUploadUrl,
    sanitizeDocumentsUploadHref,
} from "@/lib/loan-documents-upload";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    applicationRef?: string | null;
    categoryKey?: string;
    categoryTitle?: string;
};

export default function LoanApplicationSuccessModal({
    isOpen,
    onClose,
    applicationRef,
    categoryKey,
    categoryTitle,
}: Props) {
    const [mounted, setMounted] = useState(false);
    const [uploadUrl, setUploadUrl] = useState("");
    const [resolvingUrl, setResolvingUrl] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setUploadUrl("");
            return;
        }

        let cancelled = false;
        setResolvingUrl(true);

        void resolveDocumentsUploadUrl({
            applicationRef,
            categoryKey,
            categoryTitle,
        }).then((url) => {
            if (!cancelled) {
                setUploadUrl(url);
                setResolvingUrl(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [isOpen, applicationRef, categoryKey, categoryTitle]);

    if (!mounted || !isOpen) return null;

    const usesGoogleForm = uploadUrl ? isGoogleFormUrl(uploadUrl) : false;
    const linkLabel = usesGoogleForm ? "Google Form" : "upload link";

    return createPortal(
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="loan-success-title"
        >
            <div
                className="absolute inset-0 bg-[#0F172A]/50 animate-[fade-in_0.25s_ease-out]"
                aria-hidden
            />

            <div className="relative z-10 w-full max-w-lg animate-modal-in overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.2)] ring-1 ring-[#D6EEF8]">
                <div className="border-b border-[#D6EEF8] bg-gradient-to-b from-[#F0FDF4] to-white px-6 pb-5 pt-8 text-center sm:px-8">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] ring-4 ring-[#BBF7D0]/60">
                        <CheckCircle2 className="h-9 w-9 text-[#16A34A]" strokeWidth={2.25} aria-hidden />
                    </div>
                    <h2
                        id="loan-success-title"
                        className="text-xl font-bold tracking-tight text-[#1A1A1A] sm:text-2xl"
                    >
                        Application Submitted Successfully
                    </h2>
                </div>

                <div className="max-h-[min(70vh,520px)] overflow-y-auto px-6 py-5 sm:px-8">
                    <div className="space-y-4 text-sm leading-relaxed text-[#4B5563] sm:text-[15px]">
                        <p>Thank you for submitting your loan application.</p>
                        <p>
                            Your application has been received successfully and is currently under
                            review by our team.
                        </p>
                        <p>
                            Please wait for approval. Our team will verify your details and contact
                            you shortly regarding the next steps of the process.
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#D6EEF8] bg-[#F5FCFF] p-4 sm:p-5">
                        <h3 className="text-sm font-semibold text-[#1A1A1A] sm:text-base">
                            Required Documents Upload
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                            To proceed further, please upload the remaining required documents using
                            the {linkLabel} below:
                        </p>
                        {resolvingUrl ? (
                            <div className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6EEF8] bg-white px-5 py-3 text-sm font-medium text-[#64748B]">
                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                Loading upload link…
                            </div>
                        ) : uploadUrl ? (
                            <>
                                {usesGoogleForm ? (
                                    <div
                                        className="mt-4 flex items-center gap-2 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2.5 text-sm font-medium text-[#166534]"
                                        role="status"
                                    >
                                        <CheckCircle2
                                            className="h-4 w-4 shrink-0 text-[#16A34A]"
                                            aria-hidden
                                        />
                                        Official upload link — configured by admin for this service
                                    </div>
                                ) : null}
                                <a
                                    href={sanitizeDocumentsUploadHref(uploadUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-3 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(0,174,239,0.2)] transition-all duration-300 hover:bg-[#008FCC] hover:shadow-[0_8px_24px_rgba(0,174,239,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/25 sm:w-auto ${usesGoogleForm ? "mt-3" : "mt-4"}`}
                                >
                                    {usesGoogleForm ? "Open Google Form" : "Upload Documents Here"}
                                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                                </a>
                            </>
                        ) : (
                            <p className="mt-3 text-sm text-[#B45309]">
                                Upload link is not configured yet. Please contact support or check
                                back later from Applied Loans.
                            </p>
                        )}
                    </div>

                    <div className="mt-5 flex gap-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
                        <AlertTriangle
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#D97706]"
                            aria-hidden
                        />
                        <div className="text-sm leading-relaxed text-[#92400E]">
                            <p className="font-semibold text-[#78350F]">Important Note</p>
                            <p className="mt-1">
                                If you do not upload the required documents, your loan application
                                process cannot be completed and may remain pending.
                            </p>
                            <p className="mt-2">
                                Please ensure all requested documents are uploaded as soon as
                                possible.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#D6EEF8] bg-[#F5FCFF] px-6 py-4 sm:px-8">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
}
