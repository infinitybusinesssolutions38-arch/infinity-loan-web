import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoanModalProvider } from "@/components/LoanModalProvider";
import StickyContactButtons from "./components/StickyContactButtons";
import SuccessBadge from "./components/SuccessBadge";
import LayoutClient from "./components/LayoutClient";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Home - Infinity Loans & Business Solutions",
    description: "Infinity Loans & Business Solutions",
    icons: {
        icon: [{ url: "/logo.png", type: "image/png" }],
        shortcut: ["/logo.png"],
        apple: [{ url: "/logo.png" }],
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
