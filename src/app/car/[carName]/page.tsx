'use client'

import { useAppContext } from '@/app/context/AppContext';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const { carName } = useParams();
    const { totalAmount, user, allRider, carDetails } = useAppContext();
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // if (!user || user.length === 0) {
        //     console.log('No user found, redirecting...');
        //     setTimeout(() => router.push('/u/signin'), 5000);
        // } else {
        setUserIsAuthenticated(true);
        // }
    }, [user, router]);

    const car = carDetails.find((c: any) => c.name === carName);
    const rider = allRider.find((r: any) => r.carName === carName);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            {userIsAuthenticated ? (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl text-center flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Booking for {carName}
                    </h2>

                    {car && (
                        <img
                            src={car.imageUrl}
                            alt={carName as string}
                            className="w-[80%] max-w-md rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                    )}

                    <div className="flex flex-col items-center mt-4">
                        {/* {rider?.imageUrl ? (
                            <Image
                                src={rider.imageUrl}
                                alt={rider?.riderName}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex items-center justify-center">
                                No Image
                            </div>
                        )} */}

                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Assigned Driver: <span className="font-semibold">{rider?.riderName}</span>
                        </p>

                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Total Cost: <span className="font-bold">${totalAmount.toFixed(2)}</span>
                        </p>
                    </div>


                    <button onClick={() => { console.log(car, rider) }} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md">
                        Confirm Booking
                    </button>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        You are not authenticated
                    </h2>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                        Please log in or create an account to book a car.
                    </p>
                    <button
                        onClick={() => router.push('/u/signup')}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
                    >
                        Go to Authentication
                    </button>
                </div>
            )}

            {/* Suggested Rides Section */}
            <div className="w-full max-w-4xl mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 pb-2">
                    Suggested Rides for You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {carDetails.slice(0, 4).map((item: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => router.push(`/car/${item.name}`)}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <img className="h-24 w-24 rounded-lg mb-2" src={item.imageUrl} alt={item.name} />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-gray-700 dark:text-gray-300">${item.cost}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
