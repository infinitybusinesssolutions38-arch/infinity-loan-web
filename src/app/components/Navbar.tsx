"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);

        const checkUser = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                setIsAuthenticated(!!res.data?.user);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkUser();

        const onStorage = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);
        };

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout", null, { withCredentials: true });
        } catch {
            // ignore
        } finally {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            router.push("/login");
            router.refresh();
        }
    };

    const protectedHref = (target: string) =>
        !isAuthenticated ? `/login?next=${encodeURIComponent(target)}` : target;

    const links = [
        { label: "Home", href: "/" },
        { label: "Personal Loan", href: protectedHref("/register/borrower/personal") },
        { label: "Business Loan", href: protectedHref("/register/borrower/business") },
    ];

    return (
        <div className="navbar shadow-sm bg-white sticky top-0 z-50 justify-between px-4">
            <div className="flex w-full items-center">
                <Link href="/" className="flex items-center gap-2 ml-2 lg:ml-5 w-[150px] shrink-0">
                    <Image src={"/logo2.png"} className="hover:scale-105 transition-all duration-300 ease-in-out" alt="logo" width={150} height={150} />
                </Link>

                <div className="flex-1 flex justify-center">
                    <ul className="menu menu-horizontal px-1 uppercase flex gap-6 list-none">
                        {links.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            return (
                                <li key={item.href} className={isActive ? "text-blue-600" : "text-gray-800"}>
                                    <Link href={item.href} className="cursor-pointer font-semibold transition-colors hover:text-blue-600">
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="btn btn-secondary btn-lg" type="button">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/register" className="btn btn-outline btn-lg">
                                Register
                            </Link>
                            <Link href="/login" className="btn btn-primary btn-lg">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
