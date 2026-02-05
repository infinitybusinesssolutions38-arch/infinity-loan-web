"use client";

import React, { createContext, useContext, useState } from "react";
import LoanApplicationModalForm from "./LoanApplicationModalForm";

type LoanModalContextType = {
    open: () => void;
    close: () => void;
};

const LoanModalContext = createContext<LoanModalContextType | undefined>(
    undefined
);

export function LoanModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const value: LoanModalContextType = {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    };

    return (
        <LoanModalContext.Provider value={value}>
            {children}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
                    <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Loan Application
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Fill a few basic details to get started. You can save and complete it later.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                aria-label="Close loan application form"
                            >
                                ×
                            </button>
                        </div>
                        <div className="max-h-[80vh] overflow-y-auto px-4 pb-5 pt-4">
                            <LoanApplicationModalForm />
                        </div>
                    </div>
                </div>
            )}
        </LoanModalContext.Provider>
    );
}

export function useLoanModal() {
    const ctx = useContext(LoanModalContext);
    if (!ctx) {
        throw new Error("useLoanModal must be used within a LoanModalProvider");
    }
    return ctx;
}