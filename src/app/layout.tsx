import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import favicon from "./favicon.ico.png";
import favicon2 from "./favicon2.ico.png"
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoanModalProvider } from "@/components/LoanModalProvider";
import StickyContactButtons from "./components/StickyContactButtons";
// import SuccessBadge from "./components/SuccessBadge";
import LayoutClient from "./components/LayoutClient";


const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
    title: "Home - Infinity Loans & Business Solutions",
    description: "Infinity Loans & Business Solutions",
    icons: {
        icon: favicon2.src,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-white text-gray-900" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased`}
                suppressHydrationWarning
            >
                <LayoutClient>{children}</LayoutClient>
            </body>
        </html>
    );
}
