'use client'

import { useAppContext } from '@/app/context/AppContext';
import React from 'react';

const Page = () => {
    const {
        userName, setUserName,
        email, setEmail,
        password, setPassword,
        role, setRole,
        userSignup,
    } = useAppContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gray-100 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Signup Page</h1>
                <div className="flex flex-col gap-y-4 mt-4">
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        className="p-2 border rounded-lg w-full"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="p-2 border rounded-lg w-full"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="p-2 border rounded-lg w-full"
                    />
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        type="text"
                        placeholder="Role (User/Driver)"
                        className="p-2 border rounded-lg w-full"
                    />
                    <button
                        onClick={userSignup}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition w-full"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;
