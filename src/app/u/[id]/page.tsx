'use client'

import { useAppContext } from "@/app/context/AppContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function UserDashboard() {
    const { user, setUser } = useAppContext();

    // useEffect(() => {
    //     const token = document.cookie
    //         .split("; ")
    //         .find(row => row.startsWith("token="))
    //         ?.split("=")[1];

    //     if (token) {
    //         const decodedUser = jwtDecode(token); // ✅ Decode token
    //         setUser(decodedUser);
    //     }
    // }, []);

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.name}!</h1>
            ) : (
                <h1>Loading user...</h1>
            )}
        </div>
    );
}
