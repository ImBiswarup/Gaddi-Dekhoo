"use client";
import { useAppContext } from "@/app/context/AppContext";
import axios from "axios";
import { signOut } from "next-auth/react";
// import { cookies } from 'next/headers'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const { user } = useAppContext();
    const router = useRouter();

    const handleEditProfile = () => {
        router.push("/profile/edit");
    };
    const handleSignout = async () => {
        // const cookieStore = await cookies()

        // const token = cookieStore.getAll()
        // console.log(token);

        const res = await axios.post("/api/user/signOut");
        console.log(res.data);
        signOut();
        router.push("/");
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen text-gray-500">Loading user data...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Profile Card */}
            <div className="text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
                {/* Profile Picture */}
                <div className="relative w-28 h-28">
                    <Image
                        src={user?.image || "/default-avatar.png"}
                        alt={user.name}
                        layout="fill"
                        className="rounded-full border border-gray-300"
                    />
                </div>

                {/* User Details */}
                <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
                <p>{user.email}</p>

                {/* Buttons */}
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={handleEditProfile}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={() => handleSignout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Rental History */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Rental History</h3>
                <div className="p-4 rounded-lg">
                    <p className="text-gray-600">No recent rentals found.</p>
                </div>
            </div>

            {/* Favorite Cars */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Your Favorite Cars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 shadow-md rounded-lg">
                        <Image
                            src={user?.image}
                            alt="Car"
                            width={200}
                            height={120}
                            className="rounded-lg"
                        />
                        <h4 className="font-bold mt-2">Tesla Model X</h4>
                        <p className="text-gray-500">Electric | 2023</p>
                    </div>
                    <div className="p-4 shadow-md rounded-lg">
                        <Image
                            src={user?.image}
                            alt="Car"
                            width={200}
                            height={120}
                            className="rounded-lg"
                        />
                        <h4 className="font-bold mt-2">Mercedes G-Wagon</h4>
                        <p className="text-gray-500">Luxury | 2022</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
