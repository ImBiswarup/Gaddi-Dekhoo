"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, setUser } = useAppContext();
    // console.log(user);
    const router = useRouter();



    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        <Link href="/">MyBrand</Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</Link>
                        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</Link>
                        <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Services</Link>
                        <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</Link>
                    </div>

                    {/* Profile Section */}
                    {user ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => router.push(`/u/${user.id}`)}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium"
                            >
                                {user.name}
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="hidden md:block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            Login
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white focus:outline-none">
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden space-y-2 px-4 pb-4">
                    <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</Link>
                    <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">About</Link>
                    <Link href="/services" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Services</Link>
                    <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</Link>
                    {user ? (
                        <button
                            onClick={() => router.push(`/u/${user.id}`)}
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-500"
                        >
                            {user.name}
                        </button>
                    ) : (
                        <Link href="/login" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
