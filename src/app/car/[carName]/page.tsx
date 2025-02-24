'use client'

import { useAppContext } from '@/app/context/AppContext';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const page = () => {
    const { carName } = useParams();
    const { totalAmount, user, distance } = useAppContext();

    console.log(user);
    console.log(distance);

    useEffect(() => {
        const chenchAuthenticatedUser = () => {
            if (user) {
                console.log('user');
            }
            if (!user) {
                console.log('guest');
            }
        }

        chenchAuthenticatedUser();
    }, [])

    const allRider = [
        {
            "riderName": "Alice",
            "carName": "BMW"
        },
        {
            "riderName": "Bob",
            "carName": "Tesla"
        },
        {
            "riderName": "Charlie",
            "carName": "Mercedes"
        },
        {
            "riderName": "David",
            "carName": "Audi"
        },
        {
            "riderName": "Eve",
            "carName": "Lexus"
        },
        {
            "riderName": "Frank",
            "carName": "Honda"
        },
        {
            "riderName": "Grace",
            "carName": "Toyota"
        },
        {
            "riderName": "Heidi",
            "carName": "Ford"
        },
        {
            "riderName": "Ivan",
            "carName": "Chevrolet"
        },
        {
            "riderName": "Judy",
            "carName": "Volkswagen"
        }
    ]

    return (
        <>
            <div>
                this is the booking page for {carName}, the driver of the car would be {allRider.map((rider) => { rider.carName === carName ? rider.riderName : null })}
                total amount of booking is {totalAmount.toFixed(2)}
            </div>
        </>
    );
}

export default page;
