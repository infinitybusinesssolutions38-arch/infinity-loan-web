"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BorrowerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("/api/auth/me").then((res) => {
            if (!res.data.user) router.push("/login");
            else if (!res.data.user.role.startsWith("borrower-personal")) router.push("/unauthorized");
            else setUser(res.data.user);
        });
    }, []);

    if (!user) return <p>Loading...</p>;
    return <h1>Welcome Borrower {user}</h1>;
}
