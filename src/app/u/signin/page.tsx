'use client'

import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
    const { email, setEmail, password, setPassword, userLogin } = useAppContext();
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sign In</h1>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                    onClick={userLogin}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                    Sign In
                </button>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => router.push('/signup')}>Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default Page;
