"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    const value: LoanModalContextType = {
        open: () => {
            const isLoggedIn = (() => {
                try {
                    return Boolean(localStorage.getItem("token"));
                } catch {
                    return false;
                }
            })();

            if (!isLoggedIn) {
                const next = `${window.location.pathname}${window.location.search}`;
                router.push(`/login?next=${encodeURIComponent(next)}`);
                return;
            }

            setIsOpen(true);
        },
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