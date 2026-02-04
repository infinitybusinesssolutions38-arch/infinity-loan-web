"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null = loading

    const checkUser = async () => {
        try {
            const res = await axios.get("/api/auth/me", { withCredentials: true });
            const user = res.data.user;

            if (!user) {
                router.push("/login");
                return;
            }

            if (user.role === "borrower-personal") {
                setIsAuthorized(true); // ✅ allow access
            } else {
                setIsAuthorized(false); // 🚫 block
                router.push("/"); // redirect to home (or unauthorized page)
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            router.push("/login");
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // 🌀 While checking user
    if (isAuthorized === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h3 className="text-2xl font-semibold text-gray-700">
                    Checking access...
                </h3>
            </div>
        );
    }

    // ✅ Only show if authorized
    if (isAuthorized) {
        return (
            <div>
                <h3 className="mt-6 text-center font-bold text-3xl">
                    Personal Borrower Dashboard
                </h3>
                <p className="my-3 text-md font-medium mx-4">
                    Welcome, Personal Borrower! You can view and manage borrowers here.
                </p>
                <p className="my-3 text-md font-medium mx-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo debitis
                    ratione excepturi non eos consequuntur hic nemo autem quisquam, qui
                    perferendis magnam ab ex minima officiis sapiente saepe et.
                </p>
            </div>
        );
    }

    // 🚫 Not authorized (briefly shown before redirect)
    return null;
};

export default Page;
