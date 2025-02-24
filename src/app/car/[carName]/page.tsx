'use client'

import { useAppContext } from '@/app/context/AppContext';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const { carName } = useParams();
    const { totalAmount, user, allRider, carDetails } = useAppContext();
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!user || user.length === 0) {
            console.log('No user found, redirecting...');
            setTimeout(() => router.push('/u/signup'), 10000);
        } else {
            setUserIsAuthenticated(true);
        }
    }, [user, router]);

    const car = carDetails.find((c: any) => c.name === carName);
    const rider = allRider.find((r: any) => r.carName === carName);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            {userIsAuthenticated ? (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl text-center flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Booking for {carName}</h2>
                    <div className="flex items-center justify-center">
                    {car && <img src={car.imageUrl} alt={carName as string} className="mt-4 w-full max-w-md rounded-lg shadow-md" />}
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Your assigned driver: {rider ? rider.riderName : 'N/A'}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Total booking cost: <span className="font-bold">${totalAmount.toFixed(2)}</span></p>
                    </div>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition">
                        Confirm Booking
                    </button>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">You are not authenticated</h2>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">Please log in or create an account to book a car.</p>
                    <button
                        onClick={() => router.push('/u/signup')}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                    >
                        Go to Authentication
                    </button>
                </div>
            )}
        </div>
    );
}

export default Page;