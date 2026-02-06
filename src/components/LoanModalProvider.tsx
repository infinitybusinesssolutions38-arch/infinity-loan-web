"use client";

import React, { createContext, useContext, useState } from "react";
import ApplyNowModal from "./loans/ApplyNowModal";

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
            <ApplyNowModal isOpen={isOpen} onClose={() => setIsOpen(false)} loanType="Loan" />
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