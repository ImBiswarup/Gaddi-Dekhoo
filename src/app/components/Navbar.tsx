"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import AuthButton from "./Authbutton";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
    const { user, getToken, session } = useAppContext()
    const [isOpen, setIsOpen] = useState(false);
    const [tokenData, setTokenData] = useState([])
    const router = useRouter();

    useEffect(() => {
        getToken()
    }, [])

    // useEffect(() => {
    //     const fetchToken = async () => {
    //         const res = await axios.get("/api/get-token");
    //         // const data = await res.json();

    //         if (!res.data) {
    //             console.log(res.data.error);
    //         }

    //         if (res.data) {
    //             setTokenData(res.data.token);
    //             console.log("decoded token data : ", tokenData);
    //         }
    //     };

    //     fetchToken();
    // }, []);


    console.log(user);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer" onClick={() => router.push("/")}>Gaddi Dekhooo</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <button onClick={() => router.push("/")} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</button>
                        <button onClick={() => router.push("/about")} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</button>
                        <button onClick={() => router.push("/services")} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Services</button>
                        <button onClick={() => router.push("/contact")} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</button>
                    </div>

                    {/* Profile Section */}
                    {user ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => router.push(`/u/${user.id}`)}
                                className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-x-2"
                            >
                                <Image className="rounded-full" height={10} width={35} src={user?.image} alt={user?.name} />  {user.name}
                            </button>
                        </div>
                    ) : (
                        <button
                            className={`text-white dark:text-gray-300 ${isOpen ? "hidden" : "block"} bg-blue-500 px-4 py-2 rounded-md`}>
                            <AuthButton />
                        </button>

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
                    <button onClick={() => router.push("/")} className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</button>
                    <button onClick={() => router.push("/about")} className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">About</button>
                    <button onClick={() => router.push("/services")} className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Services</button>
                    <button onClick={() => router.push("/contact")} className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</button>
                    {user ? (
                        <button
                            onClick={() => router.push(`/u/${user?.id}`)}
                            className="block text-gray-700 dark:text-gray-300"
                        >
                            {user.name}
                        </button>
                    ) : (
                        <button className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            <AuthButton />
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
