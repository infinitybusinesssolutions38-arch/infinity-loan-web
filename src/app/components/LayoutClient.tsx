"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { LoanModalProvider } from "@/components/LoanModalProvider";
import StickyContactButtons from "./StickyContactButtons";
import SuccessBadge from "./SuccessBadge";

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <LoanModalProvider>
            {!isAdminRoute && <Navbar />}
            {!isAdminRoute && <SuccessBadge />}
            {!isAdminRoute && <StickyContactButtons />}
            <div>
                {children}
            </div>
            {!isAdminRoute && <Footer />}
        </LoanModalProvider>
    );
}
