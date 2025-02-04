'use client'

import { useAppContext } from '@/app/context/AppContext';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
    const { userName,
        setUserName,
        email, setEmail,
        password, setPassword,
        role, setRole,
        userSignup, userLogin } = useAppContext()

    const [allUSers, setAllUSers] = useState([])

    useEffect(() => {
        const getUserData = async () => {
            const res = await axios.get(`/api/user/getAllUser`)
            setAllUSers(res.data.user)
            console.log(res.data);
        }

        getUserData()
    }, [setAllUSers.length])

    const randomFunction = async () => {
        console.log(email, password);
        userLogin()
    }
    return (
        <>
            <h1 className='flex items-center justify-center'>Signin page</h1>

            <div className='flex flex-col gap-y-5 container items-center justify-center text-black'>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                <button onClick={randomFunction} className='w-10 bg-red-200 text-black'>
                    ok
                </button>
            </div>
            <div className="container text-white">
                <h1 className="text-2xl">All Users</h1>
                <div className="grid grid-cols-4 gap-4">
                    {allUSers.map((user, index) => (
                        <div key={index} className="bg-gray-800 p-4">
                            <Link href={`/profile/${encodeURIComponent(user.name)}`} className='cursor-pointer hover:underline'>{user.name}</Link>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default page;
